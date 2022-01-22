# SQL

[https://pgexercises.com/](https://pgexercises.com/)

[http://tatiyants.com/pev/](http://tatiyants.com/pev/) - Explain Visualiser



| Data Description Language \(DDL\) | Data Manipulation Language \(DML\) | Data Control Language \(DCL\) | Transaction Control Language \(TCL\) |
| :--- | :--- | :--- | :--- |
| CREATE/ALTER/DROP/TRUNCATE/RENAME | SELECT/INSERT/UPDATE/DELETE | GRANT/REVOKE | BEGIN/COMMIT/ROLLBACK/SAVEPOINT |

## Query Summary

The key actions are:

```SQL
SELECT [DISTINCT] ... FROM ...
UNION
[INNER|LEFT|RIGHT|OUTER] JOIN ... ON ...
WHERE ...
GROUP BY ...
HAVING ...
ORDER BY ... [ASC|DESC]
LIMIT ... OFFSET ...

INSERT INTO ... VALUES ...

UPDATE ... SET ... [WHERE ...]

DELETE ...
```

**SELECT** can be used with **AS** to rename a table or a column.

**UNION** adds the rows of different queries

**WHERE** determines which rows will be processed by the query and filters rows before the GROUP BY.

**HAVING** comes in at the end of a query after the GROUP BY and determines which rows will be sent to the client. It allows aggregate functions by filtering group rows created by the GROUP BY.

[The difference between WHERE and HAVING](https://sql-bits.com/the-difference-between-where-and-having/).

The order is in fact:

1. FROM \[UNION/JOIN\]
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY
7. LIMIT

> `ORDER BY` clause example: `ORDER BY x DESC, y NULLS FIRST`.
>
> **SQL:2008** The `LIMIT` clause is `OFFSET n ROWS FETCH FIRST m ROWS ONLY`.

## Operations

We have the arithmetic operators +, -, \*, /, and %.

Logical/Comparison operators include:

```SQL
IS (NOT) NULL
UNIQUE?
=, <, >
<>, !=
NOT, AND, OR
BETWEEN ... AND ...
EXISTS
IN ...
LIKE ...
... ANY, ALL
```

**BETWEEN** can be numbers, texts, or dates. In the case of text it seems to use alphabetical ordering \(Unicode considerations\)?

**EXISTS** tests whether a _subquery_ returns any values \(boolean existence check\).

**IN** can use a tuple of values `('George', 'Clooney')`, or a _subquery_.

**LIKE** uses two wildcards % \(0+ characters\), and \_ \(exactly one character\). For example, `_r%` would mean values with "r" in the 2nd position.

**ANY** and **ALL** can be used with an operator against a _subquery_, e.g. `WHERE column = ANY (SELECT ...)`.

## Aggregate Functions

We have aggregate functions that can act on values:

```SQL
MIN
MAX
COUNT
AVG
SUM
```

Be aware, that the aggregate selects on the column, and [will not select the entire row](https://bernardoamc.github.io/sql/2015/05/04/group-by-non-aggregate-columns/).

## Common Table Expressions (CTEs)

Create composable queries using query-specific views. I call these `WITH` clauses.

```SQL
WITH
    my_view AS (
        SELECT x
        FROM y
    )
    -- Remove invalid things
  , my_filter AS (
        SELECT x
        FROM y
        WHERE x IS NOT NULL
    )

SELECT x
FROM my_filter
;
```

## Correlated Subqueries

A query nested inside another query that uses values from the outer query.

The subquery is (usually) evaluated once for each outer query row.

In the `SELECT` clause:

```SQL
SELECT
    a
  , (
        SELECT AVG(x2.a)
        FROM x AS x2
        WHERE x2.b = x1.b
    )
FROM x AS x1
```

In the `WHERE` clause:

```SQL
SELECT a
FROM x AS x1
WHERE
    a > (
        SELECT AVG(a)
        FROM x AS x2
        WHERE x2.b = x1.b
    )
;
```

## Window functions

https://thoughtbot.com/blog/postgres-window-functions

## Misc.

```SQL
-- comment
/* block comment */
```



