# 单页应用说明
---

## 技术栈
---
* es2015
* React
* React-Router
* `Redux`这个暂时没有用到
* babel

## 目录说明
---
* common 统一存放react公共，业务相关，业务无关统一放到src/common|util
* module 业务代码
    * page 普通页面，所有页面公用一个html页，通过router跳转，前端采用ls永久缓存
    * activity 活动页面，有时效性，每一个活动页面一个.html文件，前端没必要采用ls永久缓存
* demo 各种react样例
* resource 资源文件
    * css 公共css
    * icomoon 统一font icon
    * img 全站用到的图片

## 启动服务
---
* `make server|edp webserver start` 启动本地服务
* 地址加上`/spa`，例如: `http://127.0.0.1:8082/spa`

### 功能列表：
---
* ~~npm module分开打包或者不打包(使用amd方式)；~~
* css 分开打包
* ~~npm module如果是分开打包，就不需要通过bower引用~~
* ~~未引入jshint/eshint~~
* 真正的rem()
* ~~文件实时watch，如果获取不到fileName的替代方案~~
* 发布
    * 增量发布
    * 回滚方案
    * spa和seo先独立发布，再合并
    * 去掉demo代码
* localStorage统一管理：CRUD
* xss防护
* 字符增量
* 多线程处理，js/css分开线程处理，或者js多个线程处理
* spa样式加载依赖路径`_pluginCss`，需要做的更通用

### ls
---
* localStorage统一管理：CRUD
* 前端xss防护：字符串长度、关键字过滤、hash匹配(效率问题)
* 失效问题：activity是否缓存，已下线页面缓存清除机制(手动维护列表，还是做到程序自动化)

### demo
---
* ajax: 异步请求，包括对common的复用, hash值：`\demo\ajax`
* async: 嵌套异步处理，不再使用generator/thunk/co处理, hash值：`\demo\async`
* react: react组件写法, hash值：`\demo\react`
* redux: react状态管理，统一使用redux，不要轻易使用, hash值：`\demo\redux`
* styl: 对样式的统一处理, hash值：`\demo\styl`

## 限制
---
### css
---
* 暂时只支持stylus
* 每个style文件不能`@import`和样式混用，为以后做css增量构建做准备
* 每个页面的样式表，统一使用`require('css!./[name].styl')`引入
* 为了支持.styl扩展名，我把require-css做了二次修改，所以旧不能升级了

## common
---
* 如果SEO和非SEO项目都使用，统一放到非SEO中，这样两个地方都可以使用

## 规范
---
严格按照这个规范处理，[这里](http://git.baijiahulian.com/wiki/wikitten-repo/blob/master/%E5%B9%B3%E5%8F%B0%E4%BA%8B%E4%B8%9A%E9%83%A8/FE/doc/standard/react.md)

## 学习资料
---
* 阮一峰 React技术栈系列教程，[这里](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)
* Generator/async教材，[这里](http://www.ruanyifeng.com/blog/2015/04/generator.html)
* react中文翻译教材，[这里](http://reactjs.cn/react/docs/why-react-zh-CN.html)
* nodejs中文学习资料，[这里](http://nodejs.cn/api/documentation.html)
* es6，[这里](http://es6.ruanyifeng.com/)

## 其他
---
部分文件夹有相应的readme.md，会对这个目录结果做详细说明