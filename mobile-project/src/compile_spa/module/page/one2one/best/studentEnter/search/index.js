define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _index = require('./components/Nav/index');
    var _index3 = require('./components/List/index');
    var _index5 = require('./components/HasMore/index');
    var _index7 = require('./components/Empty/index');
    var _PageController2 = require('compile_spa/common/controller/PageController');
    var $ = require('zepto');
    var UTIL = require('common/util');
    var service = require('common/service');
    var app = require('common/app');
    var Loading = require('common/ui/Loading/index');
    var setShare = require('common/share/initialize');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
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
    var _get = function get(object, property, receiver) {
        if (object === null)
            object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);
            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;
            if (getter === undefined) {
                return undefined;
            }
            return getter.call(receiver);
        }
    };
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
    var urlObj = void 0;
    var Search = function (_PageController) {
        _inherits(Search, _PageController);
        function Search(props) {
            _classCallCheck(this, Search);
            urlObj = UTIL.getHashParams();
            var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));
            _this.state = {
                course: {
                    list: [],
                    selected: [
                        0,
                        0,
                        0
                    ],
                    selected_name: ''
                },
                lessonWayArray: [],
                sortWayArray: [],
                lessonWay: '不限',
                sortWay: '智能排序',
                choose: {
                    sex: [],
                    school_age: [],
                    price_range: []
                },
                list: [],
                params: {
                    subject_id: +urlObj.subject_id || 100,
                    lng: urlObj.lng || null,
                    lat: urlObj.lat || null,
                    address: urlObj.addressName || null,
                    lesson_way: 0,
                    sort: 'all',
                    sex: 0,
                    school_age: 0,
                    price_range: 0
                },
                hasMore: 0,
                current_page: 2,
                ajaxFlag: true,
                showEmptyContentFlag: 0
            };
            _this.getList = _this.getList.bind(_this);
            _this.getChooseItemForList = _this.getChooseItemForList.bind(_this);
            _this.getMoreAjax = _this.getMoreAjax.bind(_this);
            document.title = '跟谁学优选1对1';
            return _this;
        }
        _createClass(Search, [
            {
                key: 'analysis',
                value: function analysis() {
                    this.pvOptions = { params: { subject_id: urlObj.subject_id } };
                    _get(Search.prototype.__proto__ || Object.getPrototypeOf(Search.prototype), 'analysis', this).call(this);
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    load = new Loading();
                    this.getList(this.state.params, 'reload');
                    setShare({
                        title: '跟谁学\u300E优选1对1\u300F - 名师个性化辅导',
                        content: '400+城市覆盖\uFF0C8000万家长信赖\u3002全国优选老师\uFF0C个性化学习方案\uFF0C全程助教服务\uFF0C带给你最好的学习体验\u3002',
                        img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
                        url: location.origin + '/webapp/#/one2one/best/se/detail'
                    });
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps() {
                    var self = this;
                    var stateObj = self.state;
                    stateObj.params = {
                        subject_id: +urlObj.subject_id || 100,
                        lng: urlObj.lng || null,
                        lat: urlObj.lat || null,
                        address: urlObj.address || null,
                        lesson_way: 0,
                        sort: 'all',
                        sex: 0,
                        school_age: 0,
                        price_range: 0
                    };
                    self.setState(stateObj);
                    self.getList(self.state.params, 'reload');
                }
            },
            {
                key: 'getList',
                value: function getList(objects, type) {
                    var _this2 = this;
                    var objectParams = objects || {};
                    if (ajaxFlag) {
                        ajaxFlag = false;
                        if (type === 'reload') {
                            load.show();
                        }
                        service.post('/preferredOneOnOne/search', objectParams).then(function (res) {
                            if (+res.code === 0) {
                                var data = res.data;
                                var filter = data.filter;
                                var emptyContentFlag = 0;
                                var list = [];
                                var self = _this2;
                                if (type === 'reload') {
                                    list = data.teacher_list;
                                    if (list.length === 0) {
                                        emptyContentFlag = 1;
                                    } else {
                                        emptyContentFlag = 0;
                                    }
                                } else {
                                    Array.prototype.push.apply(self.state.list, data.teacher_list);
                                    list = self.state.list;
                                    emptyContentFlag = 0;
                                }
                                var lessonWayArray = filter.lesson_way;
                                var sortWayArray = filter.sort;
                                var approachObject = filter.approach;
                                var courseObject = filter.course;
                                var condition = data.condition;
                                var lessonWayName = lessonWayArray.filter(function (item) {
                                    if (item.value === +condition.lesson_way) {
                                        return item;
                                    }
                                });
                                self.setState({
                                    lessonWayArray: lessonWayArray,
                                    sortWayArray: sortWayArray,
                                    choose: approachObject,
                                    course: courseObject,
                                    list: list,
                                    lessonWay: lessonWayName[0].name,
                                    hasMore: data.has_more,
                                    current_page: +data.next_cursor - 1,
                                    params: condition,
                                    showEmptyContentFlag: emptyContentFlag
                                });
                                sortWayArray.forEach(function (item) {
                                    if (item.selected) {
                                        self.setState({ sortWay: item.name });
                                    }
                                });
                                ajaxFlag = true;
                                if (type === 'reload') {
                                    load.hide();
                                    $(window).scrollTop(0);
                                }
                            }
                        }, function () {
                            if (type === 'reload') {
                                load.hide();
                            }
                        });
                    }
                }
            },
            {
                key: 'getChooseItemForList',
                value: function getChooseItemForList(objects) {
                    var object = objects;
                    var newSubject = { subject_id: objects.subject_id };
                    $.extend(true, urlObj, newSubject);
                    var hashValue = 'one2one/best/se/search?';
                    $.each(urlObj, function (key, value) {
                        hashValue += key + '=' + value + '&';
                    });
                    var len = hashValue.length;
                    if (hashValue[len - 1] === '&') {
                        hashValue = hashValue.substr(0, len - 1);
                    }
                    console.log(hashValue);
                    $.extend(true, object, urlObj);
                    _reactRouter.hashHistory.push(hashValue);
                    object.current_page = 1;
                    this.getList(object, 'reload');
                }
            },
            {
                key: 'getMoreAjax',
                value: function getMoreAjax(objects) {
                    var object = this.state.params;
                    object.current_page = objects.current_page;
                    this.getList(object, 'reload-more');
                }
            },
            {
                key: 'render',
                value: function render() {
                    app.setPageTitle('跟谁学优选1对1');
                    return _react2.default.createElement('div', { className: 'home' }, _react2.default.createElement(_index2.default, {
                        lessonWayName: this.state.lessonWay,
                        sortWayName: this.state.sortWay,
                        lessonWayArray: this.state.lessonWayArray,
                        sortWayArray: this.state.sortWayArray,
                        chooseObject: this.state.choose,
                        courseObject: this.state.course,
                        callback: this.getChooseItemForList,
                        params: this.state.params
                    }), _react2.default.createElement(_index4.default, { list: this.state.list }), _react2.default.createElement(_index6.default, {
                        hasMore: this.state.hasMore,
                        page: this.state.current_page,
                        callback: this.getMoreAjax
                    }), _react2.default.createElement(_index8.default, {
                        flag: this.state.showEmptyContentFlag,
                        page: this.state.current_page
                    }));
                }
            }
        ]);
        return Search;
    }(_PageController3.default);
    exports.default = Search;
    ;
});