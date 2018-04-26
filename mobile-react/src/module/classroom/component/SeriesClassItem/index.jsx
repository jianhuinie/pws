/**
 * 单个系列课
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
import util from 'common/util/util';

class SeriesClassItem extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    componentDidMount() {
        LazyLoadImage.init();
    }

    componentDidUpdate() {
        // LazyLoadImage.init();
    }

    jump = () => {
        const self = this;
        location.href = '/mweb/series/?id=' + self.props.data.id;
    }

    render() {
        const self = this;
        const data = self.props.data;
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
                    <div className="class-item-middle">
                        <span className="class-item-lesson">
                            {util.getLessonText(data, self.props.discovery)}
                        </span>
                    </div>
                    <div className="class-item-footer">
                        <div className="student-cnt">{util.getStudentCntText(data)}</div>
                        <div className={priceClass}>
                            {util.getPriceText(data)}
                        </div>
                    </div>
                </div>
                <div className="clearfix">
                </div>
            </div>
        );
    }
};

export default SeriesClassItem;