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
module.exports = function(path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
            "code": 0,
            "msg": "succ",
            "data": {
                "title": "少儿艺体",
                "catnames": [{
                    "catid": "all",
                    "catname": "全部"
                }, {
                    "catid": "1090",
                    "catname": "绘画"
                }, {
                    "catid": "1091",
                    "catname": "乐器"
                }, {
                    "catid": "1092",
                    "catname": "舞蹈"
                }, {
                    "catid": "1093",
                    "catname": "绘画"
                }, {
                    "catid": "1094",
                    "catname": "乐器"
                }, {
                    "catid": "1095",
                    "catname": "舞蹈"
                }],
                "courses": [{
                "catid": "3780",
                "course_name": "赏析三步曲——10分钟提升艺术格调",
                "listorder": "0",
                "inputtime": "1470808125",
                "course_number": "16071277085",
                "price": "1.99",
                "cover_url": "http://img.gsxservice.com/15394211_gx480dnm.jpeg",
                "student_count": 0,
                "course_url": "http://beta-m.genshuixue.com/video_course/getcourseshowdetail?number=16071277085",
                "course_time": "23ri shidian",
                "distance": 0,
                "course_type": "video",
                "course_items_count": "1",
                "type": "3"
            },
            {
                "catid": "3782",
                "course_name": "《欧阳询九成宫醴泉铭》书写技法",
                "listorder": "0",
                "inputtime": "1470476800",
                "course_number": "16051154248 ",
                "price": "0",
                "cover_url": "http://img.gsxservice.com/12377686_pod0407r.jpeg",
                "student_count": "1068",
                "course_url": "http://beta-m.genshuixue.com/video_course/getcourseshowdetail?number=16051154248",
                "course_time": "",
                "distance": 0,
                "course_type": "video",
                "course_items_count": "8",
                "type": "3"
            },
            {
                "catid": "3781",
                "course_name": "不一样的声乐课",
                "listorder": "0",
                "inputtime": "1470476751",
                "course_number": "16012373399 ",
                "price": "20",
                "cover_url": "http://img.gsxservice.com/0cms/d/file/content/2016/08/57a9523dc128d.jpg",
                "student_count": 223,
                "course_url": "http://beta-m.genshuixue.com/video_course/getcourseshowdetail?number=16012373399",
                "course_time": "",
                "distance": 0,
                "course_type": "video",
                "course_items_count": "2",
                "type": "3"
            },
            {
                "catid": "3780",
                "course_name": "漫画基本画法，让孩子记录眼中的可爱",
                "listorder": "0",
                "inputtime": "1470476697",
                "course_number": "16021774445 ",
                "price": "10",
                "cover_url": "http://img.gsxservice.com/6850126_x3on6zyh.jpeg",
                "student_count": 307,
                "course_url": "http://beta-m.genshuixue.com/video_course/getcourseshowdetail?number=16021774445",
                "course_time": "23:00开始",
                "distance": 0,
                "course_type": "online",
                "course_items_count": "1",
                "type": "3"
            }],
                "page": {
                    "curr_page": 1,
                    "has_more": false
                },
                "lbs": {
                    "province": "北京",
                    "city": "北京",
                    "coord": {
                        "lng": 116.39564503788,
                        "lat": 39.92998577808
                    }
                },
                "selected": {
                    "id": 0,
                    "course_type": "online"
                }
            },
            "ts": 1469425920,
            "declare_config": {
                "declareTpl": ""
            }
        }
    };
};

/* eslint-enable fecs-camelcase */