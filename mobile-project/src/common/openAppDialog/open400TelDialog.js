/**
 * Created by chenmo on 16/2/19.
 * 打开400电话弹窗
 */
define(function (require) {

    var Dialog = require('common/ui/FullPageDialog/FullPageDialog');
    var app = require('common/app');
    var openAppDialog = require('./openAppDialog');
    var startChat = require('./startChat');
    var ui = require('common/ui');
    var env = require('util/env');
    var $ = require('zepto');


    var makePhoneCall = function (tel) {
        tel = $.trim(tel).replace('tel:', '');
        if (app.isApp()) {
            var tel = tel + '';
            var isTeacherApp = app.isTeacherApp();
            var currentVersionNumber = app.version2Number(app.appVersion());
            var supportVersionNumber = app.version2Number('2.7.0');
            if (isTeacherApp && (currentVersionNumber < supportVersionNumber)) {
                if (tel.charAt(0) == '0') {
                    ui.alert('抱歉，该学生手机号为国际手机号码，暂不支持在平台上拨打。您可以通过手机直接拨打手机号【' + tel + '】联系学生。');
                    return;
                } else {
                    tel = Number(tel);
                }
            }
            app.send('toMakePhoneCall', {
                phone_number: tel
            })
        }
        else {
            if (env.os.isIOS) {
                location.href = 'tel:' + tel;
            }
            else {
                var iframe = document.createElement('iframe');
                iframe = $(iframe);

                iframe
                    .css({
                        width: 0,
                        height: 0
                    })
                    .appendTo($(document.body))
                    .prop('src', 'tel:' + tel);
            }

        }
    };


    var makePhoneCallByPlatform = function (tel) {

        tel = tel.replace('-', '');
        var telStr = tel.replace(',', '转');

        var platform = env.os.name;

        if (platform === 'Android') {
            ui.confirm(''
                + '<div style="color: #000;padding: 0 30px;text-align:center;">'
                + '<strong style="font-weight:700;">是否拨打电话</strong>'
                + '<p style="margin-top:10px;">' + telStr + '</p>'
                + '</div>'
            ).done(function () {
                makePhoneCall(tel);
            });

        }
        else {
            makePhoneCall(tel);
        }
    };

    function closeFullDialog(dialog) {
        dialog.hide();
        setTimeout(function () {
            dialog.destroy();
            dialog = null;
        }, 2000);
    }

    return {
        open: function (huanxinId, imData, tel) {
            tel = tel.toString();
            tel = tel.replace(/-/g, '');
            if (!app.isApp()) {
                if (tel) {
                    makePhoneCallByPlatform(tel);
                    return;
                }
                else {
                    openAppDialog();
                    return;
                }
            }
            else {
                var telStr = tel.replace(',', '转');
                var htmlArray = '<div class="fsdlg-mask">' +
                    '<div class="fsdlg-container fsdlg-tel400">' +
                    '<ul class="fsdlg-body">' +
                    '<li data-opttype="im" class="fsdlg_im">在线咨询</li>' +
                    '<li data-opttype="tel" class="fsdlg_tel">电话咨询(' + tel + ')</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>';


                var dialog = new Dialog({
                    'content': htmlArray,
                    'animateType': 0,
                    'position': 'fixed',
                    'closeButton': false,
                    'backgroundColor': 'transparent',
                    'zIndex': 800
                });
                dialog.show();
                $('.fsdlg-mask').click(function () {
                    closeFullDialog(dialog);
                });
                $('.fsdlg_im').click(function (e) {
                    closeFullDialog(dialog);
                    startChat(huanxinId, imData);
                    e.stopPropagation();
                });
                $('.fsdlg_tel').click(function (e) {
                    closeFullDialog(dialog);
                    makePhoneCallByPlatform(tel);
                    e.stopPropagation();
                });
            }

        },
        /**
         * 统一处理.open-cs-tel所有电话操作
         *     获取电话号码:data-tel
         */
        init: function () {
            var me = this;
            $('body>*').on('click', '.open-cs-tel', function (e){
                var self = $(this);
                var tel = self.data('tel');
                tel = tel.replace('tel:', '');
                // if (tel.indexOf('400') > -1) {
                    me.open(null, null, tel);
                // }
            });
        },

        makePhoneCall: makePhoneCall
    };
});