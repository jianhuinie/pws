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
            code: 0,
            data: {
                "id": "182319",
                "teacher_id": "582017568",
                "user_role": "0",
                "question_id": "70508186242",
                "content": "哈哈哈哈哈哈哈哈哈哈哈哈哈哈hhh哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈和哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈想嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻想哈哈哈哈哈哈哈哈哈哈",
                "pic": "185665",
                "create_time": "2016-06-24 10:45:04",
                "update_time": "2016-06-24 10:45:04",
                "comment_count": "1",
                "best_answer": null,
                "audio": "http://file.gsxservice.com/2539430_tsbfquq8.mp3",
                "audio_length": "30",
                "app_type": null,
                "verify_status": "0",
                "teacher": {
                    "number": "582017568",
                    "mobile": "18000100008",
                    "name": "丹丹就是这样",
                    "sex": 0,
                    "avatar_url": "http://test-img.gsxservice.com/727906_shabftpj.jpeg",
                    "usertype": 0,
                    "realname": "丹丹就是这样",
                    "display_name": "丹丹就是这样",
                    "vip": 0,
                    "nickname": "丹丹就是这样",
                    "category_name": "独立老师",
                    "domain": "582017568",
                    "school_age": "1",
                    "short_introduce": "丹丹就是这样",
                    "organization_id": null,
                    "detail_url": "http://test-m.genshuixue.com/582017568",
                    "institution": "独立老师"
                },
                "student": {
                    "number": "582017568",
                    "mobile": "18000100008",
                    "name": "丹丹就是这样",
                    "sex": 0,
                    "avatar_url": "http://test-img.gsxservice.com/727906_shabftpj.jpeg",
                    "usertype": 0,
                    "realname": "丹丹就是这样",
                    "display_name": "丹丹就是这样"
                },
                "pic_url": "http://test-img.gsxservice.com/733111_db4dk0j9.jpeg",
                "support_count": 1,
                "is_support": true
            },
        }
    };
};

/* eslint-enable fecs-camelcase */