define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _config = require('./config');
    var _reactRouter = require('react-router');
    var _index = require('compile_spa/module/page/one2one/best/components/OrderCard/index');
    var _index3 = require('compile_spa/module/page/one2one/best/components/RcmdCard/index');
    var _index5 = require('compile_spa/module/page/one2one/best/components/HotSubject/index');
    var _index7 = require('compile_spa/module/page/one2one/best/components/DemandForm/index');
    var _index9 = require('compile_spa/module/page/one2one/best/components/PromiseTerms/index');
    var _index11 = require('compile_spa/module/page/one2one/best/components/DetailFooter/index');
    var _index13 = require('compile_spa/module/page/one2one/best/components/TopBar/index');
    var _index15 = require('compile_spa/module/page/one2one/best/components/ItemCard/index');
    var _PageController2 = require('compile_spa/common/controller/PageController');
    var service = require('common/service');
    var lazyLoadImage = require('common/lazyLoadImage');
    var app = require('common/app');
    var user = require('common/user');
    var UTIL = require('common/util');
    var setShare = require('common/share/initialize');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _config2 = _interopRequireDefault(_config);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
    var _index12 = _interopRequireDefault(_index11);
    var _index14 = _interopRequireDefault(_index13);
    var _index16 = _interopRequireDefault(_index15);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var DetailContainer = function (_PageController) {
        _inherits(DetailContainer, _PageController);
        function DetailContainer(props) {
            _classCallCheck(this, DetailContainer);
            var _this = _possibleConstructorReturn(this, (DetailContainer.__proto__ || Object.getPrototypeOf(DetailContainer)).call(this, props));
            var isShow = 1;
            if (app.isStudentApp()) {
                isShow = 0;
            }
            _this.state = {
                banner: [],
                hotClassify: [],
                recommendTeacher: [],
                order: [],
                bossRcmd: [],
                cityName: UTIL.getHashParams().cityName || '北京',
                isShow: isShow,
                detailData: {}
            };
            _this.viewMore = _this.viewMore.bind(_this);
            return _this;
        }
        _createClass(DetailContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    service.post(_config2.default.PATHS.DETAIL, {}).then(function (res) {
                        if (+res.code === 0) {
                            self.setState({
                                banner: res.data.banner,
                                hotClassify: res.data.hot_classify,
                                recommendTeacher: res.data.recommend_teacher,
                                order: res.data.card.boss_order,
                                bossRcmd: res.data.card.boss_teacher,
                                detailData: res.data
                            });
                        }
                    });
                    user.loginOut();
                    setShare({
                        title: '跟谁学\u300E优选1对1\u300F - 名师个性化辅导',
                        content: '400+城市覆盖\uFF0C8000万家长信赖\u3002全国优选老师\uFF0C个性化学习方案\uFF0C全程助教服务\uFF0C带给你最好的学习体验\u3002',
                        img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
                        url: location.origin + '/webapp/#/one2one/best/se/detail'
                    });
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    lazyLoadImage.init();
                    window.onpageshow = function (event) {
                        if (event.persisted) {
                            window.location.reload();
                        }
                    };
                }
            },
            {
                key: 'viewMore',
                value: function viewMore() {
                    _reactRouter.hashHistory.push('one2one/best/se/subject');
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    app.setPageTitle('跟谁学优选1对1');
                    var orderComponet = this.state.order.map(function (item) {
                        return _react2.default.createElement(_index2.default, {
                            key: item.purchase_id,
                            item: item
                        });
                    });
                    var listComponet = this.state.recommendTeacher.map(function (item) {
                        return _react2.default.createElement(_index16.default, {
                            key: item.number,
                            item: item
                        });
                    });
                    var bossRcmdComponet = this.state.bossRcmd.map(function (item) {
                        return _react2.default.createElement(_index4.default, {
                            key: item.detail_url,
                            item: item
                        });
                    });
                    return _react2.default.createElement('div', { className: 'one2one-detail' }, _react2.default.createElement(_index14.default, {
                        cityName: self.state.cityName,
                        isShow: self.state.isShow
                    }), _react2.default.createElement('div', { className: self.state.isShow ? 'card-list hava-top-bar' : 'card-list' }, orderComponet, bossRcmdComponet), _react2.default.createElement('div', { className: 'top-banner' }, _react2.default.createElement('img', { 'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/06/59391413dca95.png' })), _react2.default.createElement('div', { className: 'demand-form' }, _react2.default.createElement('div', { className: 'demand-form-title first-title' }, '预约名师试听课'), _react2.default.createElement(_index8.default, null)), _react2.default.createElement('div', { className: 'hot-classify' }, _react2.default.createElement('div', { className: 'hot-classify-title first-title' }, '热门分类'), _react2.default.createElement(_index6.default, { hotClassify: this.state.hotClassify })), _react2.default.createElement('div', { className: 'rcmd-teacher' }, _react2.default.createElement('div', { className: 'rcmd-teacher-title first-title' }, '名师推荐'), listComponet, _react2.default.createElement('div', {
                        className: 'more-teacher',
                        onClick: self.viewMore
                    }, '更多老师', _react2.default.createElement('span', { className: 'icon-chevron-thin-right' }))), _react2.default.createElement('div', { className: 'our-promise' }, _react2.default.createElement('div', { className: 'our-promise-title first-title' }, '我们的承诺'), _react2.default.createElement(_index10.default, null)), _react2.default.createElement(_index12.default, { detail: this.state.detailData }), _react2.default.createElement('div', { className: 'qr-code' }, _react2.default.createElement('div', { className: 'img left' }, _react2.default.createElement('img', { 'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/5927c9af6f91f.png' })), _react2.default.createElement('div', { className: 'img right' }, _react2.default.createElement('img', { 'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/5927c9ae1e8fc.png' })), _react2.default.createElement('div', { className: 'clear' })));
                }
            }
        ]);
        return DetailContainer;
    }(_PageController3.default);
    ;
    exports.default = DetailContainer;
});