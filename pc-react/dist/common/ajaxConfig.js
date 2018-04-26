define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var ajaxConfig = {
        GET_USER_INFO: '/pc/user/get',
        LOGOUT: '/logoutpc',
        COURSE: {
            ONLINE: '/pc/course/online',
            OFFLINE: '/pc/course/offline'
        },
        SERIES: {
            ONLINE: '/pc/series/online',
            OFFLINE: '/pc/series/offline'
        }
    };
    exports.default = ajaxConfig;
});