/**
 * Created by bjhl on 15/11/27.
 */
const util = require('../tool/util');
const biz = require('../tool/biz');
// 递归
const walk = require('esprima-walk');
// 是否二次重命名
var config = {};
// 添空对象
const emptyObject = function (obt) {
    util.each(obt, function (value, key) {
        delete obt[key];
    });
    return obt;
};
//填充对象
const fillObject = function (block, data) {
    var block = emptyObject(block);
    util.each(data, function (value, key) {
        block[key] = value;
    });
    return block;
};
// require replace name
exports.rename = function (amd) {
    var ast = amd.ast;
    if (!config[amd.path] && ast) {
        walk(ast, function (block) {
            if (block.type === 'CallExpression') {
                var args = block.arguments;
                if (args && args.length) {
                    var callee = block.callee || {};
                    var property = callee.property || {};
                    var object = callee.object || {};

                    // 替换图片
                    if (property.name === 'toUrl' && object.name === 'require') {
                        var imagePathValue = args[0].value;
                        if (!imagePathValue) {
                            return false;
                        }
                        // BLOCK expression 对象内
                        var imgUrl = biz.loadImage.getName(amd.path, imagePathValue);
                        var _block = block;
                        if (util.isLocal() || biz.loadImage.isWhiteList(amd.path, imagePathValue)) {
                            _block = args[0];
                        }

                        fillObject(_block, {
                            type: 'Literal',
                            value: imgUrl,
                            raw: JSON.stringify(imgUrl)
                        });

                        return false;
                    }
                    // 替换require
                    if (callee.name === 'require') {
                        var requirePathValue = args;
                        //参数为字符
                        if (args[0].type === 'ArrayExpression' && args[0].elements) {
                            requirePathValue = args[0].elements;
                        }

                        requirePathValue.forEach(function (arg) {
                            if (arg.type === 'Literal' && arg.value) {
                                var requireName = biz.getRequireName(amd.path, arg.value);
                                fillObject(arg, {
                                    type: 'Literal',
                                    value: requireName,
                                    raw: JSON.stringify(requireName)
                                });

                                return false;
                            }
                        });
                    }
                }
            }
        });

        config[amd.path] = true;
    }
};