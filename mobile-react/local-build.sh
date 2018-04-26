#!/bin/bash
startDate=$(date "+%s")
br=$1
fe=.
output_public=../weishi-m-fe_compiled
total=1

cd $fe

# 获取指定分支最新代码
git fetch
if [[ "" != "$br" ]] ; then
    git branch | grep -E "\b$br\b"
    if [[ $? == 0 ]]; then
        git checkout $1
    else
        git branch -a | grep -E "\b$br\b"
        if [[ $? == 0 ]]; then
            git checkout -t origin/$br
        else
            echo "分支$br不存在"
            exit 1
        fi
    fi

fi

git pull

endDate1=$(date "+%s")
let timeRange=($endDate1-$startDate)
echo "git: ${timeRange}s"


#node module有变化使用下面语句，保证都可以安装
#npm install --registry=https://registry.npm.taobao.org
test -d $fe/node_modules/esprima || npm install --registry=https://registry.npm.taobao.org

endDate2=$(date "+%s")
let timeRange=($endDate2-$endDate1)
echo "npm install: ${timeRange}s"

#静态资源构建
chmod +x $fe/build.js
# 不需要传p和l，默认HEAD~1和HEAD~0
node $fe/build.js -d 1 -t $total -p e96b7fdaf72a543a7039cb7ff97a9bfb19599975 -l 90625e254ed20a1d59309ef65164bfb5d2cee745

#构建发生异常
if [[ $? == 1 ]]; then
    exit 1
fi

let endDate3=$(date "+%s")
let timeRange=($endDate3-$endDate2)
echo "fe build: ${timeRange}s"

#全量构建的时候执行下面语句
if [[ $total == 1 ]]; then
    rm -rf $output_public
fi

#打包文件拷贝
test -d $output_public || mkdir -p $output_public
test -d $fe/output/view && cp -r $fe/output/view $output_public
test -d $fe/output/public && cp -r $fe/output/public $output_public

let endDate4=$(date "+%s")
let timeRange=($endDate4-$endDate3)
echo "copy file: ${timeRange}s"


#总时间统计
let endDate=$(date "+%s")
let timeRange=($endDate-$startDate)
echo "Total: ${timeRange}s"