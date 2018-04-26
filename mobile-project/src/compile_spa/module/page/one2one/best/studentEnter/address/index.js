define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _index = require('compile_spa/module/page/one2one/best/components/SearchAddress/index');
    var _PageController2 = require('compile_spa/common/controller/PageController');
    var UTIL = require('common/util');
    var app = require('common/app');
    var setShare = require('common/share/initialize');
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
    var AddressContainer = function (_PageController) {
        _inherits(AddressContainer, _PageController);
        function AddressContainer(props) {
            _classCallCheck(this, AddressContainer);
            var _this = _possibleConstructorReturn(this, (AddressContainer.__proto__ || Object.getPrototypeOf(AddressContainer)).call(this, props));
            _this.state = { urlParams: UTIL.getHashParams() };
            _this.choosedAddress = _this.choosedAddress.bind(_this);
            return _this;
        }
        _createClass(AddressContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    setShare({
                        title: '跟谁学\u300E优选1对1\u300F - 名师个性化辅导',
                        content: '400+城市覆盖\uFF0C8000万家长信赖\u3002全国优选老师\uFF0C个性化学习方案\uFF0C全程助教服务\uFF0C带给你最好的学习体验\u3002',
                        img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
                        url: location.origin + '/webapp/#/one2one/best/se/detail'
                    });
                }
            },
            {
                key: 'choosedAddress',
                value: function choosedAddress(item) {
                    var self = this;
                    var str = '';
                    var newParamsObj = {};
                    var Obj = {
                        lat: item.location.lat,
                        lng: item.location.lng,
                        addressName: item.showAddressStr
                    };
                    $.extend(true, newParamsObj, self.state.urlParams);
                    $.extend(true, newParamsObj, Obj);
                    $.each(newParamsObj, function (key, value) {
                        str += '&' + key + '=' + encodeURIComponent(value);
                    });
                    var hashValue = 'one2one/best/se/search?' + str.substr(1);
                    _reactRouter.hashHistory.push(hashValue);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    app.setPageTitle('我的上课地址');
                    return _react2.default.createElement('div', { className: '' }, _react2.default.createElement(_index2.default, { callback: self.choosedAddress }));
                }
            }
        ]);
        return AddressContainer;
    }(_PageController3.default);
    ;
    exports.default = AddressContainer;
});