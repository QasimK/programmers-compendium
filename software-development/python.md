# Python

**pipx **\([https://pypi.org/project/pipx/](https://pypi.org/project/pipx/)\)** **- execute binaries from Python packages in isolated environments.

Hey, there's already a [Hitchhiker's Guide to Python](http://docs.python-guide.org/en/latest/)! This is quite comprehensive on the Python _development_ basics.

GIL required to run bytecode, but not when waiting on I/O - can switch to different thread. CPython has macros to release and re-aquire GIL which can be used if extension does not need to run python bytecode/do any kind of ref-count changes \(e.g. sleep, read/write files, network socket, numpy, image processing\(?\)\). Cannot share GIL in CPU-bound code. CPU-bound "check" every 100 ticks to allow switching. Note: I/O doesn't often block unless you are flushing - OS buffers. Note: Threads/Processes result in CPU context switches, while async does not.

Pure CPU: Process &lt;---&gt; Threads &lt;---&gt; Async: Pure I/O \(Many "Connections"/Slow I/O\).

Async I/O clearly delineates the context switch locations.

| Processes | Threads | Async I/O |
| :--- | :--- | :--- |
|  |  | No CPU Context Switches |
|  | Shared memory can result in race conditions. | No race conditions.. usually. |
|  |  | No dead locks.. usually. |
| Costly. | Each thread has its own stack. | Shared Stack. Uses an executor pool to run sync tasks in a background thread \(this uses additional resources\) |

Python 2 -&gt; 3: Strings/Bytes, Print, Super\(\) - new style classes, division.

## Linting

* black \([how-to](https://engineering.depop.com/implementing-python-black-on-a-legacy-codebase-35b37f10ce18)\)
* flake8
  * pycodestyle \(formerly pep8\)
  * pyflakes
  * mccabe
* pylint
* bandit/dodgy/safety\(pipenv\)
* prospector
* isort
* [Layer Linter](https://github.com/seddonym/layer_linter) \(not tried\)
* pydocstyle
* mypy
* vulture
* pyroma for libraries \(setup.py\)

## History

Python 3.8

* assignment expressions `if (n := len(a)) > 10:`
* improved f-strings `f"{x*9 + 15=}"`
* positional and keyword only parameters
* multiprocessing.shared\_memory

Python 3.7:

* dataclasses TBD: talk link.
* contextvars
* breakpoint\(\)
* postponed evaluation of type annotations
* dicts officially respect insertion-order
* time - nanosecond resolution functions
* `f"{number:,}`

Python 3.6:

* f-string literals
* underscores in numeric literals
* extended variable annotations
* \(async generators & comprehensions\)
* Local Time Disambiguation
* secrets module

Python 3000:

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

## Libraries

* [passlib](https://passlib.readthedocs.io/) - high-level secrets library
* [pysnooper](https://github.com/cool-RR/pysnooper) - line-by-line print debugging
* [boltons](https://boltons.readthedocs.io/en/latest/) - "boltons should be buitins" \(stdlib additions\)

### Pytest

See [my cheat sheet.](https://github.com/QasimK/learn-it/blob/master/pytest-cheat-sheet.md)

### SQLAlchemy

* Remember to index on ForeignKeys. Postgres does not do this automatically. MySQL always does this.
* Remember to set `onupdate` and `ondelete` cascades on ForeignKeys.
* To prevent spurious joins: \(this cannot be used with NULLable outer joins\)
  ```py
  session.query(Model).options(
      sa.orm.joinedload("child").joinedload("grandchild"),
      sa.orm.raiseload("*"),
  )
  ```

### Pandas

Understanding [SettingWithCopyWarning](https://towardsdatascience.com/understanding-settingwithcopywarning-7142952a01fa).

Raising it as an error \(`setup.cfg`\)

```ini
[tool:pytest]
filterwarnings =
    error::pandas.core.common.SettingWithCopyWarning
    error::FutureWarning
```

## Gotchas

Probably the last one you will learn:

```py
x = [1,2,3,4]
lambdas = [
   lambda: x[i]
   for i in range(4)
]

[f() for f in lambdas]
```



