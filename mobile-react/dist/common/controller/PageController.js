define(function (require, exports) {
    'use strict';
    var _CommonController2 = require('./CommonController');
    Object.defineProperty(exports, '__esModule', { value: true });
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
    var PageController = function (_CommonController) {
        _inherits(PageController, _CommonController);
        function PageController(props) {
            _classCallCheck(this, PageController);
            var _this = _possibleConstructorReturn(this, (PageController.__proto__ || Object.getPrototypeOf(PageController)).call(this, props));
            _this.analysis();
            return _this;
        }
        _createClass(PageController, [{
                key: 'analysis',
                value: function analysis() {
                }
            }]);
        return PageController;
    }(_CommonController3.default);
    exports.default = PageController;
    ;
});