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
    var CarouselUpload = function (_PageController) {
        _inherits(CarouselUpload, _PageController);
        function CarouselUpload(props) {
            _classCallCheck(this, CarouselUpload);
            var _this = _possibleConstructorReturn(this, (CarouselUpload.__proto__ || Object.getPrototypeOf(CarouselUpload)).call(this, props));
            _this.handleChange = function (info) {
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
                        break;
                    }
                case 'error':
                    _antd.message.error(uploadedFile.error || '网络故障\uFF0C请稍后重试');
                    break;
                }
            };
            _this.beforeUpload = function (file) {
                var MAX_SIZE = 5 * 1024 * 1024;
                if (Number(file.size) > MAX_SIZE) {
                    _antd.message.warning('请选择大小在5M以内的图片', 3);
                    return false;
                }
                return true;
            };
            _this.state = { url: props.url };
            return _this;
        }
        _createClass(CarouselUpload, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var me = this;
                    if (nextProps.storageId && nextProps.storageId !== me.props.storageId) {
                        me.setState({
                            url: nextProps.url,
                            storageId: nextProps.storageId
                        });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var uploadButton = _react2.default.createElement('div', { className: 'carousel-upload-button' }, _react2.default.createElement('img', {
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4c8b62712ee.png',
                        className: 'carousel-upload-button-image'
                    }), _react2.default.createElement('div', { className: 'carousel-upload-button-text' }, '上传图片尺寸750*422'));
                    var imageUrl = this.state.url;
                    return _react2.default.createElement(_antd.Upload, {
                        listType: 'picture-card',
                        className: 'carousel-upload',
                        showUploadList: false,
                        action: '/pc/image/upload',
                        beforeUpload: this.beforeUpload,
                        onChange: this.handleChange
                    }, imageUrl ? _react2.default.createElement('img', {
                        src: imageUrl,
                        alt: '',
                        className: 'carousel-upload-image'
                    }) : uploadButton);
                }
            }
        ]);
        return CarouselUpload;
    }(_PageController3.default);
    CarouselUpload.propTypes = {
        url: _react.PropTypes.string,
        onUpload: _react.PropTypes.func,
        storageId: _react.PropTypes.number
    };
    exports.default = CarouselUpload;
});