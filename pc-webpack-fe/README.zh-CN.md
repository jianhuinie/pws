基于 create-react-app 和 react-scripts 创建的脚手架

## 使用

### 开发

> yarn start

如提示找不到模块，先安装相关依赖：

> yarn

### 构建

> yarn build

## 目录结构

```
.
├── README.md                           -- 源文档
├── README.zh-CN.md                     -- 本文档
├── build                               -- 构建输出目录
├── mock                                -- 接口 mock
│   ├── book
│   │   └── list.js
│   ├── common.js
│   ├── index.js
│   └── sapi
│       └── index.js
├── package.json
├── public                              -- 静态资源，构建后 COPY 到 build 目录
│   ├── favicon.ico
│   ├── index.html                      -- 页面入口模板
│   └── manifest.json
├── src                                 -- 源码目录
│   ├── App.js                          -- 应用入口
│   ├── Routes.js                       -- 路由配置解释
│   ├── component                       -- 公共组件
│   │   ├── EnhancedRoute.js
│   │   ├── Icon.js
│   │   ├── Loading.js
│   ├── css                             -- 公共样式
│   │   ├── App.less
│   │   ├── icomoon.styl
│   │   ├── mixin.styl
│   │   ├── page                        -- 对应页面样式
│   │   │   ├── Home.styl
│   │   │   ├── My.styl
│   │   │   └── Reading.styl
│   │   └── variables.styl
│   ├── index.js                        -- 渲染入口
│   ├── layout                          -- 页面布局，route.config.js 中配置的 layout 相对本目录查找
│   │   ├── BasicLayout.js
│   │   ├── BlankLayout.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   └── Nav.js
│   ├── model                           -- 数据模型，包含对应的 state、action 及 reducer
│   │   ├── book.js
│   │   ├── course.js
│   │   └── user.js
│   ├── page                            -- 页面
│   │   ├── Home.js
│   │   ├── My.js
│   │   ├── Reading
│   │   │   ├── Sea.js
│   │   │   └── index.js
│   │   └── live
│   │       └── student
│   │           └── pushCourse
│   │               ├── index.js
│   │               └── index.styl
│   ├── route.config.js                 -- 路由配置
│   ├── service                         -- 后端的数据接口服务
│   │   ├── constant.js
│   │   ├── http.js
│   │   └── livePush.js
│   ├── serviceWorker.js
│   ├── store.js                         -- 解释 model 目录生成 sotre
│   └── util                             -- 工具方法
│       ├── area.js
│       ├── array.js
│       ├── cookie.js
│       ├── date.js
│       ├── dom.js
│       ├── function.js
│       ├── number.js
│       ├── string.js
│       ├── url.js
│       └── uuid.js
└── webpack.overrides.js                -- 覆盖 webpack 的配置
```

### 路由配置

在 route.config.js 中配置，支持嵌套，可以指定布局组件，在 `src/layout` 目录查找匹配，未指定时默认为 `BasicLayout`。

### 数据 mock

参考 mock 目录中的示例文件。

### Store

由 `store.js` 根据 `src/model` 目录下的文件自动处理，将每个文件名作为 key 和 namespace，定义的 state 作为对应 key 的初始状态，

action 自动以 key 为 前缀作为 namespace， action 中的 key 与 reducer 中的 key 对应匹配，处理完成后对应的 model 只留下 action 对应的方法。因此要 dispatch 一个 action，可以：

```js
import book from '~/model/book';

const { dispatch } = this.props;
dispatch(
    book.reading({ name: '《老人与海》', chapter: 'Chapter 7', index: 6 })
);
```

### 路径寻址

默认设置了 `~` 的 alias 指向 **src** 目录，`css` 指向 **src/css**，因此在 stylus 中可以使用 `@import '~css/xxx'` 来 import 相应文件，在 js 中可以用 `~/path/to/file` 来 import 相应模块。

### Webpack 扩展

脚本会读取根目录下的 `webpack.overrides.js` 作为扩展配置，文件内容格式如下：

```js
module.exports = {
    development(config, { paths }) {},

    production(config, { paths }) {},

    server(config, { paths, proxy, allowedHost }) {},
};
```
