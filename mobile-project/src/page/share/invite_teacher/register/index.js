/**
 * Created by bjhl on 15/12/26.
 */
define(function(require,exports){
    'use strict';

    var $ = require("zepto");
    var ImageCode = require("common/getImgCode");
    var CodeButton = require("common/ui/CodeButton");
    var ui = require("common/ui");
    var url = require("util/url");
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require("common/service");

    var vcode_countdown = false;

    var validate = {
        mobile: function(){
            var mobile = $("#mobile");
            var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/ig;

            if(reg.test($(mobile).val())) {
                if(!vcode_countdown){
                    $("#v-code").removeClass("disabled");
                }

                return true;
            } else {
                $("#v-code").addClass("disabled");

                return false;
            }
        },
        v_code: function(){
            var verify_code = $("#verify_code");
            if($(verify_code).val().length){
                return true;
            } else {
                return false;
            }
        },
        password: function(){
            var password = $("#password").val();

            if(/^\d+$/ig.test(password) || /^[a-zA-Z]+$/ig.test(password)){
                return false;
            }

            return /^[\d\w]{6,20}$/ig.test(password);
        },
        protocol: function(){
            var checked = $("#protocolLabel").find("input")[0].checked;
            if(checked){
                return true;
            } else {
                return false;
            }
        }
    };

    //发送手机号获取验证码
    var sendMobile = function () {
        var $button = $('.btn_vcode');
        //调用获取验证码接口
        var codeButton = new CodeButton({
            element: $button,
            text: '重新发送($time$)',
            send: function () {
                if(!validate.mobile()){
                    ui.remind("请输入正确的手机号");
                    return false;
                }

                //ajax获取短信验证码
                var deferred = ImageCode.getCode({
                    'mobile': $("#mobile").val(),
                    'type': 'common'
                });

                deferred.always(function(response){
                    var response = response || {};

                    if(response.code == 0) {
                        vcode_countdown = true;
                        $("#v-code").addClass("disabled");

                        ui.remind("获取成功，请稍等");
                    } else {
                        response.msg && ui.remind(response.msg);
                        vcode_countdown = false;
                        $("#v-code").removeClass("disabled");
                    }
                });

                return deferred;
            },
            onFinish: function () {
                $button.html('重新发送');
                $("#v-code").removeClass("disabled");
                vcode_countdown = false;
            }
        });
    };


    var submit = function(done){
        var mobile = $("#mobile").val();
        var vCode = $("#verify_code").val();
        var password = $("#password").val();

        service.post("/invite/register_ajax",{
            mobile: mobile,
            smscode: vCode,
            password: password,
            invitecode: url().params['invitecode']
        },function(data){
            var data = data || {};
            if(data.code == "0") {
                $("#container").hide();
                $(".text-info").html(data.msg);
                $("#success").show();
            } else if(data.code == "1") {
                $("#container").hide();
                $(".text-info").html(data.msg);
                $("#error").show();
            } else {
                ui.remind(data.msg||"注册异常，请重新注册");
            }

            lazyLoadImage.refresh();

            return false;
        });
    }

    return function(){

        lazyLoadImage.init();

        setInterval(function(){
            validate.mobile();
        },500);

        $("#submit_button").tap(function(){
            if(!validate.mobile()){
                ui.remind("请输入正确的手机号");
                return false;
            }

            if(!validate.v_code()){
                ui.remind("请输入短信验证码");
                return false;
            }

            if(!validate.password()){
                ui.remind("请设置6-20位密码（数字+字母）");
                return false;
            }

            if(!validate.protocol()){
                ui.remind("请勾选服务协议");
                return false;
            }
            //submit
            submit();
        });

        //验证码
        sendMobile();
        //
        $("#protocolLabel").tap(function(){
            var protocol_selected = require.toUrl("page/share/invite_teacher/register/images/ic_select_done.png");
            var protocol_nor = require.toUrl("page/share/invite_teacher/register/images/ic_select_nor.png");
             if(validate.protocol()) {
                 $(this).find("img").attr("src",protocol_selected);
             } else {
                 $(this).find("img").attr("src",protocol_nor);
             }
        });

        $("#protocolLabel a").tap(function(evt){
            evt.stopPropagation();
        });

    };
});