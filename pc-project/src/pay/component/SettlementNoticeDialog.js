/**
 * @file 课酬资金结算时间调整弹窗提示
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var localStorage = require('cobble/util/localStorage');
    var DIE_KEY = 'settlement-dialog-die';

    function SettlementNoticeDialog() {
        this.init();
    }

    SettlementNoticeDialog.prototype = {

        init: function () {

            var dialog = new Dialog({
                title: '课酬资金结算时间调整',
                content: tpl,
                skinClass: 'settlement-dialog',
                width: 400
            });

            var container = dialog.element;

            container
            .on('click', '.btn-primary', function () {
                dialog.hide();
            })
            .on('click', 'input[type="checkbox"]', function () {
                localStorage.set(DIE_KEY, this.checked ? 1 : 0);
            });

        }
    };

    var tpl = '跟谁学一直致力于为您提供更快、更便捷的课酬结算和提现体验。跟谁学平台在课酬结算方面做如下调整：'
            + '<ol>'
            +     '<li>'
            +         '账户当日产生的学生确认课酬、非担保交易课酬、平台奖励等奖金，'
            +         '将于下一个工作日结算至您的可提现余额账户，遇节假日顺延。'
            +     '</li>'
            +     '<li>'
            +         '如有疑问，欢迎致电跟谁学4000-910-910，010-86448910。'
            +     '</li>'
            + '</ol>'
            + '<div class="dialog-action">'
            +     '<div class="btn-primary">我知道了</div>'
            +     '<label class="form-checkbox">'
            +         '<input type="checkbox" />不再提示'
            +     '</label>'
            + '</div>';

    SettlementNoticeDialog.show = function () {
        if (localStorage.get(DIE_KEY) == 1) {
            return;
        }
        new SettlementNoticeDialog();
    };

    return SettlementNoticeDialog;

});
