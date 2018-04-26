define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _swiper = require('swiper');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _swiper2 = _interopRequireDefault(_swiper);
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
    var SubjectTab = function (_PageController) {
        _inherits(SubjectTab, _PageController);
        function SubjectTab(props) {
            _classCallCheck(this, SubjectTab);
            var _this = _possibleConstructorReturn(this, (SubjectTab.__proto__ || Object.getPrototypeOf(SubjectTab)).call(this, props));
            _this.changeTab = function (e) {
                var self = _this;
                var id = $(e.target).data('id');
                if (id && id !== self.props.id) {
                    self.props.callbackParent(id);
                }
            };
            _this.swiperFunc = function () {
                var swiper = new _swiper2.default('.subject-container', {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    freeMode: true
                });
            };
            _this.state = {};
            return _this;
        }
        _createClass(SubjectTab, [
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    var self = this;
                    self.swiperFunc();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var listComponet = self.props.tab.map(function (item) {
                        var html = _react2.default.createElement('span', {
                            className: 'good-course-second-nav-item swiper-slide ' + (item.id === self.props.id && 'on'),
                            'data-id': item.id,
                            'data-name': item.name,
                            key: item.id
                        }, item.name);
                        return html;
                    });
                    return _react2.default.createElement('div', { className: 'subject-tab' }, _react2.default.createElement('div', { className: 'subject-container good-course-swiper-container' }, _react2.default.createElement('div', {
                        className: 'good-course-second-nav swiper-wrapper',
                        onClick: self.changeTab
                    }, listComponet)));
                }
            }
        ]);
        return SubjectTab;
    }(_PageController3.default);
    ;
    exports.default = SubjectTab;
});