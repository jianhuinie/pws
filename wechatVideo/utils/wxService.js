/**
 * @file 这里提供一些跟小程序api相关的方法的抽取
 * @author niejianhui
 */
//类似jquery $.extend 方法
import config from './config';

function extend() {
    function isArray(elems) {
        return Object.prototype.toString.call(elems).indexOf('Array') > -1;
    }
    var target = arguments[0] || {};
    var deep = false;
    var i = 1;
    var length = arguments.length;
    var options, name, src, copy, clone;
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    if (length === i) {
        //不考虑这种情况
    }
    for (; i < length; i++) {
        options = arguments[i];
        if (options) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (src === copy) {
                    continue;
                }
                if (deep && copy && (typeof copy === 'object' || isArray(copy))) {
                    if (!isArray(copy)) {
                        clone = src || {};
                    } else {
                        clone = src || [];
                    }
                    target[name] = extend(deep, clone, copy);
                } else if (copy) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}

const TOKEN = 'TOKEN';
const wxService = {
    /**
     * 错误处理弹窗
     * options 参照官方文档
     */
    showErrorDialog: function(content) {
        wx.showModal({
            title: '提示',
            showCancel: false,
            content: content
        });
    },
    /**
     * 发送请求统一处理
     * options.url 请求url
     * options.data 请求数据
     * options.method 请求方式 默认 GET
     * options.header 请求头设置  和后端约定POST请求以form data 形式传递数据  故可在这统一处理header
     * options.dataType 请求数据类型
     * options.doneHandler 成功处理函数 后端code为 0
     * options.failCodeHandler 后端失败处理函数
     * options.failHandler 失败处理函数
     * options.completeHandler 完成处理函数
     * options.isShowLoading 是否显示loading 默认 false
     * options.loadingTip loading 提示文案 默认 '加载中' isShowLoading 为true有效
     * options.loadingMask  loading是否显示透明蒙层，防止触摸穿透 默认 false isShowLoading 为true有效
     * loading 暂且支持显示隐藏 不支持回调相关函数
     */
    sendWxRequest: function(options) {
        if (options.isShowLoading) {
            wx.showLoading({
                title: options.loadingTip || '加载中',
                mask: options.loadingMask || false
            });
        }
        //POST请求加上header
        var method = options.method || 'GET';
        var header = options.header || {};
        var defaultHeader = {
            'content-type': 'application/json',
            // 'content-type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        };
        if (method === 'POST') {
            header = extend(true, defaultHeader, header);
        }
        //加loggerId
        var profile = wx.getStorageSync('PROFILE');
        var loggerId = '';
        if (profile) {
            var timeStamp = +new Date();
            loggerId = profile.userId + '_' + timeStamp;
        }
        //每个请求加上token 和appVersion
        var data = extend(true, { token: wx.getStorageSync(TOKEN), appVersion: config.APP_VERSION, loggerId: loggerId }, options.data || {});
        console.log("TOKEN:" + wx.getStorageSync(TOKEN));
        wx.request({
            url: options.url,
            data: data,
            method: method,
            header: header,
            dataType: options.dataType || 'json',
            success: function(response) {
                options.isShowLoading && wx.hideLoading();
                //resData为后端的整体返回
                var resData = response.data;
                //具体信息还在里层的data里
                var backendData = resData.data || resData.datas || resData.artlist;
                if (+resData.code === 0 || resData.ret === 'ok') {
                    if (options.doneHandler && (typeof options.doneHandler === 'function')) {
                        options.doneHandler(backendData);
                    }
                } else if (resData.code === 401) {
                    wx.clearStorageSync();
                    wx.reLaunch({
                        url: '/pages/loading/index'
                    });
                } else {
                    if (options.failCodeHandler && (typeof options.failCodeHandler === 'function')) {
                        options.failCodeHandler(resData);
                    } else {
                        wxService.showErrorDialog(resData.msg);
                    }
                }
            },
            fail: function(err) {
                options.isShowLoading && wx.hideLoading();
                if (options.failHandler && (typeof options.failHandler === 'function')) {
                    options.failHandler(err);
                } else {
                    if (options.retryCount && options.retryCount >= 3) {
                        // wxService.showErrorDialog(err.errMsg);
                        wxService.showErrorDialog('连接失败，请重试');
                    } else {
                        options.retryCount = options.retryCount ? (++options.retryCount) : 1;
                        wxService.sendWxRequest(options);
                    }
                }
            },
            complete: function(response) {
                options.isShowLoading && wx.hideLoading();
                if (options.completeHandler && (typeof options.failHandler === 'function')) {
                    options.completeHandler(response);
                }
            }
        });
    }
};

export default wxService;