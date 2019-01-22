# Linux Overview/Development

* The [filesystem hierarchy](https://www.freedesktop.org/software/systemd/man/file-hierarchy.html)
* [tl;dr](https://tldr.ostera.io/) how-to guide to commands
  * Alt: [bropages](http://bropages.org/)
  * Alt: [cheat](https://github.com/chrisallenlane/cheat)
* Use `.pam_environment` to [set environment variables](https://help.ubuntu.com/community/EnvironmentVariables#A.2BAH4-.2F.pam_environment) in a cross-shell manner
* [thefuck](https://github.com/nvbn/thefuck) corrects your previous console command
* Controlling the [proliferation of dotfiles](https://wiki.archlinux.org/index.php/XDG_Base_Directory_support)
* \(A way-too-big list of tools to make an [awesome shell](https://github.com/alebcay/awesome-shell).\)
* [ip cheat sheat](https://access.redhat.com/sites/default/files/attachments/rh_ip_command_cheatsheet_1214_jcs_print.pdf) \(pdf\)

## Development

* [direnv](https://direnv.net/) - manage environment variables per-project
* [fish](https://fishshell.com/)/[xiki](http://xiki.org/) - alternative shells

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

### Alternative Tools

* ncdu \(du -smh, df -l\)
* [nnn](https://github.com/jarun/nnn) - Terminal File Browser



