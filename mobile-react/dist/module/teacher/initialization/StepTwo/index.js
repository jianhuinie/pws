define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('../../../components/PhoneVerify/index');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _index3 = require('gsx-design/component/Loading/index');
    var _url = require('gsx-design/util/url');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _index4 = _interopRequireDefault(_index3);
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
    var url = (0, _url2.default)();
    var StepTwo = function (_PageController) {
        _inherits(StepTwo, _PageController);
        function StepTwo(props) {
            _classCallCheck(this, StepTwo);
            var _this = _possibleConstructorReturn(this, (StepTwo.__proto__ || Object.getPrototypeOf(StepTwo)).call(this, props));
            _this.handleSubmitSuccess = function () {
                url.hash = '#/step-three';
                location.href = url.toString();
            };
            _this.state = {
                headUrl: '',
                name: '',
                intro: '',
                headStorageId: null,
                nameValid: false,
                submiting: false
            };
            _this._hackIos();
            _this.loading = new _index4.default();
            _this.loading.show();
            return _this;
        }
        _createClass(StepTwo, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;
                    document.title = '短信验证';
                    _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_USER).then(function (res) {
                        var isTeacher = res.data.user.isTeacher;
                        var classId = res.data.classroom && res.data.classroom.classId;
                        _this2.loading.hide();
                        if (isTeacher) {
                            location.replace('/mweb/classroom?id=' + classId);
                        }
                    });
                }
            },
            {
                key: '_hackIos',
                value: function _hackIos() {
                    window.onpageshow = function (event) {
                        if (event.persisted) {
                            window.location.reload();
                        }
                    };
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(_index2.default, {
                        submitLabel: '下一步',
                        onSubmitSuccess: this.handleSubmitSuccess
                    });
                }
            }
        ]);
        return StepTwo;
    }(_PageController3.default);
    exports.default = StepTwo;
    ;
});