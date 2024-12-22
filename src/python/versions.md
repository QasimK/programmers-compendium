# Python History

## Python 3.12

* more flexible f-strings
* simpler type annotations for generic classes `class Car[T]`
* unambiguous type aliases `type cars = list[str]`
* typing check decorator `@override`
* type annotation for `**kwargs: Unpack[MyTypedDict]`
* `python -m uuid`
* `python -m sqlite3`
* debugging values in pdb `$_retval` and `$_exception`


## Python 3.11

* exception groups and `except*` syntax
* asyncio task groups  `TaskGroup`
* add context to exceptions using `add_note`
* `datetime.UTC` alias
* date and time support for `fromisoformat`
* `StrEnum`
* enum verification checks `verify`
* `operator.call`
* type hints `Self` and `LiteralString`
* typing `assert_never` and `reveal_type`

## Python 3.10

* structural pattern matching `match`
* context managers can be defined across multiple lines
* union operator for type hints `X | Y`
* type hint guarding `TypeGuard`
* itertools `pairwise`

## Python 3.9

* time zone support built-in with `zoneinfo` module
* in-place union `|=` of dictionary-like objects
* combined annotations `Annotated[float, "seconds"]`
* type hint containers directly `list[float]`
* more flexible decorator syntax
* string `removeprefix` and `removesuffix`
* maths `gcd` and `lcm`

## Python 3.8

* assignment expressions `if (n := len(a)) > 10:`
* improved f-strings `f"{x*9 + 15=}"`
* positional and keyword only parameters `def f(a, /, b, *, c)`
* multiprocessing.shared\_memory
* `functools.singledispatchmethod`
* typing `Literal` and `Final`
* (xml.etree.ElementTree wildcard stuff — super humorous & annoying timing!)`

## Python 3.7:

* dataclasses TBD: talk link.
* contextvars
* breakpoint\(\)
* postponed evaluation of type annotations
* dicts officially respect insertion-order
* time - nanosecond resolution functions
* `f"{number:,}`

## Python 3.6:

* f-string literals
* underscores in numeric literals
* extended variable annotations
* \(async generators & comprehensions\)
* Local Time Disambiguation
* secrets module

## Python 3.1 - 3.5

Skipped

## Python 3000:

* unicode vs bytes
* print\(\) vs print
* division float vs int
* new-style vs classic classes
* relative imports \(?\)
* views and iterators vs lists \(e.g. dict.items\(\) == dict.iteritems\(\)\)
* nonlocal
* extended iterable unpacking
* set literals
* removed tuple parameter unpacking
