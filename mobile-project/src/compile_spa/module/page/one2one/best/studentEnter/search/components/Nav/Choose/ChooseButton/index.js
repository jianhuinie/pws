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
    var ChooseButton = function (_React$Component) {
        _inherits(ChooseButton, _React$Component);
        function ChooseButton(props) {
            _classCallCheck(this, ChooseButton);
            var _this = _possibleConstructorReturn(this, (ChooseButton.__proto__ || Object.getPrototypeOf(ChooseButton)).call(this, props));
            _this.state = { chooseIndex: _this.props.chooseIndex };
            _this.reset = _this.reset.bind(_this);
            _this.confirm = _this.confirm.bind(_this);
            return _this;
        }
        _createClass(ChooseButton, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ chooseIndex: nextProps.chooseIndex });
                }
            },
            {
                key: 'reset',
                value: function reset() {
                    if (typeof this.props.callbackReset === 'function') {
                        this.props.callbackReset();
                    }
                }
            },
            {
                key: 'confirm',
                value: function confirm() {
                    var data = this.state.chooseIndex;
                    if (typeof this.props.callbackConfirm === 'function') {
                        this.props.callbackConfirm(data);
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'choose-buttons' }, _react2.default.createElement('div', {
                        className: 'choose-reset',
                        onClick: this.reset
                    }, '重置'), _react2.default.createElement('div', {
                        className: 'choose-confirm',
                        onClick: this.confirm
                    }, '确定'));
                }
            }
        ]);
        return ChooseButton;
    }(_react2.default.Component);
    ChooseButton.propTypes = {
        chooseIndex: _react.PropTypes.object.isRequired,
        callbackReset: _react.PropTypes.func.isRequired,
        callbackConfirm: _react.PropTypes.func.isRequired
    };
    exports.default = ChooseButton;
});