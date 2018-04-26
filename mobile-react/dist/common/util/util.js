define(function (require, exports) {
    'use strict';
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    var _url = require('gsx-design/util/url');
    var _wxContext = require('common/util/wxContext');
    var moment = require('moment');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _url2 = _interopRequireDefault(_url);
    var _wxContext2 = _interopRequireDefault(_wxContext);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function getStudentCntText(data) {
        var text = getStudentCnt(data);
        text += '人在学';
        return text;
    }
    function getStudentCnt(data) {
        var num = data.learnCnt;
        if (num >= 10000) {
            num = (num / 10000).toFixed(1) + '万';
        }
        return num;
    }
    function getPriceText(data) {
        var text = void 0;
        if (data.price) {
            text = '\xA5 ' + data.price.toFixed(2);
        } else {
            text = '免费';
        }
        return text;
    }
    function getTimeText(data) {
        var text = '';
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
    function getClassTypeText(data, flag) {
        var text = '系列';
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
        var text = getClassTypeText(data);
        var timeStr = getTimeText(data);
        if (timeStr) {
            text += ' | ' + timeStr;
        }
        return text;
    }
    function getStartTime(time) {
        var today = moment().format('YYYY-MM-DD');
        var formatTime = moment(time);
        var startTime = formatTime.format('YYYY-MM-DD');
        var text = void 0;
        if (today === startTime) {
            text = '今天 ' + formatTime.format('HH:mm') + '上课';
        } else {
            text = formatTime.format('MM') + '月' + formatTime.format('DD') + '日 ' + formatTime.format('HH:mm') + '上课';
        }
        return text;
    }
    function timeShow(num) {
        var minute = Math.ceil(num / 60);
        var text = minute + '分钟';
        if (minute >= 60) {
            var hour = Math.floor(minute / 60);
            text = hour + '小时' + (minute - hour * 60) + '分钟';
        }
        return text;
    }
    function getLessonText(data, isDiscovery) {
        var text = '共' + data.planCourseCnt + '节课';
        if (isDiscovery) {
            text = '系列 | ' + text;
        }
        return text;
    }
    function wxPay(params, callback) {
        _ajaxService2.default.post(_ajaxConfig2.default.COURSE.GET_PAY_INFO, params).then(function (res) {
            if (res && res.code === 200) {
                var data = res.data;
                wx.chooseWXPay({
                    timestamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: data.signType,
                    paySign: data.paySign,
                    success: function success() {
                        if (callback && typeof callback === 'function') {
                            callback();
                        }
                    }
                });
            }
        });
    }
    function isWeixinBrowser() {
        var ua = navigator.userAgent.toLowerCase();
        return /micromessenger/.test(ua);
    }
    function shareCourse(data) {
        var wxSdk = new _wxContext2.default();
        wxSdk.initContext().then(function () {
            wxSdk.setShareInfo({
                title: data.course.name,
                link: location.href,
                desc: data.classroom.name,
                imgUrl: data.course.coverUrl
            });
        });
    }
    function shareClassroom(data) {
        var wxSdk = new _wxContext2.default();
        var shareIntro = void 0;
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
                imgUrl: data.headUrl
            });
        });
    }
    function sharePage() {
        var wxSdk = new _wxContext2.default();
        wxSdk.initContext().then(function () {
            wxSdk.setShareInfo({
                title: '最好用的微课平台\uFF0C支持直播\u3001视频\u3001语音等学习方式\uFF0C一分钟创\u2026',
                link: location.protocol + '//' + location.host + '/mweb/discovery/',
                desc: '最好用的微课平台\uFF0C支持直播\u3001视频\u3001语音等学习方式\uFF0C一分钟创建课堂\u3002与五千万伙伴一同成长\u2026',
                imgUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a900ff4e7612.png'
            });
        });
    }
    function getPurchaseText(data, flag) {
        var text = void 0;
        if (data.courseMode === 1) {
            if (data.havePermission) {
                if (data.courseType === 2) {
                    text = '开始学习';
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
                        text = '已预约\uFF08开课前1小时可进入\uFF09';
                    }
                }
            } else if (data.courseType === 2) {
                if (data.canSellAlone) {
                    if (data.price) {
                        text = '购买课程';
                    } else {
                        text = '开始学习';
                    }
                } else if (data.seriesCourse && data.seriesCourse.price) {
                    text = '购买系列课';
                } else {
                    text = '开始学习';
                }
            } else if (data.canSellAlone) {
                if (data.price) {
                    text = '购买课程';
                } else {
                    text = '立即预约';
                }
            } else if (data.seriesCourse && data.seriesCourse.price) {
                text = '购买系列课';
            } else {
                text = '立即预约';
            }
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
        var urlStr = (0, _url2.default)().hash.split('?')[1];
        var dataObj = {};
        if (urlStr) {
            var urlArr = urlStr.split('&');
            urlArr.forEach(function (value) {
                var tempArr = value.split('=');
                dataObj[tempArr[0]] = decodeURIComponent(tempArr[1]);
            });
        }
        return dataObj;
    }
    function getUserInfo() {
        return _ajaxService2.default.synchGet(_ajaxConfig2.default.USER.GET_USER, {});
    }
    exports.default = {
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
        getUserInfo: getUserInfo
    };
});