/**
 * Created by xuzheng on 15/4/21.
 */
define(function (require, exports) {
    var URL = require('util/url');
    var string = exports.string = {};
    var object = exports.object = {};
    var array = exports.array = {};
    var lang = exports.lang = {};
    var number = exports.number = {};
    var math = exports.math = {};
    var browser = exports.browser = {};
    var platform = exports.platform = {};
    var fun = exports.function = {};
    var timer = exports.timer = {};

    var _bp = (function () {
        var userAgent = navigator.userAgent;
        var ua = userAgent.toLowerCase();
        var i = 0;
        var n;
        var str;
        var arr;
        var browser = 0;
        var browserVersion;
        var platform;

        //0-null, 1-opera, 2-msie, 3-chrome, 4-applewebkit, 5-firefox, 6-mozilla

        var browser_arr = ["opera", "msie", "chrome", "applewebkit", "firefox", "mozilla"];

        //0-null, 1-x11, 2-mac, 3-windows, 4-android, 5-iphone, 6-ipad
        var platform_arr = ["x11", "macintosh", "windows", "android", "iphone", "ipad"];
        for (n = browser_arr.length; i < n; i++) {
            str = browser_arr[i];
            if (-1 != ua.indexOf(str)) {
                browser = i + 1;
                arr = new RegExp(str + "[ /]?([0-9]+(.[0-9]+)?)").exec(ua);
                if (arr) {
                    browserVersion = parseFloat(arr[1]);
                    break;
                }
            }
        }
        if (browser == 6) {
            arr = /^mozilla\/.*gecko\/.*(minefield|shiretoko)[ /]?([0-9]+(.[0-9]+)?)/.exec(ua);
            if (arr) {
                browser = 5;
                browserVersion = parseFloat(arr[2]);
            }
            arr = /trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(ua);
            if (arr) {
                browser = 2;
                browserVersion = parseFloat(arr[1]);
            }
        }
        if (browser == 1) {
            arr = /^opera\/9.[89].*version\/?([0-9]+(.[0-9]+)?)/.exec(ua);
            if (arr) {
                browserVersion = parseFloat(arr[1]);
            }
        }
        for (i = 0, n = platform_arr.length; i < n; i++) {
            str = platform_arr[i];
            if (-1 != ua.indexOf(str)) {
                platform = i + 1;
                break;
            }
        }

        return [browser, browserVersion, platform];
    })();

    browser.type = _bp[0];
    browser.version = _bp[1];
    browser.isFirefox = function () {
        return _bp[0] == 5;
    };
    browser.isCompatMode = function () {
        return document.compatMode || "";
    };
    browser.getFirefoxVersion = function () {
        var isFirefox = _bp[0] == 5;
        var ua = navigator.userAgent;
        var rv;
        if (isFirefox) {
            var a = /\brv:\s*(\d+\.\d+)/.exec(ua);
            if (a) {
                rv = parseFloat(a[1]);
            }
        }
        return rv;
    };
    browser.isAppleWebkit = function () {
        return _bp[0] == 3 || _bp[0] == 4;
    };
    browser.isIE = function () {
        return _bp[0] == 2;
    };
    platform.type = _bp[2];
    platform.isIOS = function () {
        return _bp[2] == 5 || _bp[2] == 6;
    };
    platform.isAndroid = function () {
        return _bp[2] == 4;
    };
    platform.getAppleOSVersion = function () {
        var platform = _bp[2];
        var ua = navigator.userAgent;
        var version = false;
        if (platform == 5 || platform == 6 || platform == 2) {
            var a = /OS (?:X )?(\d+[_.]\d)/.exec(ua);
            if (a) {
                version = parseFloat(a[1].replace("_", "."));
            }
        }
        return version;
    };

    /**
     * 返回min与max之间的数。
     * */
    math.clamp = function (num, min, max) {
        return num < min ? min : num > max ? max : num;
    };

    /**
     * 忽略js浮点数运算带来的误差，判断两个数字是否相等
     * */
    number.equals = function (a, b) {
        return Math.abs(a - b) <= 1E-10
    };

    lang.isString = function (o) {
        return '[object String]' == Object.prototype.toString.call(o);
    };
    lang.isNumber = function (o) {
        return $.isNumeric(o);
    };
    lang.isBoolean = function (o) {
        return '[object Boolean]' == Object.prototype.toString.call(o);
    };
    lang.isUndefined = function (o) {
        return typeof o === 'undefined';
    };
    lang.isNull = function (o) {
        return o === null;
    };
    lang.isFunction = function (o) {
        return $.isFunction(o);
    };
    lang.isObject = function (o) {
        return Object.prototype.toString.apply(o) === '[object Object]';
    };
    lang.isArray = function (o) {
        return '[object Array]' == Object.prototype.toString.call(o);
    };
    lang.isJQuery = function (o) {
        if (window.jQuery) {
            return o instanceof jQuery;
        } else {
            return false;
        }
    };
    lang.isDom = (function () {
        if (lang.isObject(window.HTMLElement)) {
            return function (o) {
                return o instanceof HTMLElement;
            }
        } else {
            return function (o) {
                return o &&
                    lang.isObject(o) &&
                    1 === o.nodeType &&
                    lang.isString(o.nodeName);
            };
        }
    })();

    lang.union = function () {
        var args = arguments, len = args.length;
        return function () {
            for (var i = 0; i < len; ++i) {
                if (args[i].apply(this, arguments)) {
                    return true;
                }
            }
            return false;
        };
    };

    /**
     * 将函数参数对象或节点列表转换成数组。
     * @param {Object} obj 函数参数对象或节点列表.
     * @param {Number} [start] 数组开始元素是从零开始计算的下标。
     * @param {Number} [end] 数组结束元素是从零开始计算的下标.
     * @author xuzheng
     * @date 2015.4.21
     */
    array.argsToArray = function (obj, start, end) {
        var args = [];
        var len = obj.length;
        start = start || 0;
        end = end || len;
        for (var i = start; i < end; i++) {
            args.push(obj[i]);
        }
        return args;
    };

    /**
     * 把字符串的首字母编程大写
     * @author xuzheng
     * @date 2015.4.21
     * */
    string.initcap = (function () {
        var cache = {};
        return function (str) {
            return cache[str] || (cache[str] = str.substr(0, 1).toUpperCase() + str.substr(1));
        };
    })();

    /**
     * 判断是不是空对象
     * @author xuzheng
     * @date 2015.4.21
     * */
    object.isEmpty = function (object) {
        for (var p in object) {
            if (object.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    };


    object.getUid = (function () {
        var uid = 0;
        var magic = '__GSX__';

        return function (obj, isReset) {
            return (!isReset && obj[magic]) || (obj[magic] = ++uid);
        };
    })();


    fun.singleton = function (cons) {
        if (!cons.hasOwnProperty("__instance__")) {
            cons["__instance__"] = new cons;
        }
        return cons["__instance__"];
    };

    fun.bind = function (handle, context) {
        if (arguments.length > 2) {
            var args = array.argsToArray(arguments, 2);
            return function () {
                return handle.apply(context || this, arguments.length > 0 ? args.concat(array.argsToArray(arguments)) :
                    args);
            }
        } else {
            return function () {
                return handle.apply(context || this, arguments)
            }
        }
    };

    fun.lazyConst = function (f) {
        var c;
        return function () {
            if (f) {
                c = f();
                f = null;
            }
            return c;
        };
    };

    fun.nothing = function () {
    };

    /**
     * 实现类的原型链继承
     *
     * @author xuzheng
     * @date 2015.4.21
     * */
    exports.inherits = function (child, parent) {
        function Parent() {
        }

        Parent.prototype = parent.prototype;
        child.prototype = new Parent;
    };
    /**
     * 编码html特殊字符
     */
    exports.encodeHTML = function () {
        var temp_dom = document.createElement("div");
        return function (txt) {
            var t = document.createTextNode(txt),
                res = temp_dom.appendChild(t).parentNode.innerHTML;
            temp_dom.innerHTML = "";
            return res;
        }
    }();

    /**
     * 获取绝对地址
     * @author xuzheng
     * @date 2015.5.9
     * */
    exports.getAbsoluteUrl = function (href) {
        var newElement = $('<a href="' + href + '"></a>')[0];
        var result = newElement.href;
        if (!(result.indexOf('http://') == -1 && result.indexOf('https://') == -1)) {
            return result;
        } else {
            return false;
        }
    };

    (function () {
        var raf = window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame
            || window.oRequestAnimationFrame;

        var caf = window.cancelAnimationFrame
            || window.mozCancelAnimationFrame
            || window.webkitCancelAnimationFrame
            || window.msCancelAnimationFrame
            || window.oCancelAnimationFrame;
        if (raf && caf) {
            timer.isSupportRAF = true;
            timer.request = function (fn) {
                return raf.call(null, fn);
            };
            timer.cancel = function (id) {
                caf(id);
            };
        } else {
            timer.isSupportRAF = false;
            timer.request = function (func, time) {
                return window.setTimeout(func, time);
            };
            timer.cancel = function (timer) {
                window.clearTimeout(timer);
            };
        }
    })();

    exports.enableGPU = (function () {

        /*
         var macHack = platform == 2 && appleOS >= 10.6 && type == 4 && 533.19 <= version;
         var androidHack = platform == 4 && type == 4 && 534 <= version;
         var chromeHack = type == 3 && (21 <= version && (platform == 1 || platform == 2 || platform == 3) || 18 <= version && platform == 4);
         */
        //htc butterfly s原生浏览器下，如果开启硬件加速，会没有高清效果
        var isSupport = fun.lazyConst(function () {
            var browserType = browser.type;
            var browserVersion = browser.version;
            var platformType = platform.type;
            var appleOS = platform.getAppleOSVersion();
            var isIOS = platform.isIOS();
            var ua = navigator.userAgent;
            var isX920E = ua.toLowerCase().indexOf("x920e") !== -1;
            var HONOR7 = ua.toLowerCase().indexOf("plk-tl01h") !== -1;
            if (
                !isX920E && !HONOR7 && (
                    isIOS ||
                    (platformType == 2 && appleOS >= 10.6 && browserType == 4 && 533.19 <= browserVersion) || //macHack
                    (platformType == 4 && browserType == 4 && 534 <= browserVersion) || //androidHack
                    (browserType == 3 && (21 <= browserVersion && (platformType == 1 || platformType == 2 || platformType == 3) || 18 <= browserVersion && platformType == 4)) //chromeHack
                )
            ) {
                return true;
            }
        });

        return function (element) {
            if (isSupport()) {
                element.style.WebkitTransform = "translateZ(0)";
            }
        }
    })();

    /**
     * 判断页面是否缩放，如缩放，并且window.devicePixelRatio大于等于2，宽度乘以2
     * */
    exports.isScale = function () {
        var flag = false;
        var domEle = document.querySelector('meta[name=viewport]');
        var viewPortContent = domEle.getAttribute('content');
        var viewPortArr = viewPortContent.split(', ');
        var obj = {};
        
        viewPortArr.forEach(function (value) {
            var tempArr = value.split('=');
            obj[tempArr[0]] = tempArr[1];
        });

        if (obj['initial-scale'] < 1) {
            flag = true;
        }

        return flag;
    };

    /**
     * 像素转rem
     *
     * @param {number} numPx 像素数
     * @param {boolean} [isBasePixel] 是否是UE图上取出的像素值
     * */
    exports.px2rem = function (numPx, isBasePixel) {
        if (window.rem) {
            //var width = document.documentElement.getBoundingClientRect().width;
            //return numPx / width * 20 + 'rem';
            var rst = numPx / window.rem;
            if (isBasePixel) {
                rst *= window.rem / 16;
            }
            return rst + 'rem';
        } else {
            return numPx / 16 + 'rem';
        }
    };

    exports.getHashParams = function () {
        var urlStr = URL().hash.split('?')[1];
        var dataObj = {};

        if (urlStr) {
            var urlArr = urlStr.split('&');
            urlArr.forEach(function (value) {
                var tempArr = value.split('=');
                dataObj[tempArr[0]] = decodeURIComponent(tempArr[1]);
            });
        }
        return dataObj;
    };


    exports.insertCssText = function (strCss, ownerDocument) {
        var doc = ownerDocument || document;
        var styleElement = doc.getElementById('GSX_CSS_MODULE');
        if (!styleElement) {
            styleElement = doc.createElement('style');
            styleElement.id = 'GSX_CSS_MODULE';
            styleElement.type = 'text/css';
            doc.getElementsByTagName('head')[0].appendChild(styleElement);
        }
        var textNode = doc.createTextNode(strCss);
        var token = object.getUid(textNode);
        styleElement.appendChild(textNode);
        return token;
    };

    exports.removeCssText = function (token, ownerDocument) {
        var doc = ownerDocument || document;
        var styleElement = doc.getElementById('GSX_CSS_MODULE');
        if (!styleElement) {
            styleElement = doc.createElement('style');
            styleElement.type = 'text/css';
            doc.getElementsByTagName('head')[0].appendChild(styleElement);
        }
    };


    /**
     * 计算两个经纬度点之间的距离，单位米
     *
     * @params {object} latlng1 经纬度对象{lat:xxx,lng:xxx}
     * @params {object} latlng2 同上
     * @params {number|null} [c] 球体半径（默认为地球半径）
     * */
    exports.computeDistance = (function () {
        var degreeToRadian = function (deg) {
            return deg * (Math.PI / 180)
        };
        var computeScaleBetween = function (a, b) {
            var c = degreeToRadian(a.lat);
            var d = degreeToRadian(b.lat);
            return 2 * Math.asin(
                    Math.sqrt(
                        Math.pow(Math.sin((c - d) / 2), 2) + Math.cos(c) * Math.cos(d) *
                        Math.pow(Math.sin((degreeToRadian(a.lng) - degreeToRadian(b.lng)) / 2), 2)));
        };
        var EARTH_RADIUS = 6378136.49;
        return function (latlng1, latlng2, c) {
            return computeScaleBetween(latlng1, latlng2) * (c || EARTH_RADIUS);
        }
    })();

    /**
     * 精确到小数点后若干位
     * @params {number} number 浮点数
     * @params {number} precision 精确到小数点后几位，例如 小数点后两位（0.12），就传2
     * */
    number.round = function (number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    };
});