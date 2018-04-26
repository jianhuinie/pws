define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _url = require('gsx-design/util/url');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _url2 = _interopRequireDefault(_url);
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
    var Verifying = function (_PageController) {
        _inherits(Verifying, _PageController);
        function Verifying() {
            var _ref;
            var _temp, _this, _ret;
            _classCallCheck(this, Verifying);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Verifying.__proto__ || Object.getPrototypeOf(Verifying)).call.apply(_ref, [this].concat(args))), _this), _this.jump = function () {
                var classId = +(0, _url2.default)().params.id || _util2.default.getHashParams().id;
                console.log(classId);
                location.href = '/mweb/classroom?id=' + classId;
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }
        _createClass(Verifying, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    document.title = '审核中';
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'room-verifying' }, _react2.default.createElement('img', {
                        className: 'room-verifying-logo',
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4b32697982c.png'
                    }), _react2.default.createElement('div', { className: 'room-verifying-desc' }, '提交的认证信息正在审核中\uFF0C请耐心等待', _react2.default.createElement('br', null), '认证结果将会通过公众号告知'), _react2.default.createElement('a', null, _react2.default.createElement('button', {
                        className: 'ws-btn-red room-verifying-back',
                        onClick: this.jump
                    }, '返回课堂')));
                }
            }
        ]);
        return Verifying;
    }(_PageController3.default);
    exports.default = Verifying;
    ;
});