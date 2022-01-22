# Read-Modify-Write Patterns in Python

Read-Modify-Write can cause "lost updates". Solutions, in order of preference:

1. Use calculated updates
2. Use optimistic row-level locks (version column)
3. Use pessimistic row-level locks
4. Use database locks for higher-level issues
5. Use external locks
6. Use serialisable transactions

## Calculated updates

```sql
UPDATE table SET a = a + 1 WHERE id = 1;
```

These are ideal because no read occurs and they are atomic.

If there are zero updated columns, then you know someone else beat you to it.

It's possible to do more complicated variants that are safe to other kinds of race conditions:

```sql
UPDATE balance
SET balance = balance - 100
WHERE id = 1 AND balance >= 100;
```

In python...

## Use optimistic row-level locks (version column)

These are better in read-heavy situations (which is typically the case).

A variant on relative updates with an explicit version column.

```sql
UPDATE book
SET
    name = :name,
    version = version + 1
WHERE id = :id AND version = :current_version
```

Note: only one version of an entity exists at any time, otherwise other kinds of race conditions are possible!

In Python, SQLAlchemy has good built-in support for this <https://docs.sqlalchemy.org/en/14/orm/versioning.html> and can raise `StaleDataError`.

## Use pessimistic row-level locks

These are better in write-heavy situations. In general, they should be avoided because they create long-running transactions which interfere with database migrations.

In Python, the pattern for these would be:

```python
def create(session: Session: book_new: BookNew) -> BookOut:
    model = convert_book_new_to_model(book_new)
    result = session.add(model)
    return _convert_one(result)

def get_by_id(session: Session, id_: int) -> BookOut:
    result = session.execute(Book.id=id_)
    return _convert_one(result)

def get_locked_by_id(session: Session, id_: int) -> Tuple[BookOut, BookUpdate]:
    result = session.execute(
        select(Book)
        .filter(Book.id=id_)
        .with_for_update()
        .one_or_none()
    )
    return _convert_one(result)

def save(
    session: Session, old_book_out: BookOut, book_update: BookUpdate
) -> BookOut:
    assert book_out.id == book_update.id
    model = _convert_book_update_to_model(book_update)
    new_book_out = session.add(model)
    publish_book_updated(session, old_book_out, new_book_out)
    return _convert_one(new_book_out)


# Usage
book_out, book_update = get_locked_by_id(session, 1)
book_update.name = "Super Book"
save(session, book_out, book_update)
```

* Avoid locks where they are unnecessary
* Impossible to update objects without getting a lock
* Impossible to update objects without publishing an event (if desired)
* Published events have access to old and new state
* Transactions are managed outside these methods

Note that where there are child objects (say of a DDD aggregate), then the row-level lock can just be taken on the root entity, trusting your database-access layer to consistently take locks.

## Use database locks

Use a PG Advisory lock consistently for higher-level transactions where the above approaches are not appropriate.

In Python...

## Use external locks

For example, use Redis for locking. Don't do this if you are locking inside of one database, in that case just use the in-built database lock.

## Use serialisable transactions

I've not evaluated these myself, but they do seriously limit throughput and they abort the transaction (similar to optimistic locking)

## References

1. <https://www.2ndquadrant.com/en/blog/postgresql-anti-patterns-read-modify-write-cycles/>
2. <https://ketanbhatt.com/db-concurrency-defects/>
