/**
 * @file 机构黑板报列表页
 * @author zhangliyuan
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    var tianxiaoLog = require('common/tianxiaoLog');
    var store = require('common/store');

    exports.init = function () {

        base.init();
        
        tianxiaoLog.send(store.get('orgnumber'), 'blackboard');


    };
});