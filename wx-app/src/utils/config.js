const devServer = 'https://test-m.genshuixue.com'
const proServer = 'https://m.genshuixue.com'

let path = null;
// es6 版本
if (NODE_ENV === 'dev') {
    path = devServer;
} else if (NODE_ENV === 'production') {
    path = proServer;
}
const config = {
    CAPTCHA_LENGTH: 4,
    // 服务地址
    SERVER_HOST: path,
    // 类型
    TYPE: 'signin',
    PATHS: {
        PV0: 'https://pb0.genshuixue.com/pv0.gif',
        /**
         * 获取短信验证码
         * @param {string} mobile
         * @param {string} type
         */
        SMS_CODE: '/sms/send',
        /**
         * 找老师接口
         * @param {string} user_name
         * @param {string} mobile
         */
        ADD_RECORD: '/recommend/add_record',
        /**
         * 获取验证码
         * method: GET
         * @param {string} captcha_name
         *        1、是用于做标示的，其实没有约束，尽量不重复就好。用 uuid 是最好的
         *        2、有两个特殊的 ,register, signin ，给 passport 用的
         *        3、个页面有10个 captcha, 如果名字一样，会互相覆盖的
         * @param {number} t 时间戳
         */
        CAPTCHA: '/captcha',
        /**
         * 获取验证码uniq_id
         */
        CAPTCHA_START: '/captcha/start',
        /**
         * 图片验证码校验
         * @param {string} captcha_name，和上面的统一
         * @param {string} captcha
         */
        CAPTCHA_VALIDATE: '/captcha/validate',
        /**
         * 获取我发布的找老师信息
         * @param {string} 类型
         *        1、my_published 我发布的；
         *        2、all 别人发布的
         */
        GET_PUBLISH_LIST: '/hall-student/list?type=',
        /**
         * 获取科目信息
         * GET
         */
        GET_SUBJECT_LIST: '/cms-liudan/get-subject-list',
        /**
         * 留单模板
         * GET
         */
        GET_ORDER_INDEX: '/cms-liudan/index',
        /**
         * 留单提交
         * POST
         */
        ORDER_SUBMIT: '/cms-liudan/submit',
        /**
         * 检查手机号是否已注册
         */
        CHECK_MOBILE: '/auth/check_mobile_ajax',
        /**
         * habo上报
         */
        HABO: 'https://click.genshuixue.com/gs.gif'
  }
};

export default config;
