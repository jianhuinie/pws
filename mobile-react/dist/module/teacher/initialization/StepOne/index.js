define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('module/discovery/component/EnterDiscovery/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
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
    var StepOne = function (_PageController) {
        _inherits(StepOne, _PageController);
        function StepOne(props) {
            _classCallCheck(this, StepOne);
            var _this = _possibleConstructorReturn(this, (StepOne.__proto__ || Object.getPrototypeOf(StepOne)).call(this, props));
            _this.toggleProtocolCheck = function (e) {
                _this.setState({ argeeProtocol: e.target.checked });
            };
            _this.toggleFollowCheck = function (e) {
                _this.setState({ argeeFollow: e.target.checked });
            };
            _this.state = {
                argeeProtocol: true,
                argeeFollow: true,
                loading: true
            };
            return _this;
        }
        _createClass(StepOne, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;
                    document.title = '欢迎入驻微师';
                    _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_USER).then(function (res) {
                        var isTeacher = res.data.user.isTeacher;
                        var classId = res.data.classroom && res.data.classroom.classId;
                        if (isTeacher) {
                            location.replace('/mweb/classroom?id=' + classId);
                        } else {
                            _this2.setState({ loading: false });
                        }
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    if (this.state.loading) {
                        return _react2.default.createElement(_index2.default, { show: true });
                    }
                    return _react2.default.createElement('div', { className: 'welcome-join' }, _react2.default.createElement('img', {
                        className: 'welcome-join-img',
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/12/5a44cfc38ca62.png'
                    }), _react2.default.createElement('div', { className: 'welcome-join-check first' }, _react2.default.createElement('input', {
                        type: 'checkbox',
                        checked: this.state.argeeProtocol,
                        onChange: this.toggleProtocolCheck
                    }), '我同意遵循', _react2.default.createElement('a', {
                        className: 'protocol',
                        href: '/mweb/student/protocol'
                    }, '\u300A微师平台用户协议\u300B')), _react2.default.createElement('div', { className: 'welcome-join-check second' }, _react2.default.createElement('input', {
                        type: 'checkbox',
                        checked: this.state.argeeFollow,
                        onChange: this.toggleFollowCheck
                    }), '关注', _react2.default.createElement('a', {
                        className: 'protocol',
                        href: '/mweb/classroom?id=1'
                    }, '\xA0微师大讲堂\xA0'), '及时了解课堂运营技巧'), _react2.default.createElement('a', { href: '/mweb/teacher/initialization#/step-two' }, _react2.default.createElement('button', {
                        disabled: !(this.state.argeeProtocol && this.state.argeeFollow),
                        className: 'ws-btn-red welcome-join-next'
                    }, '下一步')));
                }
            }
        ]);
        return StepOne;
    }(_PageController3.default);
    exports.default = StepOne;
    ;
});