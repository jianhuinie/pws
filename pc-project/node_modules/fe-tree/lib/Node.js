/**
 * @file 资源节点
 * @author musicode
 */

var fs = require('fs');
var path = require('path');

var util = require('./util');
var rule = require('./rule');
var walker = require('./walker');

/**
 * 构造函数
 *
 * @param {string} file
 * @param {Buffer} content
 */
function Node(file, content) {

    var me = this;

    var extname;
    var md5;

    Object.defineProperty(me, 'file', {
        get: function () {
            return file;
        },
        set: function (value) {
            file = value;
            extname =
            me.cache = null;
        }
    });

    Object.defineProperty(me, 'extname', {
        get: function () {
            if (extname == null) {
                extname = path.extname(file).toLowerCase();
            }
            return extname || '';
        },
        set: function (value) {
            file = util.removeExtname(file) + value;
            extname = null;
        }
    });

    Object.defineProperty(me, 'content', {
        get: function () {
            if (content == null) {
                try {
                    content = fs.readFileSync(file);
                }
                catch (e) {
                    console.error(e);
                }
            }
            return content;
        },
        set: function (value) {
            if (typeof value === 'string') {
                content = new Buffer(value);
            }
            if (content !== value) {
                content = value;
                md5 = null;
            }
        }
    });

    Object.defineProperty(me, 'md5', {
        get: function () {
            if (md5 == null) {
                md5 = util.md5(me.content);
            }
            return md5;
        },
        set: function () {
            // 不允许直接修改，必须通过修改 content 触发
            throw new Error('[fe-tree error] 不能直接修改节点的 md5.');
        }
    });

    me.children = [ ];

}

var proto = Node.prototype;

/**
 * 添加子节点
 *
 * @param {Node} node
 * @param {boolean=} async 是否是异步资源
 */
proto.addChild = function (node, async) {
    var children = this.children;
    var exists = false;
    children.forEach(
        function (item) {
            if (item.node.file === node.file) {
                exists = true;
            }
        }
    );
    if (!exists) {
        children.push({
            node: node,
            async: async || false
        });
    }
};

/**
 * 缓存点东西，提升性能
 */
proto.data = function (key, value) {
    var cache = this.cache;
    if (!cache) {
        cache = this.cache = { };
    }
    if (value == null) {
        return cache[key];
    }
    cache[key] = value;
};

/**
 * 遍历子节点
 *
 * @param {Object} options
 * @property {Array} options.htmlRules 扩展的 html 匹配规则
 * @property {Array} options.cssRules 扩展的 css 匹配规则
 * @property {Array} options.amdExcludes 不是 amd 的文件
 * @property {Object} options.amdConfig AMD require config
 * @property {Function} options.processDependency 处理每个依赖对象。
 *                                                如果返回空（null/undefined），表示过滤该依赖
 *                                                如果改变 dependency.raw，会同时改写文件内容中的值
 */
proto.walk = function (options) {

    var amdConfig = options.amdConfig;
    if (!amdConfig || !amdConfig.baseUrl) {
        console.error('[fe-tree error]amdConfig is required.');
    }

    var me = this;

    var processDependency = function (dependency) {
        return options.processDependency(dependency, me);
    };

    var rules;

    switch (me.extname) {

        case '.html':
        case '.phtml':
        case '.tpl':
            rules = util.merge(rule.htmlRules, options.htmlRules);
            break;

        case '.css':
        case '.less':
        case '.styl':
        case '.scss':
            rules = util.merge(rule.cssRules, options.cssRules);
            break;

        case '.js':
            var isAmd = true;

            var amdExcludes = options.amdExcludes;
            if (Array.isArray(amdExcludes)
                && util.match(me.file, amdExcludes)
            ) {
                isAmd = false;
            }

            if (isAmd) {
                walker.walkDependenciesByAst({
                    node: me,
                    amdConfig: amdConfig,
                    processDependency: processDependency
                });
            }
            break;

    }

    if (rules) {
        walker.walkDependenciesByRules({
            node: me,
            rules: rules,
            amdConfig: amdConfig,
            processDependency: processDependency
        });
    }

};

/**
 * 汇总的 md5
 *
 * @return {string}
 */
proto.calculate = function () {
    var sum = this.md5;
    this.getAllChildren().forEach(
        function (item) {
            sum += item.node.md5;
        }
    );
    if (sum !== this.data('calculateSum')) {
        this.data('calculateSum', sum);
        this.data('calculateMd5', util.md5(
            new Buffer(sum)
        ));
    }
    return this.data('calculateMd5');
};

/**
 * 所有所有不重复的子节点
 *
 * @return {Array.<Node>}
 */
proto.getAllChildren = function () {
    var result = util.merge(this.children);
    this.children.forEach(
        function (item) {
            var node = item.node;
            result = util.merge(result, node.getAllChildren());
        }
    );
    var map = { };
    return result.filter(function (item) {
        var file = item.node.file;
        var exists = map[file];
        if (!exists) {
            map[file] = true;
        }
        return !exists;
    });
};

/**
 * 需要给 node.buildContent 赋值才能正常 build
 *
 * @return {Promise}
 */
proto.build = function () {

    var me = this;

    return new Promise(function (resolve) {

        var method = 'buildContent';

        if (me[method] == null
            || me[method] === true
        ) {
            resolve();
            return;
        }

        var buildStart = function () {
            var promise = me[method];
            if (typeof promise === 'function') {
                if (typeof me.onBuildStart === 'function') {
                    me.onBuildStart();
                }
                promise = me[method] = me[method]();
            }
            if (promise && promise.then) {
                promise.then(buildEnd);
            }
            else {
                buildEnd();
            }
        };

        var buildEnd = function () {
            if (me[method] !== true) {
                if (typeof me.onBuildEnd === 'function') {
                    me.onBuildEnd();
                }
                me[method] = true;
            }
            resolve();
        };

        var promises = [ ];

        me.children.forEach(
            function (item) {
                promises.push(
                    item.node.build()
                );
            }
        );

        if (promises.length > 0) {
            Promise.all(promises).then(buildStart);
        }
        else {
            buildStart();
        }
    });

};

/**
 * 转成可以序列化的 json
 *
 * @return {Object}
 */
proto.toJSON = function () {
    return {
        file: this.file,
        md5: this.md5,
        children: this.children.map(
            function (item) {
                return {
                    file: item.node.file,
                    async: item.async
                };
            }
        )
    };
};

var nodeCache = { };

Node.create = function (file) {
    if (!nodeCache[file]) {
        nodeCache[file] = new Node(file);
    }
    return nodeCache[file];
};

/**
 * 把包含 Node 对象的 obj 转成可以序列化的 json
 *
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
Node.toJSON = function (obj) {
    var result = Array.isArray(obj) ? [ ] : { };
    util.each(
        obj,
        function (value, key) {
            if (value instanceof Node) {
                value = value.toJSON();
            }
            else {
                var type = util.type(value);
                if (type === 'array' || type === 'object') {
                    value = Node.toJSON(value);
                }
            }
            result[ key ] = value;
        }
    );
    return result;
};

module.exports = Node;


