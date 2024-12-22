# Python Profiling & Performance

## Profiling Methods

```console
python -m cProfile -o out.prof do.py
```

## Visualisation

Use [snakeviz](https://jiffyclub.github.io/snakeviz/).

Install `pipx install snakeviz`.

```console
snakeviz out.prof
```

Or, use [tuna](https://github.com/nschloe/tuna) which is slightly less misleading.

## Other

Austin can attach to running programs.

[Austin](https://github.com/P403n1x87/austin).

```console
austin -f -o out.prof python3 do.py
```

I haven't worked out how to visualise this.
