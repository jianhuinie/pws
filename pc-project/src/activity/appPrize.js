define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var LoginDialog = require('common/component/LoginDialog');

    var Popup = require('cobble/helper/Popup');
    var container = $('#main');

    exports.init = function () {
        var hasLogin = store.get('user').type !== -1;
        var baiduShare = container.find('.baidu-share');

        container
        .on('click', '.share-btn', function () {
            if (!hasLogin) {
                new LoginDialog({
                    activityVoiceRegister: false,
                    onSuccess: function () {
                        location.reload();
                    },
                });
            }
            else {
                baiduShare.show();
            }

        });
        container
        .on('mouseleave', '.share-btn', function () {

            baiduShare.hide();
        })
    }
});