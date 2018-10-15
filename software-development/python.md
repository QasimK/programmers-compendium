# Structuring Python Projects

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

Python 3.7:

* Dataclasses TBD: talk link.
* contextvars
* breakpoint\(\)
* Postponed evaluation of type annotations
* dicts officially respect insertion-order
* time - nanosecond resolution functions

Python 3.6:

* f-string literals
* underscores in numeric literals
* extended variable annotations
* \(async generators & comprehensions\)
* Local Time Disambiguation
* secrets module

Python 3:

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



