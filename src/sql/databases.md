# Databases

* Clustering organises the data on the disk:
  * An example of how this can improve performance: [https://bclennox.com/the-postgres-cluster-command](https://bclennox.com/the-postgres-cluster-command)
* Long Table Names suck:
   * They make queries so much longer
   * Seriously.

## UUID Foreign Keys

I liked the idea.

UUIDs suck:

* Visually they take up more space \(e.g. result of queries\)
* Harder to just remember the ID in your head when you need to
* Lose automatic \(basic\) ordering of rows
* Copying and pasting is much more difficult because double-click to copy does not include the quotes
