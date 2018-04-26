define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _antd = require('antd');
    var _index = require('./SingleForm/index');
    var _url = require('common/util/url');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _url2 = _interopRequireDefault(_url);
    var _util2 = _interopRequireDefault(_util);
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
    var SingleEdit = function (_React$Component) {
        _inherits(SingleEdit, _React$Component);
        function SingleEdit() {
            _classCallCheck(this, SingleEdit);
            return _possibleConstructorReturn(this, (SingleEdit.__proto__ || Object.getPrototypeOf(SingleEdit)).apply(this, arguments));
        }
        _createClass(SingleEdit, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    _util2.default.renderLeftSider();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var isOld = (0, _url2.default)().params.courseId;
                    return _react2.default.createElement('div', null, _react2.default.createElement(_antd.Breadcrumb, null, _react2.default.createElement(_antd.Breadcrumb.Item, null, (0, _url2.default)().params.name), _react2.default.createElement(_antd.Breadcrumb.Item, null, '课程管理'), _react2.default.createElement(_antd.Breadcrumb.Item, null, _react2.default.createElement(_reactRouter.Link, { to: '/single' }, '单次课')), _react2.default.createElement(_antd.Breadcrumb.Item, null, isOld ? '修改单次课' : '新建单次课')), _react2.default.createElement(_index2.default, null));
                }
            }
        ]);
        return SingleEdit;
    }(_react2.default.Component);
    exports.default = SingleEdit;
});