# APIs

RESTful API, HTTP/Web API, TCP/Socket API - RPCs

## REST

> I would suggest RESTful APIs for CRUD-based applications, not for DDD-based applications.

A set of patterns and guidelines \(a software architectural style\). The transport protocol is not defined, but universally REST is used as REST-over-HTTP.

A RESTful API[^1] is about _resources_[^2], where resources are _hypermedia_. Note that URLs are resources \(not verbs/actions\). You should spend your time defining the [media types](https://www.iana.org/assignments/media-types/media-types.xhtml) used for resource representations, which includes the [link relations](https://www.iana.org/assignments/link-relations/link-relations.xhtml) that the resource may contain.

The resources should not depend on the underlying domain/implementation objects. Create resources that make sense in the context of the API - they can be anything you can think of, for example a _process_ can be a resource, especially if you want to ask questions about the state of the process.

HATEOAS means clients know one entry point \(the bookmark\) and the media types used for resource representations beforehand. What does the entry point return? In theory this allows you to control your namespace at will \(i.e. changing object hierarchies or resource names at will\); in practise clients may hardcode URLs and you need backwards-compatibility during the transition to a new URL namespace anyway. It also allows you to specify actions that may dynamically change depending on the resource's state. You may want to use [links in headers](https://tools.ietf.org/html/rfc5988 "IETF RFC describing link relations between resources"). In practise, decisions are made when the api integration code is written, not at run-time, as opposed to how we use links in web. HATEOAS requires hypermedia-aware media types such as HTML, Atom and SVG - hyperlinks, which XML and JSON don't define though there certain extensions to these that do. It genuinely puts theory over practise, and as it is uncommon it is actually slightly developer unfriendly.

Version via content-type headers: `application/vnd.mycompany.myapp.myresource+json; version=1.0` \(or just a completely custom header\); or inside the URL \(hostname, **path** or query parameter\). Note that, `application/json` is indeed a media type, but it is incomplete because it would only describe the data format, while \(almost always\) special processing is required for the content. Roy Fieldings says to version inside the hostname as the next version is a new system.

### Pragmatic Advice

* Don't use HATEOAS.
* Version inside the URL path, `/api/v1/`.
* Use the `Accept` HTTP header \(and perhaps a query parameter\) to change the media type of the response, e.g. XML. \(Perhaps even an extension `/123.json`.\)
* Requests should be URL-encoded by default, JSON-encoded requests should require `Content-Type: application/json`.
* Use HTTP status codes. Consider: 200, 201, 202, 204, 301, 304, 400, 401, 403, 404, 405, 409, 410, 412, 415, 422, 429.
* Use the `Location` header for 201.
* Specify a consistent error response on 4xx which includes a code, a human-readable message, and in the case of validation errors, a list of them.
* Use explicit `Idempotency-Key`  HTTP headers for POST when necessary. \(NB: every write should be idempotent due to network partitions.\)
* Prevent race-conditions with `ETag` and `If-Match` headers.
* Always use plural forms for collections even when it doesn't make sense, e.g. `/people`.
* Allow nested objects to be expanded, e.g. with an `?expand[]=friends.name` query parameter.
* Allow fields to be explicitly specified, e.g. with a `?fields[]=age` query parameter.
* Handle filtering, sorting and searching on collections via query parameters, e.g. `/people?q=john&state=active&sort[]=name,-date`. \(i.e. not hierarchical sub-paths\)
* Consider aliasing query common parameters as a sub-resource path.
* Avoid envelopes - HTTP already has them. For example, for pagination use links-in-headers, e.g. `Link: <https://example.com/v1/people?page=3>; rel="next", <https://example.com/v1/people?page=50>; rel="last"` \(first, last, next, previous\), and a custom HTTP header for the total count like `X-Total-Count` .
* How to paginate exactly?
* Use POST/PUT/PATCH appropriately.
* Use POST on collections to insert. Use PUT \(idempotent\) on specific resource path to create/update, and PATCH for partial updates.
* PUT/POST/PATCH should return the new resource representation. In the case of HTTP 201, use the `Location` header.
* If rate-limiting, use headers like `X-Rate-Limit-Limit` , `X-Rate-Limit-Remaining` , and `X-Rate-Limit-Reset`  \(in seconds\).
* Use HTTP Basic Auth, if possible.
* Use HTTP caching, e.g. `ETag` , and `Last-Modified` \(with the appropriate vary and privacy settings\).
* Return pretty \(indented\) responses \(gzip covers size concerns\).
* Return a request ID used for support queries as a HTTP header.
* Documentation should show examples of complete request-response cycles, including copy-and-pastable code.
* Clients should be informed of deprecation schedules \(in the docs\) and of updates \(through blogs/changelogs/mailing lists\).
* When all else fails, and you really need an action, PATCH a field on the resource, use a sub-resource path, or, in extreme cases, create a new non-RESTful endpoint.

Alternative: GraphQL \(see [GitHub's blog post](https://githubengineering.com/the-github-graphql-api/)\).

TBD: [REST without PUT and PATCH](https://www.thoughtworks.com/insights/blog/rest-api-design-resource-modeling). The idea that clients shouldn't even manipulate the resource representation directly, but instead signal intents via new creation or update resources, e.g. an intent to change the resource, ChangeOfName vs PATCH person.name. The former allows for clear auditing/question asking of the process, eventual consistency and

Representational State Transfer \(REST\):

* separates concerns - data storage from user interface - client-server, allowing components to evolve separately.
* is stateless - the request must contain all the information and cannot take advantage of stored context on the server, allowing for increased reliability \(eases recovery\), visibility \(eases debugging\) and scalability \(no persistent state on server to preserve\)
* has a cache
* uniform interface - _**simplifies development despite inefficiency due to standardised formats**_
* layered \(e.g. load-balancers\)

### Examples

* [Twilio](https://www.twilio.com/docs/usage/api)
* Stripe

### Safety

Safe: No side-effects \(no server state change beyond trivial things like logging\); Idempotent: Safely Repeatable.

Pure Read \[REST:GET\] - Safe

Stateful Reads \[GET\] - pure functions that need computational resources of server; cursor in databases; logging/analytics/paywalls; rate limiting APIs.

_**Idempotent Write**_ \[PUT/DELETE\] - you can safely throw these at the server.

Non-idempotent Write \(dangerous\) \[POST-made idempotent with UUID\] - in the event of a network partition you could have a serious problem.

## Versioning Pattern

Adapt new response to old response - pipeline, infinite support. See stripe &lt;TBD&gt;

[^1]: Originally described by Roy Fielding in his [dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) in 2000

[^2]: The exact meanings of words like "representation" are described in Fielding's [REST data elements table](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#tab_5_1)

