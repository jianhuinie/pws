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
                "order_type": 1,
                "order_type_name": "综合",
                "course_type": 1,
                "course_type_name": "直播课",
                "page": {
                    "total_number": "57",
                    "next_cursor": "2",
                    "has_more": true
                },
                "list": [{
                    "course_desc": "视频课",
                    "course_type": "4",
                    "name": "11111111111111",
                    "number": "16020274807",
                    "photo_url": "http://test-img.gsxservice.com/426488_rkealsj7.jpeg",
                    "price": 30,
                    "url": "/video_course/getcourseshowdetail?number=16020274807"
                }, {
                    "course_desc": "视频课",
                    "course_type": "4",
                    "name": "ff",
                    "number": "15102073839",
                    "photo_url": "http://test-img.gsxservice.com/388329_9jt98u74.jpeg",
                    "price": 30,
                    "url": "/video_course/getcourseshowdetail?number=15102073839"
                },{
                    "course_desc": "视频课",
                    "course_type": "4",
                    "name": "11111111111111",
                    "number": "16020274807",
                    "photo_url": "http://test-img.gsxservice.com/426488_rkealsj7.jpeg",
                    "price": 30,
                    "url": "/video_course/getcourseshowdetail?number=16020274807"
                }, {
                    "course_desc": "视频课",
                    "course_type": "4",
                    "name": "ff",
                    "number": "15102073839",
                    "photo_url": "http://test-img.gsxservice.com/388329_9jt98u74.jpeg",
                    "price": 30,
                    "url": "/video_course/getcourseshowdetail?number=15102073839"
                },{
                    "course_desc": "视频课",
                    "course_type": "4",
                    "name": "11111111111111",
                    "number": "16020274807",
                    "photo_url": "http://test-img.gsxservice.com/426488_rkealsj7.jpeg",
                    "price": 30,
                    "url": "/video_course/getcourseshowdetail?number=16020274807"
                }, {
                    "course_desc": "视频课",
                    "course_type": "4",
                    "name": "ff",
                    "number": "15102073839",
                    "photo_url": "http://test-img.gsxservice.com/388329_9jt98u74.jpeg",
                    "price": 30,
                    "url": "/video_course/getcourseshowdetail?number=15102073839"
                }]
            },
            "ts": 1477015483,
            "declare_config": {
                "declareTpl": "org/newOrgNews"
            }
        }
    };
};

/* eslint-enable fecs-camelcase */