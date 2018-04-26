/**
 * 单次课编辑内容
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Form, Input, Button, message, Checkbox, Modal } from 'antd';
import { withRouter, hashHistory } from 'react-router';
import ImageUpload from 'common/components/ImageUpload/index';
import CourseRadio from 'common/components/CourseRadio/index';
import CarousleAutoComplete from 'common/components/CourseAutoComplete/index';
import SubjectSelect from 'common/components/SubjectSelect/index';
// import CourseDatePicker from 'common/components/CourseDatePicker/index';
import IntroUpload from 'common/components/IntroUpload/index';
import IntroImage from 'common/components/IntroImage/index';
import IntroTextArea from 'common/components/IntroTextArea/index';
import VideoUpload from '../VideoUpload/index';
import CONFIG from 'common/config';
import URL from 'common/util/url';
import service from 'common/util/ajaxService';
import moment from 'moment';
import DateTime from 'common/components/DateTime/index';
require('css-loader!./index.styl');

const url = URL();

const DEFAULT_COVER = 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a7d3ce98cc0e.png';
const DEFAULT_STORAGEID = -1;
const BEGIN_TIME_NAME = 'newBeginTime';
const END_TIME_NAME = 'newEndTime';

class SingleForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            intros: [],
            showUploadButton: !!url.params.courseId,
            courseId: url.params.courseId,
            seriesId: url.params.seriesId,
            submitLoading: false,
            showLeaveConfirm: false,
            storageId: DEFAULT_STORAGEID,
            coverUrl: DEFAULT_COVER
        };
        this.classroomId = Number(url.params.classroomId);
        this.isSaved = true;
    }

    /**
     * @override
     */
    componentWillMount() {
        const self = this;
        if (url.params.seriesId) {
            service
                .get('/pc/series/getBaseInfo', {
                    seriesId: url.params.seriesId
                })
                .then((res) => {
                    this.setState({
                        seriesName: res.data.name
                    });
                });
        }
        if (url.params.courseId) {
            service
                .get('/pc/course/getDetail', {
                    courseId: url.params.courseId
                })
                .then((res) => {
                    this.setState({
                        ...res.data,
                        showUploadButton: res.data.courseType === CONFIG.PLAY_TYPE_NUM.VIDEO_COURSE,
                        coverUrl: res.data.storageId === DEFAULT_STORAGEID ? DEFAULT_COVER : res.data.coverUrl
                    }, () => {
                        this.handlePosition();
                        self.initTime(res.data);
                    });
                });
        }
    }

    /**
     * @override
     */
    componentDidMount() {
        this.props.router.setRouteLeaveHook(this.props.routes[2], (nextLocation) => {
            if (this.isSaved) {
                return true;
            } else {
                this.confirm(nextLocation.pathname);
                return false;
            }
        });
    }

    initTime = (data) => {
        if (data.beginTime) {
            const beginTime = moment(data.beginTime).format('YYYY-MM-DD HH:mm');
            $('.date-time').eq(0).find('.form-control').val(beginTime);
            $('#' + BEGIN_TIME_NAME).val(beginTime + ':00');
        }
        if (data.endTime && $('.date-time').length > 1) {
            const endTime = moment(data.endTime).format('YYYY-MM-DD HH:mm');
            $('.date-time').eq(1).find('.form-control').val(endTime);
            $('#' + END_TIME_NAME).val(endTime + ':00');
        }
    }

    /**
     * 确认弹出框
     */
    confirm = (hash) => {
        const me = this;
        Modal.confirm({
            title: '确定要离开当前页面吗？',
            content: '课程内容还未保存，离开将会丢弃',
            okText: '确认',
            cancelText: '取消',
            className: 'single-confirm',
            okType: 'ghost',
            width: 240,
            onOk() {
                me.isSaved = true;
                hashHistory.push(hash);
            }
        });
    }

    /**
     * 调整位置
     */
    handlePosition = () => {
        const hashParts = window.location.hash.split('#');
        if (hashParts.length > 2) {
            const hash = hashParts.slice(-1)[0];
            document.querySelector(`#${hash}`).scrollIntoView();
        }
    }

    /**
     * 课堂内容上传前检测
     */
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll({
            force: true
        }, (err, values) => {
            if (err) {
                console.log(err);
            } else {
                this.submit(values);
            }
        });
    }

    /**
     * 课堂内容上传
     * @param {*} values 
     */
    submit = (values) => {
        const self = this;
        const state = self.state;
        const isSellFlag = state.seriesId && state.sellType === CONFIG.SELL_TYPE_NUM.FREE_COURSE;
        const params = Object.assign(values, {
            classroomId: this.classroomId,
            seriesId: values.seriesId ? Number((values.seriesId + '').split(' ')[0]) : null,
            price: Number(values.price),
            intros: this.state.intros
        });
        if (isSellFlag) {
            params.isSell = true;
        }
        const beginTimeStr = $('#' + BEGIN_TIME_NAME).val();
        if (!beginTimeStr) {
            message.error('请选择开讲时间');
            return;
        }
        const beginTimeVal = +new Date($('#' + BEGIN_TIME_NAME).val());
        if (beginTimeVal < +new Date()) {
            message.error('开讲时间不能早于当前时间');
            return;
        }
        params.beginTime = beginTimeVal;
        if (params.courseType === 1) {
            const endTimeStr = $('#' + END_TIME_NAME).val();
            if (!endTimeStr) {
                message.error('请选择开讲时间');
                return;
            }
            const endTimeVal = +new Date(endTimeStr);
            if (endTimeVal < beginTimeVal) {
                message.error('结束时间不能早于开始时间');
                return;
            }

            if (endTimeVal - beginTimeVal > 24 * 60 * 60 * 1000) {
                message.error('直播课上课时长不能超过24小时');
                return;
            }
            params.endTime = endTimeVal;
        }
        self.setState({
            submitLoading: true
        });
        if (!this.state.courseId) {
            service
                .post('/pc/course/add', params)
                .then((res) => {
                    if (res && res.code === 200) {
                        message.success('保存成功', 3);
                        this.setState({
                            showUploadButton: values.courseType === CONFIG.PLAY_TYPE_NUM.VIDEO_COURSE,
                            courseId: res.data.courseId,
                            submitLoading: false
                        });
                        this.isSaved = true;
                        if (values.courseType === CONFIG.PLAY_TYPE_NUM.LIVE_COURSE) {
                            history.back();
                        }
                    }
                }, () => {
                    this.setState({
                        submitLoading: false
                    });
                });
        } else {
            params.courseId = Number(this.state.courseId);
            service
                .post('/pc/course/modify', params)
                .then((res) => {
                    if (res && res.code === 200) {
                        message.success('保存成功', 3);
                        this.setState({
                            submitLoading: false
                        });
                        this.isSaved = true;
                        if (values.courseType === CONFIG.PLAY_TYPE_NUM.LIVE_COURSE) {
                            history.back();
                        }
                    }
                }, () => {
                    this.setState({
                        submitLoading: false
                    });
                });
        }
    }

    /**
     * 处理图片上传 
     */
    handleImageUpload = (file) => {
        this.isSaved = false;
        this.props.form.setFieldsValue({
            storageId: file.uid
        });
        this.setState({
            storageId: file.uid,
            headUrl: file.url
        });
    }

    /**
     * 处理开始时间变化
     */
    handleStartChange = (time) => {
        this.isSaved = false;
        this.props.form.setFieldsValue({
            beginTime: time
        });
    }

    /**
     * 处理结束时间变化
     */
    handleEndChange = (time) => {
        this.isSaved = false;
        this.props.form.setFieldsValue({
            endTime: time
        });
    }
    
    /**
     * 处理付费类型变化
     */
    handleSellTypeChange = (value) => {
        this.isSaved = false;
        this.setState({
            sellType: value,
            isSell: this.state.seriesId && value === CONFIG.SELL_TYPE_NUM.FREE_COURSE
        });
    }   

    /**
     * 处理视频类型变化
     */
    handlePlayTypeChange = (value) => {
        this.isSaved = false;
        this.setState({
            courseType: value,
            showUploadButton: this.state.courseId && value === CONFIG.PLAY_TYPE_NUM.VIDEO_COURSE // 保证已经保存过才能添加视频
        });
    }

    /**
     * 处理系列课里可单卖
     */
    handleSeriesSell = (value) => {
        this.isSaved = false;
        const state = this.state;
        this.props.form.setFieldsValue({
            isSell: (state.seriesId && state.sellType === CONFIG.SELL_TYPE_NUM.FREE_COURSE) || value   // 免费课在系列课中必须可单卖
        });
        this.setState({
            isSell: (state.seriesId && state.sellType === CONFIG.SELL_TYPE_NUM.FREE_COURSE) || value
        });
    }

    /**
     * 处理上传图片
     */
    handleIntroImageUpload = (type, file) => {
        const newIntro = {
            introType: type,
            contentType: CONFIG.INTRO_CONTENT_TYPE.IMAGE,
            url: file.url,
            content: file.uid
        };
        const index = this.findInsertPositioin(type);
        this.state.intros.splice(index, 0, newIntro);
        this.setState({
            intros: this.updateIntro(this.state.intros)
        });
    }

    /**
     * 添加简介文字
     */
    handleAddIntroText = (type) => {
        this.isSaved = false;
        const newIntro = {
            introType: type,
            contentType: CONFIG.INTRO_CONTENT_TYPE.TEXT
        };
        const index = this.findInsertPositioin(type);
        this.state.intros.splice(index, 0, newIntro);
        this.setState({
            intros: this.updateIntro(this.state.intros)
        });
    }

    /**
     * 修改简介文字
     */
    handleIntroChange = (index, content) => {
        this.isSaved = false;
        this.state.intros[index - 1].content = content;
        this.setState({
            intros: this.state.intros
        });
    }

    /**
     * 删除图片或是文字
     */
    handleIntroDelete = (seq) => {
        this.isSaved = false;
        const list = this.state.intros;
        list.splice(seq - 1, 1);
        this.setState({
            intros: this.updateIntro(list)
        });
    }

    /**
     * 找到插入位置
     */
    findInsertPositioin = (type) => {
        const intros = this.state.intros;
        const len = intros.length;
        let insertPosition = 0;
        for (let i = 0; i < len; i++) {
            if (intros[i].introType <= type) {
                insertPosition = i + 1;
            }
        }
        return insertPosition;
    }

    /**
     * 更新intro的seq
     */
    updateIntro = (list) => {
        return list.map((item, index) => {
            item.seq = index + 1;
            return item;
        });
    }

    /**
     * 清空系列名
     */
    handleClearSeries = (value) => {
        if (value === '') {
            this.setState({
                seriesId: null,
                seriesName: value
            });
        } else {
            this.setState({
                seriesName: value
            });
        }
    }

    /**
     * 处理系列名
     */
    handleSeriesChange = (value) => {
        this.isSaved = false;
            const list = value.split(' ');
            this.setState({
                seriesId: Number(list[0]),
                isSell: this.state.sellType === CONFIG.SELL_TYPE_NUM.FREE_COURSE
            });
        }

    /**
     * 处理名字改变
     */
    handleNameChange = () => {
        this.isSaved = false;
    }

    /**
     * 处理价钱变化
     */
    handlePriceChange = () => {
        this.isSaved = false;
    }

    /**
     * 处理科目变化
     */
    handleSubjectChange = () => {
        this.isSaved = false;
    }

    /**
     * 确定添加视频
     */
    handleCourseAddVideo = (videoId) => {
        service
            .post('/pc/course/uploadVideo', {
                courseId: Number(this.state.courseId),
                videoId: videoId
            })
            .then((res) => {
                if (res && res.code === 200) {
                    hashHistory.push(url.params.from);
                }
            });
    }

    /**
     * @override
     */
    render() {
        const me = this;
        const state = me.state;
        const playType = [
            {
                id: CONFIG.PLAY_TYPE_NUM.LIVE_COURSE,
                name: CONFIG.PLAY_TYPE_STRING[CONFIG.PLAY_TYPE_NUM.LIVE_COURSE]
            },
            {
                id: CONFIG.PLAY_TYPE_NUM.VIDEO_COURSE,
                name: CONFIG.PLAY_TYPE_STRING[CONFIG.PLAY_TYPE_NUM.VIDEO_COURSE]
            }
        ];
        const sellType = [
            {
                id: CONFIG.SELL_TYPE_NUM.FREE_COURSE,
                name: CONFIG.SELL_TYPE_STRING[CONFIG.SELL_TYPE_NUM.FREE_COURSE]
            },
            {
                id: CONFIG.SELL_TYPE_NUM.PAIED_COURSE,
                name: CONFIG.SELL_TYPE_STRING[CONFIG.SELL_TYPE_NUM.PAIED_COURSE]
            }
        ];
        const formItemLayout = {
            labelCol: {
                span: 3
            },
            wrapperCol: {
                span: 21
            }
        };
        const formTailLayout = {
            labelCol: { 
                span: 3
            },
            wrapperCol: { 
                span: 21, offset: 3 
            },
        };
        const FormItem = Form.Item;
        const { getFieldDecorator } = me.props.form;
        return (
            <div className="single-form form">
                <Form onSubmit={me.handleSubmit} className="single-form-content">
                    <FormItem {...formItemLayout} label="课程名称" className="single-form-content-name">
                        {
                            getFieldDecorator('name', {
                                initialValue: state.name,
                                rules: [
                                    {
                                        required: true,
                                        validator: (rule, value, callback) => {
                                            // 课程名称长度在1-20字之间
                                            if (value) {
                                                if (value.length > 20) {
                                                    callback('课程名称最多输入20个汉字');
                                                }
                                                callback();
                                            } else {
                                                callback('请输入课程名称');
                                            }  
                                        }
                                    }
                                ]
                            })(
                                <Input placeholder="请输入课程名称，最多输入20个汉字" onChange={this.handleNameChange} />
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="课程封面" className="single-form-content-cover">
                        {
                            getFieldDecorator('storageId', {
                                initialValue: state.storageId,
                                rules: [
                                    {
                                        required: true,
                                        message: '请上传课程封面'
                                    }
                                ]
                            })(
                                <ImageUpload 
                                    storageId={state.storageId} 
                                    url={state.coverUrl} 
                                    size={5}
                                    onUpload={me.handleImageUpload}
                                    tip="建议尺寸750像素*422像素，JPG、JPEG、PNG格式，图片小于5M。"
                                />
                            )
                        } 
                        
                    </FormItem>
                    <FormItem {...formItemLayout} label="课程类型" className="single-form-content-type">
                        {
                            getFieldDecorator('courseType', {
                                initialValue: state.courseType,
                                rules: [{
                                    required: true,
                                    message: '请选择课程类型'
                                }]
                            })(
                                <CourseRadio 
                                    defaultCourseType={state.courseType} 
                                    onChange={me.handlePlayTypeChange} 
                                    options={playType} 
                                />
                            )
                        }
                    </FormItem>
                    <div className="ant-row ant-form-item single-form-content-type">
                        <div className="ant-col-3 ant-form-item-label">
                            <label htmlFor="sellType" className="ant-form-item-required" title="开讲时间">开讲时间</label>
                        </div>
                        <div className="ant-col-21 ant-form-item-control-wrapper">
                            <DateTime 
                                defaultBegin={state.beginTime}
                                idName={BEGIN_TIME_NAME}
                            />
                            {
                                state.courseType === 1
                                ?
                                <DateTime 
                                    defaultBegin={state.endTime}
                                    idName={END_TIME_NAME}
                                />
                                :
                                null
                            }
                        </div>
                    </div>
                    {/* {
                        state.courseType
                        ?
                        <FormItem {...formItemLayout} label="开讲时间">
                            {
                                getFieldDecorator('beginTime', {
                                    initialValue: state.beginTime,
                                    rules: [{
                                        required: true,
                                        validator: (rule, value, callback) => {
                                            if (value) {
                                                if (value < moment()) {
                                                    callback('开始时间不能早于当前时间');
                                                }
                                                callback();
                                            } else {
                                                callback('请选择开始时间');
                                            }  
                                        }
                                    }
                                ]
                                })(
                                    <CourseDatePicker 
                                        isRange={state.courseType === CONFIG.PLAY_TYPE_NUM.LIVE_COURSE} 
                                        onStartChange={me.handleStartChange}
                                        onEndChange={me.handleEndChange} 
                                        defaultBegin={state.beginTime}
                                        defaultEnd={state.endTime}
                                    />
                                )
                            }
                        </FormItem>
                        :
                        null
                    } */}
                    {/* {
                        state.courseType === CONFIG.PLAY_TYPE_NUM.LIVE_COURSE
                        ?
                        <FormItem {...formTailLayout} className="single-form-content-end">
                        {
                            getFieldDecorator('endTime', {
                                initialValue: state.endTime,
                                rules: [{
                                    required: true,
                                    validator: (rule, value, callback) => {
                                        const startTime = this.props.form.getFieldValue('beginTime');
                                        if (value) {
                                            if (value < startTime) {
                                                callback('结束时间不能早于开始时间');
                                            }
                                            callback();
                                        } else {
                                            callback('请选择结束时间');
                                        }  
                                    }
                                }]
                            })(
                                <Input type="hidden" />
                            )
                        }
                        </FormItem>
                        :
                        null
                    } */}
                    <FormItem {...formItemLayout} label="付费类型" className="single-form-content-type">
                        {
                            getFieldDecorator('sellType', {
                                initialValue: state.sellType,
                                rules: [{
                                    required: true,
                                    message: '请选择付费类型'
                                }]
                            })(
                                <CourseRadio 
                                    defaultCourseType={state.sellType} 
                                    onChange={me.handleSellTypeChange} 
                                    options={sellType} 
                                />
                            )
                        }
                    </FormItem>
                   { 
                       state.sellType === CONFIG.SELL_TYPE_NUM.PAIED_COURSE ?
                            <FormItem {...formTailLayout} className="single-form-content-sell">
                                {
                                    getFieldDecorator('price', {
                                        initialValue: state.price,
                                        rules: [{
                                            required: true,
                                            message: '请输入课程售价'
                                        },
                                        {
                                            pattern: /^[1-9][0-9]{0,4}(\.[0-9]{1,2})?$/,
                                            message: '请输入数字，最低1元，最高99999元，最多两位小数'
                                        }]
                                    })(
                                        <Input 
                                            placeholder="请输入课程售价，最低1元"
                                            prefix={<span>￥</span>}
                                            onChange={this.handlePriceChange}
                                        />
                                    )
                                }
                            </FormItem>
                            :
                            null
                    }
                    <FormItem {...formItemLayout} label="所属科目" className="single-form-content-subject">
                        {
                            getFieldDecorator('subjectId', {
                                initialValue: state.thirdId || state.secondId,
                                rules: [{
                                    required: true,
                                    message: '请选择所属科目'
                                }]
                            })(
                                <SubjectSelect
                                    firstId={state.firstId}
                                    secondId={state.secondId}
                                    thirdId={state.thirdId}
                                    onChange={this.handleSubjectChange}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属系列课" className="single-form-content-pay-type">
                        {
                            getFieldDecorator('seriesId', {
                                initialValue: state.seriesId,
                            })(
                                <CarousleAutoComplete 
                                    defaultName={state.seriesName} 
                                    type={CONFIG.COURSE_TYPE_NUM.SERIES_COURSE}
                                    tip="请输入系列课名称"
                                    onChange={me.handleSeriesChange}
                                    onDelete={me.handleClearSeries}
                                />
                            )
                        } 
                    </FormItem>
                   {    
                       state.seriesId 
                        ?
                        (
                            <FormItem {...formTailLayout} className="single-form-content-pay-sell">
                                {
                                        getFieldDecorator('isSell', {
                                            initialValue: state.isSell
                                        })(
                                        <Checkbox checked={state.isSell} onChange={(e) => { me.handleSeriesSell(e.target.checked); }}>系列课内可单卖</Checkbox>
                                    )
                                }
                            </FormItem>
                        )
                        :
                        null
                    }
                    <FormItem {...formItemLayout} label="课程简介" className="single-form-content-intro">
                        {
                            state.intros.map((item) => {
                                if (item.introType === CONFIG.INTRO_TYPE_NUM.INTRO) {
                                    // 如果是图片
                                    if (item.contentType === CONFIG.INTRO_CONTENT_TYPE.IMAGE) {
                                        return (
                                            <IntroImage 
                                                key={item.seq} 
                                                seq={item.seq} 
                                                onDelete={me.handleIntroDelete} 
                                                url={item.url} 
                                            />
                                        );
                                    }
                                    return (
                                        <IntroTextArea 
                                            key={item.seq} 
                                            seq={item.seq} 
                                            onDelete={me.handleIntroDelete} 
                                            defaultValue={item.content} 
                                            onChange={me.handleIntroChange}
                                        />
                                    );
                                }
                                return null;
                            })
                        }
                        <div className="single-form-content-intro-operate">
                            <IntroUpload 
                                size={5}
                                onUpload={me.handleIntroImageUpload} 
                                type={CONFIG.INTRO_TYPE_NUM.INTRO} 
                            />
                            <Button 
                                className="single-form-content-intro-operate-btn" 
                                onClick={() => { me.handleAddIntroText(CONFIG.INTRO_TYPE_NUM.INTRO); }}
                            >
                                <span className="icon-t" />
                                添加文字
                            </Button>
                        </div>
                    </FormItem>
                    <FormItem {...formItemLayout} label="关于讲师" className="single-form-content-intro">
                        {
                            state.intros.map((item) => {
                                if (item.introType === CONFIG.INTRO_TYPE_NUM.TEACHER) {
                                    // 如果是图片
                                    if (item.contentType === CONFIG.INTRO_CONTENT_TYPE.IMAGE) {
                                        return (
                                            <IntroImage key={item.seq} seq={item.seq} onDelete={me.handleIntroDelete} url={item.url} />
                                        );
                                    } 
                                    return (
                                        <IntroTextArea key={item.seq} seq={item.seq} onDelete={me.handleIntroDelete} defaultValue={item.content} onChange={me.handleIntroChange} />
                                    );
                                }
                                return null;
                            })
                        }
                        <div className="single-form-content-intro-operate">
                            <IntroUpload size={5} onUpload={me.handleIntroImageUpload} type={CONFIG.INTRO_TYPE_NUM.TEACHER} />
                            <Button className="single-form-content-intro-operate-btn" onClick={() => { me.handleAddIntroText(CONFIG.INTRO_TYPE_NUM.TEACHER); }}><span className="icon-t" />添加文字</Button>
                        </div>
                    </FormItem>
                    <FormItem {...formItemLayout} label="适合人群" className="single-form-content-intro">
                        {
                            state.intros.map((item) => {
                                if (item.introType === CONFIG.INTRO_TYPE_NUM.PEOPLE) {
                                    // 如果是图片
                                    if (item.contentType === CONFIG.INTRO_CONTENT_TYPE.IMAGE) {
                                        return (
                                            <IntroImage 
                                                key={item.seq} 
                                                seq={item.seq} 
                                                onDelete={me.handleIntroDelete} 
                                                url={item.url} 
                                            />
                                        );
                                    }
                                    return (
                                        <IntroTextArea 
                                            key={item.seq} 
                                            seq={item.seq} 
                                            onDelete={me.handleIntroDelete} 
                                            defaultValue={item.content} 
                                            onChange={me.handleIntroChange} 
                                        />
                                    );
                                }
                                return null;
                            })
                        }
                        <div className="single-form-content-intro-operate">
                            <IntroUpload 
                                size={5}
                                onUpload={me.handleIntroImageUpload} 
                                type={CONFIG.INTRO_TYPE_NUM.PEOPLE}
                            />
                            <Button 
                                className="single-form-content-intro-operate-btn" 
                                onClick={() => { me.handleAddIntroText(CONFIG.INTRO_TYPE_NUM.PEOPLE); }}>
                                <span className="icon-t" />
                                添加文字
                            </Button>
                        </div>
                    </FormItem>
                    <FormItem {...formItemLayout} label="你将获得" className="single-form-content-intro">
                        {
                            state.intros.map((item) => {
                                if (item.introType === CONFIG.INTRO_TYPE_NUM.GAIN) {
                                    // 如果是图片
                                    if (item.contentType === CONFIG.INTRO_CONTENT_TYPE.IMAGE) {
                                        return (
                                            <IntroImage 
                                                key={item.seq} 
                                                seq={item.seq} 
                                                onDelete={me.handleIntroDelete} 
                                                url={item.url} 
                                            />
                                        );
                                    }
                                    return (
                                        <IntroTextArea 
                                            key={item.seq} 
                                            seq={item.seq} 
                                            onDelete={me.handleIntroDelete} 
                                            defaultValue={item.content} 
                                            onChange={me.handleIntroChange}
                                        />
                                    );
                                }
                                return null;
                            })
                        }
                        <div className="single-form-content-intro-operate">
                            <IntroUpload
                                size={5} 
                                onUpload={me.handleIntroImageUpload} 
                                type={CONFIG.INTRO_TYPE_NUM.GAIN} 
                            />
                            <Button className="single-form-content-intro-operate-btn" onClick={() => { me.handleAddIntroText(CONFIG.INTRO_TYPE_NUM.GAIN); }}><span className="icon-t" />添加文字</Button>
                        </div>
                    </FormItem>
                    <FormItem {...formTailLayout} className="form-operate">
                        <Button htmlType="submit" className="md-btn classic-btn pink-btn" loading={state.submitLoading} disabled={state.submitLoading}>保存</Button>
                        <span className={me.state.courseType === CONFIG.PLAY_TYPE_NUM.VIDEO_COURSE ? 'form-operate-tip' : 'hide'}>
                            请在页面保存后再上传视频
                        </span>
                    </FormItem>
                </Form>
                {
                    state.showUploadButton 
                    ?
                    <VideoUpload courseId={state.courseId} videoId={state.videoId} videoName={state.videoName} onCourseAddVideo={this.handleCourseAddVideo} />
                    : 
                    null
                }
                <div id="video" />
            </div>
        );
    }
}

export default withRouter(Form.create()(SingleForm));