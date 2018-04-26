define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _reactRouter = require('react-router');
    var _index = require('common/components/ImageUpload/index');
    var _index3 = require('common/components/CourseRadio/index');
    var _index5 = require('common/components/CourseAutoComplete/index');
    var _index7 = require('common/components/SubjectSelect/index');
    var _index9 = require('common/components/IntroUpload/index');
    var _index11 = require('common/components/IntroImage/index');
    var _index13 = require('common/components/IntroTextArea/index');
    var _index15 = require('../VideoUpload/index');
    var _config = require('common/config');
    var _url = require('common/util/url');
    var _ajaxService = require('common/util/ajaxService');
    var _moment = require('moment');
    var _index17 = require('common/components/DateTime/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
    var _index12 = _interopRequireDefault(_index11);
    var _index14 = _interopRequireDefault(_index13);
    var _index16 = _interopRequireDefault(_index15);
    var _config2 = _interopRequireDefault(_config);
    var _url2 = _interopRequireDefault(_url);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _moment2 = _interopRequireDefault(_moment);
    var _index18 = _interopRequireDefault(_index17);
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
    var DEFAULT_COVER = 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a7d3ce98cc0e.png';
    var DEFAULT_STORAGEID = -1;
    var BEGIN_TIME_NAME = 'newBeginTime';
    var END_TIME_NAME = 'newEndTime';
    var SingleForm = function (_React$Component) {
        _inherits(SingleForm, _React$Component);
        function SingleForm(props) {
            _classCallCheck(this, SingleForm);
            var _this = _possibleConstructorReturn(this, (SingleForm.__proto__ || Object.getPrototypeOf(SingleForm)).call(this, props));
            _this.initTime = function (data) {
                if (data.beginTime) {
                    var beginTime = (0, _moment2.default)(data.beginTime).format('YYYY-MM-DD HH:mm');
                    $('.date-time').eq(0).find('.form-control').val(beginTime);
                    $('#' + BEGIN_TIME_NAME).val(beginTime + ':00');
                }
                if (data.endTime && $('.date-time').length > 1) {
                    var endTime = (0, _moment2.default)(data.endTime).format('YYYY-MM-DD HH:mm');
                    $('.date-time').eq(1).find('.form-control').val(endTime);
                    $('#' + END_TIME_NAME).val(endTime + ':00');
                }
            };
            _this.confirm = function (hash) {
                var me = _this;
                _antd.Modal.confirm({
                    title: '确定要离开当前页面吗\uFF1F',
                    content: '课程内容还未保存\uFF0C离开将会丢弃',
                    okText: '确认',
                    cancelText: '取消',
                    className: 'single-confirm',
                    okType: 'ghost',
                    width: 240,
                    onOk: function onOk() {
                        me.isSaved = true;
                        _reactRouter.hashHistory.push(hash);
                    }
                });
            };
            _this.handlePosition = function () {
                var hashParts = window.location.hash.split('#');
                if (hashParts.length > 2) {
                    var hash = hashParts.slice(-1)[0];
                    document.querySelector('#' + hash).scrollIntoView();
                }
            };
            _this.handleSubmit = function (event) {
                event.preventDefault();
                _this.props.form.validateFieldsAndScroll({ force: true }, function (err, values) {
                    if (err) {
                        console.log(err);
                    } else {
                        _this.submit(values);
                    }
                });
            };
            _this.submit = function (values) {
                var self = _this;
                var state = self.state;
                var isSellFlag = state.seriesId && state.sellType === _config2.default.SELL_TYPE_NUM.FREE_COURSE;
                var params = Object.assign(values, {
                    classroomId: _this.classroomId,
                    seriesId: values.seriesId ? Number((values.seriesId + '').split(' ')[0]) : null,
                    price: Number(values.price),
                    intros: _this.state.intros
                });
                if (isSellFlag) {
                    params.isSell = true;
                }
                var beginTimeStr = $('#' + BEGIN_TIME_NAME).val();
                if (!beginTimeStr) {
                    _antd.message.error('请选择开讲时间');
                    return;
                }
                var beginTimeVal = +new Date($('#' + BEGIN_TIME_NAME).val());
                if (beginTimeVal < +new Date()) {
                    _antd.message.error('开讲时间不能早于当前时间');
                    return;
                }
                params.beginTime = beginTimeVal;
                if (params.courseType === 1) {
                    var endTimeStr = $('#' + END_TIME_NAME).val();
                    if (!endTimeStr) {
                        _antd.message.error('请选择开讲时间');
                        return;
                    }
                    var endTimeVal = +new Date(endTimeStr);
                    if (endTimeVal < beginTimeVal) {
                        _antd.message.error('结束时间不能早于开始时间');
                        return;
                    }
                    if (endTimeVal - beginTimeVal > 24 * 60 * 60 * 1000) {
                        _antd.message.error('直播课上课时长不能超过24小时');
                        return;
                    }
                    params.endTime = endTimeVal;
                }
                self.setState({ submitLoading: true });
                if (!_this.state.courseId) {
                    _ajaxService2.default.post('/pc/course/add', params).then(function (res) {
                        if (res && res.code === 200) {
                            _antd.message.success('保存成功', 3);
                            _this.setState({
                                showUploadButton: values.courseType === _config2.default.PLAY_TYPE_NUM.VIDEO_COURSE,
                                courseId: res.data.courseId,
                                submitLoading: false
                            });
                            _this.isSaved = true;
                            if (values.courseType === _config2.default.PLAY_TYPE_NUM.LIVE_COURSE) {
                                history.back();
                            }
                        }
                    }, function () {
                        _this.setState({ submitLoading: false });
                    });
                } else {
                    params.courseId = Number(_this.state.courseId);
                    _ajaxService2.default.post('/pc/course/modify', params).then(function (res) {
                        if (res && res.code === 200) {
                            _antd.message.success('保存成功', 3);
                            _this.setState({ submitLoading: false });
                            _this.isSaved = true;
                            if (values.courseType === _config2.default.PLAY_TYPE_NUM.LIVE_COURSE) {
                                history.back();
                            }
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
                    headUrl: file.url
                });
            };
            _this.handleStartChange = function (time) {
                _this.isSaved = false;
                _this.props.form.setFieldsValue({ beginTime: time });
            };
            _this.handleEndChange = function (time) {
                _this.isSaved = false;
                _this.props.form.setFieldsValue({ endTime: time });
            };
            _this.handleSellTypeChange = function (value) {
                _this.isSaved = false;
                _this.setState({
                    sellType: value,
                    isSell: _this.state.seriesId && value === _config2.default.SELL_TYPE_NUM.FREE_COURSE
                });
            };
            _this.handlePlayTypeChange = function (value) {
                _this.isSaved = false;
                _this.setState({
                    courseType: value,
                    showUploadButton: _this.state.courseId && value === _config2.default.PLAY_TYPE_NUM.VIDEO_COURSE
                });
            };
            _this.handleSeriesSell = function (value) {
                _this.isSaved = false;
                var state = _this.state;
                _this.props.form.setFieldsValue({ isSell: state.seriesId && state.sellType === _config2.default.SELL_TYPE_NUM.FREE_COURSE || value });
                _this.setState({ isSell: state.seriesId && state.sellType === _config2.default.SELL_TYPE_NUM.FREE_COURSE || value });
            };
            _this.handleIntroImageUpload = function (type, file) {
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
            _this.handleClearSeries = function (value) {
                if (value === '') {
                    _this.setState({
                        seriesId: null,
                        seriesName: value
                    });
                } else {
                    _this.setState({ seriesName: value });
                }
            };
            _this.handleSeriesChange = function (value) {
                _this.isSaved = false;
                var list = value.split(' ');
                _this.setState({
                    seriesId: Number(list[0]),
                    isSell: _this.state.sellType === _config2.default.SELL_TYPE_NUM.FREE_COURSE
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
            _this.handleCourseAddVideo = function (videoId) {
                _ajaxService2.default.post('/pc/course/uploadVideo', {
                    courseId: Number(_this.state.courseId),
                    videoId: videoId
                }).then(function (res) {
                    if (res && res.code === 200) {
                        _reactRouter.hashHistory.push(url.params.from);
                    }
                });
            };
            _this.state = {
                intros: [],
                showUploadButton: !!url.params.courseId,
                courseId: url.params.courseId,
                seriesId: url.params.seriesId,
                submitLoading: false,
                showLeaveConfirm: false,
                storageId: DEFAULT_STORAGEID,
                coverUrl: DEFAULT_COVER
            };
            _this.classroomId = Number(url.params.classroomId);
            _this.isSaved = true;
            return _this;
        }
        _createClass(SingleForm, [
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    var self = this;
                    if (url.params.seriesId) {
                        _ajaxService2.default.get('/pc/series/getBaseInfo', { seriesId: url.params.seriesId }).then(function (res) {
                            _this2.setState({ seriesName: res.data.name });
                        });
                    }
                    if (url.params.courseId) {
                        _ajaxService2.default.get('/pc/course/getDetail', { courseId: url.params.courseId }).then(function (res) {
                            _this2.setState(_extends({}, res.data, {
                                showUploadButton: res.data.courseType === _config2.default.PLAY_TYPE_NUM.VIDEO_COURSE,
                                coverUrl: res.data.storageId === DEFAULT_STORAGEID ? DEFAULT_COVER : res.data.coverUrl
                            }), function () {
                                _this2.handlePosition();
                                self.initTime(res.data);
                            });
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
                    var playType = [
                        {
                            id: _config2.default.PLAY_TYPE_NUM.LIVE_COURSE,
                            name: _config2.default.PLAY_TYPE_STRING[_config2.default.PLAY_TYPE_NUM.LIVE_COURSE]
                        },
                        {
                            id: _config2.default.PLAY_TYPE_NUM.VIDEO_COURSE,
                            name: _config2.default.PLAY_TYPE_STRING[_config2.default.PLAY_TYPE_NUM.VIDEO_COURSE]
                        }
                    ];
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
                    return _react2.default.createElement('div', { className: 'single-form form' }, _react2.default.createElement(_antd.Form, {
                        onSubmit: me.handleSubmit,
                        className: 'single-form-content'
                    }, _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '课程名称',
                        className: 'single-form-content-name'
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
                        label: '课程封面',
                        className: 'single-form-content-cover'
                    }), getFieldDecorator('storageId', {
                        initialValue: state.storageId,
                        rules: [{
                                required: true,
                                message: '请上传课程封面'
                            }]
                    })(_react2.default.createElement(_index2.default, {
                        storageId: state.storageId,
                        url: state.coverUrl,
                        size: 5,
                        onUpload: me.handleImageUpload,
                        tip: '建议尺寸750像素*422像素\uFF0CJPG\u3001JPEG\u3001PNG格式\uFF0C图片小于5M\u3002'
                    }))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '课程类型',
                        className: 'single-form-content-type'
                    }), getFieldDecorator('courseType', {
                        initialValue: state.courseType,
                        rules: [{
                                required: true,
                                message: '请选择课程类型'
                            }]
                    })(_react2.default.createElement(_index4.default, {
                        defaultCourseType: state.courseType,
                        onChange: me.handlePlayTypeChange,
                        options: playType
                    }))), _react2.default.createElement('div', { className: 'ant-row ant-form-item single-form-content-type' }, _react2.default.createElement('div', { className: 'ant-col-3 ant-form-item-label' }, _react2.default.createElement('label', {
                        htmlFor: 'sellType',
                        className: 'ant-form-item-required',
                        title: '开讲时间'
                    }, '开讲时间')), _react2.default.createElement('div', { className: 'ant-col-21 ant-form-item-control-wrapper' }, _react2.default.createElement(_index18.default, {
                        defaultBegin: state.beginTime,
                        idName: BEGIN_TIME_NAME
                    }), state.courseType === 1 ? _react2.default.createElement(_index18.default, {
                        defaultBegin: state.endTime,
                        idName: END_TIME_NAME
                    }) : null)), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '付费类型',
                        className: 'single-form-content-type'
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
                    }))), state.sellType === _config2.default.SELL_TYPE_NUM.PAIED_COURSE ? _react2.default.createElement(FormItem, _extends({}, formTailLayout, { className: 'single-form-content-sell' }), getFieldDecorator('price', {
                        initialValue: state.price,
                        rules: [
                            {
                                required: true,
                                message: '请输入课程售价'
                            },
                            {
                                pattern: /^[1-9][0-9]{0,4}(\.[0-9]{1,2})?$/,
                                message: '请输入数字\uFF0C最低1元\uFF0C最高99999元\uFF0C最多两位小数'
                            }
                        ]
                    })(_react2.default.createElement(_antd.Input, {
                        placeholder: '请输入课程售价\uFF0C最低1元',
                        prefix: _react2.default.createElement('span', null, '\uFFE5'),
                        onChange: this.handlePriceChange
                    }))) : null, _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '所属科目',
                        className: 'single-form-content-subject'
                    }), getFieldDecorator('subjectId', {
                        initialValue: state.thirdId || state.secondId,
                        rules: [{
                                required: true,
                                message: '请选择所属科目'
                            }]
                    })(_react2.default.createElement(_index8.default, {
                        firstId: state.firstId,
                        secondId: state.secondId,
                        thirdId: state.thirdId,
                        onChange: this.handleSubjectChange
                    }))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '所属系列课',
                        className: 'single-form-content-pay-type'
                    }), getFieldDecorator('seriesId', { initialValue: state.seriesId })(_react2.default.createElement(_index6.default, {
                        defaultName: state.seriesName,
                        type: _config2.default.COURSE_TYPE_NUM.SERIES_COURSE,
                        tip: '请输入系列课名称',
                        onChange: me.handleSeriesChange,
                        onDelete: me.handleClearSeries
                    }))), state.seriesId ? _react2.default.createElement(FormItem, _extends({}, formTailLayout, { className: 'single-form-content-pay-sell' }), getFieldDecorator('isSell', { initialValue: state.isSell })(_react2.default.createElement(_antd.Checkbox, {
                        checked: state.isSell,
                        onChange: function onChange(e) {
                            me.handleSeriesSell(e.target.checked);
                        }
                    }, '系列课内可单卖'))) : null, _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '课程简介',
                        className: 'single-form-content-intro'
                    }), state.intros.map(function (item) {
                        if (item.introType === _config2.default.INTRO_TYPE_NUM.INTRO) {
                            if (item.contentType === _config2.default.INTRO_CONTENT_TYPE.IMAGE) {
                                return _react2.default.createElement(_index12.default, {
                                    key: item.seq,
                                    seq: item.seq,
                                    onDelete: me.handleIntroDelete,
                                    url: item.url
                                });
                            }
                            return _react2.default.createElement(_index14.default, {
                                key: item.seq,
                                seq: item.seq,
                                onDelete: me.handleIntroDelete,
                                defaultValue: item.content,
                                onChange: me.handleIntroChange
                            });
                        }
                        return null;
                    }), _react2.default.createElement('div', { className: 'single-form-content-intro-operate' }, _react2.default.createElement(_index10.default, {
                        size: 5,
                        onUpload: me.handleIntroImageUpload,
                        type: _config2.default.INTRO_TYPE_NUM.INTRO
                    }), _react2.default.createElement(_antd.Button, {
                        className: 'single-form-content-intro-operate-btn',
                        onClick: function onClick() {
                            me.handleAddIntroText(_config2.default.INTRO_TYPE_NUM.INTRO);
                        }
                    }, _react2.default.createElement('span', { className: 'icon-t' }), '添加文字'))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '关于讲师',
                        className: 'single-form-content-intro'
                    }), state.intros.map(function (item) {
                        if (item.introType === _config2.default.INTRO_TYPE_NUM.TEACHER) {
                            if (item.contentType === _config2.default.INTRO_CONTENT_TYPE.IMAGE) {
                                return _react2.default.createElement(_index12.default, {
                                    key: item.seq,
                                    seq: item.seq,
                                    onDelete: me.handleIntroDelete,
                                    url: item.url
                                });
                            }
                            return _react2.default.createElement(_index14.default, {
                                key: item.seq,
                                seq: item.seq,
                                onDelete: me.handleIntroDelete,
                                defaultValue: item.content,
                                onChange: me.handleIntroChange
                            });
                        }
                        return null;
                    }), _react2.default.createElement('div', { className: 'single-form-content-intro-operate' }, _react2.default.createElement(_index10.default, {
                        size: 5,
                        onUpload: me.handleIntroImageUpload,
                        type: _config2.default.INTRO_TYPE_NUM.TEACHER
                    }), _react2.default.createElement(_antd.Button, {
                        className: 'single-form-content-intro-operate-btn',
                        onClick: function onClick() {
                            me.handleAddIntroText(_config2.default.INTRO_TYPE_NUM.TEACHER);
                        }
                    }, _react2.default.createElement('span', { className: 'icon-t' }), '添加文字'))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '适合人群',
                        className: 'single-form-content-intro'
                    }), state.intros.map(function (item) {
                        if (item.introType === _config2.default.INTRO_TYPE_NUM.PEOPLE) {
                            if (item.contentType === _config2.default.INTRO_CONTENT_TYPE.IMAGE) {
                                return _react2.default.createElement(_index12.default, {
                                    key: item.seq,
                                    seq: item.seq,
                                    onDelete: me.handleIntroDelete,
                                    url: item.url
                                });
                            }
                            return _react2.default.createElement(_index14.default, {
                                key: item.seq,
                                seq: item.seq,
                                onDelete: me.handleIntroDelete,
                                defaultValue: item.content,
                                onChange: me.handleIntroChange
                            });
                        }
                        return null;
                    }), _react2.default.createElement('div', { className: 'single-form-content-intro-operate' }, _react2.default.createElement(_index10.default, {
                        size: 5,
                        onUpload: me.handleIntroImageUpload,
                        type: _config2.default.INTRO_TYPE_NUM.PEOPLE
                    }), _react2.default.createElement(_antd.Button, {
                        className: 'single-form-content-intro-operate-btn',
                        onClick: function onClick() {
                            me.handleAddIntroText(_config2.default.INTRO_TYPE_NUM.PEOPLE);
                        }
                    }, _react2.default.createElement('span', { className: 'icon-t' }), '添加文字'))), _react2.default.createElement(FormItem, _extends({}, formItemLayout, {
                        label: '你将获得',
                        className: 'single-form-content-intro'
                    }), state.intros.map(function (item) {
                        if (item.introType === _config2.default.INTRO_TYPE_NUM.GAIN) {
                            if (item.contentType === _config2.default.INTRO_CONTENT_TYPE.IMAGE) {
                                return _react2.default.createElement(_index12.default, {
                                    key: item.seq,
                                    seq: item.seq,
                                    onDelete: me.handleIntroDelete,
                                    url: item.url
                                });
                            }
                            return _react2.default.createElement(_index14.default, {
                                key: item.seq,
                                seq: item.seq,
                                onDelete: me.handleIntroDelete,
                                defaultValue: item.content,
                                onChange: me.handleIntroChange
                            });
                        }
                        return null;
                    }), _react2.default.createElement('div', { className: 'single-form-content-intro-operate' }, _react2.default.createElement(_index10.default, {
                        size: 5,
                        onUpload: me.handleIntroImageUpload,
                        type: _config2.default.INTRO_TYPE_NUM.GAIN
                    }), _react2.default.createElement(_antd.Button, {
                        className: 'single-form-content-intro-operate-btn',
                        onClick: function onClick() {
                            me.handleAddIntroText(_config2.default.INTRO_TYPE_NUM.GAIN);
                        }
                    }, _react2.default.createElement('span', { className: 'icon-t' }), '添加文字'))), _react2.default.createElement(FormItem, _extends({}, formTailLayout, { className: 'form-operate' }), _react2.default.createElement(_antd.Button, {
                        htmlType: 'submit',
                        className: 'md-btn classic-btn pink-btn',
                        loading: state.submitLoading,
                        disabled: state.submitLoading
                    }, '保存'), _react2.default.createElement('span', { className: me.state.courseType === _config2.default.PLAY_TYPE_NUM.VIDEO_COURSE ? 'form-operate-tip' : 'hide' }, '请在页面保存后再上传视频'))), state.showUploadButton ? _react2.default.createElement(_index16.default, {
                        courseId: state.courseId,
                        videoId: state.videoId,
                        videoName: state.videoName,
                        onCourseAddVideo: this.handleCourseAddVideo
                    }) : null, _react2.default.createElement('div', { id: 'video' }));
                }
            }
        ]);
        return SingleForm;
    }(_react2.default.Component);
    exports.default = (0, _reactRouter.withRouter)(_antd.Form.create()(SingleForm));
});