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
                "is_vip": true,
                "class_name": [{
                    "name": "会员精选",
                    "url": "/parent/list",
                    "checked": true
                }, {
                    "name": "在线课堂",
                    "url": "/parent/list",
                    "checked": false
                }, {
                    "name": "线下体验",
                    "url": "/parent/list",
                    "checked": false
                }, {
                    "name": "线下体验",
                    "url": "/parent/list",
                    "checked": false
                }, {
                    "name": "线下体验",
                    "url": "/parent/list",
                    "checked": false
                }, {
                    "name": "线下体验",
                    "url": "/parent/list",
                    "checked": false
                }],
                "banner": [{
                    "pic_url": "http://img.gsxservice.com/10141944_qqpyhfz9.jpeg",
                    "link": "http://baidu.com",
                    "title": "图片标题"
                }, {
                    "pic_url": "http://img.gsxservice.com/13235716_tg8aqjom.jpeg",
                    "link": "http://baidu.com",
                    "title": "图片标题1"
                }, {
                    "pic_url": "http://img.gsxservice.com/4467068_p0tzy547.jpeg",
                    "link": "http://baidu.com",
                    "title": "图片标题2"
                }],
                "course_list": [{
                    "img": "http://img.gsxservice.com/13235716_tg8aqjom.jpeg",
                    "course_name": "少儿吉他培训班",
                    "course_type": 8,
                    "sign_up_number": 10,
                    "start_time": "8月30日20:00",
                    "tag": [
                        "会员免费",
                        "直播课",
                        null
                        "吉他",
                        "3-6岁"
                    ],
                    "url": "http://baidu.com"
                }, {
                    "img": "http://img.gsxservice.com/13235716_tg8aqjom.jpeg",
                    "course_name": "少儿吉他培训班2",
                    "course_type": 3,
                    "sign_up_number": 10,
                    "tag": [
                        "会员免费",
                        "视频课",
                        "吉他",
                        "3-6岁"
                    ],
                    "url": "http://baidu.com"
                }, {
                    "img": "http://img.gsxservice.com/13235716_tg8aqjom.jpeg",
                    "course_name": "少儿吉他培训班3",
                    "course_type": 1,
                    "teacher_name": "张三",
                    "area": "海淀区",
                    "tag": [
                        "会员免费",
                        "一对一",
                        "吉他",
                        "3-6岁"
                    ],
                    "url": "http://baidu.com"
                }, {
                    "img": "http://img.gsxservice.com/13235716_tg8aqjom.jpeg",
                    "course_name": "少儿吉他培训班4",
                    "course_type": 2,
                    "sign_up_number": 10,
                    "area": "海淀区",
                    "tag": [
                        "会员免费",
                        "线下班课",
                        "吉他",
                        "3-6岁"
                    ],
                    "url": "http://baidu.com"
                }],
                "pager": {
                    "total": 0,
                    "has_more": null,
                    "current_page": 1
                }
            },
            "ts": 1467268796
        }
    };
};

/* eslint-enable fecs-camelcase */