/**
 * Created by niumeng on 11/2016.
 */
define(function (require) {
    'use strict';

    var $ = require("zepto");
    var service = require('common/service');
    var qrcode = require('common/qrcode');

    return function (scriptData) {
        var qrCode = $('#main').find('.share');
        var element = $('.qrcode-container');
        var close = element.find('.cancel');

        function getQRCode () {
            var dtd = $.Deferred();

            service.post('/short_url/gen', {
                url: scriptData.qrcodeUrl
            }, function (res) {
                if (res.code == 0) {
                    qrcode({
                        text: res.data.short_url,
                        width: 300,
                        height: 300,
                        element: $('#qrcode')
                    });

                    dtd.resolve();
                } else {
                    dtd.reject();
                }
            });

            return dtd.promise();
        }

        $.when(getQRCode())
        .done(function () {
            qrCode.on('click', '.m-qrcode, .qrcode', function () {
                element.show();
            });
            //关闭二维码
            close.on('click', function () {
                element.hide();
            });
        });
    };

});
