define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('gsx-design/component/lazyLoadImage/index');
    var _util = require('common/util/util');
    var _index3 = require('common/components/LivingAnimation/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _util2 = _interopRequireDefault(_util);
    var _index4 = _interopRequireDefault(_index3);
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
    var SingleClassItem = function (_PageController) {
        _inherits(SingleClassItem, _PageController);
        function SingleClassItem(props) {
            _classCallCheck(this, SingleClassItem);
            var _this = _possibleConstructorReturn(this, (SingleClassItem.__proto__ || Object.getPrototypeOf(SingleClassItem)).call(this, props));
            _this.jump = function () {
                var self = _this;
                location.href = '/mweb/single/?id=' + self.props.data.id;
            };
            _this.state = {};
            return _this;
        }
        _createClass(SingleClassItem, [
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
                    var self = this;
                    var data = self.props.data;
                    var isLive = data.courseType === 1 && data.liveStatus === 1;
                    var priceClass = void 0;
                    if (data.price === 0) {
                        priceClass = 'student-price free-price';
                    } else if (data.price > 0) {
                        priceClass = 'student-price';
                    } else {
                        priceClass = 'hide';
                    }
                    return _react2.default.createElement('div', {
                        className: 'class-room-item',
                        onClick: self.jump
                    }, _react2.default.createElement('div', { className: 'left-part sub-item left' }, _react2.default.createElement('img', { src: data.coverUrl })), _react2.default.createElement('div', { className: 'right-part sub-item' }, _react2.default.createElement('div', { className: 'class-item-top' }, _react2.default.createElement('div', { className: 'class-item-title' }, data.name)), _react2.default.createElement('div', { className: isLive ? 'class-item-middle hide' : 'class-item-middle' }, _util2.default.getSingleCourseMiddleInfo(data)), _react2.default.createElement('div', { className: isLive ? 'class-item-middle' : 'class-item-middle hide' }, _react2.default.createElement(_index4.default, null), _react2.default.createElement('span', { className: 'live-class-text' }, '正在直播')), _react2.default.createElement('div', { className: 'class-item-footer' }, _react2.default.createElement('div', { className: 'student-cnt' }, _util2.default.getStudentCntText(data)), _react2.default.createElement('div', { className: priceClass }, _util2.default.getPriceText(data)), _react2.default.createElement('div', { className: 'clearfix' }))), _react2.default.createElement('div', { className: 'clearfix' }));
                }
            }
        ]);
        return SingleClassItem;
    }(_PageController3.default);
    ;
    exports.default = SingleClassItem;
});