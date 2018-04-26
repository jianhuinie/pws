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
    var UploadPerson = function (_PageController) {
        _inherits(UploadPerson, _PageController);
        function UploadPerson() {
            _classCallCheck(this, UploadPerson);
            return _possibleConstructorReturn(this, (UploadPerson.__proto__ || Object.getPrototypeOf(UploadPerson)).apply(this, arguments));
        }
        _createClass(UploadPerson, [{
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return _react2.default.createElement('div', { className: 'apply-authen-upload' }, _react2.default.createElement('div', { className: 'title' }, '上传运营者手持身份证照片'), _react2.default.createElement('div', { className: 'upload-area' }, _react2.default.createElement(_index2.default, { onUploaded: this.props.onUploaded }, props.storageId ? _react2.default.createElement('img', {
                        className: 'upload-content',
                        src: props.url
                    }) : _react2.default.createElement('div', { className: 'upload-content' }, _react2.default.createElement('div', { className: 'icon-upload-person' }), _react2.default.createElement('div', { className: 'upload-content-tip' }, '点击上传图片'))), _react2.default.createElement('div', { className: 'desc' }, _react2.default.createElement('div', { className: 'desc-item' }, _react2.default.createElement('span', null, '*'), '仅支持JPG\u3001JPEG\u3001PNG格式'), _react2.default.createElement('div', { className: 'desc-item' }, _react2.default.createElement('span', null, '*'), '最大不超过2M'))), _react2.default.createElement('div', { className: 'apply-authen-upload-example' }, '参考示例\uFF1A请仔细检查照片要求\uFF0C提高认证通过率', _react2.default.createElement('img', {
                        className: 'example',
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4c946507e56.png'
                    })));
                }
            }]);
        return UploadPerson;
    }(_PageController3.default);
    exports.default = UploadPerson;
});