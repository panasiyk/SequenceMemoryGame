#!/usr/bin/env sh
set -e
npm run build
cd dist
git init
git add -A
git commit -m 'test deploy'
git push -f git@github.com:panasiyk/SequenceMemoryGame.git master:gh-pages
cd -
