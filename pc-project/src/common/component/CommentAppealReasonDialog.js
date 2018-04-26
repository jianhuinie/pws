/**
 * @file 匿名评价申诉 选择申诉原因
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var service = require('common/service');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.commentId 评价ID
     */
    function CommentAppealReasonDialog(options) {
        $.extend(this, CommentAppealReasonDialog.defaultOptions, options);
        this.init();
    }

    CommentAppealReasonDialog.prototype = {

        init: function () {

            var me = this;

            var content = ''
                        + '<div class="form">'

                        +     '<input type="hidden" name="commend_id" value="' + me.commentId + '" />'

                        +     '<div class="form-group">'

                        +         '<label class="form-radio">'
                        +             '<input type="radio" name="reason" value="1">恶意辱骂'
                        +         '</label>'
                        +         '<br />'
                        +         '<label class="form-radio">'
                        +             '<input type="radio" name="reason" value="2">无意义内容'
                        +         '</label>'

                        +     '</div>'

                        +     '<div style="color: #bbb; line-height: 16px; font-size: 12px;">'
                        +         '比如随意填写的字符、重复文字等不可读信息，其他正常评价内容申诉会被拒绝哦～'
                        +     '</div>'

                        +     '<div class="dialog-action">'
                        +         '<button class="btn-primary btn-appeal">确定</button>'
                        +     '</div>'

                        + '</div>';

            var dialog = new Dialog({
                title: me.title,
                content: content,
                width: 303,
                skinClass: 'appeal-reason-dialog',
            });

            var element = dialog.element;

            var reasonMap = {
                '1': '恶意辱骂',
                '2': '无意义内容'
            };

            element
            .on('click', '.btn-appeal', function (e) { // 申诉理由

                var reason = $('input[name="reason"]:checked').val();

                if (reason) {
                    service
                    .commentAppeal({
                        commentId: $('input[name="commend_id"]').val(),
                        reason: reasonMap[reason]
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            dialog.hide();
                            me.target.replaceWith('<button class="btn-default appeal-deal" disabled>申诉处理中</button>');
                        }
                    });
                }

            });
        }

    }

    CommentAppealReasonDialog.defaultOptions = {
        title: '选择申诉理由',
        onSuccess: $.noop,
        disposeOnHide: true
    };

    return CommentAppealReasonDialog;

});