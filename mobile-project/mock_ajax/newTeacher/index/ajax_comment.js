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
                "comment_list": [
                    {
                        "serial_number": "151030522501",
                        "user_id": "1487096",
                        "teacher_user_id": "531153",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "老师在课上讲的几个原则 符号 都对做题很有帮助。速记的方法一开始比较不熟练，但经过练习就能快速掌握。老师上课认真，对学生的帮助很大！！",
                        "create_time": "2015-11-07 17:46",
                        "fr": "0",
                        "course_type": "1",
                        "course_number": "0",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "课节1-1",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "teacher_user_number": "562896968",
                        "private_domain": "562896968",
                        "comment_id": "583472",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "course_number": "0",
                            "course_url": "",
                            "teacher_name": "钟会芝",
                            "course_type": "1",
                            "course_name": null
                        },
                        "user": {
                            "display_name": "Baby",
                            "avatar_url": "https://imgs.genshuixue.com/30518_j897m0no.jpeg",
                            "number": "876353938",
                            "url": "http://beta.genshuixue.com/x/876353938"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "has_more": 0,
                        "can_open": 0
                    },
                    {
                        "serial_number": "0",
                        "user_id": "579016",
                        "teacher_user_id": "531153",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "我是钟老师一对一的学生 今年被耶鲁大学录取  要感谢钟老师备课认真 讲解耐心 在托福听力和写作方面的方法使成绩提高非常显著 准备机经的过程更是精益求精 ",
                        "create_time": "2015-06-08 14:24",
                        "fr": "2",
                        "course_type": "0",
                        "course_number": "0",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "teacher_user_number": "562896968",
                        "private_domain": "562896968",
                        "comment_id": "125117",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "lesson_way": "0",
                            "lesson_way_name": "",
                            "course_name": null,
                            "hours": "0.00",
                            "course_number": "0",
                            "course_url": "",
                            "teacher_name": "钟会芝",
                            "course_type": "0"
                        },
                        "user": {
                            "display_name": "+14*****5525",
                            "avatar_url": "https://imgs.genshuixue.com/30563_r6g3yf28.jpeg",
                            "number": "643577698",
                            "url": "http://beta.genshuixue.com/x/643577698"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "has_more": 0,
                        "can_open": 0
                    },
                    {
                        "serial_number": "0",
                        "user_id": "576409",
                        "teacher_user_id": "531153",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "早有耳闻，全国各地慕名来到北京上钟会芝老师的听力速记课，创造了无数学生托福满分的奇迹。直到孩子上了钟老师的课，才真正感受到果然名不虚传、受益匪浅，孩子也如愿拿到了托福满分的成绩，钟老师不愧为“托福听力速记王”的称号！独特的速记方法、丰富的教学经验、精湛的教学水平、实用的课堂笔记、超大的信息量、课堂效率极高，她不仅课讲的棒，为人真诚热情，被孩子们亲切的称为美女学霸+人生导师！是值得家长信赖的好老师。",
                        "create_time": "2015-06-08 13:04",
                        "fr": "2",
                        "course_type": "0",
                        "course_number": "0",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "teacher_user_number": "562896968",
                        "private_domain": "562896968",
                        "comment_id": "125004",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "lesson_way": "0",
                            "lesson_way_name": "",
                            "course_name": null,
                            "hours": "0.00",
                            "course_number": "0",
                            "course_url": "",
                            "teacher_name": "钟会芝",
                            "course_type": "0"
                        },
                        "user": {
                            "display_name": "139****0471",
                            "avatar_url": "https://imgs.genshuixue.com/30541_myh7ocim.jpeg",
                            "number": "437078178",
                            "url": "http://beta.genshuixue.com/x/437078178"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "has_more": 0,
                        "can_open": 0
                    },
                    {
                        "serial_number": "0",
                        "user_id": "560949",
                        "teacher_user_id": "531153",
                        "desc_match": "5.0",
                        "teach_result": "5.0",
                        "service_attitude": "5.0",
                        "face_type": "1",
                        "info": "非常热爱钟老师的托福课！我是钟老师的忠实粉丝学员。系统学习过钟老师的托福听力速记课程以及托福听力精讲，受益匪浅。钟老师的教学水平精湛，教学经验丰富，思路清晰，笔记精致实用；钟老师和蔼可亲，为人真诚热情，很有感染力，从她的身上既能够学习掌握托福的应试技巧与知识，又可以获得无穷无尽的学习热情与动力，堪称美女学霸+人生导师！！！上课时钟老师会给我们提出明确的任务要求，使得我们目标清楚，少走弯路，学习效率极高；她会亲自批改我们的笔记，对我们的消化与掌握程度把握精准。课下，她喜欢与我们交流心得与生活趣事，向一位知心姐姐一样爱护我们，我很喜欢与钟老师做朋友！总之非常折服美女钟老师的教学与为人，现在一直受益于钟老师教授的方法与精神动力。衷心祝福钟老师生活愉快，工作顺利，桃李满天下！！！",
                        "create_time": "2015-06-03 14:04",
                        "fr": "2",
                        "course_type": "0",
                        "course_number": "0",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "",
                        "anonymous": "0",
                        "total_score": "5.0",
                        "teacher_user_number": "562896968",
                        "private_domain": "562896968",
                        "comment_id": "118426",
                        "has_thumb_up": false,
                        "comprehensive_score": "5.0",
                        "course": {
                            "lesson_way": "0",
                            "lesson_way_name": "",
                            "course_name": null,
                            "hours": "0.00",
                            "course_number": "0",
                            "course_url": "",
                            "teacher_name": "钟会芝",
                            "course_type": "0"
                        },
                        "user": {
                            "display_name": "赵程成",
                            "avatar_url": "https://imgs.genshuixue.com/30534_lssqxf1a.jpeg",
                            "number": "353436728",
                            "url": "http://beta.genshuixue.com/x/353436728"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "has_more": 0,
                        "can_open": 0
                    }
                ],
                "has_more": 0,
                "additional": {
                    "desc_match": "5.0",
                    "service_attitude": "5.0",
                    "teach_result": "5.0",
                    "average": "5.0",
                    "user_total_number": 390,
                    "total_number": 171,
                    "invite_comment_number": 1,
                    "user_comment_number": 170,
                    "active_total_number": 390,
                    "total_score": {
                        "total": 390,
                        "one": 0,
                        "two": 0,
                        "three": 0,
                        "four": 2,
                        "five": 388,
                        "total_rate": "1.00",
                        "one_rate": "0.00",
                        "two_rate": "0.00",
                        "three_rate": "0.00",
                        "four_rate": "0.01",
                        "five_rate": "0.99"
                    },
                    "face_type": {
                        "total": 390,
                        "lower": 0,
                        "great": 390,
                        "middle": 0,
                        "has_photo": 3
                    },
                    "comment_tags": [
                        {
                            "value": "all",
                            "name": "全部评价",
                            "count": 0,
                            "selected": false,
                            "sys": true,
                            "type": 0
                        },
                        {
                            "value": "classify_3002",
                            "name": "好评",
                            "count": 408,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_3004",
                            "name": "最新评价",
                            "count": 1,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_3001",
                            "name": "付费课",
                            "count": 307,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_1844",
                            "name": "态度认真负责",
                            "count": 4,
                            "selected": true,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_1845",
                            "name": "教学能力强",
                            "count": 2,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_1840",
                            "name": "内容新颖有用",
                            "count": 2,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_1841",
                            "name": "课堂气氛活跃",
                            "count": 1,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_1842",
                            "name": "善于沟通",
                            "count": 1,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        }
                    ]
                },
                "profile": {
                    "number": "562896968",
                    "name": "钟会芝"
                },
                "declareTpl": "v2/resources/page/teacherCenter/teacherMain/main/teacher-comment.tpl",
                "show_score": null,
                "page": "1",
                "tpl": "<div class=\"tab-list comments-filter\">  <section class=\"course-tab\">  <ul class=\"comments-filter\">  <li data-type=\"all\" class=\"comment-tag active\"> 全部评价 </li>  <li data-type=\"classify_3002\" class=\"comment-tag \"> 好评 </li>  <li data-type=\"classify_3004\" class=\"comment-tag \"> 最新评价 </li>  <li data-type=\"classify_3001\" class=\"comment-tag \"> 付费课307 </li>  <li data-type=\"classify_1844\" class=\"comment-tag \"> 态度认真负责4 </li>  <li data-type=\"classify_1845\" class=\"comment-tag \"> 教学能力强2 </li>  <li data-type=\"classify_1840\" class=\"comment-tag \"> 内容新颖有用2 </li>  <li data-type=\"classify_1841\" class=\"comment-tag \"> 课堂气氛活跃1 </li>  <li data-type=\"classify_1842\" class=\"comment-tag \"> 善于沟通1 </li>  </ul>\n<div class=\"comment-panel\">   <ul id=\"comment-list\" class=\"comment-list\">  <li class=\"main-course-comment\" data-user_num=\"1487096\" data-index=\"0\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\">     <img width=\"100%\" height=\"100%\" data-src=\"https://imgs.genshuixue.com/30518_j897m0no.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  Baby    <span class=\"like \" data-comment_id=\"583472\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  老师在课上讲的几个原则 符号 都对做题很有帮助。速记的方法一开始比较不熟练，但经过练习就能快速掌握。老师上课认真，对学生的帮助很大！！  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2015-11-07 17:46</span>  <span class=\"course-title \"></span> </div>\n</li>    <li class=\"main-course-comment\" data-user_num=\"579016\" data-index=\"1\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\">     <img width=\"100%\" height=\"100%\" data-src=\"https://imgs.genshuixue.com/30563_r6g3yf28.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  +14*****5525   (邀请评价)   <span class=\"like \" data-comment_id=\"125117\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div> </div>\n<div class=\"comment-content\">  我是钟老师一对一的学生 今年被耶鲁大学录取  要感谢钟老师备课认真 讲解耐心 在托福听力和写作方面的方法使成绩提高非常显著 准备机经的过程更是精益求精   </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2015-06-08 14:24</span>  <span class=\"course-title \"></span> </div>\n</li>    <li class=\"main-course-comment\" data-user_num=\"576409\" data-index=\"2\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\">     <img width=\"100%\" height=\"100%\" data-src=\"https://imgs.genshuixue.com/30541_myh7ocim.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  139****0471   (邀请评价)   <span class=\"like \" data-comment_id=\"125004\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div> </div>\n<div class=\"comment-content\">  早有耳闻，全国各地慕名来到北京上钟会芝老师的听力速记课，创造了无数学生托福满分的奇迹。直到孩子上了钟老师的课，才真正感受到果然名不虚传、受益匪浅，孩子也如愿拿到了托福满分的成绩，钟老师不愧为“托福听力速记王”的称号！独特的速记方法、丰富的教学经验、精湛的教学水平、实用的课堂笔记、超大的信息量、课堂效率极高，她不仅课讲的棒，为人真诚热情，被孩子们亲切的称为美女学霸+人生导师！是值得家长信赖的好老师。  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2015-06-08 13:04</span>  <span class=\"course-title \"></span> </div>\n</li>    <li class=\"main-course-comment\" data-user_num=\"560949\" data-index=\"3\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\">     <img width=\"100%\" height=\"100%\" data-src=\"https://imgs.genshuixue.com/30534_lssqxf1a.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  赵程成   (邀请评价)   <span class=\"like \" data-comment_id=\"118426\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div> </div>\n<div class=\"comment-content\">  非常热爱钟老师的托福课！我是钟老师的忠实粉丝学员。系统学习过钟老师的托福听力速记课程以及托福听力精讲，受益匪浅。钟老师的教学水平精湛，教学经验丰富，思路清晰，笔记精致实用；钟老师和蔼可亲，为人真诚热情，很有感染力，从她的身上既能够学习掌握托福的应试技巧与知识，又可以获得无穷无尽的学习热情与动力，堪称美女学霸+人生导师！！！上课时钟老师会给我们提出明确的任务要求，使得我们目标清楚，少走弯路，学习效率极高；她会亲自批改我们的笔记，对我们的消化与掌握程度把握精准。课下，她喜欢与我们交流心得与生活趣事，向一位知心姐姐一样爱护我们，我很喜欢与钟老师做朋友！总之非常折服美女钟老师的教学与为人，现在一直受益于钟老师教授的方法与精神动力。衷心祝福钟老师生活愉快，工作顺利，桃李满天下！！！  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2015-06-03 14:04</span>  <span class=\"course-title \"></span> </div>\n</li>    </ul>   <p class=\"more-comment no-more\" data-page=\"nomore\">没有更多评价了</p>   <!-- 课程评价页用 relate 区分 表示相关的评价 --> <!--  <p class=\"more-comment no-more\" data-page=\"nomore\">没有更多评价了</p>  -->  </div> </section> </div>"
            },
            "html": "",
            "msg": "succ"
        }
    };
};