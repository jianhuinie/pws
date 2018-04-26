define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var service = require('common/service');
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
    var AjaxDemo = function (_React$Component) {
        _inherits(AjaxDemo, _React$Component);
        function AjaxDemo(props) {
            _classCallCheck(this, AjaxDemo);
            var _this = _possibleConstructorReturn(this, (AjaxDemo.__proto__ || Object.getPrototypeOf(AjaxDemo)).call(this, props));
            _this.state = { childDom: _react2.default.createElement('span', null, 'hello') };
            return _this;
        }
        _createClass(AjaxDemo, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;
                    service.post('/area/list', {}).then(function (res) {
                        _this2.setState({ childDom: _react2.default.createElement('div', null, res.data[0].name) });
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', null, this.state.childDom);
                }
            }
        ]);
        return AjaxDemo;
    }(_react2.default.Component);
    exports.default = AjaxDemo;
    ;
});