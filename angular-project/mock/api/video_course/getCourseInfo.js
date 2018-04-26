/**
 * @file 获取视频课信息
 * niuxiaojing
 */
var mockCreatFunction = function (params) {
    'use strict';
    var result = {
        code: 0,
        pageDto: null,
        error: null,
        data: {
            "number": 16110595235 ,
            "title": "课程标题",
            "subject_id": "921,944,946,体育,武术,散打",
            "price": 12, //课程价格
            "hours": 2, //课时数
            "language": 2, // 授课语言(0: 未知 1: 中文_普通话 2: 中文_方言 3: 英语 4: 日语 5: 法语 6: 韩语 7: 德语 8: 西班牙语 9: 俄语 10: 意大利语 11: 葡萄牙语)
            "teacher_uids": "123,45,6", // 老师id, 逗号隔开
            "teacher_names": "老师姓名,逗号隔开",
            "group_id": 123, //课程分组id
            "group_name": "分组名称",
            "defined_number": 'x123',  //机构课程编码
            "expire_time": 12,  //观看期限（天）
            "portrait": "http://img.genshuixue.com/123.jpg",  // 封面
            "introduce": "课程简介（200字上限）",
            "label_ids": "课程标签,逗号隔开",
            "brief": "<p>aaa</p>",
        }
    };

    return result;
};
