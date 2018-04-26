define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('common/components/Upload/index');
    var _PageController2 = require('common/controller/PageController');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
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
    var UploadLicense = function (_PageController) {
        _inherits(UploadLicense, _PageController);
        function UploadLicense() {
            _classCallCheck(this, UploadLicense);
            return _possibleConstructorReturn(this, (UploadLicense.__proto__ || Object.getPrototypeOf(UploadLicense)).apply(this, arguments));
        }
        _createClass(UploadLicense, [{
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return _react2.default.createElement('div', { className: 'apply-authen-upload' }, _react2.default.createElement('div', { className: 'title' }, '上传营业执照扫描件'), _react2.default.createElement('div', { className: 'upload-area' }, _react2.default.createElement(_index2.default, { onUploaded: this.props.onUploaded }, props.storageId ? _react2.default.createElement('img', {
                        className: 'upload-content-org',
                        src: props.url
                    }) : _react2.default.createElement('div', { className: 'upload-content upload-content-org' }, _react2.default.createElement('div', { className: 'icon-upload-org' }), _react2.default.createElement('div', { className: 'upload-content-tip' }, '点击上传图片'))), _react2.default.createElement('div', { className: 'desc' }, _react2.default.createElement('div', { className: 'desc-item' }, _react2.default.createElement('span', null, '*'), '请上传清晰彩色扫描件或者数码照片'), _react2.default.createElement('div', { className: 'desc-item' }, _react2.default.createElement('span', null, '*'), '仅支持JPG\u3001JPEG\u3001PNG格式'), _react2.default.createElement('div', { className: 'desc-item' }, _react2.default.createElement('span', null, '*'), '最大不超过2M'))), _react2.default.createElement('div', { className: 'apply-authen-upload-example' }, '参考示例\uFF1A请仔细检查照片要求\uFF0C提高认证通过率', _react2.default.createElement('img', {
                        className: 'example',
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4c948fef465.png'
                    })));
                }
            }]);
        return UploadLicense;
    }(_PageController3.default);
    exports.default = UploadLicense;
});