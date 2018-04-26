/**
 * 环境信息，包括：浏览器、操作系统、跟谁学app和第三方app.
 */

import utilFunction from './function';

const createVersion = (function () {
    function compare(ver1, ver2) {
        ver1 = ver1.toString().split('.');
        ver2 = ver2.toString().split('.');

        for (let c = 0; c < ver1.length || c < ver2.length; c++) {
            let d = parseInt(ver1[c], 10);
            let e = parseInt(ver2[c], 10);
            if (isNaN(d)) {
                d = 0;
            }
            if (isNaN(e)) {
                e = 0;
            }
            if (e > d) {
                return -1;
            }
            if (d > e) {
                return 1;
            }
        }
        return 0;
    }

    function Version(strVersion) {
        Object.defineProperty(this, 'val', {
            value: strVersion.toString(),
            enumerable: !0
        });
        this.gt = function (a) {
            return compare(this, a) > 0;
        };
        this.gte = function (a) {
            return compare(this, a) >= 0;
        };
        this.lt = function (a) {
            return compare(this, a) < 0;
        };
        this.lte = function (a) {
            return compare(this, a) <= 0;
        };
        this.eq = function (a) {
            return compare(this, a) === 0; 
        };
    }

    Version.prototype = {
        toString: function () {
            return this.val;
        },
        valueOf: function () {
            const arr = this.val.split('.');
            const b = [];
            let i = 0;
            let item;
            let strItem;
            for (; i < arr.length; i++) {
                item = parseInt(arr[i], 10);
                if (isNaN(item)) {
                    item = 0;
                }
                strItem = item.toString();
                if (strItem.length < 5) {
                    strItem = new Array(6 - strItem.length).join('0') + strItem;
                    b.push(strItem);
                }
                if (b.length === 1) {
                    b.push('.');
                }
            }
            return parseFloat(b.join(''));
        }
    };

    return function (str) {
        return new Version(str);
    };
})();


function parseBrowser() {
    var browser = {};
    var c;
    var ua = navigator.userAgent;
    if (c = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) {
        browser = {
            name: 'UC',
            isUC: !0,
            version: c[1]
        };
    } else if (c = ua.match(/MQQBrowser\/([\d\.]+)/)) {
        browser = {
            name: 'QQ',
            isQQ: !0,
            version: c[1]
        };
    } else if (c = ua.match(/Firefox\/([\d\.]+)/)) {
        browser = {
            name: 'Firefox',
            isFirefox: !0,
            version: c[1]
        };
    } else if (c = (ua.match(/IEMobile\/([\d\.]+)/) || ua.match(/MSIE\s([\d\.]+)/) )) {
        browser = {
            version: c[1]
        };
        if (ua.match(/IEMobile/)) {
            browser.name = 'IEMobile';
            browser.isIEMobile = !0;
        } else {
            browser.name = 'IE';
            browser.isIE = !0;
        }
        if (ua.match(/Android|iPhone/)) {
            browser.isIELikeWebkit = !0;
        }
    } else if (c = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/)) {
        browser = {
            name: 'Chrome',
            isChrome: !0,
            version: c[1]
        };
        if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
            browser.name = 'Chrome Webview';
            browser.isWebview = !0
        }
    } else if (ua.match(/Safari/) && (c = ua.match(/Android[\s\/]([\d\.]+)/))) {
        browser = {
            name: 'Android',
            isAndroid: !0,
            version: c[1]
        };
    } else if (ua.match(/iPhone|iPad|iPod/) && (ua.match(/Safari/) && (c = ua.match(/Version\/([\d\.]+)/)))) {
        browser = {
            name: 'Safari',
            isSafari: !0,
            version: c[1]
        };
    } else if (c = ua.match(/OS ([\d_\.]+) like Mac OS X/)) {
        browser = {
            name: 'iOS Webview',
            isWebview: !0,
            version: c[1].replace(/\_/g, '.')
        };
    } else {
        browser = {
            name: 'unknown',
            version: '0.0.0'
        };
    }
    browser.version = createVersion(browser.version);

    var d = new RegExp('AppleWebKit[ /]?([0-9]+(.[0-9]+)*)').exec(ua);
    if (d && d[1]) {
        browser.isAppleWebkit = !0;
        browser.webkitVersion = createVersion(d[1]);
    }

    return browser;
}

