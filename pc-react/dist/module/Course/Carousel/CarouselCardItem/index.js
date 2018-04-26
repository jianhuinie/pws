define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('common/components/CourseAutoComplete/index');
    var _index3 = require('../CarouselUpload/index');
    var _index5 = require('common/components/Selection/index');
    var _antd = require('antd');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
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
    var CarousleCardItem = function (_PageController) {
        _inherits(CarousleCardItem, _PageController);
        function CarousleCardItem(props) {
            _classCallCheck(this, CarousleCardItem);
            var _this = _possibleConstructorReturn(this, (CarousleCardItem.__proto__ || Object.getPrototypeOf(CarousleCardItem)).call(this, props));
            _this.handleImageUpload = function (file) {
                _this.setState({
                    storageId: file.uid,
                    url: file.url
                });
                _this.props.onChange(_this.state.seq, Object.assign(_this.state, {
                    storageId: file.uid,
                    url: file.url
                }));
            };
            _this.handleSelectionChange = function (value) {
                _this.setState({
                    courseType: value,
                    courseId: undefined,
                    courseName: ''
                }, function () {
                    _this.props.onChange(_this.state.seq, Object.assign(_this.state, { courseType: value }));
                });
            };
            _this.handleCourseChange = function (value) {
                var list = value.split(' ');
                _this.setState({
                    courseId: Number(list[0]),
                    courseName: list[1]
                });
                _this.props.onChange(_this.state.seq, Object.assign(_this.state, {
                    courseId: Number(list[0]),
                    courseName: list[1]
                }));
            };
            _this.handleDeleteName = function (value) {
                _this.setState({ courseName: value });
                if (value === '') {
                    _this.props.onChange(_this.state.seq, Object.assign(_this.state, {
                        courseId: undefined,
                        courseName: ''
                    }));
                }
            };
            _this.state = _extends({}, props.item);
            return _this;
        }
        _createClass(CarousleCardItem, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState(_extends({}, nextProps.item));
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    var CourseSelection = [
                        {
                            id: 1,
                            name: '单次课'
                        },
                        {
                            id: 2,
                            name: '系列课'
                        }
                    ];
                    var state = this.state;
                    return _react2.default.createElement('div', {
                        className: 'carousle-card-item',
                        id: state.seq
                    }, _react2.default.createElement('span', { className: 'carousle-card-item-seq' }, state.seq), _react2.default.createElement(_antd.Popconfirm, {
                        placement: 'topRight',
                        title: '确定要删除这张图片吗',
                        onConfirm: function onConfirm() {
                            return _this2.props.onDelete(state.seq);
                        },
                        okText: '确定',
                        cancelText: '取消',
                        className: 'popconfirm',
                        overlayClassName: 'popconfirm-overlay'
                    }, _react2.default.createElement('span', { className: 'icon-Combined-Shape' })), _react2.default.createElement('div', { className: 'carousle-card-item-content' }, _react2.default.createElement('div', { className: 'carousle-card-item-image' }, _react2.default.createElement(_index4.default, {
                        url: state.url,
                        onUpload: this.handleImageUpload,
                        storageId: state.storageId
                    })), _react2.default.createElement('div', { className: 'carousle-card-item-selection' }, _react2.default.createElement('div', null, _react2.default.createElement('span', { className: 'carousle-card-item-selection-label' }, '课程类型'), _react2.default.createElement(_index6.default, {
                        placeholder: '请输入课程类型',
                        onSelectionChange: this.handleSelectionChange,
                        options: CourseSelection,
                        defaultValue: state.courseType
                    })), _react2.default.createElement('div', null, _react2.default.createElement('span', { className: 'carousle-card-item-selection-label' }, '跳转链接'), _react2.default.createElement(_index2.default, {
                        onDelete: this.handleDeleteName,
                        defaultName: state.courseName,
                        type: state.courseType,
                        onChange: this.handleCourseChange,
                        tip: '请输入课程名称'
                    })))), state.storageId ? state.courseType ? state.courseId ? null : _react2.default.createElement('span', { className: 'carousle-card-item-text' }, '请输入课程名称') : _react2.default.createElement('span', { className: 'carousle-card-item-text' }, '请选择课程类型') : _react2.default.createElement('span', { className: 'carousle-card-item-text' }, '未上传图片'));
                }
            }
        ]);
        return CarousleCardItem;
    }(_PageController3.default);
    CarousleCardItem.propTypes = {
        item: _react.PropTypes.object,
        onChange: _react.PropTypes.func,
        onDelete: _react.PropTypes.func
    };
    exports.default = CarousleCardItem;
});