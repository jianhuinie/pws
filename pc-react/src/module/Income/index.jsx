/**
 * 课堂收益
 * 
 * @author zhaoxiudan@baijiahulian.com 
 * 2018/1/15
 */

import React from 'react';
import { Breadcrumb } from 'antd';
import PageController from 'common/controller/PageController';
import IncomeTable from './IncomeTable/index';
import service from 'common/util/ajaxService';
import URL from 'common/util/url';
import util from 'common/util/util';
require('css-loader!./index.styl');

const params = URL().params;

export default class Income extends PageController {

    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * @override
     */
    componentWillMount() {
        service
            .get('/pc/finance/classroom/summary', {
                classroomId: Number(params.classroomId)
            })
            .then((res) => {
                const data = res.data;
                this.setState({ 
                    ...data,
                    totalIncome: data.totalIncome.toFixed(2), 
                    videoIncome: data.videoIncome.toFixed(2),
                    liveIncome: data.liveIncome.toFixed(2),
                    seriesIncome: data.seriesIncome.toFixed(2)
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
     * @override
     */
    render() {
        const state = this.state;
        return (
            <div className="child-page income">
                <Breadcrumb>
                    <Breadcrumb.Item>{params.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>财务管理</Breadcrumb.Item>
                    <Breadcrumb.Item>课堂收益</Breadcrumb.Item>
                </Breadcrumb>
                <div className="income-detail">
                    <div>
                        <span className="income-detail-strong">总订单数：{state.totalCnt}</span>
                        <span className="income-detail-strong">总购买人数：{state.totalPayCnt}</span>
                        <span className="income-detail-strong">总净收益(元)：{state.totalIncome}</span>
                    </div>
                    <div>
                        <span>直播课：{state.liveCnt}</span>
                        <span>总购买人数：{state.livePayCnt}</span>
                        <span>总净收益(元)：{state.liveIncome}</span>
                    </div>
                    <div>
                        <span>视频课：{state.videoCnt}</span>
                        <span>总购买人数：{state.videoPayCnt}</span>
                        <span>总净收益(元)：{state.videoIncome}</span>
                    </div>
                    <div>
                        <span>系列课：{state.seriesCnt}</span>
                        <span>总购买人数：{state.seriesPayCnt}</span>
                        <span>总净收益(元)：{state.seriesIncome}</span>
                    </div>
                </div>
                <IncomeTable />
            </div>
        );
    }
}

