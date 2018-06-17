# SSH

[The full reference](https://wiki.archlinux.org/index.php/SSH_keys "Arch Linux Wiki") \(Arch Wiki\).

Common commands:

```
# Create new secure key with comment (User@Device#Realm)
ssh-keygen -t ed25519 -C Qasim@PC#QasimK
# Change passphrase of existing key
ssh-keygen -f ~/.ssh/id_ed25519 -p
# Add your credentials to remote server to allow you to login
ssh-copy-id -i ~/.ssh/id_ed25519.pub username@remote-server.domain
```

\(`ssh-copy-id` adds your SSH key to to the remote server's user's `authorized_keys` file.\)

For your `~/.ssh/config` file, take a look at [my-setup](https://github.com/QasimK/my-setup/), but here is a reference:

```
# Add all new SSH key passphrases to ssh agent (doesn't seem to work)
AddKeysToAgent [yes|ask|confirm|no]
# This is default and unnecessary
IdentityFile ~/.ssh/id_rsa

Host MACHINE1
   IdentitiesOnly yes
   IdentityFile ~/.ssh/id_ed25519_MACHINE1
```

## TODO: SSH agent

[https://wiki.archlinux.org/index.php/SSH\_keys\#Start\_ssh-agent\_with\_systemd\_user](https://wiki.archlinux.org/index.php/SSH_keys#Start_ssh-agent_with_systemd_user)

.pam\_environment may require reboot !!! \(or manual source?\)

## SSHD

Test config with `sudo sshd -T`.

The following settings are ordered starting from the most significant, least invasive and easiest to setup:

* Prevent root login
* Use SSH keys only
* Use a less common port, e.g. 23
* Only allow particular groups/users to login \(such as `wheel`, the administrative group\)

```
PermitRootLogin no
PasswordAuthentication no
Port 23
AllowGroups wheel
AllowUsers qasim
```

* Rate-limit attempts: `sudo ufw limit OpenSSH`  \(NB: check auto correct port?\)
* Use `ssh-geoip` \(blacklist IPs rather than whitelist to prevent lockout\) \(not tested; IPv6?\)
* Use an [SSH bastion](https://blog.scottlowe.org/2016/09/13/ssh-bastion-host-follow-up/).
* Use fail2ban \(not needed with SSH keys; lockout risk\)
* [Require 2FA](http://www.justgohome.co.uk/blog/2013/07/better-two-factor-ssh-authentication-on-ubuntu.html): `libpam-google-authenticator` \(longer setup; not tested; yes there are backup codes\)

### Mosh

* Mosh uses SSH for initial authentication.
* Requires UDP ports 60000–61000 to be open \(you can get away with 60000-60010\).



