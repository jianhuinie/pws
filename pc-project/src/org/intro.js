/**
 * @file 机构介绍
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    var store = require('common/store');
    var tianxiaoLog = require('common/tianxiaoLog');


    exports.init = function () {

        base.init();
        tianxiaoLog.send(store.get('orgnumber'), 'intro');

    };
});