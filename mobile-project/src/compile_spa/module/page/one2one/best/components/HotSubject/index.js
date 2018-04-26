define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
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
    var HotSubject = function (_React$Component) {
        _inherits(HotSubject, _React$Component);
        function HotSubject(props) {
            _classCallCheck(this, HotSubject);
            var _this = _possibleConstructorReturn(this, (HotSubject.__proto__ || Object.getPrototypeOf(HotSubject)).call(this, props));
            _this.clickHandler = _this.clickHandler.bind(_this);
            return _this;
        }
        _createClass(HotSubject, [
            {
                key: 'clickHandler',
                value: function clickHandler(value) {
                    if (value && value.id) {
                        if (value.child && value.child.length) {
                            sessionStorage.setItem('scdSubject', JSON.stringify(value.child));
                            _reactRouter.hashHistory.push('one2one/best/se/scdSubject');
                        } else {
                            _reactRouter.hashHistory.push('one2one/best/se/search?subject_id=' + value.id);
                        }
                    } else {
                        _reactRouter.hashHistory.push('one2one/best/se/subject');
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var dataList = self.props.hotClassify;
                    var subjectComponents = dataList.map(function (value, key) {
                        return _react2.default.createElement('span', {
                            className: key < 4 ? 'subject-item orange' : 'subject-item',
                            key: value.name,
                            onClick: self.clickHandler.bind(self, value)
                        }, value.name);
                    });
                    return _react2.default.createElement('div', { className: 'subject_group clearfix' }, subjectComponents);
                }
            }
        ]);
        return HotSubject;
    }(_react2.default.Component);
    ;
    exports.default = HotSubject;
});