/**
 * @file 已登陆用户 － 留单弹窗（机构老师） － 至机构
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var Captcha = require('common/component/Captcha');
    var Editor = require('common/component/Editor');
    var form = require('common/form');
    var SaveButton = require('common/component/SaveButton');

    /**
     * 浅注册类
     *
     * @param {Object} options 配置信息
     * @property {string} options.title 弹窗的title
     * @property {string} options.objectNumber 对象编号，如果是机构，为机构编号，课程为课程编号
     * @property {string} options.contentType 内容类型
     * @property {Function=} options.onSuccess 登录成功后得回调
     */
    function AdvisoryDialog(options) {
        $.extend(this, AdvisoryDialog.defaultOptions, options);
        this.init();
    }

    AdvisoryDialog.prototype = {

        init: function () {

            var me = this;

            me.dialog = new Dialog({
                //默认为5
                zIndex: me.zIndex || 5,
                title: me.title,
                // 必须在这里读取，不然可能会因为 DOM 没加载完而拿不到模板
                content: $('#advisory-dialog-form').html(),
                width: me.width,
                skinClass: me.skinClass
            });

            var element = me.dialog.element;

            // 图形验证码 - 每次换一个验证码
            var captcha = new Captcha({
                element: element.find('#captcha'),
                captchaName: 'advisory',
                autoValidate: true,
                skipAuth: false
            });

            // 留言
            me.editor = new Editor({
                element: element.find('.form-editor'),
                maxLength: 50
            });

            me.validator = new Validator({
                realtime: true,
                element: element,
                fields: {
                    mobile: {
                        errors: {
                            required: '请输入手机号',
                            pattern: '请填写格式正确的手机号'
                        }
                    },
                    info: {
                        errors: {
                            maxlength: '请控制在50字内',
                            required: '请填写您想试听的内容',
                            pattern: '请填写正确的学习内容'
                        }
                    },
                    username: {
                        errors: {
                            required: '请输入姓名',
                            pattern: '请填写格式正确的姓名'
                        }
                    }

                }
            });

            // 保存表单
            me.saveBtn = new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    if (me.validator.validate()) {

                        var data = form.parse(element);

                        data.objectNumber = me.objectNumber;
                        data.contentType = me.contentType;

                        service
                        .createAdvisory({
                            objectNumber: data.objectNumber,
                            contentType: data.contentType,
                            mobile: data.mobile,
                            info: data.info,
                            captchaCode: data.captcha,
                            captchaName: 'advisory',
                            detailUrl: window.location.href
                        },
                        {
                            errorHandler: {
                                '1000070': function (response) { // 1分钟超过3次提交
                                    captcha.change();
                                    element.find('#captcha').show();
                                }
                            }
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                alert({
                                    title: '温馨提示',
                                    content: '稍后您将接到我们的电话，该通话对您完全免费，请放心接听！',
                                    width: 400,
                                    buttons: [
                                        {
                                            text: '我知道了',
                                            type: 'primary',
                                            handler: function () {
                                                this.hide();
                                                me.dialog.hide();
                                                me.onSuccess();
                                            }
                                        }
                                    ]
                                });
                            }
                        });
                    }

                }
            });

        },

        show: function () {
            this.dialog.show();
        },

        hide: function () {
            this.dialog.hide();
        }
    };

    AdvisoryDialog.defaultOptions = {
        title: '预约试听',
        width: 510,
        onSuccess: $.noop,
        skinClass: 'advisory-dialog'
    };


    return AdvisoryDialog;

});