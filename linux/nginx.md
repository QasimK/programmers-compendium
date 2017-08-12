# Nginx

## Default Server - Redirect to HTTPS

```
server {
    listen {{ public_ipv4 }}:80 default_server;
    listen [{{ public_ipv6 }}]:80 default_server;

    # Redirect all HTTP requests to HTTPS with a 301 Moved Permanently response.
    return 301 https://$host$request_uri;
}
```

## HTTPS Server

```
# Configuration for Nginx
server {
    listen {{ public_ipv4 }}:443 ssl http2;
    listen [{{ public_ipv6 }}]:443 ssl http2;
    server_name {{ domain }};
    charset utf-8;

    # Certificate
    ssl_certificate /etc/letsencrypt/live/spacer.fustra.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/spacer.fustra.co.uk/privkey.pem;
    ssl_session_cache shared:SSL:10M;
    ssl_session_timeout 180m;
    ssl_session_tickets off;

    # Secure SSL config - https://mozilla.github.io/server-side-tls/ssl-config-generator/
    # Be sure to generate your own set of DH params on the server
    ssl_protocols TLSv1.2;
    # Be sure to generate your own set of DH params on the server
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDH   CDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers on;

    # OSCP Stapling
    ssl_trusted_certificate /etc/letsencrypt/live/{{ domain }}/chain.pem;
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4;
    ssl_session_tickets off;

    # Force SSL to this domain (+subdomains) for 6 months (+ preload list)
    add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload" always;

    # Lets Encrypt SSL Cert renewal
    location ~ /.well-known/acme-challenge {
        allow all;
        root /var/www/letsencrypt;
    }

    # Additional security
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "sameorigin" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

* Ubuntu's Nginx configuration does a lot of things itself including: sendfile, tcp\_nopush, tcpnodelay, keepalive\_timeout, gzip, basic SSL configuration.
* Doing `listen [::]:443 ipv6only=off` does not seem to work well \(maybe due to use of IP addresses on other servers?\). It is also Linux-only.

## uWSGI Proxy

```
upstream uwsgicluster {
    server unix://var/run/app.sock;
}
```

```
server {
    ...

    # Proxying connections to application servers
    location / {
        include            uwsgi_params;
        uwsgi_pass         uwsgicluster;

        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
        proxy_set_header   X-Forwarded-Proto $ssl_protocol;
        proxy_set_header   X-Forwarded-Port $server_port;

    }
}
```

## HTTP Proxy

```
server {
    ...

    # Proxying connections to application servers
    location / {
        proxy_pass         http://localhost:8080;
        # Required to rewrite "Location" header for Jenkins
        proxy_redirect     http://localhost:8080 https://jenkins.fustra.co.uk;
        proxy_read_timeout 60;
        proxy_http_version 1.1;

        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
        proxy_set_header   X-Forwarded-Proto $ssl_protocol;
        proxy_set_header   X-Forwarded-Port $server_port;
    }
}
```



