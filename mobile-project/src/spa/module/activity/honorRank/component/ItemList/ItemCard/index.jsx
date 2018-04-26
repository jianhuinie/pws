/**
 * 运营活动 人气/分享 -- 卡片
 * @file huangshiming
 * @data 2017/05/05
 */

import React, { PropTypes } from 'react';
import CONFIG from './config';
const lazyLoadImage = require('common/lazyLoadImage');

require('css-loader!./index.styl');

class ItemCard extends React.Component {
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
                className={+item.rank_order < 4 ? CONFIG[+item.rank_order - 1].contentClassName : CONFIG[3].contentClassName}
            >
                <div className="forward">
                    <img 
                        data-src={+item.rank_order < 4 ? CONFIG[+item.rank_order - 1].img : CONFIG[3].img}
                        className={+item.rank_order < 4 ? 'title-imgs' : 'hide'}
                    />
                    <span 
                        className={+item.rank_order < 4 ? CONFIG[+item.rank_order - 1].colorClassName + ' text' : CONFIG[3].colorClassName + ' text'}
                    >
                        {item.rank_order}
                    </span>
                </div>
                <div 
                    className="title-avatar-cover"
                >
                    <img data-src={item.imgurl} />
                </div>

                <div className="item-content">
                    <div className="item-name line-clamp">
                        {item.name}
                    </div>
                    <div className={+item.rank_order < 4 ? CONFIG[+item.rank_order - 1].colorClassName + ' help-number' : CONFIG[3].colorClassName + ' help-number'}>
                        <i className={+item.rank_order < 4 ? CONFIG[+item.rank_order - 1].colorClassName + '-icon icon-two-people' : CONFIG[3].colorClassName + '-icon icon-two-people'}></i>
                        <div className={+item.rank_order < 4 ? CONFIG[+item.rank_order - 1].colorClassName + '-number number-people' : CONFIG[3].colorClassName + '-number number-people'}>
                            <span className={this.props.type === 'popular' ? 'text-t' : 'text-t hide'}>助力人数: {item.invite_count}</span>
                            <span className={this.props.type === 'share' ? 'text-t' : 'text-t hide'}>邀请人数: {item.invite_count}</span>
                        </div>
                    </div>

                    <div className={this.props.type === 'share' ? 'coupon-content' : 'coupon-content hide'}>
                        <div className={+item.rank_order < 4 ? CONFIG[+item.rank_order - 1].colorClassName + '-money money' : CONFIG[3].colorClassName + '-money money'}>
                            ￥ {item.coupon_count}
                        </div>
                        <div className={+item.rank_order < 4 ? CONFIG[+item.rank_order - 1].colorClassName + '-money-text money-text' : CONFIG[3].colorClassName + '-money-text money-text'}>
                            优惠券
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ItemCard;