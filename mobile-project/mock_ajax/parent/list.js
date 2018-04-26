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
            "code": 1,
            "msg": "succ",
            "data": {
                "is_vip": false,
                "class_name": [{
                    "name": "会员精选",
                    "url": "http://beta-m.genshuixue.com/student/vip/childClass?type=3565",
                    "checked": false,
                    "type": 3565
                }, {
                    "name": "在线课堂",
                    "url": "http://beta-m.genshuixue.com/student/vip/childClass?type=3566",
                    "checked": false,
                    "type": 3566
                }, {
                    "name": "线下体验",
                    "url": "http://beta-m.genshuixue.com/student/vip/childClass?type=3567",
                    "checked": false,
                    "type": 3567
                }],
                "course_list": [{
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160713906005",
                    "tag": [
                        "会员免费",
                        "班课",
                        "跆拳道"
                    ],
                    "course_name": "陈式太极",
                    "img": "http://img.gsxservice.com/15290779_ksxcnkld.jpeg",
                    "sign_up_number": 0,
                    "area": "江汉"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160713971481",
                    "tag": [
                        "会员优惠",
                        "班课",
                        "跆拳道"
                    ],
                    "course_name": "暑期集训班",
                    "img": "http://img.gsxservice.com/15288914_w01shdex.jpeg",
                    "sign_up_number": 0,
                    "area": "武昌"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160713972445",
                    "tag": [
                        "会员免费",
                        "班课",
                        "素描",
                        "5-12岁"
                    ],
                    "course_name": "素描/水彩画体验课",
                    "img": "http://img.gsxservice.com/15297293_erhdp0d2.jpeg",
                    "sign_up_number": 0,
                    "area": "洪山"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160713972569",
                    "tag": [
                        "会员免费",
                        "班课",
                        "拉丁舞",
                        "5-12岁"
                    ],
                    "course_name": "少儿街舞",
                    "img": "http://img.gsxservice.com/15297575_gbsc84fi.jpeg",
                    "sign_up_number": 0,
                    "area": "硚口"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160713972573",
                    "tag": [
                        "会员免费",
                        "班课",
                        "拉丁舞",
                        "5-12岁"
                    ],
                    "course_name": "少儿拉丁舞",
                    "img": "http://img.gsxservice.com/15298662_aza9wbds.jpeg",
                    "sign_up_number": 0,
                    "area": "硚口"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160713971929",
                    "tag": [
                        "会员免费",
                        "班课",
                        "拉丁舞",
                        "5-12岁"
                    ],
                    "course_name": "少儿爵士舞",
                    "img": "http://img.gsxservice.com/15297862_0p2jfdzd.jpeg",
                    "sign_up_number": 0,
                    "area": "硚口"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160708967258",
                    "tag": [
                        "会员免费",
                        "班课",
                        "流行",
                        "5-12岁"
                    ],
                    "course_name": "钢琴体验课",
                    "img": "http://img.gsxservice.com/14835934_8mjmmt5f.jpeg",
                    "sign_up_number": 0,
                    "area": "武昌"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160708967390",
                    "tag": [
                        "会员免费",
                        "班课",
                        "流行",
                        "5-12岁"
                    ],
                    "course_name": "声乐体验课",
                    "img": "http://img.gsxservice.com/14836572_6km6la89.jpeg",
                    "sign_up_number": 0,
                    "area": "武昌"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160715907279",
                    "tag": [
                        "会员优惠",
                        "班课"
                    ],
                    "course_name": "皮影班",
                    "img": "http://img.gsxservice.com/15462698_n8xamnun.jpeg",
                    "sign_up_number": 0,
                    "area": "武昌"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160715906639",
                    "tag": [
                        "会员免费",
                        "班课"
                    ],
                    "course_name": "绘本创作班",
                    "img": "http://img.gsxservice.com/15435153_9vf671al.jpeg",
                    "sign_up_number": 0,
                    "area": "武昌"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160715907791",
                    "tag": [
                        "会员优惠",
                        "班课"
                    ],
                    "course_name": "回宫六点硬笔班",
                    "img": "http://img.gsxservice.com/15445124_jlzj5i44.jpeg",
                    "sign_up_number": 0,
                    "area": "武昌"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160708968978",
                    "tag": [
                        "会员免费",
                        "主题活动",
                        "架子鼓",
                        "5-12岁"
                    ],
                    "course_name": "吉他单次体验课",
                    "img": "http://img.gsxservice.com/14736155_s27b6db1.jpeg",
                    "sign_up_number": 1,
                    "area": "汉阳"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160701654214",
                    "tag": [
                        "会员免费",
                        "班课",
                        "其他",
                        "5-12岁"
                    ],
                    "course_name": "冠军记忆法带你秒杀单词",
                    "img": "http://img.gsxservice.com/14658528_pd5lk9fh.jpeg",
                    "sign_up_number": 1,
                    "area": "武昌"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160701655234",
                    "tag": [
                        "会员免费",
                        "班课",
                        "其他",
                        "5-12岁"
                    ],
                    "course_name": "冠军记忆法教你玩转诗词国学",
                    "img": "http://img.gsxservice.com/14658854_lfjmrcbd.jpeg",
                    "sign_up_number": 0,
                    "area": "武昌"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160701655238",
                    "tag": [
                        "会员免费",
                        "班课",
                        "其他",
                        "5-12岁"
                    ],
                    "course_name": "思维导图开启你的黄金思维",
                    "img": "http://img.gsxservice.com/14659155_sjv3y2p7.jpeg",
                    "sign_up_number": 0,
                    "area": "武昌"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160701654979",
                    "tag": [
                        "会员免费",
                        "班课",
                        "新概念英语",
                        "5-12岁"
                    ],
                    "course_name": "我爱记单词（0元体验课）",
                    "img": "http://img.gsxservice.com/15101885_vwevrgkt.jpeg",
                    "sign_up_number": 0,
                    "area": "硚口"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160701720515",
                    "tag": [
                        "会员免费",
                        "班课",
                        "新概念英语",
                        "5-12岁"
                    ],
                    "course_name": "口若悬河秀语法（0元体验课）",
                    "img": "http://img.gsxservice.com/15101956_sxoprcdu.jpeg",
                    "sign_up_number": 0,
                    "area": "硚口"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160701720647",
                    "tag": [
                        "会员免费",
                        "班课",
                        "新概念英语",
                        "5-12岁"
                    ],
                    "course_name": "新概念英语经典新学（0元体验课）",
                    "img": "http://img.gsxservice.com/15102038_tipobh33.jpeg",
                    "sign_up_number": 0,
                    "area": "硚口"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160701719682",
                    "tag": [
                        "会员免费",
                        "班课",
                        "全部",
                        "5-12岁"
                    ],
                    "course_name": "我爱说英语（0元体验课）",
                    "img": "http://img.gsxservice.com/15103478_csdk41hy.jpeg",
                    "sign_up_number": 0,
                    "area": "武昌"
                }, {
                    "course_type": "2",
                    "url": "http://m.genshuixue.com/teacher/classCourseDetail/160701721346",
                    "tag": [
                        "会员免费",
                        "班课",
                        "全部",
                        "5-12岁"
                    ],
                    "course_name": "小学综合英语（0元体验课）",
                    "img": "http://img.gsxservice.com/15103762_783dbqxw.jpeg",
                    "sign_up_number": 0,
                    "area": "武昌"
                }],
                "pager": {
                    "total": 58,
                    "has_more": 1,
                    "current_page": "2"
                }
            },
            "ts": 1469006718,
            "declare_config": {
                "declareTpl": "v2/resources/page/studentVip/parentList/index"
            }
        }
    };
};

/* eslint-enable fecs-camelcase */