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
        _data: {"code":0,"msg":"succ","data":{"comments":[{"id":"4531","name":"\u9a6c\u8dc3\uff1a","avatar":"http:\/\/img.gsxservice.com\/129964_vt6es6eo.jpeg","url":"http:\/\/m.genshuixue.com\/x\/709700258","content":"f","create_time":"\u521a\u521a","support":"0","supported":"","can_delete":"0"},{"id":"4530","name":"\u9a6c\u8dc3\uff1a","avatar":"http:\/\/img.gsxservice.com\/129964_vt6es6eo.jpeg","url":"http:\/\/m.genshuixue.com\/x\/709700258","content":"e","create_time":"\u521a\u521a","support":"0","supported":"","can_delete":"0"},{"id":"4529","name":"\u9a6c\u8dc3\uff1a","avatar":"http:\/\/img.gsxservice.com\/129964_vt6es6eo.jpeg","url":"http:\/\/m.genshuixue.com\/x\/709700258","content":"d","create_time":"\u521a\u521a","support":"0","supported":"","can_delete":"0"},{"id":"4528","name":"\u9a6c\u8dc3\uff1a","avatar":"http:\/\/img.gsxservice.com\/129964_vt6es6eo.jpeg","url":"http:\/\/m.genshuixue.com\/x\/709700258","content":"c","create_time":"\u521a\u521a","support":"0","supported":"","can_delete":"0"},{"id":"4527","name":"\u9a6c\u8dc3\uff1a","avatar":"http:\/\/img.gsxservice.com\/129964_vt6es6eo.jpeg","url":"http:\/\/m.genshuixue.com\/x\/709700258","content":"b","create_time":"\u521a\u521a","support":"0","supported":"","can_delete":"0"},{"id":"4526","name":"\u9a6c\u8dc3\uff1a","avatar":"http:\/\/img.gsxservice.com\/129964_vt6es6eo.jpeg","url":"http:\/\/m.genshuixue.com\/x\/709700258","content":"\u554a","create_time":"\u521a\u521a","support":"0","supported":"","can_delete":"0"},{"id":"4525","name":"\u9a6c\u8dc3\uff1a","avatar":"http:\/\/img.gsxservice.com\/129964_vt6es6eo.jpeg","url":"http:\/\/m.genshuixue.com\/x\/709700258","content":"hidgsjwvsigdif","create_time":"\u521a\u521a","support":"0","supported":"","can_delete":"0"},{"id":"4524","name":"\u9a6c\u8dc3\uff1a","avatar":"http:\/\/img.gsxservice.com\/129964_vt6es6eo.jpeg","url":"http:\/\/m.genshuixue.com\/x\/709700258","content":"\u54c8\u54c8","create_time":"\u521a\u521a","support":"0","supported":"","can_delete":"0"}],"has_more":0,"next_cursor":2,"total_comments":18},"ts":1456126842}
    };
};

/* eslint-enable fecs-camelcase */
