var path = require('path');
var amdDeploy = require('amd-deploy');
var filePathToResourceId = require('amd-deploy/lib/filePathToResourceId');
var resourceIdToFilePath = require('amd-deploy/lib/resourceIdToFilePath');

var html2js = require('html2js');

var Node = require('fe-tree/lib/Node');
var feTree = require('fe-tree');
var feTreeUtil = require('fe-tree/lib/util');

var config = require('../config');
var script = require('./script');

exports.extnames = [
    '.js'
];

exports.is = function (node) {
    if (exports.extnames.indexOf(node.extname) >= 0) {
        var amdExcludes = config.amdExcludes;
        if (Array.isArray(amdExcludes)) {
            return !feTreeUtil.match(node.file, amdExcludes);
        }
        return true;
    }
};

var tplSuffix = '_html';
var styleSuffix = '_css';

function fileReader(node, suffix) {

    var outputFile = node.file;

    var resourceId = filePathToResourceId(outputFile, config.outputAmdConfig)[0];
    resourceId = feTreeUtil.removeExtname(resourceId);

    var moduleId = resourceId + suffix;
    outputFile = resourceIdToFilePath(moduleId, config.outputAmdConfig);

    var dependencyNode = feTree.dependencyMap[outputFile];
    if (dependencyNode) {
        return dependencyNode.content.toString();
    }

    var code = html2js(
        node.content.toString(),
        {
            mode: 'compress'
        }
    );

    var content = 'define("'
        + moduleId
        + '", [], function () { return ' + code + '});';

    node = new Node(outputFile, new Buffer(content));
    node.buildContent = true;

    feTree.dependencyMap[outputFile] = node;

    return content;

}

function rawReader(node) {
    return node.content.toString();
}

function tplReader(node) {
    return fileReader(node, tplSuffix);
}

function styleReader(node) {
    return fileReader(node, styleSuffix);
}

function readDependency(dependencyMap, file, reader) {
    var outputFile = config.getOutputFile(file);

    // 为了更好的可用性，非 MD5 版本最好要输出
    // 因此在构建 AMD 模块时，非 MD5 版本的资源一定有
    var extname = path.extname(outputFile);
    var basename = path.basename(outputFile, extname);
    var lastIndex = basename.lastIndexOf('_');
    if (lastIndex >= 0) {
        var rawTerm = basename.substr(0, lastIndex);
        var hashTerm = basename.substr(lastIndex + 1);
        if (hashTerm.length === 10) {
            outputFile = path.join(
                path.dirname(outputFile),
                rawTerm + extname
            )
        }
    }

    var node = dependencyMap[outputFile];
    if (node) {
        var content = reader(node);
        return content;
    }
}

exports.build = function (node, dependencyMap, reverseDependencyMap) {

    var amdConfig = feTreeUtil.extend({}, config.sourceAmdConfig);
    amdConfig.replaceRequireConfig = config.getOutputAmdConfig;
    amdConfig.replaceRequireResource = function (resource, absolute) {
        var raw = resource.id;
        var extname = path.extname(raw).toLowerCase();

        var isTpl = extname === '.html'
            || extname === '.tpl'

        var isStyle = extname === '.css'
            || extname === '.styl'
            || extname === '.less';

        var loadAsText = resource.plugin === 'text'
            || resource.plugin === 'html';

        if ((isTpl || isStyle) && loadAsText) {
            return {
                plugin: '',
                id: feTreeUtil.removeExtname(raw)
                    + (isTpl ? tplSuffix : styleSuffix)
            };
        }
    };
    amdConfig.fileReader = {
        js: function (file) {
            return readDependency(dependencyMap, file, rawReader);
        },
        css: function (file) {
            return readDependency(dependencyMap, file, styleReader);
        },
        less: function (file) {
            return readDependency(dependencyMap, file, styleReader);
        },
        styl: function (file) {
            return readDependency(dependencyMap, file, styleReader);
        },
        html: function (file) {
            return readDependency(dependencyMap, file, tplReader);
        },
        tpl: function (file) {
            return readDependency(dependencyMap, file, tplReader);
        },
    };

    return new Promise(function (resolve, reject) {
        amdDeploy({
            file: node.file,
            content: node.content.toString(),
            config: amdConfig,
            callback: function (code) {
                code = config.replaceContent(code, 'amd');
                node.content = config.release
                    ? script.uglify(code)
                    : code;
                resolve();
            }
        });
    });

};
