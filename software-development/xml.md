# XML

## xpath

Find tags ignoring namespaces

```py
"//*[local-name()='reservationOriginatorCode']"
```

Filter nodes based on a sub-node text, then find a sibling element:

```xml
<rf5:ResGuests>
  <ResGuest>
    <reservationID>12345</reservationID>
    <ReservationReferences>
      <ReservationReference type="PMSID" legNumber="1" />
    </ReservationReferences>
  </ResGuest>
<rf5:ResGuests>
```

```py
leg_numbers = set(
    xml.getroottree().xpath(
        # 1. Get ResGuest corresponding to this reservation
        # 2. Get the Leg Number from that ResGuest
        """
        ./rf5:ResGuests/rf5:ResGuest[rf5:reservationID[text()[normalize-space(.)='12345']]]
        //rf5:ReservationReference[@type='PMSID']/@legNumber
        """,
        namespaces=NAMESPACES_MAP,
    )
)
```



