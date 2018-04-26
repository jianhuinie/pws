/**
 * @file 图形验证码（选择 验证码名称）
 * @author wangyujie, liucong
 */
define(function (require) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var service = require('common/service');

    /**
     * 构造函数
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 容器元素
     * @property {?string} options.captchaName 验证码名称，避免一个表单出现多处验证码
     * @property {Function=} options.onBeforeValidate 发验证请求之前的回调
     * @property {Function=} options.onValid 验证通过的回调
     * @property {Function=} options.onInvalid 验证未通过的回调
     * @property {boolean} options.skipAuth 是否不做后端校验
     * @property {boolean} options.autoValidate 是否自动验证需要skipAuth为false
     *
     */
    function Captcha(options) {
        $.extend(this, options);
        this.init();
    }

    /**
     * 验证码错误验证
     *
     * @inner
     * @type {Object}
     */
    function getCaptchaFields() {
        var me = this;

        return {
            captcha: {
                errors: {
                    required: '请输入验证码',
                    minlength: '请输入 4 位验证码',
                    maxlength: '请输入 4 位验证码'
                },
                custom: function (field, callback) {

                    if (me.skipAuth) callback(); //不做后端校验

                    var data = {
                        captcha: me.newCaptcha,
                        captcha_name: me.captchaName
                    }

                    if ($.isFunction(me.onBeforeValidate)) {
                        me.onBeforeValidate();
                    }

                    service
                    .validateCaptcha(
                        data,
                        {
                            errorHandler: {
                                '1': function() {
                                }
                            }
                        }
                    )
                    .done(function (response) {
                        if (response.code === 0) {
                            callback();
                        }
                        else {
                            callback('请输入正确的验证码');
                        }
                    });
                }
            }
        };
    }

    //全角转半角字符
    function toSBC(str){
        var result = '';
        var len = str.length;
        for(var i = 0; i < len; i++)
        {
            var cCode = str.charCodeAt(i);
            //全角与半角相差（除空格外）：65248（十进制）
            cCode = (cCode >= 0xFF01 && cCode <= 0xFF5E) ? (cCode - 65248) : cCode;
            //处理空格
            cCode = (cCode === 0x03000) ? 0x0020 : cCode;
            result += String.fromCharCode(cCode);
        }
        return result;
    }

    Captcha.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            var input = element.find('input[name="captcha"]');
            me.input = input;

            me.captchaImage = me.element.find('.captcha-image');

            //初始化默认
            me.captchaName = me.captchaName || '';
            me.newCaptcha = '';
            me.isValid = false;
            me.needAuth = true; // 图形验证码是否需要验证

            me.captchaValidator = new Validator({
                element: element,
                fields: getCaptchaFields.call(me),
                onAfterValidate: function (e, result) {
                    if (result.errors.length === 0) {
                        me.needAuth = false;
                        me.isValid = true;
                        if ($.isFunction(me.onValid)) {
                            me.onValid();
                        }
                    }
                    else {
                        me.isValid = false;
                        if ($.isFunction(me.onInvalid)) {
                            me.onInvalid();
                        }
                    }
                }
            });


            var oldCaptcha;
            var onValueChange = function (e) {
                var target = $(e.currentTarget);
                var val = toSBC(target.val());
                val = val.replace(/[^0-9a-zA-Z]/g, '').substring(0, 4);
                target.val(val);
                // var val = $.trim(target.val());
                // var reg = /^[0-9a-zA-Z]{4}$/g;
                if (val.length === 4 ) {
                    me.newCaptcha = val;
                    me.captchaValidator.validate();
                }
            };
            me.element
            // 绑定手机验证码
            .on('click', '.btn-change-captcha', function () {
                me.change();
            });

            // 验证图形验证码
            if (!me.skipAuth) {
                input
                .on('blur', function (e) {
                    var target = $(e.currentTarget);
                    me.newCaptcha = target.val();
                    if ((oldCaptcha != me.newCaptcha) || me.needAuth) {

                        if (!me.autoValidate) {
                            me.captchaValidator.validate();
                        }

                    }
                    oldCaptcha = target.val();

                    return false;
                });

                if (me.autoValidate) {
                    input
                    .on('input', onValueChange)
                    .on('propertychange', onValueChange);
                }
            }

        },
        validate: function () {
            this.captchaValidator.validate();
            return this.isValid;
        },
        getValue: function () {
            return this.input.val();
        },
        change: function () {

            var me = this;

            if (me.captchaName) {
                me.captchaImage.prop(
                    'src',
                    '/captcha?captcha_name=' + me.captchaName + '&' + $.now()
                );
            }
            else {
                me.captchaImage.prop(
                    'src',
                    '/captcha?' + $.now()
                );
            }
            //换图片相当于需要重新校验 视同于重置状态
            if($.isFunction(me.onBeforeValidate)) {
                me.onBeforeValidate();
            }
            // 每换一张验证码图片，允许用户再次发验证请求
            me.needAuth = true;
            me.input.val('');
        },
        hide: function () {
            this.element.hide();
            this.hidden = true;
        },
        show: function () {
            this.element.show();
            this.hidden = false;
        },
        setCaptchaName: function (captchaName) {
            this.captchaName = captchaName || '';
        }

    };

    return Captcha;

});