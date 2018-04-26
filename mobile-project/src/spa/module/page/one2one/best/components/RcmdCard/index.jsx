/**
 * 优选一对一顾问推荐卡片
 * @file leon
 */
import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class RcmdCard extends React.Component {

    constructor(props) {
        super(props);

        this.jump = this.jump.bind(this);
    }

    componentDidMount() {
        lazyLoadImage.init();
    }

    jump(event) {
        const data = $(event.target).data('item');
        if (data && data.detail_url) {
            window.location.href = data.detail_url;
        }
    }
    
    render() {
        const self = this;
        const data = self.props.item;
        const dataStr = JSON.stringify(data);

        return (
            <div className="order-card">
                <div className="order-card-title">顾问推荐</div>
                <div className="order-card-info">
                    <div className="order-card-avatar">
                        <img data-src={data.avatar} alt="" />
                    </div>
                    <div className="order-card-detail">
                        <p className="order-card-teacher ellipsis">{data.teacher_name} - {data.course_name}</p>
                        <p className="order-card-price ellipsis">专属顾问已为您推荐</p>
                    </div>
                </div>
                <div className="order-card-btn" data-item={dataStr} onClick={self.jump}>老师详情</div>
            </div>
        );
    }
}
export default RcmdCard;