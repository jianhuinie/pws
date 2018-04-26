/**
 * @file 配置
 * @author musicode
 */

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');

var html2js = require('html2js');

var ignore = require('gulp-ignore');
var Resource = require('gulp-resource');

var tool = require('./tool');

// 项目下的所有 src 目录都会转成 asset，不限于 project/src
exports.srcName = 'src';
exports.assetName = 'asset';

// 因为 project 目录和 output 目录的处理都需要，因此声明一个变量
exports.viewName = 'view';
exports.depName = 'dep';

/**
 * 项目根目录
 *
 * @type {string}
 */
exports.projectDir = path.dirname(__dirname);

/**
 * 模板目录
 *
 * @type {string}
 */
exports.viewDir = path.join(exports.projectDir, exports.viewName);

/**
 * 项目源码目录
 *
 * @type {string}
 */
exports.srcDir = path.join(exports.projectDir, exports.srcName);

/**
 * 项目依赖库目录
 *
 * @type {string}
 */
exports.depDir = path.join(exports.projectDir, exports.depName);

/**
 * 项目编译输出目录
 *
 * @type {string}
 */
exports.outputDir = path.join(exports.projectDir, 'output');

/**
 * project/src/ 编译输出目录
 *
 * @type {string}
 */
exports.assetDir = path.join(exports.outputDir, exports.assetName);

/**
 * 静态资源哈希表
 *
 * @type {string}
 */
exports.hashMapFile = path.join(exports.projectDir, 'hash.json');

exports.hashMap = tool.readHashMapFile(exports.hashMapFile) || { };

/**
 * 静态资源依赖表
 *
 * @type {string}
 */
exports.dependencyMapFile = path.join(exports.projectDir, 'dependency.json');

exports.dependencyMap = tool.readDependencyMapFile(exports.dependencyMapFile) || { };

/**
 * 是否要 build src 目录
 *
 * @type {boolean}
 */
exports.buildSrc = true;

/**
 * 是否要 build dep 目录
 *
 * @type {boolean}
 */
exports.buildDep = true;

/**
 * 是否为上线版本
 *
 * @type {boolean}
 */
exports.release = true;

/**
 * 需要 build 的 html 文件
 *
 * @type {Array}
 */
exports.htmlFiles = [

];

if (exports.buildSrc) {
    exports.htmlFiles.push(
        path.join(exports.viewDir, '**/*.html'),
        path.join(exports.viewDir, '**/*.phtml')
    );
}

/**
 * 需要 build 的 less 文件
 *
 * @type {Array}
 */
exports.lessFiles = [

];

if (exports.buildSrc) {
   exports.lessFiles.push(
       path.join(exports.srcDir, 'css/common/component/wechatQrcode.less')
   );
}

/**
 * 需要 build 的 stylus 文件
 *
 * @type {Array}
 */
exports.stylusFiles = [

];

if (exports.buildSrc) {
   exports.stylusFiles.push(
       path.join(exports.srcDir, 'userCenter/**/*.styl')
   );
}


/**
 * 需要 build 的 css 文件
 *
 * @type {Array}
 */
exports.cssFiles = [

];

if (exports.buildDep) {
    exports.cssFiles.push(
        path.join(exports.depDir, '**/*.css')
    );
}

/**
 * 需要 build 的非 amd js 文件
 *
 * @type {Array}
 */
exports.jsFiles = [

];

if (exports.buildSrc) {
   exports.jsFiles.push(
       path.join(exports.projectDir, 'tool/cert.js'),
       path.join(exports.srcDir, 'video/swfobject.js'),
       path.join(exports.srcDir, 'video/history/history.js')
   );
}

if (exports.buildDep) {
    exports.jsFiles.push(
        path.join(exports.depDir, 'base/**/*.js'),
        path.join(exports.depDir, 'echarts/**/*.js'),
        path.join(exports.depDir, 'im/**/*.js'),
        path.join(exports.depDir, 'ueditor/**/*.js'),
        path.join(exports.depDir, 'webAnalysis/**/*.js')
    );
}

/**
 * 需要 build 的 amd js 文件
 *
 * @type {Array}
 */
exports.amdFiles = [

];

if (exports.buildSrc) {
    exports.amdFiles.push(
       path.join(exports.srcDir, 'common/combine/*.js'),
       path.join(exports.srcDir, 'common/component/SwitchRoleDialog.js'),
       path.join(exports.srcDir, 'common/component/VideoDialog.js'),
       path.join(exports.srcDir, 'common/ad/ad.js'),
       path.join(exports.srcDir, 'common/store.js'),
       path.join(exports.srcDir, 'common/service.js')
    );
}

