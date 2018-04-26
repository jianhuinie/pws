/**
 * @file PC引导学生关注公众号
 * @author wanglu
 * Date: 2017-05-26T15:31Z
 */

define(function(require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');

    
     function EnrollSuccessDialog(options) {
         $.extend(this, options);
         this.init();
    }

    EnrollSuccessDialog.prototype= {
        init: function () {
            var content = '';
            

            content += '<div>'
                    +       '<div class="nav-left">'
                    +           '<span class="nav-left-img"></span>'
                    +           '<span class="nav-left-text">报名成功</span>'
                    +       '</div>';
            if (this.courseType === 3) {
                 content += '<div class="text-middle">上课须知：可以在“我的视频课”中找到视频课并学习，别忘记对购买的视频课发表一些评价哦。 </div>';
            }
            else if (this.courseType === 2) {
                 content += '<div class="text-middle">上课须知：可以通过“我的课表”进入教室学习，记得要准时上课哦。</div>';
            } 
            else {
                content += '<div class="text-middle">上课须知：可以通过“我的课表”查看最近的课程安排，记得要准时上课哦。</div>';
            }
            content +=      '<div class="qrcode-image"></div>'    
                    +       '<div class="right-top">'
                    +           '<span>关注</span><span class="text-yellow">跟谁学学生版</span>'
                    +        '</div>'
                    +       '<div class="right-foot">好课带回家，上课不迟到</div>'
                    +       '<div class="close-icon"></div>'
                    +  '</div>';
            var dialog = new Dialog({
                content: content,
                skinClass: 'enroll-success-dialog',
                width:430
            });
            var element = dialog.element;
            element
                .on('click', '.close-icon', function (e) { 
                    dialog.hide();
                    location.reload();
                });
        }
    }

    return EnrollSuccessDialog;
});