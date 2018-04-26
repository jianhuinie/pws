/**
 * @file 构建入口
 * @date 15/11/27.
 */
const path = require('path');
const exec = require('child_process').exec;
const fs = require('fs');

const other = require('./builder/other');
const font = require('./builder/font');
const css = require('./builder/css');
const js = require('./builder/js');
const tpl = require('./builder/tpl');
const html = require('./builder/html');
const image = require('./builder/image');
const util = require('./tool/util');
const config = require('./config');
const biz = require('./tool/biz');

// 全量构建，删除output目录，全部重新生成
function delOutput(cb) {
    const baseUrl = config.dir;
    exec('rm -rf ' + path.join(baseUrl, '/output'), function (e) {
        if (e) {
            throw new Error(e);
        } else {
            cb && cb();
        }
    });
}

function buildAll(changeFiles) {
    /*
     * 执行步骤
     * other 输出，如.swf
     *
     * font 输出
     *
     * CSS
     * 1.编译，并将编译后的内容，添加树结点,图片替换
     * 2.压缩，生成MD5，生成配置文件｛原文件：MD5号｝写文件到发布目录
     *
     * JS
     * 2.重命名：require文件地址替换，require.getImage图片地址替换,AMD
     * 3.require插件实现，将插件转为JS文件，依赖于CSS编译后的树结点content，AMD
     * 4.树结点与插件的esprima压缩，转为JS原文件，生成MD5，生成配置文件｛原文件：MD5号｝写文件到发布目录
     *
     * HTML
     * 4.根据CSS配置替换CSS,根据JS配置文件替换JS，写文件到发布目录
     *
     * 5.IMAGE
     * 根据image配置上传图片，
     *
     * */
    const allBhk = util.benchmark('Total:');

    const otherBhk = util.benchmark('other:');
    other.build();
    otherBhk();

    const fontBhk = util.benchmark('font:');
    font.build();
    fontBhk();
    if (changeFiles) {
        tpl.build(changeFiles);
    }

    const cssBhk = util.benchmark('css:');
    css.build(changeFiles, function () {
        cssBhk();

        console.log('js begin:');
        const jsBhk = util.benchmark('js total:');
        js.build(changeFiles);
        jsBhk();

        const htmlBhk = util.benchmark('html:');
        html.build(changeFiles);
        htmlBhk();

        const imgBhk = util.benchmark('image:');
        image.build(function () {
            imgBhk();
            allBhk();
        });
    });
}

exports.build = function () {
    console.log('静态资源开始构建：');
    try {
        if (util.total === 0) {
            var manifestPath = biz.getReleaseName(config.manifest);
            try {
                var content = fs.readFileSync(path.join(config['public'], manifestPath), 'utf-8');
                util.cache.set('manifest', config.manifest, content);
            } catch (e) {
                console.error('增量构建没有获取到manifest信息，读取路径：' + manifestPath);
                throw new Error('增量构建没有获取到manifest信息，读取路径：' + manifestPath);
            }
            util.getChangeFiles(function (changeFiles) {
                if (changeFiles && !changeFiles.delFiles.length && !changeFiles.uptFiles.length) {
                    console.log('增量构建，没有检测到任何文件变化!');
                    return;
                }
                delOutput(function () {
                    buildAll(changeFiles);
                });
            }, function (err) {
                throw new Error(err);
            });
        } else {
            // 全量
            delOutput(buildAll);
        }
    } catch (e) {
        util.errorHandler(e);
    }
};