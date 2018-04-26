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
        "items": [
            {
                "id": 9573,
                "number": 3572755098003,
                "subject_name": "生活技能-化妆-化妆",
                "support_online": "0",
                "exp_price": "¥100-¥200",
                "info": "afdsfdsfafdsfdsfafdsfdsfafdsfdsfafdsfdsfafdsfdsfafdsfdsfafdsfdsf",
                "create_time": "2017-01-20 10:42:21",
                "page_view": "3",
                "sex": "1",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "南京-玄武区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/81_xvle7ck2.jpeg",
                    "display_name2": "学生7490"
                },
                "joined_teachers": []
            },
            {
                "id": 9570,
                "number": 3572755865603,
                "subject_name": "艺术-器乐-单簧管",
                "support_online": "1",
                "exp_price": "双方协商",
                "info": "和本科生",
                "create_time": "2017-01-18 20:51:28",
                "page_view": "109",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/81_xvle7ck2.jpeg",
                    "display_name2": "学生9421"
                },
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/419217_jbx9e7as.jpeg"
                    }
                ]
            },
            {
                "id": 9558,
                "number": 3143259341203,
                "subject_name": "艺术-器乐-单簧管",
                "support_online": "1",
                "exp_price": "双方协商",
                "info": "对环境的今生今世的话就是",
                "create_time": "2017-01-18 15:32:47",
                "page_view": "85",
                "sex": "1",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-img.genshuixue.com/755915_ywomcxro.jpeg",
                    "display_name2": "12233全球"
                },
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/419217_jbx9e7as.jpeg"
                    }
                ]
            },
            {
                "id": 9554,
                "number": 3143259340803,
                "subject_name": "小学-英语-一年级",
                "support_online": "1",
                "exp_price": "双方协商",
                "info": "本科呵呵呵呵呵呵呵呵版本神山圣水技术",
                "create_time": "2017-01-18 14:46:18",
                "page_view": "33",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/179758_lxubd501.jpeg",
                    "display_name2": "周佳的昵称"
                },
                "joined_teachers": []
            },
            {
                "id": 9547,
                "number": 3196946278403,
                "subject_name": "艺术-器乐-钢琴",
                "support_online": "1",
                "exp_price": "双方协商",
                "info": "回到酒店酒店酒店介绍介绍",
                "create_time": "2017-01-17 17:40:46",
                "page_view": "73",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/418958_px9hg9iw.jpeg",
                    "display_name2": "蜗蜗蜗蜗"
                },
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/419217_jbx9e7as.jpeg"
                    }
                ]
            },
            {
                "id": 9545,
                "number": 3196945459203,
                "subject_name": "艺术-器乐-葫芦丝",
                "support_online": "1",
                "exp_price": "¥500以上",
                "info": "北戴河都会大喊大叫",
                "create_time": "2017-01-17 17:06:23",
                "page_view": "18",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/418958_px9hg9iw.jpeg",
                    "display_name2": "蜗蜗蜗蜗"
                },
                "joined_teachers": []
            },
            {
                "id": 9527,
                "number": 3572754483603,
                "subject_name": "艺术-器乐-钢琴",
                "support_online": "1",
                "exp_price": "双方协商",
                "info": "自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表",
                "create_time": "2017-01-14 16:16:49",
                "page_view": "253",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "长春-朝阳区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg",
                    "display_name2": "学生0321"
                },
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
                "subject_name": "艺术-器乐-钢琴",
                "support_online": "1",
                "exp_price": "¥500以上",
                "info": "成年女士想找一位钢琴老师上门授课，地点在西二旗地铁站附近，课时费可与老师协商，希望找一位女老师。",
                "create_time": "2017-01-14 11:42:56",
                "page_view": "227",
                "sex": "0",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "锡林郭勒盟-东乌珠穆沁旗-中心大街",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/423958_vdkbl3a1.jpeg",
                    "display_name2": "王倩倩"
                },
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg"
                    }
                ]
            },
            {
                "id": 9437,
                "number": 4054261402003,
                "subject_name": "艺术-器乐-葫芦丝",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "测试科目映射",
                "create_time": "2016-12-16 10:06:24",
                "page_view": "112",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/179758_lxubd501.jpeg",
                    "display_name2": "周佳的昵称"
                },
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/418923_05vwgmkl.jpeg"
                    }
                ]
            },
            {
                "id": 9439,
                "number": 4054262221203,
                "subject_name": "艺术-器乐-小提琴",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "测试，老师教过的科目",
                "create_time": "2016-12-16 11:24:39",
                "page_view": "3",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/179758_lxubd501.jpeg",
                    "display_name2": "周佳的昵称"
                },
                "joined_teachers": []
            },
            {
                "id": 9440,
                "number": 4430070784003,
                "subject_name": "IT-常用软件-3Dmax",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "映射、3DMax",
                "create_time": "2016-12-16 13:42:26",
                "page_view": "15",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/179758_lxubd501.jpeg",
                    "display_name2": "周佳的昵称"
                },
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/418923_05vwgmkl.jpeg"
                    }
                ]
            },
            {
                "id": 9441,
                "number": 4430070835203,
                "subject_name": "IT-计算机证书-认证考试",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "哈哈哈哈哈哈哈认证考试",
                "create_time": "2016-12-16 14:13:36",
                "page_view": "9",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/351788_1k749z1c.jpeg",
                    "display_name2": "烟火"
                },
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/418923_05vwgmkl.jpeg"
                    }
                ]
            },
            {
                "id": 9454,
                "number": 4483758694803,
                "subject_name": "IT-计算机证书-认证考试",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "给实话实说",
                "create_time": "2016-12-22 20:12:08",
                "page_view": "5",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/351788_1k749z1c.jpeg",
                    "display_name2": "烟火"
                },
                "joined_teachers": []
            },
            {
                "id": 9455,
                "number": 4483758746003,
                "subject_name": "IT-设计制作-工具软件",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "1222测试",
                "create_time": "2016-12-22 20:37:18",
                "page_view": "4",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/351788_1k749z1c.jpeg",
                    "display_name2": "烟火"
                },
                "joined_teachers": []
            },
            {
                "id": 9456,
                "number": 4430070988803,
                "subject_name": "IT-常用软件-3Dmax",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "测试映射",
                "create_time": "2016-12-22 20:38:30",
                "page_view": "2",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/351788_1k749z1c.jpeg",
                    "display_name2": "烟火"
                },
                "joined_teachers": []
            },
            {
                "id": 9457,
                "number": 4430071040003,
                "subject_name": "艺术-器乐-古筝",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "一对一哦",
                "create_time": "2016-12-22 20:40:04",
                "page_view": "52",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/179758_lxubd501.jpeg",
                    "display_name2": "周佳的昵称"
                },
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/783977_9wgpoks5.jpeg"
                    }
                ]
            },
            {
                "id": 9458,
                "number": 4430071808003,
                "subject_name": "艺术-器乐-葫芦丝",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "班课",
                "create_time": "2016-12-22 20:40:17",
                "page_view": "3",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/179758_lxubd501.jpeg",
                    "display_name2": "周佳的昵称"
                },
                "joined_teachers": []
            },
            {
                "id": 9459,
                "number": 4430071859203,
                "subject_name": "体育-运动-游泳",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "视频课",
                "create_time": "2016-12-22 20:42:40",
                "page_view": "2",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/785724_juhxu5yd.jpeg",
                    "display_name2": "我的名字叫亨利詹姆斯卡梅隆乔丹杰克琼斯"
                },
                "joined_teachers": []
            },
            {
                "id": 9460,
                "number": 4430070989203,
                "subject_name": "艺术-器乐-小提琴",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "已完成的班课",
                "create_time": "2016-12-22 20:43:02",
                "page_view": "0",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/785724_juhxu5yd.jpeg",
                    "display_name2": "我的名字叫亨利詹姆斯卡梅隆乔丹杰克琼斯"
                },
                "joined_teachers": []
            },
            {
                "id": 9461,
                "number": 4430071040403,
                "subject_name": "艺术-器乐-钢琴",
                "support_online": "1",
                "exp_price": "¥100以内",
                "info": "已删除的1对1",
                "create_time": "2016-12-22 20:45:57",
                "page_view": "8",
                "sex": "2",
                "user_role": "2",
                "display_status": {
                    "name": "我要报名",
                    "color": "#37a4f5"
                },
                "allow_action": {
                    "action": "join",
                    "name": "立即报名"
                },
                "address": "铁岭-银州区",
                "verify_status": "1",
                "status": "1",
                "user": {
                    "avatar_url_mobile": "https://test-imgs.genshuixue.com/785724_juhxu5yd.jpeg",
                    "display_name2": "我的名字叫亨利詹姆斯卡梅隆乔丹杰克琼斯"
                },
                "joined_teachers": [
                    {
                        "avatar_url": "https://test-imgs.genshuixue.com/783977_9wgpoks5.jpeg"
                    }
                ]
            }
        ],
        "pager": {
            "has_more": true,
            "next_page": 2,
            "current_page": 1,
            "total": 96
        }
    },
    "render": "v2/resources/page/studentRoom/student/room/index"
}
    };
};

/* eslint-enable fecs-camelcase */
