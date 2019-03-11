# Time

Use [RFC3339](https://tools.ietf.org/html/rfc3339).

There is a good article that I need to fine. I think the rules were:

* Be liberal in what you accept.
* Store time as UTC
* Store the symbolic time zone \(i.e. Europe/London\) if you need it. This includes DST in summer for example, while +01:00 does not.
* Return time in UTC, and let the presentation layer convert it to the user's local time.



