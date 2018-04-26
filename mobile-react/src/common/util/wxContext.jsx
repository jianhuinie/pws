/**
 * @file 微信jdk
 * @author zhanghuijian
 */

import service from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import Loading from 'gsx-design/component/Loading/index';

/**
 * 微信传播类菜单项
 * @type {string[]}
 */
const SPREAD_MENU_ITEMS = [
    'menuItem:share:appMessage', // 发送给朋友
    'menuItem:share:timeline', // 分享到朋友圈
    'menuItem:share:qq', // 分享到QQ
    'menuItem:share:weiboApp', // 分享到微博
    'menuItem:favorite', // 收藏
    'menuItem:share:facebook', // 分享到FB
    'menuItem:share:QZone' // 分享到 QQ 空间
];

/**
 * 初始化并获取wx config
 * @param {object} weixin window.wx对象
 * @param {function} callback 
 */
function getWeixin() {
    const _jsApiList = [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'chooseImage',
    ];
    const wx = window.wx;
    return new Promise((resolve, reject) => {
        return service.post(ajaxConfig.WECHAT_JS_SDK, {
            url: location.href
        }).then((response) => {
            const weixinInfo = response.data;
            wx.config({
                debug: false,
                appId: weixinInfo.appId,
                timestamp: weixinInfo.timestamp,
                nonceStr: weixinInfo.nonceStr,
                signature: weixinInfo.signature,
                jsApiList: _jsApiList
            });
            wx.ready(() => {
                resolve(wx);
            });
        });
    }); 
}

export default class WechatContext {

    /**
     * 初始化微信上下文
     */
    initContext() {
        return new Promise((resolve, reject) => {
            if (this.wx) {
                resolve(this.wx);
            } else {
                getWeixin().then((weixin) => {
                    this.wx = weixin;
                    resolve(weixin);
                });
            }
        });
    }

    /**
     * 分享
     * @param {Object} options
     * @property {string} options.title  标题
     * @property {string} options.desc  描述
     * @property {string} options.link  链接
     * @property {string} options.imgUrl 图片地址
     * @property {Function} options.trigger
     * @property {Function} options.success
     * @property {Function} options.cancel
     * @property {Function} options.fail
     */
    setShareInfo(options) {
        this.initContext().then((weixin) => {
            weixin.onMenuShareTimeline(options);
            weixin.onMenuShareAppMessage(options);
            weixin.onMenuShareQQ(options);
            weixin.onMenuShareWeibo(options);
        });
    }

    /**
     * 显示所有传播类菜单项。
     */
    showSpreadMenuItems() {
        this.initContext().then((weixin) => {
            weixin.showMenuItems({
                menuList: SPREAD_MENU_ITEMS
            });
        });
    }

    /**
     * 隐藏所有非基础菜单项。
     */
    hideAllNonBaseMenuItem() {
        this.initContext().then((weixin) => {
            weixin.hideAllNonBaseMenuItem();
        });
    }

    /**
     * 微信支付
     * @param {string} ajaxUrl 
     * @param {object} params 
     * @param {function} callback 
     */
    wxPay(ajaxUrl, params, callback, cancel) {
        const me = this;
        me.loading = new Loading();
        me.loading.show();
        me.initContext().then((wx) => {
            service.post(ajaxUrl, params).then(function (res) {
                me.loading.hide();
                me.loading.destroy();
                if (res && res.code === 200) {
                    const data = res.data;
                    wx.chooseWXPay({
                        appId: data.appId,
                        timestamp: data.timeStamp,
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: data.signType,
                        paySign: data.paySign,
                        // 支付成功后的回调函数
                        success: function () {
                            if (callback && typeof callback === 'function') {
                                callback();
                            }
                        },
                        cancel: function () {
                            if (cancel && typeof cancel === 'function') {
                                cancel();
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

    destroy() {
        this.wx = null;
    }
}
