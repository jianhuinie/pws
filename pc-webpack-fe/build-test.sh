git fetch -t
git checkout $1
test -d node_modules || npm install --registry=http://npm.baijiahulian.com/
npm run build