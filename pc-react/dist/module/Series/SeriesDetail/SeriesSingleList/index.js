define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _index = require('common/components/CourseSearch/index');
    var _CommonController2 = require('common/controller/CommonController');
    var _index3 = require('../SeriesSingleTable/index');
    var _index5 = require('../SeriesSelectSingleTable/index');
    var _index7 = require('common/components/SelectModal/index');
    var _url = require('common/util/url');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
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
    var SeriesSingleList = function (_CommonController) {
        _inherits(SeriesSingleList, _CommonController);
        function SeriesSingleList(props) {
            _classCallCheck(this, SeriesSingleList);
            var _this = _possibleConstructorReturn(this, (SeriesSingleList.__proto__ || Object.getPrototypeOf(SeriesSingleList)).call(this, props));
            _this.handleSearch = function (value) {
                _this.setState({ query: value });
            };
            _this.handleSelectSingle = function () {
                _this.setState({
                    showModal: true,
                    showPopover: false
                });
            };
            _this.handleModalClose = function () {
                _this.setState({ showModal: false });
            };
            _this.handleVisiblePopoverChange = function (visible) {
                if (visible !== _this.state.showPopover) {
                    _this.setState({ showPopover: visible });
                }
            };
            _this.handleCancelTableForceUpdate = function () {
                _this.setState({ forceUpdateTable: false });
            };
            _this.handleCancelModalForceUpdate = function () {
                _this.setState({ forceUpdateModal: false });
            };
            _this.handleListUpdate = function (isUpdate) {
                if (isUpdate) {
                    _this.setState({
                        forceUpdateTable: true,
                        showModal: false,
                        forceUpdateModal: true
                    });
                } else {
                    _this.setState({
                        showModal: false,
                        forceUpdateModal: true
                    });
                }
            };
            _this.state = {
                query: undefined,
                showModal: false,
                forceUpdateTable: false,
                forceUpdataModal: false
            };
            return _this;
        }
        _createClass(SeriesSingleList, [{
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    var url = (0, _url2.default)();
                    url.params.courseId = undefined;
                    url.hash = '#/single/edit';
                    url.params.from = '/series/detail';
                    var popoverContent = _react2.default.createElement('div', { className: 'series-single-list-operation-popover-content' }, _react2.default.createElement('a', { href: url.toString() }, _react2.default.createElement('span', { className: 'series-single-list-operation-popover-content-spot' }), '新建'), _react2.default.createElement('a', {
                        onClick: function onClick() {
                            _this2.handleSelectSingle();
                        }
                    }, '选择已有'));
                    return _react2.default.createElement('div', { className: 'series-single-list' }, _react2.default.createElement('div', { className: 'series-single-list-operation' }, _react2.default.createElement('div', { className: 'series-single-list-operation-add' }, _react2.default.createElement(_antd.Popover, {
                        content: popoverContent,
                        placement: 'bottom',
                        trigger: 'click',
                        visible: this.state.showPopover,
                        className: 'series-single-list-operation-popover',
                        getPopupContainer: function getPopupContainer(triggerNode) {
                            return triggerNode.parentNode;
                        },
                        onVisibleChange: this.handleVisiblePopoverChange
                    }, _react2.default.createElement(_antd.Button, { className: 'classic-btn pink-btn series-single-list-operation-add-button' }, '添加单次课')), _react2.default.createElement(_index8.default, {
                        isShow: this.state.showModal,
                        onModalClose: this.handleModalClose,
                        title: '选择课程'
                    }, _react2.default.createElement(_index6.default, {
                        onUpdate: this.handleListUpdate,
                        forceUpdate: this.state.forceUpdateModal,
                        onCancelForceUpdate: this.handleCancelModalForceUpdate
                    }))), _react2.default.createElement(_index2.default, {
                        onCourseSearch: this.handleSearch,
                        placeholder: '输入课程名称'
                    })), _react2.default.createElement(_index4.default, {
                        search: this.state.query,
                        forceUpdate: this.state.forceUpdateTable,
                        onCancelForceUpdate: this.handleCancelTableForceUpdate
                    }));
                }
            }]);
        return SeriesSingleList;
    }(_CommonController3.default);
    exports.default = SeriesSingleList;
});