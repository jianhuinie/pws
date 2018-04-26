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
    var IntroUpload = function (_CommonController) {
        _inherits(IntroUpload, _CommonController);
        function IntroUpload() {
            var _ref;
            var _temp, _this, _ret;
            _classCallCheck(this, IntroUpload);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IntroUpload.__proto__ || Object.getPrototypeOf(IntroUpload)).call.apply(_ref, [this].concat(args))), _this), _this.hanldePrepareUpload = function (file) {
                var me = _this;
                var MAX_SIZE = me.props.size * 1024 * 1024;
                if (Number(file.size) > MAX_SIZE) {
                    _antd.message.warning('请选择大小在' + me.props.size + 'M以内的图片', 3);
                    return false;
                }
                return true;
            }, _this.handleChangeUpload = function (info) {
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
                            me.props.onUpload(me.props.type, uploadedFile);
                        } else {
                            _antd.message.error(res.msg);
                        }
                        break;
                    }
                case 'error':
                    _antd.message.error(uploadedFile.error || '网络故障\uFF0C请稍后重试');
                    break;
                }
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }
        _createClass(IntroUpload, [{
                key: 'render',
                value: function render() {
                    var me = this;
                    return _react2.default.createElement('div', { className: 'intro-upload' }, _react2.default.createElement(_antd.Upload, {
                        action: '/pc/image/upload',
                        showUploadList: false,
                        listType: 'picture-card',
                        accept: 'image/png, image/jpeg, image/jpg',
                        beforeUpload: me.hanldePrepareUpload,
                        onChange: me.handleChangeUpload
                    }, _react2.default.createElement(_antd.Button, { className: 'intro-upload-btn' }, _react2.default.createElement('span', { className: 'icon-img' }), '选择图片')));
                }
            }]);
        return IntroUpload;
    }(_CommonController3.default);
    exports.default = IntroUpload;
});