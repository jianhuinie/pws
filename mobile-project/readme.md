# 项目说明
---

## 技术栈
---
* smarty
* React
* node
* require
* zepto  
组内技术分享见[这里](http://git.baijiahulian.com/wiki/wikitten-repo/tree/master/%E5%B9%B3%E5%8F%B0%E4%BA%8B%E4%B8%9A%E9%83%A8/FE)，有新员工手册，有工作文档，还有分享。

## 目录说明
---
* _build 前端构建代码
* edp-webserver edp server的扩展
* lib 第三方类库，包括font icon
* mock mock基础数据
* mock mock数据，同步直接配置到该目录，ajax中get同时需要配置`autoresponse-config.js`
* node_modules node模块
* output 构建目录
* src 源代码所在目录
    * common 业务公共类库和ui库
    * compile_spa 为了减少构建时间和保持开发、线上代码一致(无压缩、混淆代码一致)，spa目录先编译到该目录
    * page smarty页面，m站页面
    * page_app 只用于app的smarty页面，不属于m站一部分
    * spa 单页面应用，采用react，详情见`spa/readme.md`
    * util 业务无关公共类库
    * app_config.js jockey配置文件
    * loader.js 重写requirejs，便于前端资源管理
    * manifest.js 开发和线上环境不同，开发是require.config，线上是资源版本号和依赖关系，用于loader.js
* .babelrc babel配置文件
* .bowerrc bower配置文件
* .eslintignore 不走eslint配置项
* .eslintrc eslint配置文件，要求所有提交代码符合eslint规范
* .gitignore 不做git版本管理
* autoresponse-config.js ajax请求method为get的配置文件
* build beta和线上构建脚本入口
* build-norelease.sh test和dev构建脚本入口
* build.js 调用_builder统一入口
* ci.sh Makfile统一调用文件，建议使用Makefile push代码方式，没必要做重复劳动
* edp-webserver-config.js edp server统一的配置项
* local-build.sh 本地构建，主要用于测试构建脚本的正确性
* Makefile git push代码简写方式
* package.json node配置文件

## 多人开发模式
---
同一时间多人开发，按人创建分支，分支按照分支的命名规范。
### 提测
提测时间点有交叉的，统一merge到`m-test`分支，不要构建自己分支，不然会覆盖其他人功能
### 上线
如果确认必须同时上线，可以新建一个公共分支，统一merge到该分支，禁止以某人分支为公共分支，以免最后分开上线有影响。  
### ***`说明：`***
时间长了，`m-test`脏数据太多，要删除重新从master拉最新代码，操作步骤如下：
* 删除本地m-test分支
* 删除远程m-test分支
* 基于最新master创建本地和远程m-test
* 删除test机器m-test分支，该部分，需要jenkins3配合
    * 找到对应任务，点左侧“配置”，没有相应权限找master
    * 在Command增加如下命令`git checkout master && git pull && git branch -D m-test && git checkout m-test && git pull`


## 其他
---
* jenkins地址，见[这里](http://jenkins3.baijiahulian.com/view/M%E7%AB%99/)
* tes环境地址：https://test-m.genshuixue.com
* beta环境地址：https://beta-m.genshuixue.com
* 线上环境地址：https://m.genshuixue.com
* IDE，建议使用Visual Studio Code，或者使用Sublime Text，安装基础插件

## 人员
---
* 黄诗铭  
* 聂建辉
* 贺林峰  
* hurry 