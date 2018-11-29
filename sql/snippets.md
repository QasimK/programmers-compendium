# Snippets

## Bulk Insert with two columns matching sequence value

I had a table with two columns: `transaction_id` and `xml`, but the `xml` text also contains the `transaction_id`. If you generate the `transaction_id` value client-side, then you can of course set the two columns on your INSERT.

However, I wanted the `transaction_id` value to be a "semi-unique" identifier. It is semi-unique because an external system requires a value between 1-999,999,999 only. So, for that column I use a bounded Integer Sequence that will cycle back to 1 when it reaches the maximum value of 999,999,999.

Then, the problem is how to generate the XML without knowing the `transaction_id` that will be generated when the database does the INSERT?

One approach that I tried was to do the bulk-insert, returning the `transaction_id`s. Then to do another UPDATE replacing the XMLs. I found the built-in `replace` was good enough if the placeholder was sufficiently unique, but had to cast the integer `transaction_id` to a string for it to work \(no auto-casts for you!\). It has to wrapped in a transaction of course.

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
            xml = replace(xml, 'X_override_transaction_id', transaction_id::char)
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
    (replace('<xml version...' , 'X_override_transaction_id', currval('outbound_messages_transaction_id_seq')::char))  
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



