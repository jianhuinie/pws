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
    "message": "获取推荐生源成功",
    "data": [
        {
            "id": 9547,
            "number": 3196946278403,
            "subject_name": "艺术-器乐-钢琴",
            "support_online": "1",
            "exp_price": "双方协商",
            "vip_exclusive_time": -74004,
            "info": "回到酒店酒店酒店介绍介绍",
            "create_time": "2017-01-17 17:39:44",
            "url": "http://test-m.genshuixue.com/tcenter/hall/get?number=3196946278403",
            "page_view": "31",
            "display_status": {
                "name": "我要报名",
                "color": "#37a4f5"
            },
            "allow_action": {
                "action": "join",
                "name": "立即报名"
            },
            "joined_teachers_count": 0,
            "address": "",
            "user": {
                "avatar_url_mobile": "https://test-imgs.genshuixue.com/418958_px9hg9iw.jpeg",
                "display_name2": "蜗蜗蜗蜗"
            },
            "joined_teachers": []
        },
        {
            "id": 9545,
            "number": 3196945459203,
            "subject_name": "艺术-器乐-葫芦丝",
            "support_online": "1",
            "exp_price": "¥500以上",
            "vip_exclusive_time": -76067,
            "info": "北戴河都会大喊大叫",
            "create_time": "2017-01-17 16:59:24",
            "url": "http://test-m.genshuixue.com/tcenter/hall/get?number=3196945459203",
            "page_view": "13",
            "display_status": {
                "name": "我要报名",
                "color": "#37a4f5"
            },
            "allow_action": {
                "action": "join",
                "name": "立即报名"
            },
            "joined_teachers_count": 0,
            "address": "",
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
            "vip_exclusive_time": -338241,
            "info": "自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表自己的单还会不会进入别人的列表",
            "create_time": "2017-01-14 16:14:41",
            "url": "http://test-m.genshuixue.com/tcenter/hall/get?number=3572754483603",
            "page_view": "219",
            "display_status": {
                "name": "我要报名",
                "color": "#37a4f5"
            },
            "allow_action": {
                "action": "join",
                "name": "立即报名"
            },
            "joined_teachers_count": 2,
            "address": "长春-朝阳区",
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
            "id": 9496,
            "number": 3196943974403,
            "subject_name": "艺术-器乐-钢琴",
            "support_online": "1",
            "exp_price": "¥100以内",
            "vip_exclusive_time": -409893,
            "info": "测试1111111111111111111111",
            "create_time": "2017-01-07 13:57:54",
            "url": "http://test-m.genshuixue.com/tcenter/hall/get?number=3196943974403",
            "page_view": "5",
            "display_status": {
                "name": "我要报名",
                "color": "#37a4f5"
            },
            "allow_action": {
                "action": "join",
                "name": "立即报名"
            },
            "joined_teachers_count": 1,
            "address": "铁岭-银州区",
            "user": {
                "avatar_url_mobile": "https://test-imgs.genshuixue.com/81_xvle7ck2.jpeg",
                "display_name2": "陈莹chenying"
            },
            "joined_teachers": [
                {
                    "avatar_url": "https://test-imgs.genshuixue.com/783977_9wgpoks5.jpeg"
                }
            ]
        },
        {
            "id": 9495,
            "number": 3143257754003,
            "subject_name": "艺术-器乐-葫芦丝",
            "support_online": "1",
            "exp_price": "¥100以内",
            "vip_exclusive_time": -409897,
            "info": "测试1111111111111111111111111111111111111111",
            "create_time": "2017-01-07 13:57:09",
            "url": "http://test-m.genshuixue.com/tcenter/hall/get?number=3143257754003",
            "page_view": "4",
            "display_status": {
                "name": "我要报名",
                "color": "#37a4f5"
            },
            "allow_action": {
                "action": "join",
                "name": "立即报名"
            },
            "joined_teachers_count": 0,
            "address": "南昌-东湖区",
            "user": {
                "avatar_url_mobile": "https://test-imgs.genshuixue.com/81_xvle7ck2.jpeg",
                "display_name2": "陈莹chenying"
            },
            "joined_teachers": []
        },
        {
            "id": 9461,
            "number": 4430071040403,
            "subject_name": "艺术-器乐-钢琴",
            "support_online": "1",
            "exp_price": "¥100以内",
            "vip_exclusive_time": -1484720050,
            "info": "已删除的1对1",
            "create_time": "2016-12-22 20:45:57",
            "url": "http://test-m.genshuixue.com/tcenter/hall/get?number=4430071040403",
            "page_view": "6",
            "display_status": {
                "name": "我要报名",
                "color": "#37a4f5"
            },
            "allow_action": {
                "action": "join",
                "name": "立即报名"
            },
            "joined_teachers_count": 0,
            "address": "铁岭-银州区",
            "user": {
                "avatar_url_mobile": "https://test-imgs.genshuixue.com/785724_juhxu5yd.jpeg",
                "display_name2": "我的名字叫亨利詹姆斯卡梅隆乔丹杰克琼斯"
            },
            "joined_teachers": []
        }
    ],
    "render": null
}
    };
};

/* eslint-enable fecs-camelcase */
