/**
 * 系列课详情
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Link } from 'react-router';
import URL from 'common/util/url';
import { Breadcrumb, Popconfirm } from 'antd';
import PageController from 'common/controller/PageController';
import SeriesSingleList from './SeriesSingleList/index';
import service from 'common/util/ajaxService';
import util from 'common/util/util';
require('css-loader!./index.styl');

export default class SeriesDetail extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            coverUrl: '',
            name: '',
            channelUrl: '',
            price: 0,
            planCourseCnt: '',
            hasCourseCnt: ''
        };
    }

    /**
     * @override
     */
    componentWillMount() {
        service
            .get('/pc/series/getBaseInfo', {
                seriesId: URL().params.seriesId
            })
            .then((res) => {
                this.setState({
                    ...res.data
                });
            });
    }

    /**
     * @override
     */
    componentDidMount() {
        util.renderLeftSider();
    }

    /**
     * 删除系列课
     */
    handleDelete = () => {
        service
            .post('/pc/series/delete', {
                seriesId: URL().params.seriesId
            })
            .then((res) => {
                // 如果有返回内容
                if (res) {
                    history.back();
                }
            });
    }

    /**
     * @override
     */
    render() {
        const url = URL();
        url.hash = '#/series/edit';
        return (
            <div className="series-detail">
                <Breadcrumb>
                    <Breadcrumb.Item>{URL().params.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>课程管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/series">系列课</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className="series-detail-content">
                    <div className="series-detail-content-info">
                        <div className="series-detail-content-info-cover">
                            <img alt src={this.state.coverUrl} />
                            <div className="series-detail-content-info-cover-course">
                                <div className="series-detail-content-info-cover-course-name">
                                    {this.state.name}
                                </div>
                                <div className="series-detail-content-info-cover-course-price">
                                    {this.state.price === 0 ?
                                        <span className="series-detail-content-info-cover-course-price-free">免费</span>
                                        :
                                        <span className="series-detail-content-info-cover-course-price-paied">￥{this.state.price.toFixed(2)}</span>
                                    }
                            </div>
                            </div>
                        </div>
                        <div className="series-detail-content-info-tip">计划更新{this.state.planCourseCnt}次课，已更新{this.state.hasCourseCnt}次课</div>
                    </div>
                    <div className="series-detail-content-operation">
                        <a target="_blank" href={this.state.seriesUrl}>查看</a>
                        <a href={url.toString()}>修改</a>
                        <Popconfirm 
                            placement="topRight"
                            title="确定要删除这个系列课吗" 
                            onConfirm={this.handleDelete}
                            okText="确定" 
                            cancelText="取消"
                            className="popconfirm"
                            overlayClassName="popconfirm-overlay"
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </div>
                </div>
                <SeriesSingleList />
            </div>  
        );
    }
}