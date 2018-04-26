/**
 * @file 机构资料导航栏
 * @author zhangshaolong
 */
define(function (require, exports) {

    'use strict';

    var CallingDialog = require('common/component/CallingDialog');
    var store = require('common/store');
    var service = require('common/service');

    var container = $('.org-nav');
    var justLogin = false; // 是否为刚登陆用户

    exports.init = function () {

        var mobileNode = container.find('.mobile');

        //  预约试听弹窗里展示用户手机号 － 缓存
        if ($('#user-mobile').length && store.get('user').mobile) {
            $('#user-mobile').html(store.get('user').mobile);
        }

        // 三方通话与400电话共存
        if (mobileNode.length) {
            var orgNumber = mobileNode.data('orgNumber');
            var name = mobileNode.data('name');

            mobileNode.click(function () {
                new CallingDialog({
                    name: name,
                    orgNumber: orgNumber
                });
            });
        }

    };

});