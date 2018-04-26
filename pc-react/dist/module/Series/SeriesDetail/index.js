define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _url = require('common/util/url');
    var _antd = require('antd');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('./SeriesSingleList/index');
    var _ajaxService = require('common/util/ajaxService');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _url2 = _interopRequireDefault(_url);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
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
    var SeriesDetail = function (_PageController) {
        _inherits(SeriesDetail, _PageController);
        function SeriesDetail(props) {
            _classCallCheck(this, SeriesDetail);
            var _this = _possibleConstructorReturn(this, (SeriesDetail.__proto__ || Object.getPrototypeOf(SeriesDetail)).call(this, props));
            _this.handleDelete = function () {
                _ajaxService2.default.post('/pc/series/delete', { seriesId: (0, _url2.default)().params.seriesId }).then(function (res) {
                    if (res) {
                        history.back();
                    }
                });
            };
            _this.state = {
                coverUrl: '',
                name: '',
                channelUrl: '',
                price: 0,
                planCourseCnt: '',
                hasCourseCnt: ''
            };
            return _this;
        }
        _createClass(SeriesDetail, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    _ajaxService2.default.get('/pc/series/getBaseInfo', { seriesId: (0, _url2.default)().params.seriesId }).then(function (res) {
                        _this2.setState(_extends({}, res.data));
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
                    var url = (0, _url2.default)();
                    url.hash = '#/series/edit';
                    return _react2.default.createElement('div', { className: 'series-detail' }, _react2.default.createElement(_antd.Breadcrumb, null, _react2.default.createElement(_antd.Breadcrumb.Item, null, (0, _url2.default)().params.name), _react2.default.createElement(_antd.Breadcrumb.Item, null, '课程管理'), _react2.default.createElement(_antd.Breadcrumb.Item, null, _react2.default.createElement(_reactRouter.Link, { to: '/series' }, '系列课')), _react2.default.createElement(_antd.Breadcrumb.Item, null, '详情')), _react2.default.createElement('div', { className: 'series-detail-content' }, _react2.default.createElement('div', { className: 'series-detail-content-info' }, _react2.default.createElement('div', { className: 'series-detail-content-info-cover' }, _react2.default.createElement('img', {
                        alt: true,
                        src: this.state.coverUrl
                    }), _react2.default.createElement('div', { className: 'series-detail-content-info-cover-course' }, _react2.default.createElement('div', { className: 'series-detail-content-info-cover-course-name' }, this.state.name), _react2.default.createElement('div', { className: 'series-detail-content-info-cover-course-price' }, this.state.price === 0 ? _react2.default.createElement('span', { className: 'series-detail-content-info-cover-course-price-free' }, '免费') : _react2.default.createElement('span', { className: 'series-detail-content-info-cover-course-price-paied' }, '\uFFE5', this.state.price.toFixed(2))))), _react2.default.createElement('div', { className: 'series-detail-content-info-tip' }, '计划更新', this.state.planCourseCnt, '次课\uFF0C已更新', this.state.hasCourseCnt, '次课')), _react2.default.createElement('div', { className: 'series-detail-content-operation' }, _react2.default.createElement('a', {
                        target: '_blank',
                        href: this.state.seriesUrl
                    }, '查看'), _react2.default.createElement('a', { href: url.toString() }, '修改'), _react2.default.createElement(_antd.Popconfirm, {
                        placement: 'topRight',
                        title: '确定要删除这个系列课吗',
                        onConfirm: this.handleDelete,
                        okText: '确定',
                        cancelText: '取消',
                        className: 'popconfirm',
                        overlayClassName: 'popconfirm-overlay'
                    }, _react2.default.createElement('a', null, '删除')))), _react2.default.createElement(_index2.default, null));
                }
            }
        ]);
        return SeriesDetail;
    }(_PageController3.default);
    exports.default = SeriesDetail;
});