define(function (require, exports) {
    'use strict';
    var _CommonController3 = require('common/controller/CommonController');
    var _react = require('react');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.MenuList = undefined;
    var _CommonController4 = _interopRequireDefault(_CommonController3);
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
    var MenuItem = function (_CommonController) {
        _inherits(MenuItem, _CommonController);
        function MenuItem(props) {
            _classCallCheck(this, MenuItem);
            var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));
            _this.goToNext = _this.goToNext.bind(_this);
            return _this;
        }
        _createClass(MenuItem, [
            {
                key: 'goToNext',
                value: function goToNext() {
                    if (this.props.next) {
                        location.href = this.props.next;
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', {
                        className: 'menu-list-item ' + this.props.menuClassName,
                        onClick: this.goToNext
                    }, _react2.default.createElement('div', { className: 'menu-list-item-title' }, this.props.title), _react2.default.createElement('div', { className: 'menu-list-item-content' }, this.props.content), _react2.default.createElement('div', { className: 'menu-list-item-next icon-next' }));
                }
            }
        ]);
        return MenuItem;
    }(_CommonController4.default);
    MenuItem.propTypes = {
        title: _react.PropTypes.node.isRequired,
        content: _react.PropTypes.node,
        menuClassName: _react.PropTypes.string,
        next: _react.PropTypes.string
    };
    MenuItem.defaultProps = {
        content: '',
        menuClassName: ''
    };
    exports.default = MenuItem;
    var MenuList = exports.MenuList = function (_CommonController2) {
        _inherits(MenuList, _CommonController2);
        function MenuList() {
            _classCallCheck(this, MenuList);
            return _possibleConstructorReturn(this, (MenuList.__proto__ || Object.getPrototypeOf(MenuList)).apply(this, arguments));
        }
        _createClass(MenuList, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'menu-list' }, this.props.children);
                }
            }]);
        return MenuList;
    }(_CommonController4.default);
    MenuList.propTypes = { children: _react.PropTypes.node.isRequired };
});