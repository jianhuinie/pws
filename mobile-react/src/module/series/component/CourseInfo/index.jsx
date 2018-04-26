/**
 * 课程信息
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import util from 'common/util/util';
require('css-loader!./index.styl');

class CourseInfo extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    getLessonText = (data) => {
        let text = '';
        if (data.courseMode === 2) {
            text = util.getLessonText(data);
        } else if (data.courseMode === 1) {
            text = util.getTimeText(data);
        }
        if (text) {
            text += ' | ';
        }
        text += util.getStudentCntText(data);
        return text;
    }

    getCourseType = (data) => {
        let text = '';
        if (data.courseMode === 2) {
            text = '系列';
        } else if (data.courseMode === 1) {
            text = util.getClassTypeText(data, 1);
        }
        return text;
    }

    render() {
        const self = this;
        let clsName;
        if (self.props.courseInfo.courseMode === 2 || self.props.courseInfo.canSellAlone) {
            if (self.props.courseInfo.price) {
                clsName = 'course-info-bottom';
            } else {
                clsName = 'course-info-bottom free-price';
            }
        } else {
            clsName = 'hide';
        }

        return (
            <div className="course-info">
                <div className="course-info-top">
                    <div className="course-info-name">
                        <span className="course-info-type">{self.getCourseType(self.props.courseInfo)}</span>{self.props.courseInfo.name}
                    </div>
                </div>
                <div className="course-info-middle">
                    {self.getLessonText(self.props.courseInfo)}
                </div>
                <div className={clsName}>
                    {util.getPriceText(self.props.courseInfo)}
                </div>
            </div>
        );
    }
};

export default CourseInfo;