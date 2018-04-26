/**
 * @file 注册页
 * @author jixiaohui
 */
define(function(require, exports) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var Placeholder = require('cobble/helper/Placeholder');
    var urlUtil = require('cobble/util/url');

    var CodeButton = require('common/component/CodeButton');
    var SaveButton = require('common/component/SaveButton');
    var wechatQrcode = require('common/function/wechatQrcode');
    var form = require('common/form');
    var service = require('common/service');
    var cookie = require('cobble/util/cookie');

    var entrance = $('#entrance');
    var invitebox = $('#hasinvitecode');

    var container = $('#main');
    var identity = container.find('#register-box').data('identity');
    var invitecode = container.find('input[name="invitecode"]');
    var verifycode = container.find('input[name="verifycode"]');
    var email = container.find('input[name="email"]');
    var password = container.find('input[name="password"]');
    var next = container.find('input[name="next"]');

    //验证码错误提示框
    var verifycodeerror = container.find('#verify-code-error');
    //手机错误提示框
    var mobileerror = container.find('#mobile-error');
    //邀请码错误提示框
    var invitecodeerror = container.find('.invite-code-error');
    //给手机发送验证码button
    var verifycodebutton = container.find('#verifycodebutton');
    //TODO 活动结束需要移除
    var store = require('common/store');
    var RegionSelect = require('common/component/RegionSelect');
    var cityId;
    var cityName;
    var provinceName;

    //TODO
    var ComboBox = require('cobble/ui/ComboBox');
    var etpl = require('cobble/util/etpl');
    var Captcha = require('common/component/Captcha');
    var MobileInput = require('common/component/MobileInput');

    var captcha;
    var mobileInput;

    var userType = (identity == 'teacher') ? 0 : 2;
    var userTypeStr = (userType == 0) ? '老师' : '学生';
    var userTypeAnti = (userType == 0) ? 2 : 0;
    var userTypeAntiStr = (userTypeAnti == 0) ? '老师' : '学生';
    var currentStatus;

    /**
     * 渲染注册身份
     */
    function renderIdentity() {

        var title = container.find('#box-header h1');

        if (identity == 'teacher') {
            identity = 'teacher';
            title.html('老师注册');
        }
    }

    function renderInviteCode() {
        var url = location.href ;
        var array = url.split('&');
        var next_array = url.split('next=');
        var invitecode_text = '';

        for (var i = 0 ; i < array.length ; i++) {
            if( array[i].indexOf('invite_code') > -1 ){
                var tmp_array = array[i].split('=');
                invitecode_text = tmp_array[1];
            }
        }

        if( next_array[1] ){
            next.val(decodeURIComponent(next_array[1]));
            $('.login-in').each( function(i,item) {
                var element = $(item);
                var url = element.attr('href');
                element.attr('href',url+'?next='+next_array[1]);
            });
        }

        if (invitecode_text) {
            invitebox.find('input').click();
            invitebox.next().show();
            invitecode.val(
                encodeURIComponent(invitecode_text)
            );
        }
    }

    //TODO 活动结束需要移除
    /**
     * 初始化"艺术活动"相关 活动结束后需要移除代码
     */
    function initArtActivityRelated() {
        var select = container.find('.city-select');
        new RegionSelect({
            element: select,
            provinceText: '请选择',
            cityText: '请选择',
            onProvinceChange: function (data) {
                provinceName = data.text;
            },
            onCityChange: function (data) {
                if(data.value) {
                    cityId = data.value;
                    cityName = data.text;
                }
            }
        });
    }
    //TODO

    function sendVoiceCode(isActivityVoice, deferred) {
        if (!mobileInput.getMobile()) {
            alert('请输入手机号');
        }
        else {
            currentStatus = 'voice';
            if (captcha && !captcha.hidden) {
                if (!captcha.validate()) {
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
                                if (isActivityVoice === true) { //第一个参数有可能是jquery e
                                    service
                                    .getSMSCode({
                                        mobile:mobileInput.getMobile(),
                                        captcha: captcha.getValue(),
                                        captcha_name: captcha.captchaName,
                                        type: 'register',
                                        is_voice: 1
                                    }, {
                                        errorHandler: {
                                            1000111: function () {
                                               captcha.show();
                                               captcha.change();
                                               setTimeout(function() {
                                                    captcha.validate();
                                               });
                                            }
                                        }
                                    })
                                    .done(function (response) {
                                        if (deferred.resolve) {
                                            deferred.resolve(response);
                                        }
                                    });
                                }
                                else {
                                    service
                                    .getSMSCode({
                                        mobile: mobileInput.getMobile(),
                                        type: 'register',
                                        is_voice: 1,
                                        captcha: captcha.getValue(),
                                        captcha_name: captcha.captchaName
                                    }, {
                                        errorHandler: {
                                            1000111: function () {
                                               captcha.show();
                                               captcha.change();
                                               setTimeout(function() {
                                                    captcha.validate();
                                               });
                                            }
                                        }
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

    function handleHasRegistered(response) {
            var data = response.data;
            var userTypeTarget;
            var message;

            if (data.has_role) { //注册过了这个身份
                message = '您已经注册过“跟谁学”' + userTypeStr + '身份了哦，请登录吧！';
                userTypeTarget = userType;
            }
            else { //没有注册过这个身份
                message = '你已注册过“跟谁学”' + userTypeAntiStr + '身份了哦，请先登录吧，然后在网站顶部导航栏选择开通' + userTypeStr + '身份！';
                userTypeTarget = userTypeAnti;
            }

            confirm({
                title: '温馨提示',
                content: message,
                buttons: [
                    {
                        text: '登录',
                        type: 'primary',
                        handler: function () {
                            location.href = '/static/login?user_type=' + userTypeTarget;
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

    exports.init = function() {

        //TODO 活动结束后移除
        var isArtActivity = store.get('isArtActivity');
        //TODO
        var isForceVoice = store.get('isForceVoice');

        renderIdentity();

        var title = container.find('#box-header h1').html();
        if (title == '老师注册') {
            wechatQrcode('wechat-login', 0);
            // 老师注册，上报
            var params = {
                type: 't_reg',
                stype: 'tpc_reg',
                client: 'PC'
            };

            WAT.send('http://click.genshuixue.com/gs.gif', params);
        }
        else {
            wechatQrcode('wechat-login', 2);
        }

        var inviteCode = null;
        var voiceCode;
        var codeBtn;

        var mobileRegistered = false;

        /**
         * 表单校验
         */
        var validator = new Validator({
            realtime: true,
            element: $('#register-form'),
            fields: {
                invitecode: {
                    errors: {
                        required: '请输入邀请码'
                    }
                },
                /*
                mobile: {
                    errors: {
                        required: '请输入手机号',
                        pattern: '请输入正确的手机号'
                    }
                },
                */
                verifycode: {
                    errors: {
                        required: '请输入短信验证码',
                        pattern: '请输入短信验证码'
                    }
                },
                email: {
                    errors: {
                        required: '请输入邮箱',
                        pattern: '邮箱格式错误'
                    }
                },
                password: {
                    custom: function (field, callback) {

                        var value = $.trim(field.val());

                        if (!value) {
                            return '请输入密码'
                        }

                        var length = value.length;

                        if (length < 8 || length > 16) {
                            return '请输入 8-16 位密码';
                        }

                        var count = (/\d/.test(value) ? 1 : 0)
                                  + (/[a-z]/i.test(value) ? 1 : 0)
                                  + (/[^1-9a-z]/.test(value) ? 1 : 0);

                        if (count < 2) {
                            return '数字、字母、字符至少包含两种';
                        }

                        return true;
                    }
                },
                password_confirm: {
                    errors: {
                        required: '请输入密码',
                        equals: '两次输入的密码不一致'
                    }
                },
                //TODO 活动结束后移除
                school: {
                    errors: {
                        required: '请输入学校'
                    }
                }
                //TODO
            }
        });

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
            onInputChange: function () {
                /*if(validator.validate('mobile')) {
                    enableCodeBtn();
                };*/
            },
            // validator: validator
        });

        /**
         * 提交注册信息
         */
        var saveButton = new SaveButton({
            element: container.find('.btn-register'),
            saveText: '正在发送...',
            save: function () {

                var result = validator.validate();

                if( result ) {
                    container.find('.btn-register').attr('disabled','disabled');

                    var data = form.parse(validator.element);
                    data.mobile = mobileInput.getMobile();

                    data.captchaName = captcha.captchaName;

                    // TODO 活动结束后移除
                    if (isArtActivity) {
                        if (cityId === undefined) {
                            alert('请选择省份城市');

                            return;
                        }
                        else {
                            data.province = provinceName;
                            data.city = cityName;
                            data.cooperation = "ChengDuArt";
                        }
                    }
                    // TODO

                    if( title == '老师注册' ) {
                        // 老师注册，"提交注册"点击上报
                        var params = {
                            type: 't_reg',
                            stype: 'tpc_reg_sub',
                            client: 'PC'
                        };
                        WAT.send('http://click.genshuixue.com/gs.gif', params);

                        if(inviteCode){
                            data.invitecode = inviteCode;
                        }
                        identity = 'teacher';

                        service
                        .registerTeacher(
                            data,
                            {
                                errorHandler: {
                                    '900010': handleHasRegistered
                                }
                            }
                        )
                        .done(function (response) {
                            container.find('.btn-register').removeAttr('disabled');
                            if (response.code === 0) {
                                success(
                                    '注册成功',
                                    function () {
                                        location.href = response.data.redirect_url;
                                    }
                                );
                            }
                        });
                    }
                    else if( title == '学生注册' ) {

                        service
                        .registerStudent(
                            data,
                            {
                                errorHandler: {
                                    '900010': handleHasRegistered
                                }
                            }
                        )
                        .done(function (response) {
                            container.find('.btn-register').removeAttr('disabled');
                            if (response.code === 0) {

                                var timestamp = store.get('serverTime') + 0;
                                var registerParams = cookie.get('register-params');

                                if (registerParams) {
                                    var params = registerParams.split(',');
                                    WAT.send('http://click.genshuixue.com/act.gif', {
                                        source: params[0],
                                        plan: params[1],
                                        group: params[2],
                                        keyword: params[3],
                                        q: params[4],
                                        _: timestamp
                                    });
                                }

                                success(
                                    '注册成功',
                                    function () {
                                        location.href = response.data.redirect_url;
                                    }
                                );
                            }
                        });
                    }

                }
            }
        });

        container
        .on('click', '.other-login .icon', function () {

            var target = $(this);
            var way = target.data('way');
            var query = urlUtil.parseQuery(location.search);

            location.href = '/connect/login/' + way + '/' + query.user_type;
        })

        .on('click', '#hasinvitecode .form-checkbox', function(e){
            var element = $(this);
            var target = element.parent().next();
            var input = element.find('input');

            if(input.is(":checked")){
                target.show();
            } else {
                target.hide();
            }
        })

        .on('keyup', 'input[name="mobile"]', function(e){// 中国手机号，手机输入框达到11位时检查号码输入是否正确
            var val = $(this).val();
            if (!mobileInput.isInternational() && val.length == 11) {

                enableCodeBtn();
                var element = $(this);
                var mobile = mobileInput.getMobile();

                service
                .checkMobileRegister({
                    mobile: mobile
                })
                .done(function (response) {
                    if (response.code === 0) {
                        var data = response.data;
                        var hasRole = data.user_type;
                        var parent = element.closest('.form-controls');

                        if (mobileRegistered = data.exist) {

                            var message;

                            if (hasRole[identity]) { //有该身份
                                message = '你已注册过“跟谁学”'
                                    + userTypeStr
                                    + '身份了哦，请<b class="text-info" style="cursor:pointer;" data-url="/static/login?user_type='
                                    + userType
                                    + '&mobile=' + mobile + '">登录</b>吧';
                            }
                            else {
                                message = '你已注册过“跟谁学”' + userTypeAntiStr + '身份了哦，请先<b class="text-info" style="cursor:pointer;" data-url="/static/login?user_type='
                                    + userTypeAnti
                                    + '&mobile=' + mobile + '">登录</b>吧，然后在网站顶部导航栏选择开通' + userTypeStr + '身份！';
                            }

                            parent
                            .find('#mobile-error')
                            .addClass('has-role')
                            .html('<i class="icon icon-times-circle"></i>&nbsp;&nbsp;' + message)
                            .on('mousedown', 'b', function () {
                                var url = $(this).data('url');
                                location.href = url;
                            });

                            parent.removeClass('has-success').addClass('has-error');
                        }
                        else {
                            parent.find('.error').removeClass('has-role');
                        }
                    }
                });
            }
            else {
                disableCodeBtn();
            }
        })
        .on('blur', 'input[name="mobile"]', function(e){// 国际手机号，失焦验证，号码输入是否正确
            var val = $(this).val();
            if (mobileInput.isInternational()) {

                enableCodeBtn();
                var element = $(this);
                var mobile = mobileInput.getMobile();

                service
                .checkMobileRegister({
                    mobile: mobile
                })
                .done(function (response) {
                    if (response.code === 0) {
                        var data = response.data;
                        var hasRole = data.user_type;
                        var parent = element.closest('.form-controls');

                        if (mobileRegistered = data.exist) {

                            var message;

                            if (hasRole[identity]) { //有该身份
                                message = '你已注册过“跟谁学”'
                                    + userTypeStr
                                    + '身份了哦，请<b class="text-info" style="cursor:pointer;" data-url="/static/login?user_type='
                                    + userType
                                    + '&mobile=' + mobile + '">登录</b>吧';
                            }
                            else {
                                message = '你已注册过“跟谁学”' + userTypeAntiStr + '身份了哦，请先<b class="text-info" style="cursor:pointer;" data-url="/static/login?user_type='
                                    + userTypeAnti
                                    + '&mobile=' + mobile + '">登录</b>吧，然后在网站顶部导航栏选择开通' + userTypeStr + '身份！';
                            }

                            parent
                            .find('#mobile-error')
                            .addClass('has-role')
                            .html('<i class="icon icon-times-circle"></i>&nbsp;&nbsp;' + message)
                            .on('mousedown', 'b', function () {
                                var url = $(this).data('url');
                                location.href = url;
                            });

                            parent.removeClass('has-success').addClass('has-error');
                        }
                        else {
                            parent.find('.error').removeClass('has-role');
                        }
                    }
                });
            }
        })
        .on('click', '.wechat .help', function () {

            container.find('#wechat-login').hide();
            container.find('.wechat-help').show();

            $(this)
                .removeClass('help')
                .addClass('scan')
                .text('扫码登录');
        })

        .on('click', '.wechat .scan', function () {

            container.find('#wechat-login').show();
            container.find('.wechat-help').hide();

            $(this)
                .removeClass('scan')
                .addClass('help')
                .text('使用帮助');
        });

        if (isForceVoice) {
            voiceCode = container.find('.voice-code-btn');
        }
        else {
            voiceCode = container.find('.voice-code-link span');
            voiceCode.on('click', sendVoiceCode);
        }

        Placeholder.init(
            container.find('[placeholder]')
        );


        /**
         * 发送验证码
         */
        var verifyCodeInput = container.find('#verify-code');

        if (isForceVoice) {
            codeBtn = new CodeButton({
                element: voiceCode,
                send: function () {
                    if (mobileRegistered) {
                        alert({
                            title: '温馨提示',
                            content: '您的手机号已经被注册，请直接登录',
                            buttons: [{
                                text: '确定',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                }
                            }]
                        });
                        return;
                    }
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
                    if (mobileRegistered) {
                        alert({
                            title: '温馨提示',
                            content: '您的手机号已经被注册，请直接登录',
                            buttons: [{
                                text: '确定',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                }
                            }]
                        });
                        return;
                    }
                    if (!mobileInput.isInternational()) {
                        voiceCode.parent().show();
                    }
                    verifyCodeInput.width(102);
                    currentStatus = 'sms';

                    // 老师注册，"获取验证码"点击上报
                    if (title == '老师注册') {
                        var params = {
                            type: 't_reg',
                            stype: 'tpc_reg_cap',
                            client: 'PC'
                        };
                        WAT.send('http://click.genshuixue.com/gs.gif', params);
                    }

                    return service
                    .getSMSCode({
                        mobile: mobileInput.getMobile(),
                        captcha: captcha.getValue(),
                        type: captcha.captchaName,
                        captcha_name: captcha.captchaName
                    },
                    {
                        errorHandler: {
                            1000111: function () {
                               captcha.show();
                               captcha.validate();
                               captcha.change();
                               setTimeout(function () {
                                    disableCodeBtn();
                               }, 0)
                            }
                        }
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
            captchaName: 'register',
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
                        .getSMSCode({
                            mobile: mobileInput.getMobile(),
                            type: 'register',
                            is_voice: 1,
                            captcha: captcha.getValue(),
                            captcha_name: captcha.captchaName
                        })
                        .done(function (response) {
                            if (response.code == 0) {
                                alert({
                                    title: '获取语音校验码',
                                    content: '校验码将以电话形式通知到你，请注意接听'
                                });
                            }
                        });
                }
                verifyCodeInput.focus();
                setTimeout(function () {
                    captcha.input.val('');
                }, 0);
            },
            onInvalid: function () {
                disableCodeBtn();
            },
            hidden: true
        });

        var enableCodeBtn = function() {
            if (!codeBtn.isCounting) {
                var mobileVal = $('input[name="mobile"]').val();
                if (mobileVal.length && (captcha.hidden || captcha.isValid)) {
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
        // 给邀请码错误提示框加上样式
        invitecodeerror.each(function(i,item){
            $(item).css({
                            'position':'absolute',
                            'width':'110px',
                            'left':'245px',
                            'top':'-22px'
                        });
        });

        // 监听键盘事件,如果用户键盘点击enter则进行提交操作.
        $(document).keyup(function(e){
            if( e.keyCode == 13 ){
                saveButton.save();
            }
        });
        // 自动填充邀请码
        renderInviteCode();
        //判断是否隐藏邀请码选填区域
        var index = location.search.indexOf('invitecode');
        if(index > -1) {
            var array = urlUtil.parseQuery(location.search);
            var code = array['invitecode'];
            if(code != '') {
                inviteCode = code;
                $('.form-checkbox').hide();
            }
        }
        //TODO 活动结束需要移除
        if (isArtActivity) {
            initArtActivityRelated();
        }
        //TODO

    };

});
