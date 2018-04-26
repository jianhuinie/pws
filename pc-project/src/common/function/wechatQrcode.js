/**
 * @file 生成微信登录二维码
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../service');
    var urlUtil = require('cobble/util/url');

    /**
     *
     * @param {string} id domId
     */
    return function (id, userType) {
        require(
            [
                'js!https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
            ],
            function () {

                service
                .getWechatInfo({
                    type: userType
                })
                .done(function (response) {

                    if (response.code === 0) {

                        var data = response.data;
                        var host = data.host;

                        // 只有 https 才能正常加载
                        var origin = urlUtil.getOrigin(host);
                        if (origin.indexOf('http:') === 0) {
                            origin = 'https' + origin.substr(4);
                        }

                        new WxLogin({
                            id: id,
                            appid: 'wxc141277bb62cfd84',
                            scope: 'snsapi_login',
                            redirect_uri: encodeURIComponent(host),
                            state: data.redirect,
                            style: '',
                            href: origin + '/asset/css/common/component/wechatQrcode.css'
                        });

                        $('#' + id + ' iframe').height(159);

                    }
                });


            }
        );
    }

});