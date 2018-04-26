/**
 * Created by bjhl on 15/11/27.
 */
const fs = require('fs');
const stylus = require('stylus');
const epr = require('edp-provider-rider');
const cleanCss = require('clean-css');

const util = require('../tool/util');
const biz = require('../tool/biz');
const config = require('../config');
const writeTask = require('./write');

const CleanCSS = new cleanCss();

// 默认配置
const stylusPlugin = epr.plugin({
    use: function (style) {
        style.define('url', epr.stylus.resolver());
    }
});
//编译前的长度
var compileLength = 0;
//编译后的长度
var compiledLength = 0;

exports.cssResolve = function (deps, rootPath, callback, isSync) {
    // 当前文件的反依赖树
    var deps = deps.join(); 

    // JS插件
    function isJsPlugin() {
        return deps.indexOf('.js') > -1;
    }
    // 入口文件
    function isExports() {
        return deps.indexOf('.tpl') > -1 || deps.indexOf('.html') > -1 || isJsPlugin();
    }
    // write
    function write(string) {
        if (isSync) {
            // 同步
            // console.log(2);
            var minified = CleanCSS.minify(string);
            
            if (minified && (undefined !== minified.styles)) {
                string = minified.styles;
                if (isJsPlugin()) {
                    // 添加缓冲
                    util.cachePlugin.set(rootPath, string);
                } else {
                    var saveName = biz.getReleaseMd5Name(biz.getReleaseName(rootPath), string);
                    writeTask.write(saveName, string);
                }
            }
            return;
        }
        CleanCSS.minify(string, function (errors, minified) {
            if (!errors && minified && (undefined !== minified.styles)) {
                string = minified.styles;
                if (isJsPlugin()) {
                    // 添加缓冲
                    util.cachePlugin.set(rootPath, string);
                } else {
                    var saveName = biz.getReleaseMd5Name(biz.getReleaseName(rootPath), string);
                    writeTask.write(saveName, string);
                }
            } else {
                throw new Error(errors);
            }
            compiledLength++;
            isCallback();
        });
    }
    //
    function isCallback() {
        if (compiledLength === compileLength) {
            callback && callback();
        }
    }
    //
    function replaceContent(content) {
        // image replace
        var reg = /url\(\s*?['"]?(?:[^'")]+)['"]?\s*?\)/gi;

        var string = content.replace(reg, function (result) {
            var terms = result.split(/['"]/);
            if (terms.length === 3) {
                var value = terms[1];
                if (value) {
                    if (util.isImage(value)) {
                        var imgName = biz.loadImage.getName(rootPath, value);
                        return "url('" + imgName + "')";
                    }

                    if (util.isFont(value)) {
                        var name = biz.getReleaseMd5Name(biz.getReleaseName(rootPath, value));
                        return "url('" + biz.addRootPath(name) + "')";
                    };

                    return "url('" + value + "')";
                }
            }
            return result;
        });

        write(string);
    }

    function compile(content) {
        stylus(content)
            .set('filename', rootPath)
            .set('paths', [config.developSrc])
            .use(stylusPlugin)
            .render(function (err, css) {
                if (err) {
                    throw new Error(err);
                } else {
                    replaceContent(css);
                }
            });
    }

    // 入口文件
    if (isExports()) {
        if (isSync) {
            var ctt = fs.readFileSync(rootPath, 'utf-8');
            // function (rerr, content) {
            //     if (rerr) {
            //         throw new Error(rerr);
            //     } else {
                    compile(ctt);
            //     }
            // }
            return;
        }
        compileLength++;
        fs.readFile(rootPath, 'utf-8', function (rerr, content) {
            if (rerr) {
                throw new Error(rerr);
            } else {
                compile(content);
            }
        });
    }
};