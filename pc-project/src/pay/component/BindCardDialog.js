/**
 * @file 绑定银行卡
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var bindCardForm = require('./bindCardForm');

    /**
     * @param {Object} options
     * @property {string} options.purchaseId 订单 ID
     * @property {number} options.money 订单支付金额
     * @property {boolean} options.isPayCard 是否绑支付卡
     */
    function BindCardDialog(options) {
        $.extend(this, options);
        this.init();
    }

    BindCardDialog.prototype = {

        init: function () {

            var money = this.money;

            var dialog = new Dialog({
                title: money
                     ? ('支付 <span class="text-error">￥' + money + '</span>')
                     : '添加银行卡',
                content: $('#bind-card-dialog').html(),
                skinClass: 'dialog-bind-card',
                width: 750,
                hidden: true
            });

            var container = dialog.element;

            bindCardForm.init({
                element: container,
                money: money,
                purchaseId: this.purchaseId,
                isPayCard: this.isPayCard
            });

            dialog.show();

        }
    };

    return BindCardDialog;

});
