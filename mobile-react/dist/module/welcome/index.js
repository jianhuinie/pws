define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    var _index = require('./component/EnterDiscovery/index');
    var _index3 = require('./component/DiscoveryFooter/index');
    var _index5 = require('./component/SubjectTab/index');
    var _index7 = require('module/classroom/component/SingleClassItem/index');
    var _index9 = require('module/classroom/component/SeriesClassItem/index');
    var _index11 = require('module/components/GiftDialog/index');
    var _index13 = require('gsx-design/component/DropLoad/index');
    var _index15 = require('module/series/component/ImgItem/index');
    var _index17 = require('common/components/Carousel/index');
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
    var fromPage = +(0, _url2.default)().params.from;
    var pageNum = 1;
    var gettedTabs = !1;
    var gettedSliders = !1;
    var gettedLists = !1;
    var discoveryContainer = function (_PageController) {
        _inherits(discoveryContainer, _PageController);
        function discoveryContainer(props) {
            _classCallCheck(this, discoveryContainer);
            var _this = _possibleConstructorReturn(this, (discoveryContainer.__proto__ || Object.getPrototypeOf(discoveryContainer)).call(this, props));
            _this.getUserInfo = function () {
                var self = _this;
                _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_USER, {}).then(function (res) {
                    if (res && res.code === 200) {
                        var showGiftDialog = res.data.user.canReceiveGift;
                        if (fromPage === 1) {
                            if (!showGiftDialog) {
                                location.href = '/mweb/gift';
                            } else {
                                self.reportReceiveGift();
                            }
                            self.setState({ showGiftDialog: showGiftDialog });
                        } else {
                            var isNotedGift = !res.data.user.isNotedGift && showGiftDialog;
                            if (isNotedGift) {
                                self.reportReceiveGift();
                            }
                            self.setState({ showGiftDialog: isNotedGift });
                        }
                    }
                });
            };
            _this.getTabs = function () {
                var self = _this;
                _ajaxService2.default.post(_ajaxConfig2.default.GET_SUBJECTS, {}).then(function (res) {
                    if (res && res.code === 200) {
                        var tab = res.data.subjects;
                        self.setState({ tab: tab });
                        gettedTabs = !0;
                        if (gettedTabs && gettedSliders && gettedLists) {
                            self.setState({ loadingPage: !1 });
                        }
                    }
                });
            };
            _this.getSliders = function (val) {
                var self = _this;
                var params = { subjectId: val || self.state.subjectId };
                _ajaxService2.default.get(_ajaxConfig2.default.GET_BANNERS, params).then(function (res) {
                    if (res && res.code === 200) {
                        var slider = res.data.banners;
                        var imgItem = slider[0];
                        self.setState({
                            slider: slider,
                            imgItem: imgItem
                        });
                        gettedSliders = !0;
                        if (gettedTabs && gettedSliders && gettedLists) {
                            self.setState({ loadingPage: !1 });
                        }
                    }
                });
            };
            _this.getLists = function (val) {
                var self = _this;
                var params = { pageNum: pageNum };
                var subjectId = val || self.state.subjectId;
                if (subjectId !== 1) {
                    params.subjectId = subjectId;
                }
                return _ajaxService2.default.get(_ajaxConfig2.default.COURSE.GET_COURSE_LIST, params).then(function (res) {
                    if (res && res.code === 200) {
                        var list = void 0;
                        if (pageNum === 1) {
                            list = res.data.courses;
                        } else {
                            list = self.state.list.concat(res.data.courses);
                        }
                        pageNum++;
                        var hasMore = !!res.data.courses.length;
                        if (!hasMore) {
                            self.dropLoad.dispose();
                            self.dropLoad = null;
                        }
                        self.setState({
                            list: list,
                            hasMore: hasMore
                        });
                        gettedLists = !0;
                        if (gettedTabs && gettedSliders && gettedLists) {
                            self.setState({ loadingPage: !1 });
                        }
                    }
                });
            };
            _this.reportReceiveGift = function () {
                _ajaxService2.default.post(_ajaxConfig2.default.USER.REPORT_RECEIVE_GIFT, {}).then(function (res) {
                    if (res && res.code === 200) {
                        console.log(res);
                    }
                });
            };
            _this.changeTab = function (id) {
                var self = _this;
                var subjectId = id;
                self.setState({ subjectId: subjectId });
                pageNum = 1;
                self.getSliders(id);
                self.getLists(id);
            };
            _this.closeGiftDialog = function () {
                var self = _this;
                self.setState({ showGiftDialog: !1 });
            };
            _this.state = {
                loadingPage: !0,
                hasMore: !0,
                subjectId: 1,
                imgItem: {},
                tab: [],
                slider: [],
                list: [],
                showGiftDialog: !1
            };
            return _this;
        }
        _createClass(discoveryContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    self.getUserInfo();
                    self.getTabs();
                    self.getSliders();
                    self.getLists();
                    self.dropLoad = new _index14.default({
                        element: $('.discovery-class-list'),
                        callback: self.getLists
                    });
                    document.title = '发现';
                    _util2.default.sharePage();
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
                    var sliderLen = self.state.slider.length;
                    var imgItem = self.state.slider[0];
                    var listComponet = self.state.list.map(function (item) {
                        var html = void 0;
                        if (item.courseMode === 1) {
                            html = _react2.default.createElement(_index8.default, {
                                key: item.id,
                                data: item
                            });
                        } else {
                            html = _react2.default.createElement(_index10.default, {
                                discovery: true,
                                key: item.id,
                                data: item
                            });
                        }
                        return html;
                    });
                    var loadingPage = self.state.loadingPage;
                    return _react2.default.createElement('div', { className: loadingPage ? 'discovery-page loading-page' : 'discovery-page' }, _react2.default.createElement(_index2.default, { show: fromPage === 1 && loadingPage }), _react2.default.createElement('div', { className: loadingPage ? 'hide-page' : 'loaded-page' }, _react2.default.createElement(_index6.default, {
                        id: self.state.subjectId,
                        tab: self.state.tab,
                        callbackParent: self.changeTab
                    }), _react2.default.createElement('div', { className: sliderLen ? 'discovery-img' : 'discovery-img hide' }, sliderLen === 1 ? _react2.default.createElement(_index16.default, {
                        img: imgItem.coverUrl,
                        url: imgItem.clickUrl,
                        isTop: true
                    }) : _react2.default.createElement(_index18.default, { images: self.state.slider })), _react2.default.createElement('div', { className: 'discovery-class-list' }, listComponet), _react2.default.createElement('div', { className: 'no-more' }), _react2.default.createElement(_index4.default, {
                        noShow: loadingPage,
                        current: 'discovery'
                    }), _react2.default.createElement(_index12.default, {
                        isShowDialog: !loadingPage && self.state.showGiftDialog,
                        onClose: self.closeGiftDialog
                    })));
                }
            }
        ]);
        return discoveryContainer;
    }(_PageController3.default);
    ;
    exports.default = discoveryContainer;
});