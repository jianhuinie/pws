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
                detail: {
                    courseIntro: [
                        {
                            content: 'https://imgs.genshuixue.com/47341023_wl90v9gx.jpeg',
                            contentType: 1 // 内容类型 1:图片,2:文字
                        },
                        {
                            content: '课程是指学校学生所应学习的学科总和及其进程与安排。课程是对教育的目标、教学内容、教学活动方式的规划和设计，是教学计划、教学大纲等诸多方面实施过程的总和。广义的课程是指学校为实现培养目标而选择的教育内容及其进程的总和，它包括学校老师所教授的各门学科和有目的、有计划的教育活动。狭义的课程是指某一门学科。',
                            contentType: 2 // 内容类型 1:图片,2:文字
                        },
                    ],
                    teacherIntro: [
                        {
                            content: 'https://imgs.genshuixue.com/47341028_xvlf5flw.jpeg',
                            contentType: 1 // 内容类型 1:图片,2:文字
                        },
                        {
                            content: '教学生知识的人，泛指在某方面值得学习的人。我们平时虽然称呼学校里某教师为“某老师”，但这里的“老师”其实是教师这种工作，教书是其基本功能。明清以来，一般称教师为“先生”。直至19世纪末，辛亥革命元老中国现代教育奠基人何子渊等将西学（美式教育）引入中国，创办新式学校后，便开始在《学生操行规范》里面明确将教师称谓定义为“老师”。但绝大部分学生约定俗成将“先生”改称为“老师”，则是从国民政府时代开始，并一直沿用至今。老师，是传授知识的人。',
                            contentType: 2 // 内容类型 1:图片,2:文字
                        },
                    ],
                    suitablePeople: [
                        {
                            content: 'https://imgs.genshuixue.com/47341025_b2t57vwm.jpeg',
                            contentType: 1 // 内容类型 1:图片,2:文字
                        },
                    ],
                    willGet: [
                        {
                            content: 'https://imgs.genshuixue.com/47249184_g2iqr446.jpeg',
                            contentType: 1 // 内容类型 1:图片,2:文字
                        },
                    ],
                },
            },
            pageDto: null,
            msg: null
        }
    };
};

/* eslint-enable fecs-camelcase */
