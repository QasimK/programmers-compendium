# Trust in your database

Transactions.

## CAP

Choose two: consistency, availability or partition tolerence

Alt: PACELC.

## ACID

Traditional RDBMS drop availability

* Atomicity - transaction is all or nothing
* Consistency - database-level rules \(e.g. constraints\) will always be met
* Isolation - differing levels! Essentially nobody else sees your changes until you want them to
* Durability - when it says its done you can either nuke the power cable, machine, or data centre

## BASE

**B**asically **A**vailable, **S**oft state, **E**ventual consistency.

Often chosen by NOSQL databases. Drops consistency.

Durability concerns. Consistency concerns.

