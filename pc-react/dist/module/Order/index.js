define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('common/components/CourseDatePicker/index');
    var _ajaxService = require('common/util/ajaxService');
    var _url = require('common/util/url');
    var _util = require('common/util/util');
    var _config = require('common/config');
    var _moment = require('moment');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _url2 = _interopRequireDefault(_url);
    var _util2 = _interopRequireDefault(_util);
    var _config2 = _interopRequireDefault(_config);
    var _moment2 = _interopRequireDefault(_moment);
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
    var DEFAULT_END = +new Date((0, _moment2.default)().format('YYYY-MM-DD') + ' 23:59:59');
    var DEFAULT_BEGIN = DEFAULT_END - 30 * 24 * 60 * 60 * 1000 + 1000;
    var Order = function (_PageController) {
        _inherits(Order, _PageController);
        function Order(props) {
            _classCallCheck(this, Order);
            var _this = _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this, props));
            _this.updateQuerySearch = function (pageNum) {
                _this.setState({ dataLoading: true });
                _ajaxService2.default.get('/pc/finance/order/list', {
                    classroomId: Number(params.classroomId),
                    beginTime: _this.query.beginTime,
                    endTime: _this.query.endTime,
                    pageNum: pageNum,
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10
                }).then(function (res) {
                    _this.setState(_extends({
                        dataLoading: false,
                        dataSource: res.data.orders
                    }, res.pageDto));
                });
            };
            _this.handleTableChange = function (pagination) {
                _this.updateQuerySearch(pagination.current);
            };
            _this.pagination = function () {
                return {
                    hideOnSinglePage: true,
                    className: 'table-pagination',
                    current: _this.state.pageNum,
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10,
                    total: _this.state.count
                };
            };
            _this.handleStartChange = function (value) {
                _this.setState({ beginTime: value });
                _this.query.beginTime = value;
            };
            _this.handleEndChange = function (value) {
                _this.setState({ endTime: value });
                _this.query.endTime = value;
            };
            _this.handleChangeTime = function () {
                _this.updateQuerySearch(1);
            };
            _this.columns = function () {
                return [
                    {
                        title: '支付时间',
                        dataIndex: 'payTime',
                        width: '18%',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, (0, _moment2.default)(record.payTime).format(_config2.default.DATE_TIME_FORMAT));
                        }
                    },
                    {
                        title: '头像/昵称',
                        dataIndex: 'person',
                        width: '20%',
                        render: function render(text, record) {
                            return _react2.default.createElement('div', { className: 'order-table-list-person' }, _react2.default.createElement('img', {
                                src: record.url,
                                alt: true
                            }), _react2.default.createElement('span', null, record.nickName));
                        }
                    },
                    {
                        title: '类型',
                        dataIndex: 'courseType',
                        width: '16%',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, _config2.default.INCOME_COURSE_TYPE_STRING[record.courseType]);
                        }
                    },
                    {
                        title: '名称',
                        dataIndex: 'name',
                        width: '18%',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', { className: 'order-table-list-name' }, record.courseName);
                        }
                    },
                    {
                        title: '订单金额',
                        dataIndex: 'price',
                        width: '12%',
                        className: 'order-table-list-num',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.price.toFixed(2));
                        }
                    },
                    {
                        title: '实际收益',
                        dataIndex: 'income',
                        width: '16%',
                        className: 'order-table-list-num',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.income.toFixed(2));
                        }
                    }
                ];
            };
            _this.state = {
                dataLoading: true,
                dataSource: [],
                pageNum: 1
            };
            _this.query = {
                beginTime: DEFAULT_BEGIN,
                endTime: DEFAULT_END
            };
            return _this;
        }
        _createClass(Order, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    this.updateQuerySearch(1);
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
                    var self = this;
                    return _react2.default.createElement('div', { className: 'child-page' }, _react2.default.createElement(_antd.Breadcrumb, null, _react2.default.createElement(_antd.Breadcrumb.Item, null, params.name), _react2.default.createElement(_antd.Breadcrumb.Item, null, '财务管理'), _react2.default.createElement(_antd.Breadcrumb.Item, null, '订单管理')), _react2.default.createElement('div', { className: 'table order-table' }, _react2.default.createElement('div', { className: 'order-table-operation' }, _react2.default.createElement('div', { className: 'order-table-operation-canlender' }, _react2.default.createElement(_index2.default, {
                        isRange: true,
                        defaultBegin: DEFAULT_BEGIN,
                        defaultEnd: DEFAULT_END,
                        onStartChange: this.handleStartChange,
                        onEndChange: this.handleEndChange,
                        disabledDate: function disabledDate() {
                            return false;
                        }
                    }), _react2.default.createElement(_antd.Button, {
                        className: 'order-table-operation-btn classic-btn white-btn',
                        onClick: this.handleChangeTime
                    }, '查看')), _react2.default.createElement('a', { href: '/pc/finance/export?classroomId=' + params.classroomId + '&type=' + _config2.default.EXPORT_TYPE.ORDER + '&courseType=' + _config2.default.INCOME_COURSE_TYPE_NUM.ALL + '&beginTime=' + this.query.beginTime + '&endTime=' + this.query.endTime }, _react2.default.createElement(_antd.Button, { className: 'md-btn classic-btn white-btn' }, '导出数据'))), _react2.default.createElement(_antd.Table, {
                        columns: this.columns(),
                        dataSource: this.state.dataSource,
                        className: 'order-table-list',
                        locale: { emptyText: this.state.dataLoading ? '' : '没有查询到相关内容' },
                        onChange: this.handleTableChange,
                        rowKey: function rowKey(record) {
                            return record.orderId;
                        },
                        pagination: this.pagination()
                    })));
                }
            }
        ]);
        return Order;
    }(_PageController3.default);
    exports.default = Order;
});