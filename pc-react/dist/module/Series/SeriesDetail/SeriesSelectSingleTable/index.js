define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _CommonController2 = require('common/controller/CommonController');
    var _index = require('common/components/CourseSearch/index');
    var _ajaxService = require('common/util/ajaxService');
    var _config = require('common/config');
    var _url = require('common/util/url');
    var _moment = require('moment');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _index2 = _interopRequireDefault(_index);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _config2 = _interopRequireDefault(_config);
    var _url2 = _interopRequireDefault(_url);
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
    var SeriesSelectSingleTable = function (_CommonController) {
        _inherits(SeriesSelectSingleTable, _CommonController);
        function SeriesSelectSingleTable(props) {
            _classCallCheck(this, SeriesSelectSingleTable);
            var _this = _possibleConstructorReturn(this, (SeriesSelectSingleTable.__proto__ || Object.getPrototypeOf(SeriesSelectSingleTable)).call(this, props));
            _this.handleSearch = function (query) {
                _this.setState({ query: query });
                _this.updateQuerySearch(1, query);
            };
            _this.updateQuerySearch = function (pageNum, query) {
                _this.setState({ dataLoading: true });
                _ajaxService2.default.get('/pc/course/list', {
                    classroomId: Number(params.classroomId),
                    query: query || '',
                    pageNum: pageNum,
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_3
                }).then(function (res) {
                    _this.setState(_extends({
                        dataLoading: false,
                        dataSource: res.data.courses
                    }, res.pageDto));
                    if (_this.props.forceUpdate) {
                        _this.props.onCancelForceUpdate();
                    }
                });
            };
            _this.handleTableChange = function (pagination) {
                _this.updateQuerySearch(pagination.current, _this.state.query);
            };
            _this.pagination = function () {
                return {
                    hideOnSinglePage: true,
                    className: 'table-pagination',
                    current: _this.state.pageNum,
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_3,
                    total: _this.state.count
                };
            };
            _this.selection = function () {
                return {
                    selectedRowKeys: _this.state.selectedRowKeys,
                    onChange: _this.handleSelectChange
                };
            };
            _this.handleSelectChange = function (selectedRowKeys) {
                _this.setState({ selectedRowKeys: selectedRowKeys });
            };
            _this.columns = function () {
                return [
                    {
                        dataIndex: 'cover',
                        title: '封面',
                        width: '13%',
                        className: 'series-select-single-table-list-cover',
                        render: function render(text, record) {
                            return _react2.default.createElement('img', {
                                src: record.coverUrl,
                                alt: true,
                                className: 'series-select-single-table-list-cover-image'
                            });
                        }
                    },
                    {
                        dataIndex: 'name',
                        title: '课程名称',
                        width: '38%',
                        className: 'series-select-single-table-list-name',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.name);
                        }
                    },
                    {
                        dataIndex: 'type',
                        title: '课程类型',
                        width: '17%',
                        className: 'series-select-single-table-list-type',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, _config2.default.PLAY_TYPE_STRING[record.courseType]);
                        }
                    },
                    {
                        dataIndex: 'begin',
                        title: '开讲时间',
                        width: '32%',
                        className: 'series-select-single-table-list-begin',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, (0, _moment2.default)(record.beginTime).format(_config2.default.DATE_TIME_FORMAT));
                        }
                    }
                ];
            };
            _this.handleSave = function () {
                _ajaxService2.default.post('/pc/series/addCourse', {
                    seriesId: params.seriesId,
                    courseIds: _this.state.selectedRowKeys
                }).then(function (res) {
                    if (res) {
                        _this.props.onUpdate(true);
                    }
                });
            };
            _this.state = {
                dataLoading: true,
                query: undefined,
                dataSource: [],
                pageNum: 1,
                selectedRowKeys: []
            };
            return _this;
        }
        _createClass(SeriesSelectSingleTable, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    _ajaxService2.default.get('/pc/course/list', {
                        classroomId: Number(params.classroomId),
                        pageNum: 1,
                        pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_3
                    }).then(function (res) {
                        _this2.setState(_extends({
                            dataLoading: false,
                            dataSource: res.data.courses
                        }, res.pageDto));
                    });
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    if (nextProps.forceUpdate) {
                        this.setState({
                            pageNum: 1,
                            pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_3,
                            selectedRowKeys: [],
                            query: undefined
                        });
                        this.updateQuerySearch(1, undefined);
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this3 = this;
                    return _react2.default.createElement('div', { className: 'series-select-single-table table' }, _react2.default.createElement(_index2.default, {
                        onCourseSearch: this.handleSearch,
                        placeholder: '输入课程名称'
                    }), _react2.default.createElement(_antd.Table, {
                        columns: this.columns(),
                        dataSource: this.state.dataSource,
                        className: 'series-select-single-table-list',
                        locale: { emptyText: this.state.dataLoading ? '' : '没有相关课程' },
                        onChange: this.handleTableChange,
                        rowKey: function rowKey(record) {
                            return record.courseId;
                        },
                        pagination: this.pagination(),
                        rowSelection: this.selection()
                    }), _react2.default.createElement('div', { className: 'series-select-single-table-operation' }, _react2.default.createElement(_antd.Button, {
                        className: 'md-btn classic-btn white-btn',
                        onClick: function onClick() {
                            _this3.props.onUpdate(false);
                        }
                    }, '取消'), _react2.default.createElement(_antd.Button, {
                        htmlType: 'submit',
                        className: 'md-btn classic-btn pink-btn',
                        onClick: this.handleSave
                    }, '确定')));
                }
            }
        ]);
        return SeriesSelectSingleTable;
    }(_CommonController3.default);
    exports.default = SeriesSelectSingleTable;
});