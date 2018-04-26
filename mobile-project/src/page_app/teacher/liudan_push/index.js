/**
 * Created by xuzheng on 16/1/28.
 */
define(function(require) {
    'use strict';

    var $ = require('zepto');
    var service = require('common/service');
    var ui = require('common/ui');

    function send_result(reqID, status) {
        service.post('/order/customerLeave', {
            'req_id': reqID,
            'status': status
        }, function(response) {
            if (response.code == 0) {
                window.location.reload();
            }
        });
    }

    function send_sms_push(reqID, status) {
        service.post('/order/customerLeave', {
            'req_id': reqID,
            'receive': status
        }, function(response) {
            if (response.code != 0) {
                require(['common/ui'], function(ui) {
                    ui.remind(response.message || response.msg || '服务器繁忙,请稍后再试……');
                });
                return false;
            }
        });
    }

    return function(page_data) {
        var reqID = page_data['id'];
        $('#yes').tap(function() {
            send_result(reqID, 1);
            $('#chk-sms').hide();
            /*var contentDom = $('#dialog-content');
            if (contentDom.length) {
                var conDom = ui.confirm({
                    content: contentDom.prop('outerHTML'),
                    title: '温馨提示',
                    button_ok: "同意",
                    button_cancel: "不同意"
                });
                conDom.done(function() {

                });
                conDom.fail(function() {
                    send_result(reqID, 2);
                });
            } else {
                send_result(reqID, 1);
                $('#chk-sms').hide();
            }*/

        });

        $('#no').tap(function() {
            send_result(reqID, 2);
        });

        $('#chk-sms').tap(function() {
            var $this = $(this);
            var isChecked = !!$this.attr('data-checked');
            $this.attr('data-checked', isChecked ? '' : 'checked');
            if (isChecked) {
                $this.find('.icon')
                    .removeClass('icon-checkbox-checked')
                    .addClass('icon-checkbox-unchecked');
                send_sms_push(reqID, 0);
            } else {
                $this.find('.icon')
                    .removeClass('icon-checkbox-unchecked')
                    .addClass('icon-checkbox-checked');
                send_sms_push(reqID, 1);
            }
        });
    };
});