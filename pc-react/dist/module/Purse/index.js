define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('./PurseTable/index');
    var _ajaxService = require('common/util/ajaxService');
    var _url = require('common/util/url');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _url2 = _interopRequireDefault(_url);
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
    var Income = function (_PageController) {
        _inherits(Income, _PageController);
        function Income(props) {
            _classCallCheck(this, Income);
            var _this = _possibleConstructorReturn(this, (Income.__proto__ || Object.getPrototypeOf(Income)).call(this, props));
            _this.state = {};
            return _this;
        }
        _createClass(Income, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    _ajaxService2.default.get('/pc/finance/wallet/summary').then(function (res) {
                        var data = res.data;
                        _this2.setState(_extends({}, data, {
                            balance: data.balance.toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
                                return $1 + ',';
                            }),
                            unsettledBalance: data.unsettledBalance.toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
                                return $1 + ',';
                            })
                        }));
                    });
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    _util2.default.renderLeftSider();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var state = this.state;
                    var popoverContent = _react2.default.createElement('div', { className: 'purse-detail-popover' }, _react2.default.createElement('div', { className: 'purse-detail-popover-para' }, '为了保障用户权益\uFF0C用户购买课程后产生的收益计为未结算余额\u3002'), _react2.default.createElement('div', { className: 'purse-detail-popover-para' }, '如果是单次视频课\uFF0C购买后3天进行结算\uFF1B如果是单次直播课\uFF0C开课后3天进行结算\uFF1B 如果是系列课\uFF0C购买后7天进行结算\u3002'), _react2.default.createElement('div', null, '课程收益结算后进入可提现余额\u3002'));
                    return _react2.default.createElement('div', { className: 'child-page purse' }, _react2.default.createElement(_antd.Breadcrumb, null, _react2.default.createElement(_antd.Breadcrumb.Item, null, (0, _url2.default)().params.name), _react2.default.createElement(_antd.Breadcrumb.Item, null, '财务管理'), _react2.default.createElement(_antd.Breadcrumb.Item, null, '钱包明细')), _react2.default.createElement('div', { className: 'purse-detail' }, _react2.default.createElement('div', { className: 'purse-detail-withdraw' }, _react2.default.createElement('span', { className: 'purse-detail-title' }, '可提现余额(元)'), _react2.default.createElement('span', { className: 'purse-detail-num' }, state.balance), _react2.default.createElement('span', { className: 'purse-detail-tip' }, '当前仅支持手机端\uFF0C请到微师公众号提现')), _react2.default.createElement('div', { className: 'purse-detail-unsettled' }, _react2.default.createElement('span', { className: 'purse-detail-title' }, '未结算金额(元)'), _react2.default.createElement('span', { className: 'purse-detail-num' }, state.unsettledBalance), _react2.default.createElement('span', { className: 'purse-detail-tip' }, '结算规则', _react2.default.createElement(_antd.Popover, {
                        placement: 'bottomLeft',
                        content: popoverContent,
                        getPopupContainer: function getPopupContainer(triggerNode) {
                            return triggerNode.parentNode;
                        }
                    }, _react2.default.createElement(_antd.Icon, {
                        className: 'purse-detail-icon',
                        type: 'exclamation-circle-o'
                    }))))), _react2.default.createElement(_index2.default, null));
                }
            }
        ]);
        return Income;
    }(_PageController3.default);
    exports.default = Income;
});