/**
 * Created by bjhl on 16/01/14.
 */
const argv = require('yargs').argv;
const fs = require('fs');
const path = require('path');

const feTree = require('../tool/feTree');
const util = require('../tool/util');
const config = require('../config');
const biz = require('../tool/biz');
const writeTask = require('../tasks/write');
const renameTask = require('../tasks/rename');
const amdTask = require('../tasks/amd');
const generateTask = require('../tasks/generate');
const write = require('write');

const jsBuild = function (ast, fileName) {
    // 将esprima转成压缩后的JS文件，并返回内容
    const minjs = generateTask.generate(ast);
    // 将pathname改为发布后的带MD5的文件路径，并将内容发布到当前路径下
    writeTask.write(biz.getReleaseMd5Name(fileName, minjs), minjs);
};
// 插件发布
const pluginBuild = function () {
    // 插件发布
    const jsPlugin = biz.plugin.get();
    util.each(jsPlugin, function (ast, fileName) {
        // 增量依赖文件，直接跳过
        if (ast === '1') {
            return;
        }
        const releaseName = biz.getReleaseName(fileName);
        jsBuild(ast, releaseName);
    });
};

// deps
const buildDep = function (dependencyMap, output, changeFiles) {
    var manifest = {
        version: {},
        deps: {}
    };
    
    // 增量构建
    if (changeFiles && changeFiles.uptFiles.length) {
        // var manifestPath = biz.getReleaseName(output);
        // var content = fs.readFileSync(path.join(config['public'], manifestPath), 'utf-8');
        var content = util.cache.get('manifest', config.manifest);
        if (content) {
            content = content.replace('window.initRequireConfig && window.initRequireConfig(', '');
            content = content.substr(0, content.lastIndexOf(')'));
            manifest = JSON.parse(content);
        } else {
            throw new Error('增量构建没有获取到manifest信息');
        }
    }
    var reDeps = {}; // 去重
    var jsMd5List = util.cacheMd5.get('js');
    const addVersion = function (filePath) {
        const releaseName = biz.getReleaseName(filePath);
        const pathMd5 = jsMd5List[releaseName];

        if (!manifest.version[releaseName] || changeFiles) {
            manifest.version[releaseName] = pathMd5;
        }
    };
    const addDep = function (filePath, dep) {
        const pathReleaseName = biz.getReleaseName(filePath);

        manifest.deps[pathReleaseName] = manifest.deps[pathReleaseName] || [];
        // 第一次清空
        if (!reDeps[pathReleaseName]) {
            manifest.deps[pathReleaseName] = [];
        }
        reDeps[pathReleaseName] = reDeps[pathReleaseName] || {};

        if (dep && !reDeps[pathReleaseName][dep]) {
            const depReleaseName = biz.getReleaseName(dep);
            manifest.deps[pathReleaseName].push(depReleaseName);
            reDeps[pathReleaseName][dep] = 1;
        }
    };
    const delManifestMap = function (fileName) {
        if (manifest.version[fileName]) {
            manifest.version[fileName] = null;
            delete manifest.version[fileName];
            manifest.deps[fileName] = null;
            delete manifest.deps[fileName];
        }
    };
    const delFile = function (filePath) {
        if (biz.plugin.isPlugin(filePath)) {
            filePath = biz.plugin.getPlugName(filePath);
        }
        var releaseName = biz.getReleaseName(filePath);
        if (!manifest.version[releaseName]) {
            // text!xx 和 css-loader!xx，path有变化，path中加了_pluginCss/_pluginString
            // 先处理css
            var index = releaseName.lastIndexOf('/');
            var pluginPath = releaseName.substr(0, index) + '/';
            var fileName = releaseName.substr(index + 1, releaseName.length);
            releaseName = pluginPath + config.pluginCssDir + '/' + fileName;
            releaseName = releaseName.replace('.styl', '.js');
            delManifestMap(releaseName);
            releaseName = pluginPath + config.pluginHtmlDir + '/' + fileName;
            releaseName = releaseName.replace('.tpl', '.js');
            delManifestMap(releaseName);
            return;
        }
        manifest.version[releaseName] = null;
        delete manifest.version[releaseName];
        manifest.deps[releaseName] = null;
        delete manifest.deps[releaseName];
    };
    // const addPluginDep = function (filePath, dep) {
    //     if ((util.isHtml(filePath) || util.isCss(filePath)) && biz.plugin.isPlugin(filePath)) {
    //         filePath = biz.plugin.getPlugName(filePath);
    //         addVersion(filePath);
    //         addDep(filePath, dep);
    //         return true;
    //     }
    //     return false;
    // }
    // 生成依赖表
    util.each(dependencyMap, function (item) {
        // JS生成依赖表
        var filePath = item.file;
        const deps = item.children;

        if (changeFiles) {
            if (changeFiles.uptFiles.indexOf(filePath) === -1) {
                return;
            }
        }
        // 插件添加依赖
        if (biz.plugin.isPlugin(filePath)) {
            filePath = biz.plugin.getPlugName(filePath);
            addVersion(filePath);
            addDep(filePath);
            return false;
        }
        // JS文件并不没有过滤添加依赖
        if (util.isJs(filePath) && !util.fileFilter.is(filePath)) {
            addVersion(filePath);
            addDep(filePath);
            if (deps.length) {
                util.each(deps, function (depItem) {
                    const node = depItem.node;
                    var file = node.file;
                    // 同步加载添加依赖
                    if (!depItem.async) {
                        if (biz.plugin.isPlugin(file)) {
                            file = biz.plugin.getPlugName(file);
                            addDep(filePath, file);
                            return false;
                        }

                        if (util.isJs(file)) {
                            addDep(filePath, file);
                            return false;
                        }
                    }
                });
            }
        }
    });

    if (changeFiles && changeFiles.delFiles.length) {
        // 已删除文件
        changeFiles.delFiles.forEach(function (file) {
            delFile(file);
        });
        
        // TODO: 是否同时做成定时
        // 有文件删除，前端资源重新加载
        manifest.reload_data = true;
        // return;
    } else if (util.total === 0 && !changeFiles) {
        // 增量但是没有changeFiles，证明有文件删除，前端资源重新加载
        // TODO: 由于暂时无法解决的问题，见'_build/builder.js'注释
        manifest.reload_data = true;
    }

    var loaderConfig = biz.getLoaderConfig();
    // 根据环境不同，分配给loader不同的配置
    manifest.dir_path = loaderConfig.dir_path;
    manifest.enable_combo = loaderConfig.enable_combo;
    manifest.prefixKey = config.lsSet.prefixKey;

    var manifestContent = 'window.initRequireConfig && window.initRequireConfig(' + JSON.stringify(manifest) + ')';
    // 文件名称与文件内容，生成MD5的配置文件｛fileName:md5｝
    util.cacheMd5.set(biz.getReleaseName(output), manifestContent);

    writeTask.write(biz.getReleaseName(output), manifestContent);
};
// 过滤文件处理
const filterFile = function (dependencyMap, changeFiles) {
    // 依赖文件必须最后生成
    util.each(util.fileFilter.get(), function (item) {
        if (/manifest\.js$/ig.test(item.fileName)) {
            buildDep(dependencyMap, item.fileName, changeFiles);
            return;
        };

        if (/loader\.js$/ig.test(item.fileName)) {
            jsBuild(item.content, biz.getReleaseName(item.fileName));
            return;
        };
    });
};

