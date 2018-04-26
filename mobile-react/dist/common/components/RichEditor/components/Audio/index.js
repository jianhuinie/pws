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
    var Audio = function (_PageController) {
        _inherits(Audio, _PageController);
        function Audio(props) {
            _classCallCheck(this, Audio);
            var _this = _possibleConstructorReturn(this, (Audio.__proto__ || Object.getPrototypeOf(Audio)).call(this, props));
            _this.beforeUpload = function (file) {
            };
            _this.onContentChange = function (obj) {
                var self = _this;
                self.props.onContentChange({
                    index: self.props.index,
                    curItem: {
                        uniqueId: self.props.uniqueId,
                        type: 'audio',
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
                            url: data.url
                        });
                        var obj = {
                            storageId: data.fid,
                            url: data.url
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
                url: '',
                storageId: ''
            };
            return _this;
        }
        _createClass(Audio, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    if (self.props.options.url) {
                        var _self$props$options = self.props.options, url = _self$props$options.url, storageId = _self$props$options.storageId;
                        self.setState({
                            url: url,
                            storageId: storageId
                        });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var _self$state = self.state, storageId = _self$state.storageId, loading = _self$state.loading, disabled = _self$state.disabled;
                    return _react2.default.createElement('div', {
                        className: 'editor-item editor-audio',
                        'data-index': self.props.index
                    }, _react2.default.createElement('i', { className: 'icon icon-item icon-microphone2' }), _react2.default.createElement(_antd.Upload, {
                        className: 'media-uploader',
                        showUploadList: false,
                        action: '/base/uploadAudio.do',
                        beforeUpload: self.beforeUpload,
                        onChange: self.handleChange,
                        disabled: disabled,
                        accept: 'audio/*'
                    }, _react2.default.createElement(_antd.Spin, { spinning: loading }, storageId ? _react2.default.createElement('div', { className: 'audio-item' }, _react2.default.createElement('img', {
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57b693e1e3815.png',
                        alt: ''
                    }), _react2.default.createElement('span', { className: 'voice-icon' })) : _react2.default.createElement('div', { className: 'media-uploader-trigger' }, _react2.default.createElement('i', { className: 'icon-ic_add' }), ' 上传录音'))), _react2.default.createElement('span', {
                        className: 'icon-close',
                        'data-index': self.props.index,
                        onClick: self.onDeleteItem
                    }), _react2.default.createElement('div', { className: 'uploading-mask' + (loading ? '' : ' hide') }, '上传中...请勿拖动排序'));
                }
            }
        ]);
        return Audio;
    }(_PageController3.default);
    ;
    exports.default = Audio;
});