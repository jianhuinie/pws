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
                "video_list": [{
                    "index": 0,
                    "type": "video",
                    "name": "888888888888888888888888888888888888888888",
                    "img": "http://test-img.gsxservice.com/00-upload/image-test/107165_8ae82090ba626ed8009137ca5e7f24d0_Vn8GB8kk.jpg",
                    "url": "https://xiaofeng-m.test.genshuixue.com/video/view/16306",
                    "create_time": "2016-11-23 20:13:06"
                }],
                "has_more": 0,
                "next_cursor": 2,
                "total_number": 5,
                "lbs": {
                    "province": "北京",
                    "city": "北京",
                    "coord": {
                        "lng": 116.39564503788,
                        "lat": 39.92998577808
                    }
                }
            },
            "ts": 1480578810,
            "declare_config": {
                "declareTpl": ""
            }
        }
    };
};

/* eslint-enable fecs-camelcase */