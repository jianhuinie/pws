define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var $ = require('zepto');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
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
    var loadinging = false;
    var HasMore = function (_React$Component) {
        _inherits(HasMore, _React$Component);
        function HasMore(props) {
            _classCallCheck(this, HasMore);
            var _this = _possibleConstructorReturn(this, (HasMore.__proto__ || Object.getPrototypeOf(HasMore)).call(this, props));
            _this.state = {
                hasMore: 0,
                page: _this.props.page,
                lastScrollHeight: 1000000000
            };
            return _this;
        }
        _createClass(HasMore, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var hasMore = $('.has-more');
                    var lastScrollHeight = hasMore.position().top;
                    if (+nextProps.hasMore === 0) {
                        lastScrollHeight = 1000000000;
                    }
                    this.setState({
                        hasMore: nextProps.hasMore,
                        page: nextProps.page,
                        lastScrollHeight: lastScrollHeight
                    });
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    var self = this;
                    var getList = function getList(obj) {
                        if (typeof self.props.callback === 'function') {
                            self.props.callback(obj);
                            loadinging = false;
                        }
                    };
                    var initDom = function initDom() {
                        if (window.scrollY + window.innerHeight >= self.state.lastScrollHeight - 20) {
                            loadinging = true;
                            getList({ current_page: self.state.page + 1 });
                        }
                    };
                    $(window).unbind('scroll', initDom);
                    $(window).on('scroll', initDom);
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: this.state.hasMore ? 'has-more' : 'has-more hide' }, _react2.default.createElement('div', { className: loadinging ? 'typing-loader loading' : 'typing-loader hide' }));
                }
            }
        ]);
        return HasMore;
    }(_react2.default.Component);
    HasMore.propTypes = {
        hasMore: _react.PropTypes.number.isRequired,
        page: _react.PropTypes.number.isRequired,
        callback: _react.PropTypes.func.isRequired
    };
    ;
    exports.default = HasMore;
});