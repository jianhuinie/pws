define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('module/components/MenuList/index');
    var _stringService = require('common/util/stringService');
    var _ui = require('gsx-design/component/ui');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _stringService2 = _interopRequireDefault(_stringService);
    var _ui2 = _interopRequireDefault(_ui);
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
    var MIN_WITHDRAW = 2;
    var MAX_WITHDRAW = 20000;
    var Wallet = function (_PageController) {
        _inherits(Wallet, _PageController);
        function Wallet(props) {
            _classCallCheck(this, Wallet);
            var _this = _possibleConstructorReturn(this, (Wallet.__proto__ || Object.getPrototypeOf(Wallet)).call(this, props));
            _this.getSummary = function () {
                return _ajaxService2.default.get(_ajaxConfig2.default.WALLET.GET_WITHDRAW_SUMMARY).then(function (res) {
                    _this.setState(_extends({}, res.data));
                });
            };
            _this.moneyValidate = function (money) {
                if (isNaN(money) || money > _this.state.canWithdrawMoney || money > MAX_WITHDRAW) {
                    return false;
                }
                var index = money.indexOf('.');
                if (index > -1 && money.length - index > 3) {
                    return false;
                }
                return true;
            };
            _this.handleMoneyInput = function (e) {
                var value = e.target.value;
                if (_this.moneyValidate(value)) {
                    _this.setState({ money: value });
                }
            };
            _this.handleNameInput = function (e) {
                var value = e.target.value;
                if (_stringService2.default.getCharacterLength(value) <= 20) {
                    _this.setState({ name: value });
                }
            };
            _this.submit = function () {
                _this.setState({ submiting: true }, function () {
                    _ajaxService2.default.post(_ajaxConfig2.default.WALLET.WITHDRAW, {
                        money: Number(_this.state.money),
                        name: _this.state.name
                    }).then(function () {
                        _ui2.default.alert('申请已提交\uFF0C稍后将转入你的微信零钱\uFF0C请注意查收').done(function () {
                            location.href = '/mweb/fund/wallet';
                        });
                    });
                });
            };
            _this.state = {
                canWithdrawMoney: 0,
                unClearMoney: 0,
                money: '',
                name: '',
                submiting: false
            };
            _this._hackIos();
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
                key: '_hackIos',
                value: function _hackIos() {
                    window.onpageshow = function (event) {
                        if (event.persisted) {
                            window.location.reload();
                        }
                    };
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _state = this.state, canWithdrawMoney = _state.canWithdrawMoney, unClearMoney = _state.unClearMoney, money = _state.money, name = _state.name, submiting = _state.submiting;
                    var submitEnable = money && money >= MIN_WITHDRAW && name && !submiting;
                    return _react2.default.createElement('div', { className: 'fund-withdraw' }, _react2.default.createElement(_index2.default, {
                        title: '提现记录',
                        next: '/mweb/fund/records'
                    }), _react2.default.createElement('div', { className: 'fund-withdraw-head' }, _react2.default.createElement('div', { className: 'fund-withdraw-head-title' }, '微信提现')), _react2.default.createElement('div', { className: 'fund-withdraw-body' }, _react2.default.createElement('div', { className: 'fund-withdraw-body-item' }, _react2.default.createElement('div', { className: 'title' }, '可提现余额 (元)'), _react2.default.createElement('div', { className: 'number available' }, canWithdrawMoney.toFixed(2))), _react2.default.createElement('div', { className: 'fund-withdraw-body-item' }, _react2.default.createElement('div', { className: 'title' }, '未结算余额 (元)'), _react2.default.createElement('div', { className: 'number' }, unClearMoney.toFixed(2)), _react2.default.createElement('div', { className: 'desc' }, '为了保障用户权益\uFF0C用户购买课程后产生的收益计为未结算余额\u3002', _react2.default.createElement('br', null), '如果是单次视频课\uFF0C购买后3天进行结算\uFF1B如果是单次直播课\uFF0C开课后3天进行结算\uFF1B 如果是系列课\uFF0C购买后7天进行结算\u3002', _react2.default.createElement('br', null), '课程收益结算后进入可提现余额\u3002'))), _react2.default.createElement('div', { className: 'fund-withdraw-form' }, _react2.default.createElement('div', { className: 'fund-withdraw-form-item' }, _react2.default.createElement('div', { className: 'title' }, '提现金额'), _react2.default.createElement('input', {
                        className: 'value',
                        placeholder: '最小提现金额为2元',
                        value: money,
                        onChange: this.handleMoneyInput
                    })), _react2.default.createElement('div', { className: 'fund-withdraw-form-item' }, _react2.default.createElement('div', { className: 'title' }, '收款方实名'), _react2.default.createElement('input', {
                        className: 'value',
                        placeholder: '输入你的真实姓名',
                        value: name,
                        onChange: this.handleNameInput
                    })), _react2.default.createElement('div', { className: 'fund-withdraw-form-desc' }, '1.每笔提现金额至少2元\uFF0C每笔订单支付时\uFF0C微信官方已收取0.6%手续费\uFF0C详情', _react2.default.createElement('a', {
                        className: 'protocol',
                        href: 'http://kf.qq.com/faq/140225MveaUz1501077rEfqI.html'
                    }, '点此查看'), '\uFF1B', _react2.default.createElement('br', null), '2.每日账户提现上限为2万元\uFF0C超出请', _react2.default.createElement('a', {
                        className: 'protocol',
                        href: '/mweb/student/custom'
                    }, '联系客服'), '\uFF1B', _react2.default.createElement('br', null), '3.为保障你的资金安全\uFF0C提现申请需实名验证\uFF1B', _react2.default.createElement('br', null), '4.提现申请经微师处理后\uFF0C将直接转入你的微信零钱\uFF1B', _react2.default.createElement('br', null), '5.审核提现申请时间为工作日9:30-17:30\uFF0C其它时间段申请顺延至下一工作日\uFF1B', _react2.default.createElement('br', null), '6.如需帮助请', _react2.default.createElement('a', {
                        className: 'protocol',
                        href: '/mweb/student/custom'
                    }, '联系客服'))), _react2.default.createElement('div', { className: 'fund-withdraw-submit' }, _react2.default.createElement('button', {
                        disabled: !submitEnable,
                        className: 'ws-btn-red',
                        onClick: this.submit
                    }, submiting ? '提交中' : '确认')));
                }
            }
        ]);
        return Wallet;
    }(_PageController3.default);
    exports.default = Wallet;
    ;
});