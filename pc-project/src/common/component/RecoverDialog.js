/**
 * @file 纠错 对话框
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    //var Select = require('cobble/form/Select');
    var Editor = require('common/component/Editor');
    var Input = require('cobble/helper/Input');
    var service = require('common/service');
    var store = require('common/store');
    var Validator = require('cobble/form/Validator');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.price
     */
    function RecoverDialog(options) {
        $.extend(this, options);
        this.init();
    }

    RecoverDialog.prototype = {

        init: function () {

            var me = this ;

            var list = ''
            + '<li data-value="1">老师时间不合适</li>'
            + '<li data-value="2">我的时间不合适</li>'
            + '<li data-value="3">对老师不满意</li>'
            + '<li data-value="100">其他</li>';

            var content = ''
            /*
            + '<div class="form-group">'
            +     '<label class="form-label">纠错类型：</label>'
            +     '<div class="form-controls">'

            +         '<div class="dropdown">'
            +             '<button class="btn-default">'
            +                 '<i class="caret"></i>'
            +                 '<span>请选择纠错类型</span>'
            +             '</button>'
            +             '<ul class="dropdown-menu">'
            +                 list
            +             '</ul>'
            +         '</div>'

            +     '</div>'
            + '</div>'
            */
            + '<div class="form">'
            + '<div class="form-group">'
            +     '<label class="form-label">错误描述：</label>'
            +     '<div class="form-controls">'
            +         '<div class="form-editor">'
            +         '<div class="wrapper">'
            +             '<textarea class="form-text reason" name="content" placeholder="请填写错误描述" required maxlength="200"></textarea>'
            +             '<span class="error"></span>'
            +             '<div class="form-hint">'
            +                 '还可以输入 <strong>200</strong> 个字'
            +             '</div>'
            +         '</div>'
            +         '</div>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group">'
            +     '<label class="form-label">您的姓名：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" name="name" class="name form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group">'
            +     '<label class="form-label">联系方式：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" name="contact" class="contact form-text" required minlength="6" maxlength="26" />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="dialog-action">'
            +     '<button class="btn-primary btn-confirm">确定</button>'
            +     '<button class="btn-default btn-cancel">取消</button>'
            + '</div>'
            + '</div>';

            var dialog = new Dialog({
                title: '纠错信息',
                skinClass: 'recover-dialog',
                content: content,
                disposeOnHide: true,
                width: 500
            });

            var element = dialog.element;

            var input = new Input({
                element: element.find(':text'),
            });

            var editor = new Editor({
                element: element.find('.form-editor'),
                maxLength: 200
            });

            var validator = new Validator({
                realtime: true,
                element: $('.recover-dialog'),
                fields: {
                    name: {
                        errors: {
                            required: '请输您的姓名',
                            pattern: '请输入正确的手机号'
                        }
                    },
                    contact: {
                        errors: {
                            required: '请输入联系方式',
                            minlength: '最小长度长为 6 个',
                            maxlength: '最大长度长为 26 个'
                        }
                    },
                    content: {
                        errors: {
                            required: '请输错误描述',
                            maxlength: '最大长度长为 200 字'
                        }
                    }
                }
            });

            element
            .on('click', '.btn-confirm', function (e) {
                if (validator.validate()) {
                    //var reasonType = element.find('.dropdown-menu .active').first().data('value');
                    var content = element.find('.reason').val();
                    var name = element.find('.name').val();
                    var contact = element.find('.contact').val();
                    dialog.hide();

                    if (me.type == 'org') {
                        var data = {
                            orgId: store.get('orgId'),
                            name: name,
                            contact: contact,
                            content: content
                        };
                        service
                        .sendOrgRecover(data)
                        .done(function (response) {
                            if (response.code === 0) {
                                alert('提交成功，谢谢你的反馈！','温馨提示');
                            }
                        });
                    } else {
                        var data = {
                            number: store.get('teacherNum'),
                            name: name,
                            contact: contact,
                            content: content
                        };
                        service
                        .sendTeacherRecover(data)
                        .done(function (response) {
                            if (response.code === 0) {
                                alert('提交成功，谢谢你的反馈！','温馨提示');
                            }
                        });
                    }

                }

            })
            .on('click', '.btn-cancel', function () {
                dialog.hide();
            });

        }

    }

    return RecoverDialog;

});