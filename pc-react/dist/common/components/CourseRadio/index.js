define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
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
    var CourseRadio = function (_CommonController) {
        _inherits(CourseRadio, _CommonController);
        function CourseRadio(props) {
            _classCallCheck(this, CourseRadio);
            var _this = _possibleConstructorReturn(this, (CourseRadio.__proto__ || Object.getPrototypeOf(CourseRadio)).call(this, props));
            _this.handleChange = function (e) {
                _this.setState({ selectedId: e.target.value });
                _this.props.onChange(e.target.value);
            };
            _this.state = { selectedId: props.defaultCourseType };
            return _this;
        }
        _createClass(CourseRadio, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var me = this;
                    if (nextProps.defaultCourseType && nextProps.defaultCourseType !== me.props.defaultCourseType) {
                        me.setState({ selectedId: nextProps.defaultCourseType });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    var RadioButton = _antd.Radio.Button;
                    var RadioGroup = _antd.Radio.Group;
                    return _react2.default.createElement('div', { className: 'course-radio' }, _react2.default.createElement(RadioGroup, {
                        onChange: this.handleChange,
                        value: this.state.selectedId
                    }, this.props.options.map(function (item) {
                        return _react2.default.createElement('div', {
                            key: item.id,
                            className: 'course-radio-item'
                        }, _react2.default.createElement(RadioButton, { value: item.id }, item.name), _this2.state.selectedId === item.id ? _react2.default.createElement('span', { className: 'icon-type-select' }) : null);
                    })));
                }
            }
        ]);
        return CourseRadio;
    }(_CommonController3.default);
    exports.default = CourseRadio;
});