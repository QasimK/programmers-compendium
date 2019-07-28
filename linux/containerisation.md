# Containers

1. Programming-level, e.g. Python's Virtualenv
2. Kernel-level
   1. Application encapsulating:, e.g.Docker \(ephemeral, separate storage\)
   2. OS encapsulating, e.g. LXC, LXD, and kind-of chroot \(UNIX\)
3. Hardware virtualisation
   1. Heavyweight OS \(Type 2 hosted hypervisor\), e.g. Vagrant \(depending on back-end\), Virtualbox
   2. \(Type 1 bare metal\) Hypervisor, e.g. KVM, Hyper-V

Docker, LXC, LXD \(uses LXC\) all use, on Linux, Linux cgroups and namespaces\(net, user, pid, ipc, cgroup\).

Kubernetes can be used for orchestration.

You also have things like Firejail, Snap/Flatpak, and AppImage.

Containers may conflate:

* Security via isolation
* Packaging dependencies
* Efficient resource utilisation

## Developing with Vagrant

> Consider LXD as a lightweight, non-portable alternative.

This is useful if you are working on conflicting projects, or want to keep your computer tidy. Keep your setup on your host \(text editor and IDE appliations and their config files\), and run the project \(any executables\) within the container. A shared folder can be used to store the repository.

Vagrant is easy if you use the default Virtualbox provider. And, apparently, impossible with vagrant-lxc :/

Plugins \(they have been a disaster for me\):

* [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) to keep VirtualBox's Guest Additions up-to-date on the Vagrant box _that started failing_
* [vagrant-notify-forwarder](https://github.com/mhallin/vagrant-notify-forwarder/) for filesystem event forwarding _that is_ _not reliable_
* [vagrant-disksize](https://github.com/sprotheroe/vagrant-disksize/) to easily increase the size of your Virtualbox disk
  * `config.disksize.size = '20GB'`
* [vagrant-share](https://www.vagrantup.com/docs/share/) to be able to share your container with others _that I've never used_
* [vagrant-lxc](https://github.com/fgrehm/vagrant-lxc/) for LXC boxes _that don't work_

Create a [merging custom Vagrantfile](https://www.vagrantup.com/docs/vagrantfile/) in `~/vagrant.d/`.

Many applications inside the virtual machine will bind to `localhost` making them difficult to connect to from the host. We can configure a SOCKS5 proxy with SSH, and use a new profile of Firefox which always connect via that proxy.

```ruby
config.vm.network "private_network", ip: "172.16.3.2"
config.ssh.extra_args = ["-D", "1632"]
```

Using the Firefox extension [SmartProxy](https://addons.mozilla.org/en-GB/firefox/addon/smartproxy/), add the SOCKSv5 Proxy Server \(Vagrant; SOCKS5; 127.0.0.1; 1632\). Then when browsing to a particular `localhost:<port>`, click on the toolbar icon and enable "Enable proxy on `localhost:<port>`".

It is also possible to connect the VM's shared private network directly on `172.16.3.2`.

This is easier than forwarding each individual application \(which you may not know in advance\) with:

```ruby
config.vm.network "forwarded_port", guest: 8000, host: 8000, host_ip: "127.0.0.1"
```

**Issue with Kubectl**

If you encounter an issue with double port-forwarding \(i.e. a port-forward inside the guest and then using Vagrant's port-forward to forward it to your host\): [https://stackoverflow.com/questions/49940964/windows-host-vagrant-kubectl-port-forward-stuck-inside-vagrant](https://stackoverflow.com/questions/49940964/windows-host-vagrant-kubectl-port-forward-stuck-inside-vagrant). TODO: I have no idea what that is doing ATM.

> \# Port Forward from local port 8000 to remote port 80, listening on all addresses so that Vagrant's port forwarding works.
>
> kubectl port-forward --address 0.0.0.0 8000:80

## Developing with Docker

* Use [tini](https://github.com/krallin/tini) for your applications.

[https://blog.realkinetic.com/building-minimal-docker-containers-for-python-applications-37d0272c52f3](https://blog.realkinetic.com/building-minimal-docker-containers-for-python-applications-37d0272c52f3)

[https://pythonspeed.com/docker/](https://pythonspeed.com/docker/)

[https://cloud.google.com/solutions/best-practices-for-building-containers](https://cloud.google.com/solutions/best-practices-for-building-containers)

[https://cloud.google.com/solutions/best-practices-for-operating-containers](https://cloud.google.com/solutions/best-practices-for-operating-containers)

### Best Practises

* Use [hadolint](https://github.com/hadolint/hadolint), a docker file linter
* Use [tini](https://github.com/krallin/tini) as the correct `init` \(forwards signals and reaps zombies\) \([article](https://hynek.me/articles/docker-signals/)\)



