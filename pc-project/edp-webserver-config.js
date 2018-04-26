exports.port = 8080;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

var path = require('path');

/**
 * 获取当前请求匹配的规则项，按规则定义的先后顺序匹配，先匹配到，先返回。没有匹配到，返回null。
 *
 * @param {Object} request 当前请求
 * @return {?Array}
 */
function getRouter(pathname) {
    var result;

    var rules = require('./router').rules;
    rules.forEach(function (item) {
        if (item.pattern.test(pathname)) {
            result = item;
            return false;
        }
    });

    return result;
}


exports.getLocations = function () {
    return [
        {
            location: /\/$/,
            handler: home( 'index.html' )
        },
        {
            location: /^\/redirect-local/,
            handler: redirect('redirect-target', false)
        },
        {
            location: /^\/redirect-remote/,
            handler: redirect('http://www.baidu.com', false)
        },
        {
            location: /^\/redirect-target/,
            handler: content('redirectd!')
        },
        {
            location: '/empty',
            handler: empty()
        },
        {
            location: /\.css($|\?)/,
            handler: [
                autocss()
            ]
        },
        {
            location: /\.less($|\?)/,
            handler: [
                file(),
                less()
            ]
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus({
                    paths: [
                        __dirname,
                        path.join(__dirname, 'src'),
                    ],
                    'resolve url': true
                })
            ]
        },
        {
            location: /\.php($|\?)/,
            handler: [
                php('php-cgi')
            ]
        },
        {
            location: /\.html\.js$/,
            handler: html2js()
        },
        {
            location: function (request) {
                return !!getRouter(request.pathname);
            },
            handler: [
                function (context) {
                    var request = context.request;
                    var router = getRouter(request.pathname);
                    var search = request.search || '';

                    request.url = router.path + search;

                },
                proxy('127.0.0.1', exports.port)
            ]
        },
        {
            location: '/user/card',
            handler: [
                function (context) {
                    context.status = 200;
                    context.header['Content-Type'] = 'application/json;charset=utf-8';
                    context.content = JSON.stringify(
                        {
                            code: 0,
                            data: {
                                user_name: '我是小明小明小明小明',
                                user_name_cut: '我是小明',
                                mobile: '13838383838',
                                avatar: 'http://p2.wmpic.me/article/2014/08/28/1409194540_KoSHLydi.png',
                                user_type: 0
                            }
                        }
                    );
                }
            ]
        },
        {
            location: '/user/reset_password',
            handler: [
                function (context) {
                    context.status = 200;
                    context.header['Content-Type'] = 'application/json;charset=utf-8';
                    context.content = JSON.stringify(
                        {
                            code: 1,
                            data: {
                                'verify_code': '过期啦拉拉了'
                            }
                        }
                    );
                }
            ]
        },
        {
            location: '/auth/signin_ajax',
            handler: [
                function (context) {
                    console.log(context.request);
                }
            ]
        },
        require('autoresponse')(
            'edp',
            {
                watch: true,
                logLevel: 'info'
            }
        ),
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
