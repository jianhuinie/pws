/**
 * @file 黑板报报名
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    // var MobileInput = require('common/component/MobileInput');
    var CodeButton = require('common/component/CodeButton');
    var Captcha = require('common/component/Captcha');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var store = require('common/store');
    var SaveButton = require('common/component/SaveButton');

    var container = $('#report');
    var mobileInput;
    var captcha, loginMobileCaptcha, currentStatus;

    var captchaTpl = ''
        +   '<div class="form-block captcha form-captcha">'
        +       '<div class="form-group">'
        +           '<label class="form-label">验证码</label>'
        +           '<div class="form-controls">'
        +               '<span class="input-group">'
        +                   '<input class="form-text" type="text" name="captcha" '
        +                       'required minlength="4" maxlength="4" placeholder="请输入图中的数字">'
        +                   '<span class="input-group-addon">'
        +                       '<img class="captcha-image" src="/captcha?captcha_name=exceed_count&' + $.now() + '" />'
        +                   '</span>'
        +               '</span>'
        +               '<span class="error"></span>'
        +           '</div>'
        +           '<div class="form-hint">'
        +               '<span class="btn-link btn-change-captcha">换一张</span>'
        +           '</div>'
        +       '</div>'
        +   '</div>';

    /*
     * 获取校验码按钮 开启与关闭
     */
    function validateMobile(validator, codeBtn) {
        if (validator.validate('mobile') && !codeBtn.isCounting) {
            codeBtn.element.prop('disabled', false);
        }
        else {
            codeBtn.element.prop('disabled', true);
        }
    }
    //设置行间样式
    var detail = container.find('.report_detail');
    var label = detail.find('label');
    var height = label.length;
    var lineheight;
    if (height == 3) {
        lineheight = '50px';
    }else{
        lineheight = '35px';

    };
    label
    .each(function (i, item) {
        label.css('line-height',lineheight);
    });

    // 获取语音校验码
    function sendVoiceCode(flag) {
        if (flag === true) {
            return service
                    .getSMSCode({
                        mobile: $.trim(mobileInput.val()),
                        captcha: (loginMobileCaptcha && loginMobileCaptcha.getValue()) || '',
                        captcha_name: 'common',
                        type: 'voice'
                    });
        }
        if (!$.trim(mobileInput.val())) {
            alert('请输入手机号');
        }
        else {
            currentStatus = 'voice';
            if (loginMobileCaptcha && !loginMobileCaptcha.hidden) {
                if (!loginMobileCaptcha.validate()) {
                    return false;
                }
            }
            alert({
                title: '获取语音校验码',
                content: '校验码将以电话形式通知到你，请注意接听',
                buttons: [
                    {
                        text: '获取',
                        type: 'primary',
                        handler: function () {
                            this.hide();

                            service
                            .getSMSCode({
                                mobile: $.trim(mobileInput.val()),
                                captcha: (loginMobileCaptcha && loginMobileCaptcha.getValue()) || '',
                                captcha_name: 'common',
                                type: 'voice'
                            }, {
                                errorHandler: {
                                    1000111: function () {
                                       loginMobileCaptcha.show();
                                       loginMobileCaptcha.change();
                                       setTimeout(function() {
                                            loginMobileCaptcha.validate();
                                       });
                                    }
                                }
                            });

                        }
                    },
                    {
                        text: '取消',
                        handler: function () {
                            this.hide();
                        }
                    }

                ]
            });
        }
    }

    exports.init = function () {


        // 语音验证码
        var voiceCode = container.find('.voice-code-link');
        voiceCode.on('click', '.btn-link', sendVoiceCode);

        // 验证码
        var validator = new Validator({
            realtime: true,
            element: container.find('.check_box'),
            fields: {
                username: {
                    errors: {
                        required: '请输入姓名',
                        pattern: '请输入正确的姓名',
                        maxlength: '输入有误'
                    }
                },
                mobile: {
                    errors: {
                        required: '请输入手机号',
                        pattern: '请输入正确的手机号'
                    }
                },
                verifycode: {
                    errors: {
                        required: '请输入校验码',
                        pattern: '请输入正确的校验码'
                    }
                }

            }
        });

        var smsGroup = container.find('.form-sms'); // 验证码
        var codeInput = smsGroup.find('.sms'); // 验证码输入框
        var codeBtn = smsGroup.find('.form-get-smscode'); // 获取校验码按钮
        var codeInputWidth = codeInput.width();

        /*/ 手机号
        mobileInput = new MobileInput({
            element: container.find('#mobile'),
            validator: validator,
            onInputChange: function (e) {
                if (captcha) {
                    captcha.hide();
                }
            }
        });*/
        mobileInput = container.find('input[type="mobile"]');

        // 获取验证码
        var codeButton;
        var codeBtn = container.find('.form-get-smscode');
        codeButton = new CodeButton({
            element: codeBtn,
            send: function () {
                var mobile = $.trim(mobileInput.val());
                var type = 'common';
                currentStatus = 'sms';

                return service
                .getSMSCode({
                    mobile: mobile,
                    type: type,
                    captcha: (loginMobileCaptcha && loginMobileCaptcha.getValue()) || ''
                }, {
                    errorHandler: {
                        1000111: function () {
                            if (!loginMobileCaptcha) {
                                $(captchaTpl.replace('exceed_count', type)).insertBefore('.form-group.form-sms');
                                loginMobileCaptcha = new Captcha({
                                    element: container.find('.form-block.captcha'),
                                    captchaName: type,
                                    skipAuth: false,
                                    autoValidate: true,
                                    onValid: function () {
                                        loginMobileCaptcha.hide();
                                        if (!currentStatus || currentStatus === 'sms') {
                                            codeBtn.prop('disabled', false);
                                            codeButton.sendCode();
                                        } else {
                                            sendVoiceCode(true);
                                        }
                                        codeInput.focus();
                                        setTimeout(function () {
                                            loginMobileCaptcha.input.val('');
                                        });
                                    },
                                    onInvalid: function () {
                                        codeBtn.prop('disabled', true);
                                    }
                                });
                            } else {
                                loginMobileCaptcha.change();
                            }
                            loginMobileCaptcha.show();
                            setTimeout(function () {
                                loginMobileCaptcha.validate();
                            }, 0);
                        }
                    }
                })
                .done(function (response) {
                    if (response.code == 0) {
                        codeInput.focus();
                    }
                });
            },
            onTextChange: function () {
                /*
                codeInput.outerWidth(
                    // 计算太烦了，减 2 比较保险不换行
                    smsGroup.width() - codeBtn.outerWidth(true) - 2
                );
                */
            }
        });

        var checkbox = container.find('.check_box');

        container
        .on('click', '#nowreport', function (e) {
            checkbox.show();
        })
        .on('blur', 'input[type="mobile"]', function (e) {
            validateMobile(validator, codeButton);
        })
        .on('click','.back',function (e){
            checkbox.hide();
        });

        // 保存表单
        new SaveButton({
            element: container.find('.sure'),
            save: function () {

                var flag = true;

                // 验证后添加表单项
                container.find('.agile')
                .each(function (i, item) {
                    var input = $(item).find('input');
                    var value = input.val();
                    var name = $(item).find('.form-label').text();
                    // 必填
                    var required = input.attr('required');
                    if (required && value == '') {
                        flag = false;
                        alert(name + '不能为空');
                    }
                    // 最长100字符
                    if (value.length > 100) {
                        flag = false;
                        alert('请将' + name + '字数控制在50字以内');
                    }
                });

                if (validator.validate() && flag) {
                    // 组织数据
                    var username = container.find("input[name='username']").val();
                    var mobile = container.find("input[name='mobile']").val();
                    var signInfo = {};
                    signInfo.name = username;
                    signInfo.mobile = mobile;

                    container.find('.agile')
                    .each(function (i, item) {
                        var input = $(item).find('input');
                        var value = input.val();
                        var aname = input.attr('name');
                        signInfo[aname] = value;

                    });

                    var smscode = container.find("input[name='verifycode']").val();

                    // 发送请求
                    service
                    .createReport({
                        signInfo: signInfo,
                        board_id: store.get('blackBoradId'),
                        smscode: smscode,
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            var data = response.data;
                            alert({
                                content: '恭喜您，报名成功<i class="icon icon-check-o"></i>',
                            });
                            checkbox.hide();
                            var btn = container.find('.succ');
                            var oldbtn = container.find('.old');
                            oldbtn.hide();
                            btn.show();

                        }
                    });
                }

            }
        });


    }

});