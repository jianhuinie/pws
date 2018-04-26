/**
 * @file 视频课编辑接口
 * @path /api/tcenter/courses/video-courses/form
 * @author niejianhui
 */
var mockCreatFunction = function() {
    'use strict';

    var data = {
        code: 0,
        pageDto: null,
        error: null
    };

    data.data = {
        "course": {
            "name": "课程名称",
            "number": 150321545497,
            "language": 9,
            "teacher_name": "丹丹属于机构",
            "teacher_id": 341969,
            "group_name":"分组名字",
            "group_id": 2,
            "verify_passed": 1,
            "display_status": {
                "color": '#ededed',
                "name": '售卖中',
                "display": '当前视频课正在线上售卖中，您对视频课的任何修改和变更都需要经过审核后方可生效，请您谨慎修改'
            },
            "is_new_course": false,
            "is_playback_course": false,
            "defined_number": '31283782sk',
            "detail": '<p>aaa</p>',
            "subject": {
                "id": 974,
                "name": "其他",
                "path_crumbs": "体育>其他>其他",
                "path_mark": "122,23,34,学前,学前艺术,学前艺体",
                "path_array": [
                    {
                        "id": 921,
                        "level": 1,
                        "name": "体育",
                        "remark_name": "体育"
                    },
                    {
                        "id": 973,
                        "level": 2,
                        "name": "其他",
                        "remark_name": "其他"
                    },
                    {
                        "id": 974,
                        "level": 3,
                        "name": "其他",
                        "remark_name": "其他"
                    }
                ]
            },
            "price": 12,
            "cover": {
                "storage_id": 234,
                "url": "https://test-imgs.genshuixue.com/314766_6vb540j7.jpeg"
            },
            "portrait": "https://test-imgs.genshuixue.com/314766_6vb540j7.jpeg",
            "course_mode" : 'chapter', // multiple、chapter
            "expire_days" : 356,
            "org_teachers": [
                {
                    "id": 341968,
                    "realname": "丹丹y机构",
                    "is_valid": 1
                },
                {
                    "id": 341969,
                    "realname": "丹丹属于机构",
                    "is_valid": 1
                },
                {
                    "id": 341970,
                    "realname": "丹丹是机构老师",
                    "is_valid": 1
                }
            ],
            "modify_reasons" : "编辑信息"
        },
        "intro":{
            "style":"brown",
            "items":[
                {
                    "type":"title",
                    "text":"标题模板"
                },
                {
                    "type":"body",
                    "text":"正旺",
                    "font_weight":"normal",
                    "font_size":"15px",
                    "text_align":"left",
                    "color":"#000000"
                },
                {
                    "type":"photo",
                    "storage_id":201106,
                    "url":"http://img.gsxservice.com/39245415_2ixlhpsf.jpeg"
                },
                {
                    "type":"video",
                    "cover_url":"http://img.gsxservice.com/39245415_2ixlhpsf.jpeg",
                    "video_id":18671
                },
                {
                    "type":"audio",
                    "storage_id":201107,
                    "url":"https://test-imgs.genshuixue.com/984486_x8zuceky.mp3"
                }
            ],
        },
        "section_list" : [
            {
                "name" : "课节名称1",
                "video_name": "篮球教学视频1",
                "enable_trial": "enable",
                "trial_minutes": 0,
                "video_id": 143,
                "section_id": 123434,
                "encoding_status": 50
            },
            {
                "name" : "课节名称2",
                "video_name": "篮球教学视频",
                "enable_trial": "enable",
                "trial_minutes": 0,
                "video_id": 143,
                "encoding_status": 30,
                "section_id": 123434
            },
            {
                "name" : "课节名称3",
                "video_name": "篮球教学视频",
                "enable_trial": "enable",
                "trial_minutes": 0,
                "video_id": 143,
                "encoding_status": 50,
                "section_id": 123434
            },
            {
                "name" : "课节名称4",
                "video_name": "篮球教学视频",
                "enable_trial": "enable",
                "trial_minutes": 0,
                "video_id": 143,
                "encoding_status": 70,
                "section_id": 123434
            },
        ],
        "chapter_sections":[
            {
                "name" : "章名字1",
                "chapter_id" : 12323,
                "section_list" : [
                    {
                        "name" : "111",
                        "video_name": "野山鹰 14_高清.mp4",
                        "enable_trial": "enable",
                        "trial_minutes": 0,
                        "video_id": 143,
                        "encoding_status": 50,
                        "section_id": 123434
                    },
                    {
                        "name" : "222",
                        "video_name": "篮球教学视频",
                        "enable_trial": "enable",
                        "trial_minutes": 0,
                        "encoding_status": 30,
                        "video_id": 143,
                        "section_id": 123434
                    },
                    {
                        "name" : "333",
                        "video_name": "篮球教学视频",
                        "enable_trial": "enable",
                        "trial_minutes": 0,
                        "video_id": 143,
                        "encoding_status": 70,
                        "section_id": 123434
                    },
                    {
                        "name" : "444",
                        "video_name": "篮球教学视频",
                        "enable_trial": "enable",
                        "trial_minutes": 0,
                        "video_id": 143,
                        "encoding_status": 50,
                        "section_id": 123434
                    },
                    {
                        "name" : "111",
                        "video_name": "野山鹰 14_高清.mp4",
                        "enable_trial": "enable",
                        "trial_minutes": 0,
                        "video_id": 143,
                        "encoding_status": 70,
                        "section_id": 123434
                    },
                    {
                        "name" : "111",
                        "video_name": "野山鹰 14_高清.mp4",
                        "enable_trial": "enable",
                        "trial_minutes": 0,
                        "encoding_status": 70,
                        "video_id": 143,
                        "section_id": 123434
                    },
                ],
            },
            {
                "name" : "章名字2",
                "chapter_id" : 12323,
                "section_list" : [
                    {
                        "name" : "111",
                        "video_name": "野山鹰 14_高清.mp4",
                        "enable_trial": "enable",
                        "trial_minutes": 0,
                        "video_id": 143,
                        "encoding_status": 50,
                        "section_id": 123434
                    },
                    {
                        "name" : "111",
                        "video_name": "野山鹰 14_高清.mp4",
                        "enable_trial": "enable",
                        "trial_minutes": 0,
                        "video_id": 143,
                        "encoding_status": 70,
                        "section_id": 123434
                    },
                ]
            },
            {
                "name" : "章名字3",
                "chapter_id" : 12323,
                "section_list" : [
                    {
                        "name" : "111",
                        "video_name": "野山鹰 14_高清.mp4",
                        "enable_trial": "enable",
                        "trial_minutes": 0,
                        "video_id": 143,
                        "encoding_status": 50,
                        "section_id": 123434
                    },
                    {
                        "name" : "111",
                        "video_name": "野山鹰 14_高清.mp4",
                        "enable_trial": "enable",
                        "trial_minutes": 0,
                        "video_id": 143,
                        "encoding_status": 30,
                        "section_id": 123434
                    },
                ]
            }
        ],
        "encode_info": [
            '第1节转码失败',
            '第1节转码失败',
            '第1节转码失败'
        ],
        "verify_reasons": {
            "detail": {
                "children":[
                    {
                        "children":[
                            {
                                "id":1701,
                                "name":"课程封面",
                                "reasons":[
                                    "您填写的信息，不要放置跟谁学以外的联系方式哦，请删除后重新填写，谢谢~",
                                    "您填写的内容可能涉及版权、色情、政治等敏感信息，请重新填写，谢谢~",
                                    "您填写的内容有点偏题哦，请重新描述课程信息吧，谢谢~",
                                    "其他原因"
                                ]
                            },
                            {
                                "id":1702,
                                "name":"课程标题",
                                "reasons":[
                                    "您填写的信息，不要放置跟谁学以外的联系方式哦，请删除后重新填写，谢谢~",
                                    "您填写的内容可能涉及版权、色情、政治等敏感信息，请重新填写，谢谢~",
                                    "您填写的内容有点偏题哦，请重新描述课程信息吧，谢谢~",
                                    "其他原因"
                                ]
                            },
                            {
                                "id":1703,
                                "name":"课程价格",
                                "reasons":[
                                    "课时费设置较同行偏高，请酌情修改，谢谢~",
                                    "其他原因"
                                ]
                            },
                            {
                                "id":1704,
                                "name":"观看期限",
                                "reasons":[
                                    "其他原因"
                                ]
                            },
                            {
                                "id":1706,
                                "name":"课程分类",
                                "reasons":[
                                    "您填写的课程分类与课程内容不太相符哦，快重新修改一下吧，谢谢~",
                                    "其他原因"
                                ]
                            },
                            {
                                "id":1707,
                                "name":"课程语言",
                                "reasons":[
                                    "课程语言与课程内容不符",
                                    "其他原因"
                                ]
                            },
                            {
                                "id":1708,
                                "name":"课程标签",
                                "reasons":[
                                    "您填写的信息，不要放置跟谁学以外的联系方式哦，请删除后重新填写，谢谢~",
                                    "您填写的内容可能涉及版权、色情、政治等敏感信息，请重新填写，谢谢~",
                                    "您填写的内容有点偏题哦，请重新描述课程信息吧，谢谢~",
                                    "其他原因"
                                ]
                            },
                            {
                                "id":1709,
                                "name":"课程详情",
                                "reasons":[
                                    "您上传的视频内容并非您本人所讲哦，请提供该视频课主讲老师的视频授权书及身份证件正面照至审核邮箱（shenhe@baijiahulian.com）,审核部核对无误后会特审通过，谢谢~",
                                    "您填写的信息，不要放置跟谁学以外的联系方式哦，请删除后重新填写，谢谢~",
                                    "您填写的内容可能涉及版权、色情、政治等敏感信息，请重新填写，谢谢~",
                                    "您填写的内容有点偏题哦，请重新描述课程信息吧，谢谢~",
                                    "您设置的视频课单价偏高，请控制在500元以内哦，若此课程为连载课程，请您在课程详情处作出说明，并标明课程的总课时长度，谢谢~",
                                    "您填写的课程详情过于简单了，容易使学生产生歧义，需根据授课内容补充课程详情。请您重新修改并提交，谢谢~",
                                    "您上传的视频无实质性授课内容，为不影响老师个人口碑传播，请您重新上传吧，谢谢~",
                                    "其他原因"
                                ]
                            }
                        ],
                        "id":1701,
                        "name":"课程"
                    },
                    {
                        "children":[
                            {
                                "children":[
                                    {
                                        "id":1711,
                                        "name":"视频标题",
                                        "reasons":[
                                            "您填写的内容有点偏题哦，请重新描述视频课标题吧，谢谢~",
                                            "您填写的信息，不要放置跟谁学以外的联系方式哦，请删除后重新填写，谢谢~",
                                            "您填写的内容可能涉及版权、色情、政治等敏感信息，请重新填写，谢谢~",
                                            "其他原因"
                                        ]
                                    },
                                    {
                                        "id":1712,
                                        "name":"视频内容",
                                        "reasons":[
                                            "您上传的视频内容并非本人所讲哦，请提供该视频课主讲老师的视频授权书及身份证件正面照至审核邮箱（shenhe@baijiahulian.com）,审核组核对无误后会特审通过，谢谢~",
                                            "您上传的视频内容中，不要放置跟谁学以外的联系方式哦，请删除后重新填写，谢谢~",
                                            "您上传的内容可能涉及版权、色情、政治等敏感信息，请重新填写，谢谢~",
                                            "您上传的是音频文件哦，请检查后重新上传视频文件，如仅有音频内容，请在课程详情中作出详细说明，谢谢~",
                                            "请不要使用竞品网站录制的课程或者相关链接哦，请检查后重新上传吧，谢谢~",
                                            "您上传的视频时间太短啦，重新上传一段内容更丰富的视频吧，谢谢~ ",
                                            "您上传的视频时间太短啦，重新上传一段内容更丰富的视频吧，谢谢~ ",
                                            "其他原因"
                                        ]
                                    }
                                ],
                                "id":12200,
                                "name":""
                            }
                        ],
                        "id":1710,
                        "name":"课节"
                    }
                ],
                "id":1701,
                "name":"视频课"
            }
        }
    }

    return data;
};