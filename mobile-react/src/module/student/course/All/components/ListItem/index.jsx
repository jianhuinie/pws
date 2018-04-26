import React, { PropTypes } from 'react';
import moment from 'moment';
import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
import courseModeEnum from 'common/enum/courseMode';
// import courseTypeEnum from 'common/enum/courseType';
import LivingAnimation from 'common/components/LivingAnimation/index';
import Util from 'common/util/util';
require('css-loader!./index.styl');

export default class ListItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        coverUrl: PropTypes.string.isRequired,
        courseType: PropTypes.number.isRequired,
        courseMode: PropTypes.number.isRequired,
        lastLearnTime: PropTypes.number.isRequired,
        learnRate: PropTypes.number.isRequired,
    };

    componentDidMount() {
        LazyLoadImage.init();
    }
    
    componentDidUpdate() {
        LazyLoadImage.init();
    }

    getLearnRate = () => {
        const learnRate = this.props.learnRate;
        return learnRate === 100 ? '已学完' : `已学${learnRate}%`;
    }

    renderFoot = () => {
        const self = this;
        const data = self.props;
        const lastLearnTimeText = moment(data.lastLearnTime).format('MM-DD HH:mm');
        let html;
        if (data.liveStatus === 1) {
            html = (
                <div>
                    <LivingAnimation />
                    <span className="living-text">正在直播</span>
                </div>
            );
        } else {
            html = (
                <div>
                    {Util.getClassTypeText(data)} | 上次学习{lastLearnTimeText} 
                </div>
            );
        }
        return html;
    }
 
    render() {
        const props = this.props;
        const redirectUrl = props.courseMode === courseModeEnum.SERIES 
                                ? `/mweb/series/?id=${props.id}`
                                : `/mweb/single/?id=${props.id}`;
        return (
            <a href={redirectUrl}>
                <div className="course-item">
                    <img className="course-item-cover" data-src={props.coverUrl} />
                    <div className="course-item-detail">
                        <div className="course-item-detail-top">
                            {props.name}
                        </div>
                        <div className="course-item-detail-foot">
                            {
                                this.renderFoot()
                            }
                        </div> 
                    </div>
                </div>
            </a>
        );
    }
}