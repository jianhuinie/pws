/**
 * @file 机构基础js
 * @author zhangshaolong
 */
define(function (require, exports) {

    'use strict';

    var nav = require('./nav');
    var profile = require('./profile');

    exports.init = function () {

        nav.init();
        profile.init();

    };
});