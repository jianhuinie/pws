/**
 * 优选一对一订单卡片
 * @file leon
 */
import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
const APP = require('common/app');
require('css-loader!./index.styl');

class OrderCard extends React.Component {

    constructor(props) {
        super(props);

        this.pay = this.pay.bind(this);
    }

    componentDidMount() {
        lazyLoadImage.init();
    }

    pay(event) {
        const data = $(event.target).data('item');
        if (data && data.purchase_id) {
            if (APP.isApp()) {
                APP.toThirdPartyPayment(data.purchase_id);
            } else {
                window.location.href = '/pay/payProductPurchase?purchase_id=' + data.purchase_id + '&success_url=' + encodeURIComponent(location.href);
            }
        }
    }
    
    render() {
        const self = this;
        const data = self.props.item;
        const dataStr = JSON.stringify(data);

        return (
            <div className="order-card">
                <div className="order-card-title">支付订单</div>
                <div className="order-card-info">
                    <div className="order-card-avatar">
                        <img data-src={data.avatar} alt="" />
                    </div>
                    <div className="order-card-detail">
                        <p className="order-card-teacher ellipsis">{data.teacher_name} - {data.course_name}</p>
                        <p className="order-card-price ellipsis">{data.hours}课时  共计:￥{data.total_money}  实付:￥{data.pay_money}</p>
                    </div>
                </div>
                <div className="order-card-btn" data-item={dataStr} onClick={self.pay}>立即支付</div>
            </div>
        );
    }
}
export default OrderCard;