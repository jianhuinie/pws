import React, { PropTypes } from 'react';
import { walletTypeEnum } from 'common/enum/walletDetailType';
import moment from 'moment';
require('css-loader!./index.styl');

export default class ListItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        type: PropTypes.number.isRequired,
        remark: PropTypes.string.isRequired,
        money: PropTypes.number.isRequired,
        time: PropTypes.number.isRequired
    };

    getTypeText = (type) => {
        switch (type) {
            case walletTypeEnum.LIVE: return '直播';
            case walletTypeEnum.RELAY: return '视频';
            case walletTypeEnum.SERIES: return '系列';
            default: return '';
        }
    }
    render() {
        const props = this.props;
        const typeText = this.getTypeText(this.props.type);
        const isNegative = [walletTypeEnum.WITHDRAW, walletTypeEnum.FEE].indexOf(props.type) > -1;
        return (
            <div className="detail-item">
                <div className="detail-item-top">
                    <div className="remark">
                        {typeText ? <div className="remark-type">{typeText}</div> : ''}
                        <div className="remark-text">{props.remark}</div>
                    </div>
                    <div className={`price ${isNegative ? 'negative' : 'positive'}`}>
                        {props.money.toFixed(2)}
                    </div>
                </div>
                <div className="detail-item-body">
                    {moment(props.time).format('YYYY-MM-DD HH:mm')}
                </div>
            </div>
        );
    }
}