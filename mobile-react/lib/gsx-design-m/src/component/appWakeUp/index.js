/**
 * Created by gsx on 16/1/5.
 *
 *  该方法用于在手机H5浏览器中唤起app
 *
 * 注:  回调函数在2500后触发,返回true或false表示是否成功唤起app, 因浏览器差异或唤起事件不确定性,有可能不准,仅供参考
 *      由于某些浏览器唤起APP后不会执行setTimeout,所以会等到返回页面后触发
 *
 *
 * 场景一: 调用指定action
 *      openApp({
 *          'app': 'student',
 *          'type': 'internal', // 可选,默认为internal
 *          'action': 'actionName',
 *          'params':{}
 *      });
 *
 * 场景二: 在app中打开url
 *      openApp({
 *          'app': 'student',
 *          'type': 'link',
 *          'url': 'https://m.genshuixue.com/'
 *      });
 *
 * 场景三: 打开app主页
 *      openApp({
 *          'app': 'student',
 *          'type': 'home'
 *      });
 *
 * 场景四: 调用指定的schema url(用户短信分享)
 *      openApp({
 *          'type': 'internal',
 *          'url': 'bjhlteacher://o.c/'
 *      });
 */
define(function (require) {
    'use strict';

    var env = require('../../util/env');
    var utilObject = require('../../util/object');

    var appSchemaConfig = {
        student: ['bjhlstudent', 'com.genshuixue.student'],
        teacher: ['bjhlteacher', 'com.bjhl.education']
    };

    function runHeartbeat(callback) {
        var maxHeartbeatIntervalTime = 0;
        var lastHeartbeatTime;
        var heartbeatTimer;
        var endTimer;

        function intervalHeartbeat() {
            var now = +new Date();
            maxHeartbeatIntervalTime = Math.max(now - lastHeartbeatTime, maxHeartbeatIntervalTime);
            lastHeartbeatTime = now;
            if (maxHeartbeatIntervalTime > 600) {
                success();
            } else if (document.webkitHidden || document.hidden || document.visibilityState === 'hidden') {
                success();
            }
        }

        function success() {
            clearTimes();
            callback(true);
        }

        function fail() {
            clearTimes();
            callback(false);
        }

        function clearTimes() {
            clearTimeout(endTimer);
            clearInterval(heartbeatTimer);
            heartbeatTimer = null;
            endTimer = null;
        }

        lastHeartbeatTime = +new Date();
        heartbeatTimer = setInterval(intervalHeartbeat, 200);
        endTimer = setTimeout(fail, 2500);
    }

    var _frame;

    function useFrameSend(url) {
        if (!_frame) {
            _frame = document.createElement('iframe');
        }
        _frame.id = 'callapp_iframe_' + Date.now();
        _frame.frameborder = '0';
        _frame.style.cssText = 'display:none;border:0;width:0;height:0;';
        document.body.appendChild(_frame);
        _frame.src = url;
    }

    function useLocationSend(url) {
        location.href = url;
    }

    function useClickSend(url) {
        var b = document.createElement('a');
        b.setAttribute('href', url);
        b.style.display = 'none';
        document.body.appendChild(b);
        var c = document.createEvent('HTMLEvents');
        c.initEvent('click', !1, !1);
        b.dispatchEvent(c);
    }

    function redirect(urlInstance, origUrl, callback) {
        var os = env.os;
        var browser = env.browser;
        var ua = navigator.userAgent;
        var hackChrome = os.isAndroid && browser.isChrome && !browser.isWebview;
        var hackSamsung = os.isAndroid && !!ua.match(/samsung/i) && os.version.gte('4.3') && os.version.lt('4.5');

        // hurry: chrome和三星亲测不需要下面代码
        if (hackChrome || hackSamsung) {
            var packageName = '';
            var protocol = urlInstance.protocol.replace(/\:/, '');
            for (var key in appSchemaConfig) {
                if (appSchemaConfig.hasOwnProperty(key)) {
                    if (appSchemaConfig[key][0] == protocol) {
                        packageName = appSchemaConfig[key][1];
                        break;
                    }
                }
            }
            if (packageName) {
                urlInstance.hash = ''
                    + 'Intent;'
                    + 'scheme=' + urlInstance.protocol.replace(':', '') + ';'
                    + 'package=' + packageName + ';'
                    + 'end';
                urlInstance.protocol = 'intent:';
            }
        }

        runHeartbeat(callback);

        $('#log').html(urlInstance.toString());

        if (os.isIOS && os.version.gte('9.0') && browser.isSafari) {
            setTimeout(function () {
                useClickSend(urlInstance.toString());
            }, 100);
        } else if ('intent:' === urlInstance.protocol) {
            //  toString会在域名后+/
            urlInstance.pathname = '';
            setTimeout(function () {
                useLocationSend(urlInstance.toString());
            }, 100);
        } else {
            // hurry: 不需要通过iframe打开，同时不能通过toString处理
            //  toString会在域名后+/
            // useLocationSend(origUrl);
            useFrameSend(origUrl);
            // useFrameSend(urlInstance.toString());
        }
    }

    function createSchemaUrl(data) {
        var rst = '';
        var protocol = appSchemaConfig[data.app];
        if (protocol) {
            rst = protocol[0] + '://o.c';
            if (data.action) {
                rst += '?a=' + data.action;
            }
            if (data.params) {
                rst += '&' + utilObject.toParamUrl(data.params);
            }
        }
        return rst;
    }


    var trying = false;
     /**
     * 下拉刷新
     * @param  {Object} data 参数
     * @param  {Object<string, Array>} data.appSchemaConfig，key为对应的app名称，用于data.app，value为schema和package例如：
     *          {
     *              student: ['bjhlstudent', 'com.genshuixue.student'],
     *              teacher: ['bjhlteacher', 'com.bjhl.education']
     *          };
     * @param  {function} data.app app名称，和data.appSchemaConfig的key一致
     * @param  {boolean} data.type 是否滑到底部自动刷新
     * @param  {boolean} data.action 是否滑到底部自动刷新
     * @param  {boolean} data.params 是否滑到底部自动刷新
     * @param  {boolean} data.url 是否滑到底部自动刷新
     */
    return function (data, callback) {
        appSchemaConfig = data.appSchemaConfig;
        if (trying) {
            return;
        }
        // if (env.os.isIPhone 
        //     && env.os.version.gte('9.0')) {
        //     // && data.url.indexOf('bjhlstudent') > -1) {
        //     // iphone直接跳转新链接（http）
        //     var hostP = location.host.substr(0, 1);
        //     var hostObject = {
        //         t: 'test',
        //         b: 'beta',
        //         m: 'www'
        //     };
        //     var hostName = hostObject[hostP] ? hostObject[hostP] : 'test';
        //     var urlSchameLink = data.url;
        //     var linkParams = '';
        //     if (data.url.indexOf('bjhlstudent') > -1) {
        //         if (urlSchameLink.split('?')[1]) {
        //             linkParams = '?' + urlSchameLink.split('?')[1];
        //         } else {
        //             linkParams = '';
        //         }
        //     } else {
        //         linkParams = '?a=url&url=' + urlSchameLink;
        //     }
        //     var linkUrl = 'http://' + hostName + '.genshuixue.com/ios-open-app/student' + linkParams;
        //     location.href = linkUrl;
        //     return;
        // }
        var schemaUrl = '';
        switch (data.type) {
            case 'link':
                if (data.url) {
                    var dataUrl = data.url;
                    if (dataUrl.indexOf('#') > -1) {
                        dataUrl = dataUrl.replace(/#(.*?)$/, '');
                    }
                    schemaUrl = createSchemaUrl({
                        app: data.app,
                        action: 'url',
                        params: {
                            url: encodeURIComponent(dataUrl)
                        }
                    });
                }
                break;
            case 'home':
                schemaUrl = createSchemaUrl({
                    app: data.app
                });
                break;
            case 'internal':
            default:
                if (data.action) {
                    schemaUrl = createSchemaUrl(data);
                } else if (data.url) {
                    schemaUrl = data.url;
                }
                break;
        }

        // 后续可在schemaUrl中加入一些统计参数
        if (schemaUrl) {
            trying = true;
            redirect(url(schemaUrl), schemaUrl, function (isSuccess) {
                trying = false;
                callback && callback(isSuccess);
            });
        }
    };
});