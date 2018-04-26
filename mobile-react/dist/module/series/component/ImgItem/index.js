define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('gsx-design/component/lazyLoadImage/index');
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
    var ImgItem = function (_PageController) {
        _inherits(ImgItem, _PageController);
        function ImgItem(props) {
            _classCallCheck(this, ImgItem);
            var _this = _possibleConstructorReturn(this, (ImgItem.__proto__ || Object.getPrototypeOf(ImgItem)).call(this, props));
            _this.jump = function (e) {
                var ele = $(e.target);
                var url = ele.data('url');
                if (url) {
                    location.href = url;
                }
            };
            _this.state = {};
            return _this;
        }
        _createClass(ImgItem, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    _index2.default.init();
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    _index2.default.init();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var clsName = void 0;
                    if (!self.props.img) {
                        clsName = 'hide';
                    } else if (self.props.isCourse) {
                        clsName = 'img-item course-detail-content-item';
                    } else {
                        clsName = 'img-item';
                    }
                    if (self.props.isTop) {
                        clsName += ' page-top-img';
                    }
                    return _react2.default.createElement('div', {
                        className: clsName,
                        onClick: self.jump
                    }, _react2.default.createElement('img', {
                        className: '',
                        'data-src': self.props.img,
                        'data-url': self.props.url
                    }));
                }
            }
        ]);
        return ImgItem;
    }(_PageController3.default);
    ;
    exports.default = ImgItem;
});