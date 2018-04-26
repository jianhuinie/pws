/**
 * Created by bjhl on 15/12/5.
 */
const fs = require('fs');
const esprima = require('esprima');
const walk = require('esprima-walk');
const escodegen = require('escodegen');

const config = require('../config');
const util = require('../tool/util');

// 获取所有的AMD配置文件
exports.getManifest = (function () {
    var _mainfest = '';

    return function () {
        if (!_mainfest) {
            var content = fs.readFileSync(config.manifest, 'utf-8');
            if (content) {
                var ast = esprima.parse(content);
                walk(ast, function (block) {
                    if (block.type === 'CallExpression') {
                        var args = block.arguments;
                        if (args && args.length) {
                            var callee = block.callee || {};
                            var property = callee.property || {};
                            // 替换图片
                            if (property.name === 'config') {
                                _mainfest = escodegen.generate(args[0]) || [];
                                return false;
                            }
                        }
                    }
                });
            }

            var json = eval('(' + _mainfest + ')');

            json.baseUrl = util.getFilterFileName(json.baseUrl);

            _mainfest = json;
        }

        return _mainfest;
    };
}());
