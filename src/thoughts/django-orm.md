# Django ORM

Django has tight integration between relational databases, HTML, and REST APIs. By defining one model, you get a web interface to modify it, a database interface to query or modify it, and HTML interfaces (forms) to query/modify it. This is fantastic for rapid development.

So, if you're in that tightly-coupled ecosystem and legitimately making use of it, then bear those pros in mind.

I want to talk about when you're not using Django's Admin interface, and HTML forms and templates. This is much more likely for any large application.

Related Article: <https://calpaterson.com/activerecord.html>

## The pain

Django's ORM follows

I want to talk about Django's ORM and my explain my thoughts on why I think it should be avoided.

## It's not SQL

Django goes out of its way to hide SQL, database principles and Python's standard interface to databases. This means less transferable knowledge is learnt, and actual understanding about databases is harder to come by.

SQLAlchemy maps much more directly onto

### Joins

Let's do a simple join:

```python
Books.objects.filter(author__name="django")
```

It's not obvious at all that a join is happening.

### Aggregates

```python
Book.objects.annotate(Count('chapters'))
```

vs

```
SELECT book.*, count(chapter.id)
FROM book
JOIN chapter using (book_id);
```


## It's not Python's DBAPI

...

## It hides the global state

From **anywhere** you can call the database:

```python
Book.objects.create()
```

That is actually pretty bad, but further this demonstrates that the database connection, cursor, session, transaction are all hidden away.

```python
with Session(engine) as session:
    session.add(book)
    session.commit()
```

Further reading: https://docs.sqlalchemy.org/en/14/orm/session_transaction.html?highlight=savepoint#session-level-vs-engine-level-transaction-control

## It uses autocommit

By default, Django uses autocommit where every statement is immediately committed. This is against the PEP 249 standard and usually not what you want.

Complex applications often perform complex queries and mutations that must be kept consistent, and thus

To use a transaction:

```python
with transaction.atomic(durable=True):
    obj1.save()
    obj2.save()
```

SQLAlchemy ORM:

```python
with session.begin():
    session.add(obj1)
    session.add(obj2)
```

Further reading: https://docs.sqlalchemy.org/en/14/changelog/migration_20.html#library-level-but-not-driver-level-autocommit-removed-from-both-core-and-orm

## It mixes together too many things

* Model fields can define `blank` which is a client-side validation.
* Model fields can define `verbose_name` which is for displaying to users.

## It's not clear when queries are executed

There are a lot of rules on when a query is actually executed. I'll grant they're pretty straightforward, but there are edge cases to ensure multiple queries are not executed by accident.

```python
results = Book.objects.all()
if len(results) > 2:
    print(results)
```

In comparison, with SQLAlchemy there is an explicit execute:

```python
results = session.execute(select(Book))
```

## Complex queries are nasty

SQLAlchemy has strong support for niche features in comparison to Django.

## Transactions are a mess

Though in Django 3.2, they finally added `transaction(durable=True)`, the whole transaction system is opaque.

## It's not DDD-compatible

Django forces you to define your models in the root of an "app", while with a good code structure the database models will be hidden away.
