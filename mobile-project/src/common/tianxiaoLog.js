/**
 * @file 天校系统相关页面的日志
 * @author peilonghui
 */

define(function (require) {

    var store = require('common/store');
    var service = require('common/service');

    window.script_data = window.script_data || {};
    window.page_data = window.page_data || {};

    // test url
    var LOG_URL = 'http://lxp-push.dev-tx.genshuixue.com/monitor.do?';

    var PAGE_TYPE = {
        blackboard: 2,
        courseList: 3,
        videoCourse: 33,
        classCourse: 32,
        microCourse: 34,
        one2oneCourse: 31,
        teacherList: 4,
        teacherDetail: 41,
        video: 5,
        album: 6,
        campus: 7,
        comment: 8,
        intro: 9,
        index: 1
    };

    function doSend(orgNumber, userData, pageType, typeNumber) {
        var isTianxiaoLog = store.get('isTianxiaoOrg') || window.script_data.isTianxiaoOrg;
        var userNumber = userData.number;
        var userType = userData.type;

        if (+userType !== 2) {
            return;
        }

        if (isTianxiaoLog && userNumber) {
            var image = new Image();
            var logUrl = LOG_URL
                + 'userNumber=' + userNumber
                + '&orgNumber=' + orgNumber
                + '&pageType=' + PAGE_TYPE[pageType];

           if (typeNumber) {
               logUrl += ('&typeNumber=' + typeNumber);
           }
           image.src = logUrl;
        }
    }

    return {
        send: function(orgNumber, pageType, typeNumber) {
            return;
            var env = store.get('env');

            if (!env && window.page_data.env) {
                env = window.page_data.env.type;
            }

            if (env === 'beta') {
                LOG_URL = 'http://beta-crm-jigou.genshuixue.com/monitor.do?';
            }
            else if (env === 'www') {
                LOG_URL = 'https://crm-jigou.genshuixue.com/monitor.do?';
            }
            else if (env === 'test') {
                LOG_URL = 'http://test-crm-m.ctest.baijiahulian.com/monitor.do?'
            }

            if (!orgNumber) {
                return;
            }

            var userData = store.get('user') || window.page_data.user;

            if (!userData) {
                service.getBasicInfo()
                    .done(function (response) {
                        if (response && (+response.code === 0)) {
                            userData = response.data.user_data;
                            if (userData && userData.number) {
                                doSend(orgNumber, userData, pageType, typeNumber);
                            }
                        }
                    });
            }
            else if (userData.number) {
                doSend(orgNumber, userData, pageType, typeNumber);
            }

        }
    };


});