define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('compile_spa/module/activity/liveHelp/component/Header/index');
    var _index3 = require('compile_spa/module/activity/liveHelp/component/Nav/index');
    var _index5 = require('compile_spa/module/activity/liveHelp/component/LiveRule/index');
    var _index7 = require('compile_spa/module/activity/liveHelp/component/Process/index');
    var _index9 = require('compile_spa/module/activity/liveHelp/component/DeviceRequest/index');
    var _index11 = require('compile_spa/module/activity/liveHelp/component/Bottom/index');
    var _PageController2 = require('compile_spa/common/controller/PageController');
    var lazyLoadImage = require('common/lazyLoadImage');
    var app = require('common/app');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
    var _index12 = _interopRequireDefault(_index11);
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
    var liveHelpContainer = function (_PageController) {
        _inherits(liveHelpContainer, _PageController);
        function liveHelpContainer() {
            _classCallCheck(this, liveHelpContainer);
            return _possibleConstructorReturn(this, (liveHelpContainer.__proto__ || Object.getPrototypeOf(liveHelpContainer)).apply(this, arguments));
        }
        _createClass(liveHelpContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'render',
                value: function render() {
                    app.setPageTitle('跟谁学直播助手使用指南');
                    return _react2.default.createElement('div', { className: 'livehelp-main-box' }, _react2.default.createElement(_index2.default, null), _react2.default.createElement(_index4.default, null), _react2.default.createElement(_index6.default, null), _react2.default.createElement(_index8.default, null), _react2.default.createElement(_index10.default, null), _react2.default.createElement(_index12.default, null));
                }
            }
        ]);
        return liveHelpContainer;
    }(_PageController3.default);
    ;
    exports.default = liveHelpContainer;
});