#!/bin/bash

fe=$(pwd)
output=$fe/../www-fe-compiled

cd $fe

git pull

test -d $output || mkdir -p $output

cp -r $fe/view $output
cp -r $fe/src $output
cp -r $fe/dep $output