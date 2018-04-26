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
            code: 0,
            data: [
                {
                    "id": "50594816",
                    "name": "阿斯顿发打发地方",
                    "level": "3",
                    "bid": "1582",
                    "bname": "鼓楼区",
                    "tid": "350102"
                },
                {
                    "id": "50607104",
                    "name": "平潭县",
                    "level": "3",
                    "bid": "1983",
                    "bname": "平潭县",
                    "tid": "350128"
                },
                {
                    "id": "50606080",
                    "name": "永泰县",
                    "level": "3",
                    "bid": "1579",
                    "bname": "永泰县",
                    "tid": "350125"
                },
                {
                    "id": "50605056",
                    "name": "闽清县",
                    "level": "3",
                    "bid": "2610",
                    "bname": "闽清县",
                    "tid": "350124"
                },
                {
                    "id": "50604032",
                    "name": "罗源县",
                    "level": "3",
                    "bid": "2315",
                    "bname": "罗源县",
                    "tid": "350123"
                },
                {
                    "id": "50603008",
                    "name": "连江县",
                    "level": "3",
                    "bid": "1135",
                    "bname": "连江县",
                    "tid": "350122"
                },
                {
                    "id": "50601984",
                    "name": "闽侯县",
                    "level": "3",
                    "bid": "1980",
                    "bname": "闽侯县",
                    "tid": "350121"
                },
                {
                    "id": "50600960",
                    "name": "长乐市",
                    "level": "3",
                    "bid": "1568",
                    "bname": "长乐市",
                    "tid": "350182"
                },
                {
                    "id": "50599936",
                    "name": "福清市",
                    "level": "3",
                    "bid": "2317",
                    "bname": "福清市",
                    "tid": "350181"
                },
                {
                    "id": "50598912",
                    "name": "晋安区",
                    "level": "3",
                    "bid": "2804",
                    "bname": "晋安区",
                    "tid": "350111"
                },
                {
                    "id": "50597888",
                    "name": "马尾区",
                    "level": "3",
                    "bid": "2611",
                    "bname": "马尾区",
                    "tid": "350105"
                },
                {
                    "id": "50596864",
                    "name": "仓山区",
                    "level": "3",
                    "bid": "2316",
                    "bname": "仓山区",
                    "tid": "350104"
                },
                {
                    "id": "50595840",
                    "name": "台江区",
                    "level": "3",
                    "bid": "2612",
                    "bname": "台江区",
                    "tid": "350103"
                },
                {
                    "id": "50608128",
                    "name": "市辖区",
                    "level": "3",
                    "bid": null,
                    "bname": "市辖区",
                    "tid": "350101"
                }
            ]
        }
    };
};

/* eslint-enable fecs-camelcase */
