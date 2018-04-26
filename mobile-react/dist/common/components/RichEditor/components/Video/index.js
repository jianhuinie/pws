define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _PageController2 = require('common/controller/PageController');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var Video = function (_PageController) {
        _inherits(Video, _PageController);
        function Video(props) {
            _classCallCheck(this, Video);
            var _this = _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).call(this, props));
            _this.beforeUpload = function (file) {
            };
            _this.onContentChange = function (obj) {
                var self = _this;
                self.props.onContentChange({
                    index: self.props.index,
                    curItem: {
                        uniqueId: self.props.uniqueId,
                        type: 'video',
                        options: obj
                    }
                });
            };
            _this.handleChange = function (res) {
                var self = _this;
                var status = res.file.status;
                if (status === 'uploading') {
                    var disabled = true;
                    var loading = true;
                    self.setState({
                        loading: loading,
                        disabled: disabled
                    });
                    self.props.onUploadingStatusChange(true);
                }
                if (status === 'done') {
                    self.setState({
                        loading: false,
                        disabled: false
                    });
                    self.props.onUploadingStatusChange(false);
                    if (res.file.response.code === 0) {
                        var data = res.file.response.data;
                        self.setState({
                            storageId: data.fid,
                            coverUrl: data.coverUrl
                        });
                        var obj = {
                            storageId: data.fid,
                            coverUrl: data.coverUrl
                        };
                        self.onContentChange(obj);
                    } else {
                        _antd.message.error(res.file.response.msg);
                    }
                }
            };
            _this.onDeleteItem = function (e) {
                var flag = false;
                if (_this.state.storageId) {
                    flag = true;
                }
                _this.props.onDeleteItem(+e.currentTarget.dataset.index, flag);
            };
            _this.state = {
                loading: false,
                disabled: false,
                coverUrl: '',
                storageId: ''
            };
            return _this;
        }
        _createClass(Video, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    if (self.props.options.storageId) {
                        var _self$props$options = self.props.options, coverUrl = _self$props$options.coverUrl, storageId = _self$props$options.storageId;
                        self.setState({
                            coverUrl: coverUrl,
                            storageId: storageId
                        });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var _self$state = self.state, coverUrl = _self$state.coverUrl, storageId = _self$state.storageId, loading = _self$state.loading, disabled = _self$state.disabled;
                    return _react2.default.createElement('div', {
                        className: 'editor-item editor-video',
                        'data-index': self.props.index
                    }, _react2.default.createElement('i', { className: 'icon icon-item icon-live-o' }), _react2.default.createElement(_antd.Upload, {
                        className: 'media-uploader',
                        showUploadList: false,
                        action: '/base/uploadVideo.do',
                        beforeUpload: self.beforeUpload,
                        onChange: self.handleChange,
                        disabled: disabled,
                        accept: 'video/*'
                    }, _react2.default.createElement(_antd.Spin, { spinning: loading }, storageId ? _react2.default.createElement('div', { className: 'photo-item' }, _react2.default.createElement('img', {
                        src: coverUrl,
                        alt: ''
                    }), _react2.default.createElement('span', { className: 'video-icon' })) : _react2.default.createElement('div', { className: 'media-uploader-trigger' }, _react2.default.createElement('i', { className: 'icon-ic_add' }), ' 上传视频'))), _react2.default.createElement('span', {
                        className: 'icon-close',
                        'data-index': self.props.index,
                        onClick: self.onDeleteItem
                    }), _react2.default.createElement('div', { className: 'uploading-mask' + (loading ? '' : ' hide') }, '上传中...请勿拖动排序'));
                }
            }
        ]);
        return Video;
    }(_PageController3.default);
    ;
    exports.default = Video;
});