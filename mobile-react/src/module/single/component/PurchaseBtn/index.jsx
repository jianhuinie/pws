/**
 * 购买系按钮
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
import EventProxy from 'common/eventProxy';
import WxContext from 'common/util/wxContext';
import Util from 'common/util/util';
import Ui from 'gsx-design/component/ui';
require('css-loader!./index.styl');
let info = {};
let purchaseFlag = !0;
let classId;

class PurchaseBtn extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            isShowTwoBtn: !1,
            publicQrcodeUrl: '',
            btnText: '',
            hasEnroll: !1,
            showBtn: true,
            landscape: false,
        };
    };

    componentDidMount() {
        const self = this;
        EventProxy.on('SingleOpt', function () {
            self.opt();
        });
        window.addEventListener('orientationchange', function () {
            const orientation = window.orientation;
            let landscape;
            if (orientation === 90 || orientation === -90) {
                landscape = true;
            } else {
                landscape = false;
            }
            self.setState({ landscape });
        }, false);  
    }

    componentWillReceiveProps(nextProps) {
        const self = this;
        const preData = self.props.data;
        const nextData = nextProps.data;
        if (preData.id !== nextData.id) {
            info = nextData;
            const btnText = Util.getPurchaseText(info);
            self.setState({ btnText });
        }
        if (!classId && nextProps.classId) {
            classId = nextProps.classId;
            self.getQrcodeImg();
        }
    }

    getQrcodeImg = () => {
        const self = this;
        const params = {
            classId: classId,
            courseId: info.id,
            courseMode: info.courseMode,
            followType: 3
        };
            
        AJAXSERVICE.post(AJAXCONFIG.CLASSROOM.GET_QRCODE, params).then(function (res) {
            if (res && res.code === 200) {
                const publicQrcodeUrl = res.data.qrcodeUrl;
                self.setState({ publicQrcodeUrl });
            }
        });
    }

    getLive = () => {
        const params = {
            courseId: info.id
        };
        const liveUrl = AJAXCONFIG.GET_LIVE_URL;
        // const isWeixin = Util.isWeixinBrowser();
        // if (!isWeixin) {
            // liveUrl = AJAXCONFIG.GET_PCLIVE_URL;
        // }
        AJAXSERVICE.get(liveUrl, params).then(function (res) {
            if (res && res.code === 200) {
                const url = res.data.murl;
                location.href = url;
            }
        });
    }

    // 点击操作按钮
    opt = () => {
        // alert(window.orientation);
        const self = this;
        const unactiveBtn = self.unactiveBtn();
        if (self.state.hasEnroll) {
            return;
        }

        if (unactiveBtn) {
            return;
        }
        const params = {
            courseId: info.id,
            courseMode: info.courseMode
        };
        let seriesParams = {};
        if (info.seriesCourse) {
            seriesParams = {
                courseId: info.seriesCourse.id,
                courseMode: info.seriesCourse.courseMode
            };
        }
        // 单次课操作
        if (info.courseMode === 1) {
            // 已经购买或者报名
            if (info.havePermission) {
                // 直播课
                if (info.courseType === 1) {
                    self.getLive();
                // 视频课
                } else {
                    // 播放视频
                    self.props.callbackParent();
                }
            // 不可以单卖
            } else if (!info.canSellAlone) {
                // 不可以单卖的付费课
                if (info.seriesCourse && info.seriesCourse.price) {
                    self.getPayInfo(seriesParams);
                // 不可以单卖的免费课，报名
                } else {
                    self.enroll(seriesParams);
                }
            // 可以单卖的免费课
            } else if (!info.price) {
                self.enroll(params);
            // 可以单卖的收费课，且系列课收费
            } else if (info.seriesCourse && info.seriesCourse.price) {
                self.showTwoBtn();
            // 其他可以单卖的收费课
            } else {
                self.getPayInfo(params);
            }
        // 系列课操作
        } else if (info.courseMode === 2) {
            if (info.havePermission) {
                self.props.callbackParent(2);
                const showBtn = false;
                self.setState({ showBtn });
            } else if (info.price) {
                self.getPayInfo(params);
            } else {
                self.enroll(params);
            }
        }
    }

    enroll = (params) => {
        const self = this;
        if (purchaseFlag) {
            purchaseFlag = !1;
            AJAXSERVICE.post(AJAXCONFIG.COURSE.COURSE_ENROLL, params).then(function (res) {
                purchaseFlag = !0;
                if (res && res.code === 200) {
                    const hasEnroll = !0;
                    self.setState({ hasEnroll });
                    if (info.haveFollow) {
                        // Ui.alert('报名成功').then(function () {
                            self.afterEnroll();
                        // });
                    } else {
                        Ui.alert({
                            content: '<img src="' + self.state.publicQrcodeUrl + '">',
                        }).then(function () {
                            self.afterEnroll();
                        });
                    }
                }
            });
        }
    }

    afterEnroll = () => {
        const self = this;
        if (info.courseMode === 2) {
            self.props.callbackParent(2);
            const showBtn = false;
            self.setState({ showBtn });
        } else if (info.courseType === 2) {
            // 视频课播放
            self.props.callbackParent();
        } else if (info.canSignIn) {
            self.getLive();
        } else {
            let btnText = '已预约（开课前1小时可进入）';
            if (info.liveStatus === 3) {
                btnText = '回放生成中';
            }
            self.setState({ btnText });
            const playText = info.liveStatus === 3 ? '回放生成中' : '已预约';
            EventProxy.trigger('modifyBtnText', playText);
        }
    }

    getPayInfo = (params) => {
        const self = this;
        if (purchaseFlag) {
            purchaseFlag = !1;
            new WxContext().wxPay(AJAXCONFIG.COURSE.GET_PAY_INFO, params, () => {
                purchaseFlag = !0;
                let str = '/mweb/paySuccess?id=' + params.courseId + '&mode=' + params.courseMode;
                if (!info.haveFollow) {
                    str += '&classId=' + classId;
                }
                location.href = str;
            }, () => {
                purchaseFlag = !0;
            });
        }
    }

    purchaseSingle = (e) => {
        e.stopPropagation();
        const self = this;
        const params = {
            courseId: info.id,
            courseMode: info.courseMode
        };
        self.getPayInfo(params);
    }

    purchaseSeries = (e) => {
        e.stopPropagation();
        const self = this;
        const params = {
            courseId: info.seriesCourse.id,
            courseMode: info.seriesCourse.courseMode
        };
        self.getPayInfo(params);
    }

    hasShowTwoBtn = () => {
        return info.canSellAlone && info.price && info.seriesCourse && info.seriesCourse.price;
    }

    cancel = (e) => {
        e.stopPropagation();
        const self = this;
        const isShowTwoBtn = !1;
        self.setState({ isShowTwoBtn });
    }

    showTwoBtn = () => {
        const self = this;
        const isShowTwoBtn = !0;
        self.setState({ isShowTwoBtn });
    }

    unactiveBtn = () => {
        const self = this;
        return (info.courseMode === 1) 
            && (info.courseType === 1)
            && !info.canSignIn 
            && (info.havePermission || self.state.hasEnroll);
    }

    render() {
        const self = this;
        const hasShowTwoBtn = self.hasShowTwoBtn();
        const unactiveBtn = self.unactiveBtn();
        let clsName = '';
        if (self.state.landscape) {
            clsName = 'purchase-btn-page hide';
        } else if (self.state.showBtn) {
            if (unactiveBtn) {
                clsName = 'purchase-btn-page purchase-btn-page-gray';
            } else {
                clsName = 'purchase-btn-page';
            }
        } else {
            clsName = 'purchase-btn-page hide';
        }
        let singleText = '';
        let seriesText = '';
        if (hasShowTwoBtn) {
            singleText = '购买当前课¥' + info.price.toFixed(2);
            seriesText = '购买系列课¥' + info.seriesCourse.price.toFixed(2);
        }

        return (
            <div className={clsName} onClick={self.opt}>
                {self.state.btnText}
                <div className={self.state.isShowTwoBtn && hasShowTwoBtn ? 'purchase-choose' : 'purchase-choose hide'}>
                    <div 
                        className="purchase-choose-item purchase-choose-single"
                        onClick={self.purchaseSingle}
                    >{singleText}</div>
                    <div 
                        className="purchase-choose-item"
                        onClick={self.purchaseSeries}
                    >{seriesText}</div>
                    <div 
                        className="purchase-choose-item purchase-choose-cancel"
                        onClick={self.cancel}
                    >取消</div>
                </div>
            </div>
        );
    }
};

export default PurchaseBtn;