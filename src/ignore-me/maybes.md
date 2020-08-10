* Socat - Create a listening service that forwards to a service inside a network namespace \(socat is amazing\): `/usr/bin/socat UNIX-LISTEN:/run/transmission.sock,fork exec:'ip netns exec NETNS socat STDIO tcp-connect\:127.0.0.1\:8080',nofork`
  * HTTP Client -&gt; \[Unix Socket Server\] ---- \| Network Namespace Barrier \| ----&gt; HTTP Server \(localhost listening\)
* strace -p PID - Look at calls between the process and the kernel
* gdb, python-dbg - Look at stack traces live
* TIL: [https://news.ycombinator.com/item?id=17083879](https://news.ycombinator.com/item?id=17083879) "My registrar suspended my domain because an abusive user was using a subdomain for phishing"
* Make Vim respect XDG - [https://tlvince.com/vim-respect-xdg](https://tlvince.com/vim-respect-xdg)
* Write scripts, just flipping write them! [https://www.youtube.com/watch?v=Jd8ulMb6\_ls](https://www.youtube.com/watch?v=Jd8ulMb6_ls) "Solve Your Problem with Sloppy Python" @Larry Hastings
* A product manager can buy software from their team, but they can also buy information like, "Is X possible?" or "How many points to build Y?" or "How much support would be reduced if we did Z?".
* Fira code for this ligatures: [https://medium.com/@docodemore/an-alternative-to-operator-mono-font-6e5d040e1c7e](https://medium.com/@docodemore/an-alternative-to-operator-mono-font-6e5d040e1c7e)
* [http://learnyouanagda.liamoc.net/pages/introduction.html](http://learnyouanagda.liamoc.net/pages/introduction.html)
* camelCase, PascalCase, snake\_case, kebab-case, CAPS\_CASE.
* Sudoers:`pccuser ALL=(ALL:ALL) NOPASSWD:/path/to/command ""`
  pcuser = user or %group we are giving permission to
  ALL= is the host \(ALL works unless you are sharing file across hosts\)
  \(ALL:ALL\) is \(user-we-can-command-as:group-we-can-command-as\), i.e. sudo -u user -g group. If omitted only root. Can use just \(ALL\)
  NOPASSWD: is tags
  command may be "ALL".
  "" prevents command parameters \(do not use when specifying parameters\)

  -&gt; User Host = \(Runas\) Command

  * Example \(placed after NO-NOPASSWD\): `%wheel ALL=(root) NOPASSWD:/usr/bin/pacmatic -Syu`
* microservices.io

## Python Ecosystem

* stdlib 3.7 dataclasses \([https://www.youtube.com/watch?v=T-TwcmT6Rcw](https://www.youtube.com/watch?v=T-TwcmT6Rcw) "Dataclasses" @Raymond Hettinger\)
  * previously and still alternatively: attrs lib \(has validators, converters and a few other features\)
* pipenv \([https://www.youtube.com/watch?v=GBQAKldqgZs](https://www.youtube.com/watch?v=GBQAKldqgZs) "Pipenv" @Kenneth Reitz\)
* pytest
* typing: \(mypy or pyre, MonkeyType\) \([https://www.youtube.com/watch?v=pMgmKJyWKn8](https://www.youtube.com/watch?v=pMgmKJyWKn8) "Real World" @Carl Meyer\)
* Instagram 2018 1.5mil lines of Python
* linting complete: [https://jeffknupp.com/blog/2016/12/09/how-python-linters-will-save-your-large-python-project/](https://jeffknupp.com/blog/2016/12/09/how-python-linters-will-save-your-large-python-project/)
  * Create based on project Daedalus.
* [https://awesome-python.com/](https://awesome-python.com/)

[https://github.com/ambv/black](https://github.com/ambv/black) - pycodestyle auto

## JavaScript Ecosystem

* [https://prettier.io/](https://prettier.io/) \(there was another opinionated one?\)
  * [https://standardjs.com/](https://standardjs.com/)

## Personality

* Be likeable - [https://news.ycombinator.com/item?id=16883882](https://news.ycombinator.com/item?id=16883882)
* Don't be a hero - [https://al3x.net/posts/2010/01/09/dont-be-a-hero.html](https://al3x.net/posts/2010/01/09/dont-be-a-hero.html)
* On how to build an engineering culture - [http://firstround.com/review/why-firing-brilliant-assholes-is-required-to-build-a-great-engineering-culture/](http://firstround.com/review/why-firing-brilliant-assholes-is-required-to-build-a-great-engineering-culture/)
* How to apologise\(!\). [Source](https://www.thecut.com/2017/06/these-apology-critics-want-to-teach-you-how-to-say-sorry.html)

* An expression of regret, i.e. "I'm sorry"
* An explanation \(but not a justification\)
* An acknowledgement of responsibility \(most important\)
* A declaration of repentance
* An offer of repair
* A request for forgiveness \(least importance\)

Don't say: "IF", "I regret", Don't use passive voice. Say how you're going to make sure this doesn't happen again.

