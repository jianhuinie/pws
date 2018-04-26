/**
 * Created by bjhl on 15/11/27.
 */
const path = require('path');
const crypto = require('crypto');
// const Promise = require('promise');
const argv = require('yargs').argv;
const exec = require('child_process').exec;

const config = require('../config');

exports.condition = argv.s;
exports.total = argv.t;
exports.delta = argv.d;
exports.preCommitId = argv.p;
exports.lastCommitId = argv.l;

exports.isDev = function () {
    return this.condition === 'test';
};

exports.isBeta = function () {
    return this.condition === 'beta';
};

exports.isLocal = function () {
    return !this.isDev() && !this.isBeta();
};

exports.isDomainPath = function (fileName) {
    return /^{{[\s\S]*?}}\/[\w\d\_\-]+/ig.test(fileName);
};

exports.isAbsolutePath = function (fileName) {
    return /^http(s)?/.test(fileName);
};

exports.getDomainPath = function (releaseName) {
    if (this.isDomainPath(releaseName)) {
        return releaseName.match(/^{{[\s\S]*?}}/ig)[0];
    }
    return '';
};

//监听
exports.listerner = (function () {
    var _obj = {};
    return {
        add: function (evt, lisEvent) {
            _obj[evt] = '';

            Object.defineProperty(_obj, evt, {
                set: function (value) {
                    lisEvent && lisEvent(value);
                },
                get: function (value) {
                    return value;
                }
            });
        },
        trigger: function (evt, value) {
            _obj[evt] = value;
        }
    };
}());

// 获取文件类型
exports.getFileType = (function () {
    const _createRegExp = function (arr) {
        return new RegExp(arr.join('|'), 'ig');
    };

    return function (fileName) {
        fileName = exports.getFilterFileName(fileName);

        var extName = path.extname(fileName);
        var fileType = extName || 'js';

        var cssReg = _createRegExp(['.less', '.css', '.styl']);
        if (cssReg.test(extName)) {
            fileType = 'css';
        }

        var imageReg = _createRegExp(['.png', '.jpg', '.jpeg', '.gif']);
        if (imageReg.test(extName)) {
            fileType = 'image';
        }

        var fontReg = _createRegExp(['.eot', '.woff', '.ttf', '.svg']);
        if (fontReg.test(extName)) {
            fileType = 'font';
        }

        if (extName == '.js') {
            fileType = 'js';
        }

        var stringRegExp = _createRegExp(['.tpl', '.html']);
        if (stringRegExp.test(extName)) {
            fileType = 'html';
        }

        return fileType;
    };
}());

exports.isImage = function (fileName) {
    return this.getFileType(fileName) === 'image';
};

exports.isHtml = function (fileName) {
    return this.getFileType(fileName) === 'html';
};

exports.isJs = function (fileName) {
    return this.getFileType(fileName) === 'js';
};

exports.isCss = function (fileName) {
    return this.getFileType(fileName) === 'css';
};

exports.isFont = function (fileName) {
    return this.getFileType(fileName) === 'font';
};

exports.isOther = function (fileName) {
    return !this.isFont(fileName)
        && !this.isImage(fileName)
        && !this.isJs(fileName)
        && !this.isCss(fileName)
        && !this.isHtml(fileName);
};
// 添加缓存
exports.cache = {
    _cache: {},
    set: function (property, obt, value) {
        this.create(property);

        if (typeof obt === 'string') {
            obt = exports.getFilterFileName(obt);

            if (value) {
                this._cache[property][obt] = value;
            } else {
                this._cache[property] = obt;
            }
        } else {
            exports.each(obt, function (val, key) {
                exports.cache.set(property, key, val);
            });
        }
    },
    create: function (property, key) {
        if (!this._cache[property]) {
            this._cache[property] = {};
        }
        if (key && !this._cache[property][key]) {
            this._cache[property][key] = {};
        }
    },
    get: function (property, key) {
        var pro = this._cache[property];

        if (pro && key) {
            key = exports.getFilterFileName(key);
            return pro[key];
        }
        return pro;
    },
    getCache: function () {
        return this._cache;
    }
};
// css 插件
exports.cachePlugin = {
    set: function (key, value) {
        if (!value) {
            throw new Error('【' + key + '】文件不允许为空！');
        }
        exports.cache.set('cssPlugin', key, value);
    },
    get: function (key) {
        return exports.cache.get('cssPlugin', key);
    }
};

