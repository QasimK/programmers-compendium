# Bash \(sh\) Scripts

* Use [shellcheck](https://www.shellcheck.net/) to lint

## Bash Template

Use the following options for [safer bash scripts](https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/):

```bash
set -Eeuo pipefail
```

Explanation:

```bash
set -o errtrace      # Functions, substitutions & sub-shells inherit traps
set -o errexit       # Stops script if any command fail
set -o nounset       # Error when using unset variables
set -o pipefail      # Error when a command in a pipeline fails
```

The `xtrace` option is also useful for debugging:

```bash
set -x
set -o xtrace        # Print each executed command
```
