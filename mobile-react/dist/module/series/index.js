define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    var _index = require('./component/ImgItem/index');
    var _index3 = require('./component/CourseInfo/index');
    var _index5 = require('./component/CourseTip/index');
    var _index7 = require('./component/CourseTab/index');
    var _index9 = require('./component/CourseDetail/index');
    var _index11 = require('./component/FollowPublic/index');
    var _index13 = require('./component/TechnicalSupport/index');
    var _index15 = require('module/classroom/component/SingleClassItem/index');
    var _index17 = require('module/classroom/component/FollowTeacher/index');
    var _index19 = require('./component/PurchaseTip/index');
    var _index21 = require('module/single/component/PurchaseBtn/index');
    var _index23 = require('gsx-design/component/DropLoad/index');
    var _index25 = require('gsx-design/component/fixTab/index');
    var _util = require('common/util/util');
    var _url = require('gsx-design/util/url');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
    var _index12 = _interopRequireDefault(_index11);
    var _index14 = _interopRequireDefault(_index13);
    var _index16 = _interopRequireDefault(_index15);
    var _index18 = _interopRequireDefault(_index17);
    var _index20 = _interopRequireDefault(_index19);
    var _index22 = _interopRequireDefault(_index21);
    var _index24 = _interopRequireDefault(_index23);
    var _index26 = _interopRequireDefault(_index25);
    var _util2 = _interopRequireDefault(_util);
    var _url2 = _interopRequireDefault(_url);
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
    var courseId = +(0, _url2.default)().params.id;
    var courseMode = 2;
    var pageNum = 1;
    var SeriesContainer = function (_PageController) {
        _inherits(SeriesContainer, _PageController);
        function SeriesContainer(props) {
            _classCallCheck(this, SeriesContainer);
            var _this = _possibleConstructorReturn(this, (SeriesContainer.__proto__ || Object.getPrototypeOf(SeriesContainer)).call(this, props));
            _this.getClassInfo = function () {
                var self = _this;
                var params = {
                    courseId: courseId,
                    courseMode: courseMode
                };
                _ajaxService2.default.get(_ajaxConfig2.default.COURSE.GET_COURSE_INFO, params).then(function (res) {
                    if (res && res.code === 200) {
                        var courseInfo = res.data.course;
                        document.title = courseInfo.name;
                        var classRoomInfo = res.data.classroom;
                        var isFollowClassroom = classRoomInfo.isFollow;
                        self.setState({
                            courseInfo: courseInfo,
                            classRoomInfo: classRoomInfo,
                            isFollowClassroom: isFollowClassroom
                        });
                        _util2.default.shareCourse(res.data);
                    }
                });
            };
            _this.getSeriesList = function () {
                var self = _this;
                var params = {
                    courseId: courseId,
                    pageNum: pageNum
                };
                return _ajaxService2.default.get(_ajaxConfig2.default.COURSE.GET_COURSE_COURSE, params).then(function (res) {
                    if (res && res.code === 200) {
                        pageNum++;
                        var list = self.state.list.concat(res.data.courses);
                        self.setState({ list: list });
                        if (res.data.courses.length < 10) {
                            self.dropLoad.dispose();
                            self.dropLoad = null;
                        }
                    }
                });
            };
            _this.getDetail = function () {
                var self = _this;
                var params = {
                    courseId: courseId,
                    courseMode: courseMode
                };
                _ajaxService2.default.get(_ajaxConfig2.default.COURSE.GET_COURSE_DETAIL, params).then(function (res) {
                    if (res && res.code === 200) {
                        var detail = res.data.detail;
                        self.setState({ detail: detail });
                    }
                });
            };
            _this.changeTab = function (index) {
                var self = _this;
                if (self.state.tab === index) {
                    return;
                }
                self.setState({ tab: index }, function () {
                    if (self.state.tab === 2) {
                        window.scrollTo(0, 422);
                    }
                });
            };
            _this.changeFollowTeacherState = function (status) {
                var self = _this;
                self.setState({ isFollowClassroom: status });
            };
            _this.state = {
                tab: 1,
                courseInfo: {},
                detail: {},
                list: [],
                classRoomInfo: {},
                isFollowClassroom: !1
            };
            return _this;
        }
        _createClass(SeriesContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    self.getClassInfo();
                    self.getSeriesList();
                    self.getDetail();
                    (0, _index26.default)($('.course-tab')[0], false);
                    self.dropLoad = new _index24.default({
                        element: $('.course-catalog'),
                        callback: self.getSeriesList
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var listComponet = self.state.list.map(function (item) {
                        return _react2.default.createElement(_index16.default, {
                            key: item.id + item.courseMode,
                            data: item
                        });
                    });
                    return _react2.default.createElement('div', { className: 'series-course' }, _react2.default.createElement('div', { className: 'top-content' }, _react2.default.createElement('div', { className: 'series-course-img' }, _react2.default.createElement(_index2.default, {
                        img: self.state.courseInfo.coverUrl,
                        isTop: true
                    })), _react2.default.createElement(_index4.default, { courseInfo: self.state.courseInfo }), _react2.default.createElement(_index6.default, null)), _react2.default.createElement(_index8.default, {
                        tab: self.state.tab,
                        callbackParent: self.changeTab
                    }), _react2.default.createElement(_index10.default, {
                        detail: self.state.detail,
                        show: self.state.tab === 1
                    }), _react2.default.createElement('div', { className: self.state.tab === 2 ? 'course-catalog' : 'course-catalog hide' }, listComponet, _react2.default.createElement('div', { className: self.state.list.length ? 'hide' : 'no-course-intro' }, '暂无课程目录')), _react2.default.createElement(_index20.default, {
                        isSeries: true,
                        show: self.state.courseInfo.price
                    }), _react2.default.createElement(_index18.default, {
                        detail: self.state.classRoomInfo,
                        classId: self.state.classRoomInfo.classId,
                        followPublic: self.state.courseInfo.haveFollow,
                        courseId: courseId,
                        isFollow: self.state.isFollowClassroom,
                        courseMode: courseMode,
                        callbackParent: self.changeFollowTeacherState
                    }), _react2.default.createElement(_index12.default, {
                        classId: self.state.classRoomInfo.classId,
                        courseId: courseId,
                        courseMode: courseMode,
                        show: !self.state.courseInfo.haveFollow
                    }), _react2.default.createElement(_index14.default, null), _react2.default.createElement(_index22.default, {
                        data: self.state.courseInfo,
                        classId: self.state.classRoomInfo.classId,
                        callbackParent: self.changeTab
                    }));
                }
            }
        ]);
        return SeriesContainer;
    }(_PageController3.default);
    ;
    exports.default = SeriesContainer;
});