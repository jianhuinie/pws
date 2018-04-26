define(function(require, exports) {
    var verifyBtn = null;
    var mobileDom = null;
    var verifyTextDom = null;
    var CodeButton = require('common/ui/CodeButton');
    var ui_new = require('common/ui');
    var imageCode = require('common/getImgCode');
    var mainPanel = null;

    function getSmsCode(params) {
        this.verifyBtn = params.verifyBtn;
        this.mobileDom = params.mobileDom;
        this.verifyTextDom = params.verifyTextDom;
        this.dialog = params.dialog;
        mainPanel = $(this.dialog.mainPanel);
        this.callBack =  params.callBack;
        this._init();
    };
    var p = getSmsCode.prototype;
    p.hide = function() {
        this.dialog.hide();
    };
    p.validate = {
        mobile: function(value) {
            value = $.trim(value);
            if (value == "") {
                ui_new.remind("请输入手机号");
                return false;
            }

            var reg = /^(1[0-9])\d{9}$/ig;
            if (reg.test(value)) {
                return true;
            }

            ui_new.remind("手机号码格式不正确");
            return false;
        },
        name: function(value) {
            value = $.trim(value);
            if (value) {
                return true;
            }
            ui_new.remind("请输入姓名");
            return false;
        },
        verify: function(value) {
            value = $.trim(value);

            if (value == "") {
                ui_new.remind("请输入验证码");
                return false;
            }

            if (value) {
                return true;
            }

            ui_new.remind("验证码错误");
            return false;
        }
    };

    p.validateAll = function() {
        var _self = this;
        var validate = true;
        $.each(mainPanel.find('input'), function(index, item) {
            var attr = $(item).attr("pattern");
            if (attr && _self.validate[attr]) {
                if (!_self.validate[attr]($(item).val())) {
                    validate = false;
                    return false;
                }
            }
        });
        return validate;
    };

    p._init = function(ops) {
        var _self = this;
        this.sendParams = ops || {};
        this._sendMobileInit();

        mainPanel.find(".close-icon").click(function() {
            _self.hide();
        });
        //
        mainPanel.find(".staySubmit").click(function() {
            if (_self.validateAll()) {
                _self._sendStaySingle();
            }
        });
    };

    p._clearInput = function() {
        $(mainPanel).find("input").val("");
    };

    //发送手机号获取验证码
    p._sendMobileInit = function() {
        var _self = this;
        var button = this.verifyBtn;
        var mobile = this.mobileDom;
        //调用获取验证码接口
        var codeButton = new CodeButton({
            element: button,
            text: '重新发送($time$)',
            send: function() {
                if (!_self.validate.mobile(mobile.val())) {
                    return false;
                }

                //ajax获取短信验证码
                var deferred = imageCode.getCode({
                    'mobile': mobile.val(),
                    'type': 'signin'
                });

                deferred.always(function(response) {
                    var response = response || {};
                    if (response.code == 0) {
                        button.addClass("disabled");
                        ui_new.remind("短信验证码发送中，请注意接收");
                    } else {
                        response.msg&&(ui_new.remind(response.msg));
                        button.removeClass("disabled");
                    }
                });

                return deferred;
            },
            onFinish: function() {
                button.html('重新发送');
                button.removeClass("disabled");
            }
        });
    };

    var isLoadingLogin = false;
    p._sendStaySingle = function() {
        var _self = this;

        var params = $.extend({
            mobile: _self.mobileDom.val(),
            smscode: _self.verifyTextDom.val()

        }, this.sendParams);

        window.gsx_ready(function(config) {
            var source = config.source;
            if (source) {
                params['source'] = source;
            }
        });


        if (page_data.page_type) {
            params["page_type"] = page_data.page_type;
        }

        /*if(!this.isLogin()){
            params["code"] = mainPanel.find(".verify-text").val();
        }*/
        if (isLoadingLogin) {
            return;
        }
        isLoadingLogin = true;
        $.post("/auth/loginSms", params).always(function(res) {
            isLoadingLogin = false;
            res = res || {};
            if (res.code == 0) {
                _self.callBack(res, params);
                _self.hide();
            } else {
                ui_new.alert({
                    content: res.msg || "请求异常："+res.code,
                    width: 280,
                    button: '确定'
                });
            }
        })

    };
    return getSmsCode;
});