const astPublish = function (dependencyMap, changeFiles) {
    // write('/Users/hanrui/work/bjhl/web/Mobile_Web_FE/d.json', JSON.stringify(feTree.dependencyMap));
    // write('/Users/hanrui/work/bjhl/web/Mobile_Web_FE/r.json', JSON.stringify(feTree.reverseDependencyMap));
    util.each(dependencyMap, function (dps, fileName) {
        if (util.isJs(fileName)) {
            if (changeFiles && changeFiles.uptFiles.indexOf(fileName) === -1) {
                return;
            }
            if (util.total === 0) {
                // 增量，把依赖的js的html加入，只有loader文件名md5放在path中
                if (config.htmlMD5Js.indexOf(fileName) > -1) {
                    changeFiles.uptFiles = changeFiles.uptFiles.concat(feTree.reverseDependencyMap[fileName]);
                }
            }
            // console.log(fileName);
            var amd = dps.amd || {};
            if (!util.fileFilter.is(fileName, amd.ast)) {
                // console.log('js file:' + fileName);
                // 重命名，并添加插件，生成AMD插件内容文件
                renameTask.rename(amd);
                // JS文件AMD
                amdTask.amd(amd);
                jsBuild(amd.ast, biz.getReleaseName(amd.path));
            }
        }
    });
};

exports.build = function (changeFiles) {
    const dependencyMap = feTree.dependencyMap;

    // 对正向依赖中的AST编辑并发布
    const astBhk = util.benchmark('  js:ast');
    astPublish(dependencyMap, changeFiles);
    astBhk();

    // 插件发布
    const pluginBhk = util.benchmark('  js:css-loader/text:');
    pluginBuild();
    pluginBhk();

    try {
        // 过滤文件处理
        const filterBhk = util.benchmark('  js:manifest:');
        filterFile(dependencyMap, changeFiles);
        filterBhk();
    } catch (e) {
        console.trace();
        console.error(e);
    }
};