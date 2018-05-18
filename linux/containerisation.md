# Containers

1. Programming-level, e.g. Python's Virtualenv
2. OS-level
   1. Application encapsulating:, e.g.Docker \(ephemeral, separate storage\)
   2. OS encapsulating, e.g. LXC, LXD, and kind-of chroot \(UNIX\)
3. Hardware virtualisation
   1. Heavyweight OS \(Type 2 hosted hypervisor\), e.g. Vagrant \(depending on back-end\), Virtualbox
   2. \(Type 1 bare metal\) Hypervisor, e.g. KVM, Hyper-V

Docker, LXC, LXD \(uses LXC\) all use, on Linux, Linux cgroups and namespaces\(net, user, pid, ipc, cgroup\).

Kubernetes can be used for orchestration.

You also have things like Firejail, Snap/Flatpak, and AppImage.

## Developing with Vagrant

This is useful if you are working on conflicting projects, or want to keep your computer tidy. Keep your setup on your host \(text editor and IDE appliations and their config files\), and run the project \(any executables\) within the container. A shared folder can be used to store the repository.

