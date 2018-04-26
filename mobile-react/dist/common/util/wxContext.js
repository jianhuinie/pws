define(function (require, exports) {
    'use strict';
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _index = require('gsx-design/component/Loading/index');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _index2 = _interopRequireDefault(_index);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    var SPREAD_MENU_ITEMS = [
        'menuItem:share:appMessage',
        'menuItem:share:timeline',
        'menuItem:share:qq',
        'menuItem:share:weiboApp',
        'menuItem:favorite',
        'menuItem:share:facebook',
        'menuItem:share:QZone'
    ];
    function getWeixin() {
        var _jsApiList = [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'chooseImage'
        ];
        var wx = window.wx;
        return new Promise(function (resolve, reject) {
            return _ajaxService2.default.post(_ajaxConfig2.default.WECHAT_JS_SDK, { url: location.href }).then(function (response) {
                var weixinInfo = response.data;
                wx.config({
                    debug: false,
                    appId: weixinInfo.appId,
                    timestamp: weixinInfo.timestamp,
                    nonceStr: weixinInfo.nonceStr,
                    signature: weixinInfo.signature,
                    jsApiList: _jsApiList
                });
                wx.ready(function () {
                    resolve(wx);
                });
            });
        });
    }
    var WechatContext = function () {
        function WechatContext() {
            _classCallCheck(this, WechatContext);
        }
        _createClass(WechatContext, [
            {
                key: 'initContext',
                value: function initContext() {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        if (_this.wx) {
                            resolve(_this.wx);
                        } else {
                            getWeixin().then(function (weixin) {
                                _this.wx = weixin;
                                resolve(weixin);
                            });
                        }
                    });
                }
            },
            {
                key: 'setShareInfo',
                value: function setShareInfo(options) {
                    this.initContext().then(function (weixin) {
                        weixin.onMenuShareTimeline(options);
                        weixin.onMenuShareAppMessage(options);
                        weixin.onMenuShareQQ(options);
                        weixin.onMenuShareWeibo(options);
                    });
                }
            },
            {
                key: 'showSpreadMenuItems',
                value: function showSpreadMenuItems() {
                    this.initContext().then(function (weixin) {
                        weixin.showMenuItems({ menuList: SPREAD_MENU_ITEMS });
                    });
                }
            },
            {
                key: 'hideAllNonBaseMenuItem',
                value: function hideAllNonBaseMenuItem() {
                    this.initContext().then(function (weixin) {
                        weixin.hideAllNonBaseMenuItem();
                    });
                }
            },
            {
                key: 'wxPay',
                value: function wxPay(ajaxUrl, params, callback, _cancel) {
                    var me = this;
                    me.loading = new _index2.default();
                    me.loading.show();
                    me.initContext().then(function (wx) {
                        _ajaxService2.default.post(ajaxUrl, params).then(function (res) {
                            me.loading.hide();
                            me.loading.destroy();
                            if (res && res.code === 200) {
                                var data = res.data;
                                wx.chooseWXPay({
                                    appId: data.appId,
                                    timestamp: data.timeStamp,
                                    nonceStr: data.nonceStr,
                                    package: data.package,
                                    signType: data.signType,
                                    paySign: data.paySign,
                                    success: function success() {
                                        if (callback && typeof callback === 'function') {
                                            callback();
                                        }
                                    },
                                    cancel: function cancel() {
                                        if (_cancel && typeof _cancel === 'function') {
                                            _cancel();
                                        }
                                    }
                                });
                            }
                        }, function () {
                            me.loading.hide();
                            me.loading.destroy();
                        });
                    });
                }
            },
            {
                key: 'destroy',
                value: function destroy() {
                    this.wx = null;
                }
            }
        ]);
        return WechatContext;
    }();
    exports.default = WechatContext;
});