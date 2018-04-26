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
    var appWakeUp = require('../../../component/appWakeUp/index');

    return function (options, callback) {
        // ios Universal Links支持
        if (env.os.isIPhone && env.os.version.gte('9.0')) {
            // && data.url.indexOf('bjhlstudent') > -1) {
            // iphone直接跳转新链接（http）
            var hostP = location.host.substr(0, 1);
            var hostObject = {
                t: 'test',
                b: 'beta',
                m: 'www'
            };
            var hostName = hostObject[hostP] ? hostObject[hostP] : 'test';
            var urlSchameLink = options.url;
            var linkParams = '';
            if (options.url.indexOf('bjhlstudent') > -1) {
                if (urlSchameLink.split('?')[1]) {
                    linkParams = '?' + urlSchameLink.split('?')[1];
                } else {
                    linkParams = '';
                }
            } else {
                linkParams = '?a=url&url=' + urlSchameLink;
            }
            var linkUrl = 'http://' + hostName + '.genshuixue.com/ios-open-app/student' + linkParams;
            location.href = linkUrl;
            return;
        }
        options.appSchemaConfig = {
            student: ['bjhlstudent', 'com.genshuixue.student'],
            teacher: ['bjhlteacher', 'com.bjhl.education']
        };
        appWakeUp(options, callback);
    };
});