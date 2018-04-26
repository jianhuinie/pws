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
                        bannerId: 1,
                        storageId: 1,
                        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2639088341,2223755776&fm=27&gp=0.jpg',           
                        courseType: 1,
                        courseId: 1,
                        courseName: '周日',
                        seq: 1
                    }, {
                        bannerId: 2,
                        storageId: 2,
                        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=991823527,956610122&fm=27&gp=0.jpg',           
                        courseType: 1,
                        courseId: 1,
                        courseName: '周日',
                        seq: 2
                    }, {
                        bannerId: 3,
                        storageId: 3,
                        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3430625942,2154503364&fm=27&gp=0.jpg',           
                        courseType: 1,
                        courseId: 1,
                        courseName: '周日',
                        seq: 3
                    }
                ]
            },
            pageDto: null,
            msg: null
        }
    };
};

/* eslint-enable fecs-camelcase */
