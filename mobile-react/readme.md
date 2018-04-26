# 项目说明
---

## 技术栈
---
* es2015
* React
* React-Router
* Redux这个暂时没有用到
* babel
* node

## 目录说明
---
* _build 前端构建代码
* edp-webserver edp server的扩展
* lib 第三方类库，包括font icon
* mock mock基础数据
* node_modules node模块
* output 构建目录
* src 源代码所在目录
    * common 统一存放react公共，业务相关
    * module 业务代码
        * demo 各种react样例
    * resource 资源文件
        * css 公共css
        * img 全站用到的图片
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

## 注意事项
---
* 当前目录下所有文件，必须编译到`compile_spa`目录下，才可以启动本地服务和构建
* 启动本地服务之后，会默认启动watch，监听当前目录文件变化，做自动编译
* 新增`page.json`文件的时候，在`compile_spa`相应目录下生成`index.html`和`main.js`，解决单页应用第一次加载js太多的性能问题
* 同上，该目录下不是单页应用，所以和op预定path解析规则
* module/page下的页面，默认['/page' + 文件目录名]，例如：`https://m.genshuixue.com/page/channel`，nginx解析到`compile_spa/module/page/channel/index.html`(当然实际是output对应的目录结构)
* 为了和op解析规则一直，`page.json`文件中的router也需要按照上述规则配置，本地服务处理的规则在`edp-webserver/mock.js`

## 启动服务
---
* `make server|edp webserver start` 启动本地服务

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