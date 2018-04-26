import React, { PropTypes } from 'react';
import moment from 'moment';
import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
import courseModeEnum from 'common/enum/courseMode';
import courseTypeEnum from 'common/enum/courseType';
import Util from 'common/util/util';
import LivingAnimation from 'common/components/LivingAnimation/index';
require('css-loader!./index.styl');

export default class ListItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        coverUrl: PropTypes.string.isRequired,
        courseType: PropTypes.number.isRequired,
        courseMode: PropTypes.number.isRequired,
        startTime: PropTypes.number,
        videoLength: PropTypes.number,
        planCourseCnt: PropTypes.number,
        currentCourseCnt: PropTypes.number
    };

    static defaultProps = {
        startTime: 0,
        videoLength: 0,
        planCourseCnt: 0,
        currentCourseCnt: 0
    }
    
    componentDidMount() {
        LazyLoadImage.init();
    }

    componentDidUpdate() {
        LazyLoadImage.init();
    }

    renderFoot = () => {
        const self = this;
        const { courseMode, courseType, currentCourseCnt, liveStatus, startTime } = self.props;
        let html;
        if (courseMode === courseModeEnum.SERIES) {
            html = (
                <div>系列 | 已更新{currentCourseCnt}节课</div>
            );
        } else if (courseType === courseTypeEnum.RELAY) {
            html = (
                <div>视频 | 时长{Util.timeShow(self.props.videoLength)}</div>
            );
        } else if (liveStatus === 1) {
            html = (
                <div>
                    <LivingAnimation />
                    <span className="living-text">正在直播</span>
                </div>
            );
        } else if (liveStatus === 3) {
            html = (
                <div>
                    回放生成中
                </div>
            );
        } else if (liveStatus === 2) {
            html = (
                <div>直播 | {Util.getStartTime(startTime)}上课</div>
            );
        } else {
            html = (
                <div>直播回放 | 时长{Util.timeShow(self.props.videoLength)}</div>
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