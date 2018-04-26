/**
 * @file 帮我找老师
 * @author wangyujie
 */
define(function(require, exports) {

    'use strict';

    var Select = require('cobble/form/Select');
    var AddressForm = require('../teacherCenter/component/AddressForm');
    var Editor = require('common/component/Editor');
    var store = require('common/store');
    var Captcha = require('common/component/Captcha');
    var MobileInput = require('common/component/MobileInput');
    var CodeButton = require('common/component/CodeButton');
    var cookie = require('cobble/util/cookie');

    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var form = require('common/form');
    var service = require('common/service');

    var mobileInput, codeBtn, voiceCode, captcha;
    var container = $('#main');
    //验证码错误提示框
    var verifycodeerror = container.find('#verify-code-error');
    //手机错误提示框
    var mobileerror = container.find('#mobile-error');
    //给手机发送验证码button
    var verifycodebutton = container.find('#verifycodebutton');
    var currentStatus;

    exports.init = function() {

        var me = this;
        var newAddress = container.find('.new-address');
        var isForceVoice = store.get('isForceVoice');

        // 想学科目
        me.catSelect1 = new Select({
            element: container.find('.category1'),
            name: 'category1',
            onChange: function () {
                getSubjectList(this.value)
                .done(function (response) {
                    if (response.code === 0) {
                        me.catSelect2.refresh({
                            data: convert(response.data.list)
                        });
                    }
                });
            }
        });

        me.catSelect2 = new Select({
            element: container.find('.category2'),
            name: 'category2',
            onChange: function () {
                getSubjectList(this.value)
                .done(function (response) {
                    if (response.code === 0) {
                        me.catSelect3.refresh({
                            data: convert(response.data.list)
                        });
                    }
                });
            }
        });

        me.catSelect3 = new Select({
            element: container.find('.category3'),
            name: 'category3'
        });

        getSubjectList()
        .done(function (response) {
            if (response.code === 0) {
                me.catSelect1.refresh({
                    data: convert(response.data.list)
                });
            }
        });

        // 上课地址
        me.addressForm = new AddressForm({
            element: newAddress,
            filter: 'seek_teacher'
        });

        // 更多描述
        me.editor = new Editor({
            element: container.find('.message-txt .form-editor'),
            maxLength: 40
        });

        // 未登录用户显示 手机号等信息
        if (!store.get('user').id) {
            container.find('.no-login').show();
        }

        // 手机号
        mobileInput = new MobileInput({
            element: container.find('#mobile'),
            onChange: function () {
                if (this.isInternational()) {
                    voiceCode.parent().hide();
                }
                else if (codeBtn.isCounting){
                    voiceCode.parent().show();
                }
            },
            validator: validator
        });

        var enableCodeBtn = function() {
            if (!codeBtn.isCounting) {
                if (validator.validate('mobile') && captcha.isValid) {
                    codeBtn.element.prop('disabled', false);
                }
            }
        }

        var disableCodeBtn = function () {
            if (!codeBtn.isCounting) {
                codeBtn.element.prop('disabled', true);
            }
        }

        // 给验证码错误提示框加上样式
        verifycodeerror.css({
                            'position':'absolute',
                            'width':'200px',
                            'left':'100px',
                            'top':'-50px'
                        });
        // 给手机验证码错误提示框加上样式
        mobileerror.css({
                            'position':'absolute',
                            'width':'200px',
                            'right':'-110px',
                            'top':'-30px'
                        });

        /**
         * 表单校验
         */
        var validator = new Validator({
            realtime: true,
            element: $('#seek-form'),
            fields: {
                mobile: {
                    errors: {
                        required: '请输入手机号',
                        pattern: '请输入正确的手机号'
                    }
                },
                verifycode: {
                    errors: {
                        required: '请输入校验码',
                        pattern: '请输入校验码'
                    }
                },
                message_txt: {
                    rules: {
                        maxlength: 40
                    },
                    errors: {
                        maxlength: '请不要超过 40 个字'
                    }
                }

            }
        });

        container
        //手机输入框失去焦点时检查号码输入是否正确
        .on('blur', 'input[name="mobile"]', function(e){
            if (validator.validate('mobile')) {
                enableCodeBtn();
            }
            else {
                disableCodeBtn();
            }
        })

        .on('change', ':radio[name="lesson_type"]', function (e) {
            var radio = $(e.currentTarget);
            var value = radio.prop('value');
            if (value != 2) {
                newAddress.show();
            }
            else {
                newAddress.hide();
            }
        });

        if (isForceVoice) {
            voiceCode = container.find('.voice-code-btn');
        }
        else {
            voiceCode = container.find('.voice-code-link span');
            voiceCode.on('click', sendVoiceCode);
        }

        /**
         * 发送验证码
         */
        var verifyCodeInput = container.find('#verify-code');

        if (isForceVoice) {
            codeBtn = new CodeButton({
                element: voiceCode,
                send: function () {
                    var deferred = $.Deferred();
                    currentStatus = 'voice';
                    sendVoiceCode(true, deferred);
                    return deferred.promise();
                },
                onTextChange: function () {
                    verifyCodeInput.outerWidth(
                        260 - codeBtn.element.outerWidth()
                    );
                }
            });
        }
        else {
            codeBtn = new CodeButton({
                element: verifycodebutton,
                send: function () {
                    if (!mobileInput.isInternational()) {
                        voiceCode.parent().show();
                    }
                    if (captcha.hidden && captcha.getValue() == '') {
                        captcha.show();
                        captcha.change();
                        captcha.validate();
                        return ;
                    }
                    verifyCodeInput.width(102);
                    currentStatus = 'sms';
                    return service
                    .getSMSCode({
                        type: "signin",
                        mobile: mobileInput.getMobile(),
                        captcha: captcha.getValue(),
                        captcha_name: captcha.captchaName
                    });

                },
                onTextChange: function() {
                    verifyCodeInput.outerWidth(
                        260 - codeBtn.element.outerWidth()
                    );
                }
            });
        }

        /**
         * 图形验证码
         */
        captcha = new Captcha({
            element: container.find('#captcha'),
            captchaName: 'signin',
            autoValidate: true,
            skipAuth: false,
            onBeforeValidate: function () {
                disableCodeBtn();
            },
            onValid: function () {
                captcha.hide();
                enableCodeBtn();
                if (!currentStatus || currentStatus === 'sms') {
                    codeBtn.sendCode();
                } else {
                    service
                        .sendVoiceSMS({
                            mobile: mobileInput.getMobile(),
                            captcha: captcha.getValue(),
                            captchaName: captcha.captchaName
                        });
                }
                verifyCodeInput.focus();
                setTimeout(function () {
                    captcha.input.val('');
                }, 0);
            },
            onInvalid: function () {
                disableCodeBtn();
            }
        });

        /**
         * 提交 帮我推荐
         */
        var saveButton = new SaveButton({
            element: container.find('.btn-recommend'),
            saveText: '正在发送...',
            save: function () {
                var result = validator.validate();

                var data = form.parse(validator.element);

                if (!data.category3) {
                    alert('请选择您想学的科目');
                    return;
                }

                if (data.lesson_type == 1 && (!data.area || data.location_addr == '')) {
                    alert('上课地址不能为空哦~');
                    return;
                }

                if (result) {

                    service
                    .seekTeacher({
                        subjectId: data.category3,
                        teacherSex: data.teacher_sex,
                        lessonType: data.lesson_type,
                        payBound: data.pay_bound,
                        areaId: data.area,
                        location: data.location_addr,
                        lng: data.lng,
                        lat: data.lat,
                        messageTxt: data.message_txt,
                        mobile: mobileInput.getMobile(),
                        smsCode: verifyCodeInput.val()
                    })
                    .done(function (response) {
                        if (response.code === 0) {

                            var href = '/st/-' + data.category3 + '.html?source=search';

                            container.find('#seek-form').hide();
                            container.find('#box-header').removeClass('step-one').addClass('step-two');
                            container.find('.continue-seek').attr('href', href);
                            container.find('#seek-success').show();

                        }
                    });

                }

            }
        });

    };

    /**
     * 科目缓存
     *
     * @inner
     * @type {Object}
     */
    var cache = { };
    function getSubjectList(id) {

        if (cache[id]) {
            var promise = $.Deferred();
            setTimeout(
                function () {
                    promise.resolve(cache[id]);
                },
                0
            );
            return promise;
        }

        return service
        .getRecommendSubjectList({
            id: id,
            cityId: cookie.get('CITY_ID') || ''
        })
        .done(function (response) {
            if (response.code === 0) {
                cache[id] = response;
            }
            return response;
        });
    }

    /**
     * 转换数据源
     *
     * @inner
     * @param {Array} datasource
     * @return {Array}
     */
    function convert(datasource) {
        return $.map(
            datasource,
            function (item) {
                return {
                    text: item.name,
                    value: item.id
                };
            }
        );
    }

    /*
     * 获取语音验证码
     */
    function sendVoiceCode(isActivityVoice, deferred) {
        if (!mobileInput.getMobile()) {
            alert('请输入手机号');
        }
        else {
            currentStatus = 'voice';
            alert({
                    title: '获取语音校验码',
                    content: '校验码将以电话形式通知到你，请注意接听',
                    buttons: [
                        {
                            text: '获取',
                            type: 'primary',
                            handler: function () {
                                this.hide();
                                if (captcha.hidden) {
                                    captcha.show();
                                    captcha.change();
                                    captcha.validate();
                                    return ;
                                }
                                if (isActivityVoice === true) { //第一个参数有可能是jquery e
                                    service
                                    .getSMSCode({
                                        mobile: mobileInput.getMobile(),
                                        captcha: captcha.getValue(),
                                        captcha_name: captcha.captchaName,
                                        type: 'signin',
                                        is_voice: 1
                                    })
                                    .done(function (response) {
                                        if (deferred.resolve) {
                                            deferred.resolve(response);
                                        }
                                    });
                                }
                                else {
                                    service
                                    .sendVoiceSMS({
                                        "type": "signin",
                                        mobile: mobileInput.getMobile(),
                                        captcha: captcha.getValue(),
                                        captchaName: captcha.captchaName
                                    });
                                }
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


});
