define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
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
    var CourseTab = function (_PageController) {
        _inherits(CourseTab, _PageController);
        function CourseTab(props) {
            _classCallCheck(this, CourseTab);
            var _this = _possibleConstructorReturn(this, (CourseTab.__proto__ || Object.getPrototypeOf(CourseTab)).call(this, props));
            _this.clickTab = function (e) {
                var self = _this;
                var ele = $(e.target);
                if (ele.hasClass('tab-name') && !ele.hasClass('active')) {
                    self.props.callbackParent(ele.data('index'));
                }
            };
            _this.state = {};
            return _this;
        }
        _createClass(CourseTab, [{
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', {
                        className: 'course-tab',
                        onClick: self.clickTab
                    }, _react2.default.createElement('div', { className: 'course-tab-item' }, _react2.default.createElement('span', {
                        'data-index': '1',
                        className: self.props.tab === 1 ? 'tab-name active' : 'tab-name'
                    }, '课程详情')), _react2.default.createElement('div', { className: 'course-tab-item' }, _react2.default.createElement('span', {
                        'data-index': '2',
                        className: self.props.tab === 2 ? 'tab-name active' : 'tab-name'
                    }, '目录')));
                }
            }]);
        return CourseTab;
    }(_PageController3.default);
    ;
    exports.default = CourseTab;
});