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
                        id: 22,
                        name: '健身教学',
                        coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                        courseType: 1, // 1:直播 2:录播
                        courseMode: 1, // 1:单次课 2:系列课
                        startTime: 232443,
                        videoLength: 50,
                        liveStatus: 1,
                        planCourseCnt: 10, // 计划课节数
                        currentCourseCnt: 5 // 当前课节数
                    }, 
                    {
                        id: 23,
                        name: '健身教学',
                        coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                        courseType: 1, // 1:直播 2:录播
                        courseMode: 1, // 1:单次课 2:系列课
                        liveStatus: 2,
                        startTime: 232443,
                        videoLength: 50,
                        planCourseCnt: 10, // 计划课节数
                        currentCourseCnt: 5 // 当前课节数
                    }, 
                    {
                        id: 24,
                        name: '健身教学',
                        coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                        courseType: 1, // 1:直播 2:录播
                        courseMode: 1, // 1:单次课 2:系列课
                        startTime: 232443,
                        liveStatus: 3,
                        videoLength: 50,
                        planCourseCnt: 10, // 计划课节数
                        currentCourseCnt: 5 // 当前课节数
                    }, 
                    {
                        id: 25,
                        name: '健身教学',
                        coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                        courseType: 1, // 1:直播 2:录播
                        courseMode: 1, // 1:单次课 2:系列课
                        liveStatus: 4,
                        startTime: 232443,
                        videoLength: 50,
                        planCourseCnt: 10, // 计划课节数
                        currentCourseCnt: 5 // 当前课节数
                    },
                    {
                        id: 26,
                        name: '健身教学',
                        coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                        courseType: 2, // 1:直播 2:录播
                        courseMode: 1, // 1:单次课 2:系列课
                        liveStatus: 4,
                        startTime: 232443,
                        videoLength: 50,
                        planCourseCnt: 10, // 计划课节数
                        currentCourseCnt: 5 // 当前课节数
                    },
                    {
                        id: 27,
                        name: '健身教学',
                        coverUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a588378bed4f.png',
                        courseType: 2, // 1:直播 2:录播
                        courseMode: 2, // 1:单次课 2:系列课
                        liveStatus: 4,
                        startTime: 232443,
                        videoLength: 50,
                        planCourseCnt: 10, // 计划课节数
                        currentCourseCnt: 5 // 当前课节数
                    },
                ]
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
