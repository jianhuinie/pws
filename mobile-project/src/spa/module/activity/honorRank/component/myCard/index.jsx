/**
 * 运营活动 人气/分享 -- 我的排名卡片
 * @file huangshiming
 * @data 2017/05/05
 */

import React, { PropTypes } from 'react';
const lazyLoadImage = require('common/lazyLoadImage');

require('css-loader!./index.styl');

class MyItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired
    };

    componentDidMount() {
        lazyLoadImage.init();
    }  

    render() {
        const item = this.props.item;
        return (
            <div 
                className="my-rank-card"
            >
                <div className="forward">
                    <div 
                        className={item.order ? 'order-text' : 'order-text hide'}
                    >
                        {item.order}
                    </div>

                    <div 
                        className={(!item.order) ? 'order-text-small' : 'order-text-small hide'}
                    >
                        暂无排名
                    </div>
                    <div 
                        className={item.order ? 'texts' : 'texts hide'}
                    >
                        我的排名
                    </div>
                </div>
                <div 
                    className="title-avatar-cover"
                    data-src={item.img} 
                >
                    <img data-src={item.img} />
                </div>

                <div className="item-content">
                    <div className="item-name line-clamp">
                        {item.name}
                    </div>
                    <div className="help-number">
                        <i className="icon-two-people"></i>
                        <span className={this.props.type === 'popular' ? 'number-people' : 'number-people hide'}>
                            助力人数: {item.invite_count}
                        </span>
                        <span className={this.props.type === 'share' ? 'number-people' : 'number-people hide'}>
                            邀请人数: {item.invite_count}
                        </span>
                    </div>

                    <div className={this.props.type === 'share' ? 'coupon-content' : 'coupon-content hide'}>
                        <div className="coupon-money">
                            ￥ {item.coupon}
                        </div>
                        <div className="coupon-text">
                            优惠券
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MyItem;