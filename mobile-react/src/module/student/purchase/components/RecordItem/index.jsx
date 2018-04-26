import React, { PropTypes } from 'react';
import courseModeEnum from 'common/enum/courseMode';
import courseTypeEnum from 'common/enum/courseType';
import moment from 'moment';
import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';

require('css-loader!./index.styl');

export default class RecordItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        coverUrl: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        courseType: PropTypes.number.isRequired,
        courseMode: PropTypes.number.isRequired,
        payTime: PropTypes.number.isRequired
    };
    
    componentDidMount() {
        LazyLoadImage.init();
    }

    componentDidUpdate() {
        LazyLoadImage.init();
    }

    getRecordTypeText = (courseType, courseMode) => {
        if (courseMode === courseModeEnum.SERIES) {
            return '系列';
        } else if (courseType === courseTypeEnum.RELAY) {
            return '视频';
        }
        return '直播';
    }
 
    render() {
        const props = this.props;
        const redirectUrl = this.props.courseMode === courseModeEnum.SERIES 
                                ? `/mweb/series/?id=${this.props.id}`
                                : `/mweb/single/?id=${this.props.id}`;
        return (
            <a href={redirectUrl}>
                <div className="record-item">
                    <img className="record-item-cover" data-src={props.coverUrl} />
                    <div className="record-item-detail">
                        <div className="record-item-detail-top">
                            {props.name}
                        </div>
                        <div className="record-item-detail-middle">
                            {this.getRecordTypeText(props.courseType, props.courseMode)}&nbsp;|&nbsp;购于{moment(props.payTime).format('YYYY-MM-DD HH:mm')}
                        </div>
                        <div className="record-item-detail-foot">
                            实付<span className="price">¥{props.price.toFixed(2)}</span>
                        </div> 
                    </div>
                </div>
            </a>
        );
    }
}