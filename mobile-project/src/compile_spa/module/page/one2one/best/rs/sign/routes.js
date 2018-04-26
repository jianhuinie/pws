define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _index = require('./index');
    var _index3 = require('./HomePage/index');
    var _index5 = require('./ResultPage/index');
    var _index7 = require('./FailPage/index');
    var _config = require('../config');
    var service = require('common/service');
    var urlUtil = require('util/url_v2');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _config2 = _interopRequireDefault(_config);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function getHash() {
        var subjectId = urlUtil.parseQuery(location.search).subject_id;
        var data = {};
        if (subjectId) {
            data.subject_id = subjectId;
        }
        service.get(_config2.default.PATHS.SIGN_STATUS, data).then(function (res) {
            if (res.code === 0) {
                var dt = res.data;
                switch (dt.status) {
                case _config2.default.SIGN_STATUS.NO_VERIFY:
                    _reactRouter.hashHistory.replace('one2one/best/rs/recruit/fail');
                    break;
                case _config2.default.SIGN_STATUS.NO_SIGN_WITH_SUCCESS_VERIFY:
                    _reactRouter.hashHistory.replace('one2one/best/rs/sign/home');
                    break;
                case _config2.default.SIGN_STATUS.IS_SIGN:
                    _reactRouter.hashHistory.replace('one2one/best/rs/sign/result');
                    break;
                case _config2.default.SIGN_STATUS.NO_RECRUIT:
                    _reactRouter.hashHistory.replace('one2one/best/rs/recruit/home');
                    break;
                }
            } else if (res.code === 401) {
                location.href = res.redirect_url + encodeURIComponent('#/one2one/best/rs/sign/');
            }
        });
    }
    var onEnter = function onEnter(nextState, replace) {
        var hash = nextState.location.pathname;
        if (hash !== '/one2one/best/rs/sign/') {
            replace({ pathname: '/one2one/best/rs/sign/' });
            return;
        }
        getHash();
    };
    var routes = _react2.default.createElement(_reactRouter.Route, {
        key: 'one2one-sign',
        path: 'sign',
        onEnter: onEnter,
        component: _index2.default
    }, _react2.default.createElement(_reactRouter.Route, {
        key: 'one2one-sign-home',
        path: 'home',
        component: _index4.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'one2one-sign-fail',
        path: 'fail',
        component: _index8.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'one2one-sign-result',
        path: 'result',
        component: _index6.default
    }));
    exports.default = routes;
});