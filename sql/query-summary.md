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

**HAVING** allows aggregate functions. WHERE filters individual rows before the GROUP BY, while HAVING filters group rows created by the GROUP BY.

The order is in fact:

1. FROM \[UNION/JOIN\]
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY
7. LIMIT

> ORDER BY clause = e.g. ORDER BY x DESC, y NULLS FIRST
>
> **SQL:2008** LIMIT clause = OFFSET n ROWS FETCH FIRST m ROWS ONLY

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

**ANY **and ** ALL** can be used with an operator against a _subquery_, e.g. `WHERE column = ANY (SELECT ...)`.

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

## Misc.

```SQL
-- comment
/* block comment */
```



