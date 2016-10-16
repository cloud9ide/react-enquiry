#!/bin/sh

GIT_BRANCH=`git branch | grep -e "^*" | sed -e "s/\* //g"`
GIT_COMMIT=`git log -n1 --pretty=oneline`

echo "Generating new website for ${GIT_BRANCH}"
echo " - stashing changes"
git stash
cd docsite
npm run build
cd ..
mv docsite/build .
git checkout gh-pages
cp build/* . -r
rmdir build
# git add -a
# git commit -m"regenerated site from ${GIT_BRANCH\n${GIT_COMMIT}"
git checkout $GIT_BRANCH
git stash pop