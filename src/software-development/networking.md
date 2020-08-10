# Networking

Private networks:

* 10.0.0.0/8 \(255.0.0.0\)
* 192.168.0.0/16 \(255.255.0.0\)
* 172.16.0.0/12 \(255.240.0.0\)

Connections\(?\):

[https://developers.redhat.com/blog/2018/10/22/introduction-to-linux-interfaces-for-virtual-networking/](https://developers.redhat.com/blog/2018/10/22/introduction-to-linux-interfaces-for-virtual-networking/)

* Bridge \(Like a Physical Network Switch\)
  * One side of bridge gets IP addresses 10.0.0.2+. The bridge gateway would be 10.0.0.1
  * The other side is, i.e. the host IP 192.168.1.2+
  * NAT Port mapping required
  * Anything connected to the bridge can communicate with each other
* MACVLAN
  * Connect directly to network, get IP address on network
  * MAC address is virtualised on the NIC - requires promiscuous mode, usually not allowed on cloud
  * High Performance \(no NAT/bridge\)
* IPVLAN
  * 



