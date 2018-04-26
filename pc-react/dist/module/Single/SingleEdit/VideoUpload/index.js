define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _CommonController2 = require('common/controller/CommonController');
    var _index = require('../SingleSelectVideoTable/index');
    var _index3 = require('common/components/SelectModal/index');
    var _url = require('common/util/url');
    var _ajaxService = require('common/util/ajaxService');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _url2 = _interopRequireDefault(_url);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
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
    var url = (0, _url2.default)();
    var VideoUpload = function (_CommonController) {
        _inherits(VideoUpload, _CommonController);
        function VideoUpload(props) {
            _classCallCheck(this, VideoUpload);
            var _this = _possibleConstructorReturn(this, (VideoUpload.__proto__ || Object.getPrototypeOf(VideoUpload)).call(this, props));
            _this.handleCancelModalForceUpdate = function () {
                _this.setState({ forceUpdateModal: false });
            };
            _this.handleVideoSelect = function (keys, rows) {
                if (keys) {
                    _this.setState({
                        videoId: keys[0],
                        videoName: rows[0].name,
                        showSelectModal: false,
                        forceUpdateModal: true,
                        showTipModal: true
                    });
                } else {
                    _this.setState({ showSelectModal: false });
                }
            };
            _this.handleVisiblePopoverChange = function (visible) {
                if (visible !== _this.state.showPopover) {
                    _this.setState({ showPopover: visible });
                }
            };
            _this.handleSelectVideo = function () {
                _this.setState({
                    showSelectModal: true,
                    showPopover: false
                });
            };
            _this.handleModalClose = function () {
                _this.setState({ showSelectModal: false });
            };
            _this.handleTipModalClose = function () {
                _this.setState({
                    showTipModal: false,
                    videoId: undefined,
                    videoName: undefined
                });
            };
            _this.handleSelectAgain = function () {
                _this.setState({
                    showTipModal: false,
                    videoId: undefined,
                    videoName: undefined,
                    showSelectModal: true
                });
            };
            _this.handleVideoCertain = function () {
                _this.setState({
                    showTipModal: false,
                    fileName: _this.state.videoName,
                    percent: 100
                });
                _this.handleCourseAddVideo(_this.state.videoId);
            };
            _this.handleCourseAddVideo = function (videoId) {
                _this.props.onCourseAddVideo(videoId);
            };
            _this.hanldePrepareUpload = function (file) {
                _this.cancelUpload = false;
                _this.setState({
                    fileName: file.name,
                    percent: 0
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
                if (event) {
                    _this.setState({
                        percent: event.percent,
                        loaded: Math.round(event.loaded / (1024 * 1024)),
                        total: Math.round(event.total / (1024 * 1024)),
                        showPopover: _this.cancelUpload ? _this.state.showPopover : false
                    });
                }
                if (file.status === 'done') {
                    if (file.response.code === 1 && !_this.cancelUpload) {
                        _ajaxService2.default.post('/pc/video/add', {
                            fileName: file.name,
                            playVideoId: _this.state.playVideoId
                        }).then(function (res) {
                            _this.handleCourseAddVideo(res.data.videoId);
                        });
                    }
                }
            };
            _this.handleCancelUpload = function () {
                _this.cancelUpload = true;
                _ajaxService2.default.post('/pc/video/cancel', { playVideoId: _this.state.playVideoId });
                _this.setState({
                    fileName: undefined,
                    percent: 0,
                    playVideoId: undefined
                });
            };
            _this.state = {
                showSelectModal: false,
                forceUpdateModal: false,
                showTipModal: false,
                fileName: props.videoName,
                percent: props.videoId ? 100 : undefined,
                loaded: undefined,
                total: undefined,
                uploadUrl: ''
            };
            _this.cancelUpload = false;
            return _this;
        }
        _createClass(VideoUpload, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({
                        fileName: nextProps.videoName,
                        percent: nextProps.videoId ? 100 : undefined
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    var popoverContent = _react2.default.createElement('div', { className: 'video-upload-popover-content' }, _react2.default.createElement('a', {
                        onClick: function onClick() {
                            _this2.handleSelectVideo();
                        }
                    }, _react2.default.createElement('span', { className: 'video-upload-popover-content-spot' }), '从视频库选择'), _react2.default.createElement(_antd.Upload, {
                        accept: 'video/wmv, video/avi, video/dat, video/asf, video/rm, video/rmvb, video/ram, video/mpg, video/mpeg, video/3gp, video/mov, video/mp4, video/m4v, video/dvix, video/dv, video/mkv, video/flv, video/vob, video/qt, video/divx, video/cpk, video/fli, video/flc, video/mod',
                        action: this.state.uploadUrl,
                        showUploadList: false,
                        listType: 'text',
                        beforeUpload: this.hanldePrepareUpload,
                        onChange: this.handleChangeUpload
                    }, _react2.default.createElement('a', null, '从电脑里上传')));
                    var state = this.state;
                    return _react2.default.createElement('div', { className: 'video-upload' }, _react2.default.createElement(_antd.Popover, {
                        content: popoverContent,
                        placement: 'bottom',
                        trigger: 'click',
                        visible: state.showPopover,
                        className: 'video-upload-popover',
                        getPopupContainer: function getPopupContainer(triggerNode) {
                            return triggerNode.parentNode;
                        },
                        onVisibleChange: this.handleVisiblePopoverChange,
                        autoAdjustOverflow: false
                    }, _react2.default.createElement(_antd.Button, { className: 'classic-btn pink-btn md-btn' }, '添加视频')), _react2.default.createElement('div', { className: 'video-upload-process' }, !state.showTipModal && !state.showSelectModal && state.fileName ? _react2.default.createElement('div', { className: 'video-upload-process-content' }, _react2.default.createElement(_antd.Button, { className: 'classic-btn video-btn' }, state.fileName), url.params.courseId ? null : _react2.default.createElement(_antd.Progress, {
                        percent: state.percent,
                        width: 550,
                        format: function format(percent) {
                            return percent.toFixed(2) + '%';
                        }
                    }), state.loaded ? _react2.default.createElement('div', null, _react2.default.createElement('span', { className: 'video-upload-process-content-num' }, state.loaded, 'MB / ', state.total, 'MB'), state.playVideoId ? _react2.default.createElement(_antd.Button, {
                        className: 'classic-btn video-cancel-btn',
                        onClick: this.handleCancelUpload
                    }, '取消上传') : null) : null) : null), _react2.default.createElement(_index4.default, {
                        isShow: state.showSelectModal,
                        className: 'video-upload-select-modal',
                        onModalClose: this.handleModalClose,
                        title: '选择已有视频'
                    }, _react2.default.createElement(_index2.default, {
                        onVideoSelect: this.handleVideoSelect,
                        forceUpdate: state.forceUpdateModal,
                        onCancelForceUpdate: this.handleCancelModalForceUpdate
                    })), _react2.default.createElement(_index4.default, {
                        isShow: state.showTipModal,
                        className: 'video-upload-tip-modal',
                        onModalClose: this.handleTipModalClose,
                        title: '确认使用'
                    }, _react2.default.createElement('div', { className: 'video-upload-tip-modal-content' }, _react2.default.createElement('p', null, '你已选择\uFF1A'), _react2.default.createElement('p', null, state.videoName), _react2.default.createElement('div', { className: 'video-upload-tip-modal-content-operation' }, _react2.default.createElement(_antd.Button, {
                        className: 'classic-btn white-btn md-btn',
                        onClick: this.handleSelectAgain
                    }, '重新选择'), _react2.default.createElement(_antd.Button, {
                        className: 'classic-btn pink-btn md-btn',
                        onClick: this.handleVideoCertain
                    }, '确定使用')))));
                }
            }
        ]);
        return VideoUpload;
    }(_CommonController3.default);
    exports.default = VideoUpload;
});