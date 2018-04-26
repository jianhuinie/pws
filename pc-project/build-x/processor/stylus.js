var stylus = require('stylus');

var config = require('../config');
var page = require('./page');
var html = require('./html');
var css = require('./css');
var amd = require('./amd');

exports.extnames = [
    '.styl'
];

exports.paths = [
    config.projectDir,
    config.srcDir,
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
        stylus(
            node.content.toString()
        )
        .set('paths', exports.paths)
        .set('filename', node.file)
        .set('compress', config.release)
        .define('url', stylus.resolver({
            paths: exports.paths
        }))
        .render(function (error, output) {
            if (error) {
                console.error(error);
            }
            css
            .autoprefixer(output)
            .then(function (content) {
                node.content = config.replaceContent(content, 'stylus');
                resolve();
            });
        });
    });
};