function parse_os() {
    var os = null;
    var c;
    var ua = navigator.userAgent;
    if (c = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/)) {
        os = {
            name: 'Windows Phone',
            isWindowsPhone: !0,
            version: c[1]
        };
    } else if (ua.match(/Safari/) && (c = ua.match(/Android[\s\/]([\d\.]+)/))) {
        os = {
            version: c[1]
        };
        if (ua.match(/Mobile\s+Safari/)) {
            os.name = 'Android';
            os.isAndroid = !0;
        } else {
            os.name = 'AndroidPad';
            os.isAndroidPad = !0;
        }
    } else if (c = ua.match(/(iPhone|iPad|iPod)/)) {
        var e = c[1];
        if (c = ua.match(/OS ([\d_\.]+) like Mac OS X/)) {
            os = {
                name: e,
                isIPhone: 'iPhone' === e || 'iPod' === e,
                isIPad: 'iPad' === e,
                isIOS: !0,
                version: c[1].split('_').join('.')
            }
        }
    }
    if (!os) {
        os = {
            name: 'unknown',
            version: '0.0.0'
        };
    }
    os.version = createVersion(os.version);
    return os;
}

function parse_thirdApp() {
    var thirdapp = {};
    var ua = navigator.userAgent;
    if (ua.match(/Weibo/i)) {
        thirdapp = {
            name: 'Weibo',
            isWeibo: !0
        }
    } else if (ua.match(/MicroMessenger/i)) {
        thirdapp = {
            name: 'Weixin',
            isWeixin: !0
        }
    } else if (ua.match(/QQ\/([\d\.]+)/)) {
        thirdapp = {
            name: 'QQ',
            isQQ: !0
        };
    } else {
        thirdapp = !1;
    }
    return thirdapp;
}

function parse_gsxApp() {
    var UA_TEACHER = 'GenShuiXue-teacher';
    var UA_STUDENT = 'GenShuiXue-student';
    var UA_ORG = 'GenShuiXue-institution';
    /* 考研部落app */
    var UA_KAOYAN = 'KaoYanBuLuo';

    var ua = navigator.userAgent;

    var gsxApp = !1;

    var app_prefix = '';
    var app_name = '';
    if (-1 != ua.indexOf(UA_STUDENT)) {
        app_prefix = UA_STUDENT;
        app_name = 'student';
    } else if (-1 != ua.indexOf(UA_TEACHER)) {
        app_prefix = UA_TEACHER;
        app_name = 'teacher';
    } else if (-1 != ua.indexOf(UA_ORG)) {
        app_prefix = UA_ORG;
        app_name = 'org';
    } else if (-1 != ua.indexOf(UA_KAOYAN)) {
        app_prefix = UA_KAOYAN;
        app_name = "kaoyan";
    }
    if (app_prefix) {
        var arr = new RegExp(app_prefix + '-([0-9]{1,}[\.0-9]{0,})').exec(ua);
        gsxApp = {
            name: app_name,
            version: createVersion(arr[1])
        };
    }
    return gsxApp;
}

function Env() {
    Object.defineProperty(this, 'browser', {
        get: utilFunction.lazyConst(function () {
            return parseBrowser();
        }),
        enumerable: !0
    });

    Object.defineProperty(this, 'os', {
        get: utilFunction.lazyConst(function () {
            return parse_os();
        }),
        enumerable: !0
    });

    Object.defineProperty(this, 'thirdapp', {
        get: utilFunction.lazyConst(function () {
            return parse_thirdApp();
        }),
        enumerable: !0
    });

    Object.defineProperty(this, 'app', {
        get: utilFunction.lazyConst(function () {
            return parse_gsxApp();
        }),
        enumerable: !0
    });


    this.toString = this.valueOf = utilFunction.lazyConst(function () {
        const str = [];
        str.push(this.os.name + '_' + this.os.version.toString());
        str.push(this.browser.name + '_' + this.browser.version.toString());
        if (this.thirdapp) {
            str.push(this.thirdapp.name);
        } else if (this.app) {
            str.push(this.app.name + '_' + this.app.version.toString());
        }

        return str.join('::');
    });
}

export default new Env();