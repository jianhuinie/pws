define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _CommonController2 = require('common/controller/CommonController');
    var _config = require('common/config');
    var _moment = require('moment');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _config2 = _interopRequireDefault(_config);
    var _moment2 = _interopRequireDefault(_moment);
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
    var CourseDatePicker = function (_CommonController) {
        _inherits(CourseDatePicker, _CommonController);
        function CourseDatePicker(props) {
            _classCallCheck(this, CourseDatePicker);
            var _this = _possibleConstructorReturn(this, (CourseDatePicker.__proto__ || Object.getPrototypeOf(CourseDatePicker)).call(this, props));
            _this.handleStartOpenChange = function (open) {
                if (!open) {
                    _this.setState({ endOpen: true });
                }
            };
            _this.handleEndOpenChange = function (open) {
                _this.setState({ endOpen: open });
            };
            _this.handleStartChange = function (date) {
                _this.setState({ startValue: date });
                _this.props.onStartChange(date.valueOf());
            };
            _this.handleEndChange = function (date) {
                _this.setState({ endValue: date });
                _this.props.onEndChange(date.valueOf());
            };
            _this.disabledStartDate = function (startValue) {
                var endValue = _this.state.endValue;
                if (!startValue) {
                    return false;
                }
                if (!endValue) {
                    var today = new Date(new Date().setHours(0, 0, 0, 0));
                    return startValue.valueOf() < today.valueOf();
                }
                return startValue.valueOf() > endValue.clone().add(1, 'd').valueOf();
            };
            _this.disabledSingleStartDate = function (value) {
                var today = new Date(new Date().setHours(0, 0, 0, 0));
                if (!value) {
                    return false;
                }
                return value.valueOf() < today.valueOf();
            };
            _this.disabledEndDate = function (endValue) {
                if (!endValue) {
                    return false;
                }
                var startValue = _this.state.startValue;
                if (!startValue) {
                    var today = new Date(new Date().setHours(0, 0, 0, 0));
                    return endValue.valueOf() < today.valueOf();
                }
                return endValue.valueOf() < startValue.clone().startOf('day').valueOf();
            };
            _this.state = {
                endOpen: false,
                startValue: props.defaultBegin ? (0, _moment2.default)(props.defaultBegin) : null,
                endValue: props.defaultEnd ? (0, _moment2.default)(props.defaultEnd) : null
            };
            return _this;
        }
        _createClass(CourseDatePicker, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var me = this;
                    if (nextProps.defaultBegin && nextProps.defaultBegin !== me.props.defaultBegin) {
                        me.setState({
                            startValue: (0, _moment2.default)(nextProps.defaultBegin),
                            endValue: (0, _moment2.default)(nextProps.defaultEnd)
                        });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _state = this.state, startValue = _state.startValue, endValue = _state.endValue, endOpen = _state.endOpen;
                    var falseFlag = false;
                    return this.props.isRange ? _react2.default.createElement('div', { className: 'course-date-picker' }, _react2.default.createElement(_antd.DatePicker, {
                        disabledDate: this.props.disabledDate || this.disabledStartDate,
                        format: _config2.default.MOMENT_DATE_FORMAT,
                        value: startValue,
                        showToday: false,
                        allowClear: false,
                        showTime: falseFlag,
                        placeholder: '请选择开始时间',
                        onChange: this.handleStartChange,
                        onOpenChange: this.handleStartOpenChange,
                        getCalendarContainer: function getCalendarContainer(triggerNode) {
                            return triggerNode.parentNode;
                        }
                    }), '至', _react2.default.createElement(_antd.DatePicker, {
                        disabledDate: this.disabledEndDate,
                        showTime: falseFlag,
                        format: _config2.default.MOMENT_DATE_FORMAT,
                        value: endValue,
                        showToday: false,
                        allowClear: false,
                        placeholder: '请选择结束时间',
                        onChange: this.handleEndChange,
                        open: endOpen,
                        onOpenChange: this.handleEndOpenChange,
                        getCalendarContainer: function getCalendarContainer(triggerNode) {
                            return triggerNode.parentNode;
                        }
                    })) : _react2.default.createElement('div', { className: 'course-date-picker course-date-picker-single' }, _react2.default.createElement(_antd.DatePicker, {
                        disabledDate: this.props.disabledDate || this.disabledSingleStartDate,
                        showTime: falseFlag,
                        format: _config2.default.MOMENT_DATE_FORMAT,
                        value: startValue,
                        showToday: false,
                        allowClear: false,
                        placeholder: '请选择开始时间',
                        onChange: this.handleStartChange,
                        getCalendarContainer: function getCalendarContainer(triggerNode) {
                            return triggerNode.parentNode;
                        }
                    }));
                }
            }
        ]);
        return CourseDatePicker;
    }(_CommonController3.default);
    CourseDatePicker.propTypes = {
        onChange: _react.PropTypes.func,
        defaultBegin: _react.PropTypes.number,
        defaultEnd: _react.PropTypes.number,
        isRange: _react.PropTypes.bool
    };
    exports.default = CourseDatePicker;
});