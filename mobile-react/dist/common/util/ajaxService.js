define(function (require, exports) {
    'use strict';
    var _zepto = require('zepto');
    var _ui = require('gsx-design/component/ui');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _zepto2 = _interopRequireDefault(_zepto);
    var _ui2 = _interopRequireDefault(_ui);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var defaultErrorMessage = '网络请求失败, 请稍后重试';
    function errorHandler(res) {
        var code = res.code;
        var text = res.msg || defaultErrorMessage;
        if (code === 401) {
            location.href = '/login?targetUrl=' + encodeURIComponent(location.href);
        } else if (code === 403 || code === 400 || code === 404 || code === 500) {
            location.replace('/mweb/error/');
        } else {
            _ui2.default.toast(text);
        }
    }
    function send(type, url, data) {
        var promise = void 0;
        if (type === 'POST') {
            promise = _zepto2.default.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json;charset=utf-8'
            });
        } else {
            promise = _zepto2.default.get(url, data);
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
    function synchGet(url, data) {
        var promise = _zepto2.default.ajax({
            url: url,
            type: 'GET',
            data: data,
            async: false
        });
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
    function postForm(url, data) {
        return _zepto2.default.ajax({
            url: url,
            type: 'POST',
            data: data,
            processData: false,
            contentType: false
        }).then(function (res) {
            if (res.code === 200) {
                return res;
            }
            errorHandler(res);
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
        post: post,
        postForm: postForm,
        synchGet: synchGet
    };
});