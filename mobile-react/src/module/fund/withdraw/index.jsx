import React from 'react';
import ajaxConfig from 'common/ajaxConfig';
import ajax from 'common/util/ajaxService';
import PageController from 'common/controller/PageController';
import MenuItem from 'module/components/MenuList/index';
import stringService from 'common/util/stringService';
import ui from 'gsx-design/component/ui';
import Util from 'common/util/util';
require('css-loader!./index.styl');

const MIN_WITHDRAW = 2; // 最小提现额
const MAX_WITHDRAW = 20000; // 最大提现额

export default class Wallet extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            canWithdrawMoney: 0,
            unClearMoney: 0,
            money: '',
            name: '',
            submiting: false
        };
        this._hackIos();
    }

    componentDidMount() {
        document.title = '我的钱包';
        this.getSummary();
        Util.sharePage();
    }

    /**
     * 解决ios在返回上一页面时，页面不自动刷新的问题
     */
    _hackIos() {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }
    
    /**
     * 获取summary
     */
    getSummary = () => {
        return ajax.get(ajaxConfig.WALLET.GET_WITHDRAW_SUMMARY).then((res) => {
            this.setState({
                ...res.data
            });
        });
    }

    /**
     * 验证输入的钱
     * @param {string} money 
     */
    moneyValidate = (money) => {
        if (isNaN(money) || money > this.state.canWithdrawMoney || money > MAX_WITHDRAW) {
            return false;
        }
        const index = money.indexOf('.'); 
        if (index > -1 && money.length - index > 3) { // 小数点后面至多两位
            return false;
        }
        return true;
    }

    /**
     * 输入金钱
     * @param {event} e 
     */
    handleMoneyInput = (e) => {
        const value = e.target.value;
        if (this.moneyValidate(value)) {
            this.setState({
                money: value
            });
        }
    }

    /**
     * 输入姓名
     * @param {event} e
     */
    handleNameInput = (e) => {
        const value = e.target.value;
        if (stringService.getCharacterLength(value) <= 20) {
            this.setState({
                name: value
            });
        }
    }

    submit = () => {
        this.setState({
            submiting: true
        }, () => {
            ajax.post(ajaxConfig.WALLET.WITHDRAW, {
                money: Number(this.state.money),
                name: this.state.name
            }).then(() => {
                ui.alert('申请已提交，稍后将转入你的微信零钱，请注意查收').done(() => {
                    location.href = '/mweb/fund/wallet';
                });
            });
        });
    }
    
    render() {
        const { canWithdrawMoney, unClearMoney, money, name, submiting } = this.state;
        const submitEnable = money && money >= MIN_WITHDRAW && name && !submiting;
        return (
            <div className="fund-withdraw">
                <MenuItem title="提现记录" next="/mweb/fund/records" />
                <div className="fund-withdraw-head">
                     <div className="fund-withdraw-head-title">
                        微信提现
                     </div>
                </div>
                <div className="fund-withdraw-body">
                    <div className="fund-withdraw-body-item">
                        <div className="title">可提现余额 (元)</div>
                        <div className="number available">{canWithdrawMoney.toFixed(2)}</div>
                    </div>
                    <div className="fund-withdraw-body-item">
                        <div className="title">未结算余额 (元)</div>
                        <div className="number">{unClearMoney.toFixed(2)}</div>
                        <div className="desc">
                            为了保障用户权益，用户购买课程后产生的收益计为未结算余额。<br />
                            如果是单次视频课，购买后3天进行结算；如果是单次直播课，开课后3天进行结算；
                            如果是系列课，购买后7天进行结算。<br />
                            课程收益结算后进入可提现余额。
                        </div>
                    </div>
                </div>
                <div className="fund-withdraw-form">
                     <div className="fund-withdraw-form-item">
                        <div className="title">提现金额</div>
                        <input 
                            className="value" 
                            placeholder="最小提现金额为2元" 
                            value={money}
                            onChange={this.handleMoneyInput}
                        />
                     </div>
                     <div className="fund-withdraw-form-item">
                        <div className="title">收款方实名</div>
                        <input 
                            className="value" 
                            placeholder="输入你的真实姓名" 
                            value={name}
                            onChange={this.handleNameInput}
                        />
                     </div>
                     <div className="fund-withdraw-form-desc">
                        1.每笔提现金额至少2元，每笔订单支付时，微信官方已收取0.6%手续费，详情<a className="protocol" href="http://kf.qq.com/faq/140225MveaUz1501077rEfqI.html">点此查看</a>；<br />
                        2.每日账户提现上限为2万元，超出请<a className="protocol" href="/mweb/student/custom">联系客服</a>；<br />
                        3.为保障你的资金安全，提现申请需实名验证；<br />
                        4.提现申请经微师处理后，将直接转入你的微信零钱；<br />
                        5.审核提现申请时间为工作日9:30-17:30，其它时间段申请顺延至下一工作日；<br />
                        6.如需帮助请<a className="protocol" href="/mweb/student/custom">联系客服</a>
                     </div>
                </div>
                <div className="fund-withdraw-submit">
                    <button 
                        disabled={!submitEnable}
                        className="ws-btn-red"
                        onClick={this.submit}
                    >
                        {submiting ? '提交中' : '确认'}
                    </button>
                </div>
            </div>
        );
    }
};
