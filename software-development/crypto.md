# Crypto

You already know that you should never roll out your own crypto.

## Password Hashing \(Key Derivation Functions\)

The hash may follow a scheme which encodes the KDF, for example `$method$params$salt$hash`.

* 2018 state-of-the-art: _Argon2_ \(not standardised yet\).
  * CPU, Memory, Parallelism-hard

## 2FA/TOTP/U2F



## Entropy

Entropy is calculated using the password-generation function, not the password!

