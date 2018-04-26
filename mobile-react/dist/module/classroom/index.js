define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    var _index = require('./component/FollowTeacher/index');
    var _index3 = require('./component/SingleClass/index');
    var _index5 = require('./component/SeriesClass/index');
    var _index7 = require('module/series/component/ImgSrc/index');
    var _index9 = require('./component/ClassroomFooter/index');
    var _index11 = require('module/components/GuideDialog/index');
    var _index13 = require('module/components/Operation/index');
    var _index15 = require('common/components/Carousel/index');
    var _index17 = require('gsx-design/component/Loading/index');
    var _eventProxy = require('common/eventProxy');
    var _config = require('common/config');
    var _index19 = require('module/components/QrcodeImg/index');
    var _index21 = require('module/classroom/component/FollowClassroom/index');
    var _index23 = require('module/classroom/component/EmptyList/index');
    var _url = require('gsx-design/util/url');
    var _util = require('common/util/util');
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
    var _eventProxy2 = _interopRequireDefault(_eventProxy);
    var _config2 = _interopRequireDefault(_config);
    var _index20 = _interopRequireDefault(_index19);
    var _index22 = _interopRequireDefault(_index21);
    var _index24 = _interopRequireDefault(_index23);
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
    var classroomId = +(0, _url2.default)().params.id;
    var singlePageNum = 1;
    var seriesPageNum = 1;
    var isLogin = false;
    var classroomContainer = function (_PageController) {
        _inherits(classroomContainer, _PageController);
        function classroomContainer(props) {
            _classCallCheck(this, classroomContainer);
            var _this = _possibleConstructorReturn(this, (classroomContainer.__proto__ || Object.getPrototypeOf(classroomContainer)).call(this, props));
            _this.getSingleList = function () {
                var self = _this;
                var params = {
                    classroomId: classroomId,
                    pageNum: singlePageNum
                };
                _ajaxService2.default.get(_ajaxConfig2.default.CLASSROOM.SINGLE_COURSE_LIST, params).then(function (res) {
                    if (res && res.code === 200) {
                        var singleList = self.state.singleList.concat(res.data.courses);
                        var singleNum = res.pageDto.count;
                        var hasMoreSingList = res.data.courses.length === 10;
                        var showEmptyList = false;
                        if (singlePageNum === 1 && singleNum === 0 && self.state.seriesNum === 0) {
                            showEmptyList = true;
                        }
                        var getSingleList = true;
                        singlePageNum++;
                        self.setState({
                            singleList: singleList,
                            hasMoreSingList: hasMoreSingList,
                            getSingleList: getSingleList,
                            singleNum: singleNum,
                            showEmptyList: showEmptyList
                        });
                        if (!self.state.isInit) {
                            self.changeLoadingPage(self.state.getDetail, self.state.getSeriesList, true);
                        }
                    }
                });
            };
            _this.changeLoadingPage = function (getDetail, getSeriesList, getSingleList) {
                var self = _this;
                var isInit = getDetail && getSeriesList && getSingleList;
                self.setState({ isInit: isInit });
                if (isInit) {
                    self.loading.hide();
                    self.loading.destroy();
                }
            };
            _this.getSeriesList = function () {
                var self = _this;
                var params = {
                    classroomId: classroomId,
                    pageNum: seriesPageNum
                };
                _ajaxService2.default.get(_ajaxConfig2.default.CLASSROOM.SERIES_COURSE_LIST, params).then(function (res) {
                    if (res && res.code === 200) {
                        var seriesList = self.state.seriesList.concat(res.data.courses);
                        var hasMoreSeriesList = res.data.courses.length === 10;
                        var seriesNum = res.pageDto.count;
                        var getSeriesList = true;
                        var showEmptyList = false;
                        if (seriesPageNum === 1 && seriesNum === 0 && self.state.singleNum === 0) {
                            showEmptyList = true;
                        }
                        seriesPageNum++;
                        self.setState({
                            seriesList: seriesList,
                            hasMoreSeriesList: hasMoreSeriesList,
                            getSeriesList: getSeriesList,
                            seriesNum: seriesNum,
                            showEmptyList: showEmptyList
                        });
                        if (!self.state.isInit) {
                            self.changeLoadingPage(self.state.getDetail, true, self.state.getSingleList);
                        }
                    }
                });
            };
            _this.getDetail = function () {
                var self = _this;
                var params = { classId: classroomId };
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.SHOW_DETAIL, params).then(function (res) {
                    if (res && res.code === 200) {
                        var detail = res.data;
                        document.title = detail.name;
                        var bannerList = detail.bannerList;
                        var imgItem = bannerList[0];
                        var showGuideDialog = detail.isNeedGuide;
                        var followTeacher = detail.isFollow;
                        var showOperation = detail.isSelfClass;
                        var getDetail = true;
                        self.setState({
                            detail: detail,
                            imgItem: imgItem,
                            followTeacher: followTeacher,
                            showGuideDialog: showGuideDialog,
                            showOperation: showOperation,
                            bannerList: bannerList,
                            getDetail: getDetail
                        });
                        if (!self.state.isInit) {
                            self.changeLoadingPage(true, self.state.getSeriesList, self.state.getSingleList);
                        }
                        _util2.default.shareClassroom(detail);
                    }
                });
            };
            _this.getUserInfo = function () {
                var self = _this;
                _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_USER, {}).then(function (res) {
                    if (res && res.code === 200) {
                        var followPublic = res.data.user.isSubcribeMp;
                        self.setState({ followPublic: followPublic });
                    }
                });
            };
            _this.changeFollowTeacherState = function (status) {
                var self = _this;
                self.setState({ followTeacher: status });
            };
            _this.showPublic = function () {
                _eventProxy2.default.trigger('showQrcode');
            };
            _this.state = {
                detail: {},
                followPublic: !1,
                followTeacher: !1,
                imgItem: {},
                singleList: [],
                seriesList: [],
                singleNum: 0,
                seriesNum: 0,
                hasMoreSingList: !0,
                hasMoreSeriesList: !0,
                showGuideDialog: !1,
                showOperation: !1,
                bannerList: [],
                isInit: false,
                getDetail: false,
                getSeriesList: false,
                getSingleList: false,
                showEmptyList: false
            };
            return _this;
        }
        _createClass(classroomContainer, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    _util2.default.getUserInfo().then(function (res) {
                        if (res && res.code === 200) {
                            isLogin = true;
                        }
                    });
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    self.loading = new _index18.default();
                    self.loading.show();
                    self.getSingleList();
                    self.getSeriesList();
                    self.getDetail();
                    self.getUserInfo();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var sliderLen = self.state.bannerList.length;
                    var imgItem = self.state.bannerList[0];
                    if (!isLogin) {
                        return _react2.default.createElement('div', null);
                    }
                    return _react2.default.createElement('div', { className: 'class-room' }, _react2.default.createElement('div', { className: self.state.isInit ? '' : 'hide' }, _react2.default.createElement('div', { className: sliderLen ? 'classroom-img' : 'classroom-img hide' }, sliderLen === 1 ? _react2.default.createElement(_index8.default, {
                        img: imgItem.coverUrl,
                        url: imgItem.clickUrl
                    }) : _react2.default.createElement(_index16.default, { images: self.state.bannerList })), _react2.default.createElement(_index2.default, {
                        detail: self.state.detail,
                        classId: classroomId,
                        followPublic: self.state.followPublic,
                        isFollow: self.state.followTeacher,
                        callbackParent: self.changeFollowTeacherState
                    }), _react2.default.createElement(_index4.default, {
                        singleList: self.state.singleList,
                        hasMore: self.state.hasMoreSingList,
                        callbackParent: self.getSingleList,
                        num: self.state.singleNum
                    }), _react2.default.createElement(_index6.default, {
                        seriesList: self.state.seriesList,
                        hasMore: self.state.hasMoreSeriesList,
                        callbackParent: self.getSeriesList,
                        num: self.state.seriesNum
                    }), _react2.default.createElement(_index22.default, {
                        classId: classroomId,
                        show: !self.state.followPublic
                    }), _react2.default.createElement(_index24.default, { show: self.state.showEmptyList }), _react2.default.createElement('div', { className: 'empty-class' }), _react2.default.createElement(_index10.default, { showPublic: self.showPublic }), _react2.default.createElement(_index12.default, {
                        isAuth: self.state.detail.authStatus === 2,
                        isShowDialog: self.state.isInit && self.state.showGuideDialog
                    }), _react2.default.createElement(_index14.default, { isShow: self.state.isInit && self.state.showOperation }), _react2.default.createElement(_index20.default, { img: _config2.default.PUBLIC_URL })));
                }
            }
        ]);
        return classroomContainer;
    }(_PageController3.default);
    ;
    exports.default = classroomContainer;
});