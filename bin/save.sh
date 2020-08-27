#!/bin/bash
set -euox pipefail

REPO="$(git rev-parse --show-toplevel)"
BUILD="${REPO}/book"
BASE="$(mktemp -d -t programmers-compendium-book.XXXXXXXXXX)"
BOOK="${BASE}/book"

# Fail-safe
function finish {
    git worktree remove --force "$BOOK" || true
    rm -rf "$BASE" || true
}
trap finish EXIT

cd "$REPO"
mdbook clean
mdbook build

git worktree add "$BOOK" book
cd "$BOOK"

rsync -aqr "${BUILD}/" "$BOOK"
git add --all
git commit -am "Publish an update to The Programmer's Compendium"
git push
