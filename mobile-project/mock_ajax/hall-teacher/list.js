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
        _data:{
    "code": 0,
    "data": {
        "items": [
            {
                "id": 9543,
                "number": 3143259187603,
                "subject_name": "器乐-葫芦丝",
                "support_online": "0",
                "exp_price": "¥200-¥300",
                "vip_exclusive_time": -68021,
                "info": "我要测试   问了  王磊 %……&*（）*&……%#200-300，授课方式 不限制￥%……&*#%……&问俄文问问问我耳机我耳机网络科技人了我客家人李文科记录我科技二路看见我让她俩劲儿看见他而来*",
                "create_time": "2017-01-16 20:35:41",
                "page_view": "37",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "保定-易县-1111",
                "sex": "0",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/418958_px9hg9iw.jpeg",
                    "display_name2": "蜗蜗蜗蜗"
                },
                "user_role": "2",
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/418923_05vwgmkl.jpeg"
                    }
                ]
            },
            {
                "id": 9530,
                "number": 3626441523203,
                "subject_name": "器乐-葫芦丝",
                "support_online": "2",
                "exp_price": "¥100-¥200",
                "vip_exclusive_time": -244252,
                "info": "上海市少男少女上赛季结束时并不是很简单s",
                "create_time": "2017-01-14 19:55:10",
                "page_view": "107",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "",
                "sex": "0",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/179758_lxubd501.jpeg",
                    "display_name2": "周佳的昵称"
                },
                "user_role": "2",
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/418958_px9hg9iw.jpeg"
                    }
                ]
            },
            {
                "id": 9527,
                "number": 3572754483603,
                "subject_name": "器乐-钢琴",
                "support_online": "1",
                "exp_price": "双方协商",
                "vip_exclusive_time": -257564,
                "info": "自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表",
                "create_time": "2017-01-14 16:14:41",
                "page_view": "204",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "长春-朝阳区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg",
                    "display_name2": "学生0321"
                },
                "user_role": "2",
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/783977_9wgpoks5.jpeg"
                    },
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/415714_6f0j25ji.jpeg"
                    }
                ]
            },
            {
                "id": 9522,
                "number": 3572754432003,
                "subject_name": "器乐-钢琴",
                "support_online": "1",
                "exp_price": "¥500以上",
                "vip_exclusive_time": -273997,
                "info": "成年女士想找一位钢琴老师上门授课，地点在西二旗地铁站附近，课时费可与老师协商，希望找一位女老师。",
                "create_time": "2017-01-14 11:34:39",
                "page_view": "178",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "锡林郭勒盟-东乌珠穆沁旗-中心大街",
                "sex": "0",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/423958_vdkbl3a1.jpeg",
                    "display_name2": "王倩倩"
                },
                "user_role": "2",
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg"
                    }
                ]
            },
            {
                "id": 9519,
                "number": 3626441370003,
                "subject_name": "英语-全部",
                "support_online": "1",
                "exp_price": "¥100-¥200",
                "vip_exclusive_time": -328263,
                "info": "学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字学习需求不少于三十个字",
                "create_time": "2017-01-13 20:31:43",
                "page_view": "12",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "巴彦淖尔盟-乌拉特前旗-中心大街",
                "sex": "0",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg",
                    "display_name2": "学生0321"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9497,
                "number": 3196944025603,
                "subject_name": "编程语言-PHP",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -329126,
                "info": "啦咯啦咯啦咯啦咯",
                "create_time": "2017-01-10 14:12:05",
                "page_view": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/351788_1k749z1c.jpeg",
                    "display_name2": "烟火"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9496,
                "number": 3196943974403,
                "subject_name": "器乐-钢琴",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -329216,
                "info": "测试1111111111111111111111",
                "create_time": "2017-01-07 13:57:54",
                "page_view": "5",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/81_xvle7ck2.jpeg",
                    "display_name2": "陈莹chenying"
                },
                "user_role": "2",
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/783977_9wgpoks5.jpeg"
                    }
                ]
            },
            {
                "id": 9495,
                "number": 3143257754003,
                "subject_name": "器乐-葫芦丝",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -329220,
                "info": "测试1111111111111111111111111111111111111111",
                "create_time": "2017-01-07 13:57:09",
                "page_view": "4",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "南昌-东湖区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/81_xvle7ck2.jpeg",
                    "display_name2": "陈莹chenying"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9464,
                "number": 4483758080003,
                "subject_name": "幼升小-手工",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "1V1科目",
                "create_time": "2016-12-23 10:10:06",
                "page_view": "1",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/785724_juhxu5yd.jpeg",
                    "display_name2": "我的名字叫亨利詹姆斯卡梅隆乔丹杰克琼斯"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9463,
                "number": 4430071859603,
                "subject_name": "幼儿园-手工活动",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "1V1映射科目审核2",
                "create_time": "2016-12-23 10:09:36",
                "page_view": "1",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/785724_juhxu5yd.jpeg",
                    "display_name2": "我的名字叫亨利詹姆斯卡梅隆乔丹杰克琼斯"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9462,
                "number": 4430071808403,
                "subject_name": "幼升小-创意",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "1V1映射科目审核",
                "create_time": "2016-12-23 10:09:17",
                "page_view": "1",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/785724_juhxu5yd.jpeg",
                    "display_name2": "我的名字叫亨利詹姆斯卡梅隆乔丹杰克琼斯"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9461,
                "number": 4430071040403,
                "subject_name": "器乐-钢琴",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "已删除的1对1",
                "create_time": "2016-12-22 20:45:57",
                "page_view": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/785724_juhxu5yd.jpeg",
                    "display_name2": "我的名字叫亨利詹姆斯卡梅隆乔丹杰克琼斯"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9460,
                "number": 4430070989203,
                "subject_name": "器乐-小提琴",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "已完成的班课",
                "create_time": "2016-12-22 20:43:02",
                "page_view": "0",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/785724_juhxu5yd.jpeg",
                    "display_name2": "我的名字叫亨利詹姆斯卡梅隆乔丹杰克琼斯"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9459,
                "number": 4430071859203,
                "subject_name": "运动-游泳",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "视频课",
                "create_time": "2016-12-22 20:42:40",
                "page_view": "1",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/785724_juhxu5yd.jpeg",
                    "display_name2": "我的名字叫亨利詹姆斯卡梅隆乔丹杰克琼斯"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9458,
                "number": 4430071808003,
                "subject_name": "器乐-葫芦丝",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "班课",
                "create_time": "2016-12-22 20:40:17",
                "page_view": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/179758_lxubd501.jpeg",
                    "display_name2": "周佳的昵称"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9457,
                "number": 4430071040003,
                "subject_name": "器乐-古筝",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "一对一哦",
                "create_time": "2016-12-22 20:40:04",
                "page_view": "46",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/179758_lxubd501.jpeg",
                    "display_name2": "周佳的昵称"
                },
                "user_role": "2",
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/783977_9wgpoks5.jpeg"
                    }
                ]
            },
            {
                "id": 9456,
                "number": 4430070988803,
                "subject_name": "常用软件-3Dmax",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "测试映射",
                "create_time": "2016-12-22 20:38:30",
                "page_view": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/351788_1k749z1c.jpeg",
                    "display_name2": "烟火"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9455,
                "number": 4483758746003,
                "subject_name": "设计制作-工具软件",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "1222测试",
                "create_time": "2016-12-22 20:37:18",
                "page_view": "1",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/351788_1k749z1c.jpeg",
                    "display_name2": "烟火"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9454,
                "number": 4483758694803,
                "subject_name": "计算机证书-认证考试",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "给实话实说",
                "create_time": "2016-12-22 20:12:08",
                "page_view": "5",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/351788_1k749z1c.jpeg",
                    "display_name2": "烟火"
                },
                "user_role": "2",
                "joined_teachers": []
            },
            {
                "id": 9441,
                "number": 4430070835203,
                "subject_name": "计算机证书-认证考试",
                "support_online": "1",
                "exp_price": "¥100以内",
                "vip_exclusive_time": -1484639373,
                "info": "哈哈哈哈哈哈哈认证考试",
                "create_time": "2016-12-16 14:13:36",
                "page_view": "7",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "sex": "2",
                "status": "1",
                "verify_status": "1",
                "student": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/351788_1k749z1c.jpeg",
                    "display_name2": "烟火"
                },
                "user_role": "2",
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/418923_05vwgmkl.jpeg"
                    }
                ]
            }
        ],
        "teacher": {
            "is_valid": 2
        },
        "pager": {
            "has_more": true,
            "next_page": 2,
            "current_page": 1,
            "total": 82
        }
    },
    "render": "/v2/resources/page/studentRoom/teacher/room/index"
}
    };
};

/* eslint-enable fecs-camelcase */
