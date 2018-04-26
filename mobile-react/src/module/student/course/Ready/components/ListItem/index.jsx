import React, { PropTypes } from 'react';
import moment from 'moment';
import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
// import Living from 'module/components/Living/index';
import LivingAnimation from 'common/components/LivingAnimation/index';
import Util from 'common/util/util';
require('css-loader!./index.styl');

export default class ListItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        coverUrl: PropTypes.string.isRequired,
        startTime: PropTypes.number.isRequired,
        liveStatus: PropTypes.number.isRequired
    };

    componentDidMount() {
        LazyLoadImage.init();
    }
    
    componentDidUpdate() {
        LazyLoadImage.init();
    }
 
    render() {
        const self = this;
        const props = this.props;
        const redirectUrl = `/mweb/single/?id=${props.id}`;
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
                                props.liveStatus === 1
                                    ?
                                        <div className="live">
                                            <LivingAnimation />
                                            {/* <img className="live-logo" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a54b0b04b964.png" /> */}
                                            <span className="live-text">正在直播</span>
                                        </div>
                                    :
                                        <div>直播 | {Util.getStartTime(self.props.startTime)}</div>
                            }
                        </div> 
                    </div>
                </div>
            </a>
        );
    }
}