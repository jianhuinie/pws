/**
 * Created by xuzheng/hurry on 16/1/5.
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
 *          'type': 'internal', //可选,默认为internal
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

    var env = require('util/env');
    var util_object = require('util/object');
    var url = require('util/url');

    var $ = require('zepto');

    var appSchemaConfig = {
        'student': ['bjhlstudent', 'com.genshuixue.student'],
        'teacher': ['bjhlteacher', 'com.bjhl.education']
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
            } else if (document.webkitHidden || document.hidden || document.visibilityState == 'hidden') {
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
            heartbeatTimer = endTimer = null;
        }

        lastHeartbeatTime = +new Date;
        heartbeatTimer = setInterval(intervalHeartbeat, 200);
        endTimer = setTimeout(fail, 2500);
    }

    var _frame;

    function use_frame_send(url) {
        if (!_frame) {
            _frame = document.createElement("iframe");
        }
        _frame.id = "callapp_iframe_" + Date.now();
        _frame.frameborder = "0";
        _frame.style.cssText = "display:none;border:0;width:0;height:0;";
        document.body.appendChild(_frame);
        _frame.src = url;
    }

    function use_location_send(url) {
        location.href = url;
    }

    function use_click_send(url) {
        var b = document.createElement("a");
        b.setAttribute("href", url);
        b.style.display = "none";
        document.body.appendChild(b);
        var c = document.createEvent("HTMLEvents");
        c.initEvent("click", !1, !1);
        b.dispatchEvent(c);
    }

    function redirect(urlInstance, origUrl, callback) {
        var os = env.os;
        var browser = env.browser;
        var ua = navigator.userAgent;
        var hackChrome = os.isAndroid && browser.isChrome && !browser.isWebview;
        var hackSamsung = os.isAndroid && !!ua.match(/samsung/i) && os.version.gte("4.3") && os.version.lt("4.5");

        // hurry: chrome和三星亲测不需要下面代码
        // if (hackChrome || hackSamsung) {
        //     var packageName = '';
        //     var protocol = urlInstance.protocol.replace(/\:/, '');
        //     for (var key in appSchemaConfig) {
        //         if (appSchemaConfig.hasOwnProperty(key)) {
        //             if (appSchemaConfig[key][0] == protocol) {
        //                 packageName = appSchemaConfig[key][1];
        //                 break;
        //             }
        //         }
        //     }
        //     if (packageName) {
        //         urlInstance.hash = "Intent;" +
        //             "scheme=" + urlInstance.protocol.replace(":", "") + ";" +
        //             "package=" + packageName + ";" +
        //             "end";
        //         urlInstance.protocol = "intent:";
        //     }
        // }

        runHeartbeat(callback);

        $('#log').html(urlInstance.toString());

        if (os.isIOS && os.version.gte('9.0') && browser.isSafari) {
            setTimeout(function () {
                use_click_send(urlInstance.toString());
            }, 100);
        }
        // else if ("intent:" === urlInstance.protocol) {
        //     setTimeout(function () {
        //         use_location_send(urlInstance.toString());
        //     }, 100);
        // }
        else {
            // hurry: 不需要通过iframe打开，同时不能通过toString处理
            //  toString会在域名后+/
            // use_location_send(origUrl);
            use_frame_send(origUrl);
            // use_frame_send(urlInstance.toString());
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
                rst += '&' + util_object.toParamUrl(data.params);
            }
        }
        return rst;
    }


    var trying = false;
    return function (data, callback) {
        if (trying) {
            return;
        }
        var schemaUrl = '';
        switch (data.type) {
            case 'link':
                if (data.url) {
                    var dataUrl = data.url;
                    if (dataUrl.indexOf("#") > -1) {
                        dataUrl = dataUrl.replace(/#(.*?)$/, "");
                    }
                    schemaUrl = createSchemaUrl({
                        'app': data.app,
                        'action': 'url',
                        'params': {
                            'url': encodeURIComponent(dataUrl)
                        }
                    });
                }
                break;
            case 'home':
                schemaUrl = createSchemaUrl({
                    'app': data.app
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

        //后续可在schemaUrl中加入一些统计参数

        if (schemaUrl) {
            trying = true;
            redirect(url(schemaUrl), schemaUrl, function (isSuccess) {
                trying = false;
                callback && callback(isSuccess);
            });
        }
    };
});