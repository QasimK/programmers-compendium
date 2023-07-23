# Linux Overview/Development

* The [filesystem hierarchy](https://www.freedesktop.org/software/systemd/man/file-hierarchy.html)
* [tl;dr](https://tldr.ostera.io/) how-to guide to commands
  * Alt: [bropages](http://bropages.org/)
  * Alt: [cheat](https://github.com/chrisallenlane/cheat)
  * Alt: [pet](https://github.com/knqyf263/pet/)
* [thefuck](https://github.com/nvbn/thefuck) corrects your previous console command
* How to control the [proliferation of dotfiles](https://wiki.archlinux.org/index.php/XDG_Base_Directory_support)
* \(A way-too-big list of tools to make an [awesome shell](https://github.com/alebcay/awesome-shell).\)
* [ip cheat sheat](https://access.redhat.com/sites/default/files/attachments/rh_ip_command_cheatsheet_1214_jcs_print.pdf) \(pdf\)
* A check list of [things to know about the command line](https://github.com/jlevy/the-art-of-command-line)

## Development

* [direnv](https://direnv.net/) - manage environment variables per-project
* [fish](https://fishshell.com/)/[xiki](http://xiki.org/) - alternative shells
* [tmux](https://github.com/tmux/tmux) - remote window management - [cheatsheat](https://gist.github.com/MohamedAlaa/2961058)
* [spacer](https://github.com/samwho/spacer) - put spaces between command output

### Packaging

If you ever want to package something for Linux, [Repology](https://repology.org/) covers where.

## Web Tools

* [crobtab.guru](https://crontab.guru/) - write cron schedules
* [explainshell](https://explainshell.com/) - explain \(long\) shell commands

## Shell

* Consider an alias like `alias q="ls | grep --color -i"`.
* The `history` command \(`history search`\).
* Process management: & fg bg jobs kill disown nohup \(CTRL+C/Z\).
* `kill -SIGSTOP` and `kill -SIGCONT` for pause/resume.
* `pgrep` to search for PID by name.
* `script` to record shell session in file \(and `cat` or  `less -R` to view\).
* From `less` to edit, press `v`.
* Use `type -a` not `which` as the [latter is problematic](https://old.reddit.com/r/archlinux/comments/de1er6/arch_linux_news_base_group_replaced_by_mandatory/f2ynnho/)

### Alternative Tools

* ncdu \(du -smh, df -l\)
* [nnn](https://github.com/jarun/nnn) - Terminal File Browser

## Makefiles

I advise [avoiding makefiles to run scripts](thoughts/avoid-makefiles.md).

Template:

```makefile
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

##     help:   This.
.PHONY: help
.DEFAULT: help
help: Makefile
#       Find all double comments and treat them as docstrings
        @echo "make <command>"
        @sed -n 's/^##//p' $<

##     watch:  Hot-reload web-app server.
.PHONY: watch
watch:
#       Build files in case they changed while we were not watching
        $(MAKE) build
        watchman-make -p '*.py' 'Makefile' 'Dockerfile.web' '.dockerignore' -t build


##
##Run make with VERBOSE=1 for additional output.
$(VERBOSE).SILENT:
# Delete targets on failure
.DELETE_ON_ERROR:
```



