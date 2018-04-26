# 功能列表：
---
* css 分开打包
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

# 未实现列表
---
* amd依赖，处理为umd，不然对第三方lib限制较多
* ***~~图片地址目前不支持相对地址~~***

# ls
---
* localStorage统一管理：CRUD
* 前端xss防护：字符串长度、关键字过滤、hash匹配(效率问题)
* 失效问题：activity是否缓存，已下线页面缓存清除机制(手动维护列表，还是做到程序自动化)
* m1和m2互相覆盖


# 限制
---
## css
---
* 暂时只支持stylus
* 每个style文件不能`@import`和样式混用，为以后做css增量构建做准备
* 每个页面的样式表，统一使用`require('css-loader!./[name].styl')`引入
* 为了支持.styl扩展名，我把require-css做了二次修改，所以旧不能升级了

