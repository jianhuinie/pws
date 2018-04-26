define(function (require) {
    'use strict';
    var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
    define(function (require, exports) {
        'use strict';
        var _react = require('react');
        var _antd = require('antd');
        var _CommonController2 = require('common/controller/CommonController');
        var _index = require('../SingleSelectVideoTable/index');
        var _index3 = require('common/components/SelectModal/index');
        var _url = require('common/util/url');
        var _ajaxService = require('common/util/ajaxService');
        require('css-loader!./index.styl');
        Object.defineProperty(exports, '__esModule', { value: true });
        var _react2 = _interopRequireDefault(_react);
        var _CommonController3 = _interopRequireDefault(_CommonController2);
        var _index2 = _interopRequireDefault(_index);
        var _index4 = _interopRequireDefault(_index3);
        var _url2 = _interopRequireDefault(_url);
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
            return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === 'object' || typeof call === 'function') ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== 'function' && superClass !== null) {
                throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
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
        var VideoUpload = function (_CommonController) {
            _inherits(VideoUpload, _CommonController);
            function VideoUpload(props) {
                _classCallCheck(this, VideoUpload);
                var _this = _possibleConstructorReturn(this, (VideoUpload.__proto__ || Object.getPrototypeOf(VideoUpload)).call(this, props));
                _this.handleCancelModalForceUpdate = function () {
                    _this.setState({ forceUpdateModal: false });
                };
                _this.handleVideoSelect = function (value) {
                    console.log(value);
                };
                _this.handleVisiblePopoverChange = function (visible) {
                    if (visible !== _this.state.showPopover) {
                        _this.setState({ showPopover: visible });
                    }
                };
                _this.handleSelectVideo = function () {
                    _this.setState({
                        showModal: true,
                        showPopover: false
                    });
                };
                _this.handleModalClose = function () {
                    _this.setState({ showModal: false });
                };
                _this.state = {
                    showModal: true,
                    showVideoButton: false,
                    forceUpdateModal: false
                };
                return _this;
            }
            _createClass(VideoUpload, [{
                    key: 'render',
                    value: function render() {
                        var _this2 = this;
                        var popoverContent = _react2.default.createElement('div', { className: 'video-upload-popover-content' }, _react2.default.createElement('a', {
                            onClick: function onClick() {
                                _this2.handleSelectVideo();
                            }
                        }, _react2.default.createElement('span', { className: 'video-upload-popover-content-spot' }), '从视频库选择'), _react2.default.createElement('a', null, '从电脑里上传'));
                        return _react2.default.createElement('div', {
                            className: 'video-upload',
                            id: 'video'
                        }, _react2.default.createElement(_antd.Popover, {
                            content: popoverContent,
                            placement: 'bottom',
                            trigger: 'click',
                            visible: this.state.showPopover,
                            className: 'video-upload-popover',
                            getPopupContainer: function getPopupContainer(triggerNode) {
                                return triggerNode.parentNode;
                            },
                            onVisibleChange: this.handleVisiblePopoverChange
                        }, _react2.default.createElement(_antd.Button, { className: 'classic-btn pink-btn video-upload-button' }, '添加视频')), _react2.default.createElement(_index4.default, {
                            isShow: this.state.showModal,
                            className: 'video-upload-modal',
                            onModalClose: this.handleModalClose,
                            title: '选择已有视频'
                        }, _react2.default.createElement(_index2.default, {
                            onVideoSelect: this.handleVideoSelect,
                            forceUpdate: this.state.forceUpdateModal,
                            onCancelForceUpdate: this.handleCancelModalForceUpdate
                        })));
                    }
                }]);
            return VideoUpload;
        }(_CommonController3.default);
        exports.default = VideoUpload;
    });
});