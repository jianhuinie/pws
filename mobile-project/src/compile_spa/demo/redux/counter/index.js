define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _redux = require('redux');
    var _Counter = require('./components/Counter');
    var _index = require('./reducers/index');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _Counter2 = _interopRequireDefault(_Counter);
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
    var store = (0, _redux.createStore)(_index2.default);
    var CounterContainerDemo = function (_React$Component) {
        _inherits(CounterContainerDemo, _React$Component);
        function CounterContainerDemo(props) {
            _classCallCheck(this, CounterContainerDemo);
            var _this = _possibleConstructorReturn(this, (CounterContainerDemo.__proto__ || Object.getPrototypeOf(CounterContainerDemo)).call(this, props));
            _this.state = { value: store.getState() };
            return _this;
        }
        _createClass(CounterContainerDemo, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    store.subscribe(function () {
                        this.setState({ value: store.getState() });
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(_Counter2.default, {
                        value: this.state.value,
                        onIncrement: function onIncrement() {
                            return store.dispatch({ type: 'INCREMENT' });
                        },
                        onDecrement: function onDecrement() {
                            return store.dispatch({ type: 'DECREMENT' });
                        }
                    });
                }
            }
        ]);
        return CounterContainerDemo;
    }(_react2.default.Component);
    exports.default = CounterContainerDemo;
    ;
});