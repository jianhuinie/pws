define(function(require) {

    'use strict';

    var $ = require('zepto');
    var app = require('common/app');
    var service = require('common/service');
    var ui_new = require('common/ui');
    var util = require('common/util');


    var useIframeMakePhoneCall = function (tel) {
        if (app.isApp()) {
            app.makePhoneCall(tel);
        }
        else {
            if (ua.platform === 'ios') {
                location.href = 'tel:' + tel;
            }
            else {
                var iframe = document.createElement('iframe');
                iframe = $(iframe);

                iframe.css('display', 'none')
                    .appendTo($(document.body))
                    .prop('src', 'tel:' + tel);
            }
        }
    };

    return function(page_data) {

        var purchaseId = $('.main-content').data('purchase-id');
        $('#main')
        .on('click', '.mod', function () {
            location.href = '/pay/applyRefund?purchase_id=' + purchaseId + '&action=1';
        })
        .on('click', '.undo', function () {
             ui_new.confirm({
                content: '确定撤销退款申请吗？',
                button_ok: '确定',
                button_cancel: '取消'
            }).done(function() {
                service.post('/pay/refundCancel', {
                    purchase_id: purchaseId
                }, function (res) {
                    if (res.code == '0') {
                        location.href = '/student_center/order_detail?purchase_id=' + purchaseId;
                    }
                });
            });
        })
        .on('click', '.more', function () {
            $(this).addClass('hidden');
            $('.block-detail .time').removeClass('hidden');
        })
        .on('click', '.contact-phone', function () {
            // alert('sss');
            useIframeMakePhoneCall(('' + $(this).data('mobile')).replace('-', ''));
        });
    };

});