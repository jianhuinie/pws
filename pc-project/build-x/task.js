
var path = require('path');
var glob = require('glob');
var fs = require('fs-extended');

var Node = require('fe-tree/lib/Node');
var feTree = require('fe-tree');
var feTreeUtil = require('fe-tree/lib/util');

var config = require('./config');

var cssProcessor = require('./processor/css');
var lessProcessor = require('./processor/less');
var stylusProcessor = require('./processor/stylus');
var scriptProcessor = require('./processor/script');
var amdProcessor = require('./processor/amd');
var htmlProcessor = require('./processor/html');
var pageProcessor = require('./processor/page');
var otherProcessor = require('./processor/other');

// 源文件的 md5
var sourceFileHash = { };

// md5 化的文件的 md5
var outputFileHash = { };

// 已经输出过的文件
var outputedFile = { };

// 生成源文件的树
exports.parseSourceTree = function () {

    return new Promise(function (resolve) {

        var files = feTreeUtil.merge(
            config.pageFiles,
            config.staticFiles
        );

        var counter = files.length;

        files.forEach(function (pattern) {
            glob(pattern, function (error, files) {

                feTree.parse({
                    files: config.filterFiles(files),
                    htmlRules: config.htmlRules,
                    amdExcludes: config.amdExcludes,
                    amdConfig: config.sourceAmdConfig,
                    processDependency: config.processDependency
                });

                if (--counter === 0) {
                    resolve();
                }

            });
        });

    });

};

// 对比文件变化
exports.compareFile = function () {

    var dependencyMap = feTree.dependencyMap;

    var hashMap = { };
    for (var key in dependencyMap) {
        hashMap[key] = dependencyMap[key].md5;
    }

    if (!config.total) {

        var prevHashMap = feTreeUtil.readJSON(
            config.sourceHashFile
        );

        if (prevHashMap) {

            var changes = [ ];

            // 这里需要收集全部的 key，避免删除文件后，hashMap 里没有对应的 key
            var keys = [];
            var addKey = function (key) {
                if (keys.indexOf(key) < 0) {
                    keys.push(key);
                }
            };

            [
                Object.keys(hashMap),
                Object.keys(prevHashMap)
            ].forEach(function (item) {
                item.forEach(addKey);
            });

            keys.forEach(function (key) {
                if (hashMap[key] !== prevHashMap[key]) {
                    changes.push(key);
                }
                else {
                    dependencyMap[key].filter = true;
                }
            });

            var updateChange = function (changes, buildParent, buildChild) {
                changes.forEach(function (file) {
                    var node = dependencyMap[file];
                    if (!node || node.filter === false) {
                        return;
                    }
                    node.filter = false;

                    // 它依赖了谁
                    var changes = node.children.map(function (child) {
                        return child.file;
                    });
                    if (changes && buildChild) {
                        updateChange(changes, buildParent, buildChild);
                    }

                    // 谁依赖了它
                    changes = feTree.reverseDependencyMap[file];
                    if (changes && buildParent) {
                        updateChange(changes, buildParent, buildChild);
                    }

                    // AMD 模块的依赖即使没变也要 build
                    if (amdProcessor.is(node)) {
                        changes = [ ];
                        config.walkNode(node, function (dependency) {
                            changes.push(dependency.file);
                            return dependency;
                        });
                        updateChange(changes, false, true);
                    }

                });
            };

            updateChange(changes, true, false);

        }

    }

    sourceFileHash = hashMap;

};

