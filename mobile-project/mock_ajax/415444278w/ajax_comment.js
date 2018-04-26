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
                        "serial_number": "0",
                        "user_id": "347238",
                        "teacher_user_id": "347019",
                        "desc_match": "2.0",
                        "teach_result": "2.0",
                        "service_attitude": "2.0",
                        "face_type": "2",
                        "info": "线下班课竞品评价，2颗星星查评",
                        "create_time": "2017-02-22 22:13",
                        "fr": "0",
                        "course_type": "2",
                        "course_number": "170222803982",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "总课程",
                        "anonymous": "0",
                        "total_score": "2.0",
                        "comment_num": "1",
                        "teacher_user_number": "415444278",
                        "private_domain": "415444278w",
                        "comment_id": "40950",
                        "has_thumb_up": false,
                        "comprehensive_score": "2.0",
                        "course": {
                            "course_number": "170222803982",
                            "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/170222803982",
                            "teacher_name": "王倩倩",
                            "course_type": "2",
                            "course_name": "竞品线下班课评价"
                        },
                        "user": {
                            "display_name": "颜智志",
                            "avatar_url": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg",
                            "number": "457611068",
                            "url": "https://test.genshuixue.com/x/457611068"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "has_more": 0,
                        "can_open": 0
                    },
                    {
                        "serial_number": "170222599408",
                        "user_id": "347238",
                        "teacher_user_id": "347019",
                        "desc_match": "1.0",
                        "teach_result": "1.0",
                        "service_attitude": "1.0",
                        "face_type": "3",
                        "info": "竞品一对一评价不满意，1颗星星差评",
                        "create_time": "2017-02-22 22:05",
                        "fr": "0",
                        "course_type": "1",
                        "course_number": "319684165497",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "第2课节(02月22日)",
                        "anonymous": "1",
                        "total_score": "1.0",
                        "comment_num": "1",
                        "teacher_user_number": "415444278",
                        "private_domain": "415444278w",
                        "comment_id": "40949",
                        "has_thumb_up": false,
                        "comprehensive_score": "1.0",
                        "course": {
                            "course_number": "319684165497",
                            "course_url": "http://test-m.genshuixue.com/teacher/one2oneCourseDetail/319684165497",
                            "teacher_name": "王倩倩",
                            "course_type": "1",
                            "course_name": "竞品一对一课程评价"
                        },
                        "user": {
                            "display_name": "匿名用户",
                            "avatar_url": "https://imgs.genshuixue.com/0common/ic_anonymous_user_n.png",
                            "url": ""
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "has_more": 0,
                        "can_open": 0
                    },
                    {
                        "serial_number": "170221599785",
                        "user_id": "347238",
                        "teacher_user_id": "347019",
                        "desc_match": "3.0",
                        "teach_result": "3.0",
                        "service_attitude": "3.0",
                        "face_type": "2",
                        "info": "结束课程有回放兔兔咯来咯哦咯哦得了咯",
                        "create_time": "2017-02-22 20:17",
                        "fr": "0",
                        "course_type": "2",
                        "course_number": "170221803462",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "第1课节(02月21日)",
                        "anonymous": "0",
                        "total_score": "3.0",
                        "comment_num": "2",
                        "teacher_user_number": "415444278",
                        "private_domain": "415444278w",
                        "comment_id": "40948",
                        "has_thumb_up": false,
                        "comprehensive_score": "3.0",
                        "course": {
                            "course_number": "170221803462",
                            "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/170221803462",
                            "teacher_name": "王倩倩",
                            "course_type": "2",
                            "course_name": "会员课程结束后有回放1"
                        },
                        "user": {
                            "display_name": "颜智志",
                            "avatar_url": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg",
                            "number": "457611068",
                            "url": "https://test.genshuixue.com/x/457611068"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "has_more": 0,
                        "can_open": 1,
                        "other_comment": [
                            {
                                "id": "40946",
                                "purchase_id": "1117022164619931",
                                "serial_number": "0",
                                "user_id": "347238",
                                "teacher_user_id": "347019",
                                "desc_match": "3.0",
                                "teach_result": "3.0",
                                "service_attitude": "3.0",
                                "face_type": "2",
                                "info": "会员结束后有回放，三颗星333",
                                "pid": "0",
                                "create_time": "2017-02-22 19:57:04",
                                "update_time": "2017-02-22 19:57:04",
                                "fr": "0",
                                "course_type": "2",
                                "course_number": "170221803462",
                                "display_order": "0",
                                "thumb_up": "0",
                                "has_photo": "0",
                                "organization_id": null,
                                "display_title": "总课程",
                                "anonymous": "0",
                                "has_modify": "0",
                                "total_score": "3.0",
                                "has_reply": "0",
                                "has_addition": "0",
                                "lesson_way": "online",
                                "user_number": "457611068",
                                "teacher_user_number": "415444278",
                                "private_domain": "415444278w",
                                "user_avatar": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg",
                                "teacher_avatar": "https://test-imgs.genshuixue.com/415714_6f0j25ji.jpeg",
                                "user_name": "颜智志",
                                "display_name": "颜智志",
                                "student_name": "颜智志",
                                "student_display_name": "颜智志",
                                "user_name_cut": "颜智志",
                                "student_name_cut": "颜智志",
                                "teacher_user_name": "王倩倩",
                                "teacher_display_name": "王倩倩",
                                "teacher_user_name_cut": "王倩倩",
                                "content": "会员结束后有回放，三颗星333",
                                "course_name": "会员课程结束后有回放1"
                            }
                        ]
                    },
                    {
                        "serial_number": "170221534761",
                        "user_id": "347238",
                        "teacher_user_id": "347019",
                        "desc_match": "2.0",
                        "teach_result": "2.0",
                        "service_attitude": "2.0",
                        "face_type": "2",
                        "info": "会员上课中且有回放1，两颗星222222",
                        "create_time": "2017-02-22 20:02",
                        "fr": "0",
                        "course_type": "2",
                        "course_number": "170221738438",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "第1课节(02月21日)",
                        "anonymous": "0",
                        "total_score": "2.0",
                        "comment_num": "1",
                        "teacher_user_number": "415444278",
                        "private_domain": "415444278w",
                        "comment_id": "40947",
                        "has_thumb_up": false,
                        "comprehensive_score": "2.0",
                        "course": {
                            "course_number": "170221738438",
                            "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/170221738438",
                            "teacher_name": "王倩倩",
                            "course_type": "2",
                            "course_name": "会员上课中且有回放1"
                        },
                        "user": {
                            "display_name": "颜智志",
                            "avatar_url": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg",
                            "number": "457611068",
                            "url": "https://test.genshuixue.com/x/457611068"
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
                        "user_id": "347238",
                        "teacher_user_id": "347019",
                        "desc_match": "3.0",
                        "teach_result": "3.0",
                        "service_attitude": "3.0",
                        "face_type": "2",
                        "info": "ndksjfkdsjfklsjdflksldfk;sdkf;s",
                        "create_time": "2017-02-18 09:45",
                        "fr": "0",
                        "course_type": "2",
                        "course_number": "170213804701",
                        "thumb_up": "0",
                        "has_photo": "0",
                        "display_title": "总课程",
                        "anonymous": "0",
                        "total_score": "3.0",
                        "comment_num": "1",
                        "teacher_user_number": "415444278",
                        "private_domain": "415444278w",
                        "comment_id": "40932",
                        "has_thumb_up": false,
                        "comprehensive_score": "3.0",
                        "course": {
                            "course_number": "170213804701",
                            "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/170213804701",
                            "teacher_name": "王倩倩",
                            "course_type": "2",
                            "course_name": "插班看回放逻辑优化"
                        },
                        "user": {
                            "display_name": "颜智志",
                            "avatar_url": "https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg",
                            "number": "457611068",
                            "url": "https://test.genshuixue.com/x/457611068"
                        },
                        "photo_list": [],
                        "is_my_comment": false,
                        "if_can_addition": false,
                        "if_can_review": false,
                        "has_more": 0,
                        "can_open": 0
                    }
                ],
                "has_more": 1,
                "additional": {
                    "desc_match": "3.6",
                    "service_attitude": "3.6",
                    "teach_result": "3.5",
                    "average": "3.6",
                    "user_total_number": 40,
                    "total_number": 37,
                    "invite_comment_number": 0,
                    "user_comment_number": 37,
                    "active_total_number": 40,
                    "total_score": {
                        "total": 40,
                        "one": 5,
                        "two": 4,
                        "three": 9,
                        "four": 4,
                        "five": 18,
                        "total_rate": "1.00",
                        "one_rate": "0.12",
                        "two_rate": "0.10",
                        "three_rate": "0.23",
                        "four_rate": "0.10",
                        "five_rate": "0.45"
                    },
                    "face_type": {
                        "total": 40,
                        "lower": 5,
                        "great": 24,
                        "middle": 11,
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
                            "value": "classify_3003",
                            "name": "差评",
                            "count": -1,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_3002",
                            "name": "好评",
                            "count": -1,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_3001",
                            "name": "付费课",
                            "count": 23,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_1843",
                            "name": "颜值高",
                            "count": 2,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_1844",
                            "name": "态度认真负责",
                            "count": 2,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        },
                        {
                            "value": "classify_3004",
                            "name": "最新评价",
                            "count": 0,
                            "selected": false,
                            "sys": false,
                            "type": 1
                        }
                    ]
                },
                "profile": {
                    "number": "415444278",
                    "name": "王倩倩"
                },
                "declareTpl": "v2/resources/page/teacherCenter/teacherSuper/main/teacher-comment.tpl",
                "show_score": "1",
                "tpl": "<div class=\"comments-overview\"> <ul class=\"comments-statistics\"> <li class=\"sum-score\"> <span> <span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <span class=\"star-half\"> <i class=\"icon icon-star_half\"></i> <i class=\"icon icon-star_all\"></i> </span>    <i class=\"icon icon-star_all\"></i>  </span> </span>  <span class=\"score\">3.6</span> 分  </li> <li class=\"total-number\"> 40条学习评价 </li> </ul> <ul class=\"comments-stars\">       <li> <span class=\"star-level\">5星</span> <span class=\"grey-line\"> <span class=\"orange-line\" data-percent=\"0.45\" style=\"width:81px\"></span> </span> <span class=\"num\">   45%  </span> </li>      <li> <span class=\"star-level\">4星</span> <span class=\"grey-line\"> <span class=\"orange-line\" data-percent=\"0.10\" style=\"width:18px\"></span> </span> <span class=\"num\">   10%  </span> </li>      <li> <span class=\"star-level\">3星</span> <span class=\"grey-line\"> <span class=\"orange-line\" data-percent=\"0.23\" style=\"width:41px\"></span> </span> <span class=\"num\">   23%  </span> </li>      <li> <span class=\"star-level\">2星</span> <span class=\"grey-line\"> <span class=\"orange-line\" data-percent=\"0.10\" style=\"width:18px\"></span> </span> <span class=\"num\">   10%  </span> </li>      <li> <span class=\"star-level\">1星</span> <span class=\"grey-line\"> <span class=\"orange-line\" data-percent=\"0.12\" style=\"width:21px\"></span> </span> <span class=\"num\">   12%  </span> </li>  </ul>\n</div>\n <div class=\"tab-list comments-filter\">  <ul class=\"tab-title\"> <li class=\"tab-item all-class active\" comment_type=\"0\" data-type=\"0\"> <div>全部评价</div> </li> <li class=\"tab-item one2one\" comment_type=\"1\" data-type=\"1\"> <div>一对一</div> </li> <li class=\"tab-item class-course\" comment_type=\"3\" data-type=\"3\"> <div>班课</div> </li> <li class=\"tab-item video\" comment_type=\"4\" data-type=\"4\"> <div>视频课</div> </li> </ul>  <section class=\"course-tab\">  <ul class=\"comments-filter\">  <li data-type=\"all\" class=\"comment-tag active\"> 全部评价 </li>  <li data-type=\"classify_3003\" class=\"comment-tag \"> 差评 </li>  <li data-type=\"classify_3002\" class=\"comment-tag \"> 好评 </li>  <li data-type=\"classify_3001\" class=\"comment-tag \"> 付费课23 </li>  <li data-type=\"classify_1843\" class=\"comment-tag \"> 颜值高2 </li>  <li data-type=\"classify_1844\" class=\"comment-tag \"> 态度认真负责2 </li>  <li data-type=\"classify_3004\" class=\"comment-tag \"> 最新评价 </li>  </ul>\n<div class=\"comment-panel\">   <ul id=\"comment-list\" class=\"comment-list\">  <li class=\"main-course-comment\" data-user_num=\"347238\" data-index=\"0\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  颜智志    <span class=\"like \" data-comment_id=\"40950\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all\"></i>    <i class=\"icon icon-star_all\"></i>    <i class=\"icon icon-star_all\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  线下班课竞品评价，2颗星星查评  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-02-22 22:13</span>  <span class=\"course-title \">竞品线下班课评价</span> </div>\n</li>    <li class=\"main-course-comment\" data-user_num=\"347238\" data-index=\"1\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"https://imgs.genshuixue.com/0common/ic_anonymous_user_n.png\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  匿名用户    <span class=\"like \" data-comment_id=\"40949\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all\"></i>    <i class=\"icon icon-star_all\"></i>    <i class=\"icon icon-star_all\"></i>    <i class=\"icon icon-star_all\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  竞品一对一评价不满意，1颗星星差评  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-02-22 22:05</span>  <span class=\"course-title \">竞品一对一课程评价</span> </div>\n</li>    <li class=\"main-course-comment\" data-user_num=\"347238\" data-index=\"2\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  颜智志    <span class=\"like \" data-comment_id=\"40948\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all\"></i>    <i class=\"icon icon-star_all\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  结束课程有回放兔兔咯来咯哦咯哦得了咯  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-02-22 20:17</span>  <span class=\"course-title \">会员课程结束后有回放1</span> </div>\n</li>   <ul class=\"other-comment-list\" data-user-type=\"0\" data-course-number=\"170221803462\" data-user_num=\"347238\" style=\"display: none\">   <li class=\"other-course-comment\" data-index=\"2\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  匿名用户    </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all\"></i>    <i class=\"icon icon-star_all\"></i>  </span>  <span class=\"like \" data-comment_id=\"\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div> </div>\n<div class=\"comment-content\">  会员结束后有回放，三颗星333  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-02-22 19:57:04</span>  <span class=\"course-title \"></span> </div>\n</li>    </ul> <div class=\"user-more-comment\" data-user-type=\"0\" data-course-number=\"170221803462\" data-user_num=\"347238\" data-comment_num=\"1\"> 查看该用户其他1条评价 </div>   <li class=\"main-course-comment\" data-user_num=\"347238\" data-index=\"3\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  颜智志    <span class=\"like \" data-comment_id=\"40947\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all\"></i>    <i class=\"icon icon-star_all\"></i>    <i class=\"icon icon-star_all\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  会员上课中且有回放1，两颗星222222  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-02-22 20:02</span>  <span class=\"course-title \">会员上课中且有回放1</span> </div>\n</li>    <li class=\"main-course-comment\" data-user_num=\"347238\" data-index=\"4\">\n<a  href=\"javascript:void(0);\" > <div class=\"user-img\"> <img width=\"100%\" height=\"100%\" src=\"http://img.gsxservice.com/0cms/d/file/content/2016/01/56a2315c62581.png\" data-src=\"https://test-imgs.genshuixue.com/421313_amj8wlz5.jpeg\"> </div>\n</a> <div class=\"right-info\"> <div class=\"user-name\">  颜智志    <span class=\"like \" data-comment_id=\"40932\" data-thumb=\"0\"> <i class=\"icon icon-like\"></i> <span class=\"like-num\">(0)</span> </span>  </div>  <div class=\"stars-info\"> 评分<span class=\"star-score\">   <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all star-shine\"></i>    <i class=\"icon icon-star_all\"></i>    <i class=\"icon icon-star_all\"></i>  </span>  </div> </div>\n<div class=\"comment-content\">  ndksjfkdsjfklsjdflksldfk;sdkf;s  </div>\n<div class=\"course-info single-line\"> <span class=\"create-time\">2017-02-18 09:45</span>  <span class=\"course-title \">插班看回放逻辑优化</span> </div>\n</li>    </ul> <!-- 课程评价页用 relate 区分 表示相关的评价 -->    </div> </section> </div>"
            },
            "html": "",
            "msg": "succ"
        }
    };
};

/* eslint-enable fecs-camelcase */