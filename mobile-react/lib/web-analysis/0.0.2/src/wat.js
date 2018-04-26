/**
 * @file 工具方法
 * @author zhujl
 */
(function (global) {

    'use strict';

    /**
     * 绑定事件
     *
     * @inner
     * @type {Function}
     */
    var on;

    /**
     * 解绑事件
     *
     * @inner
     * @type {Function}
     */
    var off;

    if (window.addEventListener) {
        on = function (element, type, handler) {
            element.addEventListener(type, handler, false);
        };
        off = function (element, type, handler) {
            element.removeEventListener(type, handler);
        };
    }
    else {
        on = function (element, type, handler) {
            element.attachEvent('on' + type, handler);
        };
        off = function (element, type, handler) {
            element.detachEvent('on' + type, handler);
        };
    }

    /**
     * 遍历对象
     *
     * @inner
     * @param {Object} target
     * @param {Function} callback
     */
    function each(target, callback) {
        if (typeof target.pop === 'function') {
            for (var i = 0, len = target.length; i < len; i++) {
                callback(target[i], i);
            }
        }
        else {
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    callback(target[key], key);
                }
            }
        }
    }

    /**
     * 扩展对象
     *
     * @inner
     * @param {Object} target
     * @param {Object=} source
     */
    function extend(target, source) {
        if (source) {
            each(
                source,
                function (value, key) {
                    target[key] = value;
                }
            );
        }
    }

    /**
     * 解析 json 对象
     *
     * @inner
     * @param {string} json
     * @return {Object}
     */
    function parseJSON(json) {
        try {
            return (new Function('return ' + json))();
        }
        catch (e) {
            return { };
        }
    }

    /**
     * 读取 cookie 值
     *
     * @inner
     * @param {string} name
     * @return {string}
     */
    function getCookie(name) {
        var regex = new RegExp(name + '=([^;]+)(?:;|$)');
        var match = document.cookie.match(regex);
        return match ? decodeURIComponent(match[1]) : '';
    }

    /**
     * 设置 cookie
     *
     * @inner
     * @param {string} name
     * @param {string} value
     * @param {Object=} options
     */
    function setCookie(name, value, options) {

        options = options || { };

        var expires = options.expires;
        if (expires == null) {
            // 永不过期，2 到底
            expires = new Date(2222, 2, 2);
        }

        var path = options.path;
        if (path == null) {
            // 保证网站全局可用
            path = '/';
        }

        var domain = options.domain;
        if (domain == null) {
            // 保证网站全局可用
            var terms = location.hostname.split('.');
            if (terms.length > 2) {
                terms.shift();
            }
            domain = terms.join('.');
        }

        document.cookie = [
            encodeURIComponent(name), '=', encodeURIComponent(value),
            ';expires=' + expires.toUTCString(),
            ';path=' + path,
            ';domain=' + domain,
            options.secure ? ';secure' : ''
        ].join('');
    }

    /**
     * 生成四位十六进制随机数
     *
     * @inner
     * @return {string}
     */
    function s4() {
       return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    /**
     * 创建一个 guid
     *
     * @inner
     * @return {string}
     */
    function guid() {
        return [
            s4() + s4(),
            s4(),
            s4(),
            s4(),
            s4() + s4() + s4()
        ].join('-');
    }

    /**
     * 创建完整 url
     *
     * @inner
     * @param {string} host
     * @param {string} path
     * @return {string}
     */
    function toUrl(host, path) {
        return location.protocol + '//' + host + path;
    }

    /**
     * 保持图片引用的数组
     *
     * @inner
     * @type {Array.<Image>}
     */
    var imageList = [ ];

    /**
     * 发送请求
     *
     * @inner
     * @param {string} url 请求 url
     * @param {Object} data 请求数据
     */
    var send = function (url, data) {

        if (!url) {
            return;
        }

        var queryArr = [ ];

        if (data) {
            each(
                data,
                function (value, name) {
                    if (value !== null) {
                        queryArr.push(
                            name + '=' + encodeURIComponent(value)
                        );
                    }
                }
            );
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


    global.WAT = {
        on: on,
        off: off,
        each: each,
        extend: extend,
        parseJSON: parseJSON,
        getCookie: getCookie,
        setCookie: setCookie,
        guid: guid,
        toUrl: toUrl,
        send: send
    };


})(this);

/**
 * @file 主模块
 * @author zhujl
 */
(function (global) {

    'use strict';

    var WAT = global.WAT;

    var exports = {

        /**
         * 当前版本
         *
         * @type {string}
         */
        version: '0.0.7',

        /**
         * 页面 url
         *
         * @type {string}
         */
        pageUrl: document.URL,

        /**
         * 来源
         *
         * @type {string}
         */
        referrer: document.referrer,

        /**
         * 发送日志的地址
         *
         * @type {string}
         */
        url: '',

        /**
         * 插件
         *
         * @type {Object}
         */
        plugins: { },

        /**
         * 初始化，入口方法
         *
         * @param {Object} options 用户配置
         * @param {string} options.url 发送日志地址
         * @param {Object} options.data 需要发送的数据，比如 productName sessionId 之类的
         */
        init: function (options) {

            WAT.each(
                options,
                function (value, name) {
                    var plugin = exports.plugins[name];
                    if (plugin && typeof plugin.init === 'function') {
                        plugin.init(value);
                    }
                    else {
                        exports[name] = value;
                    }
                }
            );

        },

        /**
         * 页面 load 之后执行
         */
        ready: function () {

            var data = {
                pageUrl: exports.pageUrl,
                referrer: exports.referrer
            };

            WAT.extend(data, exports.data);

            WAT.each(
                exports.plugins,
                function (plugin, name) {
                    if (typeof plugin.ready === 'function') {
                        plugin.ready();
                        WAT.extend(data, plugin.data);
                    }
                }
            );

            exports.info(data);
        },

        /**
         * 注册插件
         *
         * @param {string} name 插件名称
         * @param {Object} plugin 插件对象
         */
        register: function (name, plugin) {
            exports.plugins[name] = plugin;
        }

    };

    WAT.each(
        ['debug', 'info', 'warning', 'error'],
        function (type) {
            exports[type] = function (data) {
                var url = exports.url;
                if (url) {
                    data.logType = type;
                    data.pageUrl = exports.pageUrl;
                    WAT.send(url, data);
                }
            };
        }
    );

    WAT.extend(WAT, exports);



    if (document.readyState === 'complete') {
        setTimeout(exports.ready, 0);
    }
    else {
        /// 在触发 load 事件后发送数据
        WAT.on(window, 'load', function pageReady() {

            WAT.off(window, 'load', pageReady);

            // 使用延时的理由
            // 1. 不跟业务代码抢 onload 时间点，页面尽早可交互
            // 2. firstPaint（白屏时间）在 onload 读取可能是 0
            setTimeout(
                exports.ready,
                200
            );

        });
    }

    // 监控 js 报错
    WAT.on(window, 'error', function (e) {

        var data = {
            from: 'js'
        };

        // IE 可能是字符串
        if (!e || typeof e === 'string') {
            e = window.event;
            data.msg = e.errorMessage;
            data.line = e.errorLine;
            data.col = e.errorCharacter;
        }
        else {
            data.msg = e.message;
            data.line = e.lineno;
            data.col = e.colno;
        }

        exports.error(data);

    });


})(this);


/**
 * @file 获取点击日志
 * @author zhujl
 */
(function (global) {

    'use strict';

    /**
     * 可点击元素，需要绑定 data-click="json" 点击后会发送 json 到日志服务器
     *
     */

    var WAT = global.WAT;

    var exports = {

        action: '',

        init: function (options) {
            WAT.extend(exports, options);
        },

        /**
         * onload 事件后调用
         */
        ready: function () {

            WAT.on(
                document.body,
                'click',
                function (e) {

                    e = e || window.event;

                    var target = e.target || e.srcElement;

                    var list = [ ];

                    var clickData;

                    while (target) {

                        clickData =  target.getAttribute('data-click');

                        if (clickData) {
                            list.unshift(
                                WAT.parseJSON(clickData)
                            );
                        }

                        if (target.tagName === 'BODY') {
                            break;
                        }
                        else {
                            target = target.parentNode;
                        }
                    }

                    if (!list.length) {
                        return;
                    }

                    var data = { };

                    WAT.each(
                        list,
                        function (item) {
                            WAT.extend(data, item);
                        }
                    );

                    WAT.send(
                        exports.action,
                        data
                    );

                }
            );

        }

    };

    global.WAT.register('click', exports);

})(this);

/**
 * @file 获取网页加载时间点（需浏览器支持 timing api）
 * @author zhujl
 */
(function (global) {

    'use strict';

    /**
     * 计算渲染页面的各个时间点
     *
     * @inner
     * @return {Object}
     */
    function getTiming() {

        var performance = window.performance
                       || window.msPerformance
                       || window.webkitPerformance
                       || window.mozPerformance
                       || { };

        var timing = performance.timing;
        var result = { };

        if (timing) {

            for (var key in timing) {
                result[key] = timing[key];
            }

            if (result.firstPaint == null) {

                var chrome = window.chrome;

                if (chrome && chrome.loadTimes) {
                    result.firstPaint = parseInt(chrome.loadTimes().firstPaintTime * 1000);
                }
                else if (typeof result.msFirstPaint === 'number') {
                    result.firstPaint = result.msFirstPaint;
                    delete result.msFirstPaint;
                }
            }
        }

        return result;
    }

    var exports = {

        action: '',

        init: function (options) {
            WAT.extend(exports, options);
        },

        /**
         * onload 事件后调用
         */
        ready: function () {
            var timing = getTiming();
            var data = {
                timing_navigationStart: timing.navigationStart,
                timing_fetchStart: timing.fetchStart,
                timing_domainLookupStart: timing.domainLookupStart,
                timing_domainLookupEnd: timing.domainLookupEnd,
                timing_connectStart: timing.connectStart,
                timing_connectEnd: timing.connectEnd,
                timing_requestStart: timing.requestStart,
                timing_responseStart: timing.responseStart,
                timing_responseEnd: timing.responseEnd,
                timing_domLoading: timing.domLoading,
                timing_domInteractive: timing.domInteractive,
                timing_domContentLoadedEventStart: timing.domContentLoadedEventStart,
                timing_domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
                timing_domComplete: timing.domComplete,
                timing_loadEventStart: timing.loadEventStart,
                timing_loadEventEnd: timing.loadEventEnd,
                timing_firstPaint: timing.firstPaint || window.firstPaint
            };

            WAT.extend(data, exports.data || {});

            WAT.send(
                exports.action,
                data
            );
        }

    };

    global.WAT.register('timing', exports);

})(this);
