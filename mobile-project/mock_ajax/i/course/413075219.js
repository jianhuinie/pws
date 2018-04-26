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
                "list": [{
                    "course_desc": "1对1 | 线下课",
                    "course_type": 1,
                    "lesson_way": "2 8",
                    "name": "高考地理-高三地理针对性复习",
                    "number": "357455158127",
                    "photo_url": "17837491_h1jfufp3.jpeg",
                    "price": 300,
                    "url": "https://m.genshuixue.com/teacher/one2oneCourseDetail/357455158127",
                    "preface": "https://img.genshuixue.com/17837491_h1jfufp3.jpeg",
                    "tag_fenqi": 0,
                    "discount": {
                        "start_time": "2017-01-24 06:08:16",
                        "end_time": "2017-02-24 06:08:16",
                        "type": 1,
                        "remain_amount": 1,
                        "pre_price": "1998",
                        "discount_price": 1598.4
                    }
                }, {
                    "course_desc": "1对1 | 线上课/线下课",
                    "course_type": 1,
                    "lesson_way": "1 2 8",
                    "name": "会考地理-高二会考地理复习",
                    "number": "357455076207",
                    "photo_url": "17837491_h1jfufp3.jpeg",
                    "price": 300,
                    "url": "https://m.genshuixue.com/teacher/one2oneCourseDetail/357455076207",
                    "preface": "https://img.genshuixue.com/17837491_h1jfufp3.jpeg",
                    "tag_fenqi": 0,
                    "discount": {
                        "start_time": "2017-01-24 06:08:16",
                        "end_time": "2017-02-24 06:08:16",
                        "type": 1,
                        "remain_amount": 1,
                        "pre_price": "1998",
                        "discount_price": 1598.4
                    }
                }, {
                    "course_desc": "1对1 | 线上课/线下课",
                    "course_type": 1,
                    "lesson_way": "1 2 8",
                    "name": "初中地理-一次课搞定七年级地理",
                    "number": "357455158087",
                    "photo_url": "17837491_h1jfufp3.jpeg",
                    "price": 200,
                    "url": "https://m.genshuixue.com/teacher/one2oneCourseDetail/357455158087",
                    "preface": "https://img.genshuixue.com/17837491_h1jfufp3.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "视频课",
                    "course_type": 4,
                    "name": "SHEN老师精讲数学篇---五年级数学 ",
                    "number": "1611098531101",
                    "photo_url": "http://img.gsxservice.com/16755906_6d26kdtq.jpeg",
                    "price": 19.8,
                    "url": "https://m.genshuixue.com/video_course/getcourseshowdetail?number=1611098531101",
                    "preface": "https://imgs.genshuixue.com/16755906_6d26kdtq.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "视频课",
                    "course_type": 4,
                    "name": "四升五暑假串讲 (直播回放)",
                    "number": "1611095266301",
                    "photo_url": "http://img.gsxservice.com/16983012_dt3i8lrg.jpeg",
                    "price": 98,
                    "url": "https://m.genshuixue.com/video_course/getcourseshowdetail?number=1611095266301",
                    "preface": "https://imgs.genshuixue.com/16983012_dt3i8lrg.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "视频课",
                    "course_type": 4,
                    "name": "六年级奥数测试课程 (直播回放)",
                    "number": "1611095264701",
                    "photo_url": "http://img.gsxservice.com/2209016_18uvj6w8.jpeg",
                    "price": 1.98,
                    "url": "https://m.genshuixue.com/video_course/getcourseshowdetail?number=1611095264701",
                    "preface": "https://imgs.genshuixue.com/2209016_18uvj6w8.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "视频课",
                    "course_type": 4,
                    "name": "初中数学一点通 (直播回放)",
                    "number": "1611099348701",
                    "photo_url": "http://img.gsxservice.com/15950670_si3e5ruk.jpeg",
                    "price": 19.8,
                    "url": "https://m.genshuixue.com/video_course/getcourseshowdetail?number=1611099348701",
                    "preface": "https://imgs.genshuixue.com/15950670_si3e5ruk.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "视频课",
                    "course_type": 4,
                    "name": " 初中数学函数专题 ",
                    "number": "1611099350301",
                    "photo_url": "http://img.gsxservice.com/15950670_si3e5ruk.jpeg",
                    "price": 29.8,
                    "url": "https://m.genshuixue.com/video_course/getcourseshowdetail?number=1611099350301",
                    "preface": "https://imgs.genshuixue.com/15950670_si3e5ruk.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "视频课",
                    "course_type": 4,
                    "name": "SHEN老师精讲数学篇----六年级",
                    "number": "1608193843001",
                    "photo_url": "http://img.gsxservice.com/16755959_ek7psbiq.jpeg",
                    "price": 29.8,
                    "url": "https://m.genshuixue.com/video_course/getcourseshowdetail?number=1608193843001",
                    "preface": "https://imgs.genshuixue.com/16755959_ek7psbiq.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "视频课",
                    "course_type": 4,
                    "name": "SHEN老师精讲数学篇---五年级数学 ",
                    "number": "1611099349501",
                    "photo_url": "http://img.gsxservice.com/16755906_6d26kdtq.jpeg",
                    "price": 29.8,
                    "url": "https://m.genshuixue.com/video_course/getcourseshowdetail?number=1611099349501",
                    "preface": "https://imgs.genshuixue.com/16755906_6d26kdtq.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "视频课",
                    "course_type": 4,
                    "name": "专题课程",
                    "number": "15122945097",
                    "photo_url": "http://img.gsxservice.com/5209109_0fofvff0.jpeg",
                    "price": 398,
                    "url": "https://m.genshuixue.com/video_course/getcourseshowdetail?number=15122945097",
                    "preface": "https://imgs.genshuixue.com/5209109_0fofvff0.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "视频课",
                    "course_type": 4,
                    "name": "四升五数学同步预习课程 (云端录播)",
                    "number": "1609207910701",
                    "photo_url": "http://img.gsxservice.com/15378569_pcmfbof4.jpeg",
                    "price": 399,
                    "url": "https://m.genshuixue.com/video_course/getcourseshowdetail?number=1609207910701",
                    "preface": "https://imgs.genshuixue.com/15378569_pcmfbof4.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "视频课",
                    "course_type": 4,
                    "name": "六年级预习课程",
                    "number": "16081278298",
                    "photo_url": "http://img.gsxservice.com/17415787_tx3irktt.jpeg",
                    "price": 0,
                    "url": "https://m.genshuixue.com/video_course/getcourseshowdetail?number=16081278298",
                    "preface": "https://imgs.genshuixue.com/17415787_tx3irktt.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "班课 | 线下课",
                    "course_type": "5",
                    "lesson_way": "4",
                    "name": "四年级一年学通课程",
                    "number": "7490894504",
                    "photo_url": "18459088_hn9uewrj.jpeg",
                    "price": 36800,
                    "url": "https://m.genshuixue.com/org_class_course/detail/7490894504",
                    "preface": "https://img.genshuixue.com/18459088_hn9uewrj.jpeg",
                    "tag_fenqi": 0
                }, {
                    "course_desc": "班课 | 线下课",
                    "course_type": "5",
                    "lesson_way": "4",
                    "name": "六年级奥数语文课程",
                    "number": "7485401704",
                    "photo_url": "18519986_uqeegfu4.jpeg",
                    "price": 3980,
                    "url": "https://m.genshuixue.com/org_class_course/detail/7485401704",
                    "preface": "https://img.genshuixue.com/18519986_uqeegfu4.jpeg",
                    "tag_fenqi": 0
                }],
                "pager": {
                    "total_number": 76,
                    "has_more": 1,
                    "next_cursor": 4
                }
            },
            "ts": 1487562363,
            "declare_config": {
                "declareTpl": null
            }
        }
    };
};

/* eslint-enable fecs-camelcase */