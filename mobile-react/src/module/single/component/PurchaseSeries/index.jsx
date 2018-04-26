/**
 * 购买系列课
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
// import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
import util from 'common/util/util';
require('css-loader!./index.styl');

class PurchaseSeries extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    // componentDidMount() {
    //     LazyLoadImage.init();
    // }

    componentDidUpdate() {
        // LazyLoadImage.init();
    }

    jump = () => {
        const self = this;
        location.href = '/mweb/series/?id=' + self.props.data.id;
    }

    render() {
        const self = this;
        const data = self.props.data || {};

        return (
            <div className={self.props.data ? 'purchase-series' : 'purchase-series hide'} onClick={self.jump}>
                <div className="course-img-series left">
                    <img src={data.coverUrl} />
                </div>
                <div className="course-info-series">
                    <div className="course-title-series ellipsis">
                        {data.name}
                    </div>
                    <div className="course-lesson-series ellipsis">
                        {'已更新' + data.currentCourseCnt + '节课 | 计划更新' + data.planCourseCnt + '节课'}
                    </div>
                </div>
                {/* <div className="purchase-btn-series right">
                    购买系列课
                </div> */}
                <div className="clearfix">
                </div>
            </div>
        );
    }
};

export default PurchaseSeries;