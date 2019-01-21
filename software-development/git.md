# Git

> Squash merging is terrible and awful. It destroys histories and trashes attempts at re-using a branch https://stackoverflow.com/a/14343784. It is especially a bad idea on a large branch because git blame is likely far less usable. It is useful to ensure all commits pass tests for git bisect though. git slap everyone who introduced it in GitHub/BitBucket UIs.

There's a neat interactive branching tutorial somewhere...

## Tips & Tricks

Because git is huge.

* `git log --first-parent` Show only the first parent commit for merge commits.
* TBD: [git hyper-blame](https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/git-hyper-blame.html).

## Security

Sign tags not commits: [http://git.661346.n2.nabble.com/GPG-signing-for-git-commit-td2582986.html](http://git.661346.n2.nabble.com/GPG-signing-for-git-commit-td2582986.html)

[https://github.com/NicoHood/gpgit](https://github.com/NicoHood/gpgit)

\(Interesting read: [https://mikegerwitz.com/papers/git-horror-story.html](https://mikegerwitz.com/papers/git-horror-story.html)\)

# Comparison

| Concept | Git | Mercurial | SVN |
| :--- | :--- | :--- | :--- |
| Branches | Branches | ... | ... |
| Stash |  |  |  |
| Working Area |  |  |  |
| History |  |  |  |



