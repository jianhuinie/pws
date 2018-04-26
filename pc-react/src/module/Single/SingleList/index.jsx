/**
 * 单次课列表
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Breadcrumb, Button } from 'antd';
import CourseSearch from 'common/components/CourseSearch/index';
import SingleTable from './SingleTable/index';
import URL from 'common/util/url';
import util from 'common/util/util';
require('css-loader!./index.styl');

export default class SingleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: undefined
        };
    }

    /**
     * @override
     */
    componentDidMount() {
        util.renderLeftSider();
    }

    /**
     * 处理搜索
     */
    handleSearch = (value) => {
        this.setState({
            query: value
        });
    }

    /**
     * render
     */
    render() {
        const url = URL();
        url.params.courseId = undefined;
        url.hash = '#/single/edit';
        url.params.seriesId = undefined;
        url.params.from = '/single';
        return (
            <div className="single-list">
                <Breadcrumb>
                    <Breadcrumb.Item>{URL().params.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>课程管理</Breadcrumb.Item>
                    <Breadcrumb.Item>单次课</Breadcrumb.Item>
                </Breadcrumb>
                <div className="single-list-operation">
                    <div className="single-list-operation-add">
                        <Button className="classic-btn pink-btn single-list-operation-add-button"><a href={url.toString()}>新建单次课</a></Button>
                        <span className="single-list-operation-add-text">本列表不显示已归属系列课里的单次课</span>
                    </div>
                    <CourseSearch onCourseSearch={this.handleSearch} placeholder="输入课程名称" />
                </div>
                <SingleTable search={this.state.query} />
            </div>
        );
    }
}