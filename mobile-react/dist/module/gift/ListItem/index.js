define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _courseMode = require('common/enum/courseMode');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _courseMode2 = _interopRequireDefault(_courseMode);
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
    var ListItem = function (_React$Component) {
        _inherits(ListItem, _React$Component);
        function ListItem() {
            var _ref;
            var _temp, _this, _ret;
            _classCallCheck(this, ListItem);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call.apply(_ref, [this].concat(args))), _this), _this.formateLength = function (length) {
                var h = 0;
                var m = 0;
                if (length >= 3600) {
                    h = Math.floor(length / 3600);
                }
                m = Math.ceil(length % 3600 / 60);
                return '' + (h > 0 ? h + '小时' : '') + (m > 0 ? m + '分钟' : '');
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }
        _createClass(ListItem, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                }
            },
            {
                key: 'render',
                value: function render() {
                    var isFree = Number(this.props.price) === 0;
                    var learnCnt = this.props.learnCnt;
                    if (learnCnt > 9999) {
                        learnCnt = (learnCnt / 10000).toFixed(1) + '万';
                    }
                    var videoLength = this.formateLength(this.props.videoLength);
                    var redirectUrl = this.props.courseMode === _courseMode2.default.SERIES ? '/mweb/series/?id=' + this.props.id : '/mweb/single/?id=' + this.props.id;
                    return _react2.default.createElement('a', { href: redirectUrl }, _react2.default.createElement('div', { className: 'gift-course-item' }, _react2.default.createElement('img', {
                        className: 'course-cover',
                        src: this.props.coverUrl
                    }), _react2.default.createElement('div', { className: 'course-detail' }, _react2.default.createElement('div', { className: 'course-detail-title' }, this.props.name), _react2.default.createElement('div', { className: 'course-detail-time' }, '视频\xA0|\xA0时长', videoLength), _react2.default.createElement('div', { className: 'course-detail-foot' }, _react2.default.createElement('div', { className: 'course-detail-number' }, learnCnt, '人在学'), _react2.default.createElement('div', { className: 'course-detail-price ' + (isFree ? 'free' : '') }, isFree ? '免费' : '\uFFE5' + this.props.price.toFixed(2))))));
                }
            }
        ]);
        return ListItem;
    }(_react2.default.Component);
    ListItem.propTypes = {
        id: _react.PropTypes.number.isRequired,
        name: _react.PropTypes.string.isRequired,
        courseMode: _react.PropTypes.number.isRequired,
        coverUrl: _react.PropTypes.string.isRequired,
        learnCnt: _react.PropTypes.number.isRequired,
        price: _react.PropTypes.number.isRequired,
        videoLength: _react.PropTypes.number.isRequired
    };
    exports.default = ListItem;
});