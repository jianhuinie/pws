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
    "data": {
        "item": {
            "id": 9527,
            "number": 3572754483603,
            "subject_name": "器乐-钢琴",
            "support_online": "1",
            "exp_price": "双方协商",
            "info": "自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表",
            "create_time": "2017-01-14 16:14:41",
            "url": "http://test-m.genshuixue.com/tcenter/hall/get?number=3572754483603",
            "page_view": 82,
            "sex": "2",
            "user_role": "2",
            "display_status": {
                "name": "已报名",
                "color": "#ff9100"
            },
            "allow_action": {
                "action": "contact",
                "name": "立即联系"
            },
            "address": "长春-朝阳区",
            "status": "1",
            "verify_status": "1",
            "student": {
                "avatar_url": "http://test-img.gsxservice.com/421313_amj8wlz5.jpeg",
                "display_name2": "学生0321"
            }
        },
        "is_own": true,
        "joined_teachers_info": [
            {
                "display_name": "刺啊啊啦",
                "short_introduce": "啦啦啦啦啦啦啦啦啦啦啦啦啦",
                "vip_level": 0,
                "display_school_age": "12年",
                "home_url": "http://test-m.genshuixue.com/457551308",
                "avatar_url": "http://test-img.gsxservice.com/783977_9wgpoks5.jpeg",
                "location_addr": "海淀区五彩城购物中心",
                "comment_summary": {
                    "avg": 0,
                    "count": 0
                },
                "user_id": 347111,
                "mobile": "15633333333",
                "area_id": "17040384",
                "join_reason": "我是专业老师，跟我学，从零基础变达人",
                "course_number": "0",
                "course_type": "0",
                "area": "北京-海淀区",
                "virtual_mobile": "01089192621",
                "like_number": 2,
                "like_status": false,
                "recommend_course": []
            },
            {
                "display_name": "王倩倩",
                "short_introduce": "一句话简介最多可以输入二十个字这么长这么",
                "vip_level": 0,
                "display_school_age": "8年",
                "home_url": "http://test-m.genshuixue.com/415444278",
                "avatar_url": "http://test-img.gsxservice.com/415714_6f0j25ji.jpeg",
                "location_addr": "新疆风味餐厅",
                "comment_summary": {
                    "avg": 4.4,
                    "count": 19
                },
                "user_id": 347019,
                "mobile": "18511400389",
                "area_id": "17040384",
                "join_reason": "给你这个报名的理由919fghjkkks. fghjks?!&amp;@@$);:--.?!!'mi):$383883839@@@))$$$533::?!&amp;ffsegjki (bjwkksoodh djdjjjjjsjjdj hdjjjj hh bbb bbbnn gghh hhsjjdjdjdjfjj h",
                "course_number": "161214738956",
                "course_type": "2",
                "area": "北京-海淀区",
                "virtual_mobile": "01089192621",
                "like_number": 1,
                "like_status": false,
                "recommend_course": {
                    "course_name": "免费线下班课支付测试",
                    "url": "http://test-m.genshuixue.com/teacher/classCourseDetail/161214738956",
                    "cover_url": "http://test-img.gsxservice.com/747325_8305crcj.png",
                    "course_type_cn": "线下班课"
                }
            }
        ],
        "recommend_courses": [
            {
                "course_name": "电影欣赏一期",
                "course_number": "160629554120",
                "course_type": "8",
                "price": 0,
                "student_count": 31,
                "cover_url": "https://test-imgs.genshuixue.com/736061_qhz43nm1.jpeg",
                "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/160629554120"
            },
            {
                "course_name": "测试旧版本添加班课",
                "course_number": "161009491416",
                "course_type": "8",
                "price": 9999,
                "student_count": 25,
                "cover_url": "https://test-imgs.genshuixue.com/747304_t410ax9c.png",
                "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/161009491416"
            },
            {
                "course_name": "8:00-11:00咖啡屋",
                "course_number": "160810488406",
                "course_type": "8",
                "price": 0,
                "student_count": 22,
                "cover_url": "http://test-img.gsxservice.com/751974_kz501p1s.jpeg",
                "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/160810488406"
            },
            {
                "course_name": "JJ测试班课-直播课",
                "course_number": "160704489665",
                "course_type": "8",
                "price": 5.01,
                "student_count": 19,
                "cover_url": "http://test-img.gsxservice.com/737462_psoctgdx.jpeg",
                "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/160704489665"
            },
            {
                "course_name": "测试机构老师CPS-班课",
                "course_number": "160714554369",
                "course_type": "8",
                "price": 10,
                "student_count": 9,
                "cover_url": "https://test-imgs.genshuixue.com/742897_jt8ywric.jpeg",
                "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/160714554369"
            },
            {
                "course_name": "啦啦啦啦啦啦啦啦啦啦",
                "course_number": "160505485398",
                "course_type": "8",
                "price": 0,
                "student_count": 5,
                "cover_url": "https://test-img.genshuixue.com/521198_3gqxicye.jpeg",
                "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/160505485398"
            }
        ]
    },
    "render": "v2/resources/page/studentRoom/student/detail/index"
}
    };
};

/* eslint-enable fecs-camelcase */
