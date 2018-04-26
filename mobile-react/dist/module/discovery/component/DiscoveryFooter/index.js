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
    var taps = [
        {
            key: 'discovery',
            redirect: '/mweb/discovery',
            text: '发现',
            icon: 'icon-discovery',
            activeIcon: 'icon-discovery-active'
        },
        {
            key: 'course',
            redirect: '/mweb/student/course',
            text: '我的课程',
            icon: 'icon-course',
            activeIcon: 'icon-course-active'
        },
        {
            key: 'home',
            redirect: '/mweb/student/home',
            text: '个人中心',
            icon: 'icon-person-center',
            activeIcon: 'icon-person-center-active'
        }
    ];
    var DiscoveryFooter = function (_PageController) {
        _inherits(DiscoveryFooter, _PageController);
        function DiscoveryFooter(props) {
            _classCallCheck(this, DiscoveryFooter);
            var _this = _possibleConstructorReturn(this, (DiscoveryFooter.__proto__ || Object.getPrototypeOf(DiscoveryFooter)).call(this, props));
            _this.jumpTo = function (tab) {
                if (tab.key !== _this.state.current) {
                    location.href = tab.redirect + '?t=' + Number(new Date());
                }
            };
            _this.state = { current: props.current };
            return _this;
        }
        _createClass(DiscoveryFooter, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ current: nextProps.current });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var current = this.state.current;
                    return _react2.default.createElement('div', { className: self.props.noShow ? 'discovery-footer hide' : 'discovery-footer' }, taps.map(function (tab) {
                        var isCurrent = current === tab.key;
                        return _react2.default.createElement('div', {
                            key: tab.key,
                            className: 'footer-item ' + (isCurrent ? 'current' : ''),
                            onClick: function onClick() {
                                self.jumpTo(tab);
                            }
                        }, _react2.default.createElement('i', { className: 'footer-item-icon ' + (isCurrent ? tab.activeIcon : tab.icon) }), _react2.default.createElement('div', { className: 'title' }, tab.text));
                    }));
                }
            }
        ]);
        return DiscoveryFooter;
    }(_PageController3.default);
    DiscoveryFooter.propTypes = { current: _react.PropTypes.string.isRequired };
    ;
    exports.default = DiscoveryFooter;
});