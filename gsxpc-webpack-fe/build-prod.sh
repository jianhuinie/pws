git fetch -t
git checkout $1
# test -d node_modules || yarn --registry http://nexus.baijiahulian.com/repository/npm-public/
# yarn --registry http://nexus.baijiahulian.com/repository/npm-public/
yarn --registry http://npm.baijiahulian.com/
npm run build:prod
# npm run pm2-prod-start