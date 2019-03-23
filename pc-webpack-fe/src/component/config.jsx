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
    // 默认头像
    DEFAULT_HEAD_URL: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/04/5add3de9114db.png',
    // 基本页面路由，按照模块划分
    ROUTE_BASE_NAME: {
        STUDENT: {
            MANAGE: {
                COMMENT: {
                    // 待评价页面
                    WAITING: '/student/manage/comment/waiting',
                    // 我的
                    LIST: '/student/manage/comment/list',
                }
            },
        }
    },
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
        0: '全部',
        1: '免费课',
        2: '付费课',
        3: '过期课'
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
    COURSE_TYPE_STRING: {
        0: '全部',
        1: '直播课',
        2: '视频课',
        3: '系列课',
        4: '提现',
        5: '其他',
        6: '支付手续费'
    },
    COURSE_SHOW: {
        ONLINE: 0,
        OFFLINE: 1,
    },
    ORDER_STATUS: {
        1: '待支付',
        2: '已支付',
        3: '已取消',
        4: '已退款',
        5: '申请退款中'
    },
    COURSE_LIVE_STATUS: {
        1: '待上课',
        2: '进行中',
        3: '已结束',
    },
    LIVE_CLIENT: {
        1: '进入教室',
    },
    NOASSISTANTTEACHERNUMBER: {
        1: '该课程暂无辅导老师',
    },
    LESSONWAYMAP: {
        1: '协商地点',
        2: '在线授课',
        4: '学生上门',
        8: '老师上门',
        16: '其它',
        32: '视频课程'
    },
    // 获取视频上传连接事件名称
    GET_UPLOAD_UTL_EVENT: 'get_upload_utl_event',


    TWENTYFOURHOURMSEC: 1000 * 60 * 60 * 24,
    COUNTDOWN: {
        0: '',
        1: '距活动开始: ',
        2: '距活动结束: ',
    },
};
export default config;
