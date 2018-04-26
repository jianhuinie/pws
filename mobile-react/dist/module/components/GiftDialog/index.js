define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _ajaxService = require('common/util/ajaxService');
    var _ajaxConfig = require('common/ajaxConfig');
    var _index = require('common/components/Dialog/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
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
    var GiftDialog = function (_React$Component) {
        _inherits(GiftDialog, _React$Component);
        function GiftDialog(props) {
            _classCallCheck(this, GiftDialog);
            var _this = _possibleConstructorReturn(this, (GiftDialog.__proto__ || Object.getPrototypeOf(GiftDialog)).call(this, props));
            _this.getGiftInfo = function () {
                _ajaxService2.default.get(_ajaxConfig2.default.USER.GET_GIFT_COURSES).then(function (res) {
                    _this.setState({
                        giftId: res.data.giftId,
                        courses: res.data.courses
                    });
                });
            };
            _this.closeGiftDialog = function () {
                _this.setState({ isShowDialog: false });
                _this.props.onClose && _this.props.onClose();
            };
            _this.gainGift = function () {
                sessionStorage.setItem('haveReceived', 1);
                _ajaxService2.default.post(_ajaxConfig2.default.USER.GAIN_GIFT, { giftId: _this.state.giftId }).then(function () {
                    _this.props.onGainedSuccess();
                });
            };
            _this.state = {
                giftId: undefined,
                courses: [],
                isShowDialog: props.isShowDialog
            };
            return _this;
        }
        _createClass(GiftDialog, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ isShowDialog: nextProps.isShowDialog });
                    if (nextProps.isShowDialog) {
                        this.getGiftInfo();
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(_index2.default, {
                        dialogClassName: 'gift-dialog',
                        isShowDialog: this.state.isShowDialog,
                        isHiddenClose: Boolean(true)
                    }, _react2.default.createElement('div', { className: 'gift-receive' }, _react2.default.createElement('ul', { className: 'gift-receive-content' }, this.state.courses.map(function (course) {
                        var learnCnt = course.learnCnt;
                        if (learnCnt > 9999) {
                            learnCnt = (learnCnt / 10000).toFixed(1) + '万';
                        }
                        return _react2.default.createElement('li', {
                            className: 'gift-item',
                            key: course.id + course.courseMode
                        }, _react2.default.createElement('img', {
                            className: 'gift-item-cover',
                            src: course.coverUrl
                        }), _react2.default.createElement('div', { className: 'gift-item-detail' }, _react2.default.createElement('div', { className: 'gift-item-detail-title' }, course.name), _react2.default.createElement('div', { className: 'gift-item-detail-body' }, _react2.default.createElement('div', { className: 'gift-item-detail-body-name' }, course.className), _react2.default.createElement('div', { className: 'gift-item-detail-body-number' }, learnCnt, '人在学'))));
                    })), _react2.default.createElement('img', {
                        className: 'gift-receive-bg',
                        src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a8439852e5ef.png'
                    }), _react2.default.createElement('div', { className: 'gift-receive-opreate' }, _react2.default.createElement('div', { className: 'desc' }, '礼包仅限新用户领取'), _react2.default.createElement('button', {
                        onClick: this.gainGift,
                        className: 'gain'
                    }, '免费领取')), _react2.default.createElement('div', {
                        onClick: this.closeGiftDialog,
                        className: 'gift-receive-close icon-close'
                    })));
                }
            }
        ]);
        return GiftDialog;
    }(_react2.default.Component);
    GiftDialog.propTypes = {
        onGainedSuccess: _react.PropTypes.func,
        isShowDialog: _react.PropTypes.bool,
        onClose: _react.PropTypes.func
    };
    GiftDialog.defaultProps = {
        onGainedSuccess: function onGainedSuccess() {
            location.href = '/mweb/gift';
        },
        onClose: function onClose() {
        },
        isShowDialog: true
    };
    exports.default = GiftDialog;
});