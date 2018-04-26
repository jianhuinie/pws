/**
 * @file 内置正则
 * @author musicode
 */

var path = require('path');
var resourceIdToFilePath = require('amd-deploy/lib/resourceIdToFilePath');

/**
 * 模板中的依赖规则
 *
 * @inner
 * @type {Array}
 */
var htmlRules = [

    {
        pattern: /\bhref=['"](?:[^'"]+\.(?:ico|css|less|styl|sass)(?:\?.+)?)['"]/gi,
        match: function (result) {
            var terms = result.split(/['"]/);
            if (terms.length === 3) {
                return terms[1];
            }
        }
    },

    {
        pattern: /\bsrc=['"][^'"]+['"]/gi,
        match: function (result) {
            var terms = result.split(/['"]/);
            if (terms.length === 3) {
                return terms[1];
            }
        }
    },

    {
        // require('xx'
        // require(['xx']
        pattern: /require\s*?\(\s*?(\[?[^{}\]]+\]?)/g,
        match: function (result, file, amdConfig) {
            return parseAmdDependencies(
                result.replace(/require\s*?\(/, ''),
                amdConfig
            );
        }
    },

];

/**
 * 样式中的依赖规则
 *
 * 对于动态样式语言，强烈建议保留以下写法：
 *
 * @import ""
 * @import ''
 * url(xxx)
 * url("xxx")
 * url('xxx')
 *
 * 这样便于正则分析，无需使用动态样式语言提供的语法分析工具（可能会很慢）
 *
 * @inner
 * @type {Array}
 */
var cssRules = [

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
    },

    {
        pattern: /url\(\s*?['"]?(?:[^'")]+)['"]?\s*?\)/gi,
        match: function (result, file) {

            var terms = result.split(/['"]/);
            var result;

            if (terms.length === 3) {
                result = terms[1];
            }
            else {
                result = result.split('(')[1].split(')')[0];

                // background: url( ../img/a.png )
                // 类似这种，两边可以有空白符，因此要 trim
                result = result.trim();
            }

            if (result) {

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

];

/**
 * 解析 amd 依赖
 *
 * @param {string} literal 从 match 中抽离出的符合 id 规则的字面量
 * @param {Object} amdConfig
 * @return {Array.<string>}
 */
function parseAmdDependencies(literal, amdConfig) {

    // literal 可能是 'moduleId'、'[ "module1", "module2" ]'、xxx（非法 js 变量）

    literal = literal.trim();

    var resources;

    try {
        var factory = new Function('return ' + literal);
        resources = factory();
    }
    catch (e) {

        console.log('[fe-tree error][amd id parse error]');
        console.log(literal);
        console.log('');

        resources = literal;
    }

    if (!resources) {
        return;
    }

    if (!Array.isArray(resources)) {
        resources = [ resources ];
    }

    var result = [ ];

    resources.forEach(function (resourceId) {

        var file = resourceIdToFilePath(
            resourceId,
            amdConfig
        );

        if (file) {
            result.push({
                amd: true,
                raw: resourceId,
                file: file
            });
        }

    });

    return result;

}


exports.htmlRules = htmlRules;
exports.cssRules = cssRules;
exports.parseAmdDependencies = parseAmdDependencies;

