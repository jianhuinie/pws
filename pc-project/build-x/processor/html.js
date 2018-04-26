var readRequireConfig = require('amd-deploy/lib/readRequireConfig');
var config = require('../config');
var page = require('./page');

exports.extnames = [
    '.html',
    '.tpl'
];

exports.is = function (node) {
    if (exports.extnames.indexOf(node.extname) >= 0) {
        return !page.is(node);
    }
};

exports.build = function (node) {
    var content = node.content.toString();
    var newContent = config.replaceContent(content, 'html');
    if (content !== newContent) {
        node.content = newContent;
    }
};


exports.updateAmdConfg = function (content) {

    var list = readRequireConfig(content);

    if (Array.isArray(list) && list.length > 0) {

        var parts = [ ];
        var fromIndex = 0;

        list.forEach(function (item, index) {

            parts.push(
                content.substring(fromIndex, item.fromIndex)
            );

            var code;

            if (item.data) {
                code = JSON.stringify(
                    config.getOutputAmdConfig(item.data),
                    null,
                    item.indentBase
                );
            }
            else {
                code = content.substring(
                    item.fromIndex,
                    item.toIndex
                );
            }

            parts.push(code);

            fromIndex = item.toIndex;

        });

        parts.push(
            content.substring(fromIndex)
        );

        return parts.join('');

    }

    return content;

};
