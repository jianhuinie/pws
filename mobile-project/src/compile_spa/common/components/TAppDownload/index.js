define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('../AppIcon/index');
    var app = require('common/app');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
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
    var TAppDownload = function (_React$Component) {
        _inherits(TAppDownload, _React$Component);
        function TAppDownload(props) {
            _classCallCheck(this, TAppDownload);
            var _this = _possibleConstructorReturn(this, (TAppDownload.__proto__ || Object.getPrototypeOf(TAppDownload)).call(this, props));
            _this.state = { hidden: '' };
            return _this;
        }
        _createClass(TAppDownload, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    if (app.isTeacherApp()) {
                        this.setState({ hidden: 'hidden' });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'teacher-download-bottom ' + this.state.hidden }, _react2.default.createElement(_index2.default, { containerClass: 't-icon' }), _react2.default.createElement('div', { className: 'intro' }, _react2.default.createElement('div', { className: 'title' }, '跟谁学APP老师版'), _react2.default.createElement('div', { className: 'content' }, '60万老师新时代招生授课首选')), _react2.default.createElement('a', { href: 'https://m.genshuixue.com/app/dw?t=t&ct=' }, _react2.default.createElement('div', { className: 'download' }, '点击下载')));
                }
            }
        ]);
        return TAppDownload;
    }(_react2.default.Component);
    ;
    exports.default = TAppDownload;
});