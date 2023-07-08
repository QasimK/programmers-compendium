# Systemd Files

> "The only thing more complicated and confusing than systemd is the planet's ecosystem." - Me

This page is currently useless.

For example, create `/etc/systemd/system/my-ssh-monitor.service`

```ini
[Unit]
description=My SSH monitor
Requires=network-online.target
Wants=sshd.service

[Service]
User=..
Group=..
WorkingDirectory=/home/my-app/
ExecStart=/bin/my-monitor
ExecStop=/bin/kill -HUP $MAINPID
PrivateTmp=true

[Install]
WantedBy=default.target
```

systemctl daemon-reload to activate the unit file.

sudo systemctl start\|stop\|reload\|restart\|reload-or-restart\|enable\|disable\|status\|is-failed

## Types of Services

Type=simple - default, must not fork, considered to started immediately.

## Targets

What do they do they do?

default.target

network-online.target

multi-user.target

## Timers



