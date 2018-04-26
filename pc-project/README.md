## PC站

#### =======[Git分支管理](http://git.baijiahulian.com/web/web-fe/wikis/git_branch_manage) (本周管理员：贾花燕)=======

-------------------------------------------------


### 目录结构说明

* **src/** 存放 js less img 等静态资源
* **view/** 存放 smarty 模板
* **mock/** 存放本地假数据
* **dep/** 存放第三方 框架/库
* **cache/** 存放编译后的 smarty 模板（自动生成）
* **output/** edp build 输出的代码

### 代码规范

* **HTML&CSS规范** [链接](https://github.com/ecomfe/spec/blob/master/html-and-css-code-style.md)
* **Less规范** [链接](https://github.com/ecomfe/spec/blob/master/less-code-style.md)
* **Javascript规范** [链接](https://github.com/ecomfe/spec/blob/master/javascript-code-style.md)

### 注意事项

1. 严格执行代码规范，统一代码风格
2. 文件必须在开始处写上 `@file` 和 `@author`，表明文件的功能和作者（冤有头，bug有主，`不要随意改别人的代码`）
3. less 中的 `间距`、`颜色`、`字体大小` 请使用预定义的变量，便于统一整站样式风格
4. 模块尽量拆分，如老师详情页，模板可拆为如下格式（less，js同理）

        teacher/
            detail/
                profile.html
                photo.html
                video.html
                ...
            detail.html

    好处是避免出现大文件，逻辑清晰，有利于提升团队开发效率

5. 与 RD 沟通接口时，尽量跟其他 FE 同学沟通一下字段名，避免多处名字不一致，导致混乱
6. 每个页面默认只会有一个打包的js（除了base.js）, 该js路径定义在view中的$script_path变量中。要求js路径与view的路径一致。
如："activity/countDown.html" 中定义的 $script_path = "activity/countDown"


### 上线

1. 上线打 tag 格式是 `release_v1.0.1.1`（举例），每天上线的版本是 `1.0.1`，第一次上线，第四位版本号是 1，依次累加，即保证当天的大版本号是 `1.0.1` 即可

### 其他
* [点击上报](http://git.baijiahulian.com/web/web-fe/wikis/click-log)