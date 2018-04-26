define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _CommonController2 = require('common/controller/CommonController');
    var _index = require('common/components/SelectModal/index');
    var _index3 = require('common/components/TagImage/index');
    var _ajaxService = require('common/util/ajaxService');
    var _config = require('common/config');
    var _url = require('common/util/url');
    var _moment = require('moment');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
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
    var url = (0, _url2.default)();
    var SeriesSingleTable = function (_CommonController) {
        _inherits(SeriesSingleTable, _CommonController);
        function SeriesSingleTable(props) {
            _classCallCheck(this, SeriesSingleTable);
            var _this = _possibleConstructorReturn(this, (SeriesSingleTable.__proto__ || Object.getPrototypeOf(SeriesSingleTable)).call(this, props));
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
                _ajaxService2.default.get('/pc/series/getCourseList', {
                    seriesId: url.params.seriesId,
                    query: query,
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
            _this.columns = function () {
                return [
                    {
                        dataIndex: 'cover',
                        title: '封面',
                        width: '13%',
                        className: 'series-single-table-list-cover',
                        render: function render(text, record) {
                            return _react2.default.createElement('div', { className: 'series-single-table-list-cover-image' }, record.seq !== 100 ? _react2.default.createElement(_index4.default, {
                                url: record.coverUrl,
                                tag: record.seq
                            }) : _react2.default.createElement('img', {
                                src: record.coverUrl,
                                alt: true
                            }));
                        }
                    },
                    {
                        dataIndex: 'name',
                        title: '课程名称',
                        width: '16%',
                        className: 'series-single-table-list-name',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, record.name);
                        }
                    },
                    {
                        dataIndex: 'type',
                        title: '课程类型',
                        width: '20%',
                        className: 'series-single-table-list-type',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, _config2.default.PLAY_TYPE_STRING[record.courseType]);
                        }
                    },
                    {
                        dataIndex: 'begin',
                        title: '开讲时间',
                        width: '15%',
                        className: 'series-single-table-list-begin',
                        render: function render(text, record) {
                            return _react2.default.createElement('span', null, (0, _moment2.default)(record.beginTime).format(_config2.default.DATE_TIME_FORMAT));
                        }
                    },
                    {
                        dataIndex: 'operation',
                        title: '操作',
                        width: '36%',
                        className: 'series-single-table-list-operation',
                        render: function render(text, record) {
                            url.params.courseId = record.courseId;
                            url.hash = '#/single/edit';
                            url.params.from = '/series/detail';
                            var popoverContent = _react2.default.createElement('div', { className: 'series-single-table-list-operation-content-popover-content' }, _react2.default.createElement('a', { href: url.toString() }, record.courseType === _config2.default.PLAY_TYPE_NUM.VIDEO_COURSE ? _react2.default.createElement('span', { className: 'video-upload-popover-content-spot' }) : null, '修改'), _react2.default.createElement(_antd.Popconfirm, {
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
                            return _react2.default.createElement('div', { className: 'series-single-table-list-operation-content' }, record.courseType === _config2.default.PLAY_TYPE_NUM.LIVE_COURSE ? record.seq === 100 ? _react2.default.createElement('a', {
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
                                className: 'series-single-table-list-operation-content-video',
                                href: url.toString() + '#video'
                            }, '上传视频') : record.videoStatus === _config2.default.VIDEO_TYPE.VIDEO_TRANSCODE ? _react2.default.createElement(_antd.Tooltip, {
                                placement: 'top',
                                title: '视频转码中',
                                getPopupContainer: function getPopupContainer(triggerNode) {
                                    return triggerNode.parentNode;
                                }
                            }, _react2.default.createElement('a', {
                                className: 'series-single-table-list-operation-content-video',
                                href: url.toString() + '#video'
                            }, '重新上传')) : _react2.default.createElement(_antd.Tooltip, {
                                placement: 'top',
                                title: '视频上传失败',
                                getPopupContainer: function getPopupContainer(triggerNode) {
                                    return triggerNode.parentNode;
                                }
                            }, _react2.default.createElement('a', {
                                className: 'series-single-table-list-operation-content-video',
                                href: url.toString() + '#video'
                            }, '重新上传')), _react2.default.createElement('a', {
                                target: '_blank',
                                href: record.courseUrl
                            }, '预览'), record.courseType === _config2.default.PLAY_TYPE_NUM.LIVE_COURSE ? _react2.default.createElement('a', {
                                onClick: function onClick() {
                                    _this.handleGetLinks(record.courseId);
                                }
                            }, _react2.default.createElement('span', { className: 'video-upload-popover-content-spot' }), '助教链接') : null, _react2.default.createElement(_antd.Popover, {
                                content: popoverContent,
                                placement: 'bottomRight',
                                trigger: 'click',
                                className: 'series-single-table-list-operation-content-popover',
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
        _createClass(SeriesSingleTable, [
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
                    _ajaxService2.default.get('/pc/series/getCourseList', {
                        seriesId: url.params.seriesId,
                        query: this.state.query || '',
                        pageNum: 1,
                        pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10
                    }).then(function (res) {
                        _this2.setState(_extends({
                            dataLoading: false,
                            dataSource: res.data.courses
                        }, res.pageDto));
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this3 = this;
                    var links = this.state.links;
                    return _react2.default.createElement('div', { className: 'series-single-table table' }, _react2.default.createElement(_antd.Table, {
                        columns: this.columns(),
                        dataSource: this.state.dataSource,
                        className: 'series-single-table-list',
                        locale: { emptyText: this.state.dataLoading ? '' : '还没有系列课内容' },
                        onChange: this.handleTableChange,
                        rowKey: function rowKey(record) {
                            return record.courseId;
                        },
                        pagination: this.pagination()
                    }), _react2.default.createElement(_index2.default, {
                        isShow: this.state.showModal,
                        onModalClose: this.handleModalClose,
                        title: '获取助教链接'
                    }, _react2.default.createElement('div', { className: 'series-single-table-modal' }, _react2.default.createElement('div', { className: 'series-single-table-modal-text' }, '复制下面的助教链接并发送给小伙伴\uFF0C他就可以以\u201C助教\u201D的身份直接进入教室\u3002助教进入教室后可以执行管理学生发言\u3001禁止学生发言\u3001帮助录制课程等操作\u3002'), links.map(function (item, index) {
                        return _react2.default.createElement('div', {
                            className: 'series-single-table-modal-copy',
                            key: item
                        }, _react2.default.createElement('span', null, '助教', index + 1, '\uFF1A'), _react2.default.createElement(_antd.Input, {
                            value: item,
                            readOnly: true
                        }), _react2.default.createElement(_antd.Button, {
                            className: 'md-btn classic-btn pink-btn',
                            onClick: _this3.handleCopy
                        }, '复制'));
                    }), _react2.default.createElement('div', { className: 'series-single-table-modal-text' }, _react2.default.createElement('span', null, '温馨提示\uFF1A'), _react2.default.createElement('p', null, '1.每一节直播课都会有3个助教链接\uFF0C请及时获取使用\u3002'), _react2.default.createElement('p', null, '2.助教人员可在浏览器里打开助教链接进入教室\uFF0C也可在微师直播助手客户端登录页点击\u3010助教登录\u3011输入助教链接进入教室\u3002')), _react2.default.createElement('div', { className: 'series-single-table-modal-operate' }, _react2.default.createElement(_antd.Button, {
                        className: 'md-btn classic-btn pink-btn',
                        onClick: this.handleModalClose
                    }, '知道了')))));
                }
            }
        ]);
        return SeriesSingleTable;
    }(_CommonController3.default);
    exports.default = SeriesSingleTable;
});