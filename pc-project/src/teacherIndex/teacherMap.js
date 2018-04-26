/**
 * @file 老师地址地图
 * @author wuhongjie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var baiduMap = require('common/map/baidu');

    exports.init = function () {

        if ($('#map')[0]) {
            baiduMap.modifiedAddress('map', store.get('lng'), store.get('lat'));

            var container = $('#teacher-residence');

            container
                .on('click', '.amplify', function () {
                    container.addClass('max');
                    baiduMap.modifiedAddress('map', store.get('lng'), store.get('lat'));
                })
                .on('click', '.reduce', function () {
                    container.removeClass('max');
                    baiduMap.modifiedAddress('map', store.get('lng'), store.get('lat'));
                });
        }

    };

});