define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var lazyLoadImage = require('common/lazyLoadImage');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
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
    var RcmdCard = function (_React$Component) {
        _inherits(RcmdCard, _React$Component);
        function RcmdCard(props) {
            _classCallCheck(this, RcmdCard);
            var _this = _possibleConstructorReturn(this, (RcmdCard.__proto__ || Object.getPrototypeOf(RcmdCard)).call(this, props));
            _this.jump = _this.jump.bind(_this);
            return _this;
        }
        _createClass(RcmdCard, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'jump',
                value: function jump(event) {
                    var data = $(event.target).data('item');
                    if (data && data.detail_url) {
                        window.location.href = data.detail_url;
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var data = self.props.item;
                    var dataStr = JSON.stringify(data);
                    return _react2.default.createElement('div', { className: 'order-card' }, _react2.default.createElement('div', { className: 'order-card-title' }, '顾问推荐'), _react2.default.createElement('div', { className: 'order-card-info' }, _react2.default.createElement('div', { className: 'order-card-avatar' }, _react2.default.createElement('img', {
                        'data-src': data.avatar,
                        alt: ''
                    })), _react2.default.createElement('div', { className: 'order-card-detail' }, _react2.default.createElement('p', { className: 'order-card-teacher ellipsis' }, data.teacher_name, ' - ', data.course_name), _react2.default.createElement('p', { className: 'order-card-price ellipsis' }, '专属顾问已为您推荐'))), _react2.default.createElement('div', {
                        className: 'order-card-btn',
                        'data-item': dataStr,
                        onClick: self.jump
                    }, '老师详情'));
                }
            }
        ]);
        return RcmdCard;
    }(_react2.default.Component);
    exports.default = RcmdCard;
});