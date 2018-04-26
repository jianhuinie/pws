define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _index = require('./index');
    var _index3 = require('./HomePage/index');
    var _index5 = require('./SuccPage/index');
    var _index7 = require('./FailPage/index');
    var _config = require('../config');
    var service = require('common/service');
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
        service.get(_config2.default.PATHS.RECRUIT_STATUS).then(function (res) {
            if (res.code === 0) {
                if (!res.data.is_login) {
                    _reactRouter.hashHistory.replace('one2one/best/rs/recruit/home');
                    return;
                }
                var dt = res.data;
                switch (dt.status) {
                case _config2.default.RECRUIT_STATUS.NO_RECRUIT:
                    _reactRouter.hashHistory.replace('one2one/best/rs/recruit/home');
                    break;
                case _config2.default.RECRUIT_STATUS.IS_VERIFING:
                    _reactRouter.hashHistory.replace('one2one/best/rs/recruit/success');
                    break;
                case _config2.default.RECRUIT_STATUS.VERIFY_REFUSE:
                    _reactRouter.hashHistory.replace('one2one/best/rs/recruit/fail');
                    break;
                case _config2.default.RECRUIT_STATUS.VERIFY_SUCCESS:
                    _reactRouter.hashHistory.replace('one2one/best/rs/sign/home');
                    break;
                case _config2.default.RECRUIT_STATUS.NO_VALID:
                    _reactRouter.hashHistory.replace('one2one/best/rs/recruit/home/1');
                    break;
                }
            } else if (res.code === 401) {
                location.href = res.redirect_url + encodeURIComponent('#/one2one/best/rs/recruit/');
            }
        });
    }
    var onEnter = function onEnter(nextState, replace) {
        var hash = nextState.location.pathname;
        if (hash !== '/one2one/best/rs/recruit/') {
            replace({ pathname: '/one2one/best/rs/recruit/' });
            return;
        }
        getHash();
    };
    var routes = _react2.default.createElement(_reactRouter.Route, {
        key: 'one2one-best-recruit',
        path: 'recruit',
        onEnter: onEnter,
        component: _index2.default
    }, _react2.default.createElement(_reactRouter.Route, {
        key: 'one2one-best-recruit-home',
        path: 'home(/:isNoValid)',
        component: _index4.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'one2one-best-recruit-success',
        path: 'success',
        component: _index6.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'one2one-best-recruit-fail',
        path: 'fail',
        component: _index8.default
    }));
    exports.default = routes;
});