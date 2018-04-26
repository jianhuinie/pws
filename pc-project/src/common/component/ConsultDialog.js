/**
 * @file 咨询 对话框
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Select = require('cobble/form/Select');
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
    function ConsultDialog(options) {
        $.extend(this, options);
        this.init();
    }

    ConsultDialog.prototype = {

        init: function () {

            var content = ''
            + '<div class="form">'

            + '<div class="form-group">'
            +     '<label class="form-label">选择科目：</label>'
            +     '<div class="form-controls">'
            +         '<div class="dropdown consult-course" required>'
            +             '<button class="btn-default">'
            +                 '<i class="caret"></i>'
            +                 '<span>请选择</span>'
            +             '</button>'
            +             '<ul class="dropdown-menu"></ul>'
            +         '</div>'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group lesson-way">'
            +     '<label class="form-label">上课方式：</label>'
            +     '<div class="form-controls">'
            +         '<div class="dropdown" required>'
            +               '<button class="btn-default">'
            +                   '<i class="caret"></i>'
            +                   '<span>请选择</span>'
            +               '</button>'
            +               '<ul class="dropdown-menu">'
            +                   '<li data-value="teacher">老师上门</li>'
            +                   '<li data-value="student">学生上门</li>'
            +                   '<li data-value="online">在线授课</li>'
            +                   '<li data-value="discuss">双方协商</li>'
            +               '</ul>'
            +         '</div>'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group">'
            +     '<label class="form-label">你的姓名：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" name="name" class="name form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group contact-way">'
            +     '<label class="form-label">联系方式：</label>'
            +     '<div class="form-controls">'
            +         '<input type="mobile" name="mobile" placeholder="手机号" class="contact form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group">'
            +     '<label class="form-label">咨询问题：</label>'
            +     '<div class="form-controls">'
            +         '<div class="form-editor">'
            +         '<div class="wrapper">'
            +             '<textarea type="text" class="form-text reason" name="content" placeholder="请输入你想要咨询的问题" required></textarea>'
            +             '<span class="error"></span>'
            +         '</div>'
            +         '</div>'
            +     '</div>'
            + '</div>'

            + '</div>'
            + '<div class="dialog-action">'
            +     '<button class="btn-primary btn-confirm">确定</button>'
            +     '<button class="btn-default btn-cancel">取消</button>'
            + '</div>';

            var dialog = new Dialog({
                title: '咨询我们',
                skinClass: 'consult-dialog',
                content: content,
                width: 560
            });

            var element = dialog.element;

            var lessonwayList = [];
            var teachStyle = '';
            for (var i = 0, len = this.course.length, name; i < len; i++) {
                if (len === 1) {
                    var tmp = this.course[0].price ;
                    var counter = 0;
                    for (var p in tmp) {
                        if (tmp[p]) {
                            counter++;
                            teachStyle = p ;
                        }
                    }
                    if (counter > 1) {
                        teachStyle = '';
                    }
                }
                name = this.course[i].name;
                lessonwayList.push( { text: name, value: name });
            }

            var courseSelect = new Select({
                element: element.find('.consult-course'),
                data: lessonwayList,
                name: 'course'
            });

            var lessonwaySelect = new Select({
                element: element.find('.lesson-way .dropdown'),
                name: 'lessonway'
            });

            // 如果只有一个值则默认选中该值
            if (lessonwayList.length === 1) {
                courseSelect.setValue(lessonwayList[0].value);
                if (teachStyle) {
                    lessonwaySelect.setValue(teachStyle);
                }
            }

            var validator = new Validator({
                realtime: true,
                element: element,
                fields: {
                    course: {
                        errors: {
                            required: '请选择科目'
                        }
                    },
                    lessonway: {
                        errors: {
                            required: '请选择上课方式'
                        }
                    },
                    name: {
                        errors: {
                            required: '请输您的姓名'
                        }
                    },
                    mobile: {
                        errors: {
                            required: '请输入联系方式',
                            pattern: '请输入正确的手机号'
                        }
                    },
                    content: {
                        errors: {
                            required: '请输入你想要咨询的问题'
                        }
                    }
                }
            });

            element
            .on('click', '.btn-confirm', function (e) {
                if (validator.validate()) {

                    var formData = form.parse(element);

                    var data = {
                        teacherId: store.get('teacherId'),
                        userName : formData.name,
                        mobile : formData.mobile,
                        courseName : formData.course,
                        lessonWay : formData.lessonway,
                        info: formData.content
                    };

                    service
                    .recommendAddRecord(
                        data
                    )
                    .done(function (response) {
                        if (response.code === 0) {
                            dialog.hide();
                            alert('提交成功！');
                        }
                    });
                }

            })

            .on('click', '.btn-cancel', function () {
                dialog.hide();
            });

            // 如果用户已登录，则自动填充名称和手机号
            var user = store.get('user');
            if( user && user.name ) {
                element.find('input[name="name"]').val(user.name);
                element.find('input[name="mobile"]').val(user.mobile);
            }
        }

    }

    return ConsultDialog;

});