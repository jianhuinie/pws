/**
 * @file 跟谁学发布会
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');

    exports.init = function () {
        var container = $('.main');
        var me = this;
        var element = container.find('.form');

        // 验证对象
        me.validator = new Validator({
            element: element,
            fields: {
                name: {
                    errors: {
                        pattern: '请填写真实姓名',
                        required: '请填写姓名'
                    }
                },
                company: {
                    errors: {
                        required: '请填写公司名',
                        pattern: '请填写正确的公司名'
                    }
                },
                job: {
                    errors: {
                        required: '请填写职位',
                        pattern: '请填写正确的职位'
                    }
                },
                mobile: {
                    errors: {
                        required: '请填写手机号',
                        pattern: '请填写正确的手机号'
                    }
                },
                email: {
                    errors: {
                        required: '请填写邮箱',
                        pattern: '请填写正确的邮箱'
                    }
                }
            }
        });

        container
        .on('blur', '[name="name"]', function () {
            me.validator.validate('name');
        })
        .on('blur', '[name="company"]', function () {
            me.validator.validate('company');
        })
        .on('blur', '[name="job"]', function () {
            me.validator.validate('job');
        })
        .on('blur', '[name="mobile"]', function () {
            me.validator.validate('mobile');
        })
        .on('blur', '[name="email"]', function () {
            me.validator.validate('email');
        });

        // 保存表单
        me.saveButton = new SaveButton({
            element: element.find('.submit'),
            saveText: '正在提交...',

            save: function () {
                // 验证后操作

                if (me.validator.validate()) {
                    var name = element.find('input[name="name"]');
                    var company = element.find('input[name="company"]');
                    var position = element.find('input[name="job"]');
                    var mobile = element.find('input[name="mobile"]');
                    var email = element.find('input[name="email"]');

                    return service
                    .conference(
                        {
                            name: name.val(),
                            company: company.val(),
                            position: position.val(),
                            mobile: mobile.val(),
                            email: email.val(),
                        }
                    )
                    .done(function (response) {

                        if (response.code === 0) {
                            alert({
                                title: '温馨提示',
                                content: '报名成功，我们将尽快与您取得联系。',
                                buttons: [
                                    {
                                        text: '确定',
                                        type: 'primary',
                                        handler: function () {
                                            name.val('');
                                            company.val('');
                                            position.val('');
                                            mobile.val('');
                                            email.val('');
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                    });
                }
            }
        });
    }
});