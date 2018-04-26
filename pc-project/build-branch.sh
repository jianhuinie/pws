#!/bin/bash

fe=$(pwd)
rd=$fe/../www
output=$fe/../www-fe-compiled

imOutput=$fe/../im-fe-compiled

output_public=$output/public

cd $fe

git pull
if [[ ! -z $1 ]]; then
    git checkout $1
    if [[ 0 != $? ]]; then
        echo "branch $1 不存在"
        exit 127
    fi
    git pull
fi

test -d $fe/node_modules/fe-tree || npm install --registry=https://registry.npm.taobao.org

/usr/local/node/bin/node --max-old-space-size=2500 build-x/index.js --release=0 --total=0 --sourceHashFile=$output/sourceHash.json --outputHashFile=$output/outputHash.json

test -d $output_public || mkdir -p $output_public

test -d $fe/output/asset && cp -r $fe/output/asset $output_public
test -d $fe/output/dep && cp -r $fe/output/dep $output_public

test -f $fe/output/tool/cert.js && cp $fe/output/tool/cert.js $output_public

test -d $fe/output/view && cp -r $fe/output/view $output

test -L $output/public/asset/hermes || ln -s $imOutput/public/asset/hermes $output/public/asset/hermes
test -L $output/public/dep/webIM || ln -s $imOutput/public/dep/webIM $output/public/dep/webIM


mediareplay_output=$fe/../media-pc-fe-compiled
test -L $output/public/asset/cloudvideocourse || ln -s $mediareplay_output/public/asset/cloudvideocourse $output/public/asset/cloudvideocourse
test -L $output/view/cloudvideocourse || ln -s $mediareplay_output/view/cloudvideocourse $output/view/cloudvideocourse


bdg_output=$fe/../bdg-pc-fe-compiled
test -L $output/public/asset/apollo || ln -s $bdg_output/public/asset/apollo $output/public/asset/apollo
test -L $output/public/dep/apollo || ln -s $bdg_output/public/dep/apollo $output/public/dep/apollo
test -L $output/view/apollo || ln -s $bdg_output/view/apollo $output/view/apollo
