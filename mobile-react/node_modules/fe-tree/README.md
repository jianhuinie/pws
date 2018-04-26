# fe-tree


## 节点对象

```
node.file // 文件路径
node.content // 文件内容，类型是 Buffer，转字符串用 node.content.toString()
node.md5 // 获取文件内容的 md5
node.extname // 获取文件的扩展名，格式为 `.js`
node.children // 子节点
```

## 依赖对象

```
dependency.raw // 在代码里写的原始字符串，如 ./a.png
dependency.file // 依赖对应到硬盘上的文件路径，如 ./a.png 对应到硬盘上是 /Users/project/src/img/a.png

dependency.amd  // 如果是一个 amd 模块，这个值一定为 true
dependency.plugin // amd 加载资源的插件，如果不是用插件加载的资源，plugin 为空字符串
dependency.async  // amd 加载的资源是否是异步加载的
dependency.module // 依赖位于哪个模块中
```

对于普通依赖来说，只需要关心 `raw` 和 `file`，举个例子：

在 project/index.html 文件中有个图片，如下：

```html

<img src="./a.png" />
```

当我们分析这个依赖时，会提取出一个 dependency 对象，数据如下：

```javascript
{
    raw: './a.png',
    file: 'project/a.png'
}
```

这样就能通过 `file` 去获取 md5，然后做一些替换工作。

对于 AMD 来说，新增了 3 个属性，举个例子：

```javascript
define('demo', function (require) {
    require('./a');
    require('text!./b.html');
});
```

对于 a 依赖来说，依赖对象如下：

```javascript
{
    raw: './a',
    file: '根据 amd config 分析出来的文件路径',
    amd: true,
    plugin: '',
    module: 'demo'
}
```

对于 b 依赖来说，依赖对象如下：

```javascript
{
    raw: './b.html',
    file: '根据 amd config 分析出来的文件路径',
    amd: true,
    plugin: 'text',
    module: 'demo'
}
```


## 节点用法

```javascript
var node = Node.create('filePath');
node.walk({

    // html 中的依赖提取规则

    // 默认支持以下 4 种（不区分单双引号）
    // 1. href=""
    // 2. src=""
    // 3. require('xx'
    // 4. require(['xx']

    // 如果需要其他的可自行扩展

    htmlRules: [
        {
            pattern: /src=['"][^'"]+['"]/gi,
            match: function (result) {
                var terms = result.split(/['"]/);
                if (terms.length === 3) {
                    return terms[1];
                }
            }
        }
    ],


    // css 中的依赖提取规则

    // 默认支持以下 2 种（不区分单双引号）
    // 1. @import ""
    // 2. url("") 或不需要引号

    // 如果需要其他的可自行扩展

    cssRules: [
        {
            pattern: /@import\s+['"](?:[^'")]+)['"]/gi,
            match: function (result, file) {
                var terms = result.split(/['"]/);
                if (terms.length === 3) {

                    var result = terms[1];

                    if (path.extname(result) === '') {
                        return {
                            extname: path.extname(file),
                            raw: result
                        };
                    }
                    else {
                        return result;
                    }

                }
            }
        }
    ],

    // AMD require config 配置
    amdConfig: {
        baseUrl: '',
        paths: {

        },
        packages: [

        ],
        combine: {
            exclude: [
                '**/*'
            ]
        }
    },
    // 处理每一个依赖
    processDependency: function (dependency, node) {

        // 对于不合法的依赖，需要进行过滤
        // 过滤是通过 return 实现的，即不 return 或 return null 表示过滤

        // 纠正依赖的路径通过改写 dependency.raw 实现
        // 如果是 amd 插件，会传入 dependency.plugin，可改写该属性
        // 例如，对于一个模板文件，如果希望打包成 amd 模块，可分为两步：
        // 1. 把 dependency.raw 改写成符合 amd 命名规则的名字
        // 2. 把 dependency.plugin 改写为 ''


    }
});
```

## 入口模块

调用 parse() 可生成正向（dependencyMap）和反向依赖表（reverseDependencyMap）

```javascript

var feTree = require('fe-tree');

// 项目根目录
var projectDir = '';

feTree.parse({
    files: [
        projectDir + '/index.html'
    ],
    amdConfig: {
        baseUrl: projectDir + '/src',
        packages: [
            {
                name: 'cc',
                location: '../dep/cc/1.0.0/src',
                main: 'main'
            },
            {
                name: 'moment',
                location: '../dep/moment/2.10.6/src',
                main: 'moment'
            }
        ]
    },
    processDependency: function (dependency, node) {

        var raw = dependency.raw;

        // 过滤依赖
        if (/[{}$]/.test(raw)) {
            return;
        }

        // 纠正依赖路径
        if (!dependency.amd) {

            var prefix = {
                'src': projectDir + '/',
                'dep': projectDir + '/',
                '/src': projectDir,
                '/dep': projectDir,
                'common': projectDir + '/src/'
            };

            util.each(
                prefix,
                function (value, key) {
                    if (raw.startsWith(key)) {
                        dependency.file = value + raw;
                        return;
                    }
                }
            );

            if (!dependency.file && /^(\.\/|[^./])/.test(raw)) {
                dependency.file = path.join(node.file, '..', raw);
            }

        }

        var moduleExclude = {
            jquery: 1,
            text: 1,
            tpl: 1,
            css: 1,
            js: 1
        };

        var rawExclude = {
            require: 1,
            exports: 1,
            module: 1
        };

        if (!moduleExclude[dependency.module]
            && !rawExclude[dependency.raw]
        ) {
            return dependency;
        }

    }
});

// 正向依赖表
feTree.dependencyMap;

// 反向依赖表
feTree.reverseDependencyMap;

// 输出到文件
feTree.writeJSON('file', feTree.dependencyMap);
feTree.writeJSON('file', feTree.reverseDependencyMap);

```