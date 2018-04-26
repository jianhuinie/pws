/**
 * @file 帮我找老师 - 成功弹框
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var consult = $('#consult');

    /**
     * @constructor
     * @param {Object} options
     * @property {Function=} options.closeDialog 直接关闭窗口的回调
     */
    function FindTeacherConfirmDialog(options) {
        $.extend(this, options);
        this.init();
    }

    FindTeacherConfirmDialog.prototype = {

        init: function () {

            var me = this;

            //留单至老师的话术不一致  做特殊处理
            var content = '<div class="confirm-right"></div>'
                        + '<div class="confirm-left">';
            if (this.sendToteacher) {
                content += '<p>'
                        +      '我们已经将您的预约信息发送给老师<br>请您耐心等待老师回复'
                        +  '</p>'
                        +  '<p>'
                        +      '立即扫描右侧二维码下载跟谁学APP，随时随地发现精彩课程！'
                        +  '</p>';
            }
            else {
                content += '<p>'
                        +      '您已经成功预约了该老师的课程<br>课程顾问将尽快联系您,请留意来电信息'
                        +  '</p>'
                        +  '<p>'
                        +      '请扫描右侧二维码下载跟谁学APP进入“帮我找老师”查看您的找老师需求'
                        +  '</p>';
            }

            content += '</div>'
                    +  '<div class="dialog-action">'
                    +      '<button class="btn-info btn-confirm">确认</button>'
                    +  '</div>';

            var dialog = new Dialog({
                title: '成功提交',
                skinClass: 'find-teacher-confirm-dialog',
                content: content,
                width: 450
            });

            var element = dialog.element;
            
            element
            .on('click', '.btn-confirm', function () {
                dialog.hide();
                me.previousDialog.hide();
            });


        }

    }

    return FindTeacherConfirmDialog;

});