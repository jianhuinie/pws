var less = require('less');
var config = require('../config');

var css = require('./css');
var page = require('./page');
var html = require('./html');
var amd = require('./amd');

exports.extnames = [
    '.less'
];

exports.paths = [

];

function isRootStyle(node, dependencyMap, reverseDependencyMap) {
    if (config.staticFiles.indexOf(node.file) >= 0) {
        return true;
    }
    var files = reverseDependencyMap[node.file];
    return files
        && files.filter(
            function (file) {
                var node = dependencyMap[file];
                return page.is(node, dependencyMap, reverseDependencyMap)
                    || html.is(node, dependencyMap, reverseDependencyMap)
                    || amd.is(node, dependencyMap, reverseDependencyMap);
            }
        ).length > 0;
}

exports.is = function (node, dependencyMap, reverseDependencyMap) {
    if (exports.extnames.indexOf(node.extname) >= 0) {
        return isRootStyle(node, dependencyMap, reverseDependencyMap);
    }
};

exports.filter = function (node, dependencyMap, reverseDependencyMap) {
    if (exports.extnames.indexOf(node.extname) >= 0) {
        return !isRootStyle(node, dependencyMap, reverseDependencyMap);
    }
};

exports.build = function (node) {
    return new Promise(function (resolve, reject) {
        less.render(
            node.content.toString(),
            {
                paths: exports.paths,
                filename: node.file,
                relativeUrls: true,
                compress: config.release
            },
            function (error, output) {
                if (error) {
                    console.error(error);
                }
                css
                .autoprefixer(output.css)
                .then(function (content) {
                    node.content = config.replaceContent(content, 'less');
                    resolve();
                });
            }
        );
    });
};


