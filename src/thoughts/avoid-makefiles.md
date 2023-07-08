# Avoid using Makefiles as a Script Runner

The purpose of a makefile is to create a directed acyclic graph of dependencies to build files.

* it is yet another custom syntax with its own caveats to learn
* long shell scripts must be separate files or badly inlined
* most targets will be `.PHONY` defeating the purpose of the tool
* makefiles use `mtime` to detect changes which can be unreliable for when a team develops using git branches
* makefiles usually need additional configuration (help, .PHONY, flags, failure)
* `make` may require explicit installation on a developer's system

Instead, just use bash scripts in a folder.
