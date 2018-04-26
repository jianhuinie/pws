/**
 * Created by xuzheng on 15/12/25.
 */
define(function (require) {
    'use strict';

    var util_base = require('util/base');
    var util_function = require('util/function');
    var Jockey = require('jockey');
    var observer = require('common/mvc/observer');
    var appConfig = require('app_config');
    var urlUtil = require('util/url_v2');
    var env = require('util/env');
    var openApp = require('common/app_wakeup');

    var exports = {};
    var ua = navigator.userAgent;

    var UA_TEACHER = 'GenShuiXue-teacher';
    var UA_STUDENT = 'GenShuiXue-student';
    var UA_ORG = 'GenShuiXue-institution';
    var UA_JINYOU = 'JinYouXueTang';
    var UA_WX = 'MicroMessenger';

    var getJockeyConfig = util_function.lazyConst(function () {
        if (!isApp()) {
            return {};
        }
        var filter = {
            'jockey': true
        };
        if (isStudentApp()) {
            filter['app'] = 'student';
        } else if (isTeacherApp()) {
            filter['app'] = 'teacher';
        } else if (isOrgApp()) {
            filter['app'] = 'org';
        } else if (isKaoYanApp()) {
            filter['app'] = 'kaoyan';
        }
        if (env.os.isIOS) {
            filter['ios'] = env.app.version.toString();
        } else if (env.os.isAndroid) {
            filter['android'] = env.app.version.toString();
        }
        return appConfig.get(filter);
    });

    function createToken() {
        return 'm_' + new Date().getTime().toString(36);
    }

    function createActionData(actionName, data, callback) {
        var token = createToken();

        var listener = observer.addListener(callbackObj, 'cb_' + token, function (data) {
            observer.removeListener(listener);
            listener = null;
            if (util_base.isFunction(callback)) {
                try {
                    callback(data);
                } catch (ex) {
                }
            }
        });

        return {
            name: actionName,
            data: data,
            token: token
        };
    }


    var callbackObj = {};
    //监听app的回调事件
    Jockey.on('callback', function (action) {
        if (action) {
            var token = action.token;
            observer.trigger(callbackObj, 'cb_' + token, action.data);
        }
    });

    var actionObj = {};
    //监听app的主动调用
    Jockey.on('action', function (action) {
        if (action) {
            var actionName = action.name;
            if (observer.exist(actionObj, actionName)) {
                observer.trigger(actionObj, actionName, action);
            } else {
                Jockey.send('callback', {
                    'code': -1,
                    'token': action.token
                });
            }
        }
    });

    function send(actionName, actionData, callback) {
        if (!actionName || !support(actionName)) {
            return false;
        }
        var config = getJockeyConfig();
        if (config[actionName].old) {
            Jockey.send(actionName, actionData);
        } else {
            var eventData = createActionData(actionName, actionData, callback);
            Jockey.send('action', eventData);
        }
    }

    function on(actionName, callback) {
        if (!actionName || !exports.support(actionName)) {
            return false;
        }
        var config = getJockeyConfig();
        if (config[actionName].old) {
            Jockey.on(actionName, callback);
        } else {
            return observer.addListener(actionObj, actionName, function (action) {
                var token = action.token;
                var data = action.data;
                var rst;
                var isSendCallback = false;
                var done = function (callbackData) {
                    if (isSendCallback) {
                        return;
                    }
                    isSendCallback = true;
                    var cbData = {
                        'code': 0,
                        'token': token,
                        'data': null
                    };
                    if (arguments.length > 0) {
                        cbData['data'] = callbackData
                    }
                    Jockey.send('callback', cbData);
                };
                if (util_base.isFunction(callback)) {
                    rst = callback(data, done);
                }
                if (rst !== false) {
                    done();
                }
            });
        }
    }


    function support(actionName) {
        var config = getJockeyConfig();
        return actionName in config;
    }

    function isApp() {
        return isStudentApp() || isTeacherApp() || isOrgApp() || isKaoYanApp();
    }

    function appVersion() {
        if (isApp()) {
            return env.app.version.val;
        }
        return '';

    }

    function isStudentApp() {
        return env.app.name == 'student';
    }

    function isTeacherApp() {
        return env.app.name == 'teacher';
    }

    function isKaoYanApp() {
        return env.app.name == "kaoyan";
    }

    function isOrgApp() {
        return env.app.name == 'org';
    }

    function version2Number(strVersion) {
        if (!strVersion) {
            return 0;
        }
        var arr = strVersion.split('.');
        var num = 0;
        num += Number(arr[0]) * 1E4;
        num += Number(arr[1]) * 1E2;
        num += Number(arr[2]);
        return isNaN(num) ? 0 : num;
    }

    var openNewWindow = function (url) {
        if (support('toNewWindow')) {
            if (isStudentApp()) {
                if (url.indexOf('video_course/getcourseshowdetail') > -1) {
                    var query = urlUtil.parseQuery(url.substr(url.indexOf('?')));
                    send('toVideoCourseDetail', {
                        'number': query.number + '',
                        'index': '0'
                    });
                    return;
                }
                // hurry: toNewWindow app不再维护，urlSchemeRoute处理云端录播
                send('urlSchemeRoute', { url: url });

            } else {
                var params = {
                    url: url,
                    web_url: url
                };
                send('toNewWindow', params);
            }
        }
    };

    exports.imChat = function (param) {
        var data = {
            'c_id': param.c_id + '',
            'c_role': param.c_role + ''
        };
        if (param.group_id) {
            data['group_id'] = param.group_id + '';
        }
        Jockey.send('IM', data);
    };

    exports.isJinYou = util_function.lazyConst(function () {
        return -1 != ua.indexOf(UA_JINYOU);
    });

    exports.isWeixin = util_function.lazyConst(function () {
        return -1 != ua.indexOf(UA_WX);
    });

    exports.makePhoneCall = function (tel) {

        //tel = +tel;
        //

        /*var arr = tel.match(/\d/g);
         tel = arr.join('');*/

        //if (exports.isTeacherApp() || exports.isOrgApp()) {
        //    Jockey.send(
        //        'toMakePhoneCall',
        //        {
        //            phone_number: tel
        //        }
        //    );
        //}
        //else {
        //    Jockey.send(
        //        'MakePhoneCall',
        //        {
        //            tel: tel,
        //            phone_number: tel
        //        }
        //    );
        //}
        tel = tel + '';
        var isTeacherApp = exports.isTeacherApp();
        var currentVersionNumber = exports.version2Number(exports.getAppVersion());
        var supportVersionNumber = exports.version2Number('2.7.0');
        if (isTeacherApp && (currentVersionNumber < supportVersionNumber)) {
            if (tel.charAt(0) == '0') {
                alert('抱歉，该学生手机号为国际手机号码，暂不支持在平台上拨打。您可以通过手机直接拨打手机号【' + tel + '】联系学生。')
                return;
            } else {
                tel = Number(tel);
            }
        }
        Jockey.send(
            'toMakePhoneCall', {
                phone_number: tel
            }
        );

    };

    exports.getAppVersion = util_function.lazyConst(function () {
        var str = '';
        if (exports.isStudentApp()) {
            str = UA_STUDENT;
        } else if (exports.isTeacherApp()) {
            str = UA_TEACHER;
        } else if (exports.isOrgApp()) {
            str = UA_ORG;
        } else if (exports.isJinYou()) {
            str = UA_JINYOU;
        }
        if (str) {
            var arr = new RegExp(str + '-([0-9]{1,}[\.0-9]{0,})').exec(ua);
            return arr[1] || '';
        } else {
            return '';
        }
    });

    /**
     * 获取用户信息, 会注册一个事件，尽量不要重复调用
     */
    exports.getUserInfo = function (callback) {
        Jockey.off('setUserInfo');
        Jockey.on('setUserInfo', function (response) {
            callback(response);
        });
        Jockey.send('getUserInfo');
    };

    /**
     * 设置页面标题
     */
    exports.setPageTitle = function (title) {
        document.title = title;
        if (exports.isApp()) {
            Jockey.send('setPageTitle', {
                title: title
            });
        }
    };

    exports.send = send;
    exports.on = on;
    exports.support = support;

    exports.isApp = isApp;
    exports.appVersion = appVersion;
    exports.isStudentApp = isStudentApp;
    exports.isTeacherApp = isTeacherApp;
    exports.isOrgApp = isOrgApp;

    exports.openNewWindow = openNewWindow;
    exports.toNewOnlineWindow = function (url) {
        if (support('toNewOnlineWindow')) {
            send('toNewOnlineWindow', {
                url: url,
                web_url: url
            });
        }
    };
    exports.version2Number = version2Number;
    exports.isKaoYanApp = isKaoYanApp;
    /**
     * 打开指定schema
     */
    exports.urlSchemeRoute = function (data) {
        Jockey.send(
            'urlSchemeRoute',
            data
        );
    };

    /**
     * 使用urlSchemeRoute唤起app，唤起失败打开下载页
     * @param {string} 要唤起的url，不传默认取当前url
     * @param {string} type: t-老师，s-学生
     */
    exports.wakeUpApp =  function (url, type) {
        var appTypes = {
            s: 'bjhlstudent',
            t: 'bjhlteacher'
        };
        type = type || 's';
        if (!isApp() && !env.thirdapp.isWeixin && !env.thirdapp.isQQ) {
            var schemaUrl = appTypes[type] + '://o.c?a=url&url=' + encodeURIComponent(url || location.href);
            openApp({
                type: 'internal',
                url: schemaUrl
            }, function (isSuccess) {
                if (!isSuccess) {
                    location.href = 'https://m.genshuixue.com/app/dw?t=' + type + '&ct=';
                }
            });
            
        }

        // openApp({
        // 	type: 'internal',
        // 	url: decodeURIComponent(page_data.target)
        // }, function (isSuc) {
        //     if (!isSuc) {
        //         var type = page_data.type || 'student';
        //         location.href =  (page_data.openError && decodeURIComponent(page_data.openError))
        //             || 'https://m.genshuixue.com/app/?target=' + type;
        //     }
        // });
    };

    /**
     * 跳转app视频课
     * @param  {[object]} data 数据
     * @property {number} [number] 课程id
     * @property {number} [index] 后端没有用到，不知道是啥意思啊，目测可以不传
     */
    exports.toVideoCourse = function (data) {
        Jockey.send('toVideoCourseDetail', data);
    };
    // hurry: 该方法已经废弃，统一使用common/openAppWindow
    // exports.init = function () {

    // };

    /*
    * 判断是什么环境，安卓还是ios
    */
    exports.getPlatForm = function () {
        return env.os.isIOS ? 'ios' : 'android';
    };

    /**
     * 跳转到第三方支付页面
     * @param  {string} purchase_id 订单编号
     * @return
     */
    exports.toThirdPartyPayment = function (purchase_id, course_type) {
        var param = {
            purchase_id: purchase_id + ''
        };
        if (course_type) {
            param.course_type = course_type;
            if (course_type == 3 && exports.getPlatForm() == 'ios') {
                /* 如果是视频课而且当前版本比较低，提示升级 */
                var currentVersionNumber = exports.version2Number(exports.getAppVersion());
                var supportVersionNumber = exports.version2Number('3.0.0');
                if (currentVersionNumber < supportVersionNumber) {
                    alert('您当前的版本还不支持视频课购买哦！');
                    return;
                }
            }
        }
        Jockey.send('toThirdPartyPayment', param);
    };

    return exports;
});
