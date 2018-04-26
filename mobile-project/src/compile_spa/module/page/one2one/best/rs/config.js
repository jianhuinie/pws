define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var config = {
        PATHS: {
            SIGN: '/one-on-one-course/teacher-signning',
            SIGNED_SUBJECTS_RATE: '/one-on-one-course/teacher-sign-detail',
            SIGN_STATUS: '/one-on-one-course/sign-status',
            RECRUIT_STATUS: '/one-on-one-course/teacher-recruit-status'
        },
        SIGN_STATUS: {
            NO_VERIFY: 0,
            NO_SIGN_WITH_SUCCESS_VERIFY: 1,
            IS_SIGN: 2,
            NO_RECRUIT: 3
        },
        RECRUIT_STATUS: {
            NO_RECRUIT: 0,
            IS_VERIFING: 1,
            VERIFY_REFUSE: 2,
            VERIFY_SUCCESS: 3,
            NO_VALID: 4
        }
    };
    exports.default = config;
});