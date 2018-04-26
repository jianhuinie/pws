/**
 * Created by bjhl on 15/11/27.
 */
const util = require('../tool/util');
const biz = require('../tool/biz');
const cssTask = require('./cssResolve');

var htmlRules = {
    require_to_url: /require\.toUrl\(\s*['"][^'"]+['"]\s*\)/gi,
    // href: /href=['"](?:[^'"]+\.(?:ico|css|less|styl|sass)(?:\?.+)?)['"]/gi,
    // hurry: 处理href="http://m-test-live.gsxservice.com/asset/playback/main.css" rel="stylesheet" type="text/css"
    href: /href=['"](?:[^'"]+\.(?:ico|css|less|styl|sass)(?:\?\S+)?)['"]/gi,
    src: /src=['"][^'"]+['"]/gi,
    file: /file=['"][^'"]+['"]/gi,
    page_module: /\$page_module\s*=\s*['"][^'"]+['"]/gi,
    // require: /require\s*?\(\s*?(\[?[^{}\]]+\]?)/ig,
    require: /require\s*?\(\s*?(\[?[^{}\]]+\]?)/ig,
    url: /url\(\s*?['"]?(?:[^'")]+)['"]?\s*?\)/gi,
    g_modules: /\$g_modules\[\]\s*=\s*['"][^'"]+['"]/gi
};

const rulesMatch = function (result) {
    const terms = result.split(/['"]/);

    if (terms.length === 3) {
        return terms[1];
    }

    if (/^\s*require/ig.test(result)) {
        return result
            .replace(/require\s*?\(/, '')
            .replace(/[\]\[]/ig, '');
    }
    return false;
};

const clearEmptyLabel = function (string) {
    // 删除base下的manifest标签
    const reg = /<script\s*label-del=['"]+true['"]+[^\>]*>[\s\S\n]*?<\/script>/gi;
    return string.replace(reg, '');
};

const replaceContent = function (pathName, string) {
    string = clearEmptyLabel(string);

    util.each(htmlRules, function (reg, key) {
        string = string.replace(reg, function (value) {
            var fileName = rulesMatch(value);
            if (util.isFilterPath(fileName)) {
                return value;
            };
            // if (key === 'src') {
            //     console.log(fileName);
            //     console.log(pathName);
            //     console.log(name);
            // }
            var name = fileNameFilter[key] && fileNameFilter[key](pathName, fileName);
            
            // 替换值
            if (key === 'require_to_url') {
                if (util.isLocal() || biz.loadImage.isWhiteList(pathName, fileName)) {
                    // console.log(value, fileName, name)
                    return value.replace(fileName, name);
                }

                return '"' + name + '"';
            }
            // 替换require.toUrl
            return value.replace(fileName, name);
        });
    });
    // 替换文件中的script标签
    return string;
};

var fileNameFilter = {
    html: function (pathName, fileName) {
        if (biz.isFileExist(pathName, fileName)) {
            var releaseName = biz.getReleaseName(pathName, fileName);
            if (util.isHtml(fileName)) {
                return releaseName;
            }
            // console.log(releaseName);
            var md5Name;
            // try {
                md5Name = biz.getReleaseMd5Name(releaseName);
            // } catch (e) {
            //     // 获取md5失败，重新生成
            //     if (util.total === 0 && util.isCss(fileName)) {
            //         // 增量，依赖的css无操作
            //         cssTask.cssResolve([pathName], util.fixPath(fileName), null, true);
            //         md5Name = biz.getReleaseMd5Name(releaseName);
            //     }
            // }
            
            return md5Name;
        }
        // 有可能是这种格式：{{$jssdk_origin}}/whiteboard/whiteboard.css，其他服务器地址
        return fileName;
    },
    image: function (pathName, fileName) {
        if (util.isImage(fileName)) {
            return biz.loadImage.getName(pathName, fileName);
        }

        if (util.isFont(fileName)) {
            return biz.addRootPath(biz.getReleaseMd5Name(biz.getReleaseName(pathName, fileName)));
        }
        return false;
    },
    href: function (pathName, fileName) {
        return this.html(pathName, fileName);
    },
    page_module: function (pathName, fileName) {
        return this.require(pathName, fileName);
    },
    src: function (pathName, fileName) {
        if (util.isImage(fileName)) {
            return this.image(pathName, fileName);
        }
        return biz.addRootPath(this.html(pathName, fileName));
    },
    file: function (pathName, fileName) {
        return this.html(pathName, fileName);
    },
    url: function (pathName, fileName) {
        if (util.isAbsolutePath(fileName)) {
            return fileName;
        }
        // url
        if (/^v2/.test(fileName)) {
            return fileName;
        }
        return biz.loadImage.getName(pathName, fileName);
    },
    require: function (pathName, fileName) {
        var _rname = [];
        //数组的形式要去掉字符串
        fileName.split(',').forEach(function (name) {
            var requireName = biz.getRequireName(pathName, name);
            //判断是否为字符串
            if (name.match(/['"]/)) {
                requireName = '"' + requireName + '"';
            }

            _rname.push(requireName);
        });

        return _rname.join(',');
    },
    g_modules: function (pathName, fileName) {
        return this.require(pathName, fileName);
    },
    require_to_url: function (pathName, fileName) {
        return this.image(pathName, fileName);
    }
};
//require replace name
exports.htmlRename = function (pathName, content) {
    return replaceContent(pathName, content);
};