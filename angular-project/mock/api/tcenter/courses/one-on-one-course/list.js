/**
 * @file 获取老师优选一对一课程列表
 * @path /api/tcenter/courses/one-on-one-course/list
 * @author niejianhui
 */
var mockCreatFunction = function() {
    'use strict';

    var data = {
        code: 211,
        pageDto: null,
        error: null,
        track_id: 'a3nd93ndsf93a3nd93ndsf93'
    };

    data.data = {
        "query_one_on_one_can_add_new_one": {
            "flag": 'NO'
        },
        "query_one_on_one_courses": [{
            "number": "17040547674410",
            "name": "孕期·孕婴辅导",
            "lesson_ways": [
                "ONLINE",
                "STUDENT",
                "TEACHER"
            ],
            "teach_length_hours": 1111,
            "price_range": {
                "max": "21.00",
                "min": "1.00"
            },
            "display_status_teacher": {
                "status": {
                    "state": "VERIFY_FAILED",
                    "name": "审核失败"
                },
                "actions": [{
                    "name": "编辑",
                    "action": "EDIT"
                }, {
                    "name": "删除",
                    "action": "DELETE"
                }]
            },
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
        }, {
            "number": "17040547674810",
            "name": "孕期·孕婴辅导",
            "lesson_ways": [
                "STUDENT"
            ],
            "teach_length_hours": 1111,
            "price_range": {
                "max": "21.00",
                "min": "1.00"
            },
            "display_status_teacher": {
                "status": {
                    "state": "VERIFYING",
                    "name": "审核中"
                },
                "actions": [{
                    "name": "编辑",
                    "action": "EDIT"
                }, {
                    "name": "删除",
                    "action": "DELETE"
                }]
            }
        }, {
            "number": "17040547687210",
            "name": "孕期·孕婴辅导",
            "lesson_ways": [
                "ONLINE",
                "STUDENT"
            ],
            "teach_length_hours": 1111,
            "price_range": {
                "max": "21.00",
                "min": "1.00"
            },
            "display_status_teacher": {
                "status": {
                    "state": "VERIFYING",
                    "name": "审核中"
                },
                "actions": [{
                    "name": "编辑",
                    "action": "EDIT"
                }, {
                    "name": "删除",
                    "action": "DELETE"
                }]
            }
        }, {
            "number": "17040547687610",
            "name": "孕期·孕婴辅导",
            "lesson_ways": [
                "ONLINE",
                "STUDENT"
            ],
            "teach_length_hours": 1111,
            "price_range": {
                "max": "21.00",
                "min": "1.00"
            },
            "display_status_teacher": {
                "status": {
                    "state": "VERIFYING",
                    "name": "审核中"
                },
                "actions": [{
                    "name": "编辑",
                    "action": "EDIT"
                }, {
                    "name": "删除",
                    "action": "DELETE"
                }]
            }
        }, {
            "number": "17040547623210",
            "name": "孕期·孕婴辅导",
            "lesson_ways": [
                "ONLINE",
                "STUDENT"
            ],
            "teach_length_hours": 1111,
            "price_range": {
                "max": "21.00",
                "min": "1.00"
            },
            "display_status_teacher": {
                "status": {
                    "state": "VERIFYING",
                    "name": "审核中"
                },
                "actions": [{
                    "name": "编辑",
                    "action": "EDIT"
                }, {
                    "name": "删除",
                    "action": "DELETE"
                }]
            }
        }, {
            "number": "17040547636410",
            "name": "孕期·孕婴辅导",
            "lesson_ways": [
                "ONLINE",
                "STUDENT"
            ],
            "teach_length_hours": 1111,
            "price_range": {
                "max": "21.00",
                "min": "1.00"
            },
            "display_status_teacher": {
                "status": {
                    "state": "VERIFYING",
                    "name": "审核中"
                },
                "actions": [{
                    "name": "编辑",
                    "action": "EDIT"
                }, {
                    "name": "删除",
                    "action": "DELETE"
                }]
            }
        }, {
            "number": "17040547726010",
            "name": "孕期·孕婴辅导",
            "lesson_ways": [
                "ONLINE",
                "STUDENT"
            ],
            "teach_length_hours": 1111,
            "price_range": {
                "max": "21.00",
                "min": "1.00"
            },
            "display_status_teacher": {
                "status": {
                    "state": "VERIFYING",
                    "name": "审核中"
                },
                "actions": [{
                    "name": "编辑",
                    "action": "EDIT"
                }, {
                    "name": "删除",
                    "action": "DELETE"
                }]
            }
        }, {
            "number": "17040547738410",
            "name": "孕期·孕婴辅导",
            "lesson_ways": [
                "ONLINE",
                "STUDENT"
            ],
            "teach_length_hours": 1111,
            "price_range": {
                "max": "21.00",
                "min": "1.00"
            },
            "display_status_teacher": {
                "status": {
                    "state": "VERIFYING",
                    "name": "审核中"
                },
                "actions": [{
                    "name": "编辑",
                    "action": "EDIT"
                }, {
                    "name": "删除",
                    "action": "DELETE"
                }]
            }
        }, {
            "number": "17040554125610",
            "name": "孕期·孕婴辅导",
            "lesson_ways": [
                "ONLINE",
                "STUDENT"
            ],
            "teach_length_hours": 1111,
            "price_range": {
                "max": "21.00",
                "min": "1.00"
            },
            "display_status_teacher": {
                "status": {
                    "state": "VERIFYING",
                    "name": "审核中"
                },
                "actions": [{
                    "name": "编辑",
                    "action": "EDIT"
                }, {
                    "name": "删除",
                    "action": "DELETE"
                }]
            }
        }, {
            "number": "17040554138410",
            "name": "孕期·孕婴辅导",
            "lesson_ways": [
                "STUDENT",
                "TEACHER"
            ],
            "teach_length_hours": 1111,
            "price_range": {
                "max": "21.00",
                "min": "1.00"
            },
            "display_status_teacher": {
                "status": {
                    "state": "VERIFYING",
                    "name": "审核中"
                },
                "actions": [{
                    "name": "编辑",
                    "action": "EDIT"
                }, {
                    "name": "删除",
                    "action": "DELETE"
                }]
            }
        }]
    };

    return data;
};