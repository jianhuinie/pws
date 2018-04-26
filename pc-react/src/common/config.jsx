/**
 * 公共配置文件
 * @date 2017/12/20
 */
const config = {
    PAGE_SIZE: {
        PAGE_SIZE_3: 3,
        PAGE_SIZE_4: 4,
        PAGE_SIZE_10: 10,
        PAGE_SIZE_20: 20,
        PAGE_SIZE_50: 50
    },
    // 一天的毫秒数
    ONE_DAY_MILLISECONDS: 24 * 60 * 60 * 1000,
    // 一分钟毫秒数
    ONE_MINUTE_MILLISECONDS: 60 * 1000,
    // 日期格式
    DATE_FORMAT: 'yyyy-MM-dd',
    MOMENT_DATE_FORMAT: 'YYYY-MM-DD',
    DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm',
    TIME_FORMAT: 'HH:mm:ss',
    HOUR_SECOND_FORMAT: 'HH:mm',
    MENU: [
        {
            path: '/course',
            icon: 'icon-classroom',
            name: '课堂'
        },
        {
            icon: 'icon-course',
            name: '课程管理',
            children: [
                {
                    path: '/single',
                    icon: 'icon-single-course',
                    name: '单次课'
                },
                {
                    path: '/series',
                    icon: 'icon-series',
                    name: '系列课'
                },
            ]
        },
        {
            icon: 'icon-source',
            name: '资源管理',
            children: [
                {
                    path: '/video',
                    icon: 'icon-video',
                    name: '视频库'
                },
            ]
        },
        {
            icon: 'icon-finance',
            name: '财务管理',
            children: [
                {
                    path: '/income',
                    icon: 'icon-income',
                    name: '课堂收益'
                },
                {
                    path: '/order',
                    icon: 'icon-order',
                    name: '订单管理'
                },
                {
                    path: '/purse',
                    icon: 'icon-purse',
                    name: '钱包明细'
                },
            ]
        },
    ],
    COURSE_MENU: [
        {
            path: '/classroom',
            icon: 'icon-classroom',
            name: '首页'
        }
    ],
    PLAY_TYPE_STRING: {
        1: '直播课',
        2: '视频课'
    },
    PLAY_TYPE_NUM: {
        // 直播课和录播课
        LIVE_COURSE: 1,
        VIDEO_COURSE: 2
    },
    LIVE_STATUS_STRING: {
        0: '无',
        1: '直播中',
        2: '未开始',
        3: '已结束'
    },
    LIVE_STATUS_NUM: {
        // 直播状态
        LIVE_NULL: 0,
        LIVE_PLAYING: 1,
        LIVE_NOT_BEGIN: 2,
        LIVE_FINISH: 3
    },
    SELL_TYPE_STRING: {
        1: '免费课',
        2: '付费课'
    },
    SELL_TYPE_NUM: {
        FREE_COURSE: 1,
        PAIED_COURSE: 2
    },
    COURSE_TYPE_NUM: {
        // 单次课和系列课
        SINGLE_COURSE: 1,
        SERIES_COURSE: 2
    },
    COURSE_TYPE_STRING: {
        1: '单次课',
        2: '系列课'
    },
    VIDEO_TYPE: {
        // 视频状态
        VIDEO_FAILED: -1,
        VIDEO_NULL: 0,
        VIDEO_SUCCESS: 1,
        VIDEO_TRANSCODE: 2,
    },
    VIDEO_UPLOAD_STATUS_NUM: {
        TRANS_FAILED: 0,
        TRANS_ING: 1,
        TRANS_SUCCESS: 2
    },
    VIDEO_UPLOAD_STATUS_STRING: {
        0: '转码失败',
        1: '转码中',
        2: '转码成功'
    },
    INTRO_TYPE_NUM: {
        INTRO: 1,
        TEACHER: 2,
        PEOPLE: 3,
        GAIN: 4
    },
    INTRO_CONTENT_TYPE: {
        IMAGE: 1,
        TEXT: 2
    },
    INCOME_COURSE_TYPE_NUM: {
        ALL: 0,
        LIVE: 1,
        VIDEO: 2,
        SERIES: 3,
        WITHDRAW: 4,
        OTHER: 5,
        PAIED: 6
    },
    INCOME_COURSE_TYPE_STRING: {
        0: '全部',
        1: '直播课',
        2: '视频课',
        3: '系列课',
        4: '提现',
        5: '其他',
        6: '支付手续费'
    },
    EXPORT_TYPE: {
        INCOME: 1,
        ORDER: 2,
        PURSE: 3
    },
    COURSE_SHOW: {
        ONLINE: 0,
        OFFLINE: 1,
    },
    SERIES_SHOW: {
        ONLINE: 0,
        OFFLINE: 1,
    },

};
export default config;