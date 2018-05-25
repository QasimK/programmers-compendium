* Socat - Create a listening service that forwards to a service inside a network namespace \(socat is amazing\): `/usr/bin/socat UNIX-LISTEN:/run/transmission.sock,fork exec:'ip netns exec NETNS socat STDIO tcp-connect\:127.0.0.1\:8080',nofork`
  * HTTP Client -&gt; \[Unix Socket Server\] ---- \| Network Namespace Barrier \| ----&gt; HTTP Server \(localhost listening\)
* strace -p PID - Look at calls between the process and the kernel
* gdb, python-dbg - Look at stack traces live
* TIL: [https://news.ycombinator.com/item?id=17083879](https://news.ycombinator.com/item?id=17083879) "My registrar suspended my domain because an abusive user was using a subdomain for phishing"
* Make Vim respect XDG - [https://tlvince.com/vim-respect-xdg](https://tlvince.com/vim-respect-xdg)

Python Ecosystem

* std 3.7 dataclasses \(https://www.youtube.com/watch?v=T-TwcmT6Rcw "Dataclasses" @Raymond Hettinger\)
  * previously and still alternatively: attrs lib \(has validators, converters and a few other features\)
* pipenv
* py.test
* 


