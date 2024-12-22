# Python

- Use [pipx](https://pypi.org/project/pipx/) to install environment management tools and scripts. (Execute binaries installed in isolated virtual environments.)
- Use [pdm](https://pdm-project.org/) to manage packaging and dependencies.
- Use a [PYTHONSTARTUP](https://www.bitecode.dev/p/happiness-is-a-good-pythonstartup)

Hey, there's already a [Hitchhiker's Guide to Python](http://docs.python-guide.org/en/latest/)! This is quite comprehensive on the Python _development_ basics.

## Libraries

### Linting

- ruff
- mypy
- vulture
- bandit/dodgy/safety
- [Layer Linter](https://github.com/seddonym/layer_linter) (not tried)

### Development

- [cqd](https://github.com/rayking99/cqd) for debugging (`PYTHONSTARTUP` it)
- [pysnooper](https://github.com/cool-RR/pysnooper) - line-by-line print debugging

### Libraries

- [passlib](https://passlib.readthedocs.io/) - high-level secrets library
- [boltons](https://boltons.readthedocs.io/en/latest/) - "boltons should be buitins" (stdlib additions)
- [freezegun](https://github.com/spulec/freezegun)

### Pandas

Understanding [SettingWithCopyWarning](https://towardsdatascience.com/understanding-settingwithcopywarning-7142952a01fa).

Raising it as an error (`setup.cfg`)

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

## GIL

- The GIL is required to run bytecode, but not when waiting on I/O - Python can switch to different thread.
- CPython has macros to release and re-aquire GIL which can be used if extension does not need to run python bytecode/do any kind of ref-count changes (e.g. sleep, read/write files, network socket, `numpy`).
- The GIL cannot be shared in CPU-bound code. CPU-bound "check" every 100 ticks to allow switching.
- I/O doesn't often block unless you are flushing - OS buffers
- Threads/Processes result in CPU context switches, while async does not.

Pure CPU: Process \<---> Threads \<---> Async: Pure I/O (Many "Connections"/Slow I/O).

Async I/O clearly delineates the context switch locations, in theory.

| Processes | Threads | Async I/O |
| :--- | :--- | :--- |
|  |  | No CPU Context Switches |
|  | Shared memory can result in race conditions. | No race conditions.. usually. |
|  |  | No dead locks.. usually. |
| Costly. | Each thread has its own stack. | Shared Stack. Uses an executor pool to run sync tasks in a background thread (this uses additional resources) |

Python 2 -> 3: Strings/Bytes, Print, Super() - new style classes, division.
