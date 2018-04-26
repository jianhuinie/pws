define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
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
    var GSXDesignDemo = function (_React$Component) {
        _inherits(GSXDesignDemo, _React$Component);
        function GSXDesignDemo() {
            _classCallCheck(this, GSXDesignDemo);
            return _possibleConstructorReturn(this, (GSXDesignDemo.__proto__ || Object.getPrototypeOf(GSXDesignDemo)).apply(this, arguments));
        }
        _createClass(GSXDesignDemo, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', null, _react2.default.createElement('h3', null, 'gsx-design-m示例\uFF1A'), _react2.default.createElement('ul', { role: 'nav' }, _react2.default.createElement('li', null, _react2.default.createElement(_reactRouter.Link, { to: '/demo/gsx-design/alert' }, 'alert')), _react2.default.createElement('li', null, _react2.default.createElement(_reactRouter.Link, { to: '/demo/gsx-design/Loading' }, 'Loading')), _react2.default.createElement('li', null, _react2.default.createElement(_reactRouter.Link, { to: '/demo/gsx-design/confirm' }, 'confirm')), _react2.default.createElement('li', null, _react2.default.createElement(_reactRouter.Link, { to: '/demo/gsx-design/ImagePlayer' }, 'ImagePlayer')), _react2.default.createElement('li', null, _react2.default.createElement(_reactRouter.Link, { to: '/demo/gsx-design/SlideInDialog' }, 'SlideInDialog'))), this.props.children);
                }
            }]);
        return GSXDesignDemo;
    }(_react2.default.Component);
    GSXDesignDemo.propTypes = { children: _react2.default.PropTypes.element };
    GSXDesignDemo.defaultProps = { children: '' };
    ;
    exports.default = GSXDesignDemo;
});