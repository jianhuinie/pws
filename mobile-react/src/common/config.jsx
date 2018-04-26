/**
 * 公共配置文件
 * @date 2017/12/20
 */
const config = {
    PAGE_SIZE: {
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
    DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
    TIME_FORMAT: 'HH:mm:ss',
    HOUR_SECOND_FORMAT: 'HH:mm',
    COURSE_TYPE: {
        1: '直播',
        2: '视频'
    },
    COURSE_MODE: {
        1: '单次',
        2: '系列'
    },
    LIVE_STATUS: {
        1: '直播中',
        2: '未开始',
        3: '已结束'
    },
    PUBLIC_URL: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a55ee78e4f35.png',
    PUBLIC_QRCODE: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a81731d23465.png',
    CLASSROOM_QRCODE: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/03/5a9cc483ea871.png',
};
export default config;