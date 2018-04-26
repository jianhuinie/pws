/**
 * @file 我的银行卡
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var BindCardDialog = require('pay/component/BindCardDialog');
    var UnbindCardDialog = require('common/component/UnbindCardDialog');
    var SetPasswordDialog = require('pay/common/component/SetPasswordDialog');

    var service = require('common/service');
    var store = require('common/store');

    exports.init = function () {

        var container = $('#content');

        container
        .on('click', '.add-card .btn-link', function () {

            var element = $(this).closest('.add-card');

            var isPayCard = element.data('type') === 'pay';

            if (isPayCard) {
                new BindCardDialog({
                    isPayCard: isPayCard
                });
            }
            else {
                location.href = '/'
                    + (store.get('user').type == 0 ? 'teacher' : 'student')
                    + '_center/bindCard';
            }
        })
        .on('click', '.delete-card', function () {

            var element = $(this).closest('.bank-card');

            if (!store.get('hasPayPassword')) {

                var mobile = store.get('user').mobile;

                new SetPasswordDialog({
                    mobile: mobile,
                    mobile_mask: String(mobile).replace(
                        /^(\d{3})\d{4}(\d{4})$/,
                        '$1****$2'
                    ),
                    onSuccess: function (data) {
                        location.reload();
                    }
                });
                return;
            }

            confirm({
                title: '温馨提示',
                content: '确定要删除该银行卡吗？'
            })
            .then(function () {

                var id = element.data('id');
                var type = element.data('type');

                new UnbindCardDialog({
                    bankCardId: id,
                    post: function (data) {
                        if (type === 'pay') {
                            return service.unBindPayBankCard(data);
                        }
                        else {
                            return service.unBindBankCard(data);
                        }
                    },
                    onSuccess: function () {
                        success('删除成功', function () {
                            location.reload();
                        });
                    }
                });
            });
        })
        .on('click', '.replace-card', function () {

        });

    };

});