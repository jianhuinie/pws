/**
 * Created by bjhl on 15/11/27.
 */
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const esprima = require('esprima');

const feTree = require('./feTree');
const dep = require('./isDep');
const imageWhite = require('./fileExports').getImagesWhiteList();
const config = require('../config');
const util = require('./util');
const writeTask = require('../tasks/write');
const htmlRenameTask = require('../tasks/htmlRename');

const reverseDependencyMap = feTree.reverseDependencyMap;

// 是否是入口文件，没有反向依赖
exports.isExports = function (pathName) {
    const rdeps = reverseDependencyMap[pathName] && reverseDependencyMap[pathName].join();
    if (!rdeps || rdeps.indexOf('.html') > -1 || rdeps.indexOf('.tpl') > -1) {
        return true;
    }
    return false;
};

// 根据环境，获取不同的loader配置
exports.getLoaderConfig = function () {
    if (util.isLocal()) {
        return config.localLoaderConfig;
    }
    if (util.isDev()) {
        return config.devLoaderConfig;
    }
    return config.betaLoaderConfig;
};
// 根据环境，获取不同的上传图片地址
exports.getImageServerPath = function () {
    if (util.isBeta()) {
        return config.betaImageServerPath;
    }
    return config.devImageServerPath;
};

// 硬盘绝对路径文件
exports.getRootName = function (pathName, fileName) {
    fileName = util.getFilterFileName(fileName);

    if (fileName) {
        if (util.isFilterPath(fileName)) {
            return fileName;
        }
        return util.fixPath(fileName, pathName);
    }

    return pathName;
};
/*
 * 返回MD5的发布文件地址
 *
 * @fileName 硬盘地址
 *
 * styl，less转成css,的扩展名，简单粗暴实现，当前目录下不能有相同的css，styl,less等名字。
 * */
exports.getReleaseMd5Name = function (releaseName, content) {
    if (util.isFilterPath(releaseName)) {
        return releaseName;
    }

    if (content) {
        util.cacheMd5.set(releaseName, content);
    }

    const md5Type = util.getFileType(releaseName);
    const md5 = util.cacheMd5.get(md5Type, releaseName);

    // if (!md5) {
    //     throw new Error('获取' + releaseName + 'md5错误');
    // }
    const basename = path.basename(releaseName);
    var extname = path.extname(releaseName);
    const ebn = path.basename(releaseName, extname);

    if (util.isCss(releaseName)) {
        extname = '.css';
    }

    return releaseName.replace(basename, ebn + '_' + md5 + extname);
};

/*
 * 发布路径js,tpl,css,font
 *
 * pathName 当前文件
 * fileName 文件名称
 * */
exports.getReleaseName = (function () {
    const _getName = function (rootName) {
        if (rootName.match(config.developLib)) {
            return rootName.replace(config.developLib, config.rleaseLib);
        }

        return rootName.replace(config.developSrc, config.rleaseSrc);
    };

    return function (pathName, fileName) {
        if (!fileName) {
            return _getName(pathName);
        }
        const rootName = this.getRootName(pathName, fileName);
        const releaseName = _getName(rootName);

        return util.getCombineFileName(releaseName, fileName);
    };
}());
/*
 * 发布路径require
 *
 * pathName 当前文件
 * fileName 文件名称
 * */
