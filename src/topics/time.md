# Time

Use [RFC 3339](https://tools.ietf.org/html/rfc3339) for dates and times, it is simpler than ISO 8601. However, it does not support durations.

There is a good article that I need to fine. I think the rules were:

* Be liberal in what you accept.
* Store time as UTC
* Store the symbolic time zone \(i.e. "Europe/London"\) if you need to know about daylight savings for further calculations.
* Return time in UTC, and let the presentation layer convert it to the user's local time.

Examples: <http://www.creativedeletion.com/2015/01/28/falsehoods-programmers-date-time-zones.html>
