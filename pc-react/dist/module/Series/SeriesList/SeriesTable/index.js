define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _CommonController2 = require('common/controller/CommonController');
    var _index = require('common/components/TagImage/index');
    var _ajaxService = require('common/util/ajaxService');
    var _config = require('common/config');
    var _url = require('common/util/url');
    var _ajaxConfig = require('common/ajaxConfig');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _index2 = _interopRequireDefault(_index);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _config2 = _interopRequireDefault(_config);
    var _url2 = _interopRequireDefault(_url);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
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
    var SeriesTable = function (_CommonController) {
        _inherits(SeriesTable, _CommonController);
        function SeriesTable(props) {
            _classCallCheck(this, SeriesTable);
            var _this = _possibleConstructorReturn(this, (SeriesTable.__proto__ || Object.getPrototypeOf(SeriesTable)).call(this, props));
            _this.handleUpTop = function (id) {
                _ajaxService2.default.post('/pc/course/upTop', {
                    courseId: id,
                    courseType: _config2.default.COURSE_TYPE_NUM.SERIES_COURSE
                }).then(function () {
                    _this.setState({ query: '' });
                    _this.updateQuerySearch(1, '');
                });
            };
            _this.handleCancelTop = function (id) {
                _ajaxService2.default.post('/pc/course/upDown', {
                    courseId: id,
                    courseType: _config2.default.COURSE_TYPE_NUM.SERIES_COURSE
                }).then(function () {
                    _this.setState({ query: '' });
                    _this.updateQuerySearch(1, '');
                });
            };
            _this.updateQuerySearch = function (pageNum, query) {
                _this.setState({ dataLoading: true });
                _ajaxService2.default.get('/pc/series/list', {
                    classroomId: Number(url.params.classroomId),
                    query: query,
                    pageNum: pageNum,
                    pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10
                }).then(function (res) {
                    _this.setState(_extends({
                        dataLoading: false,
                        dataSource: res.data.serieses
                    }, res.pageDto));
                });
            };
            _this.handleTableChange = function (pagination, filters, sorter) {
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
                        className: 'series-table-list-cover',
                        render: function render(text, record) {
                            url.params.seriesId = record.seriesId;
                            url.hash = '#/series/detail';
                            return _react2.default.createElement('div', { className: 'series-table-list-cover-image' }, _react2.default.createElement('a', {
                                rel: 'noopener noreferrer',
                                target: '_blank',
                                href: record.seriesUrl
                            }, record.seq !== 100 ? _react2.default.createElement(_index2.default, {
                                url: record.coverUrl,
                                tag: record.seq,
                                className: 'series-table-list-cover-image'
                            }) : _react2.default.createElement('img', {
                                src: record.coverUrl,
                                alt: true,
                                className: 'series-table-list-cover-image'
                            })), _react2.default.createElement('div', { className: 'series-table-list-name-price' }, _react2.default.createElement('a', {
                                rel: 'noopener noreferrer',
                                target: '_blank',
                                href: record.seriesUrl
                            }, _react2.default.createElement('div', { className: 'series-table-list-name' }, record.name)), _react2.default.createElement('div', { className: 'single-table-list-staus' }, record.publishStatus === _config2.default.SERIES_SHOW.OFFLINE ? _react2.default.createElement('div', null, _react2.default.createElement('i', { className: 'icon-ic-prompt-red' }), '已下架') : _react2.default.createElement('div', null)), _react2.default.createElement('div', { className: 'series-table-list-price' }, record.sellType === _config2.default.SELL_TYPE_NUM.FREE_COURSE ? _react2.default.createElement('span', { className: 'series-table-list-price-free' }, '免费') : _react2.default.createElement('span', { className: 'series-table-list-price-paied' }, '\uFFE5', record.price.toFixed(2)))));
                        }
                    },
                    {
                        dataIndex: 'operation',
                        width: '20%',
                        className: 'series-table-list-operation',
                        render: function render(text, record) {
                            url.params.seriesId = record.seriesId;
                            url.hash = '#/series/detail';
                            return _react2.default.createElement('div', { className: 'series-table-list-operation-content' }, record.seq === 100 ? _react2.default.createElement('a', {
                                onClick: function onClick() {
                                    _this.handleUpTop(record.seriesId);
                                }
                            }, '置顶') : _react2.default.createElement('a', {
                                onClick: function onClick() {
                                    _this.handleCancelTop(record.seriesId);
                                }
                            }, '取消置顶'), _react2.default.createElement(_antd.Popconfirm, {
                                placement: 'topRight',
                                title: record.publishStatus === _config2.default.SERIES_SHOW.ONLINE ? '确认要下架这个课程吗' : '确认要上架这个课程吗',
                                onConfirm: function onConfirm() {
                                    return _this.changeStatus(record);
                                },
                                okText: '确定',
                                cancelText: '取消',
                                className: 'popconfirm',
                                overlayClassName: 'popconfirm-overlay'
                            }, record.publishStatus === _config2.default.SERIES_SHOW.ONLINE ? _react2.default.createElement('a', null, '下架') : _react2.default.createElement('a', null, '上架')), _react2.default.createElement('a', { href: url.toString() }, '详情'));
                        }
                    }
                ];
            };
            _this.changeStatus = function (data) {
                var urlStr = void 0;
                if (data.publishStatus === _config2.default.SERIES_SHOW.ONLINE) {
                    urlStr = _ajaxConfig2.default.SERIES.OFFLINE;
                } else {
                    urlStr = _ajaxConfig2.default.SERIES.ONLINE;
                }
                _ajaxService2.default.post(urlStr, { seriesId: data.seriesId }).then(function (res) {
                    if (res && res.code === 200) {
                        _this.updateQuerySearch(_this.state.pageNum, _this.state.query);
                    }
                });
            };
            _this.state = {
                dataLoading: true,
                query: props.search,
                dataSource: [],
                pageNum: 1
            };
            return _this;
        }
        _createClass(SeriesTable, [
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
                    var _this2 = this;
                    _ajaxService2.default.get('/pc/series/list', {
                        classroomId: Number(url.params.classroomId),
                        query: this.state.query || '',
                        pageNum: 1,
                        pageSize: _config2.default.PAGE_SIZE.PAGE_SIZE_10
                    }).then(function (res) {
                        _this2.setState(_extends({
                            dataLoading: false,
                            dataSource: res.data.serieses
                        }, res.pageDto));
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'series-table table' }, _react2.default.createElement(_antd.Table, {
                        columns: this.columns(),
                        dataSource: this.state.dataSource,
                        className: 'series-table-list',
                        locale: { emptyText: this.state.dataLoading ? '' : '没有相关课程' },
                        onChange: this.handleTableChange,
                        rowKey: function rowKey(record) {
                            return record.seriesId;
                        },
                        pagination: this.pagination()
                    }));
                }
            }
        ]);
        return SeriesTable;
    }(_CommonController3.default);
    exports.default = SeriesTable;
});