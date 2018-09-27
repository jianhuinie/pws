/**
 * Created by bjhl on 15/11/27.
 */
const walk = require('esprima-walk'); //递归
const biz = require('../tool/biz');
// 避免二次AMD
var config = {};
exports.amd = function (amd) {
    var filePath = amd.path;
    var ast = amd.ast;

    if (!config[filePath] && ast) {
        walk(amd.ast, function (json) {
            json = json || {};
            if (json.type === 'CallExpression') {
                var callee = json.callee || {};
                var dfArray = json.arguments || [];
                // dfine
                if (callee.name === 'define') {
                    dfArray.unshift({
                        type: 'Literal',
                        value: biz.getReleaseName(filePath)
                    });
                }
            }
        });

        config[filePath] = true;
    }
};