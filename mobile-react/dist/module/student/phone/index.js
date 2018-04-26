define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('../../components/PhoneVerify/index');
    var _ui = require('gsx-design/component/ui');
    var _util = require('common/util/util');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _ui2 = _interopRequireDefault(_ui);
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
    var StepTwo = function (_PageController) {
        _inherits(StepTwo, _PageController);
        function StepTwo(props) {
            _classCallCheck(this, StepTwo);
            var _this = _possibleConstructorReturn(this, (StepTwo.__proto__ || Object.getPrototypeOf(StepTwo)).call(this, props));
            _this.handleSubmitSuccess = function () {
                _ui2.default.alert('修改成功').done(function () {
                    location.replace('/mweb/student/home');
                });
            };
            _this.handleSubmitSuccess = _this.handleSubmitSuccess.bind(_this);
            return _this;
        }
        _createClass(StepTwo, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    document.title = '短信验证';
                    _util2.default.sharePage();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(_index2.default, { onSubmitSuccess: this.handleSubmitSuccess });
                }
            }
        ]);
        return StepTwo;
    }(_PageController3.default);
    exports.default = StepTwo;
    ;
});