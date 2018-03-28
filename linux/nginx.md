# Nginx

* `add_header` [does not inherit](https://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header) properly.

## Global configurations

Global configuration \(`http` block-level\) can be placed inside `/etc/nginx/conf.d/*.conf`.

### TLS

```nginx
# Force TLS

# USAGE:
# You must generate a dhparam.pem file.
# You must set ssl_certificate, ssl_certificate_key, and ssl_trusted_certificate.
# You must NOT use add_header inside your server {} block at all.

ssl_session_cache shared:SSL:10M;
ssl_session_timeout 180m;
ssl_session_tickets off;

# Secure SSL config - https://mozilla.github.io/server-side-tls/ssl-config-generator/
ssl_protocols TLSv1.2;
ssl_dhparam /etc/ssl/certs/dhparam.pem;  # Must generate this manually
ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

# Already set in /etc/nginx/nginx.conf
# ssl_prefer_server_ciphers on;

# SSL OSCP Stapling
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4;

# Force SSL to this domain (+subdomains) for 6 months (+ preload list)
add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload" always;
```

### Security Headers

There are several headers used for security, which can be set by Nginx or by your application. The following global configuration file will set a default if upstream has not provided one.

```nginx
# Ensure HTTP headers that are important for security are set.
# We set some defaults which can be overridden by the upstream server.

# USAGE:
# You must use proxy_hide_header/uwsgi_hide_header to hide the upstream
#   headers for all headers that we list below.
# You must NOT use add_header inside your server {} block at all.

map $upstream_http_referrer_policy $referrer_policy {
    default $upstream_http_referrer_policy;
    '' "strict-origin-when-cross-origin";
}

map $upstream_http_x_content_type_options $x_content_type_options {
    default $upstream_http_x_content_type_options;
    '' "nosniff";
}

map $upstream_http_x_frame_options $x_frame_options {
    default $upstream_http_x_frame_options;
    '' "DENY";
}

map $upstream_http_x_xss_protection $x_xss_protection {
    default $upstream_http_x_xss_protection;
    '' "1; mode=block";
}

add_header Referrer-Policy $referrer_policy always;
add_header X-Content-Type-Options $x_content_type_options always;
add_header X-Frame-Options $x_frame_options always;
add_header X-XSS-Protection $x_xss_protection always;
```

## Servers

Servers can be configured inside `/etc/nginx/sites-available/`, but a symlink should be created inside `/etc/nginx/sites-enabled/` for them to become active.

### Default Server - Redirect to HTTPS

```nginx
server {
    listen {{ public_ipv4 }}:80 default_server;
    listen [{{ public_ipv6 }}]:80 default_server;

    # Redirect all HTTP requests to HTTPS with a 301 Moved Permanently response.
    return 301 https://$host$request_uri;
}
```

### HTTPS Server

```nginx
server {
    listen {{ public_ipv4 }}:443 ssl http2;
    listen [{{ public_ipv6 }}]:443 ssl http2;
    server_name {{ domain }};
    charset utf-8;

    # Check if this certificate is really served for this server_name
    # https://serverfault.com/questions/578648/properly-setting-up-a-default-nginx-server-for-https
    if ($host != $server_name) {
        return 444;
    }

    # Certificate
    ssl_certificate /etc/letsencrypt/live/{{ domain }}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/{{ domain }}/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/{{ domain }}/chain.pem;

    # Lets Encrypt SSL Cert renewal
    location ~ /.well-known/acme-challenge {
        allow all;
        root /var/www/letsencrypt;
    }
}
```

* Ubuntu's Nginx configuration does a lot of things itself including: sendfile, tcp\_nopush, tcpnodelay, keepalive\_timeout, gzip, basic SSL configuration.
* Doing `listen [::]:443 ipv6only=off` does not seem to work well \(maybe due to use of IP addresses on other servers?\). It is also Linux-only.

## Serving Files & Upstream Proxies

### uWSGI Proxy

```nginx
upstream uwsgicluster {
    server unix://var/run/app.sock;
}

server {
    ...

    # Proxying connections to application servers
    location / {
        include         uwsgi_params;
        uwsgi_pass      uwsgicluster;

        uwsgi_param     Host $host;
        uwsgi_param     X-Real-IP $remote_addr;
        uwsgi_param     X-Forwarded-For $proxy_add_x_forwarded_for;
        uwsgi_param     X-Forwarded-Host $server_name;
        uwsgi_param     X-Forwarded-Proto $scheme;
        uwsgi_param     X-Forwarded-Port $server_port;

        # Correct handling of fallbacks for HTTP headers
        uwsgi_hide_header   Referrer-Policy;
        uwsgi_hide_header   X-Content-Type-Options;
        uwsgi_hide_header   X-Frame-Options;
        uwsgi_hide_header   X-XSS-Protection;
    }
}
```

### HTTP Proxy

```nginx
server {
    ...

    # Proxying connections to application servers
    location / {
        proxy_pass         http://localhost:8080;
        # Required to rewrite "Location" header for Jenkins
        proxy_redirect     http://localhost:8080 https://{{ domain }};
        proxy_read_timeout 60;
        proxy_http_version 1.1;

        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   X-Forwarded-Port $server_port;

        # Correct handling of fallbacks for HTTP headers
        proxy_hide_header  Referrer-Policy;
        proxy_hide_header  X-Content-Type-Options;
        proxy_hide_header  X-Frame-Options;
        proxy_hide_header  X-XSS-Protection;
    }
}
```

### Serving Static Files

```nginx
server {
    ...

    # Serve static files
    location /static/ {    
        alias /var/www-data/static/;
        disable_symlinks if_not_owner;  # Extra-security
        # Performance
        # access_log off;
        open_file_cache         max=1000;
        open_file_cache_errors  on;    
        disable_symlinks  if_not_owner;   # Security
    }
}
```

## Performance/Tuning

* sendfile - directly from kernel to network socket - covered by Ubuntu, but consider adding `sendfile_max_chunk`
* gzip - covered by Ubuntu... Mostly
* open\_file\_cache - do not recheck filesystem for file on every request
* gzip\_static - do not compress on the fly, serve static .gz files
* limit\_rate - consider for limiting a individual request by limiting the network speed
* limit\_req - consider for [rate limiting number-of-requests](https://www.nginx.com/blog/rate-limiting-nginx/) by IP

```nginx
# Rate limit all requests for a server by IP address
limit_req_zone $binary_remote_addr zone=myzone:10m rate=1r/s;

server {
    ...

    limit_req_status 429;
    limit_req zone=myzone burst=60 nodelay;
}
```



