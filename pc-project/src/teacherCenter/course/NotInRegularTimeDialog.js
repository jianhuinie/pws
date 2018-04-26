define(function (require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var Editor = require('common/component/Editor');

    /**
     * 构造函数
     * @param {string} options.courseNumber 班课number
     * @param {Function=} options.onSuccess 成功后的回调
     */
    function NotInRegularTimeDialog(options) {
        $.extend(this, options);
        this.init();
    }

    NotInRegularTimeDialog.prototype = {
        init: function () {

            var me = this;

            var content = ''
                +   '<div class="message">'
                +       '<p>'
                +           '你的课程没有设置在常规课程时间段内（线下班课8:00-22:00，线上班课8:00-23:00），</br>'
                +           '请在下面填写需要选择特殊时段的原因，否则可能会导致审核不通过哦~'
                +       '</p>'
                +       '<div class="form">'
                +           '<div class="form-group">'
                +               '<label class="form-label">'
                +                   '<i class="form-required"></i>特殊时段原因：'
                +               '</label>'
                +               '<div class="form-controls">'
                +                   '<textarea class="form-text" name="reason" required></textarea>'
                +                   '<span class="form-hint"></span>'
                +                   '<span class="error"></span>'
                +               '</div>'
                +           '</div>'
                +       '</div>'
                +       '<div class="form-action">'
                +           '<button class="btn-primary submit">保存</button>'
                +           '<button class="btn-default cancel">返回</button>'
                +       '</div>'
                +   '</div>';

            var dialog = new Dialog({
                title: '温馨提示',
                content: content,
                width: 600,
                skinClass: 'not-in-regular-time-dialog'
            });

            var element = dialog.element;

            var validator = new Validator({
                element: element.find('.form'),
                fields: {
                    reason: {
                        errors: {
                            required: '请输入原因'
                        }
                    }
                }
            });

            var editor = new Editor({
                element: element,
                minLength: 0,
                maxLength: 100
            });

            element
            .on('click', '.submit', function () {
                if (validator.validate()) {

                    var value = editor.getValue();

                    service
                    .classCourseSpecialTimeReason({
                        reason: value,
                        course_number: me.courseNumber
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            dialog.hide();
                            success('提交成功', function () {
                                if ($.isFunction(me.onSuccess)) {
                                    me.onSuccess();
                                }
                            });
                        }
                    })
                }
            })
            .on('click', '.cancel', function () {
                dialog.hide();

                if ($.isFunction(me.onCancel)) {
                    me.onCancel();
                }
            });
        }
    }

    return NotInRegularTimeDialog;
});