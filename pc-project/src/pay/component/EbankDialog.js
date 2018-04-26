/**
 * @file 选择网上银行对话框
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');

    /**
     * 等待支付对话框
     *
     * @constructor
     * @param {Object} options
     * @property {number} options.money 支付金额
     * @property {Function} options.onSelect
     */
    function EbankDialog(options) {
        $.extend(this, EbankDialog.defaultOptions, options);
        this.init();
    }

    EbankDialog.prototype = {

        init: function () {

            var me = this;

            var dialog = new Dialog({
                title: '网银支付',
                content: $('#ebank-dialog').html(),
                width: 740,
                skinClass: 'dialog-ebank'
            });

            var container = dialog.element;

            container.find('.pay-money strong').html(
                '￥' + this.money
            );

            container
            .on('click', '.bank-card', function (e) {

                if (e.target.tagName === 'INPUT') {
                    return;
                }

                dialog.hide();

                if ($.isFunction(me.onSelect)) {

                    var bank = $(this).find(':radio').val();

                    me.onSelect({
                        bank: bank
                    });
                }

            });

        }
    };

    EbankDialog.defaultOptions = {

    };

    return EbankDialog;

});