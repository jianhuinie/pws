define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _eventProxy = require('common/eventProxy');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _eventProxy2 = _interopRequireDefault(_eventProxy);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
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
    var QrcodeImg = function (_PageController) {
        _inherits(QrcodeImg, _PageController);
        function QrcodeImg(props) {
            _classCallCheck(this, QrcodeImg);
            var _this = _possibleConstructorReturn(this, (QrcodeImg.__proto__ || Object.getPrototypeOf(QrcodeImg)).call(this, props));
            _this.close = function (e) {
                var self = _this;
                var ele = $(e.target);
                if (!ele.hasClass('qrcode-page-dialog-img')) {
                    $('#app').removeClass('no-scroll-page');
                    var showQrcode = false;
                    self.setState({ showQrcode: showQrcode });
                    if (self.props.callbackParent && _typeof(self.props.callbackParent)) {
                        self.props.callbackParent();
                    }
                }
            };
            _this.show = function () {
                var self = _this;
                $('#app').addClass('no-scroll-page');
                var showQrcode = true;
                self.setState({ showQrcode: showQrcode });
            };
            _this.state = { showQrcode: false };
            return _this;
        }
        _createClass(QrcodeImg, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    _eventProxy2.default.on('showQrcode', function () {
                        self.show();
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', {
                        onClick: self.close,
                        className: self.state.showQrcode ? 'qrcode-page' : 'qrcode-page hide'
                    }, _react2.default.createElement('div', { className: 'qrcode-page-mask' }), _react2.default.createElement('div', { className: 'qrcode-page-dialog' }, _react2.default.createElement('img', {
                        className: 'qrcode-page-dialog-img',
                        src: self.props.img
                    })));
                }
            }
        ]);
        return QrcodeImg;
    }(_PageController3.default);
    ;
    exports.default = QrcodeImg;
});