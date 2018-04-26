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
            "message": "获取生源信息详情成功",
            "data": {
                "item": {
                    "number": 3129836006803,
                    "course_name": "数学",
                    "support_online": "1",
                    "exp_price": "2",
                    "vip_exclusive_time": 111,
                    "info": "测试呀测试呀测试呀测试呀测试亚测试",
                    "create_time": "2016-09-07 11:17:36",
                    "url": "http://test-m.genshuixue.com/tcenter/hall/get?number=3129836006803",
                    "address": "",
                    "page_view": "100",
                    "student": {
                      "avatar_url": "http://test-img.gsxservice.com/81_xvle7ck2.jpeg",
                      "display_name2": "用户9113"
                    },
                    "display_status": {
                        "name": "已报名",
                        "color": "#ff9100"
                    },
                    "allow_action": {
                        "action": "join",
                        "name": "立即报名"
                    }
                },
                "teacher_info": [
                    {
                        "display_name": "AA",
                        "short_introduce": "咯咯哦哦哦",
                        "vip_level": 1,
                        "display_school_age": "1年",
                        "home_url": "http://test-m.genshuixue.com/415665478",
                        "avatar_url": "http://test-img.gsxservice.com/780065_6sj96y5a.jpeg",
                        "location_addr": "北京市海淀区软件园西二路",
                        "comment_summary": {
                          "avg": 0,
                          "count": 1
                        },
                        "user_id": 347180,
                        "join_reason": "reason",
                        "course_number": "15020167640",
                        "course_type": "3",
                        "recommend_course": {
                            "cover_url": "https://test-img.genshuixue.com/178999_qamf8trd.jpeg",
                            "course_name": "视频课-考拉的喂养实战教学",
                            "url": "http://test-m.genshuixue.com/video_course/getcourseshowdetail?number=15020167640",
                            "course_type_cn": 'sdad'
                        }
                    }
                ],
                "teacher": {
                    "is_valid": 1
                }
            },
            "render": null
        }
    };
};

/* eslint-enable fecs-camelcase */