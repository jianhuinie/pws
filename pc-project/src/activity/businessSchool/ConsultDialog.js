/**
 * @file 商学院 － 咨询表单
 * @author wangyujie
 */

define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var etpl = require('cobble/util/etpl');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var form = require('common/form');
    var service = require('common/service');

    /*
     * 免费咨询表单
     *
     * @param {Object} options
     */
    function ConsultDialog(options) {
        $.extend(this, options);
        this.init();
    }

    ConsultDialog.prototype = {
        init: function () {

            var me = this;

            var dialog = new Dialog({
                content: tpl(),
                width: 300,
                skinClass: 'consult-dialog'
            });

            var element = dialog.element;

            // 表单验证
            me.validator = new Validator({
                element: element,
                fields: {
                    info: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请输入留言内容'
                        }
                    },
                    realname: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请输入您的真实姓名'
                        }
                    },
                    org: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请输入您的机构全称'
                        }
                    },
                    city: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请输入您所在的城市'
                        }
                    },
                    mobile: {
                        rules: {
                            required: true,
                            pattern: /^1[34578](\d){9}$/,
                        },
                        errors: {
                            required: '请输入您的手机号',
                            pattern: '手机号格式错误'
                        }
                    }
                }
            });

            // 保存表单
            me.saveBtn = new SaveButton({
                element: element.find('.btn-consult'),
                save: function () {
                    var data = form.parse(element);
                    if (me.validator.validate()) {
                        service
                        .addConsultAjax(data)
                        .done(function (response) {
                            if (response.code === 0) {
                                success('提交成功', function () {
                                    element.find('.dialog-close').trigger('click');
                                });
                            }
                        });
                    }
                }
            });
        }
    }

    var tpl = etpl.compile(''
            + '<div class="form">'
                + '<div class="form-group">'
                    + '<div class="form-controls">'
                        + '<div class="form-editor">'
                            + '<textarea class="form-text" name="info" required placeholder="\n\n请在此输入留言内容\n我们会尽快与您联系"></textarea>'
                        + '</div>'
                        + '<span class="error"></span>'
                    + '</div>'
                + '</div>'

                + '<div class="form-group">'
                    + '<div class="form-controls">'
                        + '<i class="icon icon-user"></i>'
                        + '<input class="form-text" type="text" name="realname" required placeholder="请输入您的真实姓名" />'
                        + '<span class="error"></span>'
                    + '</div>'
                + '</div>'

                + '<div class="form-group">'
                    + '<div class="form-controls">'
                        + '<i class="icon icon-org"></i>'
                        + '<input class="form-text" type="text" name="org" required placeholder="请输入您的机构全称" />'
                        + '<span class="error"></span>'
                    + '</div>'
                + '</div>'

                + '<div class="form-group">'
                    + '<div class="form-controls">'
                        + '<i class="icon icon-location"></i>'
                        + '<input class="form-text" type="text" name="city" required placeholder="请输入您所在的城市" />'
                        + '<span class="error"></span>'
                    + '</div>'
                + '</div>'

                + '<div class="form-group">'
                    + '<div class="form-controls">'
                        + '<i class="icon icon-mobile"></i>'
                        + '<input class="form-text" type="mobile" name="mobile" required placeholder="请输入您的手机号码" />'
                        + '<span class="error"></span>'
                    + '</div>'
                + '</div>'

                + '<div class="form-action">'
                    + '<button class="btn-consult">'
                        + '点击提交'
                    + '</button>'
                + '</div>'

            + '</div>'
    );

    return ConsultDialog;

});



