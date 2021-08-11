# Postgres-specific features

## Shell

Use `pgcli` with `pipx install pgcli` because it offers syntax highlighting and auto-completion.

## Watch

Execute a query then type `\watch`.

## Wide tables

Display tables vertically `\x auto`.

## Time queries

Activate before executing `\timing on`.

## Get cell as file

Use `With CSV` for CSV files.

```psql
\copy (Select * From foo) To 'test.csv' With BINARY;
```

XMLs, manually remove `|` from the front and end of the file:

```
\copy (SELECT xml_field FROM table_name) TO 'output.xml' WITH CSV QUOTE AS '|';
```

## Disk Space

Free up disk space:

```terminal
vacuumdb --all --full --freeze
```

List total table sizes \(including indexes\):

```sql
SELECT nspname || '.' || relname AS "relation",
    pg_size_pretty(pg_total_relation_size(C.oid)) AS "total_size"
  FROM pg_class C
  LEFT JOIN pg_namespace N ON (N.oid = C.relnamespace)
  WHERE nspname NOT IN ('pg_catalog', 'information_schema')
    AND C.relkind <> 'i'
    AND nspname !~ '^pg_toast'
  ORDER BY pg_total_relation_size(C.oid) DESC
  LIMIT 20;
```
