var escodegen = require('escodegen');
var estraverse = require('estraverse');
var Syntax = estraverse.Syntax;

var fs = require('fs');
var path = require('path');

var fileCache = { };

/**
 * 读取文件
 *
 * @param {string} path
 * @return {string|Promise}
 */
exports.readFile = function (path) {

    if (!fileCache[path]) {
        fileCache[path] = fs.readFileSync(path, 'utf-8');
    }

    return fileCache[path];

};


exports.isRequire = function (node) {

    if (node.type !== Syntax.CallExpression
        && node.type !== Syntax.NewExpression
    ) {
        return;
    }

    var callee = node.callee;
    var isRequire = callee.name === 'require'
    var isWindowRequire = callee.object
        && callee.object.type === Syntax.Identifier
        && callee.object.name === 'window'
        && callee.property
        && callee.property.type === Syntax.Identifier
        && callee.property.name === 'require';

    return isRequire || isRequire;

}

exports.isRequireToUrl = function (node) {

    var callee = node.callee;

    if (node.type === Syntax.CallExpression
        && callee.type === Syntax.MemberExpression
    ) {

        var object = callee.object;
        var property = callee.property;
        var args = node.arguments;

        if (property.type === Syntax.Identifier
            && property.name === 'toUrl'
            && args.length === 1
            && exports.isStringLiteralNode(args[0])
        ) {

            // 下面两种语法，object 有所不同
            // window.require.toUrl
            // require.toUrl

            var isRequire = object.type === Syntax.MemberExpression
                && object.name === 'require';

            var isWindowRequire = object.property
                && object.property.type === Syntax.Identifier
                && object.property.name === 'require'

            if (isRequire || isWindowRequire) {
                return true;
            }

        }

    }
};

exports.isRequireConfig = function (node) {

    var callee = node.callee;

    if (node.type === Syntax.CallExpression
        && callee.type === Syntax.MemberExpression
    ) {

        var object = callee.object;
        var property = callee.property;
        var args = node.arguments;

        if (object.type === Syntax.Identifier
            && object.name === 'require'

            && property.type === Syntax.Identifier
            && property.name === 'config'

            && args.length === 1
            && args[0].type === Syntax.ObjectExpression
        ) {
            return true;
        }

    }

};

/**
 * 是否是字符串节点
 *
 * @param {Object} node
 * @return {boolean}
 */
exports.isStringLiteralNode = function (node) {
    return node
        && node.type === Syntax.Literal
        && typeof node.value === 'string';
};

/**
 * 创建字符串节点
 *
 * @param {string} literal
 * @return {boolean}
 */
exports.createStringLiteralNode = function (literal) {
    return {
        type: Syntax.Literal,
        value: literal,
        raw: '"' + literal + '"'
    };
};

/**
 * 转成 unix 形式的文件路径
 *
 * @param {string} filePath
 * @return {string}
 */
exports.toUnixFilePath = function (filePath) {
    return filePath.replace(/\\/g, '/');
};

/**
 * 跨平台的 path.join
 *
 * @return {string}
 */
exports.joinPath = function () {

    var args = [ ];

    for (var i = 0, len = arguments.length; i < len; i++) {
        if (!arguments[i]) {
            console.log(arguments)
        }
        args.push(
            arguments[i].replace(/(\\|\/)/g, path.sep)
        );
    }

    return path.join.apply(path, args);

};

/**
 * 关键字
 *
 * @type {Object}
 */
exports.keywords = {
    require: 1,
    exports: 1,
    module: 1
};

/**
 * 生成代码
 *
 * @param {Object} ast
 * @param {boolean} minify 是否要压缩
 * @return {string}
 */
exports.generateCode = function (ast, minify) {

    if (!Array.isArray(ast)) {
        ast = [ast];
    }

    var ast = {
        type: Syntax.Program,
        body: ast
    };

    var options = { };

    if (minify) {
        options.format = {
            indent: {
                style: ''
            },
            quotes: 'auto',
            compact: true
        };
    }

    return escodegen.generate(ast, options);

};

/**
 * 是否是相对路径
 *
 * @param {string} url 路径
 * @return {boolean}
 */
exports.isRelativePath = function (url) {
    // 包含协议或以 / 开头
    return !/^([a-z]{2,10}:\/)?\//i.test(url);
};

/**
 * 遍历对象
 *
 * @param {Object} target
 * @param {Function} handler
 */
exports.each = function (target, handler) {
    for (var key in target) {
        if (target.hasOwnProperty(key)) {
            if (handler(target[key], key) === false) {
                return;
            }
        }
    }
};

/**
 * 扩展对象
 *
 * @param {Object} source
 * @param {Object} target
 * @return {Object}
 */
exports.extend = function (source, target) {

    source = source || { };

    exports.each(
        target,
        function (value, key) {
            source[key] = value;
        }
    );

    return source;

};

/**
 * 过滤
 *
 * @param {string|Array.<string>} array
 * @param {string|Array.<string>} exclude 从 array 中剔除 exclude
 * @return {Array.<string>}
 */
exports.filter = function (array, exclude) {

    var result = [ ];

    if (typeof array === 'string') {
        array = [ array ];
    }

    if (typeof exclude === 'string') {
        exclude = [ exclude ];
    }

    if (Array.isArray(array)) {

        var test;

        if (Array.isArray(exclude)) {
            test = function (item) {
                return exclude.indexOf(item) < 0;
            };
        }
        else {
            test = function () {
                return true;
            };
        }

        array.forEach(function (item) {
            if (test(item)) {
                result.push(item);
            }
        });
    }

    return array;

};

/**
 * 数组去重
 *
 * @param {Array} array
 * @return {Array}
 */
exports.unique = function (array) {

    var result = [ ];
    var exists = { };

    array.forEach(function (item) {
        if (!exists[item]) {
            result.push(item);
            exists[item] = 1;
        }
    });

    return result;

};

/**
 * 合并 a b 数组成一个新数组
 *
 * @param {Array?} a
 * @param {Array?} b
 * @return {Array}
 */
exports.merge = function (a, b) {

    var result = [ ];

    var addItem = function (item) {
        result.push(item);
    };

    if (a) {
        a.forEach(addItem)
    }

    if (b) {
        b.forEach(addItem);
    }

    return result;

};
