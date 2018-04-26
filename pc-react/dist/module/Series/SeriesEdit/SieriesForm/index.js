define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _reactRouter = require('react-router');
    var _index = require('common/components/ImageUpload/index');
    var _index3 = require('common/components/CourseRadio/index');
    var _index5 = require('common/components/IntroUpload/index');
    var _index7 = require('common/components/IntroImage/index');
    var _index9 = require('common/components/IntroTextArea/index');
    var _index11 = require('common/components/SubjectSelect/index');
    var _config = require('common/config');
    var _url = require('common/util/url');
    var _ajaxService = require('common/util/ajaxService');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
    var _index12 = _interopRequireDefault(_index11);
    var _config2 = _interopRequireDefault(_config);
    var _url2 = _interopRequireDefault(_url);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
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
    var params = (0, _url2.default)().params;
    var DEFAULT_COVER = 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a7d3ce98cc0e.png';
    var DEFAULT_STORAGEID = -1;
    var SeriesForm = function (_React$Component) {
        _inherits(SeriesForm, _React$Component);
        function SeriesForm(props) {
            _classCallCheck(this, SeriesForm);
            var _this = _possibleConstructorReturn(this, (SeriesForm.__proto__ || Object.getPrototypeOf(SeriesForm)).call(this, props));
            _this.confirm = function (hash) {
                var me = _this;
                _antd.Modal.confirm({
                    title: '确定要离开当前页面吗\uFF1F',
                    content: '课程内容还未保存\uFF0C离开将会丢弃',
                    okText: '确认',
                    cancelText: '取消',
                    className: 'series-confirm',
                    okType: 'ghost',
                    width: 240,
                    onOk: function onOk() {
                        me.isSaved = true;
                        _reactRouter.hashHistory.push(hash);
                    }
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
                if (!_this.state.seriesId) {
                    _ajaxService2.default.post('/pc/series/add', Object.assign(values, {
                        classroomId: Number(_this.classroomId),
                        price: Number(values.price),
                        intros: _this.state.intros,
                        planCourseCnt: Number(values.planCourseCnt)
                    })).then(function (res) {
                        if (res && res.code === 200) {
                            _this.isNew = false;
                            _this.setState({
                                submitLoading: false,
                                seriesId: res.data.seriesId
                            });
                            _antd.message.success('保存成功', 3);
                            _this.isSaved = true;
                            history.back();
                        }
                    }, function () {
                        _this.setState({ submitLoading: false });
                    });
                } else {
                    _ajaxService2.default.post('/pc/series/modify', Object.assign(values, {
                        seriesId: Number(_this.state.seriesId),
                        price: Number(values.price),
                        intros: _this.state.intros,
                        planCourseCnt: Number(values.planCourseCnt)
                    })).then(function (res) {
                        if (res && res.code === 200) {
                            _antd.message.success('保存成功', 3);
                            _this.isSaved = true;
                            _this.setState({ submitLoading: false });
                            history.back();
                        }
                    }, function () {
                        _this.setState({ submitLoading: false });
                    });
                }
            };
            _this.handleImageUpload = function (file) {
                _this.isSaved = false;
                _this.props.form.setFieldsValue({ storageId: file.uid });
                _this.setState({
                    storageId: file.uid,
                    coverUrl: file.url
                });
            };
            _this.handleSellTypeChange = function (value) {
                _this.isSaved = false;
                _this.setState({ sellType: value });
            };
            _this.handleIntroImageUpload = function (type, file) {
                _this.isSaved = false;
                var newIntro = {
                    introType: type,
                    contentType: _config2.default.INTRO_CONTENT_TYPE.IMAGE,
                    url: file.url,
                    content: file.uid
                };
                var index = _this.findInsertPositioin(type);
                _this.state.intros.splice(index, 0, newIntro);
                _this.setState({ intros: _this.updateIntro(_this.state.intros) });
            };
            _this.handleAddIntroText = function (type) {
                _this.isSaved = false;
                var newIntro = {
                    introType: type,
                    contentType: _config2.default.INTRO_CONTENT_TYPE.TEXT
                };
                var index = _this.findInsertPositioin(type);
                _this.state.intros.splice(index, 0, newIntro);
                _this.setState({ intros: _this.updateIntro(_this.state.intros) });
            };
            _this.handleIntroChange = function (index, content) {
                _this.isSaved = false;
                _this.state.intros[index - 1].content = content;
                _this.setState({ intros: _this.state.intros });
            };
            _this.handleIntroDelete = function (seq) {
                _this.isSaved = false;
                var list = _this.state.intros;
                list.splice(seq - 1, 1);
                _this.setState({ intros: _this.updateIntro(list) });
            };
            _this.findInsertPositioin = function (type) {
                var intros = _this.state.intros;
                var len = intros.length;
                var insertPosition = 0;
                for (var i = 0; i < len; i++) {
                    if (intros[i].introType <= type) {
                        insertPosition = i + 1;
                    }
                }
                return insertPosition;
            };
            _this.updateIntro = function (list) {
                return list.map(function (item, index) {
                    item.seq = index + 1;
                    return item;
                });
            };
            _this.handleNameChange = function () {
                _this.isSaved = false;
            };
            _this.handlePriceChange = function () {
                _this.isSaved = false;
            };
            _this.handleSubjectChange = function () {
                _this.isSaved = false;
            };
            _this.handlePlanCourseCntChange = function () {
                _this.isSaved = false;
            };
            _this.state = {
                intros: [],
                submitLoading: false,
                seriesId: params.seriesId,
                storageId: DEFAULT_STORAGEID,
                coverUrl: DEFAULT_COVER
            };
            _this.classroomId = Number(params.classroomId);
            _this.isSaved = true;
            return _this;
        }
        _createClass(SeriesForm, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    if (this.state.seriesId) {
                        _ajaxService2.default.get('/pc/series/getDetail', { seriesId: this.state.seriesId }).then(function (res) {
                            _this2.setState(_extends({}, res.data, { coverUrl: res.data.storageId === DEFAULT_STORAGEID ? DEFAULT_COVER : res.data.coverUrl }));
                        });
                    }
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this3 = this;
                    this.props.router.setRouteLeaveHook(this.props.routes[2], function (nextLocation) {
                        if (_this3.isSaved) {
                            return true;
                        } else {
                            _this3.confirm(nextLocation.pathname);
                            return false;
                        }
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var me = this;
                    var state = me.state;
                    var sellType = [
                        {
                            id: _config2.default.SELL_TYPE_NUM.FREE_COURSE,
                            name: _config2.default.SELL_TYPE_STRING[_config2.default.SELL_TYPE_NUM.FREE_COURSE]
                        },
                        {
                            id: _config2.default.SELL_TYPE_NUM.PAIED_COURSE,
                            name: _config2.default.SELL_TYPE_STRING[_config2.default.SELL_TYPE_NUM.PAIED_COURSE]
                        }
                    ];
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
                    return _react2.default.createElement('div', { className: 'series-form form' }, _react2.default.createElement(_antd.Form, {
                        onSubmit: me.handleSubmit,
                        className: 'series-form-content'
                    }, _react2.default.createElement('div', { className: 'series-form-content-title' }, '基本信息'), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '系列课名称',
                        className: 'series-form-content-name'
                    }), getFieldDecorator('name', {
                        initialValue: state.name,
                        rules: [{
                                required: true,
                                validator: function validator(rule, value, callback) {
                                    if (value) {
                                        if (value.length > 20) {
                                            callback('课程名称最多输入20个汉字');
                                        }
                                        callback();
                                    } else {
                                        callback('请输入课程名称');
                                    }
                                }
                            }]
                    })(_react2.default.createElement(_antd.Input, {
                        placeholder: '请输入课程名称\uFF0C最多输入20个汉字',
                        onChange: this.handleNameChange
                    }))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '排课计划',
                        className: 'series-form-content-plan'
                    }), getFieldDecorator('planCourseCnt', {
                        initialValue: state.planCourseCnt,
                        rules: [
                            {
                                required: true,
                                message: '请输入预计开设的课节数量'
                            },
                            {
                                pattern: /^[1-9][0-9]*$/,
                                message: '请输入大于0的数字'
                            }
                        ]
                    })(_react2.default.createElement(_antd.Input, {
                        placeholder: '请输入预计开设的课节数量',
                        onChange: this.handlePlanCourseCntChange
                    }))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '课程封面',
                        className: 'series-form-content-cover'
                    }), getFieldDecorator('storageId', {
                        initialValue: state.storageId,
                        rules: [{
                                required: true,
                                message: '请上传课程封面'
                            }]
                    })(_react2.default.createElement(_index2.default, {
                        storageId: state.storageId,
                        url: state.coverUrl,
                        onUpload: me.handleImageUpload,
                        size: 5,
                        tip: '建议尺寸750像素*422像素\uFF0CJPG\u3001JPEG\u3001PNG格式\uFF0C图片小于5M\u3002'
                    }))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '付费类型',
                        className: 'series-form-content-type'
                    }), getFieldDecorator('sellType', {
                        initialValue: state.sellType,
                        rules: [{
                                required: true,
                                message: '请选择付费类型'
                            }]
                    })(_react2.default.createElement(_index4.default, {
                        defaultCourseType: state.sellType,
                        onChange: me.handleSellTypeChange,
                        options: sellType
                    }))), state.sellType === _config2.default.SELL_TYPE_NUM.PAIED_COURSE ? _react2.default.createElement(FormItem, _extends({}, formTailLayout, { className: 'series-form-content-sell' }), getFieldDecorator('price', {
                        initialValue: state.price,
                        rules: [
                            {
                                required: true,
                                message: '请输入课程售价'
                            },
                            {
                                pattern: /^[1-9][0-9]{0,4}(.[0-9]{0,2})?$/,
                                message: '请输入数字\uFF0C最低1元\uFF0C最高99999元\uFF0C最多两位小数'
                            }
                        ]
                    })(_react2.default.createElement(_antd.Input, {
                        placeholder: '请输入课程售价\uFF0C最低1元',
                        prefix: _react2.default.createElement('span', null, '\uFFE5'),
                        onChange: this.handlePriceChange
                    }))) : null, _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '所属科目',
                        className: 'series-form-content-subject'
                    }), getFieldDecorator('subjectId', {
                        initialValue: state.secondId,
                        rules: [{
                                required: true,
                                message: '请选择所属科目'
                            }]
                    })(_react2.default.createElement(_index12.default, {
                        firstId: state.firstId,
                        secondId: state.secondId,
                        thirdId: state.thirdId,
                        onChange: this.handleSubjectChange
                    }))), _react2.default.createElement('div', { className: 'series-form-content-title' }, '系列课介绍'), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '简介',
                        className: 'series-form-content-intro'
                    }), state.intros.map(function (item) {
                        if (item.introType === _config2.default.INTRO_TYPE_NUM.INTRO) {
                            if (item.contentType === _config2.default.INTRO_CONTENT_TYPE.IMAGE) {
                                return _react2.default.createElement(_index8.default, {
                                    key: item.seq,
                                    seq: item.seq,
                                    onDelete: me.handleIntroDelete,
                                    url: item.url
                                });
                            }
                            return _react2.default.createElement(_index10.default, {
                                key: item.seq,
                                seq: item.seq,
                                onDelete: me.handleIntroDelete,
                                defaultValue: item.content,
                                onChange: me.handleIntroChange
                            });
                        }
                        return null;
                    }), _react2.default.createElement('div', { className: 'series-form-content-intro-operate' }, _react2.default.createElement(_index6.default, {
                        size: 5,
                        onUpload: me.handleIntroImageUpload,
                        type: _config2.default.INTRO_TYPE_NUM.INTRO
                    }), _react2.default.createElement(_antd.Button, {
                        className: 'series-form-content-intro-operate-btn',
                        onClick: function onClick() {
                            me.handleAddIntroText(_config2.default.INTRO_TYPE_NUM.INTRO);
                        }
                    }, _react2.default.createElement('span', { className: 'icon-t' }), '添加文字'))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '关于讲师',
                        className: 'series-form-content-intro'
                    }), state.intros.map(function (item) {
                        if (item.introType === _config2.default.INTRO_TYPE_NUM.TEACHER) {
                            if (item.contentType === _config2.default.INTRO_CONTENT_TYPE.IMAGE) {
                                return _react2.default.createElement(_index8.default, {
                                    key: item.seq,
                                    seq: item.seq,
                                    onDelete: me.handleIntroDelete,
                                    url: item.url
                                });
                            }
                            return _react2.default.createElement(_index10.default, {
                                key: item.seq,
                                seq: item.seq,
                                onDelete: me.handleIntroDelete,
                                defaultValue: item.content,
                                onChange: me.handleIntroChange
                            });
                        }
                        return null;
                    }), _react2.default.createElement('div', { className: 'series-form-content-intro-operate' }, _react2.default.createElement(_index6.default, {
                        size: 5,
                        onUpload: me.handleIntroImageUpload,
                        type: _config2.default.INTRO_TYPE_NUM.TEACHER
                    }), _react2.default.createElement(_antd.Button, {
                        className: 'series-form-content-intro-operate-btn',
                        onClick: function onClick() {
                            me.handleAddIntroText(_config2.default.INTRO_TYPE_NUM.TEACHER);
                        }
                    }, _react2.default.createElement('span', { className: 'icon-t' }), '添加文字'))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '适合人群',
                        className: 'series-form-content-intro'
                    }), state.intros.map(function (item) {
                        if (item.introType === _config2.default.INTRO_TYPE_NUM.PEOPLE) {
                            if (item.contentType === _config2.default.INTRO_CONTENT_TYPE.IMAGE) {
                                return _react2.default.createElement(_index8.default, {
                                    key: item.seq,
                                    seq: item.seq,
                                    onDelete: me.handleIntroDelete,
                                    url: item.url
                                });
                            }
                            return _react2.default.createElement(_index10.default, {
                                key: item.seq,
                                seq: item.seq,
                                onDelete: me.handleIntroDelete,
                                defaultValue: item.content,
                                onChange: me.handleIntroChange
                            });
                        }
                        return null;
                    }), _react2.default.createElement('div', { className: 'series-form-content-intro-operate' }, _react2.default.createElement(_index6.default, {
                        size: 5,
                        onUpload: me.handleIntroImageUpload,
                        type: _config2.default.INTRO_TYPE_NUM.PEOPLE
                    }), _react2.default.createElement(_antd.Button, {
                        className: 'series-form-content-intro-operate-btn',
                        onClick: function onClick() {
                            me.handleAddIntroText(_config2.default.INTRO_TYPE_NUM.PEOPLE);
                        }
                    }, _react2.default.createElement('span', { className: 'icon-t' }), '添加文字'))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '你将获得',
                        className: 'series-form-content-intro'
                    }), state.intros.map(function (item) {
                        if (item.introType === _config2.default.INTRO_TYPE_NUM.GAIN) {
                            if (item.contentType === _config2.default.INTRO_CONTENT_TYPE.IMAGE) {
                                return _react2.default.createElement(_index8.default, {
                                    key: item.seq,
                                    seq: item.seq,
                                    onDelete: me.handleIntroDelete,
                                    url: item.url
                                });
                            }
                            return _react2.default.createElement(_index10.default, {
                                key: item.seq,
                                seq: item.seq,
                                onDelete: me.handleIntroDelete,
                                defaultValue: item.content,
                                onChange: me.handleIntroChange
                            });
                        }
                        return null;
                    }), _react2.default.createElement('div', { className: 'series-form-content-intro-operate' }, _react2.default.createElement(_index6.default, {
                        size: 5,
                        onUpload: me.handleIntroImageUpload,
                        type: _config2.default.INTRO_TYPE_NUM.GAIN
                    }), _react2.default.createElement(_antd.Button, {
                        className: 'series-form-content-intro-operate-btn',
                        onClick: function onClick() {
                            me.handleAddIntroText(_config2.default.INTRO_TYPE_NUM.GAIN);
                        }
                    }, _react2.default.createElement('span', { className: 'icon-t' }), '添加文字'))), _react2.default.createElement(FormItem, _extends({}, formTailLayout, { className: 'form-operate' }), _react2.default.createElement(_antd.Button, { className: 'md-btn classic-btn white-btn' }, '取消'), _react2.default.createElement(_antd.Button, {
                        htmlType: 'submit',
                        className: 'md-btn classic-btn pink-btn',
                        loading: state.submitLoading,
                        disabled: state.submitLoading
                    }, '保存'))));
                }
            }
        ]);
        return SeriesForm;
    }(_react2.default.Component);
    exports.default = (0, _reactRouter.withRouter)(_antd.Form.create()(SeriesForm));
});