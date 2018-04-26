/**
 * @file 提交邀请评价 返回结果 对话框
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.commentType: succ 评价成功, err 评价失败
     */
    function CommentResultDialog (options) {
        $.extend(this, options);
        this.init();
    }

    CommentResultDialog.prototype = {

        init: function () {

            var me = this;
            var type = me.commentType;
            var teacherDetailUrl = me.teacherDetailUrl;
            var content = roleMap[type].content;
            var title = roleMap[type].title;
            var width = roleMap[type].width;

            if (type === 'succ') {
                content = content
                        + '<div class="dialog-action">'
                        +     '<a class="btn-primary turn-to-teacherdetail" '
                        +     'href="' + teacherDetailUrl + '">去老师主页看看吧</a>'
                        +     '<button class="btn-default close-comment-resule">关闭评价页面</button>'
                        + '</div>'
            }
            var dialog = new Dialog({
                title: title,
                content: content,
                skinClass: 'comment-result-dialog',
                disposeOnHide: true,
                width: width
            });

            var element = dialog.element;

            element
            .on('click', '.close-comment-resule', function () {
                window.close();
            })

            .on('click', '.cancel-comment-resule', function () {
                dialog.hide();
            });
        }

    };

    var roleMap = {

        succ: {
            title: '评价成功',
            content:   '<div class="comment-result-content">'
                     +     '<i class="icon icon-check-circle"></i>'
                     +     '<div class="msg-content">'
                     +         '<div class="msg-content-title">恭喜你完成了对老师的评价！</div>'
                     +         '<div class="msg-content-words">小秘书代替老师谢谢你哦~</div>'
                     +     '</div>'
                     + '</div>',
            width: 380
        },
        err: {
            title: '评价失败',
            content:   '<div class="comment-result-content">'
                     +     '<i class="icon icon-times-circle"></i>'
                     +     '<div class="msg-content">'
                     +         '<div class="msg-content-title-error">不好意思，评价失败了 --#</div>'
                     +     '</div>'
                     + '</div>'
                     + '<div class="dialog-action">'
                     +     '<button class="btn-default cancel-comment-resule">返回评价页面</button>'
                     + '</div>',
            width: 350
        }

    };

    return CommentResultDialog;

});