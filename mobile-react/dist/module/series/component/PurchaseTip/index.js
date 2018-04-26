define(function (require, exports) {
    'use strict';
    var _react = require('react');
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
    var PurchaseTip = function (_PageController) {
        _inherits(PurchaseTip, _PageController);
        function PurchaseTip(props) {
            _classCallCheck(this, PurchaseTip);
            var _this = _possibleConstructorReturn(this, (PurchaseTip.__proto__ || Object.getPrototypeOf(PurchaseTip)).call(this, props));
            _this.state = {};
            return _this;
        }
        _createClass(PurchaseTip, [{
                key: 'render',
                value: function render() {
                    var self = this;
                    var text = '该课程为付费课\uFF0C购买后可反复学习';
                    if (self.props.isSeries) {
                        text = '该课程为付费系列课\uFF0C将按计划定期更新\uFF0C每节课可在开课时学习\uFF0C也可反复温习';
                    }
                    return _react2.default.createElement('div', { className: self.props.show ? 'course-purchase-tip' : 'course-purchase-tip hide' }, _react2.default.createElement('div', { className: 'course-purchase-tip-title' }, '购买须知'), _react2.default.createElement('div', { className: 'course-purchase-tip-text' }, '1. ', text), _react2.default.createElement('div', { className: 'course-purchase-tip-text' }, '2. 购买课程后\uFF0C关注\u201C微师\u201D公众号\uFF0C可在菜单\u3010已购课程\u3011里查看课程'), _react2.default.createElement('div', { className: 'course-purchase-tip-text' }, '3. 该课程为虚拟内容服务\uFF0C购买成功后概不退款\uFF0C敬请谅解'));
                }
            }]);
        return PurchaseTip;
    }(_PageController3.default);
    ;
    exports.default = PurchaseTip;
});