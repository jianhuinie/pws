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
    var CourseInfo = function (_PageController) {
        _inherits(CourseInfo, _PageController);
        function CourseInfo(props) {
            _classCallCheck(this, CourseInfo);
            var _this = _possibleConstructorReturn(this, (CourseInfo.__proto__ || Object.getPrototypeOf(CourseInfo)).call(this, props));
            _this.getLessonText = function (data) {
                var text = '';
                if (data.courseMode === 2) {
                    text = _util2.default.getLessonText(data);
                } else if (data.courseMode === 1) {
                    text = _util2.default.getTimeText(data);
                }
                if (text) {
                    text += ' | ';
                }
                text += _util2.default.getStudentCntText(data);
                return text;
            };
            _this.getCourseType = function (data) {
                var text = '';
                if (data.courseMode === 2) {
                    text = '系列';
                } else if (data.courseMode === 1) {
                    text = _util2.default.getClassTypeText(data, 1);
                }
                return text;
            };
            _this.state = {};
            return _this;
        }
        _createClass(CourseInfo, [{
                key: 'render',
                value: function render() {
                    var self = this;
                    var clsName = void 0;
                    if (self.props.courseInfo.courseMode === 2 || self.props.courseInfo.canSellAlone) {
                        if (self.props.courseInfo.price) {
                            clsName = 'course-info-bottom';
                        } else {
                            clsName = 'course-info-bottom free-price';
                        }
                    } else {
                        clsName = 'hide';
                    }
                    return _react2.default.createElement('div', { className: 'course-info' }, _react2.default.createElement('div', { className: 'course-info-top' }, _react2.default.createElement('div', { className: 'course-info-name' }, _react2.default.createElement('span', { className: 'course-info-type' }, self.getCourseType(self.props.courseInfo)), self.props.courseInfo.name)), _react2.default.createElement('div', { className: 'course-info-middle' }, self.getLessonText(self.props.courseInfo)), _react2.default.createElement('div', { className: clsName }, _util2.default.getPriceText(self.props.courseInfo)));
                }
            }]);
        return CourseInfo;
    }(_PageController3.default);
    ;
    exports.default = CourseInfo;
});