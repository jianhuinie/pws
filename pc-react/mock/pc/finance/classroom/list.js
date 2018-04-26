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
                        id: 1,
                        courseName: '一堂课学会谈恋爱都来看看',
                        price: 100.00,
                        payCnt: 3,
                        income: 100.00,
                        netIncome: 1,
                    },
                    {
                        id: 2,
                        courseName: '我的直播课啊视频直播课哦都来看看都来看看',
                        price: 100.00,
                        payCnt: 3,
                        income: 100.00,
                        netIncome: 1,
                    },
                    {
                        id: 3,
                        courseName: '产品经理入门公开课',
                        price: 100.00,
                        payCnt: 3,
                        income: 100.00,
                        netIncome: 1,
                    },
                    {
                        id: 4,
                        courseName: '啊1219哈哈哈哈视频课单卖',
                        price: 100.00,
                        payCnt: 3,
                        income: 100.00,
                        netIncome: 1,
                    },
                    {
                        id: 5,
                        courseName: '音频录播课啊啊啊啊啊啊',
                        price: 100.00,
                        payCnt: 3,
                        income: 100.00,
                        netIncome: 1,
                    }
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
