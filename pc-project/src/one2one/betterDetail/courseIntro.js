/**
 * @file 优选一对一课程详情页 － 授课信息
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var baiduMap = require('common/map/baiduAddr');


    exports.init = function () {

        // 获取校区列表
        var address = store.get('address');

        if (address) {
            var areaList = [];
            areaList.push({
                'name': address.area_path_str,
                'detail': address.area_path_str,
                'longitude': address.lng,
                'latitude': address.lat
            });

            baiduMap.addAreaList('map', areaList);
        }


    };

});