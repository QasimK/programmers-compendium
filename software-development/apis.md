# APIs

RESTful API, HTTP/Web API, TCP/Socket API - RPCs

## REST

A set of patterns and guidelines. Universally used as REST-over-HTTP.

A RESTful API[^1] is about _resources_[^2]_,_ where resources are _hypermedia_. Note that URLs are resources \(not verbs/actions\). You should spend your time defining the [media types](https://www.iana.org/assignments/media-types/media-types.xhtml) used for resource representations, which includes the [link relations](https://www.iana.org/assignments/link-relations/link-relations.xhtml) that the resource may contain.

HATEOAS means clients know one entry point \(the bookmark\) and the media types used for resource representations beforehand. What does the entry point return? In theory this allows you to control your namespace at will; in practise clients may hardcode URLs and you need backwards-compatibility during the transition to a new URL namespace anyway. It also allows you to specify actions that may dynamically change depending on the resource's state. You may want to use [links in headers](https://tools.ietf.org/html/rfc5988 "IETF RFC describing link relations between resources"). In practise, decisions are made when the api integration code is written, not at run-time, as opposed to how we use links in web. HATEOAS requires hypermedia-aware media types such as HTML, Atom and SVG - hyperlinks, which XML and JSON don't define though there certain extensions to these that do.

Version via content-type headers: `application/vnd.mycompany.myapp.myresource+json; version=1.0` \(or just a completely custom header\); or inside the URL \(hostname, **path** or query parameter\).

### Pragmatic Advice

* Don't use HATEOAS.
* Version inside the URL path, `/api/v1/`.
* Use the `Accept` HTTP header \(and perhaps a query parameter\) to change the media type of the response, e.g. XML.
* Requests should be URL-encoded by default, JSON-encoded requests should require `Content-Type: application/json`.
* Use HTTP status codes: 200, 201, 202, 204, 304, 400, 401, 403, 404, 405, 409, 410, 415, 422, 429.
* Specify a consistent error response on 4xx which includes a code, a human-readable message, and in the case of validation errors, a list of them.
* Use explicit `Idempotency-Key`  HTTP headers for POST when necessary. \(NB: every write should be idempotent due to network partitions.\)
* Always use plural forms for collections even when it doesn't make sense, e.g. `/people`.
* Allow nested objects to be expanded, e.g. with an `?expand[]=friends.name` query parameter.
* Allow fields to be explicitly specified, e.g. with a `?fields[]=age` query parameter.
* Handle filtering, sorting and searching on collections via query parameters, e.g. `/people?q=john&state=active&sort[]=name,-date`.
* Consider aliasing query common parameters as a sub-resource path.
* Avoid envelopes - HTTP already has them. For example, for pagination use links-in-headers, e.g. `Link: <https://example.com/v1/people?page=3>; rel="next", <https://example.com/v1/people?page=50>; rel="last"`, and a custom HTTP header for the total count like `X-Total-Count` .
* How to paginate exactly?
* Use POST/PUT/PATCH appropriately.
* Use POST on collections to insert. Use PUT \(idempotent\) on specific resource path to create/update, and PATCH for partial updates.
* PUT/POST/PATCH should return the new resource representation. In the case of HTTP 201, use the `Location` header.
* If rate-limiting, use headers like `X-Rate-Limit-Limit` , `X-Rate-Limit-Remaining` , and `X-Rate-Limit-Reset`  \(in seconds\).
* Use HTTP Basic Auth, if possible.
* Use HTTP caching, e.g. `ETag` , and `Last-Modified` \(with the appropriate vary and privacy settings\).
* Return pretty \(indented\) responses.
* Return a request ID used for support queries.
* Documentation should show examples of complete request-response cycles, including copy-and-pastable code.
* Clients should be informed of deprecation schedules \(in the docs\) and of updates \(through blogs/changelogs/mailing lists\).
* When all else fails, and you really need an action, use a field on the resource, a sub-resource path, or, in extreme cases, a new non-RESTful endpoint.

Alternative: GraphQL \(see [GitHub's blog post](https://githubengineering.com/the-github-graphql-api/)\).

Representational State Transfer \(REST\):

* separates concerns - data storage from user interface - client-server, allowing components to evolve separately.
* is stateless - the request must contain all the information and cannot take advantage of stored context on the server, allowing for increased reliability \(eases recovery\), visibility \(eases debugging\) and scalability \(no persistent state on server to preserve\)
* has a cache
* uniform interface - _**simplifies development despite inefficiency due to standardised formats**_
* layered \(e.g. load-balancers\)

### Examples

* [Twilio](https://www.twilio.com/docs/usage/api)
* Stripe

## Versioning Pattern

Adapt new response to old response - pipeline, infinite support. See stripe &lt;TBD&gt;.

## Safety

Pure Read \[REST:GET\]

Stateful Reads \[GET\] - pure functions that need computational resources of server; cursor in databases; logging/analytics/paywalls; rate limiting APIs.

_**Idempotent Write**_ \[PUT/DELETE\]

Non-idempotent Write \(dangerous\) \[POST-made idempotent with UUID\]

[^1]: Originally described by Roy Fielding in his [dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) in 2000.

[^2]: The exact meanings of words like "representation" are described in Fielding's [REST data elements table](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#tab_5_1).

