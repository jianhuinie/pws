/**
 * Created by chenmo on 16/2/19.
 * 打开400电话弹窗
 */
define(function(require) {

    var app = require('common/app');
    var ui = require('common/ui');
    var env = require('util/env');
    var $ = require('zepto');


    var makePhoneCall = function(tel) {
        app.send('toMakePhoneCall', {
            phone_number: tel
        });
    };


    var makePhoneCallByPlatform = function(tel) {

        var platform = env.os.name;

        if (platform === 'Android') {
            ui.confirm('' + '<div style="color: #000;padding: 0 30px;">' + '<strong style="font-weight:700;">是否拨打电话</strong>' + '<p style="margin-top:10px;">' + tel + '</p>' + '</div>').done(function() {
                makePhoneCall(tel);
            });

        } else {
            makePhoneCall(tel);
        }
    };



    return function() {
        if (app.isApp()) {
            $('#fsdlg_tel').click(function() {
                makePhoneCallByPlatform('4000910910');
            });
            if (app.appVersion() > '3.2.4') {
                $('.new').show();
            } else {
                $('.old').show();
            }
        } else {
            $('.new').show();
        }
    }

});