define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('compile_spa/module/activity/honorRank/component/ItemList/index');
    var _index3 = require('compile_spa/module/activity/honorRank/component/myCard/index');
    var _index5 = require('compile_spa/module/activity/honorRank/component/HasMore/index');
    var _PageController2 = require('compile_spa/common/controller/PageController');
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var app = require('common/app');
    var service = require('common/service');
    var Loading = require('common/ui/Loading/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
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
    var load = void 0;
    var ajaxFlag = true;
    var PopularContainer = function (_PageController) {
        _inherits(PopularContainer, _PageController);
        function PopularContainer(props) {
            _classCallCheck(this, PopularContainer);
            var _this = _possibleConstructorReturn(this, (PopularContainer.__proto__ || Object.getPrototypeOf(PopularContainer)).call(this, props));
            _this.state = {
                items: [],
                myItem: {},
                hasMore: 0,
                nextPage: 2
            };
            _this.getList = _this.getList.bind(_this);
            _this.getMoreList = _this.getMoreList.bind(_this);
            return _this;
        }
        _createClass(PopularContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    load = new Loading();
                    lazyLoadImage.init();
                    self.getList({}, 'reload');
                }
            },
            {
                key: 'getList',
                value: function getList() {
                    var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    var type = arguments[1];
                    var self = this;
                    if (ajaxFlag) {
                        ajaxFlag = false;
                        if (type === 'reload') {
                            load.show();
                        }
                        var params = {};
                        if (objects.page) {
                            params.page = objects.page;
                        }
                        service.get('/invite-card-activity/popular-lesson-rank', params).then(function (res) {
                            if (+res.code === 0) {
                                var data = res.data;
                                var list = [];
                                if (type === 'reload') {
                                    list = data.items;
                                } else {
                                    Array.prototype.push.apply(self.state.items, data.items);
                                    list = self.state.items;
                                }
                                var currentCourse = {};
                                currentCourse = data.current.course;
                                if (!currentCourse) {
                                    currentCourse = {};
                                }
                                var currentRank = {};
                                currentRank = data.current.rank;
                                if (!currentRank) {
                                    currentRank = {};
                                }
                                var pager = data.pager;
                                var myItem = {
                                    img: currentCourse.imgurl,
                                    name: currentCourse.name,
                                    order: currentRank.rank_order,
                                    invite_count: currentRank.invite_count
                                };
                                self.setState({
                                    items: list,
                                    myItem: myItem,
                                    hasMore: pager.has_more ? 1 : 0,
                                    nextPage: pager.next_page
                                });
                                var boxList = $('.popular-box');
                                if (type === 'reload') {
                                    var paddingBottom = window.innerHeight - boxList.height();
                                    if (paddingBottom > 0) {
                                        boxList.css({ 'padding-bottom': paddingBottom + 'px' });
                                    }
                                }
                                load.hide();
                            }
                            ajaxFlag = true;
                        });
                    }
                }
            },
            {
                key: 'getMoreList',
                value: function getMoreList(data) {
                    this.getList(data, 'loadMore');
                }
            },
            {
                key: 'render',
                value: function render() {
                    app.setPageTitle('人气好课榜');
                    var type = 'popular';
                    return _react2.default.createElement('div', { className: 'popular-box' }, _react2.default.createElement('img', {
                        className: 'title-avatar',
                        'data-src': 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590c10e2ef82a.png'
                    }), _react2.default.createElement(_index2.default, {
                        list: this.state.items,
                        type: type
                    }), _react2.default.createElement(_index6.default, {
                        hasMore: this.state.hasMore,
                        page: this.state.nextPage,
                        callback: this.getMoreList
                    }), _react2.default.createElement(_index4.default, {
                        item: this.state.myItem,
                        type: type,
                        key: type + this.state.myItem.order
                    }));
                }
            }
        ]);
        return PopularContainer;
    }(_PageController3.default);
    ;
    exports.default = PopularContainer;
});