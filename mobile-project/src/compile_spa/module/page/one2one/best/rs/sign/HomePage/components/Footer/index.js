define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _config = require('../../../../config');
    var _index = require('../../../../../components/Button/index');
    var service = require('common/service');
    var urlUtil = require('util/url_v2');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _config2 = _interopRequireDefault(_config);
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
    var Header = function (_React$Component) {
        _inherits(Header, _React$Component);
        function Header(props) {
            _classCallCheck(this, Header);
            var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
            _this.signHandler = _this.signHandler.bind(_this);
            return _this;
        }
        _createClass(Header, [
            {
                key: 'signHandler',
                value: function signHandler() {
                    var me = this;
                    var subjectId = urlUtil.parseQuery(location.search).subject_id;
                    var data = {};
                    if (subjectId) {
                        data.subject_id = subjectId;
                    }
                    return service.post(_config2.default.PATHS.SIGN, data).then(function (res) {
                        if (res.code === 0) {
                            if (typeof me.props.callback === 'function') {
                                me.props.callback();
                            }
                        }
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(_index2.default, {
                        title: '同意并确认签约',
                        callback: this.signHandler,
                        containerClass: 'sign-home-footer'
                    });
                }
            }
        ]);
        return Header;
    }(_react2.default.Component);
    Header.propTypes = {
        title: _react.PropTypes.string,
        callback: _react.PropTypes.func
    };
    Header.defaultProps = {
        title: '同意并确认签约',
        callback: null
    };
    ;
    exports.default = Header;
});