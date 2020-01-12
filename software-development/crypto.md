# Crypto

You already know that you should never roll out your own crypto.

## Password Hashing \(One-way Key Derivation Functions\)

The hash may follow a scheme which encodes the KDF, for example `$method$params$salt$hash`.

1. 2018 state-of-the-art: _Argon2_ \(not standardised yet\).
   * CPU, Memory, Parallelism-hard
2. Scrypt
3. Bcrypt
4. PBKDF2

Passwords are low-entropy data; you need to slow down attackers with access to vash parallel computation.

## Cryptographic Hashing

Designed to be fast while guaranteeing no collisions and no way of reversing the hash.

These are suitable for file integrity, message authentication, inputs for cryptographic signatures.

> There is yet another category of hasing functions used for dictionaries/hash tables :\)

## 2FA/TOTP/U2F

## Entropy

Entropy is calculated using the password-generation function, not the password!

