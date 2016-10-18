#!/bin/sh

GIT_BRANCH=`git branch | grep -e "^*" | sed -e "s/\* //g"`
GIT_COMMIT=`git log -1 --pretty="format:%h %ai %s"`

echo "Generating new website for ${GIT_BRANCH} ${GIT_COMMIT}"
npm install
npm run build
git clone . site-gen
cd site-gen
git checkout gh-pages
cp ../docsite/build/* . -r
git add .
git commit -m "regenerated site ${GIT_BRANCH}: ${GIT_COMMIT}..."
git push -u origin
# cd ..
# rm -rf site-gen
