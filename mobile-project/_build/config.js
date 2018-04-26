var path = require('path');

exports.dir = __dirname;

exports.src = '/src';

exports.s2m = 'resources';

exports.lib = 'lib';

// text!**和css_loader!**引用的css，统一以js的方式存在原目录该目录下
exports.pluginCssDir = '_pluginCss';
// text!**引用的tpl，统一以js的方式存在原目录该目录下
exports.pluginHtmlDir = '_pluginString';
// 插件前缀
exports.prePluginTxts = ['text!', 'css-loader!'];
// 项目根目录
exports.projectRoot = path.dirname(__dirname);

// html/tpl中js需要加md5值，正常存放id
// TODO: 现在好像只能处理loader，spa/index.html下本地zepto处理不了
exports.htmlMD5Js = [
    path.join(this.projectRoot, '/src/loader.js'),
    path.join(this.projectRoot, '/lib/zepto/zepto.js')
];

// 开发根目录
exports.developSrc = path.join(this.projectRoot, exports.src);
// 开发依赖目录
exports.developLib = path.join(this.projectRoot, exports.lib);
// 开发mainfest
exports.manifest = path.join(exports.developSrc, 'manifest.js');
// output tpl
exports.view = path.join(exports.projectRoot, '/output/view');
// output public静态资源，包括js/css
exports.public = path.join(exports.projectRoot, '/output/public');
// output version
exports.version = 'v2';
// require
exports.requireDir = exports.s2m;
// 发布根目录
exports.rleaseSrc = path.join(exports.version, exports.s2m);
// 发布依赖目录
exports.rleaseLib = path.join(exports.version, exports.lib);
// 上传图片配置文件地址
exports.loadImagePath = path.join(exports.version, exports.s2m, 'loadImageConfig.json');
// 上传图片服务器地址
exports.devImageServerPath = 'https://test-imgs.genshuixue.com/';

exports.betaImageServerPath = 'https://imgs.genshuixue.com/';

// localStorage前缀
exports.lsSet = {
    prefixKey: 'm'
};

// local loader config
exports.localLoaderConfig = {
    dir_path: '',
    enable_combo: false // 是否开启文件合并
};

exports.devLoaderConfig = {
    dir_path: '',
    enable_combo: true
};
// dev beta loaderConfig
exports.betaLoaderConfig = {
    dir_path: '',
    enable_combo: true
};
