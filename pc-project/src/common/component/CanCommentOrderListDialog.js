/**
 * @file 班课开通权限进度 对话框 [废弃]
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');

    /**
     * @constructor
     * @param {Object} options
     * @property {Array} options.commentList
     */
    function CanCommentOrderListDialog(options) {
        $.extend(this, options);
        this.init();
    }

    CanCommentOrderListDialog.prototype = {

        init: function () {

            var me = this;
            var courseMap = {
                1: '一对一',
                2: '班课',
                3: '视频课',
                4: '班课',
                5: '试听课'
            };
            var content = '<ul class="can-comment-order-list">';
            var truncate = false;
            $.each(me.commentList, function (index, item) {

                var data = $(item)[0];

                if (data.course_name.length > 16) {
                    truncate = true;
                } else {
                    truncate = false;
                }

                content = content
                        +  '<li>'
                        +      '<span class="course-name" ';

                if (truncate) {
                    content = content
                            + 'data-title="'
                            + data.course_name
                            + '" data-width="20em"';
                }

                content = content
                        +      ' >';

                if (truncate) {
                    content = content
                            +     data.course_name.substr(0, 16)
                            + '...';
                } else {
                    content = content
                            +     data.course_name
                }

                content = content
                        +      '</span>'
                        +      '<span class="course-cat">'
                        +          courseMap[data.type]
                        +      '</span>'
                        +      '<span class="course-remain">'
                        +          '待评价 ' + data.lesson_unfinished_count + ' 课节'
                        +      '</span>'
                        +      '<a class="btn small btn-primary" href="/comment/purchaseInfo?purchase_id=' + data.purchase_id + '">'
                        +          '去评价'
                        +      '</a>'
                        +  '</li>'
            });


            var content = content + '</ul>';

            var dialog = new Dialog({
                title: '选择你想评价的课程',
                skinClass: 'can-comment-order-dialog',
                content: content,
                width: 570
            });

            Tooltip.init($('[data-title]'));
        }

    }

    return CanCommentOrderListDialog;

});