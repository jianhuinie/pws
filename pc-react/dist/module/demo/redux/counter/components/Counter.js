define(function (require, exports) {
    'use strict';
    var _react = require('react');
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
    var CounterDemo = function (_Component) {
        _inherits(CounterDemo, _Component);
        function CounterDemo() {
            _classCallCheck(this, CounterDemo);
            return _possibleConstructorReturn(this, (CounterDemo.__proto__ || Object.getPrototypeOf(CounterDemo)).apply(this, arguments));
        }
        _createClass(CounterDemo, [
            {
                key: 'incrementIfOdd',
                value: function incrementIfOdd() {
                    if (this.props.value % 2 !== 0) {
                        this.props.onIncrement();
                    }
                }
            },
            {
                key: 'incrementAsync',
                value: function incrementAsync() {
                    setTimeout(this.props.onIncrement, 1000);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props, value = _props.value, onIncrement = _props.onIncrement, onDecrement = _props.onDecrement;
                    return _react2.default.createElement('p', null, 'Clicked: ', value, ' times', ' ', _react2.default.createElement('button', { onClick: onIncrement }, '+'), ' ', _react2.default.createElement('button', { onClick: onDecrement }, '-'), ' ', _react2.default.createElement('button', { onClick: this.incrementIfOdd }, 'Increment if odd'), ' ', _react2.default.createElement('button', { onClick: this.incrementAsync }, 'Increment async'));
                }
            }
        ]);
        return CounterDemo;
    }(_react.Component);
    CounterDemo.propTypes = {
        value: _react.PropTypes.number.isRequired,
        onIncrement: _react.PropTypes.func.isRequired,
        onDecrement: _react.PropTypes.func.isRequired
    };
    exports.default = CounterDemo;
    ;
});