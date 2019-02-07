# Migrations

My talk: [http://qasimk.io/talks/2019/database-migrations-2\#1](http://qasimk.io/talks/2019/database-migrations-2#1)

An excellent article: [https://benchling.engineering/move-fast-and-migrate-things-how-we-automated-migrations-in-postgres-d60aba0fc3d4](https://benchling.engineering/move-fast-and-migrate-things-how-we-automated-migrations-in-postgres-d60aba0fc3d4)

## Cliffnotes for Postgres

* Adding a `NOT NULL` field , or one with a dynamic default value \(NB: &lt; Postgres 11\) causes the entire table and its indexes to be rewritten
  * Do multi-step deploy
* Adding a new NOT NULL with DEFAULT applies default to all existing rows
  * Add default after column is created applies it to new rows only
* Removing a NOT NULL field can cause the ORM to read/write a non-existant field
  * Migrate to NULL before removing code
* Creating an index locks the entire table, preventing writes
  * Use CREATE INDEX CONCURRENTLY
* Creating constraints \(inc. NOT NULL\) locks the entire table? \[It at least scans\]
  * Use 2-step creation: ... NOT VALID and VALIDATE CONSTRAINT
* Most `ALTER TABLE` operations \(including `ADD COLUMN`, `DROP COLUMN`\) require an `ACCESS EXCLUSIVE` lock which waits for ALL other queries to complete \(including `SELECT`!\)
  * Set a very low `lock_timeout` and `statement_timeout` \(&lt; 10 seconds\) to allow migration to fail without affecting normal operation.
  * Reduce size of transactions/queries; beware of SQLAlchemy's automatic start of transaction even on a first select.
* Default ORM queries select all columns to populate the full object, this is a problem because...
* DROP COLUMN hides column, and _gradually_, as writes occur, replaces it with NULLs to free up space.

## Automated Checks

* Check indexes are created concurrently
* Check constraints are created in the background
* Check new columns are NULLABLE \[\[without a default value\]\]
* Check removed columns are NULLABLE
* In tests, check queries against a new `deprecated_column` to ensure they are not being used before removal
* Use a `renamed_to` column-thing to automatically create SQL triggers to populate data bi-directionally
* \(SQLAlchemy\) Check every foreign key is covered by an index



