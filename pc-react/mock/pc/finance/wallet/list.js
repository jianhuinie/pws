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
            code: 200,
            data: {
                details: [
                    {
                        purchaseId: 1,
                        type: 1,
                        price: 100.00,
                        remark: '付费课程(2016-12-18 吴金志 产品经理的修炼之道)',
                        time: 1334312342443,
                    },
                    {
                        purchaseId: 2,
                        type: 4,
                        price: 100.00,
                        remark: '付费课程(2016-12-18 吴金志 产品经理的修炼之道)',
                        time: 13343233243,
                    },
                    {
                        purchaseId: 3,
                        type: 1,
                        price: 100.00,
                        remark: '付费课程(2016-12-18 吴金志 产品经理的修炼之道)',
                        time: 13343234273,
                    },
                    {
                        purchaseId: 4,
                        type: 2,
                        price: 100.00,
                        remark: '付费课程(2016-12-18 吴金志 产品经理的修炼之道)',
                        time: 13343234283,
                    },
                    {
                        purchaseId: 5,
                        type: 3,
                        price: 100.00,
                        remark: '付费课程(2016-12-18 吴金志 产品经理的修炼之道)',
                        time: 1334323424,
                    },
                ]
            },
            pageDto: {
                count: 25,
                pageNum: 1,
                pageSize: 10
            },
            msg: null
        }
    };
};

/* eslint-enable fecs-camelcase */
