define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('compile_spa/common/components/FailTips/index');
    var _index3 = require('compile_spa/common/components/TAppDownload/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
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
    var FailPage = function (_React$Component) {
        _inherits(FailPage, _React$Component);
        function FailPage() {
            _classCallCheck(this, FailPage);
            return _possibleConstructorReturn(this, (FailPage.__proto__ || Object.getPrototypeOf(FailPage)).apply(this, arguments));
        }
        _createClass(FailPage, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'sign-fail-page' }, _react2.default.createElement(_index2.default, { title: this.props.title }), _react2.default.createElement('div', { className: 'body' }, _react2.default.createElement('p', { className: 'title' }, this.props.reason), _react2.default.createElement('p', { className: 'service' }, this.props.serviceTitle)), _react2.default.createElement(_index4.default, null));
                }
            }]);
        return FailPage;
    }(_react2.default.Component);
    FailPage.propTypes = {
        title: _react.PropTypes.string.isRequired,
        reason: _react.PropTypes.string.isRequired,
        serviceTitle: _react.PropTypes.string.isRequired
    };
    ;
    exports.default = FailPage;
});