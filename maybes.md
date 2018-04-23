* Socat - Create a listening service that forwards to a service inside a network namespace \(socat is amazing\): `/usr/bin/socat UNIX-LISTEN:/run/transmission.sock,fork exec:'ip netns exec NETNS socat STDIO tcp-connect\:127.0.0.1\:8080',nofork`
  * HTTP Client -&gt; \[Unix Socket Server\] ---- \| Network Namespace Barrier \| ----&gt; HTTP Server \(localhost listening\)
* strace -p PID - Look at calls between the process and the kernel