// md5
exports.cacheMd5 = {
    // 根据releaseName和内容生成MD5的缓存对象
    set: function (releaseName, content) {
        var fileType = exports.getFileType(releaseName);

        exports.cache.set(fileType, releaseName, exports.md5(content));
    },
    get: function (property, key) {
        return exports.cache.get(property, key);
    }
};
// md5
exports.cacheImage = {
    // 根据releaseName和内容生成MD5的缓存对象
    set: function (key, value) {
        exports.cache.set('image', key, value);
    },
    get: function (key) {
        exports.cache.get('image', key);
    }
};

// 根据内容生成发布后的MD5,并生成原文件与MD5映射表
exports.md5 = function (content) {
    var md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('hex').slice(0, 10);
};

exports.each = function (target, handler) {
    if (Object.prototype.toString.call(target) === '[object Array]') {
        for (var i = 0, l = target.length; i < l; i++) {
            handler(target[i], i);
        }
    } else {
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                handler && handler(target[key], key);
            }
        }
    }
};

// 判断是否以http,https,{{,development开始文件内容
exports.isFilterPath = function (fileName) {
    // 静态资源不过滤
    if (exports.isDomainPath(fileName)) {
        return false;
    }

    var regExp = new RegExp(('^(' + config.developSrc + '|' + config.developLib + '|data:|,|http|https|{{)'), "i");

    return regExp.test(fileName);
};
// TODO: 该文件作用可以去掉，同时处理builder/js.js下filterFile方法 
// 判断开发路径pathName如果在fileter数组当中
exports.fileFilter = (function () {
    var _filter = [
        '/src/manifest.js',
        '/src/loader.js',
        '/lib/requirejs/plugin_text.js'
    ];
    const _rootFilter = function () {
        var temp = [];
        exports.each(_filter, function (value, index) {
            temp.push(path.join(config.projectRoot, value));
        });
        return temp;
    };
    var _filterList = [];

    return {
        is: function (fileName, content) {
            var _regExp = new RegExp('^' + _rootFilter().join('|') + '$', 'ig');

            if (_regExp.test(fileName)) {
                if (content) {
                    _filterList.push({
                        fileName: fileName,
                        content: content
                    });
                }
                return true;
            }
            return false;
        },
        get: function () {
            return _filterList;
        }
    };
}());
/*
 * 拼接文件名,如params,domain
 *
 * fileName: 原文件名
 * rootName: fileName的硬盘路径
 * */
