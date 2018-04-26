define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var config = {
        PATHS: {
            DETAIL: '/preferredOneOnOne/detail',
            CHECKMOBILE: '/auth/check_mobile_ajax',
            SENDSMS: '/sms/send',
            SUBMIT: '/preferredOneOnOne/submit'
        },
        MOBILEREG: /^1\d{10}$/
    };
    exports.default = config;
});