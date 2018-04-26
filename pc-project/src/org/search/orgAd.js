/**
 * @file 机构广告
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var getAdMonitorUrl = require('common/function/getAdMonitorUrl');

    var container = $('#org-ad');
    var defaultData;

    var adIdMap = {
        dev: '5',
        test: '5',
        beta: '4',
        www: '4'
    };

    var hasAd = false;

    function getBannerComponent(data) {

        var el = $(''
            +   '<a target="_blank" data-click-monitor="'
            +   (data.clickMonitor ? data.clickMonitor : '')
            +   '" href="' + (data.click ? data.click : 'javascript:;') + '" title="' + (data.hover ? data.hover : '') + '">'
            +       '<img src="' + (data.material ? data.material : '') + '">'
            +   '</a>'
        );
        return el;

    }

    function addBanner(data) {
        if (hasAd) {
            container.append(getBannerComponent(data));
        } else {
            container.append(getBannerComponent(defaultData));
        }
    }

    /*function sendToMonitor(data) {
        var monitor = data.monitor.replace(/^http:\/\//, '//'); //替换为当前协议

        //上送统计
        if (data.monitor) {
            var img = new Image();
            img.src = monitor;
        }
    }*/


    function sendToMonitor(data) {
        send(data.monitor);
    }

    function send(monitor) {
        //var monitor = monitor.replace(/^http:\/\//, '//'); //替换为当前协议

        //上送统计
        if (monitor) {
            monitor = getAdMonitorUrl(monitor);
            var img = new Image();
            img.src = monitor;
        }
    }

    exports.init = function () {

        var env = store.get('env');
        var staticUrl = store.get('staticOrigin');
        var bannerData = {};

        defaultData = {
            material: staticUrl + '/asset/img/org/ad20150420.jpg',
            click: 'http://www.genshuixue.com/teacher/classCourseDetail?number=150410547393',
            hover: '带你横扫2016考研英语'
        };
        var sjs = store.get('sj');
        if (sjs) {
            var arr = sjs.split('/');
            if (arr.length > 0) {
                sjs = arr[arr.length-1];
            }
        }
        service
        .fetchadvertisement({
            adId: adIdMap[env],
            cityId: store.get('cityId'),
            sj: sjs
        })
        .done(function (response) {
            var data = response.data;

            if (data[adIdMap[env]] &&
                data[adIdMap[env]].length > 0 &&
                data[adIdMap[env]][0].material) {
                hasAd = true;
                bannerData = data[adIdMap[env]][0];
                sendToMonitor(bannerData);
            }

            addBanner(bannerData);
        })
        .fail(function () {
            addBanner(null);
        });

        container
        .on('click', 'a', function (e) {

            var monitor = $(this).data('click-monitor');
            send(monitor);
        });

    };
});