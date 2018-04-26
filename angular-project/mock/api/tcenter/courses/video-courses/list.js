/**
 * @file 获取老师视频课课程列表
 * @path /api/tcenter/courses/video-courses/list
 * @author wangyujie
 */
var mockCreatFunction = function() {
    'use strict';

    var data = {
        code: 0,
        pageDto: null,
        error: null
    };

    data.data = {
        "has_roster": false,
        "vip_level": 0, // 会员等级
        "is_org_teacher": true, // 是否为机构老师
        "is_huike_teacher": 0,
        // "courses": [],
        "courses": [
            {
                "number": 123321, // 课程number
                "portrait": "http://img.gsxservice.com/42757953_p5enltig.jpeg",
                "display_name": "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
                "payers_count": "10", // 购买人数
                "price": "0",
                "play_count": 100, // 播放次数
                "pc_dynamic_url": 'http://www.baidu.com/', // 详情页url
                "roster_url": "http://test.genshuixue.com/course/rostercourse_type=3&course_number=1708015842101", // 花名册
                "share_file_url": "http://test.genshuixue.com/tcenter/courses/files/list?type=3&number=17090766475", // 共享资料请求地址（目前是主站列表在用，机构列表中的共享资料走原来的认证跳转逻辑）
                "display_status": { // 课程状态
                    "name": "招生中",
                    "color": "#9d9e9e"
                },
                // "verify_reasons": '审核被拒原因，只有当前视频课处于审核拒绝状态，该字段才不为空',
                "verify_reasons": { // 审核被拒详情
                    "status_text": "审核失败",
                    "tips": [
                        "您上传的视频内容中，不要放置QQ、微信、手机号等联系方式哦，请删除后重新填写，谢谢~",
                        "您上传的视频内容中，不要放置QQ、微信、手机号等联系方式哦，请删除后重新填写，谢谢~",
                        "您上传的视频内容中，不要放置QQ、微信、手机号等联系方式哦，请删除后重新填写，谢谢~",
                        "您上传的视频内容中，不要放置QQ、微信、手机号等联系方式哦，请删除后重新填写，谢谢~"
                    ],
                },
                "allow_actions_pc": [ // 操作
                    {
                        "action": "revokeVerify",
                        "name": "撤回审核",
                        "app_url": ""
                    },
                    {
                        "action": "toEdit",
                        "name": "编辑",
                        "app_url": ""
                    },
                    {
                        "action": "shareFiles",
                        "name": "共享资料",
                        "app_url": ""
                    },
                    {
                        "action": "deleteCourse",
                        "name": "删除",
                        "app_url": ""
                    }
                ]
            },
            {
                "number": 1233211234567, // 课程number
                "portrait": "http://img.gsxservice.com/42757953_p5enltig.jpeg",
                "display_name": "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
                "payers_count": "10", // 购买人数
                "price": "0",
                "play_count": 100, // 播放次数
                "pc_dynamic_url": 'http://www.baidu.com/', // 详情页url
                "roster_url": "http://test.genshuixue.com/course/rostercourse_type=3&course_number=1708015842101", // 花名册
                "share_file_url": "http://test.genshuixue.com/tcenter/courses/files/list?type=3&number=17090766475", // 共享资料请求地址（目前是主站列表在用，机构列表中的共享资料走原来的认证跳转逻辑）
                "display_status": { // 课程状态
                    "name": "招生中",
                    "color": "#9d9e9e"
                },
                // "verify_reasons": '审核被拒原因，只有当前视频课处于审核拒绝状态，该字段才不为空',
                "verify_reasons": { // 审核被拒详情
                    "status_text": "审核失败",
                    "tips": [
                        "您上传的视频内容中，不要放置QQ、微信、手机号等联系方式哦，请删除后重新填写，谢谢~",
                        "您上传的视频内容中，不要放置QQ、微信、手机号等联系方式哦，请删除后重新填写，谢谢~",
                        "您上传的视频内容中，不要放置QQ、微信、手机号等联系方式哦，请删除后重新填写，谢谢~",
                        "您上传的视频内容中，不要放置QQ、微信、手机号等联系方式哦，请删除后重新填写，谢谢~"
                    ],
                },
                "allow_actions_pc": [ // 操作
                    {
                        "action": "shareCourse",
                        "name": "分享课程",
                        "app_url": ""
                    },
                    {
                        "action": "soldOut",
                        "name": "下架",
                        "app_url": ""
                    },
                    {
                        "action": "reOpen",
                        "name": "上架",
                        "app_url": ""
                    }
                ]
            }
        ],
        "pager": {
            "has_more": false,
            "next_page": 2,
            "current_page": 1,
            "page_size": 10,
            "total": 22
        }
    };

    return data;
};

