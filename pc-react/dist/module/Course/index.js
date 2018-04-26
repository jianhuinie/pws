define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _index = require('./CourseForm/index');
    var _PageController2 = require('common/controller/PageController');
    var _index3 = require('./Carousel/index');
    var _util = require('common/util/util');
    var _url = require('common/util/url');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index4 = _interopRequireDefault(_index3);
    var _util2 = _interopRequireDefault(_util);
    var _url2 = _interopRequireDefault(_url);
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
    var Course = function (_PageController) {
        _inherits(Course, _PageController);
        function Course() {
            _classCallCheck(this, Course);
            return _possibleConstructorReturn(this, (Course.__proto__ || Object.getPrototypeOf(Course)).apply(this, arguments));
        }
        _createClass(Course, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    _util2.default.renderLeftSider();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var TabPane = _antd.Tabs.TabPane;
                    return _react2.default.createElement('div', { className: 'course child-page' }, _react2.default.createElement(_antd.Breadcrumb, null, _react2.default.createElement(_antd.Breadcrumb.Item, null, (0, _url2.default)().params.name), _react2.default.createElement(_antd.Breadcrumb.Item, null, '课堂')), _react2.default.createElement(_antd.Tabs, {
                        defaultActiveKey: 'detail',
                        className: 'course-tab'
                    }, _react2.default.createElement(TabPane, {
                        tab: '课堂信息',
                        key: 'detail',
                        className: 'course-tab-pane'
                    }, _react2.default.createElement(_index2.default, null)), _react2.default.createElement(TabPane, {
                        className: 'course-tab-pane',
                        tab: '轮播图',
                        key: 'carousel'
                    }, _react2.default.createElement(_index4.default, null))));
                }
            }
        ]);
        return Course;
    }(_PageController3.default);
    exports.default = Course;
});