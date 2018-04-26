define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _authStatus = require('common/enum/authStatus');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('./Apply/index');
    var _index3 = require('./Verifying/index');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _authStatus2 = _interopRequireDefault(_authStatus);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        }
        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Authentication = function (_PageController) {
        _inherits(Authentication, _PageController);
        function Authentication() {
            _classCallCheck(this, Authentication);
            return _possibleConstructorReturn(this, (Authentication.__proto__ || Object.getPrototypeOf(Authentication)).apply(this, arguments));
        }
        _createClass(Authentication, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_USER).then(function (res) {
                        var _res$data$user = res.data.user, authStatus = _res$data$user.authStatus, isTeacher = _res$data$user.isTeacher;
                        var classId = res.data.classroom && res.data.classroom.classId;
                        if (!isTeacher) {
                            location.replace('/mweb/student/home');
                            return;
                        }
                        switch (authStatus) {
                        case _authStatus2.default.UNAUTHORIZED: {
                                _reactRouter.hashHistory.replace('/apply');
                                break;
                            }
                        case _authStatus2.default.WAITING: {
                                setTimeout(function () {
                                    _reactRouter.hashHistory.replace('/verifying?id=' + classId);
                                }, 300);
                                break;
                            }
                        default: {
                                location.href = '/mweb/teacher/manager/center';
                            }
                        }
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'authen' }, this.props.children);
                }
            }
        ]);
        return Authentication;
    }(_PageController3.default);
    Authentication.propTypes = { children: _react.PropTypes.node };
    Authentication.defaultProps = { children: '' };
    var routes = _react2.default.createElement(_reactRouter.Route, {
        key: 'authen',
        path: '/',
        component: Authentication
    }, _react2.default.createElement(_reactRouter.Route, {
        key: 'apply',
        path: 'apply',
        component: _index2.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'verifying',
        path: 'verifying',
        component: _index4.default
    }));
    exports.default = routes;
});