/**
/**
 * @file mock data
 * @author autoresponse
 */

/* eslint-disable fecs-camelcase */

/**
 * 获取 mock 响应数据
 *
 * @param {string} path 请求路径名
 * @param {Object} queryParam 查询参数信息
 * @param {Object} postParam post 的查询参数信息
 * @return {Object}
 */
module.exports = function (path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
    "code": 0,
    "message": "获取生源信息详情成功",
    "data": {
        "item": {
            "number": 3196946227603,
            "course_name": "葫芦丝",
            "support_online": "1",
            "exp_price": "双方协商",
            "vip_exclusive_time": -62544,
            "info": "激动激动激动激动激动激动度假酒店",
            "create_time": "2017-01-17 21:23:35",
            "url": "http://test-m.genshuixue.com/tcenter/hall/get?number=3196946227603",
            "sex": "2",
            "user_role": "0",
            "mobile": "13611093523",
            "display_status": {
                "name": "我要报名",
                "color": "#37a4f5"
            },
            "allow_action": {
                "action": "join",
                "name": "立即报名"
            },
            "page_view": 25,
            "address": "udiwaudow",
            "user_number": "874933558",
            "im_online_status": 3,
            "status": "1",
            "verify_status": "1",
            "user": {
                "avatar_url_mobile": "https://test-imgs.genshuixue.com/400380_m399rihd.jpeg",
                "display_name2": "周佳佳佳佳"
            }
        },
        "is_own": true,
        "joined_teachers_info": [],
        "teacher": {
            "is_valid": 1
        },
        "user_mobile": "13611093523",
        "record_virtual_mobile": "01089192621"
    },
    "render": "/v2/resources/page/studentRoom/teacher/detail/index"
}
    };
};

/* eslint-enable fecs-camelcase */
