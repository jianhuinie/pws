/**
 * @file 班课详情 上课地址
 * @author liucong
 */
define(function (require, exports) {

    'use strict';

    var baiduMap = require('common/map/baidu');
    var form = require('common/form');
    var redirect = require('cobble/util/redirect');
    var Validator = require('cobble/form/Validator');

    var wayMap = {
        '1': 'bt',
        '2': 'nav'
    };

    exports.init = function () {
        var container = $('#course-address');
        var offline = container.find('#course-address-map').data('offline');
        var address = container.find('#course-address-map').data('address');

        var validator = new Validator({
            element: container.find('.form'),
            realtime: false,
            fields: {
                departure: {
                    errors: {
                        required: '请填写你的出发地点'
                    }
                }
            }
        });

        if (offline || address) {
            if (offline) {
                baiduMap.modifiedAddress('course-address-map', offline.lng, offline.lat, false);
            }
            else {
                baiduMap.addrResolution('course-address-map', address, false);
            }

            container
            .on('click', '.form-action button', function () {

                if (!validator.validate()) return;

                var formData = form.parse(container.find('.form'));
                if (!formData.departure) return;

                var url = 'http://map.baidu.com?newmap=1&ie=utf-8&s=' + wayMap[formData.way];

                url += encodeURIComponent('&wd1=' + formData.departure + '&wd2=' + address);

                redirect.openLink(url);

            });
        }

    }

});


