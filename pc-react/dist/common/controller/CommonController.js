define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _immutable = require('immutable');
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
    var CommonController = function (_React$Component) {
        _inherits(CommonController, _React$Component);
        function CommonController() {
            _classCallCheck(this, CommonController);
            return _possibleConstructorReturn(this, (CommonController.__proto__ || Object.getPrototypeOf(CommonController)).apply(this, arguments));
        }
        _createClass(CommonController, [{
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps, nextState) {
                    return !(this.props === nextProps || (0, _immutable.is)((0, _immutable.fromJS)(this.props), (0, _immutable.fromJS)(nextProps))) || !(this.state === nextState || (0, _immutable.is)((0, _immutable.fromJS)(this.state), (0, _immutable.fromJS)(nextState)));
                }
            }]);
        return CommonController;
    }(_react2.default.Component);
    exports.default = CommonController;
    ;
});