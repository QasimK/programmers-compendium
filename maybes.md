* Socat - Create a listening service that forwards to a service inside a network namespace \(socat is amazing\): `/usr/bin/socat UNIX-LISTEN:/run/transmission.sock,fork exec:'ip netns exec NETNS socat STDIO tcp-connect\:127.0.0.1\:8080',nofork`
  * HTTP Client -&gt; \[Unix Socket Server\] ---- \| Network Namespace Barrier \| ----&gt; HTTP Server \(localhost listening\)
* strace -p PID - Look at calls between the process and the kernel
* gdb, python-dbg - Look at stack traces live
* TIL: [https://news.ycombinator.com/item?id=17083879](https://news.ycombinator.com/item?id=17083879) "My registrar suspended my domain because an abusive user was using a subdomain for phishing"
* Make Vim respect XDG - [https://tlvince.com/vim-respect-xdg](https://tlvince.com/vim-respect-xdg)
* Write scripts, just flipping write them! [https://www.youtube.com/watch?v=Jd8ulMb6\_ls](https://www.youtube.com/watch?v=Jd8ulMb6_ls) "Solve Your Problem with Sloppy Python" @Larry Hastings
* A product manager can buy software from their team, but they can also buy information like, "Is X possible?" or "How many points to build Y?" or "How much support would be reduced if we did Z?".

Python Ecosystem

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

JavaScript Ecosystem

* [https://prettier.io/](https://prettier.io/) \(there was another opinionated one?\)
  * [https://standardjs.com/](https://standardjs.com/)



