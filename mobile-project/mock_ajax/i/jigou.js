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
                "next": "/i/331801619",
                "favorite_info": {
                    "favorite_status": 0,
                    "type": 2,
                    "number": "331801619"
                },
                "base_info": {
                    "id": "3115",
                    "number": "331801619",
                    "name": "智π国际",
                    "domain": "331801619",
                    "tags": [{
                        "name": "sd"
                    }, {
                        "name": "s"
                    }],
                    "brief": "xxf sdf sfsf sfs fsf f",
                    "logo": "http://img.gsxservice.com/15598803_ok17gpts.jpg",
                    "location": "北京",
                    "org_type": {
                        "type": "1",
                        "name": "工作室",
                        "certify": "身份证"
                    },
                    "area_id": 17039360,
                    "preface": "",
                    "score": "4.7",
                    "address": "北京",
                    "total_views": 1356,
                    "total_comments": "414",
                    "total_students": "328",
                    "url": "http://local-m.genshuixue.com/i/331801619",
                    "audio": {
                        "url": "http://file.gsxservice.com/2630341_62oqcgem.mp3",
                        "audio_length": "28"
                    },
                    "video": {
                        "url": "http://local-m.genshuixue.com/org/photo?number=331801619",
                        "count": 33
                    },
                    "extension": "4000-122-166,178971",
                    "city_filter": 1,
                    "membership_level": 2,
                    "support_tianxiao": true
                },
                "photo": {
                    "list": [{
                        "type": "photo",
                        "name": "机构图片",
                        "img": "http://test-img.gsxservice.com/315012_wt7u8duk.jpg",
                        "url": "http://test-img.gsxservice.com/315012_wt7u8duk.jpg",
                        "create_time": "2015-03-23 18:04:28"
                    }, {
                        "type": "photo",
                        "name": null,
                        "img": "http://test-img.gsxservice.com/737371_njl83pye.jpeg",
                        "url": "http://test-img.gsxservice.com/737371_njl83pye.jpeg",
                        "create_time": "2016-07-04 10:49:58"
                    }, {
                        "type": "photo",
                        "name": null,
                        "img": "http://test-img.gsxservice.com/737369_hgr56s7y.jpeg",
                        "url": "http://test-img.gsxservice.com/737369_hgr56s7y.jpeg",
                        "create_time": "2016-07-04 10:49:57"
                    }, {
                        "type": "photo",
                        "name": null,
                        "img": "http://test-img.gsxservice.com/737370_1wauxq4w.jpeg",
                        "url": "http://test-img.gsxservice.com/737370_1wauxq4w.jpeg",
                        "create_time": "2016-07-04 10:49:57"
                    }, {
                        "type": "photo",
                        "name": null,
                        "img": "http://test-img.gsxservice.com/424537_17uny2o4.jpeg",
                        "url": "http://test-img.gsxservice.com/424537_17uny2o4.jpeg",
                        "create_time": "2016-01-25 11:43:47"
                    }, {
                        "type": "photo",
                        "name": null,
                        "img": "http://test-img.gsxservice.com/424536_jcaphirk.jpeg",
                        "url": "http://test-img.gsxservice.com/424536_jcaphirk.jpeg",
                        "create_time": "2016-01-25 11:43:43"
                    }, {
                        "type": "photo",
                        "name": null,
                        "img": "http://test-img.gsxservice.com/424533_xk2w3qt5.jpeg",
                        "url": "http://test-img.gsxservice.com/424533_xk2w3qt5.jpeg",
                        "create_time": "2016-01-25 11:43:41"
                    }, {
                        "type": "photo",
                        "name": null,
                        "img": "http://test-img.gsxservice.com/424532_6uro9qyi.jpeg",
                        "url": "http://test-img.gsxservice.com/424532_6uro9qyi.jpeg",
                        "create_time": "2016-01-25 11:43:41"
                    }, {
                        "type": "photo",
                        "name": null,
                        "img": "http://test-img.gsxservice.com/424534_hittqfad.jpeg",
                        "url": "http://test-img.gsxservice.com/424534_hittqfad.jpeg",
                        "create_time": "2016-01-25 11:43:41"
                    }],
                    "total_photos": 62,
                    "more_url": "http://local-m.genshuixue.com/i/photo/331801619"
                },
                "location": {
                    "location": "北京市朝阳区王府井大街",
                    "distance": "2.4km",
                    "index": 0,
                    "more_url": "http://local-m.genshuixue.com/i/area/331801619"
                },
                "coupon": {
                    "list": [{
                        "id": "19495949538049",
                        "balance": "100.00",
                        "cond_threshold": "100",
                        "url": "http://test.genshuixue.com/org/orgCoupon?coupon_id=19495949538049"
                    }],
                    "total": 10,
                    "url": "http:www.baidu.com"
                },
                "course": {
                    "list": [{
                        "number": 2343243125,
                        "url": "http://test-m.genshuixue.com/org_class_course/detail/3710196004",
                        "preface": "http://test-img.gsxservice.com/747333_yprjvva0.png",
                        "price": "100.00",
                        "name": "舞蹈",
                        "course_type": "1对1",
                        "is_online": "线下课"
                    }, {
                        "number": 2343243125,
                        "url": "http://test-m.genshuixue.com/org_class_course/detail/3710196004",
                        "preface": "http://test-img.gsxservice.com/747333_yprjvva0.png",
                        "price": "100.00",
                        "name": "舞蹈",
                        "course_type": "1对1",
                        "is_online": "线下课"
                    }, {
                        "number": 2343243125,
                        "url": "http://test-m.genshuixue.com/org_class_course/detail/3710196004",
                        "preface": "http://test-img.gsxservice.com/747333_yprjvva0.png",
                        "price": "100.00",
                        "name": "舞蹈",
                        "course_type": "1对1",
                        "is_online": "线下课"
                    }],
                    "total": "10",
                    "more_url": "http://local-m.genshuixue.com/i/course/331801619"
                },
                "video": {
                    "list": [{
                        "type": "video",
                        "name": "哈哈哈哈哈",
                        "img": "http://test-img.gsxservice.com/00-upload/image-test/74934_73fd1f93254c712fac4a75171979633d_F5lElpCB.jpg",
                        "url": "http://local-m.genshuixue.com/video/view/vu104376",
                        "create_time": "2016-08-22 15:59:54"
                    }, {
                        "type": "video",
                        "name": "嘻嘻嘻嘻嘻",
                        "img": "http://test-img.gsxservice.com/00-upload/image-test/66895_959ad8d86c4da9e034e8bfd9dcd39f97_QCBI9k76.jpg",
                        "url": "http://local-m.genshuixue.com/video/view/vu104375",
                        "create_time": "2016-08-22 15:59:47"
                    }, {
                        "type": "video",
                        "name": "1",
                        "img": "http://test-img.gsxservice.com/00-upload/image-test/78743_907f2d373112c40f02bec036c139057b_J0DdtpYH.jpg",
                        "url": "http://local-m.genshuixue.com/video/view/vu104374",
                        "create_time": "2016-08-22 15:59:32"
                    }, {
                        "type": "video",
                        "name": "001",
                        "img": "http://test-img.gsxservice.com/00-upload/image-test/78359_3e42d04aeb98bc254c41e852fad6533b_HwsXqcDq.jpg",
                        "url": "http://local-m.genshuixue.com/video/view/vu104373",
                        "create_time": "2016-08-22 15:58:53"
                    }],
                    "total_videds": 33,
                    "more_url": "http://local-m.genshuixue.com/i/video/331801619"
                },
                "hot_teacher": {
                    "list": [{
                        "number": "415501468",
                        "avatar": "http://test-img.gsxservice.com/358589_3sabkrk3.jpeg",
                        "name": "B被邀请",
                        "course": "二胡\\报关员",
                        "short_introduce": "酒店计算机",
                        "price": "1",
                        "is_online": false,
                        "url": "http://local-m.genshuixue.com/415501468"
                    }, {
                        "number": "458203948",
                        "avatar": "http://test-img.gsxservice.com/358589_3sabkrk3.jpeg",
                        "name": "A被邀请",
                        "course": "一年级英语\\吉他\\跆拳道\\流行",
                        "short_introduce": "好多好多好多好多好多基督教",
                        "price": "1",
                        "is_online": true,
                        "url": "http://local-m.genshuixue.com/458203948"
                    }, {
                        "number": "877531878",
                        "avatar": "http://test-img.gsxservice.com/358589_3sabkrk3.jpeg",
                        "name": "韦舒",
                        "course": "笛子",
                        "short_introduce": "舒老师的一句话简介",
                        "price": "5.01",
                        "is_online": true,
                        "url": "http://local-m.genshuixue.com/877531878"
                    }, {
                        "number": "876795788",
                        "avatar": "http://img.gsxservice.com/headpic_man.png",
                        "name": "赵芳老师的昵称显示问",
                        "course": "商法\\古筝\\钢琴\\棋牌\\吉他\\器乐\\体育\\卡拉OK\\拉丁舞\\素描\\魔术\\幼儿园数学\\托福\\SSAT\\GRE\\国际高中课程\\亚洲留学\\美洲留学\\跆拳道\\雅思\\SAT",
                        "short_introduce": "测试一句话的简介问题",
                        "price": "0.01",
                        "is_online": true,
                        "url": "http://local-m.genshuixue.com/876795788test"
                    }, {
                        "number": "835505398",
                        "avatar": "http://test-img.gsxservice.com/362207_4i5kvmfu.jpeg",
                        "name": "张兵",
                        "course": "京剧",
                        "short_introduce": "闻道有先后，术业有专攻",
                        "price": "0.01",
                        "is_online": true,
                        "url": "http://local-m.genshuixue.com/sdanjmc"
                    }, {
                        "number": "877613468",
                        "avatar": "http://test-img.gsxservice.com/312330_edkpf9dc.jpeg",
                        "name": "机构老师七",
                        "course": "留学择校辅导\\流行\\插花\\卡拉OK\\京剧\\吉他",
                        "short_introduce": "一句\"话\"简介；一句”话“简介；一句话简",
                        "price": "0.01",
                        "is_online": true,
                        "url": "http://local-m.genshuixue.com/877613468"
                    }, {
                        "number": "876960838",
                        "avatar": "http://test-img.gsxservice.com/312316_lnfna2fv.jpeg",
                        "name": "文雪瑶",
                        "course": "初一语文\\魔术\\吉他",
                        "short_introduce": "发范德萨范德萨",
                        "price": "5.01",
                        "is_online": true,
                        "url": "http://local-m.genshuixue.com/876960838"
                    }, {
                        "number": "876794428",
                        "avatar": "http://test-img.gsxservice.com/308898_fjhkbtvu.jpeg",
                        "name": "东文敏名字很长的时候的测试问题呀呀呀呀测试测试名字长度哈哈啊啊哈哈",
                        "course": "化妆\\魔方\\早教益智\\烘焙\\羽毛球\\托福\\围棋\\高一数学\\游泳\\吉他\\流行\\太极拳\\行政法\\高考英语\\钢琴\\跆拳道",
                        "short_introduce": "测试的计划开始",
                        "price": "0.01",
                        "is_online": true,
                        "url": "http://local-m.genshuixue.com/876794428"
                    }, {
                        "number": "835670588",
                        "avatar": "http://test-img.gsxservice.com/360244_phu1nudc.jpeg",
                        "name": "哈林",
                        "course": "钢琴\\大学专业课\\流行\\吉他\\家常菜\\太极拳\\烘焙\\游泳\\魔术\\其他\\美声\\沟通技巧\\初三化学\\初一数学\\小提琴\\卡拉OK\\篮球\\跆拳道\\古筝",
                        "short_introduce": "哈利路亚的鹅娥",
                        "price": "5",
                        "is_online": true,
                        "url": "http://local-m.genshuixue.com/835670588haling"
                    }],
                    "total": 17,
                    "more_url": "http://local-m.genshuixue.com/i/teacher/331801619"
                },
                "org_info": {
                    "content": "<p>哈哈哈哈哈哈哈哈哈哈哈</p>",
                    "url": "http://m.genshuixue.com/i/intro/37du2jy"
                },
                "comment": {
                    "list": [{
                        "user_name": "匿名",
                        "number": "",
                        "user_avatar": "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                        "face_type": "1",
                        "stars": "5.0",
                        "course": "一对一：出国留学 课节1-1 老师：唐星红",
                        "info": "改为好评；匿名评价；给老师（19700000001  lmy111111）的班课评价；评价时间：2016-03-23；二星评价；给老师（19700000001  lmy111111）的班课评价；评价时间：2016-03-23；二星评价；给老师（19700000001  lmy111111）的班课评价；评价时间：2016-03-23；二星评价；给老师（19700000001",
                        "create_time": "03月23日 13:55",
                        "total_score_desc": "好评",
                        "photo_list": [
                            "http://test-img.gsxservice.com/397273_1p3jm7nd.jpeg",
                            "http://test-img.gsxservice.com/397274_t9yiq0gy.jpeg",
                            "http://test-img.gsxservice.com/397275_0a7obovj.jpeg",
                            "http://test-img.gsxservice.com/397276_bo46gnn0.jpeg",
                            "http://test-img.gsxservice.com/397277_a3x1uns1.jpeg"
                        ],
                        "additional": [{
                            "info": "??????? ??????",
                            "create_time": "03月23日 13:55",
                            "type": 3
                        }, {
                            "info": "哈哈哈哈",
                            "create_time": "03月23日 13:55",
                            "type": 1
                        }]
                    }, {
                        "user_name": "小唐同学",
                        "number": "835527078",
                        "course": "一对一：出国留学 课节1-1 老师：唐星红",
                        "user_avatar": "http://test-img.gsxservice.com/375498_tug76mmf.jpeg",
                        "face_type": "1",
                        "stars": "4.0",
                        "info": "中评改为好评\n描述相符：3\n教学态度：4\n响应速度：2",
                        "create_time": "12月08日 11:43",
                        "total_score_desc": "好评",
                        "additional": [],
                        "photo_list": []
                    }, {
                        "user_name": "匿名",
                        "number": "",
                        "user_avatar": "http://img.gsxservice.com/0common/ic_anonymous_user_n.png",
                        "face_type": "1",
                        "stars": "4.0",
                        "course": "一对一：出国留学 课节1-1 老师：唐星红",
                        "info": "差评改好评",
                        "create_time": "12月08日 14:44",
                        "total_score_desc": "好评",
                        "additional": [],
                        "photo_list": []
                    }],
                    "total": 17,
                    "more_url": "http://local-m.genshuixue.com/i/comment/331801619"
                },
                "area": {
                    "count": 14,
                    "position": [],
                    "more_url": "http://local-m.genshuixue.com/i/area/331801619"
                },
                "qrcode_url": "http://local-m.genshuixue.com/i/331801619",
                "page_url": {
                    "index": "http://local-m.genshuixue.com/i/331801619",
                    "course": "http://local-m.genshuixue.com/i/course/331801619",
                    "course_search": "http://local-m.genshuixue.com/i/course_search/331801619",
                    "teacher": "http://local-m.genshuixue.com/i/teacher/331801619",
                    "news": "http://local-m.genshuixue.com/i/black/331801619",
                    "photo": "http://local-m.genshuixue.com/i/photo/331801619",
                    "summary": "http://local-m.genshuixue.com/i/intro/331801619",
                    "comment": "http://local-m.genshuixue.com/i/comment/331801619",
                    "school": "http://local-m.genshuixue.com/i/area/331801619",
                    "coupon": "http://local-m.genshuixue.com/org/couponList?number=331801619"
                },
                "share_info": {
                    "url": "http://local-m.genshuixue.com/i/331801619",
                    "img": "",
                    "title": "智π国际在跟谁学开课啦",
                    "content": "智π国际在跟谁学开课啦，小伙伴们快来围观吧！推荐理由：sd s",
                    "share_pyq": {
                        "url": "http://local-m.genshuixue.com/i/331801619",
                        "img": "",
                        "title": "智π国际在跟谁学开课啦，小伙伴们快来围观吧！推荐理由：sd s",
                        "content": "智π国际在跟谁学开课啦，小伙伴们快来围观吧！推荐理由：sd s"
                    },
                    "share_weixin": {
                        "url": "http://local-m.genshuixue.com/i/331801619",
                        "img": "",
                        "title": "智π国际在跟谁学开课啦",
                        "content": "智π国际在跟谁学开课啦，小伙伴们快来围观吧！推荐理由：sd s"
                    },
                    "share_qq": {
                        "url": "http://local-m.genshuixue.com/i/331801619",
                        "img": "",
                        "title": "智π国际在跟谁学开课啦",
                        "content": "智π国际在跟谁学开课啦，小伙伴们快来围观吧！推荐理由：sd s"
                    },
                    "share_qzone": {
                        "url": "http://local-m.genshuixue.com/i/331801619",
                        "img": "",
                        "title": "智π国际在跟谁学开课啦",
                        "content": "智π国际在跟谁学开课啦，小伙伴们快来围观吧！推荐理由：sd s"
                    },
                    "share_weibo": {
                        "url": "/9HHX1D",
                        "img": "",
                        "title": "",
                        "content": "智π国际在跟谁学开课啦，小伙伴们快来围观吧！推荐理由：sd s"
                    },
                    "share_sms": {
                        "url": "/9HHX1D",
                        "img": "",
                        "title": "",
                        "content": "智π国际在跟谁学开课啦，小伙伴们快来围观吧！推荐理由：sd s"
                    }
                },
                "support_student_advisory": true,
                "is_custom_template_usable": false,
                "fans_count": "102",
                "is_focused": 0,
                "page_title": "【智π国际】智π国际,xxf sdf sfsf sfs fsf f-跟谁学官网",
                "page_keywords": "智π国际,智π国际网站,智π国际官网,智π国际课程,智π国际老师",
                "description": "智π国际,xxf sdf sfsf sfs fsf f。智π国际提供sd、s的课程、老师、视频、相册、评价怎么样,方便学生和家长全方位了解智π国际。找好老师,上跟谁学！",
                "is_sem": 0,
                "lbs": {
                    "province": "北京",
                    "city": "北京",
                    "coord": {
                        "lng": 116.395645038,
                        "lat": 39.9299857781
                    }
                }
            },
            "ts": 1477029316,
            "declare_config": {
                "declareTpl": "org/newOrgDetail"
            }
        }
    };
};

/* eslint-enable fecs-camelcase */