# Shells



There [difference between a shell, terminal, console and command line](https://unix.stackexchange.com/a/4132).

| Fish | Bash |
| :--- | :--- |
| Alt-L : ls |  |
| Alt-P : append "\| less" |  |
| Alt-V : edit command in editor |  |
| Alt-W : what is the current command? |  |
| history | history |

## Safer Bash Scripts

https://vaneyckt.io/posts/safer\_bash\_scripts\_with\_set\_euxo\_pipefail/

set -Eeuxo pipefail

```
set -o errtrace      # Inherit traps
set -o errexit       # stops script if any command fail
set -o nounset       # access to unset variable is considered failure
set -o xtrace       # access to unset variable is considered failure
set -o pipefail      # extends above to failures on pipeline
set -o nounset       # access to unset variable is considered failure
```



