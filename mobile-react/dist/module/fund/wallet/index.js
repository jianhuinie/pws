define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('module/components/MenuList/index');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _util2 = _interopRequireDefault(_util);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
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
    var Wallet = function (_PageController) {
        _inherits(Wallet, _PageController);
        function Wallet(props) {
            _classCallCheck(this, Wallet);
            var _this = _possibleConstructorReturn(this, (Wallet.__proto__ || Object.getPrototypeOf(Wallet)).call(this, props));
            _this.getSummary = function () {
                _ajaxService2.default.get(_ajaxConfig2.default.WALLET.GET_SUMMARY).then(function (res) {
                    _this.setState(_extends({}, res.data));
                });
            };
            _this.state = {
                balance: 0,
                yesterdayIncome: 0,
                todayIncome: 0
            };
            return _this;
        }
        _createClass(Wallet, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    document.title = '我的钱包';
                    this.getSummary();
                    _util2.default.sharePage();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var state = this.state;
                    return _react2.default.createElement('div', { className: 'fund-wallet' }, _react2.default.createElement('div', { className: 'fund-wallet-head' }, _react2.default.createElement('a', { href: '/mweb/fund/details' }, _react2.default.createElement('div', { className: 'fund-wallet-head-bg' }, _react2.default.createElement('div', { className: 'balance-text' }, '账户余额 (元)'), _react2.default.createElement('div', { className: 'balance-number' }, state.balance.toFixed(2)), _react2.default.createElement('div', { className: 'balance-next' }, '查看明细 >')))), _react2.default.createElement('div', { className: 'fund-wallet-body' }, _react2.default.createElement('div', { className: 'fund-wallet-body-item' }, _react2.default.createElement('div', { className: 'title' }, '昨日收益\uFF08元\uFF09'), _react2.default.createElement('div', { className: 'number' }, state.yesterdayIncome.toFixed(2))), _react2.default.createElement('div', { className: 'fund-wallet-body-item' }, _react2.default.createElement('div', { className: 'title' }, '今日收益\uFF08元\uFF09'), _react2.default.createElement('div', { className: 'number' }, state.todayIncome.toFixed(2)))), _react2.default.createElement('a', { href: '/mweb/fund/withdraw' }, _react2.default.createElement('div', { className: 'fund-wallet-withdraw' }, '提现')), _react2.default.createElement(_index.MenuList, null, _react2.default.createElement(_index2.default, {
                        title: '想提高收益\uFF1F金牌老师手把手教你赚钱',
                        next: '/mweb/classroom?id=1'
                    })));
                }
            }
        ]);
        return Wallet;
    }(_PageController3.default);
    exports.default = Wallet;
    ;
});