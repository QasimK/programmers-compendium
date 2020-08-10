# Postgres

## Executing queries against the replica

> ERROR: canceling statement due to conflict with recovery
>
> Detail: User query might have needed to see row versions that must be removed

The [preferred solution](https://stackoverflow.com/questions/14592436/postgresql-error-canceling-statement-due-to-conflict-with-recovery) is to allow the replica to pause applying the received WAL logs while a query executes:

```ini
# /etc/postgresql/10/main/postgresql.conf on a slave
max_standby_archive_delay = 900s
max_standby_streaming_delay = 900s
```

This is a cumulative delay - if multiple queries a running, then the last one might get terminated after just a second because the total time limit has been reached.

