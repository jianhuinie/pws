define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    var _eventProxy = require('common/eventProxy');
    var _wxContext = require('common/util/wxContext');
    var _util = require('common/util/util');
    var _ui = require('gsx-design/component/ui');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _eventProxy2 = _interopRequireDefault(_eventProxy);
    var _wxContext2 = _interopRequireDefault(_wxContext);
    var _util2 = _interopRequireDefault(_util);
    var _ui2 = _interopRequireDefault(_ui);
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
    var info = {};
    var purchaseFlag = !0;
    var classId = void 0;
    var PurchaseBtn = function (_PageController) {
        _inherits(PurchaseBtn, _PageController);
        function PurchaseBtn(props) {
            _classCallCheck(this, PurchaseBtn);
            var _this = _possibleConstructorReturn(this, (PurchaseBtn.__proto__ || Object.getPrototypeOf(PurchaseBtn)).call(this, props));
            _this.getQrcodeImg = function () {
                var self = _this;
                var params = {
                    classId: classId,
                    courseId: info.id,
                    courseMode: info.courseMode,
                    followType: 3
                };
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.GET_QRCODE, params).then(function (res) {
                    if (res && res.code === 200) {
                        var publicQrcodeUrl = res.data.qrcodeUrl;
                        self.setState({ publicQrcodeUrl: publicQrcodeUrl });
                    }
                });
            };
            _this.getLive = function () {
                var params = { courseId: info.id };
                var liveUrl = _ajaxConfig2.default.GET_LIVE_URL;
                _ajaxService2.default.get(liveUrl, params).then(function (res) {
                    if (res && res.code === 200) {
                        var url = res.data.murl;
                        location.href = url;
                    }
                });
            };
            _this.opt = function () {
                var self = _this;
                var unactiveBtn = self.unactiveBtn();
                if (self.state.hasEnroll) {
                    return;
                }
                if (unactiveBtn) {
                    return;
                }
                var params = {
                    courseId: info.id,
                    courseMode: info.courseMode
                };
                var seriesParams = {};
                if (info.seriesCourse) {
                    seriesParams = {
                        courseId: info.seriesCourse.id,
                        courseMode: info.seriesCourse.courseMode
                    };
                }
                if (info.courseMode === 1) {
                    if (info.havePermission) {
                        if (info.courseType === 1) {
                            self.getLive();
                        } else {
                            self.props.callbackParent();
                        }
                    } else if (!info.canSellAlone) {
                        if (info.seriesCourse && info.seriesCourse.price) {
                            self.getPayInfo(seriesParams);
                        } else {
                            self.enroll(seriesParams);
                        }
                    } else if (!info.price) {
                        self.enroll(params);
                    } else if (info.seriesCourse && info.seriesCourse.price) {
                        self.showTwoBtn();
                    } else {
                        self.getPayInfo(params);
                    }
                } else if (info.courseMode === 2) {
                    if (info.havePermission) {
                        self.props.callbackParent(2);
                        var showBtn = false;
                        self.setState({ showBtn: showBtn });
                    } else if (info.price) {
                        self.getPayInfo(params);
                    } else {
                        self.enroll(params);
                    }
                }
            };
            _this.enroll = function (params) {
                var self = _this;
                if (purchaseFlag) {
                    purchaseFlag = !1;
                    _ajaxService2.default.post(_ajaxConfig2.default.COURSE.COURSE_ENROLL, params).then(function (res) {
                        purchaseFlag = !0;
                        if (res && res.code === 200) {
                            var hasEnroll = !0;
                            self.setState({ hasEnroll: hasEnroll });
                            if (info.haveFollow) {
                                self.afterEnroll();
                            } else {
                                _ui2.default.alert({ content: '<img src="' + self.state.publicQrcodeUrl + '">' }).then(function () {
                                    self.afterEnroll();
                                });
                            }
                        }
                    });
                }
            };
            _this.afterEnroll = function () {
                var self = _this;
                if (info.courseMode === 2) {
                    self.props.callbackParent(2);
                    var showBtn = false;
                    self.setState({ showBtn: showBtn });
                } else if (info.courseType === 2) {
                    self.props.callbackParent();
                } else if (info.canSignIn) {
                    self.getLive();
                } else {
                    var btnText = '已预约\uFF08开课前1小时可进入\uFF09';
                    if (info.liveStatus === 3) {
                        btnText = '回放生成中';
                    }
                    self.setState({ btnText: btnText });
                    var playText = info.liveStatus === 3 ? '回放生成中' : '已预约';
                    _eventProxy2.default.trigger('modifyBtnText', playText);
                }
            };
            _this.getPayInfo = function (params) {
                var self = _this;
                if (purchaseFlag) {
                    purchaseFlag = !1;
                    new _wxContext2.default().wxPay(_ajaxConfig2.default.COURSE.GET_PAY_INFO, params, function () {
                        purchaseFlag = !0;
                        var str = '/mweb/paySuccess?id=' + params.courseId + '&mode=' + params.courseMode;
                        if (!info.haveFollow) {
                            str += '&classId=' + classId;
                        }
                        location.href = str;
                    }, function () {
                        purchaseFlag = !0;
                    });
                }
            };
            _this.purchaseSingle = function (e) {
                e.stopPropagation();
                var self = _this;
                var params = {
                    courseId: info.id,
                    courseMode: info.courseMode
                };
                self.getPayInfo(params);
            };
            _this.purchaseSeries = function (e) {
                e.stopPropagation();
                var self = _this;
                var params = {
                    courseId: info.seriesCourse.id,
                    courseMode: info.seriesCourse.courseMode
                };
                self.getPayInfo(params);
            };
            _this.hasShowTwoBtn = function () {
                return info.canSellAlone && info.price && info.seriesCourse && info.seriesCourse.price;
            };
            _this.cancel = function (e) {
                e.stopPropagation();
                var self = _this;
                var isShowTwoBtn = !1;
                self.setState({ isShowTwoBtn: isShowTwoBtn });
            };
            _this.showTwoBtn = function () {
                var self = _this;
                var isShowTwoBtn = !0;
                self.setState({ isShowTwoBtn: isShowTwoBtn });
            };
            _this.unactiveBtn = function () {
                var self = _this;
                return info.courseMode === 1 && info.courseType === 1 && !info.canSignIn && (info.havePermission || self.state.hasEnroll);
            };
            _this.state = {
                isShowTwoBtn: !1,
                publicQrcodeUrl: '',
                btnText: '',
                hasEnroll: !1,
                showBtn: true,
                landscape: false
            };
            return _this;
        }
        _createClass(PurchaseBtn, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    _eventProxy2.default.on('SingleOpt', function () {
                        self.opt();
                    });
                    window.addEventListener('orientationchange', function () {
                        var orientation = window.orientation;
                        var landscape = void 0;
                        if (orientation === 90 || orientation === -90) {
                            landscape = true;
                        } else {
                            landscape = false;
                        }
                        self.setState({ landscape: landscape });
                    }, false);
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var self = this;
                    var preData = self.props.data;
                    var nextData = nextProps.data;
                    if (preData.id !== nextData.id) {
                        info = nextData;
                        var btnText = _util2.default.getPurchaseText(info);
                        self.setState({ btnText: btnText });
                    }
                    if (!classId && nextProps.classId) {
                        classId = nextProps.classId;
                        self.getQrcodeImg();
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var hasShowTwoBtn = self.hasShowTwoBtn();
                    var unactiveBtn = self.unactiveBtn();
                    var clsName = '';
                    if (self.state.landscape) {
                        clsName = 'purchase-btn-page hide';
                    } else if (self.state.showBtn) {
                        if (unactiveBtn) {
                            clsName = 'purchase-btn-page purchase-btn-page-gray';
                        } else {
                            clsName = 'purchase-btn-page';
                        }
                    } else {
                        clsName = 'purchase-btn-page hide';
                    }
                    var singleText = '';
                    var seriesText = '';
                    if (hasShowTwoBtn) {
                        singleText = '购买当前课\xA5' + info.price.toFixed(2);
                        seriesText = '购买系列课\xA5' + info.seriesCourse.price.toFixed(2);
                    }
                    return _react2.default.createElement('div', {
                        className: clsName,
                        onClick: self.opt
                    }, self.state.btnText, _react2.default.createElement('div', { className: self.state.isShowTwoBtn && hasShowTwoBtn ? 'purchase-choose' : 'purchase-choose hide' }, _react2.default.createElement('div', {
                        className: 'purchase-choose-item purchase-choose-single',
                        onClick: self.purchaseSingle
                    }, singleText), _react2.default.createElement('div', {
                        className: 'purchase-choose-item',
                        onClick: self.purchaseSeries
                    }, seriesText), _react2.default.createElement('div', {
                        className: 'purchase-choose-item purchase-choose-cancel',
                        onClick: self.cancel
                    }, '取消')));
                }
            }
        ]);
        return PurchaseBtn;
    }(_PageController3.default);
    ;
    exports.default = PurchaseBtn;
});