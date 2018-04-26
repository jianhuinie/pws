define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
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
    var FollowPublic = function (_PageController) {
        _inherits(FollowPublic, _PageController);
        function FollowPublic(props) {
            _classCallCheck(this, FollowPublic);
            var _this = _possibleConstructorReturn(this, (FollowPublic.__proto__ || Object.getPrototypeOf(FollowPublic)).call(this, props));
            _this.getQrcodeImg = function (classId) {
                var self = _this;
                var params = {
                    classId: classId,
                    courseId: self.props.courseId,
                    courseMode: self.props.courseMode,
                    followType: 2
                };
                _ajaxService2.default.post(_ajaxConfig2.default.CLASSROOM.GET_QRCODE, params).then(function (res) {
                    if (res && res.code === 200) {
                        var img = res.data.qrcodeUrl;
                        self.setState({ img: img });
                    }
                });
            };
            _this.state = { img: null };
            return _this;
        }
        _createClass(FollowPublic, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var self = this;
                    if (nextProps.show && nextProps.classId && nextProps.classId !== self.props.classId) {
                        self.getQrcodeImg(nextProps.classId);
                    }
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var isShow = self.props.show;
                    return _react2.default.createElement('div', { className: isShow ? 'follow-public' : 'follow-public hide' }, _react2.default.createElement('div', { className: 'follow-public-img' }, _react2.default.createElement('img', {
                        className: '',
                        src: self.state.img
                    })), _react2.default.createElement('img', {
                        className: 'follow-bg-img',
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a81731d23465.png'
                    }));
                }
            }
        ]);
        return FollowPublic;
    }(_PageController3.default);
    ;
    exports.default = FollowPublic;
});