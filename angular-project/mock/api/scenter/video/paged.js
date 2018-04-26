/**
 * @file 学生直播助手我的视频课接口 /api/scenter/video/paged
 * @author niejianhui
 * @date 2017/11/28
 */
var mockCreatFunction = function () {
    'use strict';

    var data = {
        code: 0,
        message: '请求成功',
        error: null
    };

    data.data = {
        "items": [
            {
                "cover": "https://test-imgs.genshuixue.com/1004036_nxml3nrh.png",
                "name": "邓紫棋~~~喜欢你",
                "number": "17101266423",
                "teacher_name": "AA",
                "item_count": 1,
                "list_url": "http://test-b.genshuixue.com/api/scenter/video/items?course_number=17101266423",
                "play_url": "http://www.genshuixue.com/video_course/play?course_number=17101266423&section_id=17101244985"
            },
            {
                "cover": "https://test-imgs.genshuixue.com/1003285_a8ffbj58.png",
                "name": "测试视频课呀11111111111111",
                "number": "17101058287",
                "teacher_name": "AA",
                "item_count": 2,
                "list_url": "http://test-b.genshuixue.com/api/scenter/video/items?course_number=17101058287",
                "play_url": "http://www.genshuixue.com/video_course/play?course_number=17101058287&section_id=17101044721"
            },
            {
                "cover": "https://test-imgs.genshuixue.com/997063_hr9e3zvk.jpeg",
                "name": "免费的",
                "number": "17092158339",
                "teacher_name": "kwnna",
                "item_count": 1,
                "list_url": "http://test-b.genshuixue.com/api/scenter/video/items?course_number=17092158339",
                "play_url": "http://www.genshuixue.com/video_course/play?course_number=17092158339&section_id=17092182710"
            },
            {
                "cover": "http://test-img.gsxservice.com/817138_05wa9loz.jpeg",
                "name": "免费视频课支付测试",
                "number": "16121497969",
                "teacher_name": "王倩倩",
                "item_count": 2,
                "list_url": "http://test-b.genshuixue.com/api/scenter/video/items?course_number=16121497969",
                "play_url": "http://www.genshuixue.com/video_course/play?course_number=16121497969&section_id=16121482860"
            },
            {
                "cover": "https://test-imgs.genshuixue.com/988051_yj7vbi07.jpeg",
                "name": "精品课视频课加入微信群",
                "number": "17091158411",
                "teacher_name": "王倩倩",
                "item_count": 1,
                "list_url": "http://test-b.genshuixue.com/api/scenter/video/items?course_number=17091158411",
                "play_url": "http://www.genshuixue.com/video_course/play?course_number=17091158411&section_id=17091182638"
            },
        ],
        "pager": {
            "has_more": true,
            "next_page": 2,
            "current_page": 1,
            "page_size": 10,
            "total": 20
        }
    };

    return data;
};