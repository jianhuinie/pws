define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _index = require('common/components/CourseSearch/index');
    var _index3 = require('./VideoTable/index');
    var _index5 = require('common/components/SelectModal/index');
    var _url = require('common/util/url');
    var _ajaxService = require('common/util/ajaxService');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _url2 = _interopRequireDefault(_url);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _util2 = _interopRequireDefault(_util);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
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
    var VideoList = function (_React$Component) {
        _inherits(VideoList, _React$Component);
        function VideoList(props) {
            _classCallCheck(this, VideoList);
            var _this = _possibleConstructorReturn(this, (VideoList.__proto__ || Object.getPrototypeOf(VideoList)).call(this, props));
            _this.handleSearch = function (value) {
                _this.setState({ query: value });
            };
            _this.hanldePrepareUpload = function (file) {
                _this.file = file;
                _this.cancelUpload = false;
                _this.setState({
                    fileName: file.name,
                    percent: 0,
                    showSelectModal: true
                });
                return new Promise(function (resolve) {
                    _ajaxService2.default.get('/pc/video/getUploadUrl', { fileName: file.name }).then(function (res) {
                        _this.setState({
                            uploadUrl: res.data.uploadUrl,
                            playVideoId: res.data.playVideoId
                        }, function () {
                            resolve(file);
                        });
                    });
                });
            };
            _this.handleChangeUpload = function (info) {
                var file = info.file, event = info.event;
                console.log(file);
                console.log(event);
                if (event) {
                    _this.setState({
                        percent: event.percent,
                        loaded: Math.round(event.loaded / (1024 * 1024)),
                        total: Math.round(event.total / (1024 * 1024))
                    });
                }
                if (file.status === 'done') {
                    if (file.response.code === 1 && !_this.cancelUpload) {
                        _this.handleModalClose();
                        _ajaxService2.default.post('/pc/video/add', {
                            fileName: file.name,
                            playVideoId: _this.state.playVideoId
                        }).then(function () {
                            _this.setState({ tableForceUpdate: true });
                        });
                    }
                }
            };
            _this.handleModalClose = function () {
                _this.setState({ showSelectModal: false });
            };
            _this.handleCancelUpload = function () {
                _this.refs.upload.handleManualRemove(_this.file);
                _this.cancelUpload = true;
                _this.setState({
                    playVideoId: undefined,
                    fileName: undefined,
                    percent: 0,
                    showSelectModal: false
                });
                _ajaxService2.default.post('/pc/video/cancel', { playVideoId: _this.state.playVideoId });
            };
            _this.handleCancelForceUpdate = function () {
                _this.setState({ tableForceUpdate: false });
            };
            _this.state = {
                query: undefined,
                tableForceUpdate: false,
                showSelectModal: false
            };
            _this.cancelUpload = false;
            return _this;
        }
        _createClass(VideoList, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    _util2.default.renderLeftSider();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var state = this.state;
                    return _react2.default.createElement('div', { className: 'video-list' }, _react2.default.createElement(_antd.Breadcrumb, null, _react2.default.createElement(_antd.Breadcrumb.Item, null, (0, _url2.default)().params.name), _react2.default.createElement(_antd.Breadcrumb.Item, null, '资源管理'), _react2.default.createElement(_antd.Breadcrumb.Item, null, '视频库')), _react2.default.createElement('div', { className: 'video-list-operation' }, _react2.default.createElement('div', { className: 'video-list-operation-add' }, _react2.default.createElement(_antd.Upload, {
                        ref: 'upload',
                        accept: 'video/wmv, video/avi, video/dat, video/asf, video/rm, video/rmvb, video/ram, video/mpg, video/mpeg, video/3gp, video/mov, video/mp4, video/m4v, video/dvix, video/dv, video/mkv, video/flv, video/vob, video/qt, video/divx, video/cpk, video/fli, video/flc, video/mod',
                        action: state.uploadUrl,
                        showUploadList: false,
                        listType: 'text',
                        beforeUpload: this.hanldePrepareUpload,
                        onChange: this.handleChangeUpload
                    }, _react2.default.createElement(_antd.Button, { className: 'classic-btn pink-btn video-list-operation-add-button' }, '上传视频'))), _react2.default.createElement(_index2.default, {
                        onCourseSearch: this.handleSearch,
                        placeholder: '输入关键词'
                    })), _react2.default.createElement(_index6.default, {
                        isShow: state.showSelectModal,
                        className: 'video-list-select-modal',
                        onModalClose: this.handleModalClose,
                        title: '上传视频',
                        closable: false,
                        maskClosable: false
                    }, _react2.default.createElement('div', { className: 'video-list-process-content' }, _react2.default.createElement(_antd.Button, { className: 'classic-btn video-btn' }, state.fileName), _react2.default.createElement(_antd.Progress, {
                        percent: state.percent,
                        format: function format(percent) {
                            return percent.toFixed(2) + '%';
                        }
                    }), _react2.default.createElement('div', null, _react2.default.createElement('span', { className: 'video-list-process-content-num' }, state.loaded, 'MB / ', state.total, 'MB'), state.playVideoId ? _react2.default.createElement(_antd.Button, {
                        className: 'classic-btn video-cancel-btn',
                        onClick: this.handleCancelUpload
                    }, '取消上传') : null))), _react2.default.createElement(_index4.default, {
                        search: state.query,
                        forceUpdate: state.tableForceUpdate,
                        onCancelForceUpdate: this.handleCancelForceUpdate
                    }));
                }
            }
        ]);
        return VideoList;
    }(_react2.default.Component);
    exports.default = VideoList;
});