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
                courses: [{
                    id: 23,
                    name: '健身教学1',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 2, // 1:直播 2:录播
                    courseMode: 2, // 1:单次课 2:系列课
                    lastLearnTime: 1516244871867,
                    learnRate: 10
                }, {
                    id: 24,
                    name: '健身教学2',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 2, // 1:直播 2:录播
                    courseMode: 1, // 1:单次课 2:系列课
                    lastLearnTime: 1516244871867,
                    learnRate: 100
                }, {
                    id: 25,
                    name: '健身教学3',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 1, // 1:直播 2:录播
                    courseMode: 1, // 1:单次课 2:系列课
                    liveStatus: 1,
                    lastLearnTime: 1516244871867,
                    learnRate: 0
                }, {
                    id: 26,
                    name: '健身教学4',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 1, // 1:直播 2:录播
                    courseMode: 1, // 1:单次课 2:系列课
                    liveStatus: 2,
                    lastLearnTime: 1516244871867,
                    learnRate: 10
                }, {
                    id: 27,
                    name: '健身教学5',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 1, // 1:直播 2:录播
                    courseMode: 1, // 1:单次课 2:系列课
                    liveStatus: 3,
                    lastLearnTime: 1516244871867,
                    learnRate: 10
                }, {
                    id: 28,
                    name: '健身教学6',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 1, // 1:直播 2:录播
                    courseMode: 1, // 1:单次课 2:系列课
                    liveStatus: 4,
                    lastLearnTime: 1516244871867,
                    learnRate: 100
                }, {
                    id: 29,
                    name: '健身教学7',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 2, // 1:直播 2:录播
                    courseMode: 2, // 1:单次课 2:系列课
                    lastLearnTime: 1516244871867,
                    learnRate: 0
                }, {
                    id: 30,
                    name: '健身教学8',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 2, // 1:直播 2:录播
                    courseMode: 1, // 1:单次课 2:系列课
                    lastLearnTime: 1516244871867,
                    learnRate: 10
                }, {
                    id: 231,
                    name: '健身教学9',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 1, // 1:直播 2:录播
                    courseMode: 2, // 1:单次课 2:系列课
                    lastLearnTime: 1516244871867,
                    learnRate: 10
                }, {
                    id: 242,
                    name: '健身教学10',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 1, // 1:直播 2:录播
                    courseMode: 1, // 1:单次课 2:系列课
                    lastLearnTime: 1516244871867,
                    learnRate: 100
                }, {
                    id: 253,
                    name: '健身教学11',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 2, // 1:直播 2:录播
                    courseMode: 2, // 1:单次课 2:系列课
                    lastLearnTime: 1516244871867,
                    learnRate: 0
                }, {
                    id: 264,
                    name: '健身教学12',
                    coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                    courseType: 2, // 1:直播 2:录播
                    courseMode: 1, // 1:单次课 2:系列课
                    lastLearnTime: 1516244871867,
                    learnRate: 10
                }]
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
