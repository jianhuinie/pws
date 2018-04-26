/**
 * Created by xuzheng on 15/12/2.
 */
(function (global, namespace) {

    var config = {};


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


    var imageList = [];

    function send(url, data) {

        if (!url) {
            return;
        }

        var queryArr = [];

        if (data) {
            for (var key in data) {
                if ('undefined' !== typeof data[key] && null != data[key]) {
                    queryArr.push(key + '=' + encodeURIComponent(data[key]));
                }
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
    }


    function setConfig(options) {
        if (options) {
            for (var item in options) {
                if (options.hasOwnProperty(item)) {
                    config[item] = options[item];
                }
            }
        }
    }


    function isObject(o) {
        return Object.prototype.toString.apply(o) === '[object Object]'
    }


    var WAT = global[namespace] || {};

    WAT._isObject = isObject;
    WAT._config = config;

    WAT.setConfig = setConfig;
    WAT.toUrl = toUrl;
    WAT.send = send;

    global[namespace] = WAT;
})(this, 'WAT');

// ready
(function (global, namespace) {
    var wat = global[namespace];
    if (!wat) {
        return;
    }

    var list = [];
    var isReady = false;

    function doReady() {
        // 使用延时的理由
        // 1. 不跟业务代码抢 onload 时间点，页面尽早可交互
        // 2. firstPaint（白屏时间）在 onload 读取可能是 0
        setTimeout(function () {
            for (var i = 0, fn; fn = list[i]; i++) {
                fn();
            }
            list.length = 0;
        }, 200);
        if (window.removeEventListener) {
            window.removeEventListener('load', doReady, false);
        } else {
            window.detachEvent('onload', doReady);
        }
    }

    if (document.readyState === 'complete') {
        setTimeout(doReady, 0);
    } else {
        if (window.addEventListener) {
            window.addEventListener('load', doReady, false);
        } else {
            window.attachEvent('onload', doReady);
        }
    }

    wat['ready'] = function (fn) {
        if (isReady) {
            fn();
        } else {
            list.push(fn);
        }
    };
})(this, 'WAT', 'ready');

// cookie
(function (global, namespace, name1, name2) {
    var wat = global[namespace];
    if (!wat) {
        return;
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

        options = options || {};

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

    wat[name1] = setCookie;
    wat[name2] = getCookie;

})(this, 'WAT', 'setCookie', 'getCookie');

// pv上报
(function (global, namespace, interfaceName) {
    var wat = global[namespace];
    if (!wat) {
        return;
    }
    function parseURL(strURL) {
        var location;
        var search;
        var hash;
        var param = {};
        if (void 0 == strURL) {
            hash = window.location;
            strURL = hash.host;
            location = hash.pathname;
            search = hash.search.substr(1);
            hash = hash.hash;
        } else {
            hash = strURL.match(/\w+:\/\/((?:[\w-]+\.)+\w+)(?:\:\d+)?(\/[^\?\\\"\'\|\:<>]*)?(?:\?([^\'\"\\<>#]*))?(?:#(\w+))?/i) || [];
            strURL = hash[1];
            location = hash[2];
            search = hash[3];
            hash = hash[4];
        }
        if (search) {
            var arrSearch = search.split("&");
            var f = 0;
            var searchNum = arrSearch.length;
            var m, k;
            for (; f < searchNum; f++) {
                if (-1 != arrSearch[f].indexOf("=")) {
                    m = arrSearch[f].indexOf("=");
                    k = arrSearch[f].slice(0, m);
                    m = arrSearch[f].slice(m + 1);
                    param[k] = m;
                }
            }
        }

        return {
            host: strURL,
            path: location,
            search: search,
            hash: hash,
            param: param
        }
    }

    function page_info() {
        return {
            'page_url': document.URL,
            'referrer': document.referrer || ''
        };
    }

    function user_info() {
        return {
            'user_number': wat._config.user_number || '',
            'guid': wat._config.guid || ''
        };
    }

    /**
     * options:
     *      user_number
     *      guid
     *      hot
     *      params
     * */
    function pgv(options) {
        if (options) {
            wat.setConfig(options);
        }

        var params = {};
        var types = [];
        //types负责添加各种类别的参数
        types.push(page_info());
        types.push(user_info());
        types.push({'random': +new Date});

        for (var i = 0, n = types.length; i < n; i++) {
            for (var key in types[i]) {
                if (types[i].hasOwnProperty(key)) {
                    params[key] = types[i][key] || "";
                }
            }
        }
        if (options.params) {
            for (var k in options.params) {
                params[k] = options.params[k];
            }
        }

        var url = wat.toUrl('pb0.genshuixue.com', '/pv0.gif');
        wat.send(url, params);
    }

    wat[interfaceName] = pgv;
})(this, 'WAT', 'pgv');

// 点击上报
(function (global, namespace, name1, name2, name3) {
    var wat = global[namespace];
    if (!wat) {
        return;
    }

    function find_click_params(target) {
        var list = [];

        var locationData;
        var skuData;

        while (target && target.tagName) {
            locationData = target.getAttribute('data-click');
            if (!skuData) {
                skuData = target.getAttribute('data-sku');
            }
            if (locationData) {
                list.unshift(locationData);
            }
            if (target.tagName === 'BODY' || target.tagName == 'HTML') {
                break;
            } else {
                target = target.parentNode;
            }
        }
        var data = {};
        if (skuData) {
            skuData = skuData.split('|');
            data['item_type'] = skuData[0];
            data['item_id'] = skuData[1];
        }
        if (list.length > 0) {
            data['location'] = list.join('.');
        }
        return data;
    }

    function watchClick() {
        var on = function (element, eventName, fn) {
            var handle = function (evt) {
                evt = window.event || evt;
                var target = evt.srcElement || evt.target;
                fn.call(target, evt);
            };
            if (element.attachEvent) {
                element.attachEvent("on" + eventName, handle);
            } else {
                element.addEventListener(eventName, handle, !1);
            }
        };
        var doc = document;
        on(doc, 'click', function (evt) {
            sendClick(evt);
        });
    }

    function getPosition(event, doc, rx, ry) {
        var relativeX = rx || 0;
        var relativeY = ry || 0;
        doc = doc || document;
        event = event || window.event;
        var pos = {};
        if (event.pageX || event.pageY) {
            pos = {
                'x': event.pageX,
                'y': event.pageY
            };
        } else {
            var px = event.clientX +
                Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft) -
                doc.body.clientLeft;
            var py = event.clientY +
                Math.max(doc.documentElement.scrollTop, doc.body.scrollTop) -
                doc.body.clientTop;
            pos = {
                'x': px,
                'y': py
            };
        }
        pos.x += relativeX;
        pos.y += relativeY;
        var bodyCenterX = Math.max(
                Math.max(
                    document.body.clientWidth,
                    document.body.offsetWidth
                ),
                Math.max(
                    document.body.scrollWidth,
                    document.documentElement.scrollWidth
                )
            ) / 2;
        //计算相对于window.screen.width的位置
        pos.x = pos.x - bodyCenterX + window.screen.width / 2 - (
                Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight
                ) > (
                    "undefined" == typeof window.innerHeight ?
                        document.documentElement.clientHeight :
                        window.innerHeight
                ) ? 8.5 : 0
            );
        return pos;
    }

    function sendClick(evt, params) {
        evt = evt || window.event;
        var clickParams = find_click_params(evt.target || evt.srcElement);
        var watConfig = wat._config;

        if (!watConfig.hot && !clickParams.location) {
            return;
        }
        var position = getPosition(evt);

        var data = {
            'type': logParams.type || '',
            'service': logParams.service || '',
            'user_id': watConfig.user_number || '',
            'x': position.x,
            'y': position.y
        };

        //location, item_type, item_id
        if (wat._isObject(clickParams)) {
            for (var key in clickParams) {
                if (clickParams.hasOwnProperty(key)) {
                    data[key] = clickParams[key];
                }
            }
        }


        if (wat._isObject(params)) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    data[key] = params[key];
                }
            }
        }

        var url = wat.toUrl('pb0.genshuixue.com', '/ctr.gif');
        wat.send(url, data);
    }

    function initClick(params) {
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                logParams[key] = params[key];
            }
        }
    }

    var logParams = {};

    wat[name1] = watchClick;
    wat[name2] = sendClick;
    wat[name3] = initClick;
})(this, 'WAT', 'watchClick', 'sendClick', 'initClick');

// 速度上报(performance)
(function (global, namespace, interfaceName) {
    var wat = global[namespace];
    if (!wat) {
        return;
    }
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
            || {};

        var timing = performance.timing;
        var result = null;

        if (timing) {
            result = {};

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

    function send() {
        var timing = getTiming();
        if (!timing) {
            return;
        }
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
        var url = wat.toUrl('click.genshuixue.com', '/performance.gif');

        wat.send(url, data);
    }


    wat[interfaceName] = function () {
        wat.ready(send);
    }
})(this, 'WAT', 'timing');

// guid
(function () {
    var WAT = window.WAT;
    if (!WAT) {
        return;
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

    var key = '__guid__';
    var _guid = WAT.getCookie(key);
    if (!guid) {
        _guid = guid();
        WAT.setCookie(key, _guid);
    }
})();