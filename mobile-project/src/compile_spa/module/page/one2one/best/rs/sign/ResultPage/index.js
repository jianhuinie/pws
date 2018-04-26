define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('compile_spa/common/components/TAppDownload/index');
    var _index3 = require('./components/SuccInfo/index');
    var _PageController2 = require('compile_spa/common/controller/PageController');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var SignResult = function (_PageController) {
        _inherits(SignResult, _PageController);
        function SignResult() {
            _classCallCheck(this, SignResult);
            return _possibleConstructorReturn(this, (SignResult.__proto__ || Object.getPrototypeOf(SignResult)).apply(this, arguments));
        }
        _createClass(SignResult, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'sign-result' }, _react2.default.createElement(_index4.default, null), _react2.default.createElement(_index2.default, null));
                }
            }]);
        return SignResult;
    }(_PageController3.default);
    exports.default = SignResult;
    ;
});