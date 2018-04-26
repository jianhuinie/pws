/**
 * 发现首页
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
import EnterDiscovery from './component/EnterDiscovery/index';
import DiscoveryFooter from './component/DiscoveryFooter/index';
import SubjectTab from './component/SubjectTab/index';
import SingleClassItem from 'module/classroom/component/SingleClassItem/index';
import SeriesClassItem from 'module/classroom/component/SeriesClassItem/index';
import GiftDialog from 'module/components/GiftDialog/index';
import DropLoad from 'gsx-design/component/DropLoad/index';
import ImgItem from 'module/series/component/ImgItem/index';
import Carousel from 'common/components/Carousel/index';
import Util from 'common/util/util';
import Url from 'gsx-design/util/url';
// import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
const fromPage = +Url().params.from;
let pageNum = 1;
let gettedTabs = !1;
let gettedSliders = !1;
let gettedLists = !1;
require('css-loader!./index.styl');

class discoveryContainer extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            loadingPage: !0,
            hasMore: !0,
            subjectId: 1,
            imgItem: {},
            tab: [],
            slider: [],
            list: [],
            showGiftDialog: !1,
        };
    };

    componentDidMount() {
        const self = this;

        self.getUserInfo();
        self.getTabs();
        self.getSliders();
        self.getLists();
        self.dropLoad = new DropLoad({
            element: $('.discovery-class-list'),
            callback: self.getLists
        });
        document.title = '发现';
        Util.sharePage();
    }

    // 判断是否能获取新人礼包
    getUserInfo = () => {
        const self = this;
            
        AJAXSERVICE.get(AJAXCONFIG.USER.GET_USER, {}).then(function (res) {
            if (res && res.code === 200) {
                const showGiftDialog = res.data.user.canReceiveGift;
                if (fromPage === 1) {
                    if (!showGiftDialog) {
                        location.href = '/mweb/gift';
                    } else {
                        self.reportReceiveGift();
                    }
                    self.setState({ showGiftDialog });
                } else {
                    const isNotedGift = !res.data.user.isNotedGift && showGiftDialog;
                    if (isNotedGift) {
                        self.reportReceiveGift();
                    }
                    self.setState({ 
                        showGiftDialog: isNotedGift
                    });
                }
            }
        });
    }

    getTabs = () => {
        const self = this;
        
        AJAXSERVICE.post(AJAXCONFIG.GET_SUBJECTS, {}).then(function (res) {
            if (res && res.code === 200) {
                const tab = res.data.subjects;
                self.setState({ tab });
                gettedTabs = !0;
                if (gettedTabs && gettedSliders && gettedLists) {
                    self.setState({
                        loadingPage: !1
                    });
                }
            }
        });
    }

    getSliders = (val) => {
        const self = this;
        const params = {
            subjectId: val || self.state.subjectId
        };

        AJAXSERVICE.get(AJAXCONFIG.GET_BANNERS, params).then(function (res) {
            if (res && res.code === 200) {
                const slider = res.data.banners;
                const imgItem = slider[0];
                self.setState({ slider, imgItem });
                gettedSliders = !0;
                if (gettedTabs && gettedSliders && gettedLists) {
                    self.setState({
                        loadingPage: !1
                    });
                }
            }
        });
    }

    getLists = (val) => {
        const self = this;
        const params = {
            pageNum: pageNum
        };
        const subjectId = val || self.state.subjectId;
        if (subjectId !== 1) {
            params.subjectId = subjectId;
        }

        return AJAXSERVICE.get(AJAXCONFIG.COURSE.GET_COURSE_LIST, params).then(function (res) {
            if (res && res.code === 200) {
                let list;
                if (pageNum === 1) {
                    list = res.data.courses;
                } else {
                    list = self.state.list.concat(res.data.courses);
                }
                pageNum++;
                const hasMore = !!res.data.courses.length;
                if (!hasMore) {
                    self.dropLoad.dispose();
                    self.dropLoad = null;
                }
                self.setState({ list, hasMore });
                gettedLists = !0;
                if (gettedTabs && gettedSliders && gettedLists) {
                    self.setState({
                        loadingPage: !1
                    });
                }
            }
        });
    }

    reportReceiveGift = () => {
        AJAXSERVICE.post(AJAXCONFIG.USER.REPORT_RECEIVE_GIFT, {}).then(function (res) {
            if (res && res.code === 200) {
                console.log(res);
            }
        });
    }

    changeTab = (id) => {
        const self = this;
        const subjectId = id;
        self.setState({ subjectId });
        pageNum = 1;
        self.getSliders(id);
        self.getLists(id);
    }

    closeGiftDialog = () => {
        const self = this;
        self.setState({
            showGiftDialog: !1
        });
    }

    componentDidUpdate() {
        // const self = this;
        // if (!self.state.loadingPage) {
        //     // LazyLoadImage.init();
        //     window.scrollTo(0, 1);
        // }
    }

    render() {
        const self = this;
        const sliderLen = self.state.slider.length;
        const imgItem = self.state.slider[0];
        const listComponet = self.state.list.map(function (item) {
            let html;
            if (item.courseMode === 1) {
                html = (<SingleClassItem key={item.id} data={item} />);
            } else {
                html = (<SeriesClassItem discovery key={item.id} data={item} />);
            }
            return html;
        });

        const loadingPage = self.state.loadingPage;

        return (
            <div className={loadingPage ? 'discovery-page loading-page' : 'discovery-page'}>
                <EnterDiscovery show={fromPage === 1 && loadingPage} />
                <div className={loadingPage ? 'hide-page' : 'loaded-page'}>
                    <SubjectTab
                        id={self.state.subjectId}
                        tab={self.state.tab}
                        callbackParent={self.changeTab}
                    />
                    <div className={sliderLen ? 'discovery-img' : 'discovery-img hide'}>
                        {
                            sliderLen === 1 ? 
                                <ImgItem 
                                    img={imgItem.coverUrl}
                                    url={imgItem.clickUrl}
                                    isTop
                                /> 
                                :
                                <Carousel 
                                    images={self.state.slider}
                                />
                        }
                    </div>
                    <div className="discovery-class-list">
                        {listComponet}
                    </div>
                    <div className="no-more"></div>
                    <DiscoveryFooter 
                        noShow={loadingPage}
                        current="discovery" 
                    />
                    <GiftDialog 
                        isShowDialog={!loadingPage && self.state.showGiftDialog} 
                        onClose={self.closeGiftDialog}
                    />
                </div>
            </div>
        );
    }
};

export default discoveryContainer;