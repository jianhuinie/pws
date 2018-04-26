/**
 * @file 闪电约课
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');
    var consult = $('#consult');


    var form = require('common/form');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');


    /**
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.teacher_num 老师ID
     * @property {Function=} options.closeDialog 直接关闭窗口的回调
     */
    function QuickLessonDialog(options) {
        $.extend(this, options);
        this.init();
    }

    QuickLessonDialog.prototype = {

        init: function () {

            var me = this;

            var content = '<div class="prompt">闪电约课<span class="text-error">适合熟知彼此、长期上课</span>的师生使用，方便老师为学生排课。</div>'
                        + '<div class="prompt">开启闪电约课后：</div>'
                        + '<ul>'

                        +     '<li>'
                        +         '<label class="badge-info small">1</label>'
                        +         '<h2>自动确认约课</h2>'
                        +         '<p class="prompt">由老师向你发起的约课或时间修改，系统会替你自动确认，无需手动操作确认，轻松便捷享受课程。</p>'
                        +     '</li>'

                        +     '<li>'
                        +         '<label class="badge-info small">2</label>'
                        +         '<h2>自动确认课酬</h2>'
                        +         '<p class="prompt">课后如果未手动确认本节课酬，课酬将会在下课后24小时自动打款给老师。</p>'
                        +     '</li>'

                        +     '<li>'
                        +         '<label class="badge-info small">3</label>'
                        +         '<h2>课程通知</h2>'
                        +         '<p class="prompt">老师向你发起约课时，你在PC和手机APP会收到系统通知，如有异常，请及时操作取消约课，或及时联系我们的客服，保障资金安全。</p>'
                        +         '<p class="prompt"><a href="/static/app" target="_blank" class="text-info">立即下载APP，随时随地管理课程！</a></p>'
                        +     '</li>'

                        + '</ul>'

                        + '<div class="form">'

                        +     '<label class="form-checkbox">'
                        +         '<input type="checkbox" name="protocol" value="1" checked="checked" />'
                        +         '我已知晓闪电约课的功能及后果'
                        +     '</label>'

                        +     '<!--label class="form-checkbox">'
                        +         '<input type="checkbox" name="remind" value="0" />不再提醒'
                        +     '</label-->'

                        +     '<div class="dialog-action">'
                        +         '<button class="btn-primary btn-confirm">确认开启闪电约课</button>'
                        +         '<button class="btn-default btn-cancel">不开启闪电约课</button>'
                        +     '</div>'
                        + '</div>';

            var dialog = new Dialog({
                title: '<i class="icon icon-lightning"></i>闪电约课',
                skinClass: 'quick-lesson-dialog',
                content: content,
                width: 562
            });

            var element = dialog.element;

            // 保存表单
            var quickLessonSaveBtn = new SaveButton({
                element: element.find('.btn-confirm'),
                save: function () {

                    // 发送数据
                    var formData = form.parse(element);

                    if (formData.protocol) { // 勾选协议
                        service
                        .quickLesson({
                            qreserveSign: 1,
                            teacherNum: me.teacher_num,
                            remind: formData.remind
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                // 直接刷新吧
                                success('闪电约课开启', function () {
                                    location.reload();
                                });
                            }
                        });
                    }

                }
            });

            element
            .on('click', 'input[name="protocol"]', function (e) {

                var target = $(e.currentTarget);
                var form = target.closest('.form');

                if (!target.prop('checked')) {
                    form.find('.btn-confirm').prop('disabled', true);
                }
                else {
                    form.find('.btn-confirm').prop('disabled', false);
                }
            })

            .on('click', '.btn-cancel', function () {
                dialog.hide();
                me.closeDialog();
            })

            .on('click', '.dialog-close', function () {
                // 取消选择框的勾选
                me.closeDialog();
            });


        }

    }

    return QuickLessonDialog;

});