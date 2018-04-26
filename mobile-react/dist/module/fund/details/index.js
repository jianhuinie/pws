define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('./components/ListItem/index');
    var _index3 = require('./components/FilterPanel/index');
    var _walletDetailType = require('common/enum/walletDetailType');
    var _index5 = require('module/components/Empty/index');
    var _imgConfig = require('common/imgConfig');
    var _index7 = require('gsx-design/component/DropLoad/index');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _imgConfig2 = _interopRequireDefault(_imgConfig);
    var _index8 = _interopRequireDefault(_index7);
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
    var Details = function (_PageController) {
        _inherits(Details, _PageController);
        function Details(props) {
            _classCallCheck(this, Details);
            var _this = _possibleConstructorReturn(this, (Details.__proto__ || Object.getPrototypeOf(Details)).call(this, props));
            _this.setDrapLoad = function () {
                if (!_this.dropLoad) {
                    _this.dropLoad = new _index8.default({
                        element: $('.wallet-details-list'),
                        callback: _this.getDetails
                    });
                }
            };
            _this.getDetailSum = function () {
                var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _walletDetailType.walletTypeEnum.ALL;
                var self = _this;
                var ajaxParam = {};
                var courseType = self.state.courseType;
                if (courseType !== _walletDetailType.walletTypeEnum.ALL) {
                    ajaxParam.type = courseType;
                }
                _ajaxService2.default.get(_ajaxConfig2.default.WALLET.GET_DETAIL_SUM, ajaxParam).then(function (res) {
                    _this.setState(_extends({}, res.data, { totalText: _walletDetailType.walletTypeMap.get(courseType) }));
                });
            };
            _this.getDetails = function () {
                var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _walletDetailType.walletTypeEnum.ALL;
                var me = _this;
                var pageNum = _this.state.pageNum;
                var courseType = me.state.courseType;
                var ajaxParam = { pageNum: pageNum };
                if (courseType !== _walletDetailType.walletTypeEnum.ALL) {
                    ajaxParam.type = courseType;
                }
                return _ajaxService2.default.get(_ajaxConfig2.default.WALLET.GET_DATAIL_LIST, ajaxParam).then(function (res) {
                    var details = res.data.details;
                    var noMore = details.length < 10;
                    var isShowNoMore = pageNum > 1 && noMore;
                    if (noMore) {
                        me.dropLoad.dispose();
                        me.dropLoad = null;
                    }
                    var showDetails = void 0;
                    if (pageNum === 1) {
                        showDetails = details;
                    } else {
                        showDetails = _this.state.details.concat(details);
                    }
                    _this.setState({
                        loading: false,
                        pageNum: ++pageNum,
                        isShowNoMore: isShowNoMore,
                        details: showDetails
                    });
                });
            };
            _this.handleFilter = function (key) {
                _this.setState({
                    pageNum: 1,
                    loading: true,
                    courseType: key,
                    details: []
                }, function () {
                    _this.setDrapLoad();
                    _this.getDetailSum(key);
                    _this.getDetails(key);
                });
            };
            _this.state = {
                details: [],
                total: 0,
                count: 0,
                isShowNoMore: false,
                loading: true,
                pageNum: 1,
                courseType: 0,
                totalText: '全部'
            };
            return _this;
        }
        _createClass(Details, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    document.title = '钱包明细';
                    this.setDrapLoad();
                    this.getDetailSum();
                    this.getDetails();
                    _util2.default.sharePage();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var state = this.state;
                    var isEmpty = !this.state.details.length && !this.state.loading;
                    return _react2.default.createElement('div', { className: 'wallet-details' }, _react2.default.createElement('div', { className: 'wallet-details-summary' }, _react2.default.createElement('div', { className: 'wallet-details-summary-left' }, _react2.default.createElement('div', { className: 'type-text' }, state.totalText), _react2.default.createElement('div', { className: 'detail' }, '金额\uFFE5', state.total.toFixed(2), '\xA0\xA0总计', state.count, '条')), _react2.default.createElement(_index4.default, { onTypeChange: this.handleFilter })), _react2.default.createElement('div', { className: 'wallet-details-container ' + (isEmpty ? 'empty' : '') }, _react2.default.createElement('ul', { className: 'wallet-details-list' }, state.details.map(function (detail) {
                        return _react2.default.createElement('li', {
                            key: detail.id,
                            className: 'wallet-details-list-item'
                        }, _react2.default.createElement(_index2.default, detail));
                    })), this.state.isShowNoMore && this.state.details.length ? _react2.default.createElement('div', { className: 'no-more' }, '没有更多内容了') : null, isEmpty ? _react2.default.createElement(_index6.default, {
                        image: _imgConfig2.default.EMPTY.WITHDRAW_RECORD,
                        emptyText: '暂无内容'
                    }) : null));
                }
            }
        ]);
        return Details;
    }(_PageController3.default);
    exports.default = Details;
});