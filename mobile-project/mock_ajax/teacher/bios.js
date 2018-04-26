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
            "data": {
                "items": [
                    {
                        "title":"asdhjkhdjksah活动就是开发环境开始的回复即可恢复健康书法家客户打飞机客户端发接口",
                        "begin_date": "2014-05-01",
                        "end_date": "2015-05-01",
                        "content": "通过十节课的私人订制，改善了刘同学的圆肩驼背情况！大多数人都或多或少的有一些脊柱方面的不适和形态的不满意，这需要从我们的生活中的一点一滴做起。但是，在生活中大多数人是没有觉知的，而且通常是几十年养成的习惯，想要改变特别难，首先要学会的是在瑜伽的练习中去矫正自己的不良习惯！通过十节的私教课，帮助刘同学用瑜伽的疗愈方法，矫正体型，调理脊柱，身姿挺拔，非常的有气质！并且把瑜伽的习惯融入到生活中去"
                    },
                    {
                        "title":"asdhjkhdjksah活动就是开发环境开始的回复即可恢复健康书法家客户打飞机客户端发接口",
                        "begin_date": "2014-05-01",
                        "end_date": "2015-05-01",
                        "content": "通过十节课的私人订制，改善了刘同学的圆肩驼背情况！大多数人都或多或少的有一些脊柱方面的不适和形态的不满意，这需要从我们的生活中的一点一滴做起。但是，在生活中大多数人是没有觉知的，而且通常是几十年养成的习惯，想要改变特别难，首先要学会的是在瑜伽的练习中去矫正自己的不良习惯！通过十节的私教课，帮助刘同学用瑜伽的疗愈方法，矫正体型，调理脊柱，身姿挺拔，非常的有气质！并且把瑜伽的习惯融入到生活中去"
                    }
                ],
                "pager": {
                    "has_more": true,
                    "next_page": 2,
                    "current_page": 1,
                    "total": 0
                }
            },
            "render": null
        }
    };
};

/* eslint-enable fecs-camelcase */
