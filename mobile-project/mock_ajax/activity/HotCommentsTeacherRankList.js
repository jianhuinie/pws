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
        _data:{
            "code": 0,
            "msg": "succ",
            "data": {
                "if_login": "true",
                "teacher_info": {
                    "home_url": "http://m.genshuixue.com/chaochang",
                    "avatar_url": "https://img.genshuixue.com/23520494_5d6kwxyz.jpeg",
                    "display_name": "孔仲尼",
                    "comment_no": 1953,
                    "comment_link": "http://beta-m.genshuixue.com/chaochang?tab=comment",
                    "if_on_list": true,
                    "vip_level": true,
                    "rank": 1
                },
                "teacher_list": [
                    {
                        "home_url": "http://m.genshuixue.com/chaochang",
                        "avatar_url": "https://img.genshuixue.com/23520494_5d6kwxyz.jpeg",
                        "display_name": "孔仲尼",
                        "subject_name": "高中数学",
                        "comment_no": 1953,
                        "rank": 1953,
                        "vip_level": 1,
                        "comment_link": "http://beta-m.genshuixue.com/chaochang?tab=comment",
                        "student_name": "王陆风",
                        "comment_content": "反正我觉得学奥数把孩子的思维打开了，这学期学校的数学我就没有操过任何心，期中考98分，有两个同学100，99分的没有，排下来就是她了，所以我非常感谢沈老师的教学",
                        "comment_time": "2106.11.23"
                    },
                    {
                        "home_url": "http://m.genshuixue.com/chaochang",
                        "avatar_url": "https://img.genshuixue.com/23520494_5d6kwxyz.jpeg",
                        "display_name": "孔仲尼",
                        "subject_name": "高中数学",
                        "comment_no": 1953,
                        "rank": 1953,
                        "vip_level": 1,
                        "comment_link": "http://beta-m.genshuixue.com/chaochang?tab=comment",
                        "student_name": "王陆风",
                        "comment_content": "反正我觉得学奥数把孩子的思维打开了，这学期学校的数学我就没有操过任何心，期中考98分，有两个同学100，99分的没有，排下来就是她了，所以我非常感谢沈老师的教学",
                        "comment_time": "2106.11.23"
                    },
                    {
                        "teacher_link": "http://m.genshuixue.com/chaochang",
                        "avatar_url": "https://img.genshuixue.com/23520494_5d6kwxyz.jpeg",
                        "display_name": "孔仲尼",
                        "subject_name": "高中数学",
                        "comment_no": 1953,
                        "rank": 1953,
                        "vip_level": 1,
                        "comment_link": "http://beta-m.genshuixue.com/chaochang?tab=comment",
                        "student_name": "王陆风",
                        "comment_content": "反正我觉得学奥数把孩子的思维打开了，这学期学校的数学我就没有操过任何心，期中考98分，有两个同学100，99分的没有，排下来就是她了，所以我非常感谢沈老师的教学",
                        "comment_time": "2106.11.23"
                    },
                    {
                        "teacher_link": "http://m.genshuixue.com/chaochang",
                        "avatar_url": "https://img.genshuixue.com/23520494_5d6kwxyz.jpeg",
                        "display_name": "孔仲尼",
                        "subject_name": "高中数学",
                        "comment_no": 1953,
                        "rank": 1953,
                        "vip_level": 1,
                        "comment_link": "http://beta-m.genshuixue.com/chaochang?tab=comment",
                        "student_name": "王陆风",
                        "comment_content": "反正我觉得学奥数把孩子的思维打开了，这学期学校的数学我就没有操过任何心，期中考98分，有两个同学100，99分的没有，排下来就是她了，所以我非常感谢沈老师的教学",
                        "comment_time": "2106.11.23"
                    }
                ],
                "pager": {
                    "has_more": true,
                    "next_page": 2,
                    "current_page": 1,
                    "total": 6
                }
            },
            "ts": 1480302247,
            "declare_config": {
                "declareTpl": "v2/resources/page/hotComment/list/index"
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
