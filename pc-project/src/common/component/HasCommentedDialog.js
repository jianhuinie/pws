/**
 * @file 发送邀请码 对话框
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var InviteDialog = require('common/component/InviteDialog');
    var service = require('common/service');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.buyUrl 够买按钮跳转url, '0'代表不跳转
     */
    function HasCommentedDialog (options) {
        $.extend(this, options);
        this.init();
    };

    HasCommentedDialog.prototype = {

        init: function () {

            var me = this;
            var buyUrl = me.buyUrl;
            var userType = me.userType;
            //var formData = me.formData;
            var title = '温馨提示';

            var buyBtnUrl = '';
            if (buyUrl) {
                buyBtnUrl = buyUrl;
            }

            var content = '';
            content = ''
                    + '<div class="title">'
                    +     '<span>不好意思，你已经为这位老师填写过评价信息喽~ </span><br/>'
                    +     '<span>购买并完成老师课程就能再次评价啦！</span>'
                    + '</div>'
                    + '<div class="dialog-action">'
                    +     '<a class="btn-primary btn-confirm">去购买课程</a>'
                    +     '<button class="btn-default btn-cancel">我知道了</button>'
                    + '</div>'

            var hasCommentedDialog = new Dialog({
                title: title,
                content: content,
                skinClass: 'has-comminted-dialog',
                disposeOnHide: true,
                width: 450
            });

            me.dialog = hasCommentedDialog;

            var element = hasCommentedDialog.element;

            element
            .on('click', '.btn-confirm', function () {
                hasCommentedDialog.hide();

                if (userType == '0' || userType == 'teacher') {

                        /*
                        var inviteDialog = new InviteDialog({
                            userType: userType,
                            targetRole: 2,
                            next: buyBtnUrl,
                            onSuccess: function () {
                                new InviteResultDialog({userType: userType, status: 'succ'});
                            },
                            onError: function () {
                                new InviteResultDialog({userType: userType, status: 'err'});
                            }
                        });
                        */

                       var content = '' +
                                  '<div class="title">'
                                +     '<span>你目前是老师身份，无法购买课程 </span><br/>'
                                +     '<span>是否立即切换身份？</span>'
                                + '</div>'
                                + '<div class="dialog-action">'
                                +     '<a class="btn-primary btn-change">立即切换</a>'
                                +     '<button class="btn-default btn-cancel">取消</button>'
                                + '</div>';

                       var changeUserTypeDialog = new Dialog({
                            title: '温馨提示',
                            content: content,
                            skinClass: 'change-usertype-dialog',
                            disposeOnHide: true,
                            width: 350
                        });

                       var element = changeUserTypeDialog.element;

                       element
                       .on('click', '.btn-change', function () {
                            service
                            .sendInviteCode({
                                role: 2
                            })
                            .done(function (response) {
                                if (response.code === 0) {
                                    window.location.href = buyBtnUrl;
                                }
                                else {
                                    alert('数据正在维护！');
                                }

                            });
                       })
                       .on('click', '.btn-cancel', function () {
                            changeUserTypeDialog.hide();
                       });
                }
                else {
                    window.location.href = buyBtnUrl;
                }
            })
            .on('click', '.btn-cancel', function () {
                hasCommentedDialog.hide();
            });

        }

    };

    var roleMap = {
        title: '温馨提示',
        content:  '<div class="title">'
                +     '<span>不好意思，你已经为这位老师填写过评价信息喽~ </span>'
                +     '<span>购买并完成老师课程就能再次评价啦！</span>'
                + '</div>'
                + '<div class="dialog-action">'
                +     '<button class="btn-primary btn-confirm">去购买课程</button>'
                +     '<button class="btn-default btn-cancel">取消</button>'
                + '</div>'
    }

    return HasCommentedDialog;

});