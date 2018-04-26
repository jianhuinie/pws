/**
 * @file 广告投放js
 * @author zengcheng
 */
(function (root, factory) {

    var adbook = factory();

    if (typeof define === 'function') {
        define(function () {
            return adbook;
        });
    } else {
        root.adbook = adbook;
    }
})(window, function() {

    var doc = document,
        win = window,
        head = document.getElementByTagName('head')[0];

    var Utils = (function() {

        var imageList = [];
        var Utils = {};

        /**
         * 发送请求
         * @inner
         * @param {string} url 请求 url
         * @param {Object} data 请求数据
         */
        var send = function (url, data) {

            if (!url) {
                return;
            }

            var queryArr = [];

            if (data) {
                for (var key in data) {
                    queryArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }
            }

            var img = new Image();

            // 保持引用
            var index = imageList.push(img) - 1;

            img.onload =
            img.onerror = function () {
                // 清除引用
                img =
                img.onload =
                img.onerror = null;
                delete imageList[index];
            };

            // 加时间戳
            queryArr.push('_t=' + (+new Date()).toString(36));

            img.src = url + '?' + queryArr.join('&');

        };

        /**
         * 原型继承
         * @param  {Function} child  子类
         * @param  {Function} parent 父类
         */
        var inherit = function (child, parent) {

            var f = function () {};
            child.prototype = new f();
            f.prototype = parent.prototype;
            f.constructor = child;
        };

        Utils.send = send;
        Utils.inherit = inherit;

        return Utils;
    })();




    /**
     * 基础js控制流程
     */
    function Base() {

        this.listeners = {};
    }

    Base.prototype.listen = function (key, callback) {

        if (key && typeof callback === 'function') {
            var listeners = this.listeners[key];
            !listeners && (this.listeners[key] = listeners = [])
            listeners.push(callback);
        }
    };

    Base.prototype.off = function (key, callback) {

        if (key) {
            var listeners = this.listeners[key];
            if (listeners && typeof callback === 'function') {
                for (var i = listeners.length - 1; i >= 0; i--) {
                    if (listeners[i] === callback) {
                        break;
                    }
                }
                listeners.splice(i, 1);
            } else if(listeners) {
                delete listeners[key];
            }
        }
    };

    Base.prototype.trigger = function (key, data) {

        if (key) {
            var listeners = this.listeners[key];
            if (listeners) {
                for (var i = listeners.length - 1; i >= 0; i--) {
                    listeners[i](data);
                }
            }
        }
    };

    /**
     * 原子的banner
     */
    function Banner() {

        this.adData = options.adData;
        this.init();
    }

    Banner.prototype.init = function () {

        this.listen('ad-pv', function () {

        });

        this.listen('ad-click', function () {

        });
    };

    /**
     * 多个banner 组成的大banner
     */
    function RichBanner() {

    }

    /**
     * 轮播banner
     */
    function FocusBanner() {

    }

    // 加载js资源
    var loadSource = function (url, callback) {

        var scriptEle = doc.createElement('script');
        var loaded = (typeof callback === 'function') ? function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete' ) {
                scriptEle.onload = scriptEle.onreadystatechange = null;
                callback()
            }
        } : function () {};
        scriptEle.onload = scriptEle.onreadystatechange = loaded;
        scriptEle.src = url;
        head.appendChild(scriptEle);
    };

    // 广告初始化入口
    var _adbook = function (data) {

    };

    return _adbook;
});