/**
 * @file 机构校区
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    var baiduMap = require('common/map/baiduAddr');
    var store = require('common/store');
    var tianxiaoLog = require('common/tianxiaoLog');

    exports.init = function () {

        base.init();

        // 获取校区列表
        var areaLists = store.get('areaList');
        baiduMap.addAreaList('map', areaLists);
        tianxiaoLog.send(store.get('orgnumber'), 'campus');

    };
});