/**
 * Created by bjhl on 16/2/25.
 */
define(function (require, exports) {
    'use strict';

    var loadStatus = {
        _list: {},
        is: function (url) {
            return this._list[url];
        },
        set: function (url) {
            this._list[url] = true;
        }
    };

    var loadScript = function (url, async) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = !async;
        script.src = url;

        document.head.appendChild(script);

        return script;
    };

    exports.sync = function (url) {
        !loadStatus.is(url) && loadScript(url);
        loadStatus.set(url);
    };

    exports.async = function (url, done) {
        if (loadStatus.is(url)) {
            done && done();
        } else {
            var loadJs = loadScript(url, false);

            if (document.all) { 
                // IE
                loadJs.onreadystatechange = function () {
                    if (loadJs.readyState === 'loaded' || loadJs.readyState === 'complete') {
                        loadStatus.set(url);
                        done && done();
                    }
                };
            } else {
                loadJs.onload = function () {
                    loadStatus.set(url);
                    done && done();
                };
            }
        }
    };
});
