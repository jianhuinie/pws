import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import ListItem from './components/ListItem/index';
import FilterPannel from './components/FilterPanel/index';
import { walletTypeEnum, walletTypeMap } from 'common/enum/walletDetailType';
import Empty from 'module/components/Empty/index';
import imageConfig from 'common/imgConfig';
import DropLoad from 'gsx-design/component/DropLoad/index';
import Util from 'common/util/util';
require('css-loader!./index.styl');

export default class Details extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            details: [],
            total: 0,
            count: 0,
            isShowNoMore: false,
            loading: true,
            pageNum: 1,
            courseType: 0,
            totalText: '全部'
        };
    }

    componentDidMount() {
        document.title = '钱包明细';
        this.setDrapLoad();
        this.getDetailSum();
        this.getDetails();
        Util.sharePage();
    }

    setDrapLoad = () => {
        if (!this.dropLoad) {
            this.dropLoad = new DropLoad({
                element: $('.wallet-details-list'),
                callback: this.getDetails
            });
        }
    }

    /**
     * 获取明细总目
     */
    getDetailSum = (type = walletTypeEnum.ALL) => {
        const self = this;
        const ajaxParam = {};
        const courseType = self.state.courseType;
        if (courseType !== walletTypeEnum.ALL) { // 全部时不需要传参数
            ajaxParam.type = courseType;
        }
        ajax.get(ajaxConfig.WALLET.GET_DETAIL_SUM, ajaxParam).then((res) => {
            this.setState({
                ...res.data,
                totalText: walletTypeMap.get(courseType)
            });
        });
    }

    /**
     * 获取明细列表
     */
    getDetails = (type = walletTypeEnum.ALL) => {
        const me = this;
        let pageNum = this.state.pageNum;
        const courseType = me.state.courseType;
        const ajaxParam = { pageNum };
        if (courseType !== walletTypeEnum.ALL) { // 全部时不需要传参数
            ajaxParam.type = courseType;
        }
        return ajax.get(ajaxConfig.WALLET.GET_DATAIL_LIST, ajaxParam).then((res) => {
            const details = res.data.details;
            const noMore = details.length < 10;
            const isShowNoMore = pageNum > 1 && noMore;
            if (noMore) {
                me.dropLoad.dispose();
                me.dropLoad = null;
            }
            let showDetails;
            if (pageNum === 1) {
                showDetails = details;
            } else {
                showDetails = this.state.details.concat(details);
            }
            this.setState({
                loading: false,
                pageNum: ++pageNum,
                isShowNoMore: isShowNoMore,
                details: showDetails
            });
        });
    }

    /**
     * 删选
     * @param {number} key 
     */
    handleFilter = (key) => {
        this.setState({
            pageNum: 1,
            loading: true,
            courseType: key,
            details: []
        }, () => {
            this.setDrapLoad();
            this.getDetailSum(key);
            this.getDetails(key);
        });
    }

    render() {
        const state = this.state;
        const isEmpty = !this.state.details.length && !this.state.loading;
        return (
            <div className="wallet-details">
                <div className="wallet-details-summary">
                    <div className="wallet-details-summary-left">
                        <div className="type-text">{state.totalText}</div>
                        <div className="detail">金额￥{state.total.toFixed(2)}&nbsp;&nbsp;总计{state.count}条</div>
                    </div>
                    <FilterPannel onTypeChange={this.handleFilter} />
                </div>
                <div className={`wallet-details-container ${isEmpty ? 'empty' : ''}`}>
                    <ul className="wallet-details-list">
                        {
                            state.details.map((detail) => {
                                return (
                                    <li key={detail.id} className="wallet-details-list-item"><ListItem {...detail} /></li>
                                );
                            })
                        }
                    </ul>
                    {
                        this.state.isShowNoMore && this.state.details.length
                            ?
                                <div className="no-more">没有更多内容了</div>
                            :
                                null
                    }
                    {
                        isEmpty
                            ?  
                                <Empty
                                    image={imageConfig.EMPTY.WITHDRAW_RECORD}
                                    emptyText="暂无内容"
                                />
                            :
                                null
                    }
                </div>
                
            </div>
        );
    }
}