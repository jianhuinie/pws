define(function (require, exports) {
    'use strict';
    var _axios = require('axios');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _axios2 = _interopRequireDefault(_axios);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    _axios2.default.interceptors.response.use(function (res) {
        return res.data;
    });
    _axios2.default.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    _axios2.default.defaults.timeout = 3000;
    var defaultErrorMessage = '网络请求失败, 请稍后重试';
    function alertErrorInfo(res) {
        alert(res.msg || defaultErrorMessage);
    }
    var errorHandler = function errorHandler(res) {
        var code = res.code;
        if (code >= 400 && code < 500) {
            alertErrorInfo(res);
        } else if (code === 302) {
            location.href = res.redirect_url;
        } else {
            alertErrorInfo(res);
        }
    };
    var send = function send() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'POST';
        var url = arguments[1];
        var data = arguments[2];
        return (0, _axios2.default)({
            url: url,
            method: type,
            data: data
        }).then(function (res) {
            if (res.code === 200) {
                return res;
            }
            errorHandler(res);
        });
    };
    var post = function post(url, data) {
        return send('POST', url, data);
    };
    var get = function get(url, data) {
        return send('GET', url, data);
    };
    var service = {
        post: post,
        get: get
    };
    exports.default = service;
});