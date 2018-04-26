define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var config = {
        PATHS: {
            GETTPL: '/cms-liudan/index',
            GETSUBJECT: '/cms-liudan/get-subject-list',
            SUBMIT: '/cms-liudan/submit'
        },
        MOBILEREG: /^1\d{10}$/
    };
    exports.default = config;
});