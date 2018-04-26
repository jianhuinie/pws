#!/bin/bash

fe=.
output=../b-fe-compiled
dest=b-fe-compiled/*

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

test -d $fe/node_modules || npm install --registry=https://registry.npm.taobao.org

gulp deploy


test -d $output || mkdir -p $output
cp -r $dest $output



