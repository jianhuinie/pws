var feTreeUtil = require('fe-tree/lib/util');

var config = require('../config');
var html = require('./html');

exports.extnames = [
    '.html',
    '.phtml'
];

exports.is = function (node) {
    if (exports.extnames.indexOf(node.extname) >= 0) {
        return feTreeUtil.match(node.file, config.pageFiles);
    }
};

exports.build = function (node) {

    var content = node.content.toString();

    var newContent = config.replaceContent(content, 'page');
    newContent = html.updateAmdConfg(newContent);

    if (content !== newContent) {
        node.content = newContent;
    }
};

