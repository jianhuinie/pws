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
 */
function Node(file) {

    var extname;
    var content;
    var md5;

    Object.defineProperty(this, 'file', {
        get: function () {
            return file;
        },
        set: function (value) {
            file = value;
            extname = path.extname(file);
        }
    });

    Object.defineProperty(this, 'extname', {
        get: function () {
            return extname;
        },
        set: function (value) {

            extname = value;

            var terms = file.split('.');
            if (terms.length > 1) {
                terms.pop();
                file = terms.join('.');
            }
            file += extname;

        }
    });

    Object.defineProperty(this, 'content', {
        get: function () {
            return content;
        },
        set: function (value) {
            content = value;
            md5 = null;
        }
    });

    Object.defineProperty(this, 'md5', {
        get: function () {
            if (md5 == null) {
                md5 = util.md5(content);
            }
            return md5;
        },
        set: function () {
            // 不允许直接修改，必须通过修改 content 触发
            throw new Error('[resource-tree error] 不能直接修改节点的 md5.');
        }
    });

    this.file = file;
    this.content = fs.readFileSync(file);
    this.children = [ ];

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
 * 遍历子节点
 *
 * @param {Object} options
 * @property {Array} options.htmlRules 扩展的 html 匹配规则
 * @property {Array} options.cssRules 扩展的 css 匹配规则
 * @property {Object} options.amdConfig AMD require config
 * @property {Function} options.processDependency 处理每个依赖对象。
 *                                                如果返回空（null/undefined），表示过滤该依赖
 *                                                如果改变 dependency.raw，会同时改写文件内容中的值
 */
proto.walk = function (options) {

    var amdConfig = options.amdConfig;
    if (!amdConfig || !amdConfig.baseUrl) {
        console.error('[resource-tree error]amdConfig is missing.');
    }

    var me = this;

    var processDependency = function (dependency) {
        options.processDependency(dependency, me);
    };

    var rules;

    switch (me.extname.toLowerCase()) {

        case '.html':
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
            walker.walkDependenciesByAst({
                node: me,
                amdConfig: amdConfig,
                processDependency: processDependency
            });
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

// 保证节点是单例
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
                    value = toJSON(value);
                }
            }
            result[ key ] = value;
        }
    );
    return result;
}

module.exports = Node;


