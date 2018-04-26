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
                banners: [
                    {  
                        coverUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=360178135,1258144942&fm=27&gp=0.jpg',
                        clickUrl: 'http://www.genshuixue.com/',
                        id: 1,
                    },
                    {  
                        coverUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3594391332,3884963707&fm=27&gp=0.jpg',
                        clickUrl: 'https://www.baidu.com/',
                        id: 2,
                    },
                    {  
                        coverUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=875613622,2281271767&fm=27&gp=0.jpg',
                        clickUrl: 'http://www.163.com/',
                        id: 3,
                    },
                ], 
            },
            pageDto: null,
            msg: null
        }
    };
};

/* eslint-enable fecs-camelcase */