if (exports.buildDep) {
    exports.amdFiles.push(
       path.join(exports.depDir, 'audioPlayer/**/*.js'),
       path.join(exports.depDir, 'cobble/**/*.js'),
       path.join(exports.depDir, 'image-crop/**/*.js'),
       path.join(exports.depDir, 'moment/**/*.js'),
       path.join(exports.depDir, 'TextClipboard/**/*.js'),
       path.join(exports.depDir, 'underscore/**/*.js')
    );
}

/**
 * 需要 build 的图片
 *
 * @type {Array}
 */
exports.imageFiles = [

];

var imageFiles = [
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.png',
    '**/*.gif',
    '**/*.cur',
    '**/*.ico'
];

if (exports.buildSrc) {
    imageFiles.forEach(function (file) {
        exports.imageFiles.push(
            path.join(exports.srcDir, file)
        );
    });
}

if (exports.buildDep) {
    imageFiles.forEach(function (file) {
        exports.imageFiles.push(
            path.join(exports.depDir, file)
        );
    });
}

/**
 * 其他的静态资源，比如 swf txt pdf word
 *
 * @type {Array}
 */
exports.otherFiles = [

];

var otherFiles = [
    '**/*.html',
    '**/*.tpl',
    '**/*.swf',
    '**/*.txt',
    '**/*.flv',
    '**/*.mp4',
    '**/*.mp3',
    '**/*.pdf',
    '**/*.json',
    '**/*.eot',
    '**/*.svg',
    '**/*.ttf',
    '**/*.woff',
    '**/genshuixue_news.xml',
    '**/genshuixue_news_gbk.xml'
];

if (exports.buildSrc) {
    otherFiles.forEach(function (file) {
        exports.otherFiles.push(
            path.join(exports.srcDir, file)
        );
    });
}

if (exports.buildDep) {
    otherFiles.forEach(function (file) {
        exports.otherFiles.push(
            path.join(exports.depDir, file)
        );
    });
}

/**
 * 需要过滤的文件
 *
 * @type {Array}
 */
exports.filterFiles = [
    '**/test/**/*',
    '**/testcases/**/*',
    '**/doc/**/*',
    '**/demo/**/*',
    '**/demo-files/**/*',
    '**/*.as',
    '**/*.psd',
    'edp-*'
];

/**
 * 文件是否需要 build
 *
 * @return {Function}
 */
exports.filter = function () {

    return ignore.exclude(exports.filterFiles);

};

/**
 * 转换路径，把 src 替换成 asset，把 less styl 替换成 css
 *
 * @param {string} filePath
 * @return {string}
 */
exports.replaceResource = (function () {

    // 避免把 /path/srcabc/ 替换成 /path/assetabc/
    var pattern = new RegExp(
        '\b?' + exports.srcName + '\b?',
        'g'
    );

    var extMap = {
        '.less': '.css',
        '.styl': '.css'
    };

    return function (filePath) {

        filePath = filePath.replace(
            pattern,
            function ($0) {
                return $0.replace(exports.srcName, exports.assetName);
            }
        );

        var fileExt = path.extname(filePath).toLowerCase();
        if (extMap[fileExt]) {
            filePath = tool.removeExtname(filePath) + extMap[fileExt];
        }

        return filePath;

    };

})();

/**
 * 转换 amd loader 配置
 *
 * @param {Object} data
 * @return {Object}
 */
exports.replaceRequireConfig = function (data) {

    var config = { };

    for (var key in data) {
        config[key] = data[key];
    }

    if (data.baseUrl) {
        config.baseUrl = exports.replaceResource(data.baseUrl);
    }

    var paths = data.paths;
    if (paths) {

        config.paths = { };

        var pathValue;
        for (var key in paths) {

            if (paths[key].indexOf('http') === 0) {
                pathValue = paths[key];
            }
            else {
                pathValue = exports.replaceResource(paths[key]);

                var resourceProcessor = exports.resourceProcessor;
                if (resourceProcessor) {

                    var hash = resourceProcessor.getFileHash(
                        path.join(exports.assetDir, pathValue) + '.js',
                        resourceProcessor.hashMap,
                        resourceProcessor.dependencyMap
                    );

                    if (hash) {
                        pathValue = tool.appendFileHash(pathValue, hash);
                    }
                }
            }

            config.paths[key] = pathValue;

        }
    }

    var packages = data.packages;
    if (packages) {

        config.packages = [ ];

        packages.forEach(function (pkg) {
            config.packages.push({
                name: pkg.name,
                main: pkg.main,
                location: pkg.location.indexOf('http') === 0
                        ? pkg.location
                        : exports.replaceResource(pkg.location)
            })
        });

    }

    return config;

};

/**
 * 静态资源处理器
 */
