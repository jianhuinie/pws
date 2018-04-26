# @file 非线上构建统一入口，更新完最新代码再执行debug.sh
# @author hurry
# @date 2017/5/19

source /etc/profile
br=$1
fe=.
output_public=../weishi-pc-fe_compiled
startDate=$(date "+%s")
total=1

cd $fe

#git获取指定分支最新代码
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

# 不能用--short选项，因为可能出现934e022
pre_commit_id=$(git rev-parse HEAD)
git pull
last_commit_id=$(git rev-parse HEAD)
echo $pre_commit_id
echo $last_commit_id

endDate1=$(date "+%s")
let timeRange=($endDate1-$startDate)
echo "git: ${timeRange}s"

# 更新npm
npm update --registry=https://registry.npm.taobao.org
#node module有变化使用下面语句，保证都可以安装
# npm install --registry=https://registry.npm.taobao.org
test -d $fe/node_modules/fe-delta || npm install --registry=https://registry.npm.taobao.org

endDate2=$(date "+%s")
let timeRange=($endDate2-$endDate1)
echo "npm install: ${timeRange}s"

#静态资源构建
chmod +x $fe/build.js
node $fe/build.js -s test -d 1 -t $total -p $pre_commit_id -l $last_commit_id

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

#拷贝打包文件
test -d $output_public || mkdir -p $output_public
test -d $fe/output/view && cp -r $fe/output/view $output_public
test -d $fe/output/public && cp -r $fe/output/public $output_public

let endDate4=$(date "+%s")
let timeRange=($endDate4-$endDate3)
echo "copy file: ${timeRange}s"


#总耗时
let endDate=$(date "+%s")
let timeRange=($endDate-$startDate)
echo "Total: ${timeRange}s"