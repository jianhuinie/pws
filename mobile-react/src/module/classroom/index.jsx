/**
 * 课堂页面
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
import FollowTeacher from './component/FollowTeacher/index';
import SingleClass from './component/SingleClass/index';
import SeriesClass from './component/SeriesClass/index';
import ImgSrc from 'module/series/component/ImgSrc/index';
import ClassroomFooter from './component/ClassroomFooter/index';
import GuideDialog from 'module/components/GuideDialog/index';
import Operation from 'module/components/Operation/index';
import Carousel from 'common/components/Carousel/index';
import Loading from 'gsx-design/component/Loading/index';
import EventProxy from 'common/eventProxy';
import CONFIG from 'common/config';
import QrcodeImg from 'module/components/QrcodeImg/index';
import FollowClassroom from 'module/classroom/component/FollowClassroom/index';
import EmptyList from 'module/classroom/component/EmptyList/index';
import Url from 'gsx-design/util/url';
import Util from 'common/util/util';
const classroomId = +Url().params.id;
let singlePageNum = 1;
let seriesPageNum = 1;
let isLogin = false;
require('css-loader!./index.styl');

class classroomContainer extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            followPublic: !1,
            followTeacher: !1,
            imgItem: {},
            singleList: [],
            seriesList: [],
            singleNum: 0,
            seriesNum: 0,
            hasMoreSingList: !0,
            hasMoreSeriesList: !0,
            showGuideDialog: !1,
            showOperation: !1,
            bannerList: [],
            isInit: false,
            getDetail: false,
            getSeriesList: false,
            getSingleList: false,
            showEmptyList: false,
        };
    };

    componentWillMount() {
        Util.getUserInfo().then(function (res) {
            if (res && res.code === 200) {
                isLogin = true;
            }
        });
    }

    componentDidMount() {
        const self = this;
        self.loading = new Loading();
        self.loading.show();
        self.getSingleList();
        self.getSeriesList();
        self.getDetail();
        self.getUserInfo();
    }

    getSingleList = () => {
        const self = this;
        const params = {
            classroomId: classroomId,
            pageNum: singlePageNum
        };
        AJAXSERVICE.get(AJAXCONFIG.CLASSROOM.SINGLE_COURSE_LIST, params).then(function (res) {
            if (res && res.code === 200) {
                const singleList = self.state.singleList.concat(res.data.courses);
                const singleNum = res.pageDto.count;
                const hasMoreSingList = res.data.courses.length === 10;
                let showEmptyList = false;
                if (singlePageNum === 1 && singleNum === 0 && self.state.seriesNum === 0) {
                    showEmptyList = true;
                }
                const getSingleList = true;
                singlePageNum++;
                self.setState({ singleList, hasMoreSingList, getSingleList, singleNum, showEmptyList });
                if (!self.state.isInit) {
                    self.changeLoadingPage(self.state.getDetail, self.state.getSeriesList, true);
                }
            }
        });
    }

    changeLoadingPage = (getDetail, getSeriesList, getSingleList) => {
        const self = this;
        const isInit = getDetail && getSeriesList && getSingleList;
        self.setState({ isInit });
        if (isInit) {
            self.loading.hide();
            self.loading.destroy();
        }
    }

    getSeriesList = () => {
        const self = this;
        const params = {
            classroomId: classroomId,
            pageNum: seriesPageNum
        };
        AJAXSERVICE.get(AJAXCONFIG.CLASSROOM.SERIES_COURSE_LIST, params).then(function (res) {
            if (res && res.code === 200) {
                const seriesList = self.state.seriesList.concat(res.data.courses);
                const hasMoreSeriesList = res.data.courses.length === 10;
                const seriesNum = res.pageDto.count;
                const getSeriesList = true;
                let showEmptyList = false;
                if (seriesPageNum === 1 && seriesNum === 0 && self.state.singleNum === 0) {
                    showEmptyList = true;
                }
                seriesPageNum++;
                self.setState({ seriesList, hasMoreSeriesList, getSeriesList, seriesNum, showEmptyList });
                if (!self.state.isInit) {
                    self.changeLoadingPage(self.state.getDetail, true, self.state.getSingleList);
                }
            }
        });
    }

    getDetail = () => {
        const self = this;
        const params = {
            classId: classroomId
        };

        AJAXSERVICE.post(AJAXCONFIG.CLASSROOM.SHOW_DETAIL, params).then(function (res) {
            if (res && res.code === 200) {
                const detail = res.data;
                document.title = detail.name;
                const bannerList = detail.bannerList;
                const imgItem = bannerList[0];
                const showGuideDialog = detail.isNeedGuide;
                const followTeacher = detail.isFollow;
                const showOperation = detail.isSelfClass;
                const getDetail = true;
                self.setState({ 
                    detail, imgItem, followTeacher, showGuideDialog, showOperation, bannerList, getDetail
                });
                if (!self.state.isInit) {
                    self.changeLoadingPage(true, self.state.getSeriesList, self.state.getSingleList);
                }
                Util.shareClassroom(detail);
            }
        });
    }

    getUserInfo = () => {
        const self = this;
            
        AJAXSERVICE.get(AJAXCONFIG.USER.GET_USER, {}).then(function (res) {
            if (res && res.code === 200) {
                const followPublic = res.data.user.isSubcribeMp;
                self.setState({ followPublic });
            }
        });
    }

    changeFollowTeacherState = (status) => {
        const self = this;
        self.setState({
            followTeacher: status
        });
    }

    showPublic = () => {
        EventProxy.trigger('showQrcode');
    }

    render() {
        const self = this;
        const sliderLen = self.state.bannerList.length;
        const imgItem = self.state.bannerList[0];
        if (!isLogin) {
            return (<div></div>);
        }

        return (
            <div className="class-room">
                <div className={self.state.isInit ? '' : 'hide'}>
                    <div className={sliderLen ? 'classroom-img' : 'classroom-img hide'}>
                        {
                            sliderLen === 1 ? 
                                <ImgSrc 
                                    img={imgItem.coverUrl}
                                    url={imgItem.clickUrl}
                                /> 
                                :
                                <Carousel 
                                    images={self.state.bannerList}
                                />
                        }
                    </div>
                    <FollowTeacher
                        detail={self.state.detail}
                        classId={classroomId}
                        followPublic={self.state.followPublic}
                        isFollow={self.state.followTeacher}
                        callbackParent={self.changeFollowTeacherState}
                    />
                    <SingleClass 
                        singleList={self.state.singleList}
                        hasMore={self.state.hasMoreSingList}
                        callbackParent={self.getSingleList}
                        num={self.state.singleNum}
                    />
                    <SeriesClass 
                        seriesList={self.state.seriesList}
                        hasMore={self.state.hasMoreSeriesList}
                        callbackParent={self.getSeriesList}
                        num={self.state.seriesNum}
                    />
                    <FollowClassroom 
                        classId={classroomId}
                        show={!self.state.followPublic}
                    />
                    <EmptyList 
                        show={self.state.showEmptyList}
                    />
                    <div className="empty-class"></div>
                    <ClassroomFooter 
                        showPublic={self.showPublic}
                    />
                    <GuideDialog 
                        isAuth={self.state.detail.authStatus === 2}
                        isShowDialog={self.state.isInit && self.state.showGuideDialog} 
                    />
                    <Operation isShow={self.state.isInit && self.state.showOperation} />
                    <QrcodeImg 
                        img={CONFIG.PUBLIC_URL}
                    />
                </div>
            </div>
        );
    }
};

export default classroomContainer;