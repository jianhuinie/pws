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
    var NavItem = function (_React$Component) {
        _inherits(NavItem, _React$Component);
        function NavItem(props) {
            _classCallCheck(this, NavItem);
            var _this = _possibleConstructorReturn(this, (NavItem.__proto__ || Object.getPrototypeOf(NavItem)).call(this, props));
            _this.clickNavItem = _this.clickNavItem.bind(_this);
            return _this;
        }
        _createClass(NavItem, [
            {
                key: 'clickNavItem',
                value: function clickNavItem() {
                    if (typeof this.props.callback === 'function') {
                        this.props.callback();
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', {
                        className: this.props.itemClassStatus,
                        onClick: this.clickNavItem
                    }, _react2.default.createElement('span', { className: 'text' }, this.props.name, _react2.default.createElement('i', { className: this.props.iconStatus })));
                }
            }
        ]);
        return NavItem;
    }(_react2.default.Component);
    NavItem.propTypes = {
        callback: _react.PropTypes.func.isRequired,
        name: _react.PropTypes.string.isRequired,
        itemClassStatus: _react.PropTypes.string.isRequired,
        iconStatus: _react.PropTypes.string.isRequired
    };
    exports.default = NavItem;
});