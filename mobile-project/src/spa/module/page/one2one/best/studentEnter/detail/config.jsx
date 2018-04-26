/**
 * 一对一优选详情页面接口
 * @file leon
 */
const config = {
    PATHS: {
        // TODO：页面详情数据
        DETAIL: '/preferredOneOnOne/detail',
        CHECKMOBILE: '/auth/check_mobile_ajax',
        SENDSMS: '/sms/send',
        SUBMIT: '/preferredOneOnOne/submit'
    },
    MOBILEREG: /^1\d{10}$/
};

export default config;