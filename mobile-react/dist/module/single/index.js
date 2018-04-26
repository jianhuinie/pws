define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    var _eventProxy = require('common/eventProxy');
    var _videoPlayer = require('common/videoPlayer');
    var _index = require('module/series/component/ImgItem/index');
    var _index3 = require('module/series/component/CourseInfo/index');
    var _index5 = require('module/series/component/CourseTip/index');
    var _index7 = require('module/series/component/CourseDetail/index');
    var _index9 = require('module/series/component/FollowPublic/index');
    var _index11 = require('module/series/component/TechnicalSupport/index');
    var _index13 = require('module/classroom/component/FollowTeacher/index');
    var _index15 = require('module/series/component/PurchaseTip/index');
    var _index17 = require('module/single/component/PurchaseSeries/index');
    var _index19 = require('module/single/component/PurchaseBtn/index');
    var _ui = require('gsx-design/component/ui');
    var _url = require('gsx-design/util/url');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _eventProxy2 = _interopRequireDefault(_eventProxy);
    var _videoPlayer2 = _interopRequireDefault(_videoPlayer);
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
    var _ui2 = _interopRequireDefault(_ui);
    var _url2 = _interopRequireDefault(_url);
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
    var courseId = +(0, _url2.default)().params.id;
    var courseMode = 1;
    var getVideoInfo = false;
    var SingleContainer = function (_PageController) {
        _inherits(SingleContainer, _PageController);
        function SingleContainer(props) {
            _classCallCheck(this, SingleContainer);
            var _this = _possibleConstructorReturn(this, (SingleContainer.__proto__ || Object.getPrototypeOf(SingleContainer)).call(this, props));
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
                        var playText = _util2.default.getPurchaseText(courseInfo, 1);
                        var classRoomInfo = res.data.classroom;
                        var seriesCourse = courseInfo.seriesCourse;
                        var isFollowClassroom = classRoomInfo.isFollow;
                        self.setState({
                            courseInfo: courseInfo,
                            classRoomInfo: classRoomInfo,
                            isFollowClassroom: isFollowClassroom,
                            seriesCourse: seriesCourse,
                            playText: playText
                        });
                        _util2.default.shareCourse(res.data);
                        if ((courseInfo.havePermission || !courseInfo.price && courseInfo.canSellAlone) && courseInfo.courseType === 2) {
                            self.getVideo();
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
            _this.changeFollowTeacherState = function (status) {
                var self = _this;
                self.setState({ isFollowClassroom: status });
            };
            _this.singleOpt = function (e) {
                e.stopPropagation();
                _eventProxy2.default.trigger('SingleOpt');
            };
            _this.clickPlayer = function () {
                var self = _this;
                if (!getVideoInfo) {
                    _ui2.default.alert({ content: '当前课程尚未上传视频' });
                    return;
                }
                if (!self.state.isPlaying) {
                    self.setState({ isPlaying: !0 });
                    var videoPlayer = document.getElementsByTagName('video');
                    if (videoPlayer[0].readyState === 4) {
                        videoPlayer[0].play();
                        $(videoPlayer).attr('autoplay', 'autoplay');
                    }
                }
            };
            _this.getVideo = function () {
                var params = { courseId: courseId };
                _ajaxService2.default.get(_ajaxConfig2.default.GET_VIDEO_TOKEN, params).then(function (res) {
                    if (res && res.code === 200) {
                        var data = res.data;
                        getVideoInfo = true;
                        data.container = '.player-container';
                        data.id = data.playVideoId;
                        data.courseId = courseId;
                        _videoPlayer2.default.initPlayer(data);
                    }
                });
            };
            _this.state = {
                courseInfo: {},
                detail: {},
                classRoomInfo: {},
                isFollowClassroom: !1,
                seriesCourse: null,
                isPlaying: !1,
                playText: ''
            };
            return _this;
        }
        _createClass(SingleContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    self.getClassInfo();
                    self.getDetail();
                    _eventProxy2.default.on('modifyBtnText', function (data) {
                        var playText = data;
                        self.setState({ playText: playText });
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: 'single-course' }, _react2.default.createElement('div', { className: 'single-course-img' }, _react2.default.createElement('div', { className: self.state.isPlaying ? 'hide' : 'single-course-cover' }, _react2.default.createElement(_index2.default, {
                        img: self.state.courseInfo.coverUrl,
                        isTop: true
                    }), _react2.default.createElement('div', {
                        className: 'single-opt',
                        onClick: self.singleOpt
                    }, _react2.default.createElement('i', { className: 'icon icon-player-start' }), _react2.default.createElement('span', null, self.state.playText))), _react2.default.createElement('div', { className: 'player-container' })), _react2.default.createElement(_index4.default, { courseInfo: self.state.courseInfo }), _react2.default.createElement(_index6.default, null), _react2.default.createElement(_index18.default, { data: self.state.seriesCourse }), _react2.default.createElement(_index8.default, {
                        detail: self.state.detail,
                        show: true
                    }), _react2.default.createElement(_index16.default, { show: self.state.courseInfo.price }), _react2.default.createElement(_index14.default, {
                        detail: self.state.classRoomInfo,
                        classId: self.state.classRoomInfo.classId,
                        followPublic: self.state.courseInfo.haveFollow,
                        courseId: courseId,
                        isFollow: self.state.isFollowClassroom,
                        courseMode: courseMode,
                        callbackParent: self.changeFollowTeacherState
                    }), _react2.default.createElement(_index10.default, {
                        classId: self.state.classRoomInfo.classId,
                        courseId: courseId,
                        courseMode: courseMode,
                        show: !self.state.courseInfo.haveFollow
                    }), _react2.default.createElement(_index12.default, null), _react2.default.createElement(_index20.default, {
                        data: self.state.courseInfo,
                        classId: self.state.classRoomInfo.classId,
                        callbackParent: self.clickPlayer
                    }));
                }
            }
        ]);
        return SingleContainer;
    }(_PageController3.default);
    ;
    exports.default = SingleContainer;
});