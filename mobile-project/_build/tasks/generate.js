/**
 * Created by bjhl on 15/11/27.
 */
const esmangle = require('esmangle');
const escodegen = require('escodegen');
const util = require('../tool/util');
//require replace name
exports.generate = function (ast) {
    if (util.isBeta()) {
        var optimized = esmangle.optimize(ast, null);
        //gets mangled AST
        var result = esmangle.mangle(optimized);
        return escodegen.generate(result, {
            format: {
                renumber: true,
                hexadecimal: true,
                escapeless: true,
                compact: true,
                semicolons: true,
                parentheses: false
            }
        });
    }
    return escodegen.generate(ast);
};