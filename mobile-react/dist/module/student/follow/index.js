define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('module/components/Avatar/index');
    var _index3 = require('common/components/SlideInDialog/index');
    var _index5 = require('module/components/Empty/index');
    var _imgConfig = require('common/imgConfig');
    var _index7 = require('gsx-design/component/DropLoad/index');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _imgConfig2 = _interopRequireDefault(_imgConfig);
    var _index8 = _interopRequireDefault(_index7);
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
    var Follow = function (_PageController) {
        _inherits(Follow, _PageController);
        function Follow(props) {
            _classCallCheck(this, Follow);
            var _this = _possibleConstructorReturn(this, (Follow.__proto__ || Object.getPrototypeOf(Follow)).call(this, props));
            _this.getFollowClasses = function () {
                var me = _this;
                var pageNum = _this.state.pageNum;
                return _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_FOLLOWS_CLASSES, { pageNum: pageNum }).then(function (res) {
                    var classrooms = res.data.classrooms;
                    classrooms.forEach(function (item) {
                        item.followed = true;
                    });
                    var noMore = classrooms.length < 10;
                    var isShowNoMore = pageNum > 1 && noMore;
                    if (noMore) {
                        me.dropLoad.dispose();
                        me.dropLoad = null;
                    }
                    _this.setState({
                        loading: false,
                        pageNum: ++pageNum,
                        isShowNoMore: isShowNoMore,
                        classrooms: _this.state.classrooms.concat(classrooms)
                    });
                });
            };
            _this.handleClickCancel = function (e, classroom) {
                e.stopPropagation();
                _this.setState({
                    isShowDialog: true,
                    cancelClassroom: classroom
                });
            };
            _this.confirmCancel = function () {
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.FOLLOW, {
                    classId: _this.state.cancelClassroom.classId,
                    followStatus: 1
                }).then(function () {
                    _this.state.cancelClassroom.followed = false;
                    _this.setState({
                        isShowDialog: false,
                        classrooms: _this.state.classrooms
                    });
                });
            };
            _this.closeDialog = function () {
                _this.setState({
                    isShowDialog: false,
                    cancelClassroom: null
                });
            };
            _this.handleClickFollow = function (e, classroom) {
                e.stopPropagation();
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.FOLLOW, {
                    classId: classroom.classId,
                    followStatus: 0
                }).then(function () {
                    classroom.followed = true;
                    _this.setState({ classrooms: _this.state.classrooms });
                    _this.forceUpdate();
                });
            };
            _this.jump = function (info) {
                location.href = '/mweb/classroom?id=' + info.classId;
            };
            _this.state = {
                classrooms: [],
                isShowDialog: false,
                cancleClassroom: null,
                isShowNoMore: false,
                pageNum: 1,
                loading: true
            };
            _this._hackIos();
            return _this;
        }
        _createClass(Follow, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var me = this;
                    document.title = '我的关注';
                    this.getFollowClasses();
                    this.dropLoad = new _index8.default({
                        element: $('.student-follow-list'),
                        callback: me.getFollowClasses
                    });
                    _util2.default.sharePage();
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    if (this.dropLoad) {
                        this.dropLoad.dispose();
                        this.dropLoad = null;
                    }
                }
            },
            {
                key: '_hackIos',
                value: function _hackIos() {
                    window.onpageshow = function (event) {
                        if (event.persisted) {
                            window.location.reload();
                        }
                    };
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    if (!this.state.loading && !this.state.classrooms.length) {
                        return _react2.default.createElement(_index6.default, {
                            image: _imgConfig2.default.EMPTY.FOLLOW_CLASSROOM,
                            emptyText: '我关注的课堂空空如也~',
                            buttonText: '回首页看看',
                            redirect: '/mweb/discovery'
                        });
                    }
                    return _react2.default.createElement('div', { className: 'student-follow' }, _react2.default.createElement('ul', { className: 'student-follow-list' }, this.state.classrooms.map(function (classroom) {
                        return _react2.default.createElement('li', {
                            key: classroom.classId,
                            className: 'student-follow-list-item',
                            onClick: function onClick() {
                                _this2.jump(classroom);
                            }
                        }, _react2.default.createElement(_index2.default, { src: classroom.headUrl }), _react2.default.createElement('div', { className: 'student-follow-list-item-detail' }, _react2.default.createElement('div', { className: 'name' }, classroom.name), _react2.default.createElement('div', { className: 'desc' }, classroom.intro || '学会在学习中寻找乐趣\uFF0C学会乐在其中并保持热情\u3002')), _react2.default.createElement('div', { className: 'student-follow-list-item-state' }, classroom.followed ? _react2.default.createElement('div', {
                            className: 'student-follow-list-item-state-operate cancel',
                            onClick: function onClick(e) {
                                _this2.handleClickCancel(e, classroom);
                            }
                        }, '取消关注') : _react2.default.createElement('div', {
                            className: 'student-follow-list-item-state-operate',
                            onClick: function onClick(e) {
                                _this2.handleClickFollow(e, classroom);
                            }
                        }, '关注')));
                    })), this.state.isShowNoMore ? _react2.default.createElement('div', { className: 'no-more' }, '没有更多内容了') : null, _react2.default.createElement(_index4.default, {
                        onCloseHandler: this.closeDialog,
                        isShowDialog: this.state.isShowDialog
                    }, _react2.default.createElement('div', { className: 'student-follow-dlolag' }, _react2.default.createElement('div', {
                        onClick: this.confirmCancel,
                        className: 'student-follow-dlolag-confirm'
                    }, '取消关注'), _react2.default.createElement('div', {
                        onClick: this.closeDialog,
                        className: 'student-follow-dlolag-close'
                    }, '取消'))));
                }
            }
        ]);
        return Follow;
    }(_PageController3.default);
    exports.default = Follow;
    ;
});