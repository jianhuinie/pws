define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _index = require('./ListItem/index');
    var _index3 = require('module/components/GiftDialog/index');
    var _index5 = require('module/components/GuideDialog/index');
    var _index7 = require('module/components/Operation/index');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
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
    var Center = function (_PageController) {
        _inherits(Center, _PageController);
        function Center(props) {
            _classCallCheck(this, Center);
            var _this = _possibleConstructorReturn(this, (Center.__proto__ || Object.getPrototypeOf(Center)).call(this, props));
            _this.state = { courses: [] };
            return _this;
        }
        _createClass(Center, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;
                    document.title = '新人礼包';
                    _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_GIFT_COURSES).then(function (res) {
                        _this2.setState({ courses: res.data.courses });
                    });
                    _util2.default.sharePage();
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'gift-detail' }, _react2.default.createElement('img', {
                        className: 'gift-detail-logo',
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4ee43d05d6f.png'
                    }), _react2.default.createElement('div', { className: 'gift-detail-desc' }, '可在\u3010首页\u3011-\u3010我的课程\u3011中查看'), _react2.default.createElement('a', { href: '/mweb/student/course' }, _react2.default.createElement('button', { className: 'ws-btn-red gift-detail-button' }, '马上学习')), _react2.default.createElement('div', { className: 'gift-detail-title' }, '礼包课详情'), _react2.default.createElement('ul', { className: 'gift-detail-content' }, this.state.courses.map(function (course) {
                        return _react2.default.createElement('li', { key: course.id + course.courseMode }, _react2.default.createElement(_index2.default, course));
                    })));
                }
            }
        ]);
        return Center;
    }(_PageController3.default);
    exports.default = Center;
    ;
});