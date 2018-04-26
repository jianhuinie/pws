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
            "message": "succ",
            "data": {
                "tab": "photo",
                "base_info": {
                    "name": "吕媛媛",
                    "number": "542078438",
                    "avatar": "http://img.gsxservice.com/1220194_ungdfu3m.jpeg",
                    "private_domain": "542078438",
                    "sex": "0",
                    "audio": null,
                    "video": {
                        "count": 3,
                        "url": "/video/view/108239"
                    },
                    "introduce": "媛媛老师是一名手机唱歌老师，教学方法独特有创意，用手机就能学，2015年12月已被央视财经频道进行个人采访！\n   学唱歌，就找媛媛老师！",
                    "short_introduce": "全国第一位手机唱歌老师！",
                    "org": {
                        "name": "乐教音乐工作室",
                        "number": "371103059",
                        "url": "http://lejiao.m.genshuixue.com",
                        "membership_level": 4
                    },
                    "course_count": 32,
                    "student_count": 9723,
                    "course_length": 14469.5,
                    "great_rate": 0.99,
                    "detail_url": "/542078438/other_info",
                    "preface": "http://img.gsxservice.com/1367614_ccpwzzmf.jpeg",
                    "history_course_url": "/teacher/classCourseList/542078438",
                    "vip_level": 3
                },
                "photo": {
                    "total": 30,
                    "total_photos": 27,
                    "total_videos": 3,
                    "list": [
                        {
                            "type": "video",
                            "name": "《手机唱歌老师》",
                            "img": "http://img.gsxservice.com/00-x-upload/image/1011877_42922f955d637d9e8c8d49ec85b21017_rANVoCaK.jpg",
                            "url": "/video/view/108239",
                            "create_time": "2015-12-11 22:00:02"
                        },
                        {
                            "type": "video",
                            "name": "北京财经频道个人采访",
                            "img": "http://img.gsxservice.com/00-x-upload/image/214783_850184a476952112ef21bd2be3fa2c88_guLrnxWS.jpg",
                            "url": "/video/view/102507",
                            "create_time": "2015-12-02 20:29:33"
                        },
                        {
                            "type": "video",
                            "name": "《跟谁学网络K歌大赛》",
                            "img": "http://img.gsxservice.com/00-x-upload/image/736569_7a240952d94027f2ccadf1fdd38d849b_6VIGDySP.jpg",
                            "url": "/video/view/107574",
                            "create_time": "2015-12-10 21:41:55"
                        },
                        {
                            "index": 0,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/5839929_9cfuxf73.jpeg",
                            "url": "http://img.gsxservice.com/5839929_9cfuxf73.jpeg",
                            "create_time": "2016-01-17 20:19:06"
                        },
                        {
                            "index": 1,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/5474167_rc6hz0zu.jpeg",
                            "url": "http://img.gsxservice.com/5474167_rc6hz0zu.jpeg",
                            "create_time": "2016-01-07 18:15:40"
                        },
                        {
                            "index": 2,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/5882793_ym9ifxev.jpeg",
                            "url": "http://img.gsxservice.com/5882793_ym9ifxev.jpeg",
                            "create_time": "2016-01-18 22:09:30"
                        },
                        {
                            "index": 3,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/5839930_ofsptfm1.jpeg",
                            "url": "http://img.gsxservice.com/5839930_ofsptfm1.jpeg",
                            "create_time": "2016-01-17 20:19:09"
                        },
                        {
                            "index": 4,
                            "type": "photo",
                            "name": "学员评价",
                            "img": "http://img.gsxservice.com/3670354_ytu7i2mt.jpeg",
                            "url": "http://img.gsxservice.com/3670354_ytu7i2mt.jpeg",
                            "create_time": "2015-10-23 11:01:50"
                        },
                        {
                            "index": 5,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/5839946_ei2700bv.jpeg",
                            "url": "http://img.gsxservice.com/5839946_ei2700bv.jpeg",
                            "create_time": "2016-01-17 20:20:20"
                        },
                        {
                            "index": 6,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/5839945_o59in1sp.jpeg",
                            "url": "http://img.gsxservice.com/5839945_o59in1sp.jpeg",
                            "create_time": "2016-01-17 20:20:20"
                        },
                        {
                            "index": 7,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/5839928_mc0z8vih.jpeg",
                            "url": "http://img.gsxservice.com/5839928_mc0z8vih.jpeg",
                            "create_time": "2016-01-17 20:19:06"
                        },
                        {
                            "index": 8,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/772409_vp9j1sqr.jpeg",
                            "url": "http://img.gsxservice.com/772409_vp9j1sqr.jpeg",
                            "create_time": "2015-04-30 15:21:48"
                        },
                        {
                            "index": 9,
                            "type": "photo",
                            "name": "教学理念",
                            "img": "http://img.gsxservice.com/3670352_ghp0c0d3.jpeg",
                            "url": "http://img.gsxservice.com/3670352_ghp0c0d3.jpeg",
                            "create_time": "2015-10-23 11:01:50"
                        },
                        {
                            "index": 10,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/5474171_g58bista.jpeg",
                            "url": "http://img.gsxservice.com/5474171_g58bista.jpeg",
                            "create_time": "2016-01-07 18:15:46"
                        },
                        {
                            "index": 11,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/5474165_j9loi2of.jpeg",
                            "url": "http://img.gsxservice.com/5474165_j9loi2of.jpeg",
                            "create_time": "2016-01-07 18:15:40"
                        },
                        {
                            "index": 12,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/772412_ig3xysgr.jpeg",
                            "url": "http://img.gsxservice.com/772412_ig3xysgr.jpeg",
                            "create_time": "2015-04-30 15:21:52"
                        },
                        {
                            "index": 13,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/5474164_75fqbsao.jpeg",
                            "url": "http://img.gsxservice.com/5474164_75fqbsao.jpeg",
                            "create_time": "2016-01-07 18:15:39"
                        },
                        {
                            "index": 14,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/1604534_7u71d3oe.jpeg",
                            "url": "http://img.gsxservice.com/1604534_7u71d3oe.jpeg",
                            "create_time": "2015-07-14 23:01:31"
                        },
                        {
                            "index": 15,
                            "type": "photo",
                            "name": "5",
                            "img": "http://img.gsxservice.com/771507_5mk1rfil.jpeg",
                            "url": "http://img.gsxservice.com/771507_5mk1rfil.jpeg",
                            "create_time": "2015-04-30 14:46:42"
                        },
                        {
                            "index": 16,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/2378389_i2ypu7yh.jpeg",
                            "url": "http://img.gsxservice.com/2378389_i2ypu7yh.jpeg",
                            "create_time": "2015-08-26 00:16:45"
                        },
                        {
                            "index": 17,
                            "type": "photo",
                            "name": "戴玉强老师",
                            "img": "http://img.gsxservice.com/676337_1wdbn0vg.jpeg",
                            "url": "http://img.gsxservice.com/676337_1wdbn0vg.jpeg",
                            "create_time": "2015-04-23 19:41:39"
                        },
                        {
                            "index": 18,
                            "type": "photo",
                            "name": "演出",
                            "img": "http://img.gsxservice.com/771495_pzgbr4hq.jpeg",
                            "url": "http://img.gsxservice.com/771495_pzgbr4hq.jpeg",
                            "create_time": "2015-04-30 14:45:15"
                        },
                        {
                            "index": 19,
                            "type": "photo",
                            "name": "学员风采",
                            "img": "http://img.gsxservice.com/3670350_v7oowefa.jpeg",
                            "url": "http://img.gsxservice.com/3670350_v7oowefa.jpeg",
                            "create_time": "2015-10-23 11:01:50"
                        },
                        {
                            "index": 20,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/2378402_lczukjzr.jpeg",
                            "url": "http://img.gsxservice.com/2378402_lczukjzr.jpeg",
                            "create_time": "2015-08-26 00:19:28"
                        },
                        {
                            "index": 21,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/2378386_bqdz5en3.jpeg",
                            "url": "http://img.gsxservice.com/2378386_bqdz5en3.jpeg",
                            "create_time": "2015-08-26 00:16:44"
                        },
                        {
                            "index": 22,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/2378403_3fu2e2vt.jpeg",
                            "url": "http://img.gsxservice.com/2378403_3fu2e2vt.jpeg",
                            "create_time": "2015-08-26 00:19:28"
                        },
                        {
                            "index": 23,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/2378387_7zw57z9v.jpeg",
                            "url": "http://img.gsxservice.com/2378387_7zw57z9v.jpeg",
                            "create_time": "2015-08-26 00:16:45"
                        },
                        {
                            "index": 24,
                            "type": "photo",
                            "name": null,
                            "img": "http://img.gsxservice.com/772413_o5g3rc97.jpeg",
                            "url": "http://img.gsxservice.com/772413_o5g3rc97.jpeg",
                            "create_time": "2015-04-30 15:21:55"
                        },
                        {
                            "index": 25,
                            "type": "photo",
                            "name": "吕老师",
                            "img": "http://img.gsxservice.com/769920_csyyb77b.jpeg",
                            "url": "http://img.gsxservice.com/769920_csyyb77b.jpeg",
                            "create_time": "2015-04-30 11:53:09"
                        },
                        {
                            "index": 26,
                            "type": "photo",
                            "name": "1",
                            "img": "http://img.gsxservice.com/676327_krjspu8w.jpeg",
                            "url": "http://img.gsxservice.com/676327_krjspu8w.jpeg",
                            "create_time": "2015-04-23 19:40:33"
                        }
                    ]
                },
                "favorite_info": {
                    "favorite_status": 0,
                    "type": "teacher",
                    "number": "542078438"
                },
                "page_title": "【吕媛媛相册视频】吕媛媛照片_图片_视频_教程-跟谁学",
                "page_keywords": "吕媛媛照片,吕媛媛视频",
                "description": "跟谁学为您提供吕媛媛老师卡拉OK课程的在线直播、线下班课、1对1课程，吕媛媛相册视频，个人资料，学生评价，吕媛媛课程数量，学生数量，教学时长，好评率，方便学生和家长全方位了解吕媛媛。找好老师，上跟谁学！",
                "page_url": {
                    "course": "http://m.genshuixue.com/542078438/course",
                    "photo_video": "http://m.genshuixue.com/542078438/photoVideo",
                    "experiences": "http://m.genshuixue.com/542078438/experiences",
                    "successCase": "http://m.genshuixue.com/542078438/successCase"
                },
                "share_info": {
                    "title": "吕媛媛老师在跟谁学开课啦",
                    "img_url": "http://img.gsxservice.com/1220194_ungdfu3m.jpeg@300w_300h",
                    "img": "http://img.gsxservice.com/1220194_ungdfu3m.jpeg@300w_300h",
                    "url": "http://m.genshuixue.com/542078438?source=",
                    "text": "我在跟谁学发现了一位好老师吕媛媛，来自乐教音乐工作室，有6年卡拉OK教学经验，自我评价：全国第一位手机唱歌老师！",
                    "content": "我在跟谁学发现了一位好老师吕媛媛，来自乐教音乐工作室，有6年卡拉OK教学经验，自我评价：全国第一位手机唱歌老师！",
                    "share_weixin": {
                        "title": "吕媛媛老师在跟谁学开课啦",
                        "content": "我在跟谁学发现了一位好老师吕媛媛，来自乐教音乐工作室，有6年卡拉OK教学经验，自我评价：全国第一位手机唱歌老师！",
                        "url": "http://m.genshuixue.com/542078438?source=",
                        "img": "http://img.gsxservice.com/1220194_ungdfu3m.jpeg@300w_300h"
                    },
                    "share_pyq": {
                        "title": "我在跟谁学发现了一位好老师吕媛媛，来自乐教音乐工作室，有6年卡拉OK教学经验",
                        "content": "我在跟谁学发现了一位好老师吕媛媛，来自乐教音乐工作室，有6年卡拉OK教学经验",
                        "url": "http://m.genshuixue.com/542078438?source=",
                        "img": "http://img.gsxservice.com/1220194_ungdfu3m.jpeg@300w_300h"
                    },
                    "share_qq": {
                        "title": "吕媛媛老师在跟谁学开课啦",
                        "content": "我在跟谁学发现了一位好老师吕媛媛，来自乐教音乐工作室，有6年卡拉OK教学经验，自我评价：全国第一位手机唱歌老师！",
                        "url": "http://m.genshuixue.com/542078438?source=",
                        "img": "http://img.gsxservice.com/1220194_ungdfu3m.jpeg@300w_300h"
                    },
                    "share_qzone": {
                        "title": "吕媛媛老师在跟谁学开课啦",
                        "content": "我在跟谁学发现了一位好老师吕媛媛，来自乐教音乐工作室，有6年卡拉OK教学经验，自我评价：全国第一位手机唱歌老师！",
                        "url": "http://m.genshuixue.com/542078438?source=",
                        "img": "http://img.gsxservice.com/1220194_ungdfu3m.jpeg@300w_300h"
                    },
                    "share_weibo": {
                        "title": "",
                        "content": "我在跟谁学发现了一位好老师吕媛媛，来自乐教音乐工作室，有6年卡拉OK教学经验，自我评价：全国第一位手机唱歌老师！",
                        "url": "http://gensx.cn/mWDiSj",
                        "img": "http://img.gsxservice.com/1220194_ungdfu3m.jpeg@300w_300h"
                    },
                    "share_sms": {
                        "title": "",
                        "content": "我在跟谁学发现了一位好老师吕媛媛，来自乐教音乐工作室，有6年卡拉OK教学经验，自我评价：全国第一位手机唱歌老师！",
                        "url": "http://gensx.cn/mWDiSj",
                        "img": "http://img.gsxservice.com/1220194_ungdfu3m.jpeg@300w_300h"
                    }
                },
                "im_data": {
                    "c_id": "371103059",
                    "c_role": 6,
                    "group_id": ""
                },
                "tpl": "<div class=\"photo-panel\">  <ul class=\"main-content\">   <li class=\"video-style \" > <a href=\"/video/view/108239\"></a> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/00-x-upload/image/1011877_42922f955d637d9e8c8d49ec85b21017_rANVoCaK.jpg\" > <img class=\"video-img\" src=\"/asset/img/org/detail_video_c6d48997bd.png\"> <strong>《手机唱歌老师》</strong> </span> </li>    <li class=\"video-style \" > <a href=\"/video/view/102507\"></a> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/00-x-upload/image/214783_850184a476952112ef21bd2be3fa2c88_guLrnxWS.jpg\" > <img class=\"video-img\" src=\"/asset/img/org/detail_video_c6d48997bd.png\"> <strong>北京财经频道个人采访</strong> </span> </li>    <li class=\"video-style  margin-edge \" > <a href=\"/video/view/107574\"></a> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/00-x-upload/image/736569_7a240952d94027f2ccadf1fdd38d849b_6VIGDySP.jpg\" > <img class=\"video-img\" src=\"/asset/img/org/detail_video_c6d48997bd.png\"> <strong>《跟谁学网络K歌大赛》</strong> </span> </li>    <li class=\"photo-style \" data-index=\"0\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/5839929_9cfuxf73.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"1\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/5474167_rc6hz0zu.jpeg\" >  </span> </li>    <li class=\"photo-style  margin-edge \" data-index=\"2\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/5882793_ym9ifxev.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"3\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/5839930_ofsptfm1.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"4\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/3670354_ytu7i2mt.jpeg\" > <strong>学员评价</strong> </span> </li>    <li class=\"photo-style  margin-edge \" data-index=\"5\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/5839946_ei2700bv.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"6\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/5839945_o59in1sp.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"7\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/5839928_mc0z8vih.jpeg\" >  </span> </li>    <li class=\"photo-style  margin-edge \" data-index=\"8\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/772409_vp9j1sqr.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"9\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/3670352_ghp0c0d3.jpeg\" > <strong>教学理念</strong> </span> </li>    <li class=\"photo-style \" data-index=\"10\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/5474171_g58bista.jpeg\" >  </span> </li>    <li class=\"photo-style  margin-edge \" data-index=\"11\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/5474165_j9loi2of.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"12\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/772412_ig3xysgr.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"13\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/5474164_75fqbsao.jpeg\" >  </span> </li>    <li class=\"photo-style  margin-edge \" data-index=\"14\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/1604534_7u71d3oe.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"15\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/771507_5mk1rfil.jpeg\" > <strong>5</strong> </span> </li>    <li class=\"photo-style \" data-index=\"16\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/2378389_i2ypu7yh.jpeg\" >  </span> </li>    <li class=\"photo-style  margin-edge \" data-index=\"17\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/676337_1wdbn0vg.jpeg\" > <strong>戴玉强老师</strong> </span> </li>    <li class=\"photo-style \" data-index=\"18\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/771495_pzgbr4hq.jpeg\" > <strong>演出</strong> </span> </li>    <li class=\"photo-style \" data-index=\"19\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/3670350_v7oowefa.jpeg\" > <strong>学员风采</strong> </span> </li>    <li class=\"photo-style  margin-edge \" data-index=\"20\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/2378402_lczukjzr.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"21\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/2378386_bqdz5en3.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"22\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/2378403_3fu2e2vt.jpeg\" >  </span> </li>    <li class=\"photo-style  margin-edge \" data-index=\"23\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/2378387_7zw57z9v.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"24\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/772413_o5g3rc97.jpeg\" >  </span> </li>    <li class=\"photo-style \" data-index=\"25\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/769920_csyyb77b.jpeg\" > <strong>吕老师</strong> </span> </li>    <li class=\"photo-style  margin-edge \" data-index=\"26\"> <span class=\"img-background\"> <img width=\"100%\" height=\"100%\" class=\"preface-img photo\" clip-rc=\"1\" data-src=\"http://img.gsxservice.com/676327_krjspu8w.jpeg\" > <strong>1</strong> </span> </li>   </ul> </div>"
            },
            "html": "",
            "msg": "succ"
        }
    };
};

/* eslint-enable fecs-camelcase */
