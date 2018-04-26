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
            "code":0,
            "message":"succ",
            "data": {
                "purchase_money": "3000.00",
                "fenqi_detail": [
                    {
                        "total_fee": "21.00",
                        "fenqi_total_money": 3021,
                        "fenqi_need_all_money": "3090.48",
                        "fenqi_need_all_rate_fee": "69.48",
                        "every_periods_repayment": "1030.16",
                        "detail": [],
                        "periods": 12,
                        "every_period_fee": "23.16"
                    },
                    {
                        "total_fee": "30.00",
                        "fenqi_total_money": 3030,
                        "fenqi_need_all_money": "3166.35",
                        "fenqi_need_all_rate_fee": "136.35",
                        "every_periods_repayment": "527.73",
                        "detail": [],
                        "periods": 6,
                        "every_period_fee": "22.72"
                    },
                    {
                        "total_fee": "21.00",
                        "fenqi_total_money": 3021,
                        "fenqi_need_all_money": "3090.48",
                        "fenqi_need_all_rate_fee": "69.48",
                        "every_periods_repayment": "1030.16",
                        "detail": [],
                        "periods": 3,
                        "every_period_fee": "23.16"
                    }
                ]
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
