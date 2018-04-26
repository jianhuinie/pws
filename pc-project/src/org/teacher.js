/**
 * @file 机构教师
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    var searchlist = require('common/component/SearchList');
    var store = require('common/store');
    var tianxiaoLog = require('common/tianxiaoLog');

    exports.init = function () {

        base.init();
        searchlist.init();
        tianxiaoLog.send(store.get('orgnumber'), 'teacherList');

    };
});