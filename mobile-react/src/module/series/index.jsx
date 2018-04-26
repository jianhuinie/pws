/**
 * 系列课首页
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
import ImgItem from './component/ImgItem/index';
import CourseInfo from './component/CourseInfo/index';
import CourseTip from './component/CourseTip/index';
import CourseTab from './component/CourseTab/index';
import CourseDetail from './component/CourseDetail/index';
import FollowPublic from './component/FollowPublic/index';
import TechnicalSupport from './component/TechnicalSupport/index';
import SingleClassItem from 'module/classroom/component/SingleClassItem/index';
import FollowTeacher from 'module/classroom/component/FollowTeacher/index';
import PurchaseTip from './component/PurchaseTip/index';
import PurchaseBtn from 'module/single/component/PurchaseBtn/index';
// import eventProxy from 'common/util/eventProxy';
// import WxContext from 'common/util/wxContext';
import DropLoad from 'gsx-design/component/DropLoad/index';
import fixTab from 'gsx-design/component/fixTab/index';
// import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
import Util from 'common/util/util';
import Url from 'gsx-design/util/url';
const courseId = +Url().params.id;
const courseMode = 2;
let pageNum = 1;
require('css-loader!./index.styl');

class SeriesContainer extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            courseInfo: {},
            detail: {},
            list: [],
            classRoomInfo: {},
            isFollowClassroom: !1,
        };
    };

    componentDidMount() {
        const self = this;

        self.getClassInfo();
        self.getSeriesList();
        self.getDetail();
        fixTab($('.course-tab')[0], false);
        self.dropLoad = new DropLoad({
            element: $('.course-catalog'),
            callback: self.getSeriesList
        });
    }

    getClassInfo = () => {
        const self = this;
        const params = {
            courseId: courseId,
            courseMode: courseMode
        };
        AJAXSERVICE.get(AJAXCONFIG.COURSE.GET_COURSE_INFO, params).then(function (res) {
            if (res && res.code === 200) {
                const courseInfo = res.data.course;
                document.title = courseInfo.name;
                const classRoomInfo = res.data.classroom;
                const isFollowClassroom = classRoomInfo.isFollow;
                self.setState({ courseInfo, classRoomInfo, isFollowClassroom });
                Util.shareCourse(res.data);
            }
        });
    }

    getSeriesList = () => {
        const self = this;
        const params = {
            courseId: courseId,
            pageNum: pageNum
        };
        return AJAXSERVICE.get(AJAXCONFIG.COURSE.GET_COURSE_COURSE, params).then(function (res) {
            if (res && res.code === 200) {
                pageNum++;
                const list = self.state.list.concat(res.data.courses);
                self.setState({ list });
                if (res.data.courses.length < 10) {
                    self.dropLoad.dispose();
                    self.dropLoad = null;
                }
            }
        });
    }

    getDetail = () => {
        const self = this;
        const params = {
            courseId: courseId,
            courseMode: courseMode
        };

        AJAXSERVICE.get(AJAXCONFIG.COURSE.GET_COURSE_DETAIL, params).then(function (res) {
            if (res && res.code === 200) {
                const detail = res.data.detail;
                self.setState({ detail });
            }
        });
    }

    changeTab = (index) => {
        const self = this;
        if (self.state.tab === index) {
            return;
        }
        self.setState({
            tab: index
        }, () => {
            if (self.state.tab === 2) {
                window.scrollTo(0, 422);
            }
        });
    }
    
    changeFollowTeacherState = (status) => {
        const self = this;
        self.setState({
            isFollowClassroom: status
        });
    }

    render() {
        const self = this;
        const listComponet = self.state.list.map(function (item) {
            return (<SingleClassItem key={item.id + item.courseMode} data={item} />);
        });

        return (
            <div className="series-course">
                <div className="top-content">
                    <div className="series-course-img">
                        <ImgItem 
                            img={self.state.courseInfo.coverUrl}
                            isTop
                        />
                    </div>
                    <CourseInfo 
                        courseInfo={self.state.courseInfo}
                    />
                    <CourseTip />
                </div>
                <CourseTab 
                    tab={self.state.tab}
                    callbackParent={self.changeTab}
                />
                <CourseDetail
                    detail={self.state.detail}
                    show={self.state.tab === 1}
                />
                <div className={self.state.tab === 2 ? 'course-catalog' : 'course-catalog hide'}>
                    {listComponet}
                    <div className={self.state.list.length ? 'hide' : 'no-course-intro'}>暂无课程目录</div>
                </div>
                <PurchaseTip 
                    isSeries 
                    show={self.state.courseInfo.price}
                />
                <FollowTeacher
                    detail={self.state.classRoomInfo}
                    classId={self.state.classRoomInfo.classId}
                    followPublic={self.state.courseInfo.haveFollow}
                    courseId={courseId}
                    isFollow={self.state.isFollowClassroom}
                    courseMode={courseMode}
                    callbackParent={self.changeFollowTeacherState}
                />
                <FollowPublic
                    classId={self.state.classRoomInfo.classId}
                    courseId={courseId}
                    courseMode={courseMode}
                    show={!self.state.courseInfo.haveFollow}
                />
                <TechnicalSupport />
                <PurchaseBtn 
                    data={self.state.courseInfo}
                    classId={self.state.classRoomInfo.classId}
                    callbackParent={self.changeTab}
                />
            </div>
        );
    }
};

export default SeriesContainer;