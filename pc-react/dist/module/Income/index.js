define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('./IncomeTable/index');
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
    var params = (0, _url2.default)().params;
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
                    _ajaxService2.default.get('/pc/finance/classroom/summary', { classroomId: Number(params.classroomId) }).then(function (res) {
                        var data = res.data;
                        _this2.setState(_extends({}, data, {
                            totalIncome: data.totalIncome.toFixed(2),
                            videoIncome: data.videoIncome.toFixed(2),
                            liveIncome: data.liveIncome.toFixed(2),
                            seriesIncome: data.seriesIncome.toFixed(2)
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
                    return _react2.default.createElement('div', { className: 'child-page income' }, _react2.default.createElement(_antd.Breadcrumb, null, _react2.default.createElement(_antd.Breadcrumb.Item, null, params.name), _react2.default.createElement(_antd.Breadcrumb.Item, null, '财务管理'), _react2.default.createElement(_antd.Breadcrumb.Item, null, '课堂收益')), _react2.default.createElement('div', { className: 'income-detail' }, _react2.default.createElement('div', null, _react2.default.createElement('span', { className: 'income-detail-strong' }, '总订单数\uFF1A', state.totalCnt), _react2.default.createElement('span', { className: 'income-detail-strong' }, '总购买人数\uFF1A', state.totalPayCnt), _react2.default.createElement('span', { className: 'income-detail-strong' }, '总净收益(元)\uFF1A', state.totalIncome)), _react2.default.createElement('div', null, _react2.default.createElement('span', null, '直播课\uFF1A', state.liveCnt), _react2.default.createElement('span', null, '总购买人数\uFF1A', state.livePayCnt), _react2.default.createElement('span', null, '总净收益(元)\uFF1A', state.liveIncome)), _react2.default.createElement('div', null, _react2.default.createElement('span', null, '视频课\uFF1A', state.videoCnt), _react2.default.createElement('span', null, '总购买人数\uFF1A', state.videoPayCnt), _react2.default.createElement('span', null, '总净收益(元)\uFF1A', state.videoIncome)), _react2.default.createElement('div', null, _react2.default.createElement('span', null, '系列课\uFF1A', state.seriesCnt), _react2.default.createElement('span', null, '总购买人数\uFF1A', state.seriesPayCnt), _react2.default.createElement('span', null, '总净收益(元)\uFF1A', state.seriesIncome))), _react2.default.createElement(_index2.default, null));
                }
            }
        ]);
        return Income;
    }(_PageController3.default);
    exports.default = Income;
});