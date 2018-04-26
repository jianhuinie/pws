/**
 * 课程观看提示
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class CourseTip extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <div className="course-tip">
                <i className="icon icon-checked-o course-tip-item"></i>
                <div className="course-tip-item course-tip-text">
                    365天随时看
                </div>
                <i className="icon icon-checked-o course-tip-item"></i>
                <div className="course-tip-item course-tip-text">
                    手机电脑同步观看
                </div>
            </div>
        );
    }
};

export default CourseTip;