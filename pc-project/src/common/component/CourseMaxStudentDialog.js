/**
 * @file 修改班课人数 对话框
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var service = require('common/service');
    var store = require('common/store');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var consult = $('#consult');

    /**
     * @constructor
     * @param {Object} options
     * @property {Array} options.course
     */
    function CourseMaxStudentDialog(options) {
        $.extend(this, options);
        this.init();
    }

    CourseMaxStudentDialog.prototype = {

        init: function () {

            var me = this;

            var content = ''
            + '<div class="form">'

            + '<div class="form-group">'
            +     '<label class="form-label">老师，目前该班课已经报名' + me.nowStudent + '人，你只能修改班级人数哦~</label>'
            +     '<div class="form-controls">'
            +         '将班级人数修改为：'
            +         '<div class="input-group" style="vertical-align: middle">'
            +            '<input class="form-text" width="100" type="int" name="max_student" min="' + me.nowStudent + '" max="999999" required />'
            +            '<span class="input-group-addon">人</span>'
            +            '<span class="error"></span>'
            +        '</div>'
            +     '</div>'
            + '</div>'

            + '</div>'
            + '<div class="dialog-action">'
            +     '<button class="btn-primary btn-confirm">确定</button>'
            +     '<button class="btn-default btn-cancel">取消</button>'
            + '</div>';

            var dialog = new Dialog({
                title: '温馨提示',
                skinClass: 'consult-dialog',
                content: content,
                width: 410
            });

            var element = dialog.element;

            var validator = new Validator({
                realtime: true,
                element: element,
                fields: {
                    max_student: {
                        errors: {
                            required: '请输入班级人数',
                            pattern: '班级人数设置有误',
                            min: '不能少于已报名人数哦',
                            max: '最多只能设置 999999 个学生哦~'
                        }
                    }
                }
            });

            element
            .on('click', '.btn-confirm', function (e) {

                if (validator.validate()) {

                    var formData = form.parse(element);

                    service
                    .upsertClassCourse({
                        number: me.number,
                        maxStudent: formData.max_student
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            dialog.hide();
                            success('修改成功！', function () {
                                location.reload();
                            });
                        }
                    });

                }

            })

            .on('click', '.btn-cancel', function () {
                dialog.hide();
            });

        }

    }

    return CourseMaxStudentDialog;

});