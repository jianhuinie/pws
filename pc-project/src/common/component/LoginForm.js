/**
 * @file 登录表单
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var Placeholder = require('cobble/helper/Placeholder');
    var cookie = require('cobble/util/cookie');
    var service = require('common/service');
    var form = require('common/form');
    var store = require('common/store');
    var Dialog = require('cobble/ui/Dialog');
    var urlUtil = require('cobble/util/url');
    var rc4 = require('common/function/rc4');
    var redirect = require('cobble/util/redirect');

    var SaveButton = require('common/component/SaveButton');
    var CodeButton = require('common/component/CodeButton');

    var InviteDialog = require('common/component/InviteDialog');
    var InviteResultDialog = require('common/component/InviteResultDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var MobileInput = require('common/component/MobileInput');
    var wechatQrcode = require('common/function/wechatQrcode');
    var Captcha = require('common/component/Captcha');

    var mobileInput;
    var captcha, loginMobileCaptcha, currentStatus;

    var KEY = "44332777625";

    var captchaTpl = ''
        +   '<div class="form-block captcha form-captcha">'
        +       '<div class="form-group">'
        +           '<label class="form-label">验证码：</label>'
        +           '<div class="form-controls">'
        +               '<span class="input-group">'
        +                   '<input class="form-text" type="text" name="captcha" '
        +                       'required minlength="4" maxlength="4" placeholder="请输入图中的文字">'
        +                   '<span class="input-group-addon">'
        +                       '<img class="captcha-image" src="/captcha?captcha_name=signin&' + $.now() + '" />'
        +                   '</span>'
        +               '</span>'
        +               '<span class="error"></span>'
        +           '</div>'
        +           '<div class="form-hint">'
        +               '<span class="btn-link btn-change-captcha">换一张</span>'
        +           '</div>'
        +       '</div>'
        +   '</div>';

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 表单元素
     * @property {string=} options.mobile 带入的手机号
     * @property {Function=} options.onSuccess 成功后的回掉
     * @property {string=} options.wrongRoleText 业务身份验证错误后提示的信息，需要调用BanLessonDialog做后续操作
     * @property {string=} options.failNext 登录失败的后续跳转的url
     * @property {boolean=} options.activityVoiceRegister 有些活动的登录框需要在跳转注册时强制用语音验证码注册
     * @property {string} options.registerPrefix 自定义的注册url前缀，用于统计
     */
    function LoginForm(options) {
        $.extend(this, LoginForm.defaultOptions, options);
        this.init();
    }

    /**
     * 构建Url参数
     * @param  {Array} params   参数数组 [{key, value}]
     * @return {string}         url
     */
    function getUrlParams(params) {
        var url = '';

        $.each(params, function(index, item) {
            if (item.value) {
                if (index !== 0) {
                    url += '&';
                }
                url += item.key + '=' + item.value;
            }
        });

        if (url) {
            url = '?' + url;
        }

        return url;
    }

    // 获取语音校验码
    function sendVoiceCode(flag) {
        if (flag === true) {
            return service
            .getSMSCode({
                mobile: mobileInput.getMobile(),
                captcha: (loginMobileCaptcha && loginMobileCaptcha.getValue()) || '',
                captcha_name: 'signin',
                type: 'signin',
                is_voice: 1
            });
        }
        if (!mobileInput.getMobile()) {
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
                                mobile: mobileInput.getMobile(),
                                captcha: (loginMobileCaptcha && loginMobileCaptcha.getValue()) || '',
                                captcha_name: 'signin',
                                type: 'signin',
                                is_voice: 1
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

    function validateMobile(validator, codeBtn) {
        if (validator.validate('mobile') && !codeBtn.isCounting) {
            codeBtn.element.prop('disabled', false);
        }
        else {
            codeBtn.element.prop('disabled', true);
        }
    }


    var userType = 2;
    LoginForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            me.validator = new Validator({
                realtime: true,
                element: element,
                fields: {
                    password: {
                        errors: {
                            required: '请输入密码',
                            minlength: '最小长度长为 6 个',
                            maxlength: '最大长度长为 16 个'
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

            var userName = element.find('[name="mobile"]');
            var nameVal = cookie.get('LOGIN_USERNAME');

            var codeButton;
            wechatQrcode('wechat-login', userType);

            mobileInput = me.mobileInput = new MobileInput({
                element: element.find('#login-mobile'),
                validator: me.validator,
                onInputChange: function (e) {
                    if (captcha) {
                        captcha.hide();
                    }
                }
            });
            var isInternational = false;
            var switchInternational = element.find('.form-switch-international b');

            // 语音验证码
            var voiceCode = element.find('.voice-code-link');
            voiceCode.on('click', '.btn-link', sendVoiceCode);

            userName
            .on('blur', function () { // 失焦验证手机号
                validateMobile(me.validator, codeButton);
            });

            var smsSwitch = element.find('.login-way-switch [data-way="sms"]');
            switchInternational
            .on('click', function () { // 国际手机号登录
                if (isInternational) {
                    isInternational = false;
                    mobileInput.disableInternational();
                    switchInternational.text('国际手机登录');
                    smsSwitch.show();
                }
                else {
                    isInternational  = true;
                    mobileInput.enableInternational();
                    switchInternational.text('普通登录');
                    smsSwitch.hide();
                }
            });

            //nameVal是smarty读取的cookie LOGIN_USERNAME
            if (!$.trim(userName.val()) && nameVal) {
                //若为手机号 则判定为没有加过密的
                if (/^1[3-9]\d{9}$/.test(nameVal)) {
                    userName.val(nameVal);
                }
                else {
                    userName.val(rc4(nameVal, KEY));
                }
            }

            if (me.mobile) {
                userName.val(me.mobile);
            }

            new SaveButton({
                element: element.find('.btn-primary'),
                form: element,
                saveText: '正在登录...',
                save: function () {
                    element.blur();
                    return me.login();
                }
            });
// ---------------------
            Placeholder.init(
                element.find('[placeholder]')
            );

            var smsGroup = element.find('.form-sms');
            var codeInput = smsGroup.find('.form-text');
            var codeBtn = element.find('.btn-info');
            var codeInputWidth = codeInput.width();

            codeButton = new CodeButton({ // 获取校验码
                element: codeBtn,
                send: function () {
                    voiceCode.show();
                    var mobile = mobileInput.getMobile();
                    var type = 'signin';
                    currentStatus = 'sms';

                    return service
                    .getSMSCode({
                        mobile: mobile,
                        type: type,
                        captcha: (loginMobileCaptcha && loginMobileCaptcha.getValue()) || '',
                        captcha_name: type
                    },
                    {
                        errorHandler: {
                            1000111: function () {
                                if (!loginMobileCaptcha) {
                                    $(captchaTpl.replace('exceed_count', type)).insertAfter('.form-group.form-sms');
                                    loginMobileCaptcha = new Captcha({
                                        element: $('.form-sms').next('.form-captcha'),
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
                    codeInput.outerWidth(
                        // 计算太烦了，减 2 比较保险不换行
                        smsGroup.width() - codeBtn.outerWidth(true) - 2
                    );
                }
            });

            me.loginWay = 'password';

            var activeClass = 'active';

            var bannerStudent = element.parents('#main').find('.login-banner-student');
            var bannerTeacher = element.parents('#main').find('.login-banner-teacher');

            if(me.showKefu){
                element.find('.bykefu-div').show();
            }

            element
            .on('click', '.form-radios input', function (e) { // 切换身份登录

                element
                .find('.form-radios .' + activeClass)
                .removeClass(activeClass);

                var target = $(this);
                var label = target.closest('label');
                label.addClass(activeClass);
                // ie8 bugfix
                // var radio = target.find(':radio');
                target.prop('checked', true);

                if (target.val() == '0') {
                    bannerStudent.hide();
                    bannerTeacher.show();
                    userType = 0;
                    wechatQrcode('wechat-login', userType);
                    // 切换至老师登录，即上报
                    var params = {
                        type: 't_login',
                        stype: 'tpc_login',
                        client: 'PC'
                    };

                    WAT.send('http://click.genshuixue.com/gs.gif', params);
                }
                else {
                    bannerTeacher.hide();
                    bannerStudent.show();
                    userType = 2;
                    wechatQrcode('wechat-login', userType);
                }
            })
            .on('click', '.login-way-switch a', function (e) {// 切换登录方式

                e.preventDefault();

                var target  = $(this);

                var way =
                me.loginWay = target.data('way');

                captcha && captcha.hide();
                loginMobileCaptcha && loginMobileCaptcha.hide();

                if (way == 'sms') {

                    switchInternational.hide();
                    validateMobile(me.validator, codeButton);
                }
                else {
                    voiceCode.hide();
                    switchInternational.show();
                }

                // 切换样式
                element.attr('data-login', way);
            })
            .on('click', 'input[name="remember_me"]', function (e) {// 是否记住我

                cookie.set(
                    REMEMBER,
                    $(this).prop('checked') ? 1 : 0,
                    cookieOptions
                );
            })
            .on('click', '.form-forget, .form-signup', function (e) {// 忘记密码，免费注册 跳转
                var url = $(e.target).data('url');

                var params = [];
                params.push({ key: 'next', value: element.find('input[name="next"]').val() });
                params.push({ key: 'mobile', value: element.find('input[name="mobile"]').val() });
                params.push({ key: 'user_type', value: element.find('input[name="usertype"]:checked').val() });
                if (me.activityVoiceRegister) {
                    params.push({ key: 'activity_voice', value: '1' });
                }

                url += getUrlParams(params);

                if ($(this).is('.form-signup') && me.registerPrefix) {
                    url = me.registerPrefix + encodeURIComponent(url);
                }

                redirect.openLink(url);
            })
            .on('click', '.sns-login .icon', function () {

                var target = $(this);
                var way = target.data('way');

                var formData = form.parse(element);

                location.href = '/connect/login/' + way + '/' + formData.usertype;
            })
            .on('click', '.form-wechat .help', function () {

                element.find('#wechat-login').hide();
                element.find('.wechat-help').show();

                $(this)
                    .removeClass('help')
                    .addClass('scan')
                    .text('扫码登录');
            })
            .on('click', '.form-wechat .scan', function () {

                element.find('#wechat-login').show();
                element.find('.wechat-help').hide();

                $(this)
                    .removeClass('scan')
                    .addClass('help')
                    .text('使用帮助');
            });
        },

        login: function () {

            var me = this;
            var element = me.element;
            var failNext = me.failNext;

            var formData = form.parse(element);

            var next = decodeURIComponent(formData.next);
            formData.next = next;

            if (me.validator.validate()) {

                if (cookie.get(REMEMBER)) {
                    cookie.set(
                        MOBILE,
                        rc4(formData.mobile, KEY),
                        cookieOptions
                    );
                }
                else {
                    cookie.remove(MOBILE);
                }

                var mobile = me.mobileInput.getMobile();

                // 当前登录方式
                var name;
                var requestData = {
                    userType: formData.usertype,
                    mobile: mobile,
                    rememberMe: formData.remember_me,
                    next: next
                };

                if (me.loginWay === 'password') {

                    if (captcha && !captcha.hidden) {
                        if (!captcha.validate()) {
                            return; //密码登录验证码 必须
                        }
                        else {
                            requestData.captcha = captcha.getValue();
                            requestData.captchaName = captcha.captchaName;
                        }
                    }

                    name = 'loginByPassword';
                    requestData.password = formData.password;
                }
                else {
                    name = 'loginBySms';
                    requestData.code = formData.verifycode;
                }

                var successHandler = function (loginData) {

                    var user = store.get('user');

                    service
                    .getUserBasicInfo()
                    .done(function (response) {
                        if (response.code === 0) {

                            var userData = response.data;

                            if (userData) {
                                user.id = userData.user_id ? parseInt(userData.user_id, 10) : user.id;
                                user.type = userData.user_type ? parseInt(userData.user_type, 10) :  user.type;
                                user.name = userData.user_name || user.name;
                                user.number = userData.user_number || user.number;
                                user.mobile = userData.mobile || user.mobile;
                            }

                            if ($.isFunction(me.onSuccess)) {
                                me.onSuccess(loginData);
                            }

                        }
                    });
                }

                // 老师登录，上报
                if (formData.usertype == 0) {
                    var params = {
                        type: 't_login',
                        stype: 'tpc_login_con',
                        client: 'PC'
                    };

                    WAT.send('http://click.genshuixue.com/gs.gif', params);
                }

                return service[name](requestData)
                .done(function (response) {

                    var data = response.data || { };

                    if (response.code === 0) {
                        successHandler(data);
                    }
                    else {
                        // 开通身份
                        if (data.has_role != null) {

                            var targetType = formData.usertype;
                            var fromType = targetType == TEACHER ? STUDENT : TEACHER;
                            var roleText = targetType == TEACHER ? '老师' : '学生';
                            formData.username = mobile;

                            if (me.wrongRoleText) {
                                new BanLessonDialog({
                                    text: me.wrongRoleText,
                                    hasStudentRole: false,
                                    next: failNext,
                                    onSuccess: me.onSuccess,
                                    switchRoleData: formData
                                });
                            }
                            else {
                                var content = ''
                                    + '<div class="msg-content-title">'
                                    + ('确认要开通' + roleText + '身份吗？')
                                    + '</div>'
                                    + '<div class="dialog-action">'
                                    +     '<button class="btn btn-primary btn-confirm">'
                                    +           '立即开通'
                                    +      '</button>'
                                    + '</div>';
                                var comfirmDialog = new Dialog({
                                    title: '温馨提示',
                                    content: content,
                                    disposeOnHide: true,
                                    width: 420
                                });


                                var element = comfirmDialog.element;

                                element
                                .on('click', '.btn-confirm', function () {
                                    comfirmDialog.hide();

                                    service
                                    .sendInviteCode({
                                        role: targetType,
                                        formData: formData
                                    })
                                    .done(function (response) {
                                        if (response.code === 0) {
                                            new InviteResultDialog({
                                                userType: fromType,
                                                status: 'succ',
                                                onAfterHide: function () {
                                                    successHandler(response.data);
                                                }
                                            });
                                        }
                                        else {
                                            new InviteResultDialog({
                                                userType: fromType,
                                                status: 'err'
                                            });
                                        }
                                    });
                                });
                            }
                        }
                        else if (response.code === 1000070) {

                            if (!captcha) {
                                $(captchaTpl).insertAfter('.form-group.form-password');
                                captcha = new Captcha({
                                    element: $('.form-password').next('.form-captcha'),
                                    captchaName: 'signin',
                                    skipAuth: false,
                                    autoValidate: true
                                });
                            }
                            captcha.change();
                            captcha.show();
                        }

                    }

                });
            }
        }

    };

    LoginForm.defaultOptions = {
        onSuccess: function (data) {
            location.href = data.url;
        }
    };


    // cookie 配置的选项
    var cookieOptions = {
        expires: 720,
        secure: true
    };

    var REMEMBER = 'LOGIN_USERNAME_REMEMBER';
    var MOBILE = 'LOGIN_USERNAME';

    var TEACHER = 0;
    var STUDENT = 2;

    // 默认记住我
    if (cookie.get(REMEMBER) == null) {
        cookie.set(
            REMEMBER,
            1,
            cookieOptions
        );
    }

    return LoginForm;

});