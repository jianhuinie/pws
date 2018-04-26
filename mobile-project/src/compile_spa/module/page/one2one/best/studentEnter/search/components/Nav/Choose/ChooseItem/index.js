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
    var ChooseItem = function (_React$Component) {
        _inherits(ChooseItem, _React$Component);
        function ChooseItem(props) {
            _classCallCheck(this, ChooseItem);
            var _this = _possibleConstructorReturn(this, (ChooseItem.__proto__ || Object.getPrototypeOf(ChooseItem)).call(this, props));
            _this.state = {
                itemArray: _this.props.itemArray,
                index: +_this.props.index
            };
            return _this;
        }
        _createClass(ChooseItem, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({
                        itemArray: nextProps.itemArray,
                        index: +nextProps.index
                    });
                }
            },
            {
                key: 'clickChooseItem',
                value: function clickChooseItem(item) {
                    if (typeof this.props.callback === 'function') {
                        this.props.callback({ value: +item.value });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: 'choose-items' }, _react2.default.createElement('div', { className: 'itemName' }, self.props.name), _react2.default.createElement('div', { className: 'items-content' }, self.props.itemArray.map(function (item, index) {
                        return _react2.default.createElement('span', {
                            key: index,
                            className: +item.value === +self.state.index ? 'active-item' : 'normal-item',
                            onClick: self.clickChooseItem.bind(self, item)
                        }, item.name);
                    })));
                }
            }
        ]);
        return ChooseItem;
    }(_react2.default.Component);
    ChooseItem.propTypes = {
        callback: _react.PropTypes.func.isRequired,
        itemArray: _react.PropTypes.array.isRequired,
        name: _react.PropTypes.string.isRequired,
        index: _react.PropTypes.number.isRequired
    };
    exports.default = ChooseItem;
});