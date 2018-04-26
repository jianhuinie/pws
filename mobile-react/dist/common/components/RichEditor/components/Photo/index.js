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
    var Photo = function (_PageController) {
        _inherits(Photo, _PageController);
        function Photo(props) {
            _classCallCheck(this, Photo);
            var _this = _possibleConstructorReturn(this, (Photo.__proto__ || Object.getPrototypeOf(Photo)).call(this, props));
            _this.beforeUpload = function (file) {
                var isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJPG) {
                    _antd.message.error('图片类型只能是JPG 或 PNG ');
                }
                var isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    _antd.message.error('图片大小不能超过2MB!');
                }
                return isJPG && isLt2M;
            };
            _this.getBase64 = function (img, callback) {
                var reader = new FileReader();
                reader.addEventListener('load', function () {
                    return callback(reader.result);
                });
                reader.readAsDataURL(img);
            };
            _this.onTextChange = function (e) {
                var newVal = e.target.value;
                var self = _this;
                self.setState({ referUrl: newVal });
                var obj = {
                    referUrl: newVal,
                    storageId: self.state.storageId,
                    url: self.state.url
                };
                self.onContentChange(obj);
            };
            _this.onContentChange = function (obj) {
                var self = _this;
                self.props.onContentChange({
                    index: self.props.index,
                    curItem: {
                        uniqueId: self.props.uniqueId,
                        type: 'photo',
                        options: obj
                    }
                });
            };
            _this.onDeleteItem = function (e) {
                var flag = false;
                if (_this.state.storageId || _this.state.referUrl) {
                    flag = true;
                }
                _this.props.onDeleteItem(+e.currentTarget.dataset.index, flag);
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
                            referUrl: self.state.referUrl,
                            storageId: data.fid,
                            url: data.url
                        };
                        self.onContentChange(obj);
                    } else {
                        _antd.message.error(res.file.response.msg);
                    }
                }
            };
            _this.state = {
                loading: false,
                disabled: false,
                url: '',
                storageId: '',
                referUrl: ''
            };
            return _this;
        }
        _createClass(Photo, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    if (self.props.options.url) {
                        var _self$props$options = self.props.options, url = _self$props$options.url, storageId = _self$props$options.storageId;
                        self.setState({
                            url: url,
                            storageId: storageId,
                            referUrl: self.props.options.referUrl || ''
                        });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var _self$state = self.state, url = _self$state.url, storageId = _self$state.storageId, referUrl = _self$state.referUrl, loading = _self$state.loading, disabled = _self$state.disabled;
                    return _react2.default.createElement('div', {
                        className: 'editor-item editor-photo',
                        'data-index': self.props.index
                    }, _react2.default.createElement('i', { className: 'icon icon-item icon-image2' }), _react2.default.createElement(_antd.Upload, {
                        className: 'media-uploader',
                        showUploadList: false,
                        action: '/base/uploadImg.do',
                        beforeUpload: self.beforeUpload,
                        onChange: self.handleChange,
                        disabled: disabled,
                        accept: 'image/*'
                    }, _react2.default.createElement(_antd.Spin, { spinning: loading }, storageId ? _react2.default.createElement('div', { className: 'photo-item' }, _react2.default.createElement('img', {
                        src: url,
                        alt: ''
                    })) : _react2.default.createElement('div', { className: 'media-uploader-trigger' }, _react2.default.createElement('i', { className: 'icon-ic_add' }), ' 上传图片'))), _react2.default.createElement('span', {
                        className: 'icon-close',
                        'data-index': self.props.index,
                        onClick: self.onDeleteItem
                    }), _react2.default.createElement('div', { className: 'skip-url' }, '转向链接\uFF1A', _react2.default.createElement('input', {
                        value: referUrl,
                        placeholder: '请输入图片跳转链接\uFF0C必须是跟谁学的链接',
                        onChange: self.onTextChange
                    }), '\xA0\xA0(可选)'), _react2.default.createElement('div', { className: 'uploading-mask' + (loading ? '' : ' hide') }, '上传中...请勿拖动排序'));
                }
            }
        ]);
        return Photo;
    }(_PageController3.default);
    ;
    exports.default = Photo;
});