exports.resourceProcessor = (function () {

    // 错误的文件路径
    var errorFilePattern = /[$ {}]/;

    /*
     * amd 打包策略
     *
     * 格式如下
     *
     * {
     *    // 全局要合并的模块
     *    include: [
     *        'modudle'
     *    ],
     *    // 全局不合并的模块
     *    exclude: [
     *        'module'
     *    ],
     *    // 模块默认按自己的依赖进行合并
     *    // 只有配置成 false 才表示不需要合并
     *    // 每个模块还可以配置 include 和 exclude，优先级比全局 include exclude 更高
     *    modules: {
     *        module: {
     *            include: [ ],
     *            exclude: [ ]
     *        }
     *    }
     * }
     */

    var amdConfig = {
        paths: { },
        packages: [
            {
                name: 'cobble',
                location: '../dep/cobble/0.3.28/src',
                main: 'main'
            },
            {
                name: 'moment',
                location: '../dep/moment/2.7.0/src',
                main: 'moment'
            },
            {
                name: 'imageCrop',
                location: '../dep/image-crop/0.0.3/src',
                main: 'imageCrop'
            },
            {
                name: 'underscore',
                location: '../dep/underscore/1.6.0/src',
                main: 'underscore'
            },
            {
                name: 'audioPlayer',
                location: '../dep/audioPlayer/0.0.4/src',
                main: 'audioPlayer'
            },
            {
                name: 'TextClipboard',
                location: '../dep/TextClipboard/0.0.3/src',
                main: 'TextClipboard'
            },
            {
                name: 'echarts',
                location: '../dep/echarts/2.1.10/src',
                main: 'echarts'
            },
            {
                name: 'cc',
                location: '../dep/cc/1.0.0/src',
                main: 'main'
            },
            {
                name: 'custom',
                location: '../dep/cc/1.0.0/custom'
            },
            {
                name: 'SwfStore',
                location: '../dep/SwfStore/0.0.1/src',
                main: 'SwfStore'
            }
        ]
    };

    var depAmdConfig = {
        baseUrl: exports.srcDir,
        paths: amdConfig.paths,
        packages: amdConfig.packages
    };

    var srcAmdConfig = {
        baseUrl: exports.srcDir,
        paths: amdConfig.paths,
        packages: amdConfig.packages,
        combine: {

            exclude: [
                'echarts',
                'echarts/**/*',
                'cobble',
                'cobble/**/*',
                'moment',
                'image-crop',
                'audioPlayer',
                'underscore',
                'TextClipboard',

                'common/store',
                'common/service'
            ]

        },
        fileReader: {
            styl: function (filePath) {

                if (inDirectory(exports.srcDir, filePath)) {
                    filePath = tool.toOutputFiles([ filePath ])[0];
                    filePath = tool.removeExtname(filePath) + '.css';
                }

                var resourceId = exports.resourceProcessor.filePathToResourceId(filePath, assetAmdConfig);

                // 去掉扩展名，变成模块 ID
                resourceId = tool.removeExtname(resourceId);

                // content 转为字符串拼接
                var code = html2js(
                    fs.readFileSync(filePath, 'utf-8'),
                    {
                        mode: 'compress'
                    }
                );

                return 'define("' + resourceId + '_css", [], function () { return ' + code + '});';

            },
            html: function (filePath) {

                var resourceId = exports.resourceProcessor.filePathToResourceId(filePath, srcAmdConfig);

                // 去掉扩展名，变成模块 ID
                resourceId = tool.removeExtname(resourceId);

                // content 转为字符串拼接
                var code = html2js(
                    fs.readFileSync(filePath, 'utf-8'),
                    {
                        mode: 'compress'
                    }
                );
                return 'define("' + resourceId + '_html", [], function () { return ' + code + '});';

            },
            less: function () { },
            tpl: function () { }
        },
        replaceRequireResource: function (resource, absolute) {

            var result;

            var id = resource.id;

            var extName = path.extname(id);

            switch (extName.toLowerCase()) {

                case '.less':
                case '.styl':
                case '.css':
                    result = { };

                    if (resource.plugin === 'text') {
                        result.id = tool.removeExtname(id)+'_css';
                        result.plugin = '';
                    }
                    else {
                        result.id = tool.removeExtname(id)+'_css' + '.css';
                    }

                    break;
                case '.html':
                    if (resource.plugin === 'html') {
                        result = {};
                        result.id = tool.removeExtname(id)+'_html';
                        result.plugin = '';
                    }
                    break;
            }

            return result;

        },
        replaceRequireConfig: function (data) {
            return exports.replaceRequireConfig(data);
        }
    };

    var assetAmdConfig = exports.replaceRequireConfig(srcAmdConfig);
    assetAmdConfig.baseUrl = exports.assetDir;
    assetAmdConfig.combine = { };

    var inDirectory = function (dir, file) {
        return path.relative(dir, file).indexOf('..') < 0;
    };

    /**
     * 根据文件路径获取不同的 amd config
     *
     * @inner
     * @param {Object} file
     * @return {Object}
     */
    var getAmdConfig = function (file) {

        var amdConfig;

        if (inDirectory(exports.outputDir, file.path)) {
            amdConfig = assetAmdConfig;
        }
        else {
            if (inDirectory(exports.depDir, file.path)) {
                amdConfig = depAmdConfig;
            }
            else {
                amdConfig = srcAmdConfig;
            }
        }

        amdConfig.minify = exports.release;

        return amdConfig;

    };

    var instance = new Resource({
        getAmdConfig: getAmdConfig,
        renameFile: function (file, hash) {

            var filePath = file.path;

            if (hash) {
                filePath = tool.appendFileHash(filePath, hash);
            }

            return exports.replaceResource(filePath);

        },
        renameDependency: function (file, fileHash, dependency, dependencyHash) {

            var filePath = dependency.raw;

            if (dependencyHash) {

                // 只有不带 md5 的 amd 文件不需要改依赖
                // 比如 main.js 使用时会写 require(['main'])
                // 如果改成 define('main_md5', factory)，实际加载不到模块

                if (fileHash && path.extname(file.path).toLowerCase() === '.js') {}
                else {
                    filePath = tool.appendFileHash(filePath, dependencyHash);
                }

            }

            return exports.replaceResource(filePath);

        },
        filterDependency: function (file, dependency) {
            if (errorFilePattern.test(dependency.absolute)) {
                if (dependency.raw.indexOf('src') >= 0) {
                    console.log('[INFO][error dependency]');
                    console.log(dependency);
                    console.log('')
                }
                return true;
            }
        },
        correctDependency: function (file, dependency) {

            var absolute = dependency.absolute;
            var extname = path.extname(file.path).toLowerCase();

            var inSrc = inDirectory(exports.srcDir, file.path);
            var inOutput;

            if (!inSrc) {
                inOutput = inDirectory(exports.outputDir, file.path);
            }

            if (inSrc && extname === '.styl') {

                absolute = path.join(
                    exports.srcDir,
                    dependency.raw
                );

            }
            else {

                var rootDir = inOutput
                            ? exports.outputDir
                            : exports.projectDir;

                var srcDir = inOutput
                           ? exports.assetDir
                           : exports.srcDir;

                var customPrefixs = {
                    '{{ $static_origin }}/': rootDir,
                    '/src/': srcDir
                };

                for (var prefix in customPrefixs) {
                    if (absolute.indexOf(prefix) === 0) {
                        absolute = path.join(
                            customPrefixs[prefix],
                            absolute.substr(prefix.length)
                        );
                        break;
                    }
                }
            }

            if (inOutput) {
                absolute = exports.replaceResource(absolute);
            }

            dependency.absolute = absolute;

        },
        htmlRules: [
            {
                // 匹配如下格式：
                // {{ $amd_modules = 'xx' }}
                // {{ $amd_modules = [ 'xx', 'yy' ] }}
                // {{ $amd_modules[] = 'xx' }}
                pattern: /\{\{ \$(?:amd_modules|amd_more|static_more|script_path)(?:\[\])?\s*=\s*([^}]+) \}\}/g,
                match: function (result, file) {

                    var terms = result.substring(3, result.length - 3).split('=');
                    var literal = terms[1].trim();

                    if (literal.indexOf('$') === 0) {
                        return;
                    }

                    return instance.parseAmdDependencies(
                        file,
                        result,
                        literal
                    );
                }
            },
            {
                // 匹配如下格式
                // require('xx'
                // require(['xx']
                pattern: /require\s*?\(\s*?(\[?[^{}\]]+\]?)/g,
                match: function (result, file) {
                    return instance.parseAmdDependencies(
                        file,
                        result,
                        result.replace(/require\s*?\(/, '')
                    );
                }
            },
            {
                // 自定义替换格式
                pattern: /\$custom_path\s*=\s*['"][^'"]+['"]/g,
                match: function (result) {
                    var terms = result.split(/['"]/);
                    if (terms.length === 3) {
                        return terms[1];
                    }
                }
            }
        ]
    });

    return instance;

})();

/**
 * 根据相对路径输出文件，返回是目录路径，表示文件要输出到此目录下
 *
 * @param {Object} file
 * @return {string}
 */
exports.dest = function (file) {

    var projectDir = exports.projectDir;
    var outputDir = exports.outputDir;

    var relativePath = path.relative(outputDir, file.path);

    var baseDir = relativePath.indexOf('..') >= 0
                ? projectDir
                : outputDir;

    relativePath = exports.replaceResource(relativePath);

    file.base = baseDir;
    file.path = path.join(
        outputDir,
        relativePath
    );

    return outputDir;

};
