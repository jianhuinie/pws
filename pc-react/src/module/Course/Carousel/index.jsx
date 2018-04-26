/**
 * 轮播图
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import PageController from 'common/controller/PageController';
import CarouselCard from './CarouselCard/index';
import service from 'common/util/ajaxService';
import { Button, message } from 'antd';
import URL from 'common/util/url';
require('css-loader!./index.styl');

const params = URL().params;

export default class Carousel extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            banners: []
        };
    }

    /**
     * @override
     */
    componentWillMount() {
        service
            .get('/pc/classroom/banner/list', {
                classroomId: Number(params.classroomId)
            })
            .then((res) => {
                const data = res.data;
                this.setState({ 
                    ...data 
                });
            });
    }

    /**
     * 更新数组
     */
    updateList = (list) => {
        return list.map((item, index) => {
            item.seq = index + 1;
            return item;
        });
    }

    /**
     * 处理轮播图的变化
     */
    handleChange = (id, obj) => {
        const list = this.state.banners.slice(0);
        list.splice(id - 1, 1, obj);
        this.setState({
            banners: list
        });
    }

    /**
     * 删除轮播图卡片
     */
    handleDeleteCardItem = (id) => {
        // 因为有CommonController的控制，必须重新赋值
        const list = this.state.banners.slice(0);
        list.splice(id - 1, 1);
        this.setState({
            banners: this.updateList(list)
        });
    }

    /**
     * 判断能否保存
     */
    canSave = () => {
        return this.state.banners.every((item) => {
            return (item.storageId !== undefined) 
                    && (item.courseType !== undefined) 
                    && (item.courseId !== undefined);
        });
    }
    
    /**
     * 处理上传的数据
     */
    handleSubmitData = () => {
        const banners = this.state.banners;
        banners.map((item) => {
            if (item.isNew) {
                item.bannerId = 0;
                delete item.isNew;
            }
            delete item.courseName;
            delete item.url;
            return item;
        });
        return { banners };
    }

    /**
     * 保存轮播图
     */
    handleSubmit = () => {
        const submitData = this.handleSubmitData();
        if (this.canSave()) {
            service
            .post('/pc/classroom/banner/save', Object.assign(submitData, {
                classroomId: Number(params.classroomId)
            }))
            .then((res) => {
                if (res && res.code === 200) {
                    message.success('保存成功', 3);
                }
            });
        } else {
            message.error('保存失败，信息填写不完整', 3);
        } 
    }

    /**
     * 添加轮播图卡片
     */
    handleAddCardItem = () => {
        const list = this.state.banners;
        const newItem = {
            seq: list.length + 1,
            bannerId: (new Date()).valueOf(),
            isNew: true
        };
        this.setState({
            banners: list.concat([newItem])
        });
    } 

    /**
     * 处理item顺序变化
     */
    handleChangeSeq = (sourceId, siblingId) => {
        const list = this.state.banners.slice(0);
        const item = list[sourceId - 1];
        if (siblingId) {
            if (siblingId === sourceId) {
                return;
            }
            // 当把元素往前移动
            if (sourceId > siblingId) {
                list.splice(sourceId - 1, 1);
                list.splice(siblingId - 1, 0, item);
            } else {
                list.splice(siblingId - 1, 0, item);
                list.splice(sourceId - 1, 1);
            }       
        } else {
            list.splice(sourceId - 1, 1);
            list.push(item);
        }
        this.setState({
            banners: this.updateList(list)
        });
    }
    

    /**
     * @override
     */
    render() {
        return (
            <div className="course-carousel">
                <div className="course-carousel-content">
                    <div className="course-carousel-content-image">
                        <img alt="轮播示意图" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a8132f96c101.png" /> 
                    </div>
                    <div className="course-carousel-content-card">
                        <CarouselCard 
                            list={this.state.banners} 
                            onChange={this.handleChange} 
                            onDelete={this.handleDeleteCardItem}
                            onAdd={this.handleAddCardItem} 
                            onChangeSeq={this.handleChangeSeq}
                        />
                        <div className="course-carousel-content-card-tip">
                            <p>1. 添加课堂轮播图，课堂主页头部将如左图所示</p>
                            <p>2. 使用课堂轮播图推广热门课程</p>
                        </div>
                    </div>
                </div>
                <div className="course-carousel-save-button">
                    <Button className="pink-btn lg-btn classic-btn" onClick={this.handleSubmit}>保存</Button>
                </div>
            </div>
        );
    }
} 