exports.getCombineFileName = function (releaseName, fileName) {
    var domainPath = this.getDomainPath(fileName);

    if (domainPath) {
        releaseName = path.join(domainPath, releaseName);
    }

    var params = fileName.replace(fileName.split(/[\?\#]/)[0], '');

    return releaseName + params;
};
/*
* 过滤domain,params，返回fileName
* */
exports.getFilterFileName = function (fileName) {
    if (!fileName) {
        return fileName;
    }

    if (exports.isFilterPath(fileName)) {
        return fileName;
    }

    return fileName.replace(/((\?|\#)[\s\S]*|{{[\s\S]*?}}\/)/ig, '');
};
//
exports.addRequireExtName = function (fileName) {
    // 插件
    if (!exports.isHtml(fileName) && !exports.isImage(fileName) && !exports.isCss(fileName)) {
        return fileName + '.js';
    }
    return fileName;
};

// 修复HTML,CSS当中的路径
exports.fixPath = function (fileName, pathName) {
    fileName = exports.getFilterFileName(fileName);
    var projectDir = config.projectRoot;
    // 过滤依赖
    if (exports.isFilterPath(fileName)) {
        return fileName;
    }

    // todo
    // if(!fileName.match("/") && pathName) {
    //    fileName = "./"+fileName;
    // }
    // 相对路径./ ../
    if (/^\.+/ig.test(fileName) && pathName) {
        var basePath = path.dirname(pathName);

        return path.join(basePath, fileName);
    }

    var prefix = {
        '/src': projectDir,
        '/lib': projectDir
    };
    // 获取文件根路径,并添加"/";
    var fstart = '/' + fileName.replace(/^\//ig, '').split('/')[0];

    // 是否在配置文件当中，如果不存在，将所有路径添加根目录src
    var pfs = prefix[fstart];

    if (pfs) {
        return path.join(pfs, fileName);
    }

    return path.join(config.developSrc, fileName);
};

/**
 * 计算耗时
 */
exports.benchmark = function (title) {
    var me = this;
    var start = Date.now();
    return function () {
        var end = Date.now();
        var range = end - start;
        var endTxt;
        if (range > 1000) {
            endTxt = (range / 1000).toFixed(2) + 's';
        } else {
            endTxt = range + 'ms';
        }
        console.log(me.padMiddle(title, endTxt, 30));
    };
};

/**
 * 给指定长度字符串中间加入padString
 * @params {string} beginTxt 开始字符串，默认
 * @params {string} bendTxt  结尾字符串
 * @params {number} targetLength 字符串总长度
 * @params {string} beginTxt 开始字符串
 * @return {string} 处理后的字符串
 */
exports.padMiddle = function (beginTxt, endTxt, targetLength, padString) {
    beginTxt = beginTxt === undefined ? '' : beginTxt;
    endTxt = endTxt === undefined ? '' : endTxt;
    padString = padString === undefined ? ' ' : padString;
    if (endTxt.length + beginTxt.length >= targetLength) {
        return beginTxt + endTxt;
    }
    var padLen = [];
    padLen.length = targetLength - endTxt.length - beginTxt.length + 1;
    return beginTxt + padLen.join(padString) + endTxt;
};

/**
 * 给指定长度字符串中间加入padString
 * @params {string} target 要处理字符串，默认
 * @params {number} targetLength 字符串总长度
 * @params {string} padString 开始字符串
 * @return {string} 处理后的字符串
 */
exports.padStart = function (target, targetLength, padString) {
    target = target === undefined ? '' : target;
    padString = padString === undefined ? ' ' : padString;
    if (target.length >= targetLength) {
        return target;
    }
    var padLen = [];
    padLen.length = targetLength - target.length + 1;
    return padLen.join(padString) + target;
};

exports.getChangeFiles = function (done, fail) {
    // var promise = new Promise(function (resolve, reject) {
        const baseUrl = process.cwd();
        // var gitCmd = 'git diff --name-status HEAD~1 HEAD~0';
        // if (exports.isDev() || exports.isBeta()) {
        //     var preCommitId = exports.padStart(exports.preCommitId + '', 7, 0);
        //     var lastCommitId = exports.padStart(exports.lastCommitId + '', 7, 0);
        //     gitCmd = 'git diff --name-status ' + preCommitId + ' ' + lastCommitId;
        // }
        var preCommitId = exports.preCommitId || 'HEAD~1';
        var lastCommitId = exports.lastCommitId || 'HEAD~0';
        var gitCmd = 'git diff --name-status ' + preCommitId + ' ' + lastCommitId;
        exec(gitCmd, function (error, data) {
            if (error) {
                console.error(error);
                fail(error);
            } else {
                var changeFiles = {
                    delFiles: [],
                    uptFiles: []
                };
                if (data) {
                    // replace(/M\t/g, '')
                    var files = data.split('\n');
                    files.forEach(function (file) {
                        var statusName = file.split('\t');
                        if (statusName.length === 2) {
                            switch (statusName[0]) {
                                // 修改 & 新增
                                case 'M':
                                case 'A':
                                    changeFiles.uptFiles.push(statusName[1]);
                                    break;
                                case 'D':
                                    changeFiles.delFiles.push(statusName[1]);
                                    break;
                            }
                        }
                    });
                    // 固定添加该文件，用于处理文件内部的dep和version
                    if (changeFiles.uptFiles.indexOf('/src/manifest.js') === -1) {
                        changeFiles.uptFiles.push('/src/manifest.js');
                    }
                    changeFiles.uptFiles = changeFiles.uptFiles.map(function (item) {
                        return path.join(baseUrl, item);
                    });
                    changeFiles.delFiles = changeFiles.delFiles.map(function (item) {
                        return path.join(baseUrl, item);
                    });
                }
                done(changeFiles);
            }
        });
    // });
    // return function () {
    //     return promise;
    // };
};

// 异常统一处理函数
exports.errorHandler = function (e) {
    if (exports.total === 0 && exports.isDev()) {
        // 增量构建，test环境，回滚到上一个commit，避免下次构建错误
        // var commitId = exports.padStart(exports.preCommitId, 7, 0);
        var commitId = exports.preCommitId;
        exec('git reset --hard ' + commitId, function (error) {
            if (error) {
                console.error(error);
                console.error('回滚到' + commitId + '失败，请手动执行！');
            }
        });
    }
    console.error('【出错信息】:' + e);
    console.trace();
    process.exit(1);
};