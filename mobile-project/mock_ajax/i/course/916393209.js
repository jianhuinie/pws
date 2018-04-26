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
            "msg": "succ",
            "data": {
                "list": [
                    {
                        "course_desc": "班课 | 线下课",
                        "course_type": "2",
                        "lesson_way": "4",
                        "name": "国内地址线下班课",
                        "number": "161219738764",
                        "photo_url": "747307_nvke8x7k.png",
                        "price": 0.5,
                        "discount": {
                            "start_time": "2017-03-02 00:00:00",
                            "end_time": "2017-03-02 23:59:00",
                            "type": 2,
                            "remain_amount": null,
                            "pre_price": 1,
                            "discount_price": "0.50"
                        },
                        "url": "https://test-m.genshuixue.com/teacher/classCourseDetail/161219738764",
                        "preface": "https://test-imgs.genshuixue.com/747307_nvke8x7k.png",
                        "fenqi": null
                    },
                    {
                        "course_desc": "班课 | 线下课",
                        "course_type": "5",
                        "lesson_way": "4",
                        "name": "微课底导优化",
                        "number": "7909624004",
                        "photo_url": "832360_8cz0bj9q.jpg",
                        "price": 1,
                        "url": "https://test-m.genshuixue.com/org_class_course/detail/7909624004",
                        "preface": "https://test-imgs.genshuixue.com/832360_8cz0bj9q.jpg",
                        "fenqi": null
                    },
                    {
                        "course_desc": "班课 | 线下课",
                        "course_type": "5",
                        "lesson_way": "4",
                        "name": "3810课程地址",
                        "number": "5834603304",
                        "photo_url": "819040_fa4ox1v9.jpg",
                        "price": 1000,
                        "url": "https://test-m.genshuixue.com/org_class_course/detail/5834603304",
                        "preface": "https://test-imgs.genshuixue.com/819040_fa4ox1v9.jpg",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线下课",
                        "course_type": "10",
                        "lesson_way": "4",
                        "name": "付费线下班课",
                        "number": "46837252041032",
                        "photo_url": "786494_3lkz1x75.png",
                        "price": 1000,
                        "url": "https://test-m.genshuixue.com/org_course/detail/46837252041032",
                        "preface": "https://test-imgs.genshuixue.com/786494_3lkz1x75.png",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线上课",
                        "course_type": 10,
                        "lesson_way": "2",
                        "name": "中考政治-新开一对一在线免费",
                        "number": "73680797051031",
                        "photo_url": "786499_0ccu5gum.png",
                        "price": 0,
                        "url": "https://test-m.genshuixue.com/org_course/detail/73680797051031",
                        "preface": "https://test-imgs.genshuixue.com/786499_0ccu5gum.png",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线下课",
                        "course_type": 10,
                        "lesson_way": "4",
                        "name": "中考政治-拆表—1V1线下",
                        "number": "46837251274031",
                        "photo_url": "818304_hqm4asqc.jpg",
                        "price": 0,
                        "url": "https://test-m.genshuixue.com/org_course/detail/46837251274031",
                        "preface": "https://test-imgs.genshuixue.com/818304_hqm4asqc.jpg",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线上课",
                        "course_type": 10,
                        "lesson_way": "2",
                        "name": "中考政治-拆表—1V1在线",
                        "number": "82069402639031",
                        "photo_url": "818303_4alsay3b.jpg",
                        "price": 0,
                        "url": "https://test-m.genshuixue.com/org_course/detail/82069402639031",
                        "preface": "https://test-imgs.genshuixue.com/818303_4alsay3b.jpg",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线下课",
                        "course_type": "10",
                        "lesson_way": "4",
                        "name": "拆表—线下班课",
                        "number": "55225857084032",
                        "photo_url": "818302_rqm0r2nu.jpg",
                        "price": 0,
                        "url": "https://test-m.genshuixue.com/org_course/detail/55225857084032",
                        "preface": "https://test-imgs.genshuixue.com/818302_rqm0r2nu.jpg",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线上课",
                        "course_type": "10",
                        "lesson_way": "2",
                        "name": "拆表—直播课",
                        "number": "82069402401032",
                        "photo_url": "818301_72acipow.jpg",
                        "price": 0,
                        "url": "https://test-m.genshuixue.com/org_course/detail/82069402401032",
                        "preface": "https://test-imgs.genshuixue.com/818301_72acipow.jpg",
                        "fenqi": null
                    },
                    {
                        "course_desc": "1对1",
                        "course_type": 1,
                        "lesson_way": "8",
                        "name": "钢琴-国内地址一对一显示",
                        "number": "314315353937",
                        "photo_url": "421313_amj8wlz5.jpeg",
                        "price": 1,
                        "url": "https://test-m.genshuixue.com/teacher/one2oneCourseDetail/314315353937",
                        "preface": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线下课",
                        "course_type": 10,
                        "lesson_way": "4",
                        "name": "钢琴-线下一对一支付测试",
                        "number": "53548134643031",
                        "photo_url": "786493_r77q31te.png",
                        "price": 0,
                        "url": "https://test-m.genshuixue.com/org_course/detail/53548134643031",
                        "preface": "https://test-imgs.genshuixue.com/786493_r77q31te.png",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线上课",
                        "course_type": 10,
                        "lesson_way": "2",
                        "name": "钢琴-在线一对一支付测试",
                        "number": "80391680028031",
                        "photo_url": "786498_c5x3fy0f.png",
                        "price": 0,
                        "url": "https://test-m.genshuixue.com/org_course/detail/80391680028031",
                        "preface": "https://test-imgs.genshuixue.com/786498_c5x3fy0f.png",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线下课",
                        "course_type": "10",
                        "lesson_way": "4",
                        "name": "线下班课支付测试",
                        "number": "53548134418032",
                        "photo_url": "786492_opz3hlvw.png",
                        "price": 0,
                        "url": "https://test-m.genshuixue.com/org_course/detail/53548134418032",
                        "preface": "https://test-imgs.genshuixue.com/786492_opz3hlvw.png",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线上课",
                        "course_type": "10",
                        "lesson_way": "2",
                        "name": "在线班课支付测试",
                        "number": "73680793835032",
                        "photo_url": "786499_0ccu5gum.png",
                        "price": 0,
                        "url": "https://test-m.genshuixue.com/org_course/detail/73680793835032",
                        "preface": "https://test-imgs.genshuixue.com/786499_0ccu5gum.png",
                        "fenqi": null
                    },
                    {
                        "course_desc": "线上课",
                        "course_type": "10",
                        "lesson_way": "2",
                        "name": "免费直播课前四小时开课",
                        "number": "81649975449032",
                        "photo_url": "786497_uvmcthkc.png",
                        "price": 0,
                        "url": "https://test-m.genshuixue.com/org_course/detail/81649975449032",
                        "preface": "https://test-imgs.genshuixue.com/786497_uvmcthkc.png",
                        "fenqi": null
                    }
                ],
                "pager": {
                    "total_number": 99,
                    "has_more": 1,
                    "next_cursor": 2
                }
            },
            "ts": 1488446515,
            "declare_config": {
                "declareTpl": null
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
