# Testing in Python

See [my cheat sheet](https://github.com/QasimK/learn-it/blob/master/pytest-cheat-sheet.md).

Useful libraries:

* pytest
* pytest-socket
* pytest-randomly
* pytest-timeout
* pytest-cov
* pytest-icdiff
* pytest-asyncio
* pytest-sugar

Stop network calls:

```py
import socket
def stop_network_calls(monkeypatch)
    def _socket(*_, **__):
        raise Exception()
    monkeypatch.setattr(socket, "socket", _socket)

```

Randomise time-zones:

```py
import os, random, pytest
from _pytest.monkeypatch import MonkeyPatch

@pytest.fixture(scope="session")
def monkeysession():
    mpatch = MonkeyPatch()
    yield mpatch
    mpatch.undo()

@pytest.fixture(autouse=True, scope="session")
def randomise_timezone(monkeysession):
    monkeysession.setenv("TZ", random.choice(["Europe/London"]))
```
