define(function(require) {

    'use strict';

    var $ = require('zepto');
    var service = require('common/service');
    var ui = require('common/ui');
    // require('common/mobiscroll');
    // var mobiscroll = require('mobiscroll.select');

    return function(page_data) {

        // $('[name="apply-service"]').mobiscroll();

        $('#main')
        .on('click', '.action .submit-apply', function () {
            service.post('/pay/refundSubmit', {
                purchase_id: $('.main-content').data('purchase-id'),
                reason_id: $('.refund-reason .reason:selected').data('reason-id'),
                action: $('.main-content').data('action') == 1 ? 1 : 0
            }, function (res) {
                if (res.code == '0') {
                    $(this).addClass('submitted');
                    location.href = '/pay/refundDetail?purchase_id=' + $('.main-content').data('purchase-id');
                }
            });
        });

        // mobiscroll.select('#refund-reason', {
        //     theme: 'mobiscroll',
        //     display: 'bottom',
        //     minWidth: 300
        // });

        // window.onbeforeunload = function () {
        // window.onbeforeunload = function (e) {
        //     e.preventDefault();
        //     if (!$('.submit-apply').is('.submitted')) {
        //         ui.confirm({
        //             content: '您当前的退款申请未保存，确定退出吗？',
        //             button_ok: '确定',
        //             button_cancel: '取消'
        //         }).done(function() {
        //             location.href = '/pay/student_center/order_detail?purchase_id=' + $('.main-content').data('purchase-id');
        //         });
        //     }
        // };
        $('.nav-wrap-left .nav-button').on('click', function (e) {
            e.preventDefault();
            if (!$('.submit-apply').is('.submitted')) {
                ui.confirm({
                    content: '您当前的退款申请未保存，确定退出吗？',
                    button_ok: '确定',
                    button_cancel: '取消'
                }).done(function() {
                    location.href = '/student_center/order_detail?purchase_id=' + $('.main-content').data('purchase-id');
                });
            }
        });

    };

});