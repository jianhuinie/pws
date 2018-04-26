define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _courseMode = require('common/enum/courseMode');
    var _courseType = require('common/enum/courseType');
    var _moment = require('moment');
    var _index = require('gsx-design/component/lazyLoadImage/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _courseMode2 = _interopRequireDefault(_courseMode);
    var _courseType2 = _interopRequireDefault(_courseType);
    var _moment2 = _interopRequireDefault(_moment);
    var _index2 = _interopRequireDefault(_index);
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
    var RecordItem = function (_React$Component) {
        _inherits(RecordItem, _React$Component);
        function RecordItem() {
            var _ref;
            var _temp, _this, _ret;
            _classCallCheck(this, RecordItem);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecordItem.__proto__ || Object.getPrototypeOf(RecordItem)).call.apply(_ref, [this].concat(args))), _this), _this.getRecordTypeText = function (courseType, courseMode) {
                if (courseMode === _courseMode2.default.SERIES) {
                    return '系列';
                } else if (courseType === _courseType2.default.RELAY) {
                    return '视频';
                }
                return '直播';
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }
        _createClass(RecordItem, [
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
                    var redirectUrl = this.props.courseMode === _courseMode2.default.SERIES ? '/mweb/series/?id=' + this.props.id : '/mweb/single/?id=' + this.props.id;
                    return _react2.default.createElement('a', { href: redirectUrl }, _react2.default.createElement('div', { className: 'record-item' }, _react2.default.createElement('img', {
                        className: 'record-item-cover',
                        'data-src': props.coverUrl
                    }), _react2.default.createElement('div', { className: 'record-item-detail' }, _react2.default.createElement('div', { className: 'record-item-detail-top' }, props.name), _react2.default.createElement('div', { className: 'record-item-detail-middle' }, this.getRecordTypeText(props.courseType, props.courseMode), '\xA0|\xA0购于', (0, _moment2.default)(props.payTime).format('YYYY-MM-DD HH:mm')), _react2.default.createElement('div', { className: 'record-item-detail-foot' }, '实付', _react2.default.createElement('span', { className: 'price' }, '\xA5', props.price.toFixed(2))))));
                }
            }
        ]);
        return RecordItem;
    }(_react2.default.Component);
    RecordItem.propTypes = {
        id: _react.PropTypes.number.isRequired,
        name: _react.PropTypes.string.isRequired,
        coverUrl: _react.PropTypes.string.isRequired,
        price: _react.PropTypes.number.isRequired,
        courseType: _react.PropTypes.number.isRequired,
        courseMode: _react.PropTypes.number.isRequired,
        payTime: _react.PropTypes.number.isRequired
    };
    exports.default = RecordItem;
});