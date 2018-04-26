define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _CommonController2 = require('common/controller/CommonController');
    var _antd = require('antd');
    var _index = require('common/components/Selection/index');
    var _ajaxService = require('common/util/ajaxService');
    var _config = require('common/config');
    var _url = require('common/util/url');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _index2 = _interopRequireDefault(_index);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _config2 = _interopRequireDefault(_config);
    var _url2 = _interopRequireDefault(_url);
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
    var IncomeTable = function (_CommonController) {
        _inherits(IncomeTable, _CommonController);
        function IncomeTable(props) {
            _classCallCheck(this, IncomeTable);
            var _this = _possibleConstructorReturn(this, (IncomeTable.__proto__ || Object.getPrototypeOf(IncomeTable)).call(this, props));
            _this.updateQuerySearch = function (pageNum, courseType) {
                _this.setState({ dataLoading: true });
                _ajaxService2.default.get('/pc/finance/classroom/list', {
                    classroomId: Number(params.classroomId),
                    courseType: courseType,
                    pageNum: pageNum,
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10
                }).then(function (res) {
                    _this.setState(_extends({
                        dataLoading: false,
                        dataSource: res.data.details
                    }, res.pageDto));
                });
            };
            _this.handleTableChange = function (pagination) {
                _this.updateQuerySearch(pagination.current, _this.state.courseType);
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
            _this.handleSelectionChange = function (value) {
                _this.setState({ courseType: value });
                _this.updateQuerySearch(1, value);
            };
            _this.columns = function () {
                return [
                    {
                        title: '标题',
                        dataIndex: 'name',
                        width: '26%',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.courseName);
                        }
                    },
                    {
                        title: '单价(元)',
                        dataIndex: 'price',
                        width: '14%',
                        className: 'income-table-list-num',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.price.toFixed(2));
                        }
                    },
                    {
                        title: '付费人数(个)',
                        dataIndex: 'payCnt',
                        width: '20%',
                        className: 'income-table-list-num',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.payCnt);
                        }
                    },
                    {
                        title: '收入(元)',
                        dataIndex: 'income',
                        width: '20%',
                        className: 'income-table-list-num',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.income.toFixed(2));
                        }
                    },
                    {
                        title: '净收益(元)',
                        dataIndex: 'netIncome',
                        width: '20%',
                        className: 'income-table-list-num',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.netIncome.toFixed(2));
                        }
                    }
                ];
            };
            _this.state = {
                dataLoading: true,
                courseType: 0,
                dataSource: [],
                pageNum: 1
            };
            return _this;
        }
        _createClass(IncomeTable, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    this.updateQuerySearch(1, this.state.courseType);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var courseTypeSelectOption = [
                        {
                            id: _config2.default.INCOME_COURSE_TYPE_NUM.ALL,
                            name: _config2.default.INCOME_COURSE_TYPE_STRING[_config2.default.INCOME_COURSE_TYPE_NUM.ALL]
                        },
                        {
                            id: _config2.default.INCOME_COURSE_TYPE_NUM.LIVE,
                            name: _config2.default.INCOME_COURSE_TYPE_STRING[_config2.default.INCOME_COURSE_TYPE_NUM.LIVE]
                        },
                        {
                            id: _config2.default.INCOME_COURSE_TYPE_NUM.VIDEO,
                            name: _config2.default.INCOME_COURSE_TYPE_STRING[_config2.default.INCOME_COURSE_TYPE_NUM.VIDEO]
                        },
                        {
                            id: _config2.default.INCOME_COURSE_TYPE_NUM.SERIES,
                            name: _config2.default.INCOME_COURSE_TYPE_STRING[_config2.default.INCOME_COURSE_TYPE_NUM.SERIES]
                        }
                    ];
                    return _react2.default.createElement('div', { className: 'income-table table' }, _react2.default.createElement('div', { className: 'income-table-operation' }, _react2.default.createElement(_index2.default, {
                        onSelectionChange: this.handleSelectionChange,
                        defaultValue: courseTypeSelectOption[0].id,
                        options: courseTypeSelectOption
                    }), _react2.default.createElement('a', { href: '/pc/finance/export?classroomId=' + params.classroomId + '&type=' + _config2.default.EXPORT_TYPE.INCOME + '&courseType=' + this.state.courseType }, _react2.default.createElement(_antd.Button, { className: 'md-btn classic-btn white-btn' }, '导出数据'))), _react2.default.createElement(_antd.Table, {
                        columns: this.columns(),
                        dataSource: this.state.dataSource,
                        className: 'income-table-list',
                        locale: { emptyText: this.state.dataLoading ? '' : '暂无收入' },
                        onChange: this.handleTableChange,
                        rowKey: function rowKey(record) {
                            return record.id;
                        },
                        pagination: this.pagination()
                    }));
                }
            }
        ]);
        return IncomeTable;
    }(_CommonController3.default);
    exports.default = IncomeTable;
});