define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('gsx-design/component/lazyLoadImage/index');
    var _util = require('common/util/util');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
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
    var SeriesClassItem = function (_PageController) {
        _inherits(SeriesClassItem, _PageController);
        function SeriesClassItem(props) {
            _classCallCheck(this, SeriesClassItem);
            var _this = _possibleConstructorReturn(this, (SeriesClassItem.__proto__ || Object.getPrototypeOf(SeriesClassItem)).call(this, props));
            _this.jump = function () {
                var self = _this;
                location.href = '/mweb/series/?id=' + self.props.data.id;
            };
            _this.state = {};
            return _this;
        }
        _createClass(SeriesClassItem, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    _index2.default.init();
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
                    }, _react2.default.createElement('div', { className: 'left-part sub-item left' }, _react2.default.createElement('img', { src: data.coverUrl })), _react2.default.createElement('div', { className: 'right-part sub-item' }, _react2.default.createElement('div', { className: 'class-item-top' }, _react2.default.createElement('div', { className: 'class-item-title' }, data.name)), _react2.default.createElement('div', { className: 'class-item-middle' }, _react2.default.createElement('span', { className: 'class-item-lesson' }, _util2.default.getLessonText(data, self.props.discovery))), _react2.default.createElement('div', { className: 'class-item-footer' }, _react2.default.createElement('div', { className: 'student-cnt' }, _util2.default.getStudentCntText(data)), _react2.default.createElement('div', { className: priceClass }, _util2.default.getPriceText(data)))), _react2.default.createElement('div', { className: 'clearfix' }));
                }
            }
        ]);
        return SeriesClassItem;
    }(_PageController3.default);
    ;
    exports.default = SeriesClassItem;
});