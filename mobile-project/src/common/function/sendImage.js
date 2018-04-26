/**
 * Created by xuzheng on 15/5/13.
 */
define(function (require, exports) {

    'use strict';

    var cache = [];

    function getRandom() {
        return "&random=" + new Date().getTime().toString(36);
    }

    function remove() {
        var img = this;
        for (var i = 0; i < cache.length; i++) {
            if (cache[i] === img) {
                cache.splice(i, 1);
                break;
            }
        }
        img = null;
    }

    return function (src) {
        var img = new Image();
        img.onload = img.onerror = img.onabort = remove;
        cache.push(img);
        img.src = src + getRandom();
        img = null;
    };
});