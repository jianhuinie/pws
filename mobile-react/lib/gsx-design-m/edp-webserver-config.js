var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');

exports.port = 8088;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

// 实时监听spa下文件变化，编译到compile_spa下
// childProcess.fork('./_build/react/tool/watcher.js');

var epr = require('edp-provider-rider');
exports.stylus = epr.stylus;

// 默认配置
var stylusPlugin = epr.plugin({
    use: function (style) {
        style.define('url', epr.stylus.resolver());
    }
});

exports.getLocations = function () {
    return [
        {
            location: /^\/demo\/index/,
            handler: file(__dirname + '/demo/main/index.html')
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
        {
            location: /[.htm(l)|.js]?$/,
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
