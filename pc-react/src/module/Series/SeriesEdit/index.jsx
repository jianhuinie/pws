/**
 * 系列课编辑
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'antd';
import URL from 'common/util/url';
import SieriesForm from './SieriesForm/index';
import util from 'common/util/util';

export default class SeriesEdit extends React.Component {
    
    /**
     * @override
     */
    componentDidMount() {
        util.renderLeftSider();
    }

    render() {
        return (
            <div className="series">
                <Breadcrumb>
                    <Breadcrumb.Item>{URL().params.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>课程管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/series">系列课</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{ URL().params.seriesId ? '修改系列课' : '新建系列课'}</Breadcrumb.Item>
                </Breadcrumb>
                <SieriesForm />
            </div>
        );   
    }
}