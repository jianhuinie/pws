/**
 * 课程详情
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import ImgItem from '../ImgItem/index';
import TextItem from '../TextItem/index';
require('css-loader!./index.styl');

class CourseDetail extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    renderList = (data) => {
        const list = data.map(function (item) {
            let html;
            if (item.contentType === 1) {
                html = (<ImgItem key={item.content} img={item.content} isCourse />);
            } else if (item.contentType === 2) {
                html = (<TextItem key={item.content} text={item.content} isCourse />);
            }
            return html;
        });
        return list;
    }

    render() {
        const self = this;
        const courseIntro = self.props.detail.courseIntro || [];
        const teacherIntro = self.props.detail.teacherIntro || [];
        const suitablePeople = self.props.detail.suitablePeople || [];
        const willGet = self.props.detail.willGet || [];

        return (
            <div className={self.props.show ? 'course-detail' : 'course-detail hide'}>
                <div className="course-detail-item">
                    <div className="course-detail-title">课程简介</div>
                    <div className={courseIntro.length ? '' : 'hide'}>
                        {self.renderList(courseIntro)}
                    </div>
                    <div className={courseIntro.length ? 'hide' : 'no-course-intro'}>暂无课程简介</div>
                </div>
                <div className={teacherIntro.length ? 'course-detail-item' : 'course-detail-item hide'}>
                    <div className="course-detail-title">关于讲师</div>
                    {self.renderList(teacherIntro)}
                </div>
                <div className={suitablePeople.length ? 'course-detail-item' : 'course-detail-item hide'}>
                    <div className="course-detail-title">适合人群</div>
                    {self.renderList(suitablePeople)}
                </div>
                <div className={willGet.length ? 'course-detail-item' : 'course-detail-item hide'}>
                    <div className="course-detail-title">你将获得</div>
                    {self.renderList(willGet)}
                </div>
            </div>
        );
    }
};

export default CourseDetail;