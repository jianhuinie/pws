/**
 * Created by xuzheng on 16/1/13.
 */
define(function (require, exports) {
    'use strict';

    var reg = new RegExp("^([a-z0-9-]+:)?[/]{2}(?:)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^?#]*))?(#[^#]*)?$", "i");

    function Url(strUrl) {
        var params = {};
        var hash = '';

        Object.defineProperty(this, "params", {
            set: function (newParams) {
                if ("object" == typeof newParams) {
                    for (var k in params) {
                        delete params[k];
                    }
                    for (var j in newParams) {
                        params[j] = newParams[j];
                    }
                }
            },
            get: function () {
                return params;
            },
            enumerable: !0
        });
        Object.defineProperty(this, "search", {
            set: function (url) {
                if ("string" == typeof url) {
                    if (0 == url.indexOf('?')) {
                        url = url.substr(1)
                    }
                    var items = url.split("&");
                    for (var key in params) {
                        delete params[key];
                    }
                    for (var e = 0; e < items.length; e++) {
                        var arr = items[e].split("=");
                        if (arr[0])
                            try {
                                params[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1] || "");
                            } catch (g) {
                                params[arr[0]] = arr[1] || "";
                            }
                    }
                }
            },
            get: function () {
                var arr = [];
                for (var key in params) {
                    if (params[key]) {
                        try {
                            arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
                        } catch (ex) {
                            arr.push(key + "=" + params[key]);
                        }
                    } else {
                        try {
                            arr.push(encodeURIComponent(key));
                        } catch (ex) {
                            arr.push(key);
                        }
                    }
                }
                return arr.length ? "?" + arr.join("&") : "";
            },
            enumerable: !0
        });
        Object.defineProperty(this, "hash", {
            set: function (str) {
                if (str && str.indexOf('#') < 0) {
                    str = "#" + str;
                }
                hash = str || "";
            },
            get: function () {
                return hash;
            },
            enumerable: !0
        });

        this.set = function (a) {
            a = a || "";
            var b;
            if (!(b = a.match(reg))) {
                b = [];
                console.error("Wrong uri scheme.");
            }
            this.protocol = b[1] || location.protocol;
            this.hostname = this.host = b[2];
            this.port = b[3] || "";
            this.pathname = b[4] || "/";
            this.search = b[5] || "";
            this.hash = b[6] || "";
            this.origin = this.protocol + "//" + this.hostname;
        };

        this.toString = function () {
            var rst = this.protocol + '//';
            rst += this.host;
            if (this.port && '80' !== this.port) {
                rst += ':' + this.port;
            }
            if (this.pathname) {
                rst += this.pathname;
            }
            if (this.search) {
                rst += this.search;
            }
            if (this.hash) {
                rst += this.hash;
            }
            return rst;
        };

        if (strUrl) {
            this.set(strUrl.toString());
        }
    }


    return function (strUrl) {
        return new Url(strUrl || location.href);
    };
});
