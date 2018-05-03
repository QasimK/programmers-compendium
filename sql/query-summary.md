# SQL

[https://pgexercises.com/](https://pgexercises.com/)

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
HAVING ...
ORDER BY ... [ASC|DESC]
LIMIT ...

INSERT INTO ... VALUES ...
UPDATE ... SET ... [WHERE ...]
DELETE ...
```

**SELECT** can be used with **AS** to rename a table or a column.

**UNION** adds the rows of different queries

**HAVING** allows aggregate functions.

The order is in fact:

1. FROM \[UNION/JOIN\]
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY
7. LIMIT

## Operations

We have the arithmetic operators +, -, \*, /, and %.

Logical/Comparison operators include:

```SQL
IS NULL
IS NOT NULL
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

## Misc.

```SQL
-- comment
/* block comment */
```



