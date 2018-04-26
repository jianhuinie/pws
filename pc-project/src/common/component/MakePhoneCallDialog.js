define(function (require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var service = require('common/service');
    var entrance = require('im/entrance');

    var skinClass = 'make-phonecall-dialog';
    var etpl = require('cobble/util/etpl');

    var tplComfirm = ''
        + '<h1 class="text-success">跟谁学免费通话</h1>'
        + '<div class="message">'
        +     '即将为你免费呼叫  <span class="text-primary">${name}</span>  老师，请注意在你的手'
        +     '机  ${mobile}  上 接听 <span class="text-primary">010-86448910</span> 的来电'
        +     '<p>（部分用户因手机套餐原因可能会由运营商收取接听或漫游费用）</p>'
        + '</div>'
        + '<div class="actions">'
        +     '<button class="btn-default dark" data-action="cancel">取消呼叫</button>'
        +     '<button class="btn-primary" data-action="dial">确定呼叫</button>'
        + '</div>';

    var tplUnreachable = ''
        + '<h1 class="text-primary">无法呼叫</h1>'
        + '<div class="message">'
        +     '老师拒绝通话，使用app给老师语音留言更方便哦：）'
        + '</div>'
        + '<div class="app">'
        +     '<div class="qrcode-wrapper">'
        +       '<div class="qrcode"></div>'
        +     '</div>'
        +     '<span>扫描下载跟谁学APP</span>'
        + '</div>'
        + '<div class="actions">'
        +     '<button class="btn-primary" data-action="im">打开网页版</button>'
        + '</div>';

    var tplTeacherBusy = ''
        + '<h1 class="text-primary">老师正忙</h1>'
        + '<div class="message">'
        +     '老师当前忙，稍后再试；使用app给老师语音留言更方便哦：）'
        + '</div>'
        + '<div class="app">'
        +     '<div class="qrcode-wrapper">'
        +       '<div class="qrcode"></div>'
        +     '</div>'
        +     '<span>扫描下载跟谁学APP</span>'
        + '</div>';

    var tplNetworkBusy = ''
        + '<h1 class="text-primary">网络繁忙</h1>'
        + '<div class="message">'
        +     '网络繁忙，请稍后再试或使用app给老师留言'
        + '</div>'
        + '<div class="app">'
        +     '<div class="qrcode-wrapper">'
        +       '<div class="qrcode"></div>'
        +     '</div>'
        +     '<span>扫描下载跟谁学APP</span>'
        + '</div>'
        + '<div class="actions">'
        +     '<button class="btn-default dark" data-action="redial"><span class="second">5</span>s后重新呼叫</button>'
        +     '<button class="btn-primary" data-action="im">打开网页版</button>'
        + '</div>';

    var tplExceed = ''
        + '<h1 class="text-primary">呼叫失败</h1>'
        + '<div class="message">'
        +     '对不起，你本月的通话时间已经超出限额，通话功</br>能将于下月恢复，你可以使用app给老师留言哦！</br>如有疑问请联系客服（4000-910-910，010-86448910）'
        + '</div>'
        + '<div class="app">'
        +     '<div class="qrcode-wrapper">'
        +       '<div class="qrcode"></div>'
        +     '</div>'
        +     '<span>扫描下载跟谁学APP</span>'
        + '</div>'
        + '<div class="actions">'
        +     '<button class="btn-primary" data-action="im">打开网页版</button>'
        + '</div>';

    var tplNoPermit = ''
        + '<h1 class="text-primary">呼叫失败</h1>'
        + '<div class="message">'
        +     '对不起，你的通话发现异常，通话功能已被关闭，</br>如有疑问请联系客服（4000-910-910）'
        + '</div>'
        + '<div class="actions">'
        +     '<button class="btn-primary" data-action="cancel">确定</button>'
        + '</div>';

    function call(from, to, parentDialog) {

        parentDialog.element.find('.btn-primary').prop('disabled', true);

        var me = this;
        service
        .makePhoneCall(
            {
                from_number: from,
                to_number: to
            },
            {
                errorHandler: {
                    '10001': function (response) { //网络繁忙
                        parentDialog.hide();
                        var dialog = new Dialog({
                            content: tplNetworkBusy,
                            skinClass: skinClass,
                            width: 440
                        });

                        var element = dialog.element;
                        var count = 5;
                        var redial = element.find('[data-action="redial"]');
                        var second = redial.find('.second');

                        var timer = setInterval(function () {
                            count--;
                            second.text(count);

                            if (count == 0) {
                                redial.text('确定呼叫');
                                redial.removeClass('dark btn-primary');
                                redial.addClass('btn-primary');
                                clearTimeout(timer);
                            }
                        }, 1000);

                        element
                        .on('click', '[data-action="im"]', function () {
                            dialog.hide();
                            entrance.chatTo({
                                userNumber: to,
                                userType: me.role
                            });
                        })
                        .on('click', '[data-action="redial"]', function () {
                            if (count == 0) {
                                call.call(me, from, to, dialog);
                            }
                        });
                    },
                    '10002': function (response) { //老师正忙
                        parentDialog.hide();
                        var dialog = new Dialog({
                            content: tplTeacherBusy,
                            skinClass: skinClass,
                            width: 440
                        });

                    },
                    '10003': function (response) { //无法呼叫
                        parentDialog.hide();

                        var dialog = new Dialog({
                            content: tplUnreachable,
                            skinClass: skinClass,
                            width: 440
                        });

                        dialog
                        .element
                        .on('click', '[data-action="im"]', function () {
                            dialog.hide();
                            entrance.chatTo({
                                userNumber: to,
                                userType: me.role
                            });
                        });
                    },
                    '1104': function (response) { //超出时长
                        parentDialog.hide();

                        var dialog = new Dialog({
                            content: tplExceed,
                            skinClass: skinClass,
                            width: 440
                        });

                        dialog
                        .element
                        .on('click', '[data-action="im"]', function () {
                            dialog.hide();
                            entrance.chatTo({
                                userNumber: to,
                                userType: me.role
                            });
                        });
                    },
                    '1102': function (response) { //通话异常
                        parentDialog.hide();

                        var dialog = new Dialog({
                            content: tplNoPermit,
                            skinClass: skinClass,
                            width: 440
                        });

                        dialog
                        .element
                        .on('click', '[data-action="cancel"]', function () {
                            dialog.hide();
                        });
                    }
                }
            }
        )
        .done(function (response) {
            parentDialog.element.find('.btn-primary').prop('disabled', false);
            if (response.code === 0) {
                parentDialog.hide();
            }
        })
    }

    function MakePhoneCall(options) {
        $.extend(this, options);
        this.init();
    }

    MakePhoneCall.prototype = {
        init: function () {
            var me = this;
            me.name = me.name.replace(/老师$/, '');

            var confirmDialog = new Dialog({
                content: etpl.compile(tplComfirm)({
                    name: me.name,
                    mobile: me.mobile
                }),
                width: 440,
                skinClass: skinClass
            });

            confirmDialog
            .element
            .on('click', '[data-action="cancel"]', function () { // 取消呼叫
                confirmDialog.hide();
            })
            .on('click', '[data-action="dial"]', function () { // 确定呼叫
                call.call(me, me.from, me.to, confirmDialog);
            })
        }
    }

    return MakePhoneCall;
});