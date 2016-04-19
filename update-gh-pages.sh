#!/usr/bin/env bash

echo ""
echo "### Building data model static website with GitBook... ###"
echo ""

./node_modules/.bin/gitbook build

echo ""
echo "### Syncing data model static website to web/ directory... ###"
echo ""

rsync -rv --delete-before --exclude '.git/' --exclude '.nojekyll' _book/ web/

echo ""
echo "### Cleaning up GitBook build... ###"
echo ""

rm -rf _book/

echo "### Final step is to navigate into web/, confirm the changes and commit them..."
echo "Then push to gh-pages branch. ###"
echo ""
