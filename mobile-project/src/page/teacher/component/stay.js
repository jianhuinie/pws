/**
 * Created by caoying on 15/11/26.
 * 预约试听公共接口(供课程详情页、机构主页、3810课程详情页调用)
 */

define(function (require, exports) {
    'use strict';

    var imageCode = require('common/getImgCode');
    var CodeButton = require('common/ui/CodeButton');
    var observer = require('common/mvc/observer');
    var ui_new = require('common/ui');
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var util_object = require('util/object');
    var appController = require("common/app");
    var liudanClickLog = require('common/liudanClickLog/liudanClickLog');
    var env = require('util/env');
    var service = require('common/service');

    var formatTpl = function(tpl,obj){
        $.each(obj,function(key,value){
            var reg = new RegExp("{{"+key+"}}",'ig');
            tpl = tpl.replace(reg,value);
        });
        return tpl;
    };

    function StaySingle(ops){
        this._init.apply(this,arguments);
    };

    var p = StaySingle.prototype;

    p._init = function(ops){
        var _self = this;
        this.flagSingleTeacher = false;
        if (ops.place && ops.place === 'singleTeacher') {
            delete ops.place;
            this.flagSingleTeacher = true;
        }
        this.sendParams = ops || {};
        this.tpl = this._getTpl();
        this.slideInDialog = new SlideInDialog({content: this.tpl});

        this._sendMobileInit();

        this.tpl.find(".close-icon").click(function(){
            _self.hide();
        });


        if(this.isLogin()) {
            var mobile = this.getUserInfo().mobile;
            if (!mobile || mobile.toLowerCase() == 'null') {
                $(".formElementMobile input").val('');
            } else {
                $(".formElementMobile input").attr('disabled', 'true');
            }
        }
        this.tpl.find(".staySubmit").click(function(){
            if(_self.validateAll()){
                _self._sendStaySingle();
            }
        });
    };

    p._clearInput = function(){
        $(this.tpl).find("input").val("");
    };

    //发送手机号获取验证码
    p._sendMobileInit = function () {
        var _self = this;
        var button = this.tpl.find(".verify");
        var mobile = this.tpl.find(".mobile");
        //调用获取验证码接口
        var codeButton = new CodeButton({
            element: button,
            text: '重新发送($time$)',
            send: function () {
                if(!_self.validate.mobile(mobile.val())){
                    return false;
                }

                //ajax获取短信验证码
                var deferred = imageCode.getCode({
                    'mobile': mobile.val(),
                    'type': 'signin',
                    // type 为 signin 或 register 且 图片验证码不走 passport 时，需要显式指定 captcha_name；
                    // 图片验证码不走 passport（type: signin或者 register），所以业务 js 代码 调用 getCode 时，如果 type 是common，可以不传 captcha_name 参数，只传 type且为 common
                    'captcha_name': 'common'
                });

                deferred.always(function(response){
                    var response = response || {};
                    if(response.code == 0) {
                        button.addClass("disabled");
                        ui_new.remind("短信验证码发送中，请注意接收");
                    } else {
                        response.msg && (ui_new.remind(response.msg));
                        button.removeClass("disabled");
                    }
                });

                return deferred;
            },
            onFinish: function () {
                button.html('重新发送');
                button.removeClass("disabled");
            }
        });
    };

    p._sendStaySingle = function(){
        var _self = this;
        var params = $.extend({
            mobile: this.tpl.find(".mobile").val(),
            user_name: this.tpl.find(".name").val()
        },this.sendParams);

        window.gsx_ready(function(config){
            var source = config.source;
            if(source) {
                params['source'] = source;
            }
        });

        if (page_data.page_type) {
            params["page_type"] = page_data.page_type;
        }
        params["detail_url"] = location.href;

        if(!this.isLogin()){
            params["code"] = this.tpl.find(".verify-text").val();
        }
        else {
            // 登录过了，从 getUserInfo 里面取 student_number -- 个体老师留单
            if (this.flagSingleTeacher) {
                params["student_number"] = this.getUserInfo().number;
            }
        }

        /**
         * 预约留单统计
         * @return {[type]}
         */
        function sendLiudanLog(){
            liudanClickLog.send({
               detail_url: location.href,
               stype: 2
            });
        }

        function savePhonetoAndriodApp () {
            //在安卓的学生版的APP里面要用户授权判断要不要写入通信录
            if (appController.isStudentApp() && env.os.isAndroid) {
                var phoneKey = 'androidAppPhoneKey';
                var localStorages = window.localStorage;
                var hasKey = localStorages.getItem(phoneKey);
                if (hasKey == 'true') {
                    return;
                } else {
                    localStorages.setItem(phoneKey, 'true');
                    Jockey.send('setContactList');
                }
            }
        }
        if (this.flagSingleTeacher) {
            var reservation = function () {
                $.post("/reservations/create", params).always(function(res){
                    sendLiudanLog();
                    res = res || {};

                    _self.hide();

                    if(res.code == "0"){
                        ui_new.alert({
                            title: '<span class="stay-dialog-title icon-check-o-org"></span>预约成功',
                            content:'您的预约已经发送给老师，请您耐心等待。老师电话将以010开头。',
                            width:280,
                            button:'确定'
                        });
                        savePhonetoAndriodApp();
                    }else if(res.code == "110004"){
                        //重复提交
                        ui_new.alert({
                            // title: '<span class="stay-dialog-title icon-check-o-org"></span>预约成功',
                            content:'您已经提交过了预约信息，请您耐心等待。老师电话将以010开头。',
                            width:280,
                            button:'确定'
                        });
                    }else {
                        ui_new.alert({
                            content:res.msg || "请求异常",
                            width:280,
                            button:'确定'
                        });
                    }
                });
            };
            // 用户已经登录过了，不用接收以及输入短信验证码
            if ($('.formElement .verify-text').length == 0) {
                reservation();
            }
            else {
                service.post('/auth/loginSms', {
                    mobile: $('.formElement .mobile').val(),
                    smscode: $('.formElement .verify-text').val(),
                    usertype: 2
                }, function (res) {
                    if (res.code == 0) {
                        params.student_number = res.data.number;
                        reservation();
                    }
                });
            }
        }
        else {
            $.post("/recommend/confirm_fill", params).always(function(res){
                sendLiudanLog();
                res = res || {};

                _self.hide();

                if(res.code == "0"){
                    ui_new.alert({
                        title: '<span class="stay-dialog-title icon-check-o-org"></span>预约成功',
                        content:'课程顾问将尽快和您取得联系，请留意010-86448910来电。',
                        width:280,
                        button:'确定'
                    });
                    savePhonetoAndriodApp();
                }else if(res.code == "110004"){
                    //重复提交
                    ui_new.confirm({
                        content:'您已经预约过了该老师的课程，请留意010-86448910来电。',
                        button_cancel:'在线咨询',
                        width:280,
                        button_ok:'确定'
                    }).fail(function(){
                        if(appController.isApp()){
                            appController.send('IM',{
                                c_role: "7",
                                c_id: "100000110"
                            });
                        }else {
                            location.href = "/im/main";
                        }
                    });
                }else {
                    ui_new.alert({
                        content:res.msg || "请求异常",
                        width:280,
                        button:'确定'
                    });
                }
            });
        }

    };

    p._getTpl = function(){
        var className = this.sendParams.className ? this.sendParams.className : 'tryListener-now';
        if (this.flagSingleTeacher) {
            var loginTpl = [
                '<div class="staySingle">',
                '<div class="listen-title"><span class="title-info">预约咨询</span><div class="close-icon"><i class="icon icon-close"></i></div></div>',
                '<div class="formElement"><input type="mobile" pattern="mobile" placeholder="输入手机号" class="mobile" maxlength="11"></div>',
                '<div class="formElement"><div class="verify-container"><input type="text" pattern="verify" placeholder="输入验证码" class="verify-text"><span class="verify">发送验证码</span></div></div>',
                '<div class="formElement"><input type="text" placeholder="输入姓名" pattern="name" class="name"></div>',
                '<div class="remind-msg">您的预约信息会发送给老师</div>',
                '<div class="staySubmit ' + className + '">确定预约</div>',
                '</div>'
            ].join("");

            var logoutTpl = [
                '<div class="staySingle">',
                '<div class="listen-title"><span class="title-info">预约咨询</span><div class="close-icon"><i class="icon icon-close"></i></div></div>',
                '<div class="formElement formElementMobile"><input type="mobile" pattern="mobile" placeholder="输入手机号" class="mobile" value="{{mobile}}" maxlength="11"></div>',
                '<div class="formElement"><input type="text" pattern="name" placeholder="输入姓名" class="name" value="{{name}}" /></div>',
                '<div class="remind-msg">您的预约信息会发送给老师</div>',
                '<div class="staySubmit ' + className + '">确定预约</div>',
                '</div>'
            ].join("");
        }
        else {
            var loginTpl = [
                '<div class="staySingle">',
                '<div class="listen-title"><span class="title-info">预约咨询</span><div class="close-icon"><i class="icon icon-close"></i></div></div>',
                '<div class="formElement"><input type="mobile" pattern="mobile" placeholder="输入手机号" class="mobile" maxlength="11"></div>',
                '<div class="formElement"><div class="verify-container"><input type="text" pattern="verify" placeholder="输入验证码" class="verify-text"><span class="verify">发送验证码</span></div></div>',
                '<div class="formElement"><input type="text" placeholder="输入姓名" pattern="name" class="name"></div>',
                '<div class="remind-msg">课程顾问将在15分钟内联系您</div>',
                '<div class="staySubmit ' + className + '">确定预约</div>',
                '</div>'
            ].join("");

            var logoutTpl = [
                '<div class="staySingle">',
                '<div class="listen-title"><span class="title-info">预约咨询</span><div class="close-icon"><i class="icon icon-close"></i></div></div>',
                '<div class="formElement formElementMobile"><input type="mobile" pattern="mobile" placeholder="输入手机号" class="mobile" value="{{mobile}}" maxlength="11"></div>',
                '<div class="formElement"><input type="text" pattern="name" placeholder="输入姓名" class="name" value="{{name}}" /></div>',
                '<div class="remind-msg">课程顾问将在15分钟内联系您</div>',
                '<div class="staySubmit ' + className + '">确定预约</div>',
                '</div>'
            ].join("");
        }

        var tpl = "";

        if(this.isLogin()){
            tpl = formatTpl(logoutTpl,this.getUserInfo());
        }else {
            tpl = loginTpl;
        }

        return $(tpl);
    };

    p.validate = {
        mobile: function(value){
            value = $.trim(value);
            if(value==""){
                ui_new.remind("请输入手机号");
                return false;
            }

            var reg = /^(1[0-9])\d{9}$/ig;
            if(reg.test(value)){
                return true;
            }

            ui_new.remind("手机号码格式不正确");
            return false;
        },
        name: function(value){
            value = $.trim(value);
            if(value){
                return true;
            }
            ui_new.remind("请输入姓名");
            return false;
        },
        verify: function(value){
            value = $.trim(value);

            if(value==""){
                ui_new.remind("请输入验证码");
                return false;
            }

            if(value){
                return true;
            }

            ui_new.remind("验证码错误");
            return false;
        }
    };

    p.validateAll = function(){
        var _self = this;
        var validate = true;
        $.each(this.tpl.find('input'),function(index,item){
            var attr = $(item).attr("pattern");
            if(attr && _self.validate[attr]){
                if(!_self.validate[attr]($(item).val())){
                    validate = false;
                    return false;
                }
            }
        });
        return validate;
    };

    p.isLogin = function(){
        var isLogin = false;
        gsx_ready(function(config){
            isLogin = !util_object.isEmpty(config.user);
        });
        return isLogin;
    };

    p.getUserInfo = function(){
        var info = {}
        gsx_ready(function(config){
            info = config.user;
        });
        return info;
    };

    p.show = function(ops){
        var ops = ops || {};
        var tpls = $(this.tpl);
        if(ops.title){
            tpls.find(".title-info").text(ops.title);
        }

        if (ops.buttonTitle) {
            tpls.find('.staySubmit').text(ops.buttonTitle);
        }

        if (!this.isLogin()) {
            this._clearInput();
        }

        this.slideInDialog.show();

        liudanClickLog.send({
            stype: 1
        });
    };

    p.hide = function(){
        this.slideInDialog.hide();
    };

    return StaySingle;
});
