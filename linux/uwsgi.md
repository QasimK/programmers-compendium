# uWSGI

The documentation that likes telling stories. uWSGI has a stupid _insane_ number of features.

```ini
[uwsgi]
; Increased efficiency for larger number of processes/threads (no reason not to).
thunder-lock = True

; (Threads disabled)
processes = 2
harakiri = 30

; uwsgitop <stats-socket>
stats = /run/uwsgi/app/APP_NAME/stats-socket
memory-report = True
; Clear environment on exit
vacuum = True

; Only allow this HOST_NAME otherwise return HTTP 421 (security)
route-if-not = equal:${HTTP_HOST};HOST_NAME return:421
```

* Due to uWSGI's default pre-forking behaviour, you may want `lazy-apps` or a postfork fix function.

## Features

* [Notifications](https://uwsgi-docs.readthedocs.io/en/latest/AlarmSubsystem.html)
* [Remote Procedure Call](https://uwsgi-docs.readthedocs.io/en/latest/RPC.html)
* [Stats Server](https://uwsgi-docs.readthedocs.io/en/latest/StatsServer.html)
* [Metrics Collection](https://uwsgi-docs.readthedocs.io/en/latest/Metrics.html)
* [App Security Jails](https://uwsgi-docs.readthedocs.io/en/latest/Namespaces.html) \(Namespaces\)
* [App Resource Limits](https://uwsgi-docs.readthedocs.io/en/latest/Cgroups.html) \(Cgroups\)
* Auto-scaling \([Zergs](https://uwsgi-docs.readthedocs.io/en/latest/Zerg.html), [Broodlord](https://uwsgi-docs.readthedocs.io/en/latest/Broodlord.html), [Cheaper](https://uwsgi-docs.readthedocs.io/en/latest/Cheaper.html)\)
* [Memory deduplication](https://uwsgi-docs.readthedocs.io/en/latest/KSM.html)
* HTTP/TLS/SNI/WebSocket/Static Files
* [Custom Signals](https://uwsgi-docs.readthedocs.io/en/latest/Signals.html) \(target: workers/spoolers/mules/farms; event: custom/filesystem/timers/cron\)
* [Caches](https://uwsgi-docs.readthedocs.io/en/latest/Caching.html) \(SharedMemory\)
* [Queues](https://uwsgi-docs.readthedocs.io/en/latest/Queue.html)
* Background tasks \([mules](https://uwsgi-docs.readthedocs.io/en/latest/Mules.html), [spoolers](https://uwsgi-docs.readthedocs.io/en/latest/Spooler.html)\)
  * [Cron & Timers](https://uwsgi-docs.readthedocs.io/en/latest/Cron.html)
* [Locks](https://uwsgi-docs.readthedocs.io/en/latest/Locks.html)
* [Routing](https://uwsgi-docs.readthedocs.io/en/latest/InternalRouting.html) \(requests, cache\)
* [Legion](https://uwsgi-docs.readthedocs.io/en/latest/Legion.html) \(Failover?\)
* ​HTTP/TLS/SNI/WebSocket/Static Files/Async Apps

## Python

uWSGI has an easy interface \([uwsgidecorators](https://pypi.python.org/pypi/uwsgidecorators/)\) to:

* Background tasks \(spooler, mules, cron, timers, and generic execute-task-in-background-thread\)
* Communcation between all processes using signals
* Locks
* [In-memory cache](https://uwsgi-docs.readthedocs.io/en/latest/Caching.html) \(with periodic disk sync\)

They are shared only within that master uWSGI instance.

```ini
; Python
plugin = python3
virtualenv = /home/APP_NAME/virtualenv/
chdir = /home/APP_NAME/APP_DIR/
module = APP_NAME.wsgi:application

; Background Tasks
spooler = /home/APP_NAME/tasks/
import = APP_NAME.tasks

; uwsgi --connect-and-read /run/uwsgi/app/APP_NAME/tracebacker1
py-tracebacker = /run/uwsgi/app/APP_NAME/tracebacker
```