exports.getRequireName = (function () {
    const _getName = function (fileName) {
        if (fileName.match(config.developLib)) {
            return fileName.replace(config.developLib, config.rleaseLib);
        }
        return fileName.replace(config.developSrc, config.rleaseSrc);
    };

    return function (pathName, fileName) {
        var _filenName = fileName;

        if (!fileName) {
            return _getName(pathName);
        }

        fileName = fileName.replace(/['"]/ig, '');

        fileName = util.addRequireExtName(fileName);

        var libPath = dep.isDepExist(fileName);
        if (libPath) {
            fileName = libPath;
        } else {
            // fileName = fileName.replace('text!', '').replace('css-loader!', '');
            config.prePluginTxts.forEach(function (txt) {
                fileName = fileName.replace(txt, '');
            });
            
            // 为不是相对路径添加根目录
            if (!/^\./.test(fileName)) {
                fileName = path.join(config.developSrc, fileName);
            }
            // fileName = this.getRootName(pathName, fileName.replace('text!', '').replace('css-loader!', ''));
            fileName = this.getRootName(pathName, fileName);
        }

        if (this.isFileExist(pathName, fileName)) {
            // if (/text!/ig.test(_filenName)) {
            //     // 添加插件
            //     fileName = this.plugin.set(fileName);
            // } else if (/css-loader!/ig.test(_filenName)) {
            //     // 添加插件
            //     fileName = this.plugin.set(fileName);
            // }
            var _regExp = new RegExp(config.prePluginTxts.join('|'), 'ig');
            if (_regExp.test(_filenName)) {
                // 添加插件
                fileName = this.plugin.set(fileName);
            }

            return _getName(fileName);
        }

        return false;
    };
}());


//
/*
 * 判断当前pathname下的filename文件是否存在，如存在，返回发布地址
 * 根据filename的命名规范，决定是否添加插件，并返回发布地址
 *
 * @param pathName[string] 当前文件的绝对地址
 * @param fileName[string] pathName文件下要替换的值,缺省值，则判断pathName当前文件是否存在
 * */
exports.isFileExist = function (pathName, fileName) {
    const reverseDependencyMap = feTree.reverseDependencyMap;
    const rootName = this.getRootName(pathName, fileName);

    // 获取返向依赖的值，与pathname对比,查询当前硬盘路径是否存在
    const rdMapString = (reverseDependencyMap[rootName] || []).join('|')
        .replace(/\\/ig, '\/\\')
        .replace(/\./ig, '\.');

    const regExp = new RegExp('^' + rdMapString + '$', 'ig');

    // 判断文件是否存在
    if (regExp.test(pathName)) {
        return true;
    }
    console.error('no file：' + rootName);

    return false;
};
//
exports.addRootPath = function (fileName) {
    if (!/^({{|http|\/|\.)/.test(fileName)) {
        return '/' + fileName;
    }
    return fileName;
};
/*
 *图片生成MD5，并添加md5List列表中
 *
 * @pathName 当前文件名称
 * @fileName 具体操作的图片文件
 *
 * return:发布后带MD5的图片文件名称
 * */
exports.loadImage = (function () {
    var _uploadImages = {
        // 服务器保存的图片目录
        dirpath: '',
        images: []
    };
    var _imagesWhiteList = imageWhite;
    // 去重md5
    var _removal = {};
    var _serverPath = exports.getImageServerPath();
    const _getFolder = function () {
        const date = new Date();
        const year = date.getFullYear() + '';
        const month = date.getMonth() + 1;

        const pathMonth = (month + month % 2) + '';

        return path.join(year, pathMonth);
    };
    const _getServerName = function (name, md5) {
        return md5 + path.extname(name);
    };
    const _getProjectRootName = function (fileName) {
        return fileName.replace(config.projectRoot, '');
    };
    const _addLoadParams = function (name, md5) {
        if (!_uploadImages.dirpath) {
            _uploadImages.dirpath = _getFolder();
        }

        _uploadImages.images = _uploadImages.images || [];

        _uploadImages.images.push({
            md5: md5,
            path: _getProjectRootName(name),
            filename: _getServerName(name, md5)
        });
    };
    const _getLocalName = function (pathName, fileName, md5) {
        // local 不上传图片
        if (util.isLocal() || exports.loadImage.isWhiteList(pathName, fileName)) {
            fileName = exports.getReleaseMd5Name(exports.getReleaseName(pathName, fileName));

            return exports.addRootPath(fileName);
        }

        const name = exports.getRootName(pathName, fileName);
        return _serverPath + path.join(_getFolder(), _getServerName(name, md5));
    };
    const _getName = function (pathName, fileName) {
        var imageName = exports.getRootName(pathName, fileName);

        if (_removal[imageName]) {
            return _getLocalName(pathName, fileName, _removal[imageName]);
        } else {
            var content = fs.readFileSync(imageName);

            var md5 = util.md5(content);

            // local 添加内容
            if (util.isLocal() || exports.loadImage.isWhiteList(pathName, fileName)) {
                var imagePath = exports.getReleaseMd5Name(exports.getReleaseName(imageName), content);

                writeTask.write(imagePath, content);
            }
            // 去重，并根据MD5过滤图片上传白名单
            if (!_removal[md5] && !exports.loadImage.isWhiteList(pathName, fileName)) {
                // 添加图片数据
                _addLoadParams(imageName, md5);
            }

            _removal[imageName] = md5;
            _removal[md5] = true;

            return _getLocalName(pathName, fileName, md5);
        }
    };
    var reload = 0;

    return {
        load: function (loadImagePath, cb) {
            var _self = this;
            exec('python ~/bin/img_upload.py -j ' + loadImagePath + ' -d ' + config.projectRoot + ' -e ' + util.condition, function (error) {
                if (error) {
                    reload++;
                    if (reload <= 2) {
                        console.warn('image:' + loadImagePath);
                        _self.load(loadImagePath);
                    } else {
                        util.errorHandler('【出错信息】:' + error + '，【路径】:' + loadImagePath);
                    }
                } else {
                    cb && cb();
                    console.log('upload image success');
                }
            });
        },
        getImages: function () {
            return _uploadImages;
        },
        isWhiteList: function (pathName, fileName) {
            const imagePath = exports.getRootName(pathName, fileName);
            return _imagesWhiteList[imagePath];
        },
        getName: function (pathName, fileName) {
            // var imageName = exports.getRootName(pathName,fileName);
            if (util.isImage(fileName)) {
                return _getName(pathName, fileName);
            }

            return fileName;
        }
    };
}());

exports.plugin = (function () {
    var _plugin = {};
    const _getPluginName = function (pluginName) {
        var dirName = path.dirname(pluginName);
        var extName = path.extname(pluginName);
        var baseName = path.basename(pluginName, extName);
        // string plugin
        if (util.isHtml(pluginName)) {
            dirName += '/' + config.pluginHtmlDir;
        }
        // CSS插件
        if (util.isCss(pluginName)) {
            dirName += '/' + config.pluginCssDir;
        }

        const pluginPath = path.join(dirName, baseName);

        return pluginPath + '.js';
    };
    const _amd = function (pluginName, content) {
        const releaseName = exports.getReleaseName(pluginName);
        const ast = esprima.parse('define(' + JSON.stringify(releaseName) + ', function(require){return ' + JSON.stringify(content) + '})');

        return ast;
    };
    const _getPluginContent = function (pluginName) {
        var content = '';

        //获取插件内容 模板内容读取文件
        if (util.isHtml(pluginName)) {
            content = exports.readFileSync(pluginName);
            if (content) {
                content = htmlRenameTask.htmlRename(pluginName, content);
            }
        }

        if (util.isCss(pluginName)) {
            content = util.cachePlugin.get(pluginName);
        }

        return content;
    };
    const _addPlugin = function (pluginName) {
        const dp = _getPluginContent(pluginName);
        const pn = _getPluginName(pluginName);
        if (util.total === 0) {
            // 增量依赖文件，只做文件路径替换，依赖文件内容不重写，用'1'标记
            if (!_plugin[pn]) {
                _plugin[pn] = dp ? _amd(pn, dp) : '1';
            }
            return pn;
        }
        
        // 全量
        if (dp) {
            if (!_plugin[pn]) {
                _plugin[pn] = _amd(pn, dp);
            }
            return pn;
        }
        // 异常
        console.trace();
        console.error('plugin:', {
            name: pn,
            fileName: pluginName,
            content: dp
        });
        return false;
    };

    return {
        /*
         * 添加插件到临时对象当中
         *
         * @pluginName插件名称
         *
         * 返回插件的pathName
         * */
        set: function (pluginName) {
            // console.log(pluginName);
            return _addPlugin(pluginName);
        },
        get: function () {
            return _plugin;
        },
        isPlugin: function (fileName) {
            if (util.isHtml(fileName) || util.isCss(fileName)) {
                const pn = this.getPlugName(fileName);
                return _plugin[pn];
            }
            return false;
        },
        getPlugName: function (fileName) {
            return _getPluginName(fileName);
        }
    };
}());


exports.readFileSync = function (pathName) {
    // 读取HTML文件，替换内容
    return fs.readFileSync(pathName, 'utf-8');
};

exports.readFile = function (pathName, done) {
    // 读取HTML文件，替换内容
    fs.readFile(pathName, 'utf-8', function (err, string) {
        if (err) {
            console.error('readFile:', {
                error: err
            });
        } else {
            done && done(string);
        }
    });
};