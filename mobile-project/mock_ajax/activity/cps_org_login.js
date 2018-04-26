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
        _timeout: 1000,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {"code":0,"data":{"status":1,"start_time":"2016-05-14","end_time":"2017-05-13","display_name":"zhangsan","id_number":"","sign_name":"zhangsan","rate_info":{"rate_type":"2","rate_detail":[{"course_type":"直播班课","rate":"20%"},{"course_type":"录播课程","rate":"30%"},{"course_type":"线下课程","rate":"20%"},{"course_type":"线上线下1对1课程","rate":"15%"}]}}}
    };
};

/* eslint-enable fecs-camelcase */