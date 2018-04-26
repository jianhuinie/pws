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
	var hotClassifyArr = [
        {
            "name": "数学",
            "id": 10,
            "child": [
                {
                    "id": 108,
                    "name": "小学",
                    "child": [
                        {name: "一年级", id: 108},
                        {name: "二年级", id: 108},
                        {name: "三年级", id: 108},
                        {name: "四年级", id: 108},
                        {name: "五年级", id: 108},
                        {name: "六年级", id: 108}
                    ]
                },
                {
                    "id": 1081,
                    "name": "初中",
                    "child": [
                        {name: "初一", id: 1081},
                        {name: "初二", id: 1081},
                        {name: "初三", id: 1081}
                    ]
                }
            ]
        },
        {
            "name": "数学1",
            "id": 11
        },
        {
            "name": "数学2",
            "id": 12
        },
        {
            "name": "数学3",
            "id": 13
        },
        {
            "name": "数学4",
            "id": 14
        },
        {
            "name": "英语",
            "id": 15
        },
        {
            "name": "全部",
            "id": null
        }
    ];
    var bannerArr = [
        {
            "img": "http://test-img.gsxservice.com/81_xvle7ck2.jpeg",
            "url": "http://www.baidu.com"
        },
        {
            "img": "http://test-img.gsxservice.com/783963_8qioujs7.jpeg",
            "url": "http://www.qq.com"
        }
    ];

    var teacherArr = [
        {
            "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
            "name": "张三",
            "stars": 3.7,
            "hours": "10",
            "area": "二里庄",
            "tag": [
                {
                    "name": "14年教龄"
                },
                {
                    "name": "134年教龄"
                },
                {
                    "name": "134年教龄"
                },
                {
                    "name": "144年教龄"
                },
                {
                    "name": "知名机构"
                }
            ],
            "case_name": "获奖第一名",
            "price": "122.00",
            "distance": "3.0lkm",
            "lesson_way": 1
        },
        {
            "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
            "name": "张三washdjhashjk速度快和饭黄齑申达股份黄金时代规范黄金时代话费卡好可怜飞洒捡垃圾了",
            "stars": 3.7,
            "hours": "10",
            "tag": [
                {
                    "name": "14年教龄"
                },
                {
                    "name": "知名机构"
                }
            ],
            "case_name": "获奖第一名",
            "price": "122.00",
            "distance": "3.0lkm",
            "lesson_way": 1
        },
        {
            "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg",
            "name": "张三",
            "stars": 3.7,
            "hours": "10",
            "tag": [
                {
                    "name": "14年教龄"
                },
                {
                    "name": "知名机构"
                }
            ],
            "case_name": "获奖第一名",
            "price": "122.00",
            "distance": "3.0lkm",
            "lesson_way": 1
        }
    ];
    var orderArr = [
        {
            "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg", //头像
            "teacher_name":"张三1", //老师姓名
            "course_name":"高中数学1", //课程名称
            "hours":"10", //课时数
            "purchase_id": "123",
            "total_money":"100.34", //课程总价
            "pay_money":"11.1", //实付价格
        },
        {
            "avatar": "http://img.gsxservice.com/18581122_izuw3605.jpeg", //头像
            "teacher_name":"张三2", //老师姓名
            "course_name":"高中数学2", //课程名称
            "hours":"20", //课时数
            "purchase_id": "123456",
            "total_money":"200.34", //课程总价
            "pay_money":"21.1", //实付价格
        }
    ];
    var rcmdArr = [
        {
            "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497084919861&di=30bde399328acabc3fe3f7383c31c68a&imgtype=0&src=http%3A%2F%2Fbbsatt.yineitong.com%2Fforum%2F2011%2F03%2F25%2F110325164993a2105258f0d314.jpg", //头像
            "teacher_name":"张三3", //老师姓名
            "course_name":"高中数学3", //课程名称
            "detail_url":"https://wenku.baidu.com/" //老师详情页
        },
        {
            "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497084919861&di=30bde399328acabc3fe3f7383c31c68a&imgtype=0&src=http%3A%2F%2Fbbsatt.yineitong.com%2Fforum%2F2011%2F03%2F25%2F110325164993a2105258f0d314.jpg", //头像
            "teacher_name":"张三4", //老师姓名
            "course_name":"高中数学4", //课程名称
            "detail_url":"http://image.baidu.com/" //老师详情页
        }
    ];

    var result = {
        "code": 0,
        "msg": "succ",
        "data": {
            "banner": bannerArr,
            "card": {
                "boss_teacher": rcmdArr,
                "boss_order": orderArr
            },
            "hot_classify": hotClassifyArr,
            "recommend_teacher": teacherArr,
            "city": "800+",
            "user": "9000万+",
            "teacher": "80万+"
        },
        "ts": 1478603767,
        "declare_config": {
            "declareTpl": null
        }
    };

    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: result
    };
};

/* eslint-enable fecs-camelcase */
