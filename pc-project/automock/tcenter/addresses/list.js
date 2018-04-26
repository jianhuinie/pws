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

        _data: {
            code: 0,
            data: [
                {
                    "id": 41478,
                    "location_addr": "sssssssssssss"
                },
                {
                    "id": 41477,
                    "location_addr": "sssssssssssss"
                },
                {
                    "id": 41476,
                    "location_addr": "ss摄影工作室(知春路店)"
                },
                {
                    "id": 41475,
                    "location_addr": "ss摄影工作室(知春路店)"
                },
                {
                    "id": 41474,
                    "location_addr": "北京市西城区人民法院22222"
                },
                {
                    "id": 41473,
                    "location_addr": "北京市海淀区软件园西二路"
                },
                {
                    "id": 40992,
                    "location_addr": "北京市海淀区软件园西二路"
                },
                {
                    "id": 37907,
                    "location_addr": "陕西省西安市莲湖区团结东路3号"
                }
            ],
            msg: "succ",
            ts: 2121212121
        }
    };
};

/* eslint-enable fecs-camelcase */
