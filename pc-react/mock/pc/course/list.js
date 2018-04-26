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
                courses: [
                    {
                        courseId: 11,       
                        coverUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=991823527,956610122&fm=27&gp=0.jpg',
                        name: '如何让孩子超越期待成为满分阅读达人读达人',
                        courseType: 1,
                        liveStatus: 1, 
                        price: 199,
                        beginTime: 13343234243,
                        courseUrl: '',
                        videoStatus: 1,
                        seq: 1,
                        publishStatus: 0,
                    },
                    {
                        courseId: 12,       
                        coverUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=991823527,956610122&fm=27&gp=0.jpg',
                        name: '如何让孩子超越期待成为满分阅读达人读达人',
                        courseType: 1,
                        liveStatus: 1, 
                        price: 199,
                        beginTime: 13343234243,
                        courseUrl: '',
                        videoStatus: 1,
                        seq: 100,
                        publishStatus: 1,
                    },
                    {
                        courseId: 13,       
                        coverUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=991823527,956610122&fm=27&gp=0.jpg',
                        name: '如何让孩子超越期待成为满分阅读达人读达人',
                        courseType: 2,
                        liveStatus: 1, 
                        price: 199,
                        beginTime: 13343234243,
                        courseUrl: '',
                        videoStatus: -1,
                        seq: 100,
                        publishStatus: 0,
                    },
                    {
                        courseId: 14,       
                        coverUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=991823527,956610122&fm=27&gp=0.jpg',
                        name: '如何让孩子超越期待成为满分阅读达人',
                        courseType: 2,
                        liveStatus: 2, 
                        price: 199,
                        beginTime: 13343234243,
                        courseUrl: '',
                        videoStatus: -1,
                        seq: 100,
                        publishStatus: 1,
                    },
                    {
                        courseId: 15,       
                        coverUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=991823527,956610122&fm=27&gp=0.jpg',
                        name: '如何让孩子超越期待成为满分阅读达人读达人',
                        courseType: 2,
                        liveStatus: 3, 
                        price: 199,
                        beginTime: 13343234243,
                        courseUrl: '',
                        videoStatus: -1,
                        seq: 100,
                        publishStatus: 0,
                    }
                ]
            },
            pageDto: {
                count: 100,
                pageNum: 1,
                pageSize: 10
            },
            msg: null
        }
    };
};

/* eslint-enable fecs-camelcase */
