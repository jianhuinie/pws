define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var ajaxConfig = {
        GET_SUBJECTS: '/m/subject/getList',
        GET_BANNERS: '/m/banner/getList',
        UPLOAD_IMG: '/m/upload/uploadImg',
        GET_LIVE_URL: '/m/live/signin',
        GET_PCLIVE_URL: '/c/live/ssignin',
        GET_VIDEO_TOKEN: '/m/videoCourse/play',
        WECHAT_JS_SDK: '/m/jssdk/getPermissionConfig',
        CLASSROOM: {
            SINGLE_COURSE_LIST: '/m/classroom/singleCourseList',
            SERIES_COURSE_LIST: '/m/classroom/seriesCourseList',
            SHOW_DETAIL: '/m/classroom/showDetail',
            FOLLOW: '/m/classroom/follow',
            GET_QRCODE: '/m/classroom/getFollowClassQrcode',
            AUTHEN: '/m/classroom/authen',
            CREATE_ROOM: '/m/classroom/create',
            GET_CUSTOM_INFO: '/m/classroom/getKefu',
            GET_ROOM_SUMMARY: '/m/classroom/getSummary',
            GET_ROOM_BASE: '/m/classroom/showBase',
            UPDATE_ROOM_BASE: '/m/classroom/save',
            PAY_CREATE_ROOM: '/m/classroom/prePay'
        },
        USER: {
            GET_USER: '/m/user/get',
            GET_QRCODE: '/m/user/getMpQrcode',
            GET_GIFT_COURSES: '/m/user/giftCourses',
            GAIN_GIFT: '/m/user/gainGift',
            GET_FOLLOWS_CLASSES: '/m/user/getFollowClasses',
            GET_STUDENT_INFO: '/m/user/getStudentInfo',
            UPDATE_STUDENT_INFO: '/m/user/updateStudentInfo',
            GET_PURCHASE_RECORD: '/m/user/purchaseRecord',
            REPORT_RECEIVE_GIFT: '/m/user/reportReceiveGift'
        },
        COURSE: {
            GET_COURSE_LIST: '/m/course/getList',
            GET_COURSE_INFO: '/m/course/info',
            GET_COURSE_DETAIL: '/m/course/detail',
            GET_COURSE_COURSE: '/m/course/courses',
            GET_HAVE_BUY_LIST: '/m/myCourse/haveBuy',
            GET_RECENT_LEARN_LIST: '/m/myCourse/recentLearn',
            GET_WILL_BEGIN_LIST: '/m/myCourse/willBegin',
            COURSE_ENROLL: '/m/course/enroll',
            GET_PAY_INFO: '/m/course/prePay'
        },
        PHONE: {
            GET_CODE: '/m/verify/getCode',
            VERIFY: '/m/verify/verifyCode'
        },
        WALLET: {
            GET_DATAIL_LIST: '/m/wallet/detail',
            GET_DETAIL_SUM: '/m/wallet/detailSum',
            GET_SUMMARY: '/m/wallet/summary',
            WITHDRAW: '/m/wallet/withdraw',
            GET_WITHDRAW_SUMMARY: '/m/wallet/withdrawSummary',
            GET_WITHDRAW_DETAIL_LIST: '/m/wallet/withdrawDetail'
        },
        VIDEO: {
            SET_HISTORY: '/m/video/setPlayHistory',
            GET_HISTORY: '/m/video/getPlayHistory'
        }
    };
    exports.default = ajaxConfig;
});