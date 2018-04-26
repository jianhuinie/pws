/**
 * 轮播图的单个卡片
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React, { PropTypes } from 'react';
import PageController from 'common/controller/PageController';
import CourseAutoComplete from 'common/components/CourseAutoComplete/index';
import CarouselUpload from '../CarouselUpload/index';
import Selection from 'common/components/Selection/index';
import { Popconfirm } from 'antd';
require('css-loader!./index.styl');

export default class CarousleCardItem extends PageController {

    static propTypes = {
        item: PropTypes.object,
        onChange: PropTypes.func,
        onDelete: PropTypes.func
    };
    
    constructor(props) {
        super(props);
        this.state = {
            ...props.item
        };
    }

    /**
     * 使组件受控
     * @param {*} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps.item
        });
    }

    /**
     * 处理图片上传
     */
    handleImageUpload = (file) => {
        this.setState({
            storageId: file.uid,
            url: file.url
        });
        this.props.onChange(this.state.seq, Object.assign(this.state, {
            storageId: file.uid,
            url: file.url
        }));
    }

    /**
     * 处理课程类型变化
     */
    handleSelectionChange = (value) => {
        this.setState({
            courseType: value,
            courseId: undefined,
            courseName: ''
        }, () => {
            this.props.onChange(this.state.seq, Object.assign(this.state, {
                courseType: value
            }));
        });
    };

    /**
     * 处理课程名称变化
     */
    handleCourseChange = (value) => {
        const list = value.split(' ');
        this.setState({
            courseId: Number(list[0]),
            courseName: list[1]
        });
        this.props.onChange(this.state.seq, Object.assign(this.state, {
            courseId: Number(list[0]),
            courseName: list[1]
        }));
    };

    handleDeleteName = (value) => {
        this.setState({
            courseName: value
        });
        if (value === '') {
            this.props.onChange(this.state.seq, Object.assign(this.state, {
                courseId: undefined,
                courseName: ''
            }));
        }
    }

    render() {
        // 课程类型
        const CourseSelection = [
            {
                id: 1,
                name: '单次课'
            }, 
            {
                id: 2,
                name: '系列课'
            }
        ];
        const state = this.state;
        return (
            <div className="carousle-card-item" id={state.seq}>
                <span className="carousle-card-item-seq">{state.seq}</span>
                <Popconfirm 
                    placement="topRight"
                    title="确定要删除这张图片吗" 
                    onConfirm={
                        () => this.props.onDelete(state.seq)
                    }
                    okText="确定" 
                    cancelText="取消"
                    className="popconfirm"
                    overlayClassName="popconfirm-overlay"
                >
                    <span className="icon-Combined-Shape" />
                </Popconfirm>
                <div className="carousle-card-item-content">
                    <div className="carousle-card-item-image">
                        <CarouselUpload 
                            url={state.url} 
                            onUpload={this.handleImageUpload} 
                            storageId={state.storageId} 
                        />
                    </div>
                    <div className="carousle-card-item-selection">
                        <div>
                            <span className="carousle-card-item-selection-label">课程类型</span>
                            <Selection 
                                placeholder="请输入课程类型" 
                                onSelectionChange={this.handleSelectionChange} 
                                options={CourseSelection} 
                                defaultValue={state.courseType}
                            />
                        </div>
                        <div>
                            <span className="carousle-card-item-selection-label">跳转链接</span>
                            <CourseAutoComplete 
                                onDelete={this.handleDeleteName}
                                defaultName={state.courseName} 
                                type={state.courseType} 
                                onChange={this.handleCourseChange} 
                                tip="请输入课程名称"
                            />
                        </div>
                    </div>
                </div>
                {
                    state.storageId ? 
                        state.courseType ?
                            state.courseId ?
                            null
                            :
                            <span className="carousle-card-item-text">请输入课程名称</span>
                        :
                        <span className="carousle-card-item-text">请选择课程类型</span>
                    : 
                    <span className="carousle-card-item-text">未上传图片</span>
                }
            </div>
        );
    }
}