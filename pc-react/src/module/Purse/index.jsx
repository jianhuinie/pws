/**
 * 钱包明细
 * 
 * @author zhaoxiudan@baijiahulian.com 
 * 2018/1/15
 */

import React from 'react';
import { Breadcrumb, Popover, Icon } from 'antd';
import PageController from 'common/controller/PageController';
import PurseTable from './PurseTable/index';
import service from 'common/util/ajaxService';
import URL from 'common/util/url';
import util from 'common/util/util';
require('css-loader!./index.styl');

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
            .get('/pc/finance/wallet/summary')
            .then((res) => {
                const data = res.data;
                this.setState({ 
                    ...data,
                    balance: data.balance.toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => ($1 + ',')), 
                    unsettledBalance: data.unsettledBalance.toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => ($1 + ','))
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
        const popoverContent = (
            <div className="purse-detail-popover">
                <div className="purse-detail-popover-para">
                    为了保障用户权益，用户购买课程后产生的收益计为未结算余额。
                </div>
                <div className="purse-detail-popover-para">
                    如果是单次视频课，购买后3天进行结算；如果是单次直播课，开课后3天进行结算； 如果是系列课，购买后7天进行结算。
                </div>
                <div>
                    课程收益结算后进入可提现余额。
                </div>
            </div>
        );
        return (
            <div className="child-page purse">
                <Breadcrumb>
                    <Breadcrumb.Item>{URL().params.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>财务管理</Breadcrumb.Item>
                    <Breadcrumb.Item>钱包明细</Breadcrumb.Item>
                </Breadcrumb>
                <div className="purse-detail">
                    <div className="purse-detail-withdraw">
                        <span className="purse-detail-title">可提现余额(元)</span>
                        <span className="purse-detail-num">{state.balance}</span>
                        <span className="purse-detail-tip">当前仅支持手机端，请到微师公众号提现</span>
                    </div>
                    <div className="purse-detail-unsettled">
                        <span className="purse-detail-title">未结算金额(元)</span>
                        <span className="purse-detail-num">{state.unsettledBalance}</span>
                        <span className="purse-detail-tip">
                            结算规则
                            <Popover 
                                placement="bottomLeft" 
                                content={popoverContent}
                                getPopupContainer={triggerNode => triggerNode.parentNode}>
                                <Icon className="purse-detail-icon" type="exclamation-circle-o" />
                            </Popover>
                        </span>
                    </div>
                </div>
                <PurseTable />
            </div>
        );
    }
}

