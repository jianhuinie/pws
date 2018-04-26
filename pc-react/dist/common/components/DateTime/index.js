define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _moment = require('moment');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var DateTime = function (_PageController) {
        _inherits(DateTime, _PageController);
        function DateTime(props) {
            _classCallCheck(this, DateTime);
            var _this = _possibleConstructorReturn(this, (DateTime.__proto__ || Object.getPrototypeOf(DateTime)).call(this, props));
            _this.state = {};
            return _this;
        }
        _createClass(DateTime, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    console.log(self.props);
                    $('.form_datetime').datetimepicker({
                        language: 'zh-CN',
                        weekStart: 1,
                        todayBtn: 1,
                        autoclose: 1,
                        todayHighlight: 1,
                        startView: 2,
                        forceParse: 0,
                        showMeridian: 1
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var initTime = (0, _moment2.default)().format('YYYY-MM-DD HH:mm');
                    console.log(initTime);
                    return _react2.default.createElement('div', { className: 'date-time' }, _react2.default.createElement('div', {
                        className: 'input-group date form_datetime col-md-4 date-time-content',
                        'data-date': initTime,
                        'data-date-format': 'yyyy-mm-dd hh:ii',
                        'data-link-field': self.props.idName
                    }, _react2.default.createElement('input', {
                        className: 'form-control',
                        size: '16',
                        type: 'text',
                        value: '',
                        readOnly: true
                    }), _react2.default.createElement('span', { className: 'input-group-addon' }, _react2.default.createElement('span', { className: 'glyphicon glyphicon-remove' })), _react2.default.createElement('span', { className: 'input-group-addon' }, _react2.default.createElement('span', { className: 'glyphicon glyphicon-th' }))), _react2.default.createElement('input', {
                        type: 'hidden',
                        id: self.props.idName,
                        value: ''
                    }), _react2.default.createElement('br', null));
                }
            }
        ]);
        return DateTime;
    }(_PageController3.default);
    ;
    exports.default = DateTime;
});