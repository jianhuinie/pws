define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _url = require('gsx-design/util/url');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    var _eventProxy = require('common/eventProxy');
    var _index = require('module/components/QrcodeImg/index');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _url2 = _interopRequireDefault(_url);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _eventProxy2 = _interopRequireDefault(_eventProxy);
    var _index2 = _interopRequireDefault(_index);
    var _util2 = _interopRequireDefault(_util);
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
    var paySuccessContainer = function (_PageController) {
        _inherits(paySuccessContainer, _PageController);
        function paySuccessContainer(props) {
            _classCallCheck(this, paySuccessContainer);
            var _this = _possibleConstructorReturn(this, (paySuccessContainer.__proto__ || Object.getPrototypeOf(paySuccessContainer)).call(this, props));
            _this.getQrcodeImg = function () {
                var self = _this;
                var paramsObj = (0, _url2.default)().params;
                var params = {
                    classId: paramsObj.classId,
                    courseId: paramsObj.id,
                    courseMode: paramsObj.courseMode,
                    followType: 3
                };
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.GET_QRCODE, params).then(function (res) {
                    if (res && res.code === 200) {
                        var qrcodeImg = res.data.qrcodeUrl;
                        self.setState({ qrcodeImg: qrcodeImg });
                        _eventProxy2.default.trigger('showQrcode');
                    }
                });
            };
            _this.jump = function () {
                var params = (0, _url2.default)().params;
                var id = params.id;
                var mode = +params.mode;
                if (mode === 1) {
                    location.href = '/mweb/single/?id=' + id;
                } else if (mode === 2) {
                    location.href = '/mweb/series/?id=' + id;
                }
            };
            _this.state = { qrcodeImg: '' };
            return _this;
        }
        _createClass(paySuccessContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    var params = (0, _url2.default)().params;
                    if (params.classId) {
                        self.getQrcodeImg();
                    }
                    _util2.default.sharePage();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: 'pay-success-page' }, _react2.default.createElement('div', { className: 'success-icon' }, _react2.default.createElement('i', { className: 'icon icon-success-o' })), _react2.default.createElement('div', { className: 'pay-success-text' }, '购买成功'), _react2.default.createElement('div', { className: 'view-purchase-text' }, '可在\u3010个人中心\u3011-\u3010购买记录\u3011里查看'), _react2.default.createElement('div', {
                        className: 'enter-study-btn',
                        onClick: self.jump
                    }, '点击进入学习'), _react2.default.createElement(_index2.default, { img: self.state.qrcodeImg }));
                }
            }
        ]);
        return paySuccessContainer;
    }(_PageController3.default);
    ;
    exports.default = paySuccessContainer;
});