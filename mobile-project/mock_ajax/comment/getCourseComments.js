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
        	"comment_list": [
	            {
	                "serial_number": "160712881015", 
	                "user_id": "3226532", 
	                "teacher_user_id": "84", 
	                "desc_match": "5.0", 
	                "teach_result": "5.0", 
	                "service_attitude": "5.0", 
	                "face_type": "1", 
	                "info": "马上就要高考加油", 
	                "create_time": "2016-11-25 23:48", 
	                "fr": "0", 
	                "course_type": "2", 
	                "course_number": "160413878503", 
	                "thumb_up": "0", 
	                "has_photo": "0", 
	                "display_title": "第46课节(11月25日)", 
	                "anonymous": "0", 
	                "total_score": "5.0", 
	                "comment_num": "24", 
	                "teacher_user_number": "371509928", 
	                "private_domain": "gaofenlaocao", 
	                "comment_id": "1470199", 
	                "has_thumb_up": false, 
	                "comprehensive_score": "5.0", 
	                "course": {
	                    "course_number": "160413878503", 
	                    "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/160413878503", 
	                    "teacher_name": "曹炜", 
	                    "course_type": "2"
	                }, 
	                "user": {
	                    "display_name": "刘琳、", 
	                    "avatar_url": "https://imgs.genshuixue.com/15539519_qi8404n0.jpeg", 
	                    "number": "836325748", 
	                    "url": "http://www.genshuixue.com/x/836325748"
	                }, 
	                "org_create_time": "2016-11-25 23:48:48", 
	                "photo_list": [ ], 
	                "is_my_comment": false, 
	                "if_can_addition": false, 
	                "if_can_review": false, 
	                "has_more": 1, 
	                "can_open": 1, 
	                "other_comment": [
	                    {
	                        "serial_number": "160712881011", 
	                        "user_id": "3226532", 
	                        "teacher_user_id": "84", 
	                        "desc_match": "5.0", 
	                        "teach_result": "5.0", 
	                        "service_attitude": "5.0", 
	                        "face_type": "1", 
	                        "info": "赞来一波", 
	                        "create_time": "2016-11-22 23:56", 
	                        "fr": "0", 
	                        "course_type": "2", 
	                        "course_number": "160413878503", 
	                        "thumb_up": "0", 
	                        "has_photo": "0", 
	                        "display_title": "第45课节(11月22日)", 
	                        "anonymous": "0", 
	                        "total_score": "5.0", 
	                        "teacher_user_number": "371509928", 
	                        "private_domain": "gaofenlaocao", 
	                        "comment_id": "1462189", 
	                        "has_thumb_up": false, 
	                        "comprehensive_score": "5.0", 
	                        "course": {
	                            "course_number": "160413878503", 
	                            "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/160413878503", 
	                            "teacher_name": "曹炜", 
	                            "course_type": "2"
	                        }, 
	                        "user": {
	                            "display_name": "刘琳、", 
	                            "avatar_url": "https://imgs.genshuixue.com/15539519_qi8404n0.jpeg", 
	                            "number": "836325748", 
	                            "url": "http://www.genshuixue.com/x/836325748"
	                        }, 
	                        "org_create_time": "2016-11-22 23:56:28", 
	                        "photo_list": [ ], 
	                        "is_my_comment": false, 
	                        "if_can_addition": false, 
	                        "if_can_review": false
	                    }, 
	                    {
	                        "serial_number": "160712880119", 
	                        "user_id": "3226532", 
	                        "teacher_user_id": "84", 
	                        "desc_match": "5.0", 
	                        "teach_result": "5.0", 
	                        "service_attitude": "5.0", 
	                        "face_type": "1", 
	                        "info": "倒计时200", 
	                        "create_time": "2016-11-19 00:01", 
	                        "fr": "0", 
	                        "course_type": "2", 
	                        "course_number": "160413878503", 
	                        "thumb_up": "0", 
	                        "has_photo": "0", 
	                        "display_title": "第44课节(11月18日)", 
	                        "anonymous": "0", 
	                        "total_score": "5.0", 
	                        "teacher_user_number": "371509928", 
	                        "private_domain": "gaofenlaocao", 
	                        "comment_id": "1448888", 
	                        "has_thumb_up": false, 
	                        "comprehensive_score": "5.0", 
	                        "course": {
	                            "course_number": "160413878503", 
	                            "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/160413878503", 
	                            "teacher_name": "曹炜", 
	                            "course_type": "2"
	                        }, 
	                        "user": {
	                            "display_name": "刘琳、", 
	                            "avatar_url": "https://imgs.genshuixue.com/15539519_qi8404n0.jpeg", 
	                            "number": "836325748", 
	                            "url": "http://www.genshuixue.com/x/836325748"
	                        }, 
	                        "org_create_time": "2016-11-19 00:01:33", 
	                        "photo_list": [ ], 
	                        "is_my_comment": false, 
	                        "if_can_addition": false, 
	                        "if_can_review": false
	                    }, 
	                    {
	                        "serial_number": "160712880631", 
	                        "user_id": "3226532", 
	                        "teacher_user_id": "84", 
	                        "desc_match": "5.0", 
	                        "teach_result": "5.0", 
	                        "service_attitude": "5.0", 
	                        "face_type": "1", 
	                        "info": "在下佩服", 
	                        "create_time": "2016-11-05 00:04", 
	                        "fr": "0", 
	                        "course_type": "2", 
	                        "course_number": "160413878503", 
	                        "thumb_up": "0", 
	                        "has_photo": "0", 
	                        "display_title": "第40课节(11月04日)", 
	                        "anonymous": "0", 
	                        "total_score": "5.0", 
	                        "teacher_user_number": "371509928", 
	                        "private_domain": "gaofenlaocao", 
	                        "comment_id": "1408650", 
	                        "has_thumb_up": false, 
	                        "comprehensive_score": "5.0", 
	                        "course": {
	                            "course_number": "160413878503", 
	                            "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/160413878503", 
	                            "teacher_name": "曹炜", 
	                            "course_type": "2"
	                        }, 
	                        "user": {
	                            "display_name": "刘琳、", 
	                            "avatar_url": "https://imgs.genshuixue.com/15539519_qi8404n0.jpeg", 
	                            "number": "836325748", 
	                            "url": "http://www.genshuixue.com/x/836325748"
	                        }, 
	                        "org_create_time": "2016-11-05 00:04:23", 
	                        "photo_list": [ ], 
	                        "is_my_comment": false, 
	                        "if_can_addition": false, 
	                        "if_can_review": false
	                    }, 
	                    {
	                        "serial_number": "160712879607", 
	                        "user_id": "3226532", 
	                        "teacher_user_id": "84", 
	                        "desc_match": "5.0", 
	                        "teach_result": "5.0", 
	                        "service_attitude": "5.0", 
	                        "face_type": "1", 
	                        "info": "我都不愿离开这个教室", 
	                        "create_time": "2016-10-22 00:05", 
	                        "fr": "0", 
	                        "course_type": "2", 
	                        "course_number": "160413878503", 
	                        "thumb_up": "0", 
	                        "has_photo": "0", 
	                        "display_title": "第36课节(10月21日)", 
	                        "anonymous": "0", 
	                        "total_score": "5.0", 
	                        "teacher_user_number": "371509928", 
	                        "private_domain": "gaofenlaocao", 
	                        "comment_id": "1374065", 
	                        "has_thumb_up": false, 
	                        "comprehensive_score": "5.0", 
	                        "course": {
	                            "course_number": "160413878503", 
	                            "course_url": "http://m.genshuixue.com/teacher/classCourseDetail/160413878503", 
	                            "teacher_name": "曹炜", 
	                            "course_type": "2"
	                        }, 
	                        "user": {
	                            "display_name": "刘琳、", 
	                            "avatar_url": "https://imgs.genshuixue.com/15539519_qi8404n0.jpeg", 
	                            "number": "836325748", 
	                            "url": "http://www.genshuixue.com/x/836325748"
	                        }, 
	                        "org_create_time": "2016-10-22 00:05:41", 
	                        "photo_list": [ ], 
	                        "is_my_comment": false, 
	                        "if_can_addition": false, 
	                        "if_can_review": false
	                    }
	                ]
	            }
	        ], 
	        "related_comment_list": [ ], 
	        "next_cursor": 2, 
	        "has_more": 0, 
	        "additional": {
	            "average": {
	                "total": 6505, 
	                "one": 17, 
	                "two": 0, 
	                "three": 6, 
	                "four": 38, 
	                "five": 6444, 
	                "total_rate": "1.00", 
	                "one_rate": "0.00", 
	                "two_rate": "0.00", 
	                "three_rate": "0.00", 
	                "four_rate": "0.01", 
	                "five_rate": "0.99"
	            }, 
	            "user_total_number": "1639", 
	            "face_type": {
	                "total": 2299, 
	                "lower": 13, 
	                "great": 2282, 
	                "middle": 4, 
	                "has_photo": 6
	            }, 
	            "user_diff": 0, 
	            "comment_nav": {
	                "face_type": "0", 
	                "comment_type": "3", 
	                "sort_by": "display_order"
	            }, 
	            "total_score": {
	                "total": 6505, 
	                "one": 17, 
	                "two": 0, 
	                "three": 6, 
	                "four": 38, 
	                "five": 6444, 
	                "total_rate": "1.00", 
	                "one_rate": "0.00", 
	                "two_rate": "0.00", 
	                "three_rate": "0.00", 
	                "four_rate": "0.01", 
	                "five_rate": "0.99"
	            }
	        }, 
	        "profile": {
	            "number": "371509928", 
	            "name": "曹炜"
	        }, 
	        "course_comment_count": "450", 
	        "course_number": "160413878503", 
	        "comment_type": "3", 
	        "face_type": "0", 
	        "view_all_url": "http://m.genshuixue.com/371509928/tcomment"
        }
    };
};

/* eslint-enable fecs-camelcase */
