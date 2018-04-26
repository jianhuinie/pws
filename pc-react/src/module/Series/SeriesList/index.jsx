/**
 * 系列课列表
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Breadcrumb, Button } from 'antd';
import CourseSearch from 'common/components/CourseSearch/index';
import CommonController from 'common/controller/CommonController';
import SeriesTable from './SeriesTable/index';
import URL from 'common/util/url';
import util from 'common/util/util';
require('css-loader!./index.styl');

export default class SeriesList extends CommonController {

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
     * @override
     */
    render() {
        const url = URL();
        url.params.seriesId = undefined;
        url.hash = '#/series/edit';
        return (
            <div className="series-list">
                <Breadcrumb>
                    <Breadcrumb.Item>{URL().params.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>课程管理</Breadcrumb.Item>
                    <Breadcrumb.Item>系列课</Breadcrumb.Item>
                </Breadcrumb>
                <div className="series-list-operation">
                    <div className="series-list-operation-add">
                        <Button className="classic-btn pink-btn series-list-operation-add-button"><a href={url.toString()}>新建系列课</a></Button>
                    </div>
                    <CourseSearch onCourseSearch={this.handleSearch} placeholder="输入课程名称" />
                </div>
                <SeriesTable search={this.state.query} />
            </div>  
        );
    }
}