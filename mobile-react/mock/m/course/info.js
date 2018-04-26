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
                course: {
                    id: 111,
                    name: '万法归宗之揭开语法速成的奥秘',
                    coverUrl: 'http://img.gsxservice.com/47252111_idvcskin.jpeg',
                    courseMode: 1, // 1:单次课 2:系列课
                    courseType: 1, // 1:直播 2:录播
                    classroomId: 2222,
                    videoLength: 30, // 单位秒
                    startTime: 333,
                    price: 10.00,
                    learnCnt: 145673,
                    seriesCourseId: 11, // 课程所属系列课的id
                    seriesCourseName: '', // 课程所属系列课的name
                    currentCourseCnt: 10,
                    planCourseCnt: 100,
                    haveFollow: false,
                    havePermission: false,
                    canSellAlone: true,
                    // canSignIn: true,
                    liveStatus: 2,
                    seriesCourse: {
                        id: 111,
                        name: '徐老师健身操系列课',
                        coverUrl: 'http://img2.imgtn.bdimg.com/it/u=172130777,262937889&fm=27&gp=0.jpg',
                        planCourseCnt: 10,
                        hasCourseCnt: 5,
                        courseMode: 2,
                        price: 100.00,
                    },
                },
                classroom: {
                    authStatus: 2, // 0:待认证，1:待审核， 2:认证通过 3:认证失败
                    classId: 357,
                    followNum: 10000,
                    headUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1888965134,2344868007&fm=27&gp=0.jpg',
                    isFollow: false,
                    isNeedGuide: true,
                    isSelfClass: false,
                    name: '高圆圆',
                    userId: 123
                },
            },
            pageDto: null,
            msg: null
        }
    };
};

/* eslint-enable fecs-camelcase */
