/**
 * @file 构建配置信息
 * @author hurry
 * @date 2017/05/27
 * 说明：
 *      1、目前只支持amd，不支持umd，所以所有文件都需要修改为amd格式，define开头
 */
const path = require('path');
const fs = require('fs');

var srcDir = 'dist';

// 获取多页面的每个入口文件，用于配置中的entry
const getEntryFiles = function (src) {
    var filesPath = [];
    const fileReg = /(.+)\.htm[l]?$/ig;
    function getFileName(src) {
        var files = fs.readdirSync(src);
        if (files) {
            files.forEach(function (fileName) {
                const _src = path.resolve(src, fileName);
                const st = fs.statSync(_src);
                if (st) {
                    // 判断是否为文件
                    if (st.isFile() && _src.match(fileReg)) {
                        filesPath.push(_src);
                    } else if (st.isDirectory()) {
                        // 如果是目录则递归调用自身
                        getFileName(_src);
                    }
                }
            });
        }
    }
    getFileName(path.join(__dirname, srcDir));

    return filesPath;
};

module.exports = {
    // 全量构建，不启用多进程处理
    isCloseMultProcess: true,
    // html模板的扩展名，默认html
    htmlExt: ['.tpl', '.html'],
    // localStorage配置信息
    lsSet: {
        // localStorage的key前缀，用于同一域名多个项目，通过prefixKey匹配，避免重复删除
        // 例如：m1~v2/lib/zepto/zepto.debug.js
        // 默认: 'm'
        prefixKey: 'm'
    },
    // 生成关系树配置项
    depMap: {
        // require.config所在js文件
        requireConfigJs: 'dist/manifest.js',
        /**
         * 入口文件
         * @param {?Array<String>|String} 支持多页和单页，不设置默认去devDir.src下所有.htm[l]文件
         */
        entryFile: getEntryFiles(path.join(__dirname, srcDir)),
        /**
         * 模板中js依赖规则，默认支持href/src/require
         * @params {Array<Object>} 
         * @params {RegExp|String} propName 要处理的属性
         *      如果是String系统处理为new RegExp(pattern + '\s*=\s*['"][^'"]+['"]', 'ig')
         *      有通配符的，需要自行添加\，例如$script_path，这里需要配置成\$script_path
         * @params {?Function} match 正则表达式匹配结果处理，默认处理js
         */
        htmlRules: [
            {
                pattern: /file=['"][^'"]+['"]/gi,
                match: function (result) {
                    const terms = result.split(/['"]/);
                    if (terms.length === 3) {
                        var fileName = terms[1];

                        if (!fileName.match('/')) {
                            fileName = path.join(srcDir, fileName);
                        }
                        return fileName;
                    }
                    return false;
                }
            },
            {
                pattern: /require\.toUrl\(\s*['"][^'"]+['"]\s*\)/gi,
                match: function (result) {
                    const terms = result.split(/['"]/);
                    if (terms.length === 3) {
                        return terms[1];
                    }
                    return false;
                }
            },
            {
                pattern: '\\$page_module'
            }, 
            {
                pattern: '\\$g_modules\\[\\]'
            },
            {
                pattern: /require\(\[(['"](?:(dist)(?:\S+)?)['"])\]/gi,
                splitPattern: /[\[\]]/,
                replacePattern: /['"]/g
                // match: function (result) {
                //     const terms = result.split(/[\[\]]/);
                //     if (terms.length === 3) {
                //         const filePath = terms[1].replace(/['"]/g, '');
                //         if (dep.isDepExist(filePath)) {
                //             return rule.parseAmdDependencies(
                //                 filePath,
                //                 amdConfig
                //             );
                //         }
                //         return util.addRequireExtName(filePath);
                //     }
                //     return false;
                // }
            }
        ]
    },
    // 对插件的处理，
    plugin: {
        /**
         * @params {String|Array} String push到原来的默认值中，Array 直接覆盖原来的默认值
         * 处理插件loader名称，例如： require('text!a.tpl); pluginNames: ['text']
         * 默认值：['text', 'css']，text用于处理tpl/html，css用于处理css
         */
        loaderNames: ['text', 'css-loader']
        // // css插件输出目录，默认_pluginCss
        // cssOutputDir: '_pluginCss',
        // // html插件输出目录，默认_pluginString
        // htmlOutputDir: '_pluginString'
        // /**
        //  * @params {String|Array} String push到原来的默认值中，Array 直接覆盖原来的默认值
        //  * 处理模板扩展名，例如： require('text!a.tpl); pluginNames: ['.tpl']
        //  * 默认值：['.tpl']
        //  */
        // tplExt: [],
    },
    // 正常js的路径都是id值，通过映射表获取md5值，部分入口js需要把md5值放到path中
    // html/tpl中js需要加md5值，正常存放id
    jsMD5InPath: [
        '/src/loader.js',
        '/lib/zepto/zepto.js'
    ],
    // 不做处理的js，例如部分js只在dev环境有效
    excludeJs: [
        '/src/manifest.js',
        '/lib/requirejs/plugin_text.js'
    ],
    // 开发根目录
    devDir: {
        // 默认src
        // 1、view为空，存放js/css/html
        // 2、view非空，存放js/css
        // src: srcDir,
        js: srcDir,
        // 第三方库地址
        lib: 'lib'
    },
    // 发布目录，不设置和devDir相同
    releaseDir: {
        // 根目录，默认output
        root: 'output',
        // js输出目录
        js: {
            // 根目录
            root: 'public',
            // 业务js存放目录
            src: '/pcweb/asset',
            // 第三方js存放目录
            lib: '/pcweb/lib'
        },
        // html输出目录
        html: {
            // 根目录
            root: 'view',
            src: ''
        }
        // // src/lib存放的公共目录，基于root
        // jsDir: 'public',
        // // 基于jsDir
        // // 不赋值，默认devDir.src
        // src: 'asset',
        // // 不赋值，默认devDir.lib
        // lib: 'dep',
        // // 不赋值，默认devDir.view
        // view: 'view',
        // js静态资源域名，默认取当前域名
        // jsCDNHost: ''
    },
    // html中引用文件重命名
    htmlRenameRules: {
        // 通过require引用的js文件，一般用于smarty模板
        requireRules: {
            page_module: /\$page_module\s*=\s*['"][^'"]+['"]/gi,
            module_name: /module_name\s*=\s*['"][^'"]+['"]/gi,
            // script_path: /\$script_path\s*=\s*['"][^'"]+['"]/gi,
            g_modules: /\$g_modules\[\]\s*=\s*['"][^'"]+['"]/gi
        }
    }
};