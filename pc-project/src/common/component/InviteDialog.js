/**
 * @file 发送邀请码 对话框
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Input = require('cobble/helper/Input');
    var service = require('common/service');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.userType  0：老师身份   2：学生身份
     * @property {string} options.next 后续跳转url, '0'代表不跳转
     */
    function InviteDialog (options) {
        $.extend(this, options);
        this.init();
    };

    InviteDialog.prototype = {

        init: function () {

            var me = this;
            var userType = me.userType;
            var targetRole = me.targetRole;
            var formData = me.formData;
            var inviteCantent = '';
            var inviteTitle = '';
            var next = me.next;

            if (userType != 0) {
                inviteCantent = roleMap.teacher.content;
                inviteTitle = roleMap.teacher.title;
            }
            else {
                inviteCantent = roleMap.student.content;
                inviteTitle = roleMap.student.title;
            }

            var inviteDialog = new Dialog({
                title: inviteTitle,
                content: inviteCantent,
                skinClass: 'invite-dialog',
                disposeOnHide: true,
                width: 450
            });

            me.dialog = inviteDialog;

            var element = inviteDialog.element;
            var confirmBtn = element.find('.btn-confirm');

            var input = new Input({
                element: element.find(':text'),
                onChange: function () {
                    var value = $.trim(this.element.val());
                    confirmBtn.prop('disabled', false);
                }
            });

            element
            .on('click', '.btn-confirm', function () {

                inviteDialog.hide();

                service
                .sendInviteCode({
                    inviteCode: element.find('input').val(),
                    role: targetRole,
                    formData: formData

                })
                .done(function (response) {
                    if (response.code === 0) {
                        if ($.isFunction(me.onSuccess)) {
                            me.onSuccess();
                        }
                        // 跳转URL
                        if (next && next !== '0') {
                            setTimeout(
                                function () {
                                    if (targetRole == '2') {
                                        if (!next) {
                                            window.location.href = response.data.url;
                                        }
                                        else if (next.length > 1) {
                                            window.location.href = next;
                                        }
                                    }
                                    else if (targetRole == '0') {
                                        // if user is in index page, you should turn to student scedule
                                        // window.location.href = response.data.url;
                                    }
                                },
                                5500
                            );
                        }

                    }
                    else {
                        if ($.isFunction(me.onError)) {
                            me.onError();
                        }
                    }

                });
            })
            .on('click', '.btn-cancel', function () {
                inviteDialog.hide();
            });

        }

    };

    var roleMap = {
        teacher: {
            title: '开通老师身份',
            content:  '<div class="title">'
                    +     '<span>即将给您开通老师身份，是否继续？</span>'
                    + '</div>'
                    + '<div class="form-group invite">'
                    +     '<label class="form-label">'
                    +         '邀请码（选填）：'
                    +     '</label>'
                    +     '<div class="form-controls">'
                    +         '<input type="text" class="form-text" />'
                    +         '<div class="form-block">'
                    +             '拨打'
                    +             ' <span class="text-info">4000-910-910</span> '
                    +             '获取邀请码'
                    +         '</div>'
                    +     '</div>'
                    + '</div>'
                    + '<div class="dialog-action">'
                    +     '<button class="btn-primary btn-confirm">确定</button>'
                    +     '<button class="btn-default btn-cancel">取消</button>'
                    + '</div>'
        },
        student: {
            title: '开通学生身份',
            content:  '<div class="title">'
                    +     '<span>即将给您开通学生身份，是否继续？</span>'
                    + '</div>'
                    + '<div class="invite">'
                    +     '<span>邀请码（选填）</span>'
                    +     '<input type="text" class="form-text" />'
                    + '</div>'
                    + '<div class="dialog-action">'
                    +     '<button class="btn-primary btn-confirm">确定</button>'
                    +     '<button class="btn-default btn-cancel">取消</button>'
                    + '</div>'
        }
    }

    return InviteDialog;

});