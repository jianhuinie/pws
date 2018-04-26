/**
 * @file 编辑课程获取数据接口
 * @path api/tcenter/courses/one-on-one-course/get
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
        query_one_on_one_course_from_shadow: {
            number: 17040554138410,
            subject: {
                "id": 451,
                "level": 3
            },
            categories: [
                // {
                //     "name": "全部",
                //     "type": "CUSTOM",
                //     "subject_id": 114,
                //     "selected": true,
                //     "price_teacher": 1,
                //     "price_student": 3,
                //     "price_online": 4
                // }, 
                {
                    "name": "一年级",
                    "type": "CUSTOM",
                    "subject_id": 114,
                    "selected": true,
                    "price_teacher": 1,
                    "price_student": 3,
                    "price_online": 4
                }, 
                {
                    "name": "二年级",
                    "type": "CUSTOM",
                    "selected": true,
                    "price_teacher": 1,
                    "price_student": 3,
                    "price_online": 4
                },
                {
                    "name": "高考冲刺",
                    "type": "CUSTOM",
                    "selected": true,
                    "price_teacher": 10,
                    "price_student": 20,
                    "price_online": 21
                }
            ],
            lesson_ways: [
                "TEACHER",
                "STUDENT"
            ],
            address: {
                "id": 1,
                "location_addr": "鼓楼大街"
            },
            photos: [
                {
                    "storage_id": 101,
                    "title": "这是图片的描述",
                    "image_url": "http://test-img.gsxservice.com/00-upload/image-test/68844_66ec2f0d055edf13fa4eddbe70613e02_wMK5kjnV.jpg"
                }
            ],
            honors: [
                {
                    "storage_id": 102,
                    "title": "这是荣誉奖励的描述",
                    "image_url": "http://test-img.gsxservice.com/00-upload/image-test/68844_66ec2f0d055edf13fa4eddbe70613e02_wMK5kjnV.jpg"
                }
            ],
            videos: [
                // {
                //     "media_id": 17585,
                //     "title": "这是视频介绍1的描述",
                //     "cover_url": "http://test-img.gsxservice.com/00-upload/image-test/68844_66ec2f0d055edf13fa4eddbe70613e02_wMK5kjnV.jpg"
                // },
                {
                    "media_id": 17582,
                    "title": "这是视频介绍2的描述",
                    "cover_url": "http://test-img.gsxservice.com/00-upload/image-test/68844_66ec2f0d055edf13fa4eddbe70613e02_wMK5kjnV.jpg"
                }
            ],
            success_cases: [
                {
                    "title": "成功案例1",
                    "date": "2016-10-10",
                    "content": "内诶诶这是视频介绍2的描述这是视频介绍2的描述这是视频介绍2的描述这是视频介绍2的描述这是视频介绍2的描述"
                }
            ],
            "verify_status": "FAILED",
            "verify_outer_reasons": {
                "id": "1671",
                "name": "未知字段",
                "reasons": null,
                "children": [
                    {
                        "id": "1674",
                        "name": "图片介绍",
                        "reasons": [
                            "您上传的图片不太清楚，请重新上传清晰完整的图片，谢谢～",
                            "您上传的内容与教授科目无关，请上传教授科目相关的图片，谢谢～",
                            "请不要放置QQ、微信、二维码、手机号、具体地址等联系方式，请重新上传教授科目相关的图片信息，谢谢～",
                            "aaaaaa"
                        ],
                        "children": null
                    }
                ]
            }
        }
    }

    return data;
};