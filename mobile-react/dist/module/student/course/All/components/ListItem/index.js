define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _moment = require('moment');
    var _index = require('gsx-design/component/lazyLoadImage/index');
    var _courseMode = require('common/enum/courseMode');
    var _index3 = require('common/components/LivingAnimation/index');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _moment2 = _interopRequireDefault(_moment);
    var _index2 = _interopRequireDefault(_index);
    var _courseMode2 = _interopRequireDefault(_courseMode);
    var _index4 = _interopRequireDefault(_index3);
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
    var ListItem = function (_React$Component) {
        _inherits(ListItem, _React$Component);
        function ListItem() {
            var _ref;
            var _temp, _this, _ret;
            _classCallCheck(this, ListItem);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call.apply(_ref, [this].concat(args))), _this), _this.getLearnRate = function () {
                var learnRate = _this.props.learnRate;
                return learnRate === 100 ? '已学完' : '已学' + learnRate + '%';
            }, _this.renderFoot = function () {
                var self = _this;
                var data = self.props;
                var lastLearnTimeText = (0, _moment2.default)(data.lastLearnTime).format('MM-DD HH:mm');
                var html = void 0;
                if (data.liveStatus === 1) {
                    html = _react2.default.createElement('div', null, _react2.default.createElement(_index4.default, null), _react2.default.createElement('span', { className: 'living-text' }, '正在直播'));
                } else {
                    html = _react2.default.createElement('div', null, _util2.default.getClassTypeText(data), ' | 上次学习', lastLearnTimeText);
                }
                return html;
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }
        _createClass(ListItem, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    _index2.default.init();
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    _index2.default.init();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var redirectUrl = props.courseMode === _courseMode2.default.SERIES ? '/mweb/series/?id=' + props.id : '/mweb/single/?id=' + props.id;
                    return _react2.default.createElement('a', { href: redirectUrl }, _react2.default.createElement('div', { className: 'course-item' }, _react2.default.createElement('img', {
                        className: 'course-item-cover',
                        'data-src': props.coverUrl
                    }), _react2.default.createElement('div', { className: 'course-item-detail' }, _react2.default.createElement('div', { className: 'course-item-detail-top' }, props.name), _react2.default.createElement('div', { className: 'course-item-detail-foot' }, this.renderFoot()))));
                }
            }
        ]);
        return ListItem;
    }(_react2.default.Component);
    ListItem.propTypes = {
        id: _react.PropTypes.number.isRequired,
        name: _react.PropTypes.string.isRequired,
        coverUrl: _react.PropTypes.string.isRequired,
        courseType: _react.PropTypes.number.isRequired,
        courseMode: _react.PropTypes.number.isRequired,
        lastLearnTime: _react.PropTypes.number.isRequired,
        learnRate: _react.PropTypes.number.isRequired
    };
    exports.default = ListItem;
});