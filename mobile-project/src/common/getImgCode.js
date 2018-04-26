/**
 * Created by caoying on 15/11/25.
 */
define(function(require,exports){
    'use strict';

    var service = require('common/service');
    var observer = require('common/mvc/observer');
    var ui_new = require('common/ui');
    var ImageCheckCodeDialog = require('common/ui/ImageCheckCodeDialog/ImageCheckCodeDialog');

    /**
     * 获取验证码
     * @param  {Object} param
     * @property {string} param.mobile  手机号
     * @property {string} param.type  activity 注册短信
     *                       'common','register','forget_password', 'voice','change_pay_password'
     * @property {string} [param.captcha] 图形验证码
     * @property {string} [param.captcha_name] 图形验证码类型，与type一致
     * @return {Promise}
     */

    exports.getCode = function(param){
        var deferred = $.Deferred();

        var doVertifyCode = function (response) {
            var type = param.type;
            var value = response.value;
            var mobile = param.mobile;
            var instance = response.instance;

            service.post('/sms/send', {
                mobile: mobile,
                type: type,
                captcha: value,
                captcha_name: type,
            }, function (res) {
                if (+res.code === 0) {
                    instance._content.find('.icon-checkbox-checked').removeClass('hide');
                    setTimeout(function () {
                        instance.destroy();
                        deferred.resolve({
                            code: 0
                        });
                    }, 1000);
                } 
            });
        };


        var doSend = function (imageCode) {
            if (imageCode) {
                param['captcha'] = imageCode + '';
                // type 为 signin 或 register 且 图片验证码不走 passport 时，需要显式指定 captcha_name；
                // 图片验证码不走 passport（type: signin 或者 register），所以业务 js 代码 调用 getCode 时，如果 type 是common，可以不传 captcha_name 参数，只传 type且为 common
                param['captcha_name'] = param.captcha_name || param.type;
            }

            service.post('/sms/send', param, function (response) {
                if (response.code == '1000111' || response.code == '110056') {
                    //TODO
                    var imageCodeDialog = new ImageCheckCodeDialog({
                        'title': '请输入图形验证码',
                        'type': param.type,
                        'errorText': response.code == '110056' ? '验证码错误，请重新输入' : ''
                    });
                    // observer.addListenerOnce(imageCodeDialog, 'success', function (code) {
                    //     imageCodeDialog.hide();
                    //     // imageCodeDialog.destroy();
                    //     // doSend(code);
                    // });

                    var promise = imageCodeDialog.deferred;
                    if (promise) {
                        promise.done(function (response) {
                            // imageCodeDialog.hide();
                            // imageCodeDialog.destroy();
                            doVertifyCode(response);
                        });
                    }

                    $('.GSX_Dialog_closeButton').unbind('click').on('click', function () {
                        deferred.resolve({
                            code: -1
                        });
                        imageCodeDialog.hide();
                        imageCodeDialog.destroy();
                    });

                    // observer.addListener(imageCodeDialog, 'display_changed', function () {
                    //     if (!imageCodeDialog._dialog.display) {
                    //         deferred.resolve({
                    //             code: -1
                    //         });
                    //         imageCodeDialog.destroy();
                    //     }
                    // });
                    // observer.addListenerOnce(imageCodeDialog, 'success', function (code) {
                    //     imageCodeDialog.hide();
                    //     imageCodeDialog.destroy();
                    //     doSend(code);
                    // });
                    // observer.addListenerOnce(imageCodeDialog, 'cancel', function () {
                    //     deferred.resolve({
                    //         code: -1
                    //     });
                    // });
                    imageCodeDialog.show();

                } else {
                    deferred.resolve(response);
                }

                return false;
            });
        };
        doSend();

        return deferred.promise();
    }

});