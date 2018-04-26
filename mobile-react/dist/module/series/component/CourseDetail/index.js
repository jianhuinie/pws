define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('../ImgItem/index');
    var _index3 = require('../TextItem/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
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
    var CourseDetail = function (_PageController) {
        _inherits(CourseDetail, _PageController);
        function CourseDetail(props) {
            _classCallCheck(this, CourseDetail);
            var _this = _possibleConstructorReturn(this, (CourseDetail.__proto__ || Object.getPrototypeOf(CourseDetail)).call(this, props));
            _this.renderList = function (data) {
                var list = data.map(function (item) {
                    var html = void 0;
                    if (item.contentType === 1) {
                        html = _react2.default.createElement(_index2.default, {
                            key: item.content,
                            img: item.content,
                            isCourse: true
                        });
                    } else if (item.contentType === 2) {
                        html = _react2.default.createElement(_index4.default, {
                            key: item.content,
                            text: item.content,
                            isCourse: true
                        });
                    }
                    return html;
                });
                return list;
            };
            _this.state = {};
            return _this;
        }
        _createClass(CourseDetail, [{
                key: 'render',
                value: function render() {
                    var self = this;
                    var courseIntro = self.props.detail.courseIntro || [];
                    var teacherIntro = self.props.detail.teacherIntro || [];
                    var suitablePeople = self.props.detail.suitablePeople || [];
                    var willGet = self.props.detail.willGet || [];
                    return _react2.default.createElement('div', { className: self.props.show ? 'course-detail' : 'course-detail hide' }, _react2.default.createElement('div', { className: 'course-detail-item' }, _react2.default.createElement('div', { className: 'course-detail-title' }, '课程简介'), _react2.default.createElement('div', { className: courseIntro.length ? '' : 'hide' }, self.renderList(courseIntro)), _react2.default.createElement('div', { className: courseIntro.length ? 'hide' : 'no-course-intro' }, '暂无课程简介')), _react2.default.createElement('div', { className: teacherIntro.length ? 'course-detail-item' : 'course-detail-item hide' }, _react2.default.createElement('div', { className: 'course-detail-title' }, '关于讲师'), self.renderList(teacherIntro)), _react2.default.createElement('div', { className: suitablePeople.length ? 'course-detail-item' : 'course-detail-item hide' }, _react2.default.createElement('div', { className: 'course-detail-title' }, '适合人群'), self.renderList(suitablePeople)), _react2.default.createElement('div', { className: willGet.length ? 'course-detail-item' : 'course-detail-item hide' }, _react2.default.createElement('div', { className: 'course-detail-title' }, '你将获得'), self.renderList(willGet)));
                }
            }]);
        return CourseDetail;
    }(_PageController3.default);
    ;
    exports.default = CourseDetail;
});