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
        _data:
        {
            "code": 0,
            "data": {
                "info": [
                    {
                        "title": "10天转化3万元的实战分享",
                        "desc": "王雪，跟谁学总部小学品类负责人。本次，她分享了太原小学作文杨红老师如何通过设置爆品引流课实现“十天转化三万元”的实战秘籍。",
                        "img": "https://imgs.genshuixue.com/0cms/d/file/content/2016/12/5850c2c4c2115.png",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16121498486&user_number=707261868&source=gsx_college",
                        "show_count": 10,
                        "hot_count": 275,
                        "icon": 0
                    },
                    {
                        "title": "提升正价课转化率的核心秘密",
                        "desc": "林久鹏，跟谁学南京分公司线上运营负责人。他结合数百位老师线上运营的实战经验，为您讲解如何对课程进行有价值的包装，及如何大幅提升高价课程的转化率。",
                        "img": "https://imgs.genshuixue.com/0cms/d/file/content/2016/12/58479b8d48ace.png",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16120794810&user_number=707261868&source=gsx_college",
                        "show_count": 112,
                        "hot_count": 286,
                        "icon": 1
                    },
                    {
                        "title": "社群招生破3000，5步玩转微信社群",
                        "desc": "Tyger李勤骞，跟谁学平台英语口语名师。这个暑假，他利用独创的社群营销5步大法，轻松实现招生突破1000人，截至10月18日，招生突破3000人！",
                        "img": "https://imgs.genshuixue.com/0cms/d/file/content/2016/12/584507988ea3b.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=1611296510301&user_number=707261868&source=gsx_college",
                        "show_count": 758,
                        "hot_count": 253,
                        "icon": 0
                    },
                    {
                        "title": "6步打造牛X的课程体系",
                        "desc": "刘文明，跟谁学出国留学品类运营负责人、城市英雄全国运营负责人。运营特色“稳、准、狠”，擅长为老师出谋划策，快速打造适合自己的线上核心课程，迅速获得显著效果。",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/11/5834f5738bc4c.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=1611229746301&user_number=707261868&source=gsx_college",
                        "show_count": 724,
                        "hot_count": 358,
                        "icon": 1
                    },
                    {
                        "title": "从一名普通老师到一个品牌，一个老师的自我升级之路",
                        "desc": "黄保余老师原本是一名普通的语文老师，自从他将自己的课程编辑成一系列图书，一切就发生了变化。图书销量异常火爆，单本仅网络销量就超过50万，年收益达到80万。更重要的是他将“黄保余”三个字塑造成了一个颇具影响力的品牌。",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/11/582eb2d67bceb.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16112156501&user_number=707261868&source=gsx_college",
                        "show_count": 450,
                        "hot_count": 380,
                        "icon": 1
                    },
                    {
                        "title": "来10个学生就搞定5个的秘籍",
                        "desc": "跟谁学K12运营负责人吴旋娟，擅长帮助老师打造独特的个人品牌，搭建完善的课程体系，并建立高效的转化流程，很多老师在她的指导下实现了教育互联网的转型。",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/11/58227e667eee1.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=1611095239501&source=gsx_college",
                        "show_count": 1252,
                        "hot_count": 145,
                        "icon": 1
                    },
                    {
                        "title": "单月突破20万的两大法宝！",
                        "desc": "她是CCTV专访名师，她18岁开始习练瑜伽，切身感受到瑜伽带给她从身体到心灵的改变。 她是学员心中的“瑜伽女神”，2015年度获得“每日瑜伽”教练冠军！",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/11/581bfed5bb52d.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16110484257&source=gsx_college",
                        "show_count": 660,
                        "hot_count": 384,
                        "icon": 1
                    },
                    {
                        "title": "直播课吸粉快、转化高的8个秘密",
                        "desc": "郑好，跟谁学运营达人，网络名师的幕后推手，成功帮助多名老师完成互联网的华丽转身。",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/10/5812ff6d37d5d.png",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16102789322&source=gsx_college",
                        "show_count": 905,
                        "hot_count": 473,
                        "icon": 1
                    },
                    {
                        "title": "用创业的心态做线上教育",
                        "desc": "续智贤，知名高考英语培训师，cctv专访名师。 从业十四年，累计培训学生5万人次，累计培训时长2.5万小时。 让我们一起来听一听续老师是如何用创业者的心态运营跟谁学线上课程的！",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/10/581050cf7add7.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16081779380&source=gsx_college",
                        "show_count": 574,
                        "hot_count": 893,
                        "icon": 1
                    },
                    {
                        "title": "徐熠老师6000名学生招生十大秘诀！",
                        "desc": "徐熠老师，在跟谁学平台运营不到一年的时间，获得了6000名学生，1200多条好评，累积收入30多万。",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/10/581050a1dc1d0.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16090645245&source=gsx_college",
                        "show_count": 932,
                        "hot_count": 827,
                        "icon": 1
                    },
                    {
                        "title": "3个月如何实现从0到10万？",
                        "desc": "张梅老师，12年教龄，教授学生过万，培训过的学生高考化学成绩至少70分以上，超过50%的同学高考化学成绩上90，甚至接近满分。到目前为止，在跟谁学平台上开设的大大小小的课程有47门，浏览量破6万，学生人数3200多人，课时数1.2万小时，营收破10万。",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/10/581050674807e.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16082474912&source=gsx_college",
                        "show_count": 1036,
                        "hot_count": 649,
                        "icon": 1
                    },
                    {
                        "title": "我是如何快速在线上拥有5800名学生的",
                        "desc": "曹永老师，在线下，他用了近十年的时间，从一个大学生蜕变成一位高考英语金牌教师；在线上，他仅仅用了4个月时间，在跟谁学平台积累了5800名学生。这，不仅是幸运之神的眷顾，更是他实力与努力的体现！让我们一起来分享曹老师的秘诀与经验！",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/10/5810500789f81.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16083041170&source=gsx_college",
                        "show_count": 1981,
                        "hot_count": 877,
                        "icon": 1
                    },
                    {
                        "title": "两万学生蜂拥而至的秘诀！",
                        "desc": "柴鹤轩老师，跟谁学平台记忆法名师。从3月份开始全面运营跟谁学，到目前为止，累计招生2.2万人次，教学时长11万小时。听柴老师为您独家揭秘：两万学生蜂拥而至的秘诀！",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/10/58104f63cdc65.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16091478421&source=gsx_college",
                        "show_count": 685,
                        "hot_count": 625,
                        "icon": 1
                    },
                    {
                        "title": "线上5000学生，线下1000学生，我做到了！",
                        "desc": "宋杰老师，CCTV专访名师，跟谁学平台线上名师。宋老师在语文教学上有很深的造诣。他不仅在线上有5000多名学生，在线下还有1000多名学生，线上线下都很棒。他开设的免费千人直播课，不仅到课率高，而且听课的学生中途几乎无人离场，除了实力，还有些什么技巧？",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/10/58104f37d7054.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16092046683&source=gsx_college",
                        "show_count": 969,
                        "hot_count": 712,
                        "icon": 1
                    },
                    {
                        "title": "“曾哥”分享如何在15天高效转化8万业绩",
                        "desc": "曾珍老师，2016年6月加入跟谁学并成为了“城市英雄”。通过自己的运营，15天时间做出了8万业绩，最多一天完成了12单共2万余元的业绩。她是怎么做到的？来听听曾哥的分享吧~",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/10/58104e647afaf.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16092750811&source=gsx_college",
                        "show_count": 1545,
                        "hot_count": 958,
                        "icon": 1
                    },
                    {
                        "title": "流量暴增的5个秘诀！",
                        "desc": "李佳音老师，CCTV专访名师，跟谁学平台播音主持全国名师，2016年6月加盟城市英雄。开设的第一期课程，仅仅用了10天的时间，报名人数就突破2000人。",
                        "img": "http://img.gsxservice.com/0cms/d/file/content/2016/10/58104e052afb4.jpg",
                        "url": "http://m.genshuixue.com/video_course/getcourseshowdetail?number=16102085250&source=gsx_college",
                        "show_count": 621,
                        "hot_count": 528,
                        "icon": 1
                    }
                ],
                "share": {
                    "share_email": {
                        "title": "Hi,",
                        "content": "跟谁学大学，网络名师孵化器“链接\"",
                        "url": "http://m.genshuixue.com/tcenter/gsx_college/list?type=star_share&source=gsx_college",
                        "img": "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/581070baac8e9.png"
                    },
                    "share_weibo": {
                        "title": "",
                        "content": "#找好老师，上跟谁学#跟谁学大学，网络名师孵化器“链接”",
                        "url": "http://m.genshuixue.com/tcenter/gsx_college/list?type=star_share&source=gsx_college",
                        "img": "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/581070baac8e9.png"
                    },
                    "share_qq": {
                        "title": "跟谁学大学，网络名师孵化器",
                        "content": "用互联网助力招生、提升管理、展示品牌，干货课程尽在跟谁学大学！",
                        "url": "http://m.genshuixue.com/tcenter/gsx_college/list?type=star_share&source=gsx_college",
                        "img": "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/581070baac8e9.png"
                    },
                    "share_sms": {
                        "title": "",
                        "content": "跟谁学大学，网络名师孵化器“链接”",
                        "url": "http://m.genshuixue.com/tcenter/gsx_college/list?type=star_share&source=gsx_college",
                        "img": ""
                    },
                    "share_weixin": {
                        "title": "跟谁学大学，网络名师孵化器",
                        "content": "用互联网助力招生、提升管理、展示品牌，干货课程尽在跟谁学大学！",
                        "url": "http://m.genshuixue.com/tcenter/gsx_college/list?type=star_share&source=gsx_college",
                        "img": "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/581070baac8e9.png"
                    },
                    "share_pyq": {
                        "title": "",
                        "content": "跟谁学大学，网络名师孵化器",
                        "url": "http://m.genshuixue.com/tcenter/gsx_college/list?type=star_share&source=gsx_college",
                        "img": "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/581070baac8e9.png"
                    },
                    "share_qzone": {
                        "title": "跟谁学",
                        "content": "跟谁学大学，网络名师孵化器",
                        "url": "http://m.genshuixue.com/tcenter/gsx_college/list?type=star_share&source=gsx_college",
                        "img": "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/581070baac8e9.png"
                    },
                    "copy_link": {
                        "title": "链接",
                        "content": "",
                        "url": "http://m.genshuixue.com/tcenter/gsx_college/list?type=star_share&source=gsx_college",
                        "img": "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/581070baac8e9.png"
                    }
                }
            },
            "render": "v2/resources/page/college/product/index"
        }
    };
};

/* eslint-enable fecs-camelcase */