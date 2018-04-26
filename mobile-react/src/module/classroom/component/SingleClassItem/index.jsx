/**
 * 单个单次课
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
// import eventProxy from 'common/util/eventProxy';
import util from 'common/util/util';
import LivingAnimation from 'common/components/LivingAnimation/index';
require('css-loader!./index.styl');

class SingleClassItem extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    componentDidMount() {
        // LazyLoadImage.init();
    }

    componentDidUpdate() {
        // LazyLoadImage.init();
        // eventProxy.on('loadImg', () => {
        //     LazyLoadImage.init();
        // });
    }

    jump = () => {
        const self = this;
        location.href = '/mweb/single/?id=' + self.props.data.id;
    }

    render() {
        const self = this;
        const data = self.props.data;
        const isLive = (data.courseType === 1) && (data.liveStatus === 1);
        let priceClass;
        if (data.price === 0) {
            priceClass = 'student-price free-price';
        } else if (data.price > 0) {
            priceClass = 'student-price';
        } else {
            priceClass = 'hide';
        }

        return (
            <div className="class-room-item" onClick={self.jump}>
                <div className="left-part sub-item left">
                    <img src={data.coverUrl} />
                </div>
                <div className="right-part sub-item">
                    <div className="class-item-top">
                        <div className="class-item-title">
                            {data.name}
                        </div>
                    </div>
                    <div className={isLive ? 'class-item-middle hide' : 'class-item-middle'}>
                        {util.getSingleCourseMiddleInfo(data)}
                    </div>
                    <div className={isLive ? 'class-item-middle' : 'class-item-middle hide'}>
                        {/* <span className="live-class-logo">
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a54b0b04b964.png" />
                        </span> */}
                        <LivingAnimation />
                        <span className="live-class-text">
                            正在直播
                        </span>
                    </div>
                    <div className="class-item-footer">
                        <div className="student-cnt">{util.getStudentCntText(data)}</div>
                        <div className={priceClass}>
                            {util.getPriceText(data)}
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="clearfix">
                </div>
            </div>
        );
    }
};

export default SingleClassItem;