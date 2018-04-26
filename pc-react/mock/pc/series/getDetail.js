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
                name: '带你畅游拼读王国超级自然拼读', 
                planCourseCnt: 23,
                storageId: 123,
                coverUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2639088341,2223755776&fm=27&gp=0.jpg',
                sellType: 2,
                price: 199.50, 
                firstId: 1,
                secondId: 2,
                thirdId: 3,
                intros: [
                    {
                        introType: 1,
                        contentType: 1,
                        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2639088341,2223755776&fm=27&gp=0.jpg',
                        content: 23,
                        seq: 1 
                    },
                    {
                        introType: 1,
                        contentType: 2,
                        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2639088341,2223755776&fm=27&gp=0.jpg',
                        content: '专注记录产品经理成长路上的点点滴滴方方面面。 吴金志，产品星球创办人，多年电子商务和在线教育产品经理，图书《京东店铺装修一本通》作者，网课《手把手教你做产品经理》讲师，知乎第20360号用户。',
                        seq: 2
                    },
                ]
            },
            pageDto: null,
            msg: null
        } 
    };
};

/* eslint-enable fecs-camelcase */
