define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('common/components/SelectModal/index');
    var _ajaxService = require('common/util/ajaxService');
    var _config = require('common/config');
    var _url = require('common/util/url');
    var _moment = require('moment');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var VideoTable = function (_PageController) {
        _inherits(VideoTable, _PageController);
        function VideoTable(props) {
            _classCallCheck(this, VideoTable);
            var _this = _possibleConstructorReturn(this, (VideoTable.__proto__ || Object.getPrototypeOf(VideoTable)).call(this, props));
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
                        width: '25%',
                        render: function render(text, record) {
                            return _react2.default.createElement('div', { className: 'video-table-list-name' }, record.name);
                        }
                    },
                    {
                        title: '视频状态',
                        dataIndex: 'videoStatus',
                        className: 'video-table-list-video-status',
                        width: '13%',
                        render: function render(text, record) {
                            switch (record.tranStatus) {
                            case _config2.default.VIDEO_UPLOAD_STATUS_NUM.TRANS_FAILED: {
                                    return _react2.default.createElement('span', null, _config2.default.VIDEO_UPLOAD_STATUS_STRING[_config2.default.VIDEO_UPLOAD_STATUS_NUM.TRANS_FAILED]);
                                }
                            case _config2.default.VIDEO_UPLOAD_STATUS_NUM.TRANS_ING: {
                                    return _react2.default.createElement('span', { className: 'video-table-list-video-status-red' }, _config2.default.VIDEO_UPLOAD_STATUS_STRING[_config2.default.VIDEO_UPLOAD_STATUS_NUM.TRANS_ING]);
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
                        width: '15%',
                        className: 'video-table-list-video-time',
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
                        className: 'video-table-list-operator',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.operator);
                        }
                    },
                    {
                        title: '上传时间',
                        dataIndex: 'createTime',
                        width: '15%',
                        className: 'video-table-list-create-time',
                        render: function render(text, record) {
                            return (0, _moment2.default)(record.createTime).format(_config2.default.DATE_TIME_FORMAT);
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        width: '12%',
                        className: 'video-table-list-operation',
                        render: function render(text, record) {
                            return _react2.default.createElement('div', { className: 'video-table-list-operation-content' }, _react2.default.createElement('a', {
                                onClick: function onClick() {
                                    _this.handleWatchVideo(record.videoId);
                                }
                            }, '预览'), _react2.default.createElement(_antd.Popconfirm, {
                                placement: 'topRight',
                                title: '确定要删除这个视频吗',
                                onConfirm: function onConfirm() {
                                    return _this.handleDeleteVideo(record.videoId);
                                },
                                okText: '确定',
                                cancelText: '取消',
                                className: 'popconfirm',
                                overlayClassName: 'popconfirm-overlay'
                            }, _react2.default.createElement('a', null, '删除')));
                        }
                    }
                ];
            };
            _this.handleWatchVideo = function (videoId) {
                if (_this.player) {
                    _this.player = null;
                }
                if ($('#video').html()) {
                    $('#video').html('');
                }
                _ajaxService2.default.get('/pc/video/getToken', { videoId: videoId }).then(function (res) {
                    var data = res.data;
                    _this.setState({ showModal: true }, function () {
                        _this.player = new bjcPlayer('#video', {
                            token: data.token,
                            definition: 'low',
                            onplaybegin: function onplaybegin() {
                                console.log('begin');
                            }
                        });
                        _this.player.play(data.playVideoId);
                    });
                });
            };
            _this.handleDeleteVideo = function (id) {
                _ajaxService2.default.post('/pc/video/delete', { videoId: id }).then(function (res) {
                    if (res && res.code === 200) {
                        _antd.message.success('删除成功', 3);
                        _this.updateQuerySearch(_this.state.pageNum, _this.state.query);
                    }
                });
            };
            _this.updateQuerySearch = function (pageNum, query) {
                _this.setState({ dataLoading: true });
                _ajaxService2.default.get('/pc/video/getList', {
                    classroomId: Number(params.classroomId),
                    query: query || '',
                    pageNum: pageNum,
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10
                }).then(function (res) {
                    console.log(res);
                    if (res && res.code === 200) {
                        if (res.data.videos.length === 0 && _this.state.pageNum > 1) {
                            _this.updateQuerySearch(_this.state.pageNum - 1, _this.state.query);
                        } else {
                            _this.setState(_extends({
                                dataLoading: false,
                                dataSource: res.data.videos
                            }, res.pageDto));
                        }
                    }
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
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10,
                    total: _this.state.count
                };
            };
            _this.handleCloseModal = function () {
                _this.setState({ showModal: false });
                _this.player = null;
            };
            _this.state = {
                dataLoading: true,
                query: props.search,
                dataSource: [],
                pageNum: 1,
                showModal: false
            };
            _this.player = null;
            return _this;
        }
        _createClass(VideoTable, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    if (nextProps.forceUpdate || nextProps.search !== this.state.query) {
                        this.setState({
                            query: nextProps.search,
                            pageNum: 1,
                            pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10
                        });
                        this.updateQuerySearch(1, nextProps.search);
                    }
                }
            },
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    _ajaxService2.default.get('/pc/video/getList', {
                        classroomId: Number(params.classroomId),
                        query: this.state.query || '',
                        pageNum: 1,
                        pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10
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
                key: 'render',
                value: function render() {
                    var falseFlag = false;
                    return _react2.default.createElement('div', { className: 'video-table table' }, _react2.default.createElement(_antd.Table, {
                        columns: this.columns(),
                        dataSource: this.state.dataSource,
                        className: 'video-table-list',
                        locale: { emptyText: this.state.dataLoading ? '' : '暂无视频' },
                        onChange: this.handleTableChange,
                        rowKey: function rowKey(record) {
                            return record.videoId;
                        },
                        pagination: this.pagination()
                    }), _react2.default.createElement(_index2.default, {
                        isShow: this.state.showModal,
                        onModalClose: this.handleCloseModal,
                        className: 'video-table-modal',
                        title: '视频预览',
                        maskClosable: falseFlag
                    }, _react2.default.createElement('div', { id: 'video' })));
                }
            }
        ]);
        return VideoTable;
    }(_PageController3.default);
    exports.default = VideoTable;
});