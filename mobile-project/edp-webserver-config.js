var path = require("path");
var fs = require("fs");
var childProcess = require('child_process');

exports.port = 8082;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

var epr = require('edp-provider-rider');
exports.stylus = epr.stylus;

// 默认配置
var stylusPlugin = epr.plugin({
    use: function (style) {
        style.define('url', epr.stylus.resolver());
    }
});

exports.getLocations = function () {
    // 实时监听spa下文件变化，编译到compile_spa下
    childProcess.exec('node _build/react/tool/watcher.js');
    return [
        {
            location: /^\/src\/loader.js/,
            handler: file('./lib/requirejs/require.debug.js')
        },
        {
            location: /^\/webapp/,
            handler: file(__dirname + '/src/compile_spa/index.html')
        },
        {
            location: /^\/static\/report/,
            handler: file('./mock/page.js')
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus({
                    stylus: epr.stylus,
                    use: stylusPlugin,
                    paths: [
                        __dirname + '/src/'
                    ]
                })
            ]
        },
        require('./edp-webserver/mock').init(exports.port),
        require('./edp-webserver/es6').init(),
        require('autoresponse')('edp', { watch: true, logLevel: 'info' }),
        {
            location: function (request) {
                // 修改php匹配策略，不匹配***.html?url=***.php的url--hanzh
                return /\.php($|\?)/.test(request.pathname);
            },
            handler: [
                php('php-cgi')
            ]
        },
        {
            location: /\.html\.js$/,
            handler: html2js()
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};
