import React, { PropTypes } from 'react';
// import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
import courseModeEnum from 'common/enum/courseMode';
require('css-loader!./index.styl');

export default class ListItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        courseMode: PropTypes.number.isRequired,
        coverUrl: PropTypes.string.isRequired,
        learnCnt: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        videoLength: PropTypes.number.isRequired
    };

    componentDidMount() {
        // LazyLoadImage.init();
    }
    
    componentDidUpdate() {
        // LazyLoadImage.init();
    }

    formateLength = (length) => {
        let h = 0;
        let m = 0;
        if (length >= 3600) {
            h = Math.floor(length / 3600);
        }
        m = Math.ceil((length % 3600) / 60);
        return `${h > 0 ? h + '小时' : ''}${m > 0 ? m + '分钟' : ''}`;
    }

    render() {
        const isFree = Number(this.props.price) === 0;
        let learnCnt = this.props.learnCnt;
        if (learnCnt > 9999) {
            learnCnt = `${(learnCnt / 10000).toFixed(1)}万`;
        }
        const videoLength = this.formateLength(this.props.videoLength);
        const redirectUrl = this.props.courseMode === courseModeEnum.SERIES 
                                ? `/mweb/series/?id=${this.props.id}`
                                : `/mweb/single/?id=${this.props.id}`;
        return (
            <a href={redirectUrl}>
                <div className="gift-course-item">
                    <img className="course-cover" src={this.props.coverUrl} />
                    <div className="course-detail">
                        <div className="course-detail-title">
                            {this.props.name}
                        </div>
                        <div className="course-detail-time">
                            视频&nbsp;|&nbsp;时长{videoLength}
                        </div>
                        <div className="course-detail-foot">
                            <div className="course-detail-number">
                                {learnCnt}人在学
                            </div>
                            <div className={`course-detail-price ${isFree ? 'free' : ''}`}>
                                { isFree ? '免费' : `￥${this.props.price.toFixed(2)}` }
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}