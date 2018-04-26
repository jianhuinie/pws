define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _CommonController2 = require('common/controller/CommonController');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
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
    var ImageUpload = function (_CommonController) {
        _inherits(ImageUpload, _CommonController);
        function ImageUpload(props) {
            _classCallCheck(this, ImageUpload);
            var _this = _possibleConstructorReturn(this, (ImageUpload.__proto__ || Object.getPrototypeOf(ImageUpload)).call(this, props));
            _this.hanldePrepareUpload = function (file) {
                var me = _this;
                var MAX_SIZE = me.props.size * 1024 * 1024;
                if (Number(file.size) > MAX_SIZE) {
                    _antd.message.warning('请选择大小在' + me.props.size + 'M以内的图片', 3);
                    return false;
                }
                return true;
            };
            _this.handleChangeUpload = function (info) {
                var me = _this;
                var uploadedFile = info.file;
                switch (uploadedFile.status) {
                case 'done': {
                        var res = uploadedFile.response;
                        if (res.code === 200) {
                            var data = res.data;
                            uploadedFile.uid = data.storageId;
                            uploadedFile.name = '' + data.storageId;
                            uploadedFile.url = data.url;
                            me.props.onUpload(uploadedFile);
                        } else {
                            _antd.message.error(res.msg);
                        }
                        me.setState({ fileList: [uploadedFile] });
                        break;
                    }
                case 'uploading': {
                        me.setState({ fileList: [uploadedFile] });
                        break;
                    }
                case 'error':
                    _antd.message.error(uploadedFile.error || '网络故障\uFF0C请稍后重试');
                    break;
                }
            };
            _this.state = { fileList: _this.getFileListByProps(props) };
            return _this;
        }
        _createClass(ImageUpload, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var me = this;
                    if (nextProps.storageId && nextProps.storageId !== me.props.storageId) {
                        me.setState({ fileList: me.getFileListByProps(nextProps) });
                    }
                }
            },
            {
                key: 'getFileListByProps',
                value: function getFileListByProps(props) {
                    return props.storageId ? [{
                            uid: props.storageId,
                            name: '' + props.storageId,
                            size: 0,
                            status: 'done',
                            url: '' + props.url
                        }] : [];
                }
            },
            {
                key: 'showUploadList',
                value: function showUploadList() {
                    return {
                        showRemoveIcon: false,
                        showPreviewIcon: false
                    };
                }
            },
            {
                key: 'render',
                value: function render() {
                    var me = this;
                    return _react2.default.createElement('div', { className: 'image-upload' }, _react2.default.createElement(_antd.Upload, {
                        action: '/pc/image/upload',
                        showUploadList: me.showUploadList(),
                        listType: 'picture-card',
                        accept: 'image/png, image/jpeg, image/jpg',
                        fileList: me.state.fileList,
                        beforeUpload: me.hanldePrepareUpload,
                        onChange: me.handleChangeUpload
                    }, _react2.default.createElement(_antd.Button, { className: 'image-upload-btn' }, '选择文件')), _react2.default.createElement('div', { className: 'image-upload-tip' }, me.props.tip));
                }
            }
        ]);
        return ImageUpload;
    }(_CommonController3.default);
    ImageUpload.defaultProps = {
        tip: '建议尺寸100X100px\uFF0C小于2M',
        size: 1,
        storageId: undefined,
        url: ''
    };
    exports.default = ImageUpload;
});