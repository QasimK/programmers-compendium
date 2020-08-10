# Web

Learning: [https://hpbn.co/](https://hpbn.co/)

[Google's Style Guide](https://google.github.io/styleguide/htmlcssguide.html) has basic formatting and other guidance.

## Minimal HTML

```HTML
<!DOCTYPE html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Saving bytes</title>
<link rel="stylesheet" href="styles.css">
<h1>Let's go</h1>
<p>Annddd we're done
```

## Tools

* [Mozilla Observatory](https://observatory.mozilla.org/) - web **security** checks \(also links to a couple of the below\)
* [SSL Labs](https://www.ssllabs.com/ssltest/) - TLS **security** checker
* [Hardenize](https://www.hardenize.com/) - domain/email/web **security** checks
* [SecurityHeaders](https://securityheaders.io/) - **security** checks on HTTP headers

## Web Security

* Same-Origin Policy \(SOP\). Security. \(Related [CORS](https://stackoverflow.com/a/43973018/197488) - not really security, just DRM.\)
  * The Same Origin Policy \(SOP\) applies only to scripts accessing data from another origin.
  * CORS can be used to relax restrictions for scripts.
  * Websockets do not use SOP, the server must verify the `Origin:` header.
  * SOP does not prevent "Simple Requests" \(e.g. HTML forms\), but does prevent reading the response. This means [to prevent CSRF](https://stackoverflow.com/questions/33261244/why-same-origin-policy-isnt-enough-to-prevent-csrf-attacks#33324803), the server must verify the `Origin:` header.
  * Older browsers do not send the `Origin:` header.
* Content Security Policies let website owners control which resources they allow themselves \[the links on the page\] to load.
  * HTTP Headers and HTML meta tag intersect.
* Feature Policies let website owners control which permissions they allow themselves \[the scripts on the page\] to use.
* Cross-Origin Resource Sharing let website owners allow which resources they allow others to load.
  * With exceptions that allow hotlinking for legacy resources images, scripts, css, and audio/video.
  * SOP applies to XHR, web fonts, and a couple of other things, and CORS can be used to relax these restrictions.
* CSRF - server accepting requests it believe came from the user \(exploit server's trust in client\)
* XSS - inject scripts into the attacked website to bypass SOP \(exploit client's trust in server - for XSS originating from server\)
  * Reflected XSS, Persistent XSS, Self-XSS.
  * This game might be helpful: [https://xss-game.appspot.com/](https://xss-game.appspot.com/)
* Clickjacking
* Storage access \(cookies, sessionStorage, localStorage, IndexDB\)
* Remember: many \(all?\) of these headers are only needed on rendered content \(HTML, not images\)



