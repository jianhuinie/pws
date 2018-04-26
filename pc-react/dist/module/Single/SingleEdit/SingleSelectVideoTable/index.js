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
    var SingleSelectVideoTable = function (_CommonController) {
        _inherits(SingleSelectVideoTable, _CommonController);
        function SingleSelectVideoTable(props) {
            _classCallCheck(this, SingleSelectVideoTable);
            var _this = _possibleConstructorReturn(this, (SingleSelectVideoTable.__proto__ || Object.getPrototypeOf(SingleSelectVideoTable)).call(this, props));
            _this.handleSearch = function (query) {
                _this.setState({ query: query });
                _this.updateQuerySearch(1, query);
            };
            _this.updateQuerySearch = function (pageNum, query) {
                _this.setState({ dataLoading: true });
                _ajaxService2.default.get('/pc/video/getList', {
                    classroomId: Number(params.classroomId),
                    query: query,
                    pageNum: pageNum,
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_4
                }).then(function (res) {
                    console.log(res);
                    _this.setState(_extends({
                        dataLoading: false,
                        dataSource: res.data.videos
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
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_4,
                    total: _this.state.count
                };
            };
            _this.selection = function () {
                return {
                    type: 'radio',
                    selectedRowKeys: _this.state.selectedRowKeys,
                    onChange: _this.handleSelectChange
                };
            };
            _this.handleSelectChange = function (selectedRowKeys, selectedRows) {
                _this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                });
            };
            _this.columns = function () {
                return [
                    {
                        title: '视频ID',
                        dataIndex: 'videoId',
                        width: '10%',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.videoId);
                        }
                    },
                    {
                        title: '视频名称',
                        dataIndex: 'name',
                        width: '30%',
                        render: function render(text, record) {
                            return _react2.default.createElement('div', { className: 'single-select-video-table-list-name' }, record.name);
                        }
                    },
                    {
                        title: '视频状态',
                        dataIndex: 'videoStatus',
                        className: 'single-select-video-table-list-video-status',
                        width: '15%',
                        render: function render(text, record) {
                            switch (record.tranStatus) {
                            case _config2.default.VIDEO_UPLOAD_STATUS_NUM.TRANS_FAILED: {
                                    return _react2.default.createElement('span', null, _config2.default.VIDEO_UPLOAD_STATUS_STRING[_config2.default.VIDEO_UPLOAD_STATUS_NUM.TRANS_FAILED]);
                                }
                            case _config2.default.VIDEO_UPLOAD_STATUS_NUM.TRANS_ING: {
                                    return _react2.default.createElement('span', { className: 'single-select-video-table-list-video-status-red' }, _config2.default.VIDEO_UPLOAD_STATUS_STRING[_config2.default.VIDEO_UPLOAD_STATUS_NUM.TRANS_ING]);
                                }
                            case _config2.default.VIDEO_UPLOAD_STATUS_NUM.TRANS_SUCCESS: {
                                    return _react2.default.createElement('span', null, _config2.default.VIDEO_UPLOAD_STATUS_STRING[_config2.default.VIDEO_UPLOAD_STATUS_NUM.TRANS_SUCCESS]);
                                }
                            }
                        }
                    },
                    {
                        title: '视频时长',
                        dataIndex: 'time',
                        width: '20%',
                        className: 'single-select-video-table-list-video-time',
                        render: function render(text, record) {
                            var length = record.length;
                            var hour = Math.floor(length / 3600);
                            length -= hour * 3600;
                            var min = Math.floor(length / 60);
                            length -= min * 60;
                            return (hour > 0 ? hour + '小时' : '') + (min > 0 ? min + '分' : '') + (length > 0 ? length + '秒' : '');
                        }
                    },
                    {
                        title: '上传人',
                        dataIndex: 'operator',
                        width: '10%',
                        className: 'single-select-video-table-list-operator',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.operator);
                        }
                    },
                    {
                        title: '上传时间',
                        dataIndex: 'createTime',
                        width: '15%',
                        className: 'single-select-video-table-list-create-time',
                        render: function render(text, record) {
                            return (0, _moment2.default)(record.createTime).format(_config2.default.DATE_TIME_FORMAT);
                        }
                    }
                ];
            };
            _this.state = {
                dataLoading: true,
                query: undefined,
                dataSource: [],
                pageNum: 1,
                selectedRowKeys: [],
                selectedRows: []
            };
            return _this;
        }
        _createClass(SingleSelectVideoTable, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    _ajaxService2.default.get('/pc/video/getList', {
                        classroomId: Number(params.classroomId),
                        query: this.state.query,
                        pageNum: 1,
                        pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_4
                    }).then(function (res) {
                        console.log(res);
                        _this2.setState(_extends({
                            dataLoading: false,
                            dataSource: res.data.videos
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
                            pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_4,
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
                    return _react2.default.createElement('div', { className: 'single-select-video-table table' }, _react2.default.createElement(_index2.default, {
                        onCourseSearch: this.handleSearch,
                        placeholder: '输入关键词'
                    }), _react2.default.createElement(_antd.Table, {
                        columns: this.columns(),
                        dataSource: this.state.dataSource,
                        className: 'single-select-video-table-list',
                        locale: { emptyText: this.state.dataLoading ? '' : '暂无视频' },
                        onChange: this.handleTableChange,
                        rowKey: function rowKey(record) {
                            return record.videoId;
                        },
                        pagination: this.pagination(),
                        rowSelection: this.selection()
                    }), _react2.default.createElement('div', { className: 'single-select-video-table-operation' }, _react2.default.createElement(_antd.Button, {
                        className: 'md-btn classic-btn white-btn',
                        onClick: function onClick() {
                            _this3.props.onVideoSelect();
                        }
                    }, '取消'), _react2.default.createElement(_antd.Button, {
                        htmlType: 'submit',
                        className: this.state.selectedRowKeys.length === 0 ? 'md-btn classic-btn grey-btn' : 'md-btn classic-btn pink-btn',
                        disabled: this.state.selectedRowKeys.length === 0 ? true : false,
                        onClick: function onClick() {
                            _this3.props.onVideoSelect(_this3.state.selectedRowKeys, _this3.state.selectedRows);
                        }
                    }, '确定')));
                }
            }
        ]);
        return SingleSelectVideoTable;
    }(_CommonController3.default);
    exports.default = SingleSelectVideoTable;
});