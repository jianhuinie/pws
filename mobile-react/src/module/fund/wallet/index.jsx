import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import MenuItem, { MenuList } from 'module/components/MenuList/index';
import Util from 'common/util/util';

require('css-loader!./index.styl');

export default class Wallet extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            yesterdayIncome: 0,
            todayIncome: 0
        };
    }

    componentDidMount() {
        document.title = '我的钱包';
        this.getSummary();
        Util.sharePage();
    }
    getSummary = () => {
        ajax.get(ajaxConfig.WALLET.GET_SUMMARY).then((res) => {
            this.setState({
                ...res.data
            });
        });
    }

    render() {
        const state = this.state;
        return (
            <div className="fund-wallet">
                <div className="fund-wallet-head">
                    <a href="/mweb/fund/details">
                        <div className="fund-wallet-head-bg">
                            <div className="balance-text">账户余额 (元)</div>
                            <div className="balance-number">{state.balance.toFixed(2)}</div>
                            <div className="balance-next">{'查看明细 >'}</div>
                        </div>
                     </a>
                </div>
                <div className="fund-wallet-body">
                    <div className="fund-wallet-body-item">
                        <div className="title">昨日收益（元）</div>
                        <div className="number">{state.yesterdayIncome.toFixed(2)}</div>
                    </div>
                    <div className="fund-wallet-body-item">
                        <div className="title">今日收益（元）</div>
                        <div className="number">{state.todayIncome.toFixed(2)}</div>
                    </div>
                </div>
                <a href="/mweb/fund/withdraw">
                    <div className="fund-wallet-withdraw">提现</div>
                </a>
                <MenuList>
                    <MenuItem title="想提高收益？金牌老师手把手教你赚钱" next="/mweb/classroom?id=1" />
                </MenuList>
            </div>
        );
    }
};
