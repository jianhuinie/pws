git fetch -a
git checkout $1
git pull
# test -d node_modules || yarn --registry http://nexus.baijiahulian.com/repository/npm-public/
yarn --registry http://nexus.baijiahulian.com/repository/npm-public/
# yarn --registry http://npm.baijiahulian.com/
npm run build:test
# npm run pm2-test-start