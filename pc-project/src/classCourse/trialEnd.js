define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var service = require('common/service');
    var store = require('common/store');

    exports.init = function () {
        var container = $('.inner-box');
        var mainBox = $('#main');
        var enrollUrl = store.get('enrollUrl');
        var detailUrl = store.get('detailUrl');

        //被机构停课跳转页  做特殊处理
        if (!location.search) {
            mainBox.find('.end-class').show();
            $(document).attr('title', '停课通知');
        }
        else {
            mainBox.find('.trial-end').show();
            $(document).attr('title', '试听结束反馈');
        }
        

        var contentTpl = '' +
            '<div class="text-tip">可以请您选择不报名的原因吗？根据您的反馈我们会不断进步哦～</div>' +
            '<div class="noenroll-reason">' +
                '<label><input type="radio" name="reason" value="1"/>价格太高</label>' +
                '<label><input type="radio" name="reason" value="2"/>试听时间短，还不能做决定</label>' +
                '<label><input type="radio" name="reason" value="3"/>老师讲的不好</label>' +
                '<label><input type="radio" name="reason" checked value="4"/>就是不想报名了</label>' +
            '</div>'+
            '<div class="submit-button">提交</div>';
        container
        .on('click', '.no-enroll', function (e) {
            var target = $(e.currentTarget);
            var roomNo = target.data('room-no');
            var dialog = new Dialog({
                title: '',
                content: contentTpl,
                width: 333,
                skinClass: 'noenroll-dialog',
                disposeOnHide: true
            });
            $('.submit-button').off().on('click', function () {
                var reason = $('input[name=reason]:checked').val();
                service
                .sendNoEnrollReason({
                    reason: reason,
                    roomNo: roomNo
                })
                .done(function (response) {
                    if (response.code === 0) {
                        dialog.hide();
                        location.href = detailUrl;
                    }
                })
                
            });
        })
        .on('click', '.coupon-enroll', function (e) {
            var target = $(e.currentTarget);
            var serialNum = target.data('serial-num');
            service
            .receiveCoupon({
                serialNum: serialNum
            })
            .done(function (response) {
                //报名
                location.href = enrollUrl;
            });
        })
        .on('click', '.enroll', function () {
            //报名
            location.href = enrollUrl;
        })
        
    };
});