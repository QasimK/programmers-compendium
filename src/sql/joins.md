![](/sql/joins.png)

**Joins start off as a cross-product**, and predicates \("ON"\) filter the rows down.

* **LEFT OUTER JOIN** - always return all rows for A, with anything that happens to match in B \(ie. B could be null\).
* **RIGHT OUTER JOIN**s are fairly useless - just do a left join for intuitiveness \(possible exception for 3+ tables?\).
* **FULL OUTER JOIN** - either side could be null.
* **INNER JOIN** - return only rows with matching records on both sides.



