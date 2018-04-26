define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('module/components/Empty/index');
    var _imgConfig = require('common/imgConfig');
    var _index3 = require('./components/RecordItem/index');
    var _index5 = require('gsx-design/component/DropLoad/index');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _imgConfig2 = _interopRequireDefault(_imgConfig);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
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
            _this.getPurchaseRecord = function () {
                var me = _this;
                var pageNum = _this.state.pageNum;
                return _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_PURCHASE_RECORD, { pageNum: pageNum }).then(function (res) {
                    var courses = res.data.courses;
                    var noMore = courses.length < 10;
                    var isShowNoMore = pageNum > 1 && noMore;
                    if (noMore) {
                        me.dropLoad.dispose();
                        me.dropLoad = null;
                    }
                    _this.setState({
                        loading: false,
                        pageNum: ++pageNum,
                        isShowNoMore: isShowNoMore,
                        courses: _this.state.courses.concat(courses)
                    });
                });
            };
            _this.state = {
                courses: [],
                isShowDialog: false,
                isShowNoMore: false,
                pageNum: 1,
                loading: true
            };
            return _this;
        }
        _createClass(Follow, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var me = this;
                    document.title = '购买记录';
                    this.getPurchaseRecord();
                    this.dropLoad = new _index6.default({
                        element: $('.purchase-record-list'),
                        callback: me.getPurchaseRecord
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
                key: 'render',
                value: function render() {
                    if (!this.state.loading && !this.state.courses.length) {
                        return _react2.default.createElement(_index2.default, {
                            image: _imgConfig2.default.EMPTY.PURCHASE_RECORD,
                            emptyText: '你还没有购买课程哦',
                            buttonText: '马上选课',
                            redirect: '/mweb/discovery'
                        });
                    }
                    return _react2.default.createElement('div', { className: 'purchase-record' }, _react2.default.createElement('ul', { className: 'purchase-record-list' }, this.state.courses.map(function (course) {
                        return _react2.default.createElement('li', {
                            key: course.id + course.courseMode,
                            className: 'purchase-record-list-item'
                        }, _react2.default.createElement(_index4.default, course));
                    })), this.state.isShowNoMore ? _react2.default.createElement('div', { className: 'no-more' }, '没有更多内容了') : null);
                }
            }
        ]);
        return Follow;
    }(_PageController3.default);
    exports.default = Follow;
    ;
});