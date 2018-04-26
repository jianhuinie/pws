define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ui = require('gsx-design/component/ui');
    var _index = require('gsx-design/component/Loading/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ui2 = _interopRequireDefault(_ui);
    var _index2 = _interopRequireDefault(_index);
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
    var MAX_SIZE = 2 * 1024 * 1024;
    var Upload = function (_React$Component) {
        _inherits(Upload, _React$Component);
        function Upload(props) {
            _classCallCheck(this, Upload);
            var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));
            _this.selectFile = _this.selectFile.bind(_this);
            _this.setInput = _this.setInput.bind(_this);
            _this.fileChange = _this.fileChange.bind(_this);
            _this.loading = new _index2.default();
            return _this;
        }
        _createClass(Upload, [
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.loading.destroy();
                }
            },
            {
                key: 'setInput',
                value: function setInput(input) {
                    this.fileInput = input;
                }
            },
            {
                key: 'selectFile',
                value: function selectFile() {
                    if (this.fileInput) {
                        this.fileInput.click();
                    }
                }
            },
            {
                key: 'fileChange',
                value: function fileChange(e) {
                    var _this2 = this;
                    var files = e.target.files;
                    var file = files.length ? files[0] : null;
                    if (!file) {
                        return;
                    }
                    this.loading.show();
                    var fd = new FormData();
                    fd.append('file', file);
                    _ajaxService2.default.postForm(_ajaxConfig2.default.UPLOAD_IMG, fd).then(function (res) {
                        var _res$data = res.data, storageId = _res$data.storageId, url = _res$data.url;
                        _this2.props.onUploaded({
                            storageId: storageId,
                            url: url,
                            name: file.name
                        });
                        _this2.loading.hide();
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', {
                        className: 'upload-container',
                        onClick: this.selectFile
                    }, _react2.default.createElement('input', {
                        ref: this.setInput,
                        className: 'upload-container-input',
                        type: 'file',
                        accept: 'image/*',
                        onChange: this.fileChange
                    }), this.props.children);
                }
            }
        ]);
        return Upload;
    }(_react2.default.Component);
    Upload.propTypes = {
        children: _react.PropTypes.node,
        onUploaded: _react.PropTypes.func.isRequired
    };
    Upload.defaultProps = { children: '' };
    exports.default = Upload;
});