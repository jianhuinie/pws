define(function (require, exports) {
    'use strict';
    var _react = require('react');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
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
    var Button = function (_React$Component) {
        _inherits(Button, _React$Component);
        function Button(props) {
            _classCallCheck(this, Button);
            var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));
            _this.clickHandler = _this.clickHandler.bind(_this);
            return _this;
        }
        _createClass(Button, [
            {
                key: 'clickHandler',
                value: function clickHandler() {
                    var me = this;
                    if (!me.isClick) {
                        me.isClick = true;
                        if (typeof me.props.callback === 'function') {
                            var result = me.props.callback();
                            if (result && result.then) {
                                result.then(function () {
                                    me.isClick = false;
                                });
                            } else {
                                me.isClick = false;
                            }
                        }
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', {
                        className: 'one2one-best-button ' + this.props.containerClass,
                        onClick: this.clickHandler
                    }, this.props.title);
                }
            }
        ]);
        return Button;
    }(_react2.default.Component);
    Button.propTypes = {
        title: _react.PropTypes.string.isRequired,
        callback: _react.PropTypes.func.isRequired,
        containerClass: _react.PropTypes.string
    };
    Button.defaultProps = { containerClass: '' };
    ;
    exports.default = Button;
});