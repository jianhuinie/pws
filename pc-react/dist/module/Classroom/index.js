define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _antd = require('antd');
    var _url = require('common/util/url');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _url2 = _interopRequireDefault(_url);
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
    var Classroom = function (_React$Component) {
        _inherits(Classroom, _React$Component);
        function Classroom(props) {
            _classCallCheck(this, Classroom);
            var _this = _possibleConstructorReturn(this, (Classroom.__proto__ || Object.getPrototypeOf(Classroom)).call(this, props));
            _this.getClassroom = function (hasClassroom) {
                if (hasClassroom) {
                    _ajaxService2.default.get('/pc/classroom/get').then(function (res) {
                        var data = res.data;
                        _this.setState({
                            intro: data.intro,
                            name: data.name,
                            classroomId: data.classId
                        });
                    });
                }
            };
            _this.state = {};
            return _this;
        }
        _createClass(Classroom, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    _ajaxService2.default.get('/pc/classroom/check').then(function (res) {
                        var data = res.data;
                        _this2.setState({
                            qrcodeUrl: data.qrcodeUrl,
                            hasClassroom: data.hasClassroom
                        });
                        _this2.getClassroom(data.hasClassroom);
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var me = this;
                    var url = (0, _url2.default)();
                    url.params.classroomId = me.state.classroomId;
                    url.params.name = me.state.name;
                    url.hash = '#/course';
                    if (!me.state.hasClassroom) {
                        return _react2.default.createElement('div', { className: 'child-page' }, _react2.default.createElement('div', { className: 'create-classroom' }, _react2.default.createElement('div', { className: 'create-classroom-content' }, _react2.default.createElement('img', {
                            className: 'create-classroom-content-qrcode',
                            src: me.state.qrcodeUrl
                        }), _react2.default.createElement('div', { className: 'create-classroom-content-describe' }, '还未创建\uFF0C扫码创建课堂'))));
                    }
                    return _react2.default.createElement('div', { className: 'child-page' }, _react2.default.createElement('div', { className: 'classroom' }, _react2.default.createElement('div', { className: 'classroom-title' }, '选择课堂'), _react2.default.createElement('div', { className: 'classroom-content' }, _react2.default.createElement('div', { className: 'classroom-content-name' }, me.state.name), _react2.default.createElement('div', { className: 'classroom-content-intro' }, me.state.intro), _react2.default.createElement(_antd.Button, { className: 'md-btn classic-btn pink-btn' }, _react2.default.createElement('a', { href: url.toString() }, '管理')))));
                }
            }
        ]);
        return Classroom;
    }(_react2.default.Component);
    exports.default = Classroom;
});