/**
 * 直播动画
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class LivingAnimation extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        const self = this;
        const isMain = self.props.isMain;
        return (
            <span className={isMain ? 'living-wrapper main-living' : 'living-wrapper'}>
                <div className="living-wrapper-item item1">
                </div>
                <div className="living-wrapper-item item2">
                </div>
                <div className="living-wrapper-item item3">
                </div>
                <div className="living-wrapper-item item4">
                </div>
                <div className="living-wrapper-item item5">
                </div>
            </span>
        );
    }
};

export default LivingAnimation;