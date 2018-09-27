define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
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
    var CourseTip = function (_PageController) {
        _inherits(CourseTip, _PageController);
        function CourseTip(props) {
            _classCallCheck(this, CourseTip);
            var _this = _possibleConstructorReturn(this, (CourseTip.__proto__ || Object.getPrototypeOf(CourseTip)).call(this, props));
            _this.state = {};
            return _this;
        }
        _createClass(CourseTip, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'course-tip' }, _react2.default.createElement('i', { className: 'icon icon-checked-o course-tip-item' }), _react2.default.createElement('div', { className: 'course-tip-item course-tip-text' }, '365天随时看'), _react2.default.createElement('i', { className: 'icon icon-checked-o course-tip-item' }), _react2.default.createElement('div', { className: 'course-tip-item course-tip-text' }, '手机电脑同步观看'));
                }
            }]);
        return CourseTip;
    }(_PageController3.default);
    ;
    exports.default = CourseTip;
});