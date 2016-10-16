#!/bin/sh

GIT_BRANCH=`git branch | grep -e "^*" | sed -e "s/\* //g"`
GIT_COMMIT=`git log -1 --pretty="format:%h %ai %s"`

echo "Generating new website for ${GIT_BRANCH}"
echo " * stashing changes"
git stash
cd docsite
echo "* install dependencies"
npm install
echo "* creating build"
npm run build
cd ..
git clone . site-gen
cd site-gen
git checkout -t origin/gh-pages
cp ../docsite/build/* . -r
git add -A
git commit -m "regenerated site ${GIT_BRANCH}: ${GIT_COMMIT}..."
git push -u origin
cd ..
rm -rf site-gen
