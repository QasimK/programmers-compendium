# Snippets

## Bulk Insert with two columns matching sequence value

I had a table with two columns: `transaction_id` and `xml`, but the `xml` text also contains the `transaction_id`. If you generate the `transaction_id` value client-side, then you can of course set the two columns on your INSERT.

However, I wanted the `transaction_id` value to be a "semi-unique" identifier. It is semi-unique because an external system requires a value between 1-999,999,999 only. So, for that column I use a bounded Integer Sequence that will cycle back to 1 when it reaches the maximum value of 999,999,999.

Then, the problem is how to generate the XML without knowing the `transaction_id` that will be generated when the database does the INSERT?

One approach that I tried was to do the bulk-insert, returning the `transaction_id`s. Then to do another UPDATE replacing the XMLs. I found the built-in `replace` was good enough if the placeholder was sufficiently unique, but had to cast the integer `transaction_id` to a string for it to work \(no auto-casts for you!\). It has to wrapped in a transaction of course.

\(I had originally casted it to `CHAR`, but that just results in a single character...\)

```py
insert_records = outbound_message_df.to_dict('records')
with session.begin_nested():
    result = session.execute(
        cls.__table.insert(
            values=insert_records
        ).returning(
            cls.id,
        )
    )
    ids = [row[0] for row in result.fetchall()]

    fix_transaction_ids = '''
        UPDATE
            outbound_messages
        SET
            xml = replace(xml, 'X_override_transaction_id', transaction_id::TEXT)
        WHERE
            id in :ids
    '''
    session.execute(fix_transaction_ids, params={'ids': ids})
```

This worked, but I thought that it seemed inefficient. The solution that I came to was to replace the XML string on the INSERT using database functions:

```SQL
INSERT INTO  
    outbound_messages (xml)   
VALUES  
    (replace('<xml version...' , 'X_override_transaction_id', currval('outbound_messages_transaction_id_seq')::TEXT))  
;
```

This SQL inserts the real XML string. but replaces the placeholder `X_override_transaction_id` with the correct value of `transaction_id`!

Or with SQLAlchemy, doing a simultaneous multi-insert:

```py
@classmethod
def substitute_func(xml):
    return func.replace(
        xml,
        'X_override_transaction_id',
        cast(func.currval('outbound_messages_transaction_id_seq'), String),
    )

    outbound_message_df['xml'] = outbound_message_df['xml'].map(substitute_func)
    insert_records = outbound_message_df.to_dict('records')
    return cls.__table__.insert(values=insert_records)
```

**However**, this fails when giving multiple values because the current value is fixed across all the rows! It seems to be very difficult to get a sequence during an insert per row-value. Instead, we can get the next value for the sequence, which happens sequentially for the rows, and offset it by one.

```SQL
INSERT INTO  
    opera_outbound_messages (xml, created_utc, updated_utc)   
VALUES  
    (replace('A-OVERRIDE' , 'OVERRIDE', (nextval('outbound_messages_transaction_id_seq') + 1)::text), now(), now()),
    (replace('B-OVERRIDE' , 'OVERRIDE', (nextval('outbound_messages_transaction_id_seq') + 1)::text), now(), now()),
    (replace('B-OVERRIDE' , 'OVERRIDE', (nextval('outbound_messages_transaction_id_seq') + 1)::text), now(), now())
;
SELECT transaction_id, xml from outbound_messages;
```

With this SQL query, the database obtains the value for `xml` using the next value for the sequence, e.g. 1. Then obtains the next value for the column `transaction_id`, i.e. 2. This is done row-by-row so we get consistent values.We offset the first value to match the second value, so we get `2, 2`.

**We note that this sequence cycles**, so it's important that when we add one to the sequence value for `xml`, that it wraps around appropriately. This will be fine so long as when you add one, you do not need to wrap.

So we must use something like: `minvalue=2, maxvalue=99, cycle=True`. Start on an even number and end on an odd number! \(Or the other way around if you want to start at 2 rather than 3.\)

The equivalent SQLAlchemy:

```py
transaction_id_seq = Sequence(
    'outbound_messages_transaction_id_seq',
    minvalue=2,
    maxvalue=999999999,
    cycle=True,
    metadata=Base.metadata,
)
transaction_id = Column(
    Integer,
    # Do NOT set the value client-side because it messes up the bulk insert.
    # default=transaction_id_seq,
    server_default=transaction_id_seq.next_value(),
    nullable=False,
)

@classmethod
def substitute_func(xml):
    return func.replace(
        xml,
        'X_override_transaction_id',
        cast(func.nextval('outbound_messages_transaction_id_seq') + 1, String),
    )

    outbound_message_df['xml'] = outbound_message_df['xml'].map(substitute_func)
    insert_records = outbound_message_df.to_dict('records')
    return cls.__table__.insert(values=insert_records)
```

Note: [SQLAlchemy's comment on server-side vs client-side sequences](https://docs.sqlalchemy.org/en/rel_1_2/core/defaults.html#associating-a-sequence-as-the-server-side-default).

> Placement of the Sequence in both the Python-side and server-side default generation contexts ensures that the “primary key fetch” logic works in all cases. Typically, sequence-enabled databases also support RETURNING for INSERT statements, which is used automatically by SQLAlchemy when emitting this statement. However if RETURNING is not used for a particular insert, then SQLAlchemy would prefer to “pre-execute” the sequence outside of the INSERT statement itself, which only works if the sequence is included as the Python-side default generator function.

You could possibly go to the effort of making the sequence sequential \(1, 2, 3, ...\).

