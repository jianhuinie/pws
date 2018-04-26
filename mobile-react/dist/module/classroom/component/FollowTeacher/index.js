define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    var _ui = require('gsx-design/component/ui');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ui2 = _interopRequireDefault(_ui);
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
    var FollowTeacher = function (_PageController) {
        _inherits(FollowTeacher, _PageController);
        function FollowTeacher(props) {
            _classCallCheck(this, FollowTeacher);
            var _this = _possibleConstructorReturn(this, (FollowTeacher.__proto__ || Object.getPrototypeOf(FollowTeacher)).call(this, props));
            _this.getQrcodeImg = function (classId) {
                var self = _this;
                var params = {
                    classId: classId,
                    courseId: self.props.courseId,
                    courseMode: self.props.courseMode,
                    followType: 1
                };
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.GET_QRCODE, params).then(function (res) {
                    if (res && res.code === 200) {
                        var qrcodeUrl = res.data.qrcodeUrl;
                        self.setState({ qrcodeUrl: qrcodeUrl });
                    }
                });
            };
            _this.clickFollowBtn = function (e) {
                e.stopPropagation();
                var self = _this;
                if (self.props.isFollow) {
                    _ui2.default.confirm('确定不再关注该课堂\uFF1F').then(function () {
                        self.follow(1);
                    });
                } else if (self.props.followPublic) {
                    self.follow(0);
                } else {
                    self.showImg();
                }
            };
            _this.jump = function () {
                var self = _this;
                if (location.pathname.indexOf('/classroom') === -1) {
                    location.href = '/mweb/classroom?id=' + self.props.classId;
                }
            };
            _this.follow = function (index) {
                var self = _this;
                var params = {
                    classId: self.props.classId,
                    followStatus: index
                };
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.FOLLOW, params).then(function (res) {
                    if (res && res.code === 200) {
                        self.props.callbackParent(!index);
                    }
                });
            };
            _this.showImg = function () {
                var self = _this;
                _ui2.default.alert({ content: '<img src="' + self.state.qrcodeUrl + '">' });
            };
            _this.state = { qrcodeUrl: '' };
            return _this;
        }
        _createClass(FollowTeacher, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    if (self.props.classId) {
                        self.getQrcodeImg(self.props.classId);
                    }
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var self = this;
                    if (nextProps.classId && nextProps.classId !== self.props.classId) {
                        self.getQrcodeImg(nextProps.classId);
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var detail = self.props.detail;
                    var clsName = void 0;
                    if (detail.isSelfClass) {
                        clsName = 'follow-teacher-btn right hide';
                    } else if (self.props.isFollow) {
                        clsName = 'follow-teacher-btn has-follow-teacher right';
                    } else {
                        clsName = 'follow-teacher-btn right';
                    }
                    return _react2.default.createElement('div', {
                        className: 'follow-teacher',
                        onClick: self.jump
                    }, _react2.default.createElement('div', { className: 'follow-teacher-avator left' }, _react2.default.createElement('img', {
                        className: 'avator',
                        src: detail.headUrl
                    }), _react2.default.createElement('img', {
                        className: detail.authStatus === 2 ? 'auth-logo' : 'auth-logo hide',
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a5468c52d109.png'
                    })), _react2.default.createElement('div', { className: 'follow-teacher-info left' }, _react2.default.createElement('div', { className: 'follow-teacher-name' }, detail.name), _react2.default.createElement('div', { className: 'follow-teacher-number' }, detail.followNum + '人关注')), _react2.default.createElement('div', {
                        className: clsName,
                        onClick: self.clickFollowBtn
                    }, self.props.isFollow ? '已关注' : '关注'), _react2.default.createElement('div', { className: 'clearfix' }));
                }
            }
        ]);
        return FollowTeacher;
    }(_PageController3.default);
    ;
    exports.default = FollowTeacher;
});