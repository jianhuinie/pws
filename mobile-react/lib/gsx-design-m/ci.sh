git pull origin $1
git add --all
git st
git ci -m $2
git push origin $1
