define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('./CarouselCard/index');
    var _ajaxService = require('common/util/ajaxService');
    var _antd = require('antd');
    var _url = require('common/util/url');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _url2 = _interopRequireDefault(_url);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
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
    var params = (0, _url2.default)().params;
    var Carousel = function (_PageController) {
        _inherits(Carousel, _PageController);
        function Carousel(props) {
            _classCallCheck(this, Carousel);
            var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));
            _this.updateList = function (list) {
                return list.map(function (item, index) {
                    item.seq = index + 1;
                    return item;
                });
            };
            _this.handleChange = function (id, obj) {
                var list = _this.state.banners.slice(0);
                list.splice(id - 1, 1, obj);
                _this.setState({ banners: list });
            };
            _this.handleDeleteCardItem = function (id) {
                var list = _this.state.banners.slice(0);
                list.splice(id - 1, 1);
                _this.setState({ banners: _this.updateList(list) });
            };
            _this.canSave = function () {
                return _this.state.banners.every(function (item) {
                    return item.storageId !== undefined && item.courseType !== undefined && item.courseId !== undefined;
                });
            };
            _this.handleSubmitData = function () {
                var banners = _this.state.banners;
                banners.map(function (item) {
                    if (item.isNew) {
                        item.bannerId = 0;
                        delete item.isNew;
                    }
                    delete item.courseName;
                    delete item.url;
                    return item;
                });
                return { banners: banners };
            };
            _this.handleSubmit = function () {
                var submitData = _this.handleSubmitData();
                if (_this.canSave()) {
                    _ajaxService2.default.post('/pc/classroom/banner/save', Object.assign(submitData, { classroomId: Number(params.classroomId) })).then(function (res) {
                        if (res && res.code === 200) {
                            _antd.message.success('保存成功', 3);
                        }
                    });
                } else {
                    _antd.message.error('保存失败\uFF0C信息填写不完整', 3);
                }
            };
            _this.handleAddCardItem = function () {
                var list = _this.state.banners;
                var newItem = {
                    seq: list.length + 1,
                    bannerId: new Date().valueOf(),
                    isNew: true
                };
                _this.setState({ banners: list.concat([newItem]) });
            };
            _this.handleChangeSeq = function (sourceId, siblingId) {
                var list = _this.state.banners.slice(0);
                var item = list[sourceId - 1];
                if (siblingId) {
                    if (siblingId === sourceId) {
                        return;
                    }
                    if (sourceId > siblingId) {
                        list.splice(sourceId - 1, 1);
                        list.splice(siblingId - 1, 0, item);
                    } else {
                        list.splice(siblingId - 1, 0, item);
                        list.splice(sourceId - 1, 1);
                    }
                } else {
                    list.splice(sourceId - 1, 1);
                    list.push(item);
                }
                _this.setState({ banners: _this.updateList(list) });
            };
            _this.state = { banners: [] };
            return _this;
        }
        _createClass(Carousel, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    _ajaxService2.default.get('/pc/classroom/banner/list', { classroomId: Number(params.classroomId) }).then(function (res) {
                        var data = res.data;
                        _this2.setState(_extends({}, data));
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'course-carousel' }, _react2.default.createElement('div', { className: 'course-carousel-content' }, _react2.default.createElement('div', { className: 'course-carousel-content-image' }, _react2.default.createElement('img', {
                        alt: '轮播示意图',
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a8132f96c101.png'
                    })), _react2.default.createElement('div', { className: 'course-carousel-content-card' }, _react2.default.createElement(_index2.default, {
                        list: this.state.banners,
                        onChange: this.handleChange,
                        onDelete: this.handleDeleteCardItem,
                        onAdd: this.handleAddCardItem,
                        onChangeSeq: this.handleChangeSeq
                    }), _react2.default.createElement('div', { className: 'course-carousel-content-card-tip' }, _react2.default.createElement('p', null, '1. 添加课堂轮播图\uFF0C课堂主页头部将如左图所示'), _react2.default.createElement('p', null, '2. 使用课堂轮播图推广热门课程')))), _react2.default.createElement('div', { className: 'course-carousel-save-button' }, _react2.default.createElement(_antd.Button, {
                        className: 'pink-btn lg-btn classic-btn',
                        onClick: this.handleSubmit
                    }, '保存')));
                }
            }
        ]);
        return Carousel;
    }(_PageController3.default);
    exports.default = Carousel;
});