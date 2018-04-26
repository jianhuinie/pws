/**
 * @file 发送邀请码 返回结果 对话框
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.price
     * @property {Function=} options.onAfterHide 对话框关闭后的回调函数
     */
    function InviteResultDialog (options) {
        $.extend(this, options);
        this.init();
    }

    InviteResultDialog.prototype = {

        init: function () {

            var me = this;
            var userType = me.userType;
            var status = me.status;

            var content = '';
            var title = '';

            if (userType == '2') {
                if (status == 'succ') {
                    title = roleMap.teacher.succ.title;
                    content = roleMap.teacher.succ.content;
                }
                else {
                    title = roleMap.teacher.err.title;
                    content = roleMap.teacher.err.content;
                }
            }
            else if (userType == '0') {
                if (status == 'succ') {
                    title = roleMap.student.succ.title;
                    content = roleMap.student.succ.content;
                }
                else {
                    title = roleMap.student.err.title;
                    content = roleMap.student.err.content;
                }
            }

            var dialog = new Dialog({
                title: title,
                content: content,
                skinClass: 'invite-result-dialog',
                disposeOnHide: true,
                width: 450,
                onAfterHide: function () {
                    if (status == 'succ'
                        && $.isFunction(me.onAfterHide)
                    ) {
                        me.onAfterHide();
                    }
                }
            });

            var element = dialog.element;
            var elTimer = element.find('.timer');
            var i = 5;

            var timer = setInterval(
                function () {
                    if (i < 1) {
                        clearInterval(timer);
                        dialog.hide();
                    }
                    i--;
                    elTimer.html(i);
                },
                1000
            );

            element
            .on('click', '.btn-confirm', function () {
                dialog.hide();
            })
        }

    };

    var roleMap = {
        teacher: {
            succ: {
                title: '开通老师身份成功',
                content:   '<div class="invite-result-dialog">'
                         +     '<div class="wrapper">'
                         +         '<i class="icon icon-check-circle"></i>'
                         +         '<div class="msg-content">'
                         +             '<div class="msg-content-title">恭喜你开通老师身份！</div>'
                         +             '<div class="msg-content-words">快去完善个人资料和课程信息吧~~</div>'
                         +             '<div class="msg-content-time">'
                         +                 '<span class="timer">5</span>秒后跳转至老师中心'
                         +             '</div>'
                         +         '</div>'
                         +     '</div>'
                         +     '<div class="dialog-action">'
                         +          '<button class="btn btn-info btn-confirm">立即前往</button>'
                         +     '</div>'
                         + '</div>'
            },
            err: {
                title: '开通老师身份失败',
                content:   '<div class="invite-result-dialog">'
                         +     '<div class="wrapper">'
                         +         '<i class="icon icon-times-circle"></i>'
                         +         '<div class="msg-content">'
                         +             '<div class="msg-content-title">对不起，你的老师身份开通失败</div>'
                         +             '<div class="msg-content-words">拨打 <span class="phone">4000-910-910</span> 咨询客服</div>'
                         +             '<div class="msg-content-time">'
                         +                 '<span class="timer">5</span>秒后自动关闭'
                         +             '</div>'
                         +         '</div>'
                         +     '</div>'
                         +     '<div class="dialog-action">'
                         +          '<button class="btn btn-info btn-confirm">立即关闭</button>'
                         +     '</div>'
                         + '</div>'
            }
        },

        student: {
            succ: {
                title: '开通学生身份成功',
                content:   '<div class="invite-result-dialog">'
                         +     '<div class="wrapper">'
                         +         '<i class="icon icon-check-circle"></i>'
                         +         '<div class="msg-content">'
                         +             '<div class="msg-content-title">恭喜你开通学生身份！</div>'
                         +             '<div class="msg-content-words">快去搜索喜欢的老师和课程吧~~</div>'
                         +             '<div class="msg-content-time">'
                         +                 '<span class="timer">5</span>秒后返回'
                         +             '</div>'
                         +         '</div>'
                         +     '</div>'
                         +     '<div class="dialog-action">'
                         +          '<button class="btn btn-info btn-confirm">立即返回</button>'
                         +     '</div>'
                         + '</div>'
            },
            err: {
                title: '开通学生身份失败',
                content:   '<div class="invite-result-dialog">'
                         +     '<div class="wrapper">'
                         +         '<i class="icon icon-times-circle"></i>'
                         +         '<div class="msg-content">'
                         +             '<div class="msg-content-title">对不起，您的学生身份开通失败</div>'
                         +             '<div class="msg-content-words">拨打 <span class="phone">4000-910-910</span> 咨询客服</div>'
                         +             '<div class="msg-content-time">'
                         +                 '<span class="timer">5</span>秒后自动关闭'
                         +             '</div>'
                         +         '</div>'
                         +     '</div>'
                         +     '<div class="dialog-action">'
                         +          '<button class="btn btn-info btn-confirm">立即关闭</button>'
                         +     '</div>'
                         + '</div>'
            }
        }
    };

    return InviteResultDialog;

});