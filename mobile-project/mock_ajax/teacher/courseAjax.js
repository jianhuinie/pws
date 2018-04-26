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
            "message": "succ",
            "data": {
                "type": 1,
                "tag_list": [
                    {
                        "id": 0,
                        "name": "推荐课程"
                    },
                    {
                        "id": 2342,
                        "name": "古典文学"
                    },
                    {
                        "id": 2343,
                        "name": "古典文学"
                    },
                    {
                        "id": 2344,
                        "name": "计算机网络"
                    },
                    {
                        "id": 2345,
                        "name": "数据结构"
                    },
                    {
                        "id": 2346,
                        "name": "JAVA研发"
                    }
                ],
                "list": [
                    {
                        "type": 13,
                        "number": "161212917053",
                        "name": "冬季特训营——十天拿下50分！",
                        "info": "01月23日开始 还剩47名额",
                        "cover_url": "http://img.gsxservice.com/25259947_p9l4pa5y.jpeg",
                        "subject_id": "268",
                        "realtime_price": null,
                        "original_price": 2299,
                        "price": 1599,
                        "is_online": true,
                        "can_order": true,
                        "sort": "49",
                        "max_student": "50",
                        "total_pay": 3,
                        "begin_time": 1485180900,
                        "status_type": "enrolling",
                        "img_url": "http://img.gsxservice.com/17675754_lq12czn3.png",
                        "button": {
                            "type": "enrolling",
                            "name": "立即报名",
                            "url": "/teacher/classCourseDetail/161212917053"
                        },
                        "url": "http://m.genshuixue.com/teacher/classCourseDetail/161212917053",
                        "limited_discount": [],
                        "fenqi": null
                    },
                    {
                        "type": 1,
                        "number": "16122157622",
                        "name": "高考数学黄金解题模板（精华版）",
                        "cover_url": "http://img.gsxservice.com/25890905_1up07sn6.jpeg",
                        "info": "6课节 共15人学习",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16122157622",
                        "force_update_url": "",
                        "price": "3299.00",
                        "sort": "48",
                        "total_pay": "15",
                        "outer_from": "0",
                        "limited_discount": {
                            "start_time": 1483492740,
                            "end_time": 1484495940,
                            "discount_price": "3299.00",
                            "pre_price": "4299.00",
                            "name": "限时折扣"
                        },
                        "is_online": null,
                        "fenqi": {
                            "tag_name": "免息分期",
                            "tiexi_info": "3,6",
                            "desc": "可享3期分期付学费"
                        }
                    },
                    {
                        "type": 3,
                        "number": "16100642263",
                        "name": "2017年高考二轮复习之跨越一本线视频课",
                        "cover_url": "http://img.gsxservice.com/23476995_xfslunjk.jpeg",
                        "info": "131课节 共35人学习",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16100642263",
                        "force_update_url": "",
                        "price": "3299.00",
                        "sort": "47",
                        "total_pay": "35",
                        "outer_from": "0",
                        "limited_discount": {
                            "start_time": 1483492740,
                            "end_time": 1484495940,
                            "discount_price": "3299.00",
                            "pre_price": "4999.00",
                            "name": "限时折扣"
                        },
                        "is_online": null,
                        "fenqi": {
                            "tag_name": "免息分期",
                            "tiexi_info": "3,6",
                            "desc": "可享3期分期付学费"
                        }
                    },
                    {
                        "type": 3,
                        "number": "16102589392",
                        "name": "高考数学压轴选、填试题精讲（第1季）",
                        "cover_url": "http://img.gsxservice.com/23477200_hnv3s9is.jpeg",
                        "info": "23课节 共14人学习",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16102589392",
                        "force_update_url": "",
                        "price": "269.00",
                        "sort": "46",
                        "total_pay": "14",
                        "outer_from": "0",
                        "limited_discount": {
                            "start_time": 1483492740,
                            "end_time": 1484495940,
                            "discount_price": "269.00",
                            "pre_price": "299.00",
                            "name": "限时折扣"
                        },
                        "is_online": null,
                        "fenqi": {
                            "tag_name": "免息分期",
                            "tiexi_info": "3,6",
                            "desc": "可享3期分期付学费"
                        }
                    },
                    {
                        "type": 2,
                        "number": "161210981628",
                        "name": "老吴带你1小时搞定函数的压轴题",
                        "info": "01月14日开始 还剩730名额",
                        "cover_url": "http://img.gsxservice.com/26250532_z5ku1x4k.jpeg",
                        "subject_id": "268",
                        "realtime_price": null,
                        "original_price": 399,
                        "price": 0,
                        "is_online": true,
                        "can_order": true,
                        "sort": "45",
                        "max_student": "2000",
                        "total_pay": 1270,
                        "begin_time": 1484402400,
                        "status_type": "enrolling",
                        "img_url": "https://img.genshuixue.com/17675762_erahjr7v.png",
                        "button": {
                            "type": "enrolling",
                            "name": "立即报名",
                            "url": "/teacher/classCourseDetail/161210981628"
                        },
                        "url": "http://m.genshuixue.com/teacher/classCourseDetail/161210981628",
                        "limited_discount": [],
                        "fenqi": {
                            "tag_name": "免息分期",
                            "tiexi_info": "3,6",
                            "desc": "可享3期分期付学费"
                        }
                    },
                    {
                        "type": 3,
                        "number": "16093049615",
                        "name": "高考数学一题多解与一题多变视频课",
                        "cover_url": "http://img.gsxservice.com/23477020_uesf3dig.jpeg",
                        "info": "79课节 共14人学习",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16093049615",
                        "force_update_url": "",
                        "price": "1999.00",
                        "sort": "44",
                        "total_pay": "14",
                        "outer_from": "0",
                        "limited_discount": {
                            "start_time": 1483492740,
                            "end_time": 1484495940,
                            "discount_price": "1999.00",
                            "pre_price": "2999.00",
                            "name": "限时折扣"
                        },
                        "is_online": null,
                        "fenqi": {
                            "tag_name": "免息分期",
                            "tiexi_info": "3,6",
                            "desc": "可享3期分期付学费"
                        }
                    },
                    {
                        "type": 3,
                        "number": "16112156953",
                        "name": "2017一轮复习选择、填空必刷题（理）",
                        "cover_url": "http://img.gsxservice.com/23883265_svzb48l1.jpeg",
                        "info": "17课节 共24人学习",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16112156953",
                        "force_update_url": "",
                        "price": "399.00",
                        "sort": "43",
                        "total_pay": "24",
                        "outer_from": "0",
                        "limited_discount": {
                            "start_time": 1483492740,
                            "end_time": 1484495940,
                            "discount_price": "399.00",
                            "pre_price": "699.00",
                            "name": "限时折扣"
                        },
                        "is_online": null,
                        "fenqi": null
                    },
                    {
                        "type": 2,
                        "number": "160626650270",
                        "name": "每日一题  好题精选",
                        "info": "07月03日开始 还剩3453名额",
                        "cover_url": "http://img.gsxservice.com/22647187_dy0ts975.jpeg",
                        "subject_id": "268",
                        "realtime_price": 0,
                        "original_price": 1000,
                        "price": 0,
                        "is_online": true,
                        "can_order": true,
                        "sort": "27",
                        "max_student": "5000",
                        "total_pay": 1547,
                        "begin_time": 1467554400,
                        "status_type": "enrolling",
                        "img_url": "http://img.gsxservice.com/15725286_n88ugdif.jpeg",
                        "button": {
                            "type": "enrolling",
                            "name": "立即报名",
                            "url": "/teacher/classCourseDetail/160626650270"
                        },
                        "url": "http://m.genshuixue.com/teacher/classCourseDetail/160626650270",
                        "limited_discount": [],
                        "fenqi": {
                            "tag_name": "免息分期",
                            "tiexi_info": "3,6",
                            "desc": "可享3期分期付学费"
                        }
                    },
                    {
                        "type": 2,
                        "number": "160827913745",
                        "name": "一题一课  高考数学",
                        "info": "09月26日开始 还剩1512名额",
                        "cover_url": "http://img.gsxservice.com/22647160_nazzil3l.jpeg",
                        "subject_id": "269",
                        "realtime_price": 0,
                        "original_price": 4000,
                        "price": 0,
                        "is_online": true,
                        "can_order": true,
                        "sort": "25",
                        "max_student": "1999",
                        "total_pay": 487,
                        "begin_time": 1474900200,
                        "status_type": "enrolling",
                        "img_url": "http://img.gsxservice.com/22647160_nazzil3l.jpeg",
                        "button": {
                            "type": "enrolling",
                            "name": "立即报名",
                            "url": "/teacher/classCourseDetail/160827913745"
                        },
                        "url": "http://m.genshuixue.com/teacher/classCourseDetail/160827913745",
                        "limited_discount": [],
                        "fenqi": {
                            "tag_name": "免息分期",
                            "tiexi_info": "3,6",
                            "desc": "可享3期分期付学费"
                        }
                    },
                    {
                        "type": 2,
                        "number": "160327874938",
                        "name": "每天半小时，老吴手把手教你解数学题",
                        "info": "06月15日开始 还剩1107名额",
                        "cover_url": "https://img.genshuixue.com/16062953_uwddonp9.jpeg",
                        "subject_id": "268",
                        "realtime_price": 0,
                        "original_price": 1000,
                        "price": 0,
                        "is_online": true,
                        "can_order": true,
                        "sort": "19",
                        "max_student": "5000",
                        "total_pay": 3893,
                        "begin_time": 1465999200,
                        "status_type": "enrolling",
                        "img_url": "https://img.genshuixue.com/16062953_uwddonp9.jpeg",
                        "button": {
                            "type": "enrolling",
                            "name": "立即报名",
                            "url": "/teacher/classCourseDetail/160327874938"
                        },
                        "url": "http://m.genshuixue.com/teacher/classCourseDetail/160327874938",
                        "limited_discount": [],
                        "fenqi": {
                            "tag_name": "分期",
                            "tiexi_info": "3,6",
                            "desc": "可享3期分期付学费"
                        }
                    }
                ],
                "pager": {
                    "has_more": false,
                    "next_page": 2,
                    "current_page": 1,
                    "total": 10
                }
            },
            "msg": "succ"
        }
    };
};

/* eslint-enable fecs-camelcase */