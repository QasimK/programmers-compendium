# SSH

[The reference](https://wiki.archlinux.org/index.php/SSH_keys "Arch Linux Wiki")

```
# Create new secure key with comment (Realm-Device)
ssh-keygen -t ed25519 -C QasimK-PC
# Change passphrase of existing key
ssh-keygen -f ~/.ssh/id_ed25519 -p
# Copy public key to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub username@remote-server.domain
```

For the config file, take a look at [my-setup](https://github.com/QasimK/my-setup/)

```
Host MACHINE1
   IdentitiesOnly yes
   IdentityFile ~/.ssh/id_ed25519_MACHINE1
```

TODO: SSH agent

