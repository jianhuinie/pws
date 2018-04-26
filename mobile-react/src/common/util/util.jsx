/**
 * 公共业务方法
 * @date 2017/12/20
 */
import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
import Url from 'gsx-design/util/url';
import WxContext from 'common/util/wxContext';
const moment = require('moment');

// 学生学习报名情况显示
function getStudentCntText(data) {
    let text = getStudentCnt(data);
    text += '人在学';
    return text;
}

// 学生数量显示
function getStudentCnt(data) {
    let num = data.learnCnt;
    if (num >= 10000) {
        num = (num / 10000).toFixed(1) + '万';
    }
    return num;
}

// 课程价格显示
function getPriceText(data) {
    let text;
    if (data.price) {
        text = '¥ ' + data.price.toFixed(2);
    } else {
        text = '免费';
    }
    return text;
}

function getTimeText(data) {
    let text = '';
    if (data.courseType === 2) {
        text = '时长' + timeShow(data.videoLength);
    } else if (data.liveStatus === 4) {
        text = '时长' + timeShow(data.videoLength);
    } else if (data.liveStatus === 1) {
        text = '直播中';
    } else if (data.liveStatus === 3 && data.videoLength) {
        text = '时长' + timeShow(data.videoLength);
    } else if (data.liveStatus === 3 && !data.videoLength) {
        text = '';
    } else if (data.liveStatus === 2) {
        text = getStartTime(data.startTime);
    }
    return text;
}

// 单次课课程类型显示
function getClassTypeText(data, flag) {
    let text = '系列';
    if (data.courseMode === 1) {
        text = '视频';
        if (data.courseType === 1) {
            text = '直播';
            if (data.liveStatus === 4) {
                text = '直播回放';
                if (flag) {
                    text = '回放';
                }
            } else if (data.liveStatus === 3) {
                text = '回放生成中';
            }
        }
    }
    return text;
}

function getSingleCourseMiddleInfo(data) {
    let text = getClassTypeText(data);
    const timeStr = getTimeText(data);
    if (timeStr) {
        text += ' | ' + timeStr;
    }
    return text;
}

function getStartTime(time) {
    const today = moment().format('YYYY-MM-DD');
    const formatTime = moment(time);
    const startTime = formatTime.format('YYYY-MM-DD');
    let text;
    if (today === startTime) {
        text = '今天 ' + formatTime.format('HH:mm') + '上课';
    } else {
        text = formatTime.format('MM') + '月' + formatTime.format('DD') + '日 ' + formatTime.format('HH:mm') + '上课';
    }
    return text;
}

function timeShow(num) {
    const minute = Math.ceil(num / 60);
    let text = minute + '分钟';
    if (minute >= 60) {
        const hour = Math.floor(minute / 60);
        text = hour + '小时' + (minute - hour * 60) + '分钟';
    }
    return text;
}

// 系列课开课课节信息
function getLessonText(data, isDiscovery) {
    let text = '共' + data.planCourseCnt + '节课';
    // if (data.currentCourseCnt) {
    //     text = '已开课' + data.currentCourseCnt + '节课 | ' + text;
    // }
    if (isDiscovery) {
        text = '系列 | ' + text;
    }
    return text;
}

// 微信支付
function wxPay(params, callback) {
    AJAXSERVICE.post(AJAXCONFIG.COURSE.GET_PAY_INFO, params).then(function (res) {
        if (res && res.code === 200) {
            const data = res.data;
            wx.chooseWXPay({
                timestamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign,
                // 支付成功后的回调函数
                success: function () {
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                }
            });
        }
    });
}

// 判断是否在微信里
function isWeixinBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua));
}

function shareCourse(data) {
    const wxSdk = new WxContext();
    wxSdk.initContext().then(function () {
        wxSdk.setShareInfo({
            title: data.course.name,
            link: location.href,
            desc: data.classroom.name,
            imgUrl: data.course.coverUrl,
            // imgUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a900ff4e7612.png',
        });
    });
}

