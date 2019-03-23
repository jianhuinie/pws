/**
 * 推荐课程
 * @author niejianhui
 */
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import CropImage from '~/component/CropImage/index';
import util from '~/util/util';

import './index.styl';

class RecommendClazz extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    jumpToDetail = e => {
        const {dataset: {scheme}} = e.currentTarget;
        util.skipScheme(scheme, true);
    }

    render() {
        const {cellClass} = this.props;
        const {recommendInfo} = cellClass || {};
        const {recommendClazzes, topClazz} = recommendInfo || {};
        if (!recommendClazzes || !recommendClazzes.length) {
            return (<span />);
        }
        const top = [...recommendClazzes];
        if (topClazz) {
            top.unshift(topClazz);
        }
        return (
            <div className="recommend-clazz">
                <div className="title">推荐课程</div>
                {
                    top.map((course, index) => (
                        <div
                            className="clazz-item analysis-haoke-log"
                            key={course.number}
                            data-scheme={course.scheme}
                            onClick={this.jumpToDetail}
                            data-index={index}
                            data-event-id="8880899"
                            role="presentation"
                        >
                            <CropImage width={258} height={146} ImgSrc={course.coverUrl} />
                            <div>
                                {course.name}
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default connect(s => s)(RecommendClazz);
