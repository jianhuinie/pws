define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var loadStatus = {
        _list: {},
        is: function is(url) {
            return this._list[url];
        },
        set: function set(url) {
            this._list[url] = true;
        }
    };
    var loadScript = function loadScript(url, async) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = !async;
        script.src = url;
        document.head.appendChild(script);
        return script;
    };
    var sync = function sync(url) {
        if (!loadStatus.is(url)) {
            loadScript(url);
        }
        loadStatus.set(url);
    };
    var async = function async(url, done) {
        if (loadStatus.is(url)) {
            if (done) {
                done();
            }
        } else {
            var loadJs = loadScript(url, false);
            if (document.all) {
                loadJs.onreadystatechange = function () {
                    if (loadJs.readyState === 'loaded' || loadJs.readyState === 'complete') {
                        loadStatus.set(url);
                        if (done) {
                            done();
                        }
                    }
                };
            } else {
                loadJs.onload = function () {
                    loadStatus.set(url);
                    if (done) {
                        done();
                    }
                };
            }
        }
    };
    var loadCss = function loadCss(path) {
        var doc = document;
        var styleElement = doc.getElementById(path);
        if (!styleElement) {
            styleElement = doc.createElement('style');
            styleElement.id = path;
            styleElement.type = 'text/css';
            styleElement.href = path;
            doc.getElementsByTagName('head')[0].appendChild(styleElement);
        }
    };
    exports.default = {
        sync: sync,
        async: async,
        loadCss: loadCss
    };
});