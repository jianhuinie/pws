define(function (require,exports) {
    'use strict';
    var store = require('common/store');
    var baiduMap = require('common/map/baidu');
    var Dialog = require('cobble/ui/Dialog');
    var form = require('common/form');
    var redirect = require('cobble/util/redirect');
    var Validator = require('cobble/form/Validator');
    var wayMap = {
        '1': 'bt',
        '2': 'nav'
    };
    var profileMap = null;
    exports.init = function () {
        var container = $('#address');
        var offline = container.find('#map').data('offline');
        var address = container.find('#map').data('address');
        container.on ('focus', '.form-text', function () {
            $('.form-action').removeClass('normal').addClass('active');
        });
        container.on ('blur', '.form-text', function () {
            if(!this.value){
                $('.form-action').removeClass('active').addClass('normal');
            }
        });
        container.on('click', '.viewMap', function() {
            if (profileMap) {
                profileMap.show();
            } else {
                var offline = $(this).data('offline');
                var map = '<div id="detailMap" style="height:400px;"></div>';
                profileMap = new Dialog({
                    title: '上课地点',
                    content: map,
                    disposeOnHide: false,
                    width: 600,
                    onBeforeShow: function(){
                        baiduMap.modifiedAddress('detailMap', offline.lng, offline.lat);
                    }
                });
            }
        });
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
                baiduMap.modifiedAddress('map', offline.lng, offline.lat, false);
            }
            else {
                baiduMap.addrResolution('map', address, false);
            }

            container
                .on('click', '.form-action', function () {

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