function shareClassroom(data) {
    const wxSdk = new WxContext();
    let shareIntro;
    if (data.intro) {
        shareIntro = data.intro.substr(0, 40);
    } else {
        shareIntro = '成就更好的你';
    }
    wxSdk.initContext().then(function () {
        wxSdk.setShareInfo({
            title: data.name,
            link: location.href,
            desc: shareIntro,
            imgUrl: data.headUrl,
            // imgUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a900ff4e7612.png',
        });
    });
}

function sharePage() {
    const wxSdk = new WxContext();
    wxSdk.initContext().then(function () {
        wxSdk.setShareInfo({
            title: '最好用的微课平台，支持直播、视频、语音等学习方式，一分钟创…',
            link: location.protocol + '//' + location.host + '/mweb/discovery/',
            desc: '最好用的微课平台，支持直播、视频、语音等学习方式，一分钟创建课堂。与五千万伙伴一同成长…',
            imgUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a900ff4e7612.png',
        });
    });
}

// 课程详情页播放按钮文案
function getPurchaseText(data, flag) {
    let text;
    // 单次课详情页
    if (data.courseMode === 1) {
        // 已报名或已购买
        if (data.havePermission) {
            // 视频课
            if (data.courseType === 2) {
                text = '开始学习';
            // 直播课
            } else if (data.liveStatus === 1) {
                text = '进入直播';
            } else if (data.liveStatus === 4) {
                text = '观看回放';
            } else if (data.liveStatus === 3) {
                text = '回放生成中';
            } else if (data.liveStatus === 2) {
                if (data.canSignIn) {
                    text = '进入直播';
                } else if (flag) {
                    text = '已预约';
                } else {
                    text = '已预约（开课前1小时可进入）';
                }
            } 
        // 视频课报名或者购买前
        } else if (data.courseType === 2) {
            // 允许单卖
            if (data.canSellAlone) {
                if (data.price) {
                    text = '购买课程';
                } else {
                    text = '开始学习';
                }
            // 不单卖付费课
            } else if (data.seriesCourse && data.seriesCourse.price) {
                text = '购买系列课';
            } else {
                text = '开始学习';
            }
        // 直播课报名或者购买前
        } else if (data.canSellAlone) {
            if (data.price) {
                text = '购买课程';
            } else {
                text = '立即预约';
            }
        // 不单卖付费课
        } else if (data.seriesCourse && data.seriesCourse.price) {
            text = '购买系列课';
        } else {
            text = '立即预约';
        }
    // 系列课详情页
    } else if (data.courseMode === 2) {
        if (data.havePermission) {
            text = '开始学习';
        } else if (data.price) {
            text = '购买系列课';
        } else {
            text = '开始学习';
        }
    }
    return text;
}

function getHashParams() {
    const urlStr = Url().hash.split('?')[1];
    const dataObj = {};

    if (urlStr) {
        const urlArr = urlStr.split('&');
        urlArr.forEach(function (value) {
            const tempArr = value.split('=');
            dataObj[tempArr[0]] = decodeURIComponent(tempArr[1]);
        });
    }
    return dataObj;
}

// 判断是否登录
function getUserInfo() {
    return AJAXSERVICE.synchGet(AJAXCONFIG.USER.GET_USER, {});
}

export default {
    getClassTypeText: getClassTypeText,
    getStudentCntText: getStudentCntText,
    getStudentCnt: getStudentCnt,
    getPriceText: getPriceText,
    getTimeText: getTimeText,
    getLessonText: getLessonText,
    wxPay: wxPay,
    isWeixinBrowser: isWeixinBrowser,
    shareCourse: shareCourse,
    sharePage: sharePage,
    shareClassroom: shareClassroom,
    getSingleCourseMiddleInfo: getSingleCourseMiddleInfo,
    getStartTime: getStartTime,
    timeShow: timeShow,
    getPurchaseText: getPurchaseText,
    getHashParams: getHashParams,
    getUserInfo: getUserInfo,
};