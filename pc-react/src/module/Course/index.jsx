/**
 * 课堂信息
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Breadcrumb, Tabs } from 'antd';
import CourseForm from './CourseForm/index';
import PageController from 'common/controller/PageController';
import Carousel from './Carousel/index';
import util from 'common/util/util';
import URL from 'common/util/url';
require('css-loader!./index.styl');

export default class Course extends PageController {

    /**
     * @override
     */
    componentDidMount() {
        util.renderLeftSider();
    }
    
    /**
     * @override
     */
    render() {
        const TabPane = Tabs.TabPane;
        return (
            <div className="course child-page">
                <Breadcrumb>
                    <Breadcrumb.Item>{URL().params.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>课堂</Breadcrumb.Item>
                </Breadcrumb>
                <Tabs defaultActiveKey="detail" className="course-tab">
                    <TabPane tab="课堂信息" key="detail" className="course-tab-pane">
                        <CourseForm />
                    </TabPane >
                    <TabPane className="course-tab-pane" tab="轮播图" key="carousel">
                        <Carousel />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}