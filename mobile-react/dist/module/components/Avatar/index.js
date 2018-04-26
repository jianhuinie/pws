define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _CommonController2 = require('common/controller/CommonController');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
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
    var Avatar = function (_CommonController) {
        _inherits(Avatar, _CommonController);
        function Avatar() {
            _classCallCheck(this, Avatar);
            return _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).apply(this, arguments));
        }
        _createClass(Avatar, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'avatar-container ' + this.props.className }, _react2.default.createElement('img', {
                        src: this.props.src,
                        className: 'avatar-container-big'
                    }), this.props.isV ? _react2.default.createElement('img', {
                        className: 'avatar-container-v',
                        src: this.props.srcV
                    }) : null);
                }
            }]);
        return Avatar;
    }(_CommonController3.default);
    Avatar.propTypes = {
        isV: _react.PropTypes.bool,
        src: _react.PropTypes.string.isRequired,
        srcV: _react.PropTypes.string,
        className: _react.PropTypes.string
    };
    Avatar.defaultProps = {
        isV: false,
        srcV: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4af22893683.png',
        className: ''
    };
    exports.default = Avatar;
});