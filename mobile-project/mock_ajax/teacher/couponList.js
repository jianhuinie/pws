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
module.exports = function(path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
            "code": 0,
            "msg": "succ",
            "data": {
                "user_number": "458285548",
                "coupon_list": [{
                    "serial_num": "19495412781357",
                    "source_user_role": "org",
                    "source_user_id": "10266",
                    "effect_time": "2016-12-06",
                    "expire_time": "2016-12-31",
                    "discount": null,
                    "value": "88.00",
                    "max_discount_money": null,
                    "cond_is_common": "1",
                    "cond_threshold": 0,
                    "cond_plat_limit": "0",
                    "max_recv_count": "1",
                    "status": "1",
                    "total_count": "11",
                    "bid": "92928",
                    "id": "19495412781357",
                    "balance": 88,
                    "effect_time_true": "2016-12-06 00:00:00",
                    "expire_time_true": "2016-12-31 23:59:59",
                    "cond_class": [],
                    "cond_video": [],
                    "cond_class_list": [],
                    "cond_video_list": [],
                    "type": "cash",
                    "cond_course_type": 0,
                    "threshold": 0,
                    "status_type": "normal",
                    "status_name": "领取",
                    "user_get_count": 0,
                    "total_send_count": "2",
                    "rules": [
                        "仅可购买岗仔老师的课程"
                    ],
                    "cond_limit": "仅可购买岗仔老师的课程"
                }, {
                    "serial_num": "19495412781357",
                    "source_user_role": "org",
                    "source_user_id": "10266",
                    "effect_time": "2016-12-06",
                    "expire_time": "2016-12-31",
                    "discount": null,
                    "value": "88.00",
                    "max_discount_money": null,
                    "cond_is_common": "1",
                    "cond_threshold": 0,
                    "cond_plat_limit": "0",
                    "max_recv_count": "1",
                    "status": "1",
                    "total_count": "11",
                    "bid": "92928",
                    "id": "19495412781357",
                    "balance": 88,
                    "effect_time_true": "2016-12-06 00:00:00",
                    "expire_time_true": "2016-12-31 23:59:59",
                    "cond_class": [],
                    "cond_video": [],
                    "cond_class_list": [],
                    "cond_video_list": [],
                    "type": "cash",
                    "cond_course_type": 0,
                    "threshold": 0,
                    "status_type": "normal",
                    "status_name": "领取",
                    "user_get_count": 0,
                    "total_send_count": "2",
                    "rules": [
                        "仅可购买岗仔老师的课程"
                    ],
                    "cond_limit": "仅可购买岗仔老师的课程"
                }, {
                    "serial_num": "19495412781357",
                    "source_user_role": "org",
                    "source_user_id": "10266",
                    "effect_time": "2016-12-06",
                    "expire_time": "2016-12-31",
                    "discount": null,
                    "value": "88.00",
                    "max_discount_money": null,
                    "cond_is_common": "1",
                    "cond_threshold": 0,
                    "cond_plat_limit": "0",
                    "max_recv_count": "1",
                    "status": "1",
                    "total_count": "11",
                    "bid": "92928",
                    "id": "19495412781357",
                    "balance": 88,
                    "effect_time_true": "2016-12-06 00:00:00",
                    "expire_time_true": "2016-12-31 23:59:59",
                    "cond_class": [],
                    "cond_video": [],
                    "cond_class_list": [],
                    "cond_video_list": [],
                    "type": "cash",
                    "cond_course_type": 0,
                    "threshold": 0,
                    "status_type": "normal",
                    "status_name": "领取",
                    "user_get_count": 0,
                    "total_send_count": "2",
                    "rules": [
                        "仅可购买岗仔老师的课程"
                    ],
                    "cond_limit": "仅可购买岗仔老师的课程"
                }],
                "source_user_role": "teacher",
                "source_user_name": "岗仔",
                "course_url": "http://m.genshuixue.com/458285548"
            },
            "ts": 1481546658,
            "declare_config": {
                "declareTpl": "coupon/couponList"
            }
        }
    };
};
