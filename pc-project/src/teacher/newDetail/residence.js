/**
 * @file 老师常用教学地点
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var baiduMap = require('common/map/baidu');

    exports.init = function () {

        // baiduMap.search('map', store.get('teacherAddress'));
        if ($('#map')[0]) {
            //baiduMap.reAddress('map', store.get('lng'), store.get('lat'));
            baiduMap.modifiedAddress('map', store.get('lng'), store.get('lat'));

            var container = $('#teacher-residence');

            container
            .on('click', '.amplify', function () {
                container.addClass('max');
                //baiduMap.reAddress('map', store.get('lng'), store.get('lat'));
                baiduMap.modifiedAddress('map', store.get('lng'), store.get('lat'));
            })
            .on('click', '.reduce', function () {
                container.removeClass('max');
                //baiduMap.reAddress('map', store.get('lng'), store.get('lat'));
                baiduMap.modifiedAddress('map', store.get('lng'), store.get('lat'));
            });
        }

    };

});