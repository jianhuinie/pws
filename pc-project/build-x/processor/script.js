var uglify = require('uglifyjs').minify;
var config = require('../config');
var amd = require('./amd');

exports.extnames = [
    '.js'
];

exports.is = function (node) {
    if (exports.extnames.indexOf(node.extname) >= 0) {
        return !amd.is(node);
    }
};

exports.build = function (node) {
    var content = node.content.toString();
    var newContent = config.replaceContent(content, 'script');
    if (config.release) {
        newContent = exports.uglify(newContent);
    }
    if (content !== newContent) {
        node.content = newContent;
    }
};

exports.uglify = function (code) {
    try {
        var result = uglify(code, {
            fromString: true,
            compress: {
                warnings: false,
                // see https://github.com/ecomfe/edp/issues/230
                conditionals: false
            },
            mangle: {
                except: ['require', 'exports', 'module']
            }
        });
        return result.code;
    }
    catch (e) {
        return code;
    }
};