// 把文件编译成浏览器可执行的版本
exports.buildFile = function () {

    var dependencyMap = feTree.dependencyMap;
    var reverseDependencyMap = feTree.reverseDependencyMap;

    var needHash = Array.isArray(config.hashFiles);

    var prevHashMap = feTreeUtil.readJSON(config.outputHashFile);
    if (prevHashMap) {
        feTreeUtil.extend(outputFileHash, prevHashMap);
    }

    // 需要 build 的节点
    var buildNodes = [ ];

    for (var key in dependencyMap) {
        var node = dependencyMap[key];
        if (node.filter) {
            continue;
        }

        var matched = false;

        [
            cssProcessor,
            lessProcessor,
            stylusProcessor,
            scriptProcessor,
            amdProcessor,
            htmlProcessor,
            pageProcessor,
            otherProcessor
        ].forEach(function (processor, index) {
            if (matched) {
                return;
            }

            if (processor.filter
                && processor.filter(node, dependencyMap, reverseDependencyMap)
            ) {
                matched = true;
            }
            else if (processor.is
                && processor.is(node, dependencyMap, reverseDependencyMap)
                && processor.build
            ) {
                matched = true;

                node.buildContent = function () {
                    return processor.build(this, dependencyMap, reverseDependencyMap);
                };
                node.onBuildStart = function () {
                    console.log('正在编译：' + this.file, index);
                };
                node.onBuildEnd = function () {

                    var file = this.file;
                    var outputFile = config.getOutputFile(file);

                    // 转移文件到输出目录
                    feTree.updateFile(outputFile, file);


                    // 更新文件依赖路径 + 添加依赖 md5
                    var addDependencyHash;
                    if (needHash) {
                        addDependencyHash = hashDependency(false);
                    }

                    config.walkNode(
                        this,
                        function (dependency, node) {
                            dependency.raw = config.getOutputFile(dependency.raw);
                            return addDependencyHash
                                ? addDependencyHash(dependency, node)
                                : dependency;
                        }
                    );


                    // 文件依赖路径替换完成后，计算文件的 md5
                    var fileHash;
                    if (needHash) {
                        fileHash = feTreeUtil.match(outputFile, config.hashFiles)
                            ? this.md5
                            : null;
                    }
                    outputFileHash[outputFile] = fileHash;


                    this.onBuildStart =
                    this.onBuildEnd = null;

                };

                buildNodes.push(node);

                // 归类
                var processorNodes = processor.nodes;
                if (!Array.isArray(processorNodes)) {
                    processorNodes = processor.nodes = [ ];
                }
                processorNodes.push(node);

            }
        });
    }

    return new Promise(function (resolve) {

        var promises = buildNodes.map(
            function (node) {
                return node.build()
                .catch(function (e) {
                    console.log(e);
                });
            }
        );

        Promise.all(promises).then(resolve);

    });

};


function hashDependency(isFile) {
    return function (dependency, node) {
        var nodeOutputFile = config.getOutputFile(node.file);
        var dependencyOutputFile = config.getOutputFile(dependency.file);
        var dependencyOutputFileHash = outputFileHash[dependencyOutputFile];

        // AMD 的模块名必须和文件名保持一致
        if (dependencyOutputFileHash
            && (isFile
                ? dependencyOutputFile === nodeOutputFile
                : dependencyOutputFile !== nodeOutputFile
            )
        ) {
            dependency.raw = feTreeUtil.getHashedFile(
                dependency.raw,
                dependencyOutputFileHash
            );
        }

        return dependency;
    };
}

// md5 化整个项目
exports.createHashedFile = function () {

    var dependencyMap = feTree.dependencyMap;

    for (var file in outputFileHash) {
        var node = dependencyMap[file];
        var hash = outputFileHash[file];
        if (node && hash) {
            config.walkNode(node, hashDependency(true));
            feTree.updateFile(
                feTreeUtil.getHashedFile(file, hash),
                file
            );
        }
    }

};

exports.outputFile = function () {

    var dependencyMap = feTree.dependencyMap;

    for (var file in dependencyMap) {
        var node = dependencyMap[file];
        var md5 = node.md5;
        if (file.indexOf(config.outputDir) === 0
          && outputedFile[file] !== md5
        ) {
            console.log('输出文件：', file);
            outputedFile[file] = md5;
            fs.createFileSync(file, node.content);
        }
    }

};

exports.complete = function () {

    feTreeUtil.writeJSON(
        config.sourceHashFile,
        sourceFileHash
    );

    feTreeUtil.writeJSON(
        config.outputHashFile,
        outputFileHash
    );

};

