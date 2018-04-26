/**
 * 单次课编辑
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Link } from 'react-router';
import { Breadcrumb, Popover, Button } from 'antd';
import SingleForm from './SingleForm/index';
import URL from 'common/util/url';
import util from 'common/util/util';
require('css-loader!./index.styl');
 
export default class SingleEdit extends React.Component {
    
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
        const isOld = URL().params.courseId;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>{URL().params.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>课程管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/single">单次课</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{ isOld ? '修改单次课' : '新建单次课'}</Breadcrumb.Item>
                </Breadcrumb>
                <SingleForm />
            </div>
        );   
    }
}