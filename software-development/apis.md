# APIs

RESTful API, HTTP/Web API, TCP/Socket API - RPCs

## REST

A RESTful API is about _resources,_ where resources are _hypermedia_. Note that URIs are resources \(not verbs/actions\). You should spend your time defining the media types used for resource representations, which includes the link relations that the resource may contain.

HATEOAS means clients know one entry point \(the bookmark\) and the media types used for resource representations. The server should be free to control its namespace. What does the entry point return? Pros/Cons?

Version via content-type headers: `application/vnd.mycompany.myapp.myresource+json; version=1.0`; or inside the URL \(host domain, path or query string\).

Alternative: GraphQL \(see [GitHub's blog post](https://githubengineering.com/the-github-graphql-api/)\)

## Versioning Pattern

Adapt new response to old response - pipeline, infinite support. See stripe &lt;TBD&gt;

