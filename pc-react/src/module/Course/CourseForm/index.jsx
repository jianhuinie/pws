/**
 * 课堂信息修改
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Form, Input, Button, message } from 'antd';
import ImageUpload from 'common/components/ImageUpload/index';
import service from 'common/util/ajaxService';
import URL from 'common/util/url';
require('css-loader!./index.styl');

const url = URL();

class CourseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submitLoading: false
        };
    }

    /**
     * @override
     */
    componentWillMount() {
        service
            .get('/pc/classroom/getDetail')
            .then((res) => {
                const data = res.data;
                this.setState({ 
                    ...data 
                });
            });
    }

    /**
     * 图片上传完成后的回调
     * @param {*} file 
     */
    handleImageUpload = (file) => {
        this.props.form.setFieldsValue({
            storageId: file.uid
        });
        this.setState({
            storageId: file.uid,
            headUrl: file.url
        });
    }
    
    /**
     * 课堂内容上传
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
     * 修改课堂
     * @param {*} values 
     */
    submit = (values) => {
        service
            .post('/pc/classroom/modify', Object.assign(values, {
                classroomId: Number(url.params.classroomId)
            }))
            .then((res) => {
                if (res && res.code === 200) {
                    message.success('保存成功', 3);
                    this.setState({
                        submitLoading: false
                    });
                    url.params.name = values.name;
                    url.hash = location.hash;
                    location.href = url.toString();
                }
            }, () => {
                this.setState({
                    submitLoading: false
                });
            });
    }

    /**
     * @override
     */
    render() {
        const me = this;
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
        const { TextArea } = Input;
        return (
            <div className="course-form form">
                <Form onSubmit={this.handleSubmit} className="course-form-content">
                    <FormItem {...formItemLayout} label="课堂名称" className="course-form-content-name">
                        {
                            getFieldDecorator('name', {
                                initialValue: me.state.name || '',
                                rules: [
                                    {
                                        required: true,
                                        validator: (rule, value, callback) => {
                                            // 课堂名称长度在1-12字之间
                                            if (value) {
                                                if (value.length > 20 || value.length < 3) {
                                                    callback('课堂名称长度需在3-20字之间');
                                                }
                                                callback();
                                            } else {
                                                callback('请输入课堂名称');
                                            }  
                                        }
                                    }
                                ]
                            })(
                                <Input maxLength="20" />
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="课堂简介" className="course-form-content-intro">
                        {
                            getFieldDecorator('intro', {
                                initialValue: me.state.intro || '',
                                rules: [{
                                    validator: (rule, value, callback) => {
                                        // 简介不是必须有，但是长度是300字以内
                                        if (value.length > 300) {
                                            callback('课堂简介长度需在0-300字之间');
                                        }
                                        callback();
                                    }
                                }]
                            })(
                                <TextArea />
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="课堂头像" className="course-form-content-avatar">
                        {
                            getFieldDecorator('storageId', {
                                initialValue: me.state.storageId || '',
                            })(
                                <ImageUpload 
                                    storageId={me.state.storageId} 
                                    url={me.state.headUrl} 
                                    onUpload={me.handleImageUpload} 
                                />
                            )
                        } 
                        
                    </FormItem>
                    <FormItem {...formTailLayout} className="form-operate">
                        <a className="ant-btn md-btn classic-btn white-btn" href={me.state.url} target="_blank">预 览</a>
                        <Button htmlType="submit" className="md-btn classic-btn pink-btn" loading={me.state.submitLoading} disabled={me.state.submitLoading}>保存</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(CourseForm);