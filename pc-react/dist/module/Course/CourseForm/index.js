define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _index = require('common/components/ImageUpload/index');
    var _ajaxService = require('common/util/ajaxService');
    var _url = require('common/util/url');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _url2 = _interopRequireDefault(_url);
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
    var url = (0, _url2.default)();
    var CourseForm = function (_React$Component) {
        _inherits(CourseForm, _React$Component);
        function CourseForm(props) {
            _classCallCheck(this, CourseForm);
            var _this = _possibleConstructorReturn(this, (CourseForm.__proto__ || Object.getPrototypeOf(CourseForm)).call(this, props));
            _this.handleImageUpload = function (file) {
                _this.props.form.setFieldsValue({ storageId: file.uid });
                _this.setState({
                    storageId: file.uid,
                    headUrl: file.url
                });
            };
            _this.handleSubmit = function (event) {
                event.preventDefault();
                _this.props.form.validateFieldsAndScroll({ force: true }, function (err, values) {
                    if (err) {
                        console.log(err);
                    } else {
                        _this.setState({ submitLoading: true });
                        _this.submit(values);
                    }
                });
            };
            _this.submit = function (values) {
                _ajaxService2.default.post('/pc/classroom/modify', Object.assign(values, { classroomId: Number(url.params.classroomId) })).then(function (res) {
                    if (res && res.code === 200) {
                        _antd.message.success('保存成功', 3);
                        _this.setState({ submitLoading: false });
                        url.params.name = values.name;
                        url.hash = location.hash;
                        location.href = url.toString();
                    }
                }, function () {
                    _this.setState({ submitLoading: false });
                });
            };
            _this.state = { submitLoading: false };
            return _this;
        }
        _createClass(CourseForm, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    _ajaxService2.default.get('/pc/classroom/getDetail').then(function (res) {
                        var data = res.data;
                        _this2.setState(_extends({}, data));
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var me = this;
                    var formItemLayout = {
                        labelCol: { span: 3 },
                        wrapperCol: { span: 21 }
                    };
                    var formTailLayout = {
                        labelCol: { span: 3 },
                        wrapperCol: {
                            span: 21,
                            offset: 3
                        }
                    };
                    var FormItem = _antd.Form.Item;
                    var getFieldDecorator = me.props.form.getFieldDecorator;
                    var TextArea = _antd.Input.TextArea;
                    return _react2.default.createElement('div', { className: 'course-form form' }, _react2.default.createElement(_antd.Form, {
                        onSubmit: this.handleSubmit,
                        className: 'course-form-content'
                    }, _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '课堂名称',
                        className: 'course-form-content-name'
                    }), getFieldDecorator('name', {
                        initialValue: me.state.name || '',
                        rules: [{
                                required: true,
                                validator: function validator(rule, value, callback) {
                                    if (value) {
                                        if (value.length > 20 || value.length < 3) {
                                            callback('课堂名称长度需在3-20字之间');
                                        }
                                        callback();
                                    } else {
                                        callback('请输入课堂名称');
                                    }
                                }
                            }]
                    })(_react2.default.createElement(_antd.Input, { maxLength: '20' }))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '课堂简介',
                        className: 'course-form-content-intro'
                    }), getFieldDecorator('intro', {
                        initialValue: me.state.intro || '',
                        rules: [{
                                validator: function validator(rule, value, callback) {
                                    if (value.length > 300) {
                                        callback('课堂简介长度需在0-300字之间');
                                    }
                                    callback();
                                }
                            }]
                    })(_react2.default.createElement(TextArea, null))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '课堂头像',
                        className: 'course-form-content-avatar'
                    }), getFieldDecorator('storageId', { initialValue: me.state.storageId || '' })(_react2.default.createElement(_index2.default, {
                        storageId: me.state.storageId,
                        url: me.state.headUrl,
                        onUpload: me.handleImageUpload
                    }))), _react2.default.createElement(FormItem, _extends({}, formTailLayout, { className: 'form-operate' }), _react2.default.createElement('a', {
                        className: 'ant-btn md-btn classic-btn white-btn',
                        href: me.state.url,
                        target: '_blank'
                    }, '预 览'), _react2.default.createElement(_antd.Button, {
                        htmlType: 'submit',
                        className: 'md-btn classic-btn pink-btn',
                        loading: me.state.submitLoading,
                        disabled: me.state.submitLoading
                    }, '保存'))));
                }
            }
        ]);
        return CourseForm;
    }(_react2.default.Component);
    exports.default = _antd.Form.create()(CourseForm);
});