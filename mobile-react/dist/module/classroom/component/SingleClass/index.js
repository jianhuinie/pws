define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('../SingleClassItem/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
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
    var SingleClass = function (_PageController) {
        _inherits(SingleClass, _PageController);
        function SingleClass(props) {
            _classCallCheck(this, SingleClass);
            var _this = _possibleConstructorReturn(this, (SingleClass.__proto__ || Object.getPrototypeOf(SingleClass)).call(this, props));
            _this.getMore = function () {
                var self = _this;
                self.props.callbackParent();
            };
            _this.state = {};
            return _this;
        }
        _createClass(SingleClass, [{
                key: 'render',
                value: function render() {
                    var self = this;
                    var len = self.props.num;
                    var listComponet = self.props.singleList.map(function (item) {
                        return _react2.default.createElement(_index2.default, {
                            key: item.id + item.courseMode,
                            data: item
                        });
                    });
                    return _react2.default.createElement('div', { className: len ? 'single-class class-area' : 'single-class hide' }, _react2.default.createElement('div', { className: 'class-title' }, '单次课 ( ' + len + ' )'), _react2.default.createElement('div', { className: 'class-list' }, listComponet), _react2.default.createElement('div', {
                        className: self.props.hasMore ? 'has-more' : 'has-more hide',
                        onClick: self.getMore
                    }, '查看更多'));
                }
            }]);
        return SingleClass;
    }(_PageController3.default);
    ;
    exports.default = SingleClass;
});