var path = require("path");
var fs = require("fs");
var childProcess = require('child_process');

exports.port = 8081;
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

// 监听进程相关操作
var workers = {};
var rebornNumber = 0;

function createProcessWork() {
    var worker = childProcess.fork('_build/react/tool/watcher.js');
    // 监听异常
    worker.on('message', function (message) {
        console.log(rebornNumber);
        if (message.act === 'suicide') {
            if (rebornNumber < 5) {
                createProcessWork();
                rebornNumber++;
            }
        }
    });

    worker.on('exit', function () {
        // 进程退出并销毁
        console.log('Worker' + worker.pid + 'exited.');
        delete workers[worker.pid];
    });

    workers[worker.pid] = worker;
    console.log('Create worker' + worker.pid);
}

createProcessWork();

exports.getLocations = function () {
    return [
        {
            location: /^\/dist\/loader.js/,
            handler: file('./lib/requirejs/require.debug.js')
        },
        {
            location: /^\/pcweb/,
            handler: file(__dirname + '/dist/index.html')
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
