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
    "msg": "succ",
    "data": [
        {
            "id": "41",
            "remark_name": "幼儿园英语",
            "name": "英语",
            "level": "3"
        },
        {
            "id": "97",
            "remark_name": "幼升小英语",
            "name": "英语",
            "level": "3"
        },
        {
            "id": "125",
            "remark_name": "小学英语",
            "name": "全部",
            "level": "3"
        },
        {
            "id": "126",
            "remark_name": "一年级英语",
            "name": "一年级",
            "level": "3"
        },
        {
            "id": "127",
            "remark_name": "二年级英语",
            "name": "二年级",
            "level": "3"
        },
        {
            "id": "128",
            "remark_name": "三年级英语",
            "name": "三年级",
            "level": "3"
        },
        {
            "id": "129",
            "remark_name": "四年级英语",
            "name": "四年级",
            "level": "3"
        },
        {
            "id": "130",
            "remark_name": "五年级英语",
            "name": "五年级",
            "level": "3"
        },
        {
            "id": "131",
            "remark_name": "六年级英语",
            "name": "六年级",
            "level": "3"
        },
        {
            "id": "146",
            "remark_name": "小升初英语",
            "name": "英语",
            "level": "3"
        }
    ],
    "ts": 1484365450,
    "declare_config": {
        "declareTpl": null
    }
}
    };
};

/* eslint-enable fecs-camelcase */
