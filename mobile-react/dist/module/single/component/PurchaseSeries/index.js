define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var PurchaseSeries = function (_PageController) {
        _inherits(PurchaseSeries, _PageController);
        function PurchaseSeries(props) {
            _classCallCheck(this, PurchaseSeries);
            var _this = _possibleConstructorReturn(this, (PurchaseSeries.__proto__ || Object.getPrototypeOf(PurchaseSeries)).call(this, props));
            _this.jump = function () {
                var self = _this;
                location.href = '/mweb/series/?id=' + self.props.data.id;
            };
            _this.state = {};
            return _this;
        }
        _createClass(PurchaseSeries, [
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var data = self.props.data || {};
                    return _react2.default.createElement('div', {
                        className: self.props.data ? 'purchase-series' : 'purchase-series hide',
                        onClick: self.jump
                    }, _react2.default.createElement('div', { className: 'course-img-series left' }, _react2.default.createElement('img', { src: data.coverUrl })), _react2.default.createElement('div', { className: 'course-info-series' }, _react2.default.createElement('div', { className: 'course-title-series ellipsis' }, data.name), _react2.default.createElement('div', { className: 'course-lesson-series ellipsis' }, '已更新' + data.currentCourseCnt + '节课 | 计划更新' + data.planCourseCnt + '节课')), _react2.default.createElement('div', { className: 'clearfix' }));
                }
            }
        ]);
        return PurchaseSeries;
    }(_PageController3.default);
    ;
    exports.default = PurchaseSeries;
});