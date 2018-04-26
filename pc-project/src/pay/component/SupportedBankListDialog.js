/**
 * @file 支持的银行列表
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Tab = require('cobble/ui/Tab');
    var etpl = require('cobble/util/etpl');

    etpl.addFilter('lower', function (source) {
        return source.toLowerCase();
    });

    var payService = require('../service');

    /**
     * @param {Object} options
     * @property {Function} options.onSelect
     */
    function SupportedBankListDialog(options) {
        $.extend(this, options);
        this.init();
    }

    SupportedBankListDialog.prototype = {

        init: function () {

            var me = this;

            var dialog = new Dialog({
                title: '请选择一个银行',
                content: tpl,
                skinClass: 'dialog-bank-list',
                width: 270,
                hidden: true,
                onBeforeHide: function () {
                    element.off();
                }
            });

            var element = dialog.element;

            new Tab({
                element: element
            });

            element
            .on('click', '.tab-panel li', function () {

                var target = $(this);

                target
                    .closest('.content')
                    .find('.active')
                    .removeClass('active');

                target.addClass('active');

            })
            .on('click', '.btn-submit', function () {

                var target = element.find('.content .active');
                if (target.length === 1) {
                    var data = target.data();
                    dialog.hide();
                    if (me.onSelect) {
                        me.onSelect(data);
                    }
                }
                else {
                    alert('请选择一个银行');
                }
            });

            payService
            .getSupportedBankList()
            .then(function (response) {
                if (response.code === 0) {

                    element.find('.deposit-card-list').html(
                        renderBankList({
                            list: response.data.deposit_card_list
                        })
                    );

                    element.find('.credit-card-list').html(
                        renderBankList({
                            list: response.data.credit_card_list
                        })
                    );

                }
                dialog.show();
            });

        }
    };

    var tpl = ''
        + '<div class="tab-nav-info">'
        +     '<div class="nav-item active">储蓄卡</div>'
        +     '<div class="nav-item">信用卡</div>'
        + '</div>'
        + '<div class="content">'
        +     '<ul class="tab-panel deposit-card-list"></ul>'
        +     '<ul class="tab-panel credit-card-list"></ul>'
        + '</div>'
        + '<div class="dialog-action">'
        +     '<div class="btn-primary btn-submit">确定</div>'
        + '</div>';

    var renderBankList = etpl.compile(
          '<!-- for: ${list} as ${item} -->'
        + '<li data-bank-no="${item.bank_no}" '
        +    'data-bank-logo="${item.bank_logo}" '
        +    'data-card-type="${item.card_type}" '
        +    'data-pay-each="${item.pay_each}" '
        +    'data-pay-day="${item.pay_day}" '
        + '>'
        +    '<i class="icon icon-bank-${item.bank_no|lower}"></i>'
        + '</li>'
        + '<!-- /for -->'
    );

    return SupportedBankListDialog;

});