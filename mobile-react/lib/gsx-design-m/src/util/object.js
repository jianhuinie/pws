/**
 * Created by gsx on 15/12/24.
 */
define(function () {
    'use strict';

    var object = {};

    /**
     * 判断是不是空对象
     * @author gsx
     * @date 2015.4.21
     * */
    object.isEmpty = function (obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    };

    object.toParamUrl = function (data, noCache) {
        var arr = [];
        if (data) {
            for (var key in data) {
                if ('undefined' !== typeof data[key] && null != data[key]) {
                    arr.push(key + '=' + encodeURIComponent(data[key]));
                }
            }
        }
        if (noCache) {
            // 加时间戳
            arr.push('_t=' + (+new Date()).toString(36));
        }
        return arr.join('&');
    };

    return object;
});