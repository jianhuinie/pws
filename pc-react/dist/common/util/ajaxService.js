define(function (require, exports) {
    'use strict';
    var _antd = require('antd');
    Object.defineProperty(exports, '__esModule', { value: true });
    var defaultErrorMessage = '网络请求失败, 请稍后重试';
    function errorHandler(res) {
        var text = res.msg || defaultErrorMessage;
        if (res.code === 401) {
            location.href = location.origin + '/login?targetUrl=' + location.origin + '/pcweb/#/classroom';
        } else {
            _antd.message.error(text, 3);
        }
    }
    function send(type, url, data) {
        var promise = void 0;
        if (type === 'POST') {
            promise = $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json;charset=utf-8'
            });
        } else {
            promise = $.get(url, data);
        }
        return new Promise(function (resolve, reject) {
            return promise.then(function (res) {
                if (res.code === 200) {
                    resolve(res);
                } else {
                    errorHandler(res);
                    reject();
                }
            });
        });
    }
    var get = function get(url, data) {
        return send('GET', url, data);
    };
    var post = function post(url, data) {
        return send('POST', url, data);
    };
    exports.default = {
        get: get,
        post: post
    };
});