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
                orders: [
                    {
                        orderId: 1,
                        nickName: '金志', 
                        url: 'http://img1.imgtn.bdimg.com/it/u=1181923485,552621268&fm=27&gp=0.jpg', 
                        courseName: '微师精选微师精选微师精选微师精选微师精选',
                        courseType: 1,
                        price: 100.00,
                        income: 100.00,
                        payTime: 1334312342443,
                    },
                    {   
                        orderId: 2,
                        nickName: '一只会说话的猫', 
                        url: 'http://img1.imgtn.bdimg.com/it/u=1181923485,552621268&fm=27&gp=0.jpg', 
                        courseName: '微师精选微师精选微师精选微师精选微师精选',
                        courseType: 1,
                        price: 100.00,
                        income: 100.00,
                        payTime: 13343233243,
                    },
                    {
                        orderId: 3,
                        nickName: '一只会说话的猫 ', 
                        url: 'http://img1.imgtn.bdimg.com/it/u=1181923485,552621268&fm=27&gp=0.jpg', 
                        courseName: '微师精选',
                        courseType: 1,
                        price: 100.00,
                        income: 100.00,
                        payTime: 13343234273,
                    },
                    {
                        orderId: 4,
                        nickName: '一只会说话的猫 ', 
                        url: 'http://img1.imgtn.bdimg.com/it/u=1181923485,552621268&fm=27&gp=0.jpg', 
                        courseName: '微师精选',
                        courseType: 2,
                        price: 100.00,
                        income: 100.00,
                        payTime: 13343234283,
                    },
                    {
                        orderId: 5,
                        nickName: '金志哥', 
                        url: 'http://img1.imgtn.bdimg.com/it/u=1181923485,552621268&fm=27&gp=0.jpg', 
                        courseName: '微师精选',
                        courseType: 3,
                        price: 100.00,
                        income: 100.00,
                        payTime: 1334323424,
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