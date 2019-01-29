# Terminal Pro

## NNN

The terminal file manager 

## XDG-Mime

Default applications.

```console
$ xdg-mime query filetype myfile.md

xdg-mime query default text/plain
text/plain
$ ls /usr/share/applications
... org.gnome.gedit.desktop ...
$ xdg-mime default org.gnome.gedit.desktop text/plain
$ xdg-mime query default text/plain
org.gnome.gedit.desktop
```



