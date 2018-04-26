define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('common/components/SelectModal/index');
    var _index3 = require('common/components/TagImage/index');
    var _ajaxService = require('common/util/ajaxService');
    var _config = require('common/config');
    var _ajaxConfig = require('common/ajaxConfig');
    var _url = require('common/util/url');
    var _moment = require('moment');
    var _index5 = require('common/components/Living/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _config2 = _interopRequireDefault(_config);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _url2 = _interopRequireDefault(_url);
    var _moment2 = _interopRequireDefault(_moment);
    var _index6 = _interopRequireDefault(_index5);
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
    var url = (0, _url2.default)();
    var SingleTable = function (_PageController) {
        _inherits(SingleTable, _PageController);
        function SingleTable(props) {
            _classCallCheck(this, SingleTable);
            var _this = _possibleConstructorReturn(this, (SingleTable.__proto__ || Object.getPrototypeOf(SingleTable)).call(this, props));
            _this.columns = function () {
                return [
                    {
                        title: '封面',
                        dataIndex: 'cover',
                        width: '15%',
                        render: function render(text, record) {
                            return _react2.default.createElement('div', { className: 'single-table-list-image' }, record.liveStatus === _config2.default.LIVE_STATUS_NUM.LIVE_PLAYING ? _react2.default.createElement('div', { className: 'single-living-logo' }, _react2.default.createElement('div', { className: 'living-logo' }, _react2.default.createElement(_index6.default, null)), _react2.default.createElement('div', { className: 'living-text' }, '直播中')) : null, _react2.default.createElement('a', {
                                target: '_blank',
                                href: record.courseUrl
                            }, record.seq !== 100 ? _react2.default.createElement(_index4.default, {
                                url: record.coverUrl,
                                tag: record.seq
                            }) : _react2.default.createElement('img', {
                                src: record.coverUrl,
                                alt: '单次课封面'
                            })));
                        }
                    },
                    {
                        title: '课程名称',
                        dataIndex: 'name',
                        width: '15%',
                        render: function render(text, record) {
                            return _react2.default.createElement('a', {
                                target: '_blank',
                                href: record.courseUrl
                            }, _react2.default.createElement('div', null, record.name));
                        }
                    },
                    {
                        title: '课程类型',
                        dataIndex: 'type',
                        width: '12%',
                        className: 'single-table-list-course-type',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, _config2.default.PLAY_TYPE_STRING[record.courseType]);
                        }
                    },
                    {
                        title: '直播状态',
                        dataIndex: 'liveStatus',
                        className: 'single-table-list-course-live',
                        width: '12%',
                        render: function render(text, record) {
                            switch (record.liveStatus) {
                            case _config2.default.LIVE_STATUS_NUM.LIVE_NULL: {
                                    return _react2.default.createElement('span', null, _config2.default.LIVE_STATUS_STRING[_config2.default.LIVE_STATUS_NUM.LIVE_NULL]);
                                }
                            case _config2.default.LIVE_STATUS_NUM.LIVE_PLAYING: {
                                    return _react2.default.createElement('span', { className: 'sm-btn pink-btn classic-btn' }, _config2.default.LIVE_STATUS_STRING[_config2.default.LIVE_STATUS_NUM.LIVE_PLAYING]);
                                }
                            case _config2.default.LIVE_STATUS_NUM.LIVE_NOT_BEGIN: {
                                    return _react2.default.createElement('span', { className: 'sm-btn blue-btn classic-btn' }, _config2.default.LIVE_STATUS_STRING[_config2.default.LIVE_STATUS_NUM.LIVE_NOT_BEGIN]);
                                }
                            case _config2.default.LIVE_STATUS_NUM.LIVE_FINISH: {
                                    return _react2.default.createElement('span', { className: 'sm-btn grey-btn classic-btn' }, _config2.default.LIVE_STATUS_STRING[_config2.default.LIVE_STATUS_NUM.LIVE_FINISH]);
                                }
                            }
                        }
                    },
                    {
                        title: '课程售价',
                        dataIndex: 'price',
                        width: '10%',
                        className: 'single-table-list-course-price',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.price.toFixed(2));
                        }
                    },
                    {
                        title: '开讲时间',
                        dataIndex: 'beginTime',
                        width: '16%',
                        className: 'single-table-list-course-time',
                        render: function render(text, record) {
                            var html = _react2.default.createElement('div', null, (0, _moment2.default)(record.beginTime).format(_config2.default.DATE_TIME_FORMAT));
                            if (record.publishStatus === _config2.default.COURSE_SHOW.OFFLINE) {
                                html = _react2.default.createElement('div', null, _react2.default.createElement('div', null, (0, _moment2.default)(record.beginTime).format(_config2.default.DATE_TIME_FORMAT)), _react2.default.createElement('div', { className: 'single-table-list-course-time-staus' }, _react2.default.createElement('i', { className: 'icon-ic-prompt-red' }), '已下架'));
                            }
                            return html;
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        width: '20%',
                        className: 'single-table-list-course-operation',
                        render: function render(text, record) {
                            url.params.courseId = record.courseId;
                            url.hash = '#/single/edit';
                            url.params.seriesId = undefined;
                            url.params.from = '/single';
                            var popoverContent = _react2.default.createElement('div', { className: 'single-table-list-course-operation-content-popover-content' }, _react2.default.createElement('a', {
                                target: '_blank',
                                href: record.courseUrl
                            }, '预览'), _react2.default.createElement('a', { href: url.toString() }, record.courseType === _config2.default.PLAY_TYPE_NUM.VIDEO_COURSE ? _react2.default.createElement('span', { className: 'video-upload-popover-content-spot' }) : null, '修改'), _react2.default.createElement(_antd.Popconfirm, {
                                placement: 'topRight',
                                title: record.publishStatus === _config2.default.COURSE_SHOW.ONLINE ? '确认要下架这个课程吗' : '确认要上架这个课程吗',
                                onConfirm: function onConfirm() {
                                    return _this.changeStatus(record);
                                },
                                okText: '确定',
                                cancelText: '取消',
                                className: 'popconfirm',
                                overlayClassName: 'popconfirm-overlay'
                            }, record.publishStatus === _config2.default.COURSE_SHOW.ONLINE ? _react2.default.createElement('a', null, '下架') : _react2.default.createElement('a', null, '上架')), _react2.default.createElement(_antd.Popconfirm, {
                                placement: 'topRight',
                                title: '确定要删除这个课程吗',
                                onConfirm: function onConfirm() {
                                    return _this.handleDeleteCourse(record.courseId);
                                },
                                okText: '确定',
                                cancelText: '取消',
                                className: 'popconfirm',
                                overlayClassName: 'popconfirm-overlay'
                            }, _react2.default.createElement('a', null, '删除')));
                            return _react2.default.createElement('div', { className: 'single-table-list-course-operation-content' }, record.courseType === _config2.default.PLAY_TYPE_NUM.LIVE_COURSE ? record.seq === 100 ? _react2.default.createElement('a', {
                                onClick: function onClick() {
                                    _this.handleUpTop(record.courseId);
                                }
                            }, '置顶') : _react2.default.createElement('a', {
                                onClick: function onClick() {
                                    _this.handleCancelTop(record.courseId);
                                }
                            }, '取消置顶') : record.videoStatus === _config2.default.VIDEO_TYPE.VIDEO_SUCCESS ? record.seq === 100 ? _react2.default.createElement('a', {
                                onClick: function onClick() {
                                    _this.handleUpTop(record.courseId);
                                }
                            }, '置顶') : _react2.default.createElement('a', {
                                onClick: function onClick() {
                                    _this.handleCancelTop(record.courseId);
                                }
                            }, '取消置顶') : record.videoStatus === _config2.default.VIDEO_TYPE.VIDEO_NULL ? _react2.default.createElement('a', {
                                className: 'single-table-list-course-operation-content-red',
                                href: url.toString() + '#video'
                            }, '上传视频') : record.videoStatus === _config2.default.VIDEO_TYPE.VIDEO_TRANSCODE ? _react2.default.createElement(_antd.Tooltip, {
                                placement: 'top',
                                title: '视频转码中',
                                getPopupContainer: function getPopupContainer(triggerNode) {
                                    return triggerNode.parentNode;
                                }
                            }, _react2.default.createElement('a', {
                                className: 'single-table-list-course-operation-content-red',
                                href: url.toString() + '#video'
                            }, '重新上传')) : _react2.default.createElement(_antd.Tooltip, {
                                placement: 'top',
                                title: '视频上传失败',
                                getPopupContainer: function getPopupContainer(triggerNode) {
                                    return triggerNode.parentNode;
                                }
                            }, _react2.default.createElement('a', {
                                className: 'single-table-list-course-operation-content-red',
                                href: url.toString() + '#video'
                            }, '重新上传')), record.courseType === _config2.default.PLAY_TYPE_NUM.LIVE_COURSE ? _react2.default.createElement('a', {
                                onClick: function onClick() {
                                    _this.handleGetLinks(record.courseId);
                                }
                            }, _react2.default.createElement('span', { className: 'video-upload-popover-content-spot' }), '助教链接') : null, _react2.default.createElement(_antd.Popover, {
                                content: popoverContent,
                                placement: 'bottomRight',
                                trigger: 'click',
                                className: 'single-table-list-course-operation-content-popover',
                                getPopupContainer: function getPopupContainer(triggerNode) {
                                    return triggerNode.parentNode;
                                },
                                autoAdjustOverflow: false
                            }, _react2.default.createElement('a', null, '更多')));
                        }
                    }
                ];
            };
            _this.handleDeleteCourse = function (id) {
                _ajaxService2.default.post('/pc/course/delete', { courseId: id }).then(function (res) {
                    if (res && res.code === 200) {
                        _antd.message.success('删除成功', 3);
                        _this.updateQuerySearch(_this.state.pageNum, _this.state.query);
                    }
                });
            };
            _this.changeStatus = function (data) {
                var urlStr = void 0;
                if (data.publishStatus === _config2.default.COURSE_SHOW.ONLINE) {
                    urlStr = _ajaxConfig2.default.COURSE.OFFLINE;
                } else {
                    urlStr = _ajaxConfig2.default.COURSE.ONLINE;
                }
                _ajaxService2.default.post(urlStr, { courseId: data.courseId }).then(function (res) {
                    if (res && res.code === 200) {
                        _this.updateQuerySearch(_this.state.pageNum, _this.state.query);
                    }
                });
            };
            _this.handleUpTop = function (id) {
                _ajaxService2.default.post('/pc/course/upTop', {
                    courseId: id,
                    courseType: _config2.default.COURSE_TYPE_NUM.SINGLE_COURSE
                }).then(function () {
                    _this.setState({ query: '' });
                    _this.updateQuerySearch(1, '');
                });
            };
            _this.handleCancelTop = function (id) {
                _ajaxService2.default.post('/pc/course/upDown', {
                    courseId: id,
                    courseType: _config2.default.COURSE_TYPE_NUM.SINGLE_COURSE
                }).then(function () {
                    _this.setState({ query: '' });
                    _this.updateQuerySearch(1, '');
                });
            };
            _this.updateQuerySearch = function (pageNum, query) {
                _this.setState({ dataLoading: true });
                _ajaxService2.default.get('/pc/course/list', {
                    classroomId: Number((0, _url2.default)().params.classroomId),
                    query: query || '',
                    pageNum: pageNum,
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10
                }).then(function (res) {
                    if (res && res.code === 200) {
                        if (res.data.courses.length === 0 && _this.state.pageNum > 1) {
                            _this.updateQuerySearch(_this.state.pageNum - 1, _this.state.query);
                        } else {
                            _this.setState(_extends({
                                dataLoading: false,
                                dataSource: res.data.courses
                            }, res.pageDto));
                        }
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
            _this.handleGetLinks = function (id) {
                _ajaxService2.default.get('/pc/live/createAssistant', { courseId: id }).then(function (res) {
                    if (res && res.code === 200) {
                        _this.setState({
                            showModal: true,
                            links: res.data.links
                        });
                    }
                });
            };
            _this.handleModalClose = function () {
                _this.setState({ showModal: false });
            };
            _this.handleCopy = function (e) {
                e.target.previousSibling.select();
                document.execCommand('copy');
                _antd.message.success('复制成功');
            };
            _this.state = {
                dataLoading: true,
                query: props.search,
                dataSource: [],
                pageNum: 1,
                showModal: false,
                links: []
            };
            return _this;
        }
        _createClass(SingleTable, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    if (nextProps.search !== this.state.query) {
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
                    this.updateQuerySearch(1, this.state.query || '');
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    var links = this.state.links;
                    return _react2.default.createElement('div', { className: 'single-table table' }, _react2.default.createElement(_antd.Table, {
                        columns: this.columns(),
                        dataSource: this.state.dataSource,
                        className: 'single-table-list',
                        locale: { emptyText: this.state.dataLoading ? '' : '没有相关课程' },
                        onChange: this.handleTableChange,
                        rowKey: function rowKey(record) {
                            return record.courseId;
                        },
                        pagination: this.pagination()
                    }), _react2.default.createElement(_index2.default, {
                        isShow: this.state.showModal,
                        onModalClose: this.handleModalClose,
                        title: '获取助教链接'
                    }, _react2.default.createElement('div', { className: 'single-table-modal' }, _react2.default.createElement('div', { className: 'single-table-modal-text' }, '复制下面的助教链接并发送给小伙伴\uFF0C他就可以以\u201C助教\u201D的身份直接进入教室\u3002助教进入教室后可以执行管理学生发言\u3001禁止学生发言\u3001帮助录制课程等操作\u3002'), links.map(function (item, index) {
                        return _react2.default.createElement('div', {
                            className: 'single-table-modal-copy',
                            key: item
                        }, _react2.default.createElement('span', null, '助教', index + 1, '\uFF1A'), _react2.default.createElement(_antd.Input, {
                            value: item,
                            readOnly: true
                        }), _react2.default.createElement(_antd.Button, {
                            className: 'md-btn classic-btn pink-btn',
                            onClick: _this2.handleCopy
                        }, '复制'));
                    }), _react2.default.createElement('div', { className: 'single-table-modal-text' }, _react2.default.createElement('span', null, '温馨提示\uFF1A'), _react2.default.createElement('p', null, '1.每一节直播课都会有3个助教链接\uFF0C请及时获取使用\u3002'), _react2.default.createElement('p', null, '2.助教人员可在浏览器里打开助教链接进入教室\uFF0C也可在微师直播助手客户端登录页点击\u3010助教登录\u3011输入助教链接进入教室\u3002')), _react2.default.createElement('div', { className: 'single-table-modal-operate' }, _react2.default.createElement(_antd.Button, {
                        className: 'md-btn classic-btn pink-btn',
                        onClick: this.handleModalClose
                    }, '知道了')))));
                }
            }
        ]);
        return SingleTable;
    }(_PageController3.default);
    exports.default = SingleTable;
});