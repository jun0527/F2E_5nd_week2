#!/usr/bin/env sh

# abort on errors
set -e

# build
# 將專案打包
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init

# 根據本人觀察，這行大多人都會選擇註解掉，影響不大
# git checkout -B main

git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 一般使用都是選擇這個
# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/jun0527/F2E_5nd_week2.git master:gh-pages

cd -
