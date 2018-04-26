define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var $ = require('zepto');
    var initStars = require('common/comment/initStars');
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
    var Stars = function (_React$Component) {
        _inherits(Stars, _React$Component);
        function Stars(props) {
            _classCallCheck(this, Stars);
            var _this = _possibleConstructorReturn(this, (Stars.__proto__ || Object.getPrototypeOf(Stars)).call(this, props));
            _this.getStars = _this.getStars.bind(_this);
            return _this;
        }
        _createClass(Stars, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.getStars();
                }
            },
            {
                key: 'getStars',
                value: function getStars() {
                    var scoreSpan = $('.score-span');
                    scoreSpan.each(function () {
                        var that = $(this);
                        initStars.initStars(that);
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('span', {
                        className: 'score-span',
                        'data-scores': this.props.number
                    });
                }
            }
        ]);
        return Stars;
    }(_react2.default.Component);
    Stars.propTypes = { number: _react.PropTypes.number.isRequired };
    exports.default = Stars;
});