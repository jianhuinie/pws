/**
 * 单次课首页
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
import EventProxy from 'common/eventProxy';
import VideoPlayer from 'common/videoPlayer';
import ImgItem from 'module/series/component/ImgItem/index';
import CourseInfo from 'module/series/component/CourseInfo/index';
import CourseTip from 'module/series/component/CourseTip/index';
import CourseDetail from 'module/series/component/CourseDetail/index';
import FollowPublic from 'module/series/component/FollowPublic/index';
import TechnicalSupport from 'module/series/component/TechnicalSupport/index';
import FollowTeacher from 'module/classroom/component/FollowTeacher/index';
import PurchaseTip from 'module/series/component/PurchaseTip/index';
import PurchaseSeries from 'module/single/component/PurchaseSeries/index';
import PurchaseBtn from 'module/single/component/PurchaseBtn/index';
import Ui from 'gsx-design/component/ui';
// import WxContext from 'common/util/wxContext';
import Url from 'gsx-design/util/url';
import Util from 'common/util/util';
const courseId = +Url().params.id;
const courseMode = 1;
let getVideoInfo = false;
// let wxSdk;
require('css-loader!./index.styl');

class SingleContainer extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            courseInfo: {},
            detail: {},
            classRoomInfo: {},
            isFollowClassroom: !1,
            seriesCourse: null,
            isPlaying: !1,
            playText: '',
        };
    };

    componentDidMount() {
        const self = this;
        
        self.getClassInfo();
        self.getDetail();
        // wxSdk = new WxContext();
        // wxSdk.initContext();
        EventProxy.on('modifyBtnText', function (data) {
            const playText = data;
            self.setState({ playText });
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
                const playText = Util.getPurchaseText(courseInfo, 1);
                const classRoomInfo = res.data.classroom;
                const seriesCourse = courseInfo.seriesCourse;
                const isFollowClassroom = classRoomInfo.isFollow;
                self.setState({ 
                    courseInfo, classRoomInfo, isFollowClassroom, seriesCourse, playText 
                });
                Util.shareCourse(res.data);
                if ((courseInfo.havePermission || (!courseInfo.price && courseInfo.canSellAlone)) && courseInfo.courseType === 2) {
                    self.getVideo();
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

    changeFollowTeacherState = (status) => {
        const self = this;
        self.setState({
            isFollowClassroom: status
        });
    }

    singleOpt = (e) => {
        e.stopPropagation();
        EventProxy.trigger('SingleOpt');
    }

    clickPlayer = () => {
        const self = this;

        if (!getVideoInfo) {
            Ui.alert({
                content: '当前课程尚未上传视频'
            });
            return;
        }
        
        if (!self.state.isPlaying) {
            self.setState({
                isPlaying: !0
            });
            // 播放视频课
            // document.domain = 'weishi100.com';
            const videoPlayer = document.getElementsByTagName('video');
            if (videoPlayer[0].readyState === 4) {
                videoPlayer[0].play();
                $(videoPlayer).attr('autoplay', 'autoplay');
            }
        }
    }

    getVideo = () => {
        const params = {
            courseId: courseId
        };
        AJAXSERVICE.get(AJAXCONFIG.GET_VIDEO_TOKEN, params).then(function (res) {
            if (res && res.code === 200) {
                // 初始化播放
                const data = res.data;
                getVideoInfo = true;
                data.container = '.player-container';
                data.id = data.playVideoId;
                data.courseId = courseId;
                VideoPlayer.initPlayer(data);
            }
        });
    }

    render() {
        const self = this;

        return (
            <div className="single-course">
                <div className="single-course-img">
                    <div className={self.state.isPlaying ? 'hide' : 'single-course-cover'}>
                        <ImgItem 
                            img={self.state.courseInfo.coverUrl}
                            isTop
                        />
                        <div className="single-opt" onClick={self.singleOpt}>
                            <i className="icon icon-player-start"></i>
                            <span>{self.state.playText}</span>
                        </div>
                    </div>
                    {/* <div className={self.state.isPlaying ? 'player-container' : 'palyer-container hide'}></div> */}
                    <div className="player-container"></div>
                </div>
                <CourseInfo 
                    courseInfo={self.state.courseInfo}
                />
                <CourseTip />
                <PurchaseSeries
                    data={self.state.seriesCourse}
                />
                <CourseDetail
                    detail={self.state.detail}
                    show
                />
                <PurchaseTip 
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
                    callbackParent={self.clickPlayer}
                />
            </div>
        );
    }
};

export default SingleContainer;