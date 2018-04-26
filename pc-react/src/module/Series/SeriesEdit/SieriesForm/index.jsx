/**
 * 系列课编辑内容
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { withRouter, hashHistory } from 'react-router';
import ImageUpload from 'common/components/ImageUpload/index';
import CourseRadio from 'common/components/CourseRadio/index';
import IntroUpload from 'common/components/IntroUpload/index';
import IntroImage from 'common/components/IntroImage/index';
import IntroTextArea from 'common/components/IntroTextArea/index';
import SubjectSelect from 'common/components/SubjectSelect/index';
import CONFIG from 'common/config';
import URL from 'common/util/url';
import service from 'common/util/ajaxService';
require('css-loader!./index.styl');

const params = URL().params;
const DEFAULT_COVER = 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a7d3ce98cc0e.png';
const DEFAULT_STORAGEID = -1;

class SeriesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            intros: [],
            submitLoading: false,
            seriesId: params.seriesId,
            storageId: DEFAULT_STORAGEID,
            coverUrl: DEFAULT_COVER
        };
        this.classroomId = Number(params.classroomId);
        this.isSaved = true;
    }

    /**
     * @override
     */
    componentWillMount() {
        if (this.state.seriesId) {
            service
                .get('/pc/series/getDetail', {
                    seriesId: this.state.seriesId
                })
                .then((res) => {
                    this.setState({
                        ...res.data,
                        coverUrl: res.data.storageId === DEFAULT_STORAGEID ? DEFAULT_COVER : res.data.coverUrl
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
            className: 'series-confirm',
            okType: 'ghost',
            width: 240,
            onOk() {
                me.isSaved = true;
                hashHistory.push(hash);
            }
        });
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
                this.setState({
                    submitLoading: true
                });
                this.submit(values);
            }
        });
    }

    /**
     * 课堂内容上传
     * @param {*} values 
     */
    submit = (values) => {
        if (!this.state.seriesId) {
            service
                .post('/pc/series/add', Object.assign(values, {
                    classroomId: Number(this.classroomId),
                    price: Number(values.price),
                    intros: this.state.intros,
                    planCourseCnt: Number(values.planCourseCnt)
                }))
                .then((res) => {
                    if (res && res.code === 200) { 
                        this.isNew = false;
                        this.setState({
                            submitLoading: false,
                            seriesId: res.data.seriesId
                        });
                        message.success('保存成功', 3);
                        this.isSaved = true;
                        history.back();
                    }
                }, () => {
                    this.setState({
                        submitLoading: false
                    });
                });
        } else {
            service
                .post('/pc/series/modify', Object.assign(values, {
                    seriesId: Number(this.state.seriesId),
                    price: Number(values.price),
                    intros: this.state.intros,
                    planCourseCnt: Number(values.planCourseCnt)
                }))
                .then((res) => {
                    if (res && res.code === 200) {
                        message.success('保存成功', 3);
                        this.isSaved = true;
                        this.setState({
                            submitLoading: false
                        });
                        history.back();
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
            coverUrl: file.url
        });
    }

    /**
     * 处理付费类型变化
     */
    handleSellTypeChange = (value) => {
        this.isSaved = false;
        this.setState({
            sellType: value
        });
    }  

     /**
     * 处理上传图片
     */
    handleIntroImageUpload = (type, file) => {
        this.isSaved = false;
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
     * 排课计划发生变化
     */
    handlePlanCourseCntChange = () => {
        this.isSaved = false;
    }

    /**
     * @override
     */
    render() {
        const me = this;
        const state = me.state;
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
            <div className="series-form form">
                <Form onSubmit={me.handleSubmit} className="series-form-content">
                    <div className="series-form-content-title">基本信息</div>
                    <FormItem {...formItemLayout} label="系列课名称" className="series-form-content-name">
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
                    <FormItem {...formItemLayout} label="排课计划" className="series-form-content-plan">
                        {
                            getFieldDecorator('planCourseCnt', {
                                initialValue: state.planCourseCnt,
                                rules: [{
                                    required: true,
                                    message: '请输入预计开设的课节数量'
                                },
                                {
                                    pattern: /^[1-9][0-9]*$/,
                                    message: '请输入大于0的数字'
                                }]
                            })(
                                <Input placeholder="请输入预计开设的课节数量" onChange={this.handlePlanCourseCntChange} />
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="课程封面" className="series-form-content-cover">
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
                                    onUpload={me.handleImageUpload} 
                                    size={5}
                                    tip="建议尺寸750像素*422像素，JPG、JPEG、PNG格式，图片小于5M。"
                                />
                            )
                        }   
                    </FormItem>
                    <FormItem {...formItemLayout} label="付费类型" className="series-form-content-type">
                        {
                            getFieldDecorator('sellType', {
                                initialValue: state.sellType,
                                rules: [{
                                    required: true,
                                    message: '请选择付费类型'
                                }]
                            })(
                                <CourseRadio defaultCourseType={state.sellType} onChange={me.handleSellTypeChange} options={sellType} />
                            )
                        }
                    </FormItem>
                   { 
                       state.sellType === CONFIG.SELL_TYPE_NUM.PAIED_COURSE ?
                            <FormItem {...formTailLayout} className="series-form-content-sell">
                                {
                                    getFieldDecorator('price', {
                                        initialValue: state.price,
                                        rules: [{
                                            required: true,
                                            message: '请输入课程售价'
                                        },
                                        {
                                            pattern: /^[1-9][0-9]{0,4}(.[0-9]{0,2})?$/,
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
                    <FormItem {...formItemLayout} label="所属科目" className="series-form-content-subject">
                        {
                            getFieldDecorator('subjectId', {
                                initialValue: state.secondId,
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
                    <div className="series-form-content-title">系列课介绍</div>
                    <FormItem {...formItemLayout} label="简介" className="series-form-content-intro">
                        {
                            state.intros.map((item) => {
                                if (item.introType === CONFIG.INTRO_TYPE_NUM.INTRO) {
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
                        <div className="series-form-content-intro-operate">
                            <IntroUpload size={5} onUpload={me.handleIntroImageUpload} type={CONFIG.INTRO_TYPE_NUM.INTRO} />
                            <Button className="series-form-content-intro-operate-btn" onClick={() => { me.handleAddIntroText(CONFIG.INTRO_TYPE_NUM.INTRO); }}><span className="icon-t" />添加文字</Button>
                        </div>
                    </FormItem>
                    <FormItem {...formItemLayout} label="关于讲师" className="series-form-content-intro">
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
                        <div className="series-form-content-intro-operate">
                            <IntroUpload size={5} onUpload={me.handleIntroImageUpload} type={CONFIG.INTRO_TYPE_NUM.TEACHER} />
                            <Button className="series-form-content-intro-operate-btn" onClick={() => { me.handleAddIntroText(CONFIG.INTRO_TYPE_NUM.TEACHER); }}><span className="icon-t" />添加文字</Button>
                        </div>
                    </FormItem>
                    <FormItem {...formItemLayout} label="适合人群" className="series-form-content-intro">
                        {
                            state.intros.map((item) => {
                                if (item.introType === CONFIG.INTRO_TYPE_NUM.PEOPLE) {
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
                        <div className="series-form-content-intro-operate">
                            <IntroUpload size={5} onUpload={me.handleIntroImageUpload} type={CONFIG.INTRO_TYPE_NUM.PEOPLE} />
                            <Button className="series-form-content-intro-operate-btn" onClick={() => { me.handleAddIntroText(CONFIG.INTRO_TYPE_NUM.PEOPLE); }}><span className="icon-t" />添加文字</Button>
                        </div>
                    </FormItem>
                    <FormItem {...formItemLayout} label="你将获得" className="series-form-content-intro">
                        {
                            state.intros.map((item) => {
                                if (item.introType === CONFIG.INTRO_TYPE_NUM.GAIN) {
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
                        <div className="series-form-content-intro-operate">
                            <IntroUpload size={5} onUpload={me.handleIntroImageUpload} type={CONFIG.INTRO_TYPE_NUM.GAIN} />
                            <Button className="series-form-content-intro-operate-btn" onClick={() => { me.handleAddIntroText(CONFIG.INTRO_TYPE_NUM.GAIN); }}><span className="icon-t" />添加文字</Button>
                        </div>
                    </FormItem>
                    <FormItem {...formTailLayout} className="form-operate">
                        <Button className="md-btn classic-btn white-btn">取消</Button>
                        <Button htmlType="submit" className="md-btn classic-btn pink-btn" loading={state.submitLoading} disabled={state.submitLoading}>保存</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default withRouter(Form.create()(SeriesForm));