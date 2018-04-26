define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('module/discovery/component/DiscoveryFooter/index');
    var _index3 = require('./All/index');
    var _index5 = require('./Ready/index');
    var _index7 = require('./Bought/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
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
    var TAB_CONFIGUE = [
        {
            name: '全部课程',
            path: '/all'
        },
        {
            name: '即将开始',
            path: '/ready'
        },
        {
            name: '已购课程',
            path: '/bought'
        }
    ];
    var CourseIndex = function (_PageController) {
        _inherits(CourseIndex, _PageController);
        function CourseIndex() {
            _classCallCheck(this, CourseIndex);
            return _possibleConstructorReturn(this, (CourseIndex.__proto__ || Object.getPrototypeOf(CourseIndex)).apply(this, arguments));
        }
        _createClass(CourseIndex, [{
                key: 'render',
                value: function render() {
                    var current = _reactRouter.hashHistory.getCurrentLocation().pathname;
                    if (current === '/') {
                        current = TAB_CONFIGUE[0].path;
                    }
                    return _react2.default.createElement('div', { className: 'course' }, _react2.default.createElement('div', { className: 'course-view' }, _react2.default.createElement('div', { className: 'course-view-tab' }, TAB_CONFIGUE.map(function (tab) {
                        return _react2.default.createElement('div', {
                            key: tab.path,
                            className: 'course-view-tab-item'
                        }, _react2.default.createElement(_reactRouter.Link, { to: tab.path }, _react2.default.createElement('div', { className: 'text ' + (current === tab.path ? 'active' : '') }, tab.name)));
                    })), _react2.default.createElement('div', { className: 'course-view-content' }, this.props.children), _react2.default.createElement(_index2.default, {
                        key: 'course',
                        current: 'course'
                    })));
                }
            }]);
        return CourseIndex;
    }(_PageController3.default);
    CourseIndex.propTypes = { children: _react.PropTypes.node };
    CourseIndex.defaultProps = { children: '' };
    var routes = _react2.default.createElement(_reactRouter.Route, {
        key: 'course',
        path: '/',
        component: CourseIndex
    }, _react2.default.createElement(_reactRouter.IndexRoute, { component: _index4.default }), _react2.default.createElement(_reactRouter.Route, {
        key: 'all',
        path: 'all',
        component: _index4.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'ready',
        path: 'ready',
        component: _index6.default
    }), _react2.default.createElement(_reactRouter.Route, {
        key: 'bought',
        path: 'bought',
        component: _index8.default
    }));
    exports.default = routes;
});