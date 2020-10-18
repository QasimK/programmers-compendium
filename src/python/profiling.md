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

## Other


[Austin](https://github.com/P403n1x87/austin).

```console
austin -f -o out.prof python3 do.py
```

Austin can attach to running programs.

I haven't worked out how to visualise this.

## Performance Tips

### SQLAlchemy

Something something 'raise' to prevent hidden n+1 joins.
