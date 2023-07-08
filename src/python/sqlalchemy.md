# Using SQLAlchemy in Python

SQLAlchemy is an absolutely outstanding, best-in-class ORM library.

_However_, the default setup is not perfect.


## Idle in Transaction

The default behaviour in SQLAlchemy is to open a transaction for read queries.

However, read queries (inside a transaction), will block all database migrations.

Considering, that migrations block all subsequent query requests, this can take down an application.

Thus, even small transactions can become a serious problem.

In particular, consider when sessions are tied to web requests—a transaction could be open for several seconds.



### Recommendation

When using the usual READ COMMITTED isolation level:

* use auto-commit for reads
* switch to explicit transactions for writes


## Weakly Referenced Objects

SQLAlchemy weakly references ORM instances. This means, when you convert them into a core type, they are dropped from the identity map.

The impact is that when it comes to updates, SQLAlchemy will have to inefficiently query the database for the object again.

### Recommendation

Use [SQLAlchemy's recipe for strong references](https://docs.sqlalchemy.org/en/20/orm/session_state_management.html#session-referencing-behavior).


## Good to Know

* SQLAlchemy follows the unit of work pattern and stores
* SQLAlchemy using mutation tracking and updates the precise fields that changed
