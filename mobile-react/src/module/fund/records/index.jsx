import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import Empty from 'module/components/Empty/index';
import imageConfig from 'common/imgConfig';
import DropLoad from 'gsx-design/component/DropLoad/index';
import { walletStatusClassMap, walletStatusMap } from 'common/enum/withdrawStatus';
import moment from 'moment';
import Util from 'common/util/util';
require('css-loader!./index.styl');

export default class Follow extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            details: [],
            isShowNoMore: false,
            pageNum: 1,
            loading: true
        };
    }

    componentDidMount() {
        const me = this;
        document.title = '提现记录';
        this.getDetails();
        this.dropLoad = new DropLoad({
            element: $('.withdraw-records-list'),
            callback: me.getDetails
        });
        Util.sharePage();
    }

    componentWillUnmount() {
        if (this.dropLoad) {
            this.dropLoad.dispose();
            this.dropLoad = null;
        }
    }

    /**
     * 获取已关注课堂
     */
    getDetails = () => {
        const me = this;
        let pageNum = this.state.pageNum;
        return ajax.get(ajaxConfig.WALLET.GET_WITHDRAW_DETAIL_LIST, {
            pageNum: pageNum
        }).then((res) => {
            const details = res.data.details;
            const noMore = details.length < 10;
            const isShowNoMore = pageNum > 1 && noMore;
            if (noMore) {
                me.dropLoad.dispose();
                me.dropLoad = null;
            }
            this.setState({
                loading: false,
                pageNum: ++pageNum,
                isShowNoMore: isShowNoMore,
                details: this.state.details.concat(details)
            });
        });
    }

    render() {
        if (!this.state.loading && !this.state.details.length) {
            return (
                <Empty
                    image={imageConfig.EMPTY.WITHDRAW_RECORD}
                    emptyText="暂无提现记录"
                />
            );
        }
        return ( 
            <div className="withdraw-records">
                <ul className="withdraw-records-list">
                {
                    this.state.details.map((detail) => {
                        return (
                            <li key={detail.id} className="withdraw-records-list-item">
                                <div className="withdraw-records-list-item-top">
                                    <div className="number">提现{detail.withdrawMoney.toFixed(2)}元</div>
                                    <div className="time">{moment(detail.withdrawTime).format('YYYY-MM-DD HH:mm')}</div>
                                </div>
                                <div 
                                    className={`withdraw-records-list-item-bottom ${walletStatusClassMap.get(detail.status)}`}
                                >
                                    { walletStatusMap.get(detail.status) }
                                </div>
                            </li>
                        );
                    })
                } 
                </ul>
                {
                    this.state.isShowNoMore 
                        ?
                            <div className="no-more">没有更多内容了</div>
                        :
                            null
                }
            </div>
        );
    }
};
