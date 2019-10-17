# Git

> Sometimes it feels like [git doesn't make sense](/stevelosh.com/blog/2013/04/git-koans/).
>
> Squash merging is terrible and awful. It destroys histories and trashes attempts at re-using a branch [https://stackoverflow.com/a/14343784](https://stackoverflow.com/a/14343784). It is especially a bad idea on a large branch because git blame is likely far less usable. It is useful to ensure all commits pass tests for git bisect though. git slap everyone who introduced it in GitHub/BitBucket UIs.

There's a neat interactive branching tutorial somewhere...

## Tips & Tricks

Because git is huge.

* `git log --first-parent` show only the first parent commit for merge commits.
* `git blame --ignore-rev 2e0ee159c` OR `git blame --ignore-revs-file <file>` to ignore something like a great reformatting commit.

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



