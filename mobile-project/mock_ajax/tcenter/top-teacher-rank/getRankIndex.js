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
    "message": "名师排行获取成功",
    "data": {
        "teacher": {
            "name": "舒柏乔",
            "avatar": "https://img.genshuixue.com/21572727_fzgahyft.jpeg",
            "url": "http://beta-m.genshuixue.com/643568438",
            "subject_name": "考研考研英语",
            "city": "重庆",
            "rank_change": 0,
            "student_count": "0",
            "rank": null
        },
        "items": [
            {
                "name": "李大川",
                "avatar": "https://test-imgs.genshuixue.com/2949_q88zuzwo.png",
                "url": "http://test-m.genshuixue.com/623191218",
                "subject_name": "托福",
                "city": "沈阳",
                "rank_change": 0,
                "student_count": "1728",
                "rank": 1
            },
            {
                "name": "海查",
                "avatar": "https://test-imgs.genshuixue.com/400380_m399rihd.jpeg",
                "url": "http://test-m.genshuixue.com/874933558",
                "subject_name": "一年级语文",
                "city": "哈尔滨",
                "rank_change": 0,
                "student_count": "517",
                "rank": 2
            },
            {
                "name": "肖宝清",
                "avatar": "https://test-imgs.genshuixue.com/179140_uvz3fxv3.jpeg",
                "url": "http://test-m.genshuixue.com/751127558",
                "subject_name": "初二数学",
                "city": "武汉",
                "rank_change": 1,
                "student_count": "436",
                "rank": 3
            },
            {
                "name": "胡志军",
                "avatar": "https://test-imgs.genshuixue.com/527560_eazb9v58.jpg",
                "url": "http://test-m.genshuixue.com/332271448",
                "subject_name": "口语",
                "city": "武汉",
                "rank_change": 1,
                "student_count": "356",
                "rank": 4
            },
            {
                "name": "小啊去说",
                "avatar": "https://test-imgs.genshuixue.com/782476_h7582alk.jpeg",
                "url": "http://test-m.genshuixue.com/835670598",
                "subject_name": "卫生资格",
                "city": "法国",
                "rank_change": 1,
                "student_count": "118",
                "rank": 5
            },
            {
                "name": "钟源的账号曾经小源源学生的账号问题显示问题的最大个数展现的问题验证测试是否显示都正确",
                "avatar": "https://imgs.genshuixue.com/headpic_woman_07.jpg",
                "url": "http://test-m.genshuixue.com/835509318",
                "subject_name": "钢琴",
                "city": "山南",
                "rank_change": 1,
                "student_count": "99",
                "rank": 6
            },
            {
                "name": "家里蹲",
                "avatar": "https://imgs.genshuixue.com/headpic_man_06.jpg",
                "url": "http://test-m.genshuixue.com/876816198",
                "subject_name": "空手道",
                "city": "北京",
                "rank_change": 1,
                "student_count": "78",
                "rank": 7
            },
            {
                "name": "小啦老师",
                "avatar": "https://test-imgs.genshuixue.com/11377_du8y6nb1.jpeg",
                "url": "http://test-m.genshuixue.com/329098418",
                "subject_name": "求职面试",
                "city": "北京",
                "rank_change": 1,
                "student_count": "69",
                "rank": 8
            },
            {
                "name": "果果",
                "avatar": "https://test-imgs.genshuixue.com/771580_37jt21jh.jpeg",
                "url": "http://test-m.genshuixue.com/415521948",
                "subject_name": "3Dmax",
                "city": "北京",
                "rank_change": 1,
                "student_count": "68",
                "rank": 9
            },
            {
                "name": "宋建敏",
                "avatar": "https://test-imgs.genshuixue.com/396791_piiwjex6.jpeg",
                "url": "http://test-m.genshuixue.com/413044428",
                "subject_name": "周易",
                "city": "北京",
                "rank_change": 1,
                "student_count": "61",
                "rank": 10
            },
            {
                "name": "我是高级",
                "avatar": "https://test-imgs.genshuixue.com/785335_93xy59ap.jpeg",
                "url": "http://test-m.genshuixue.com/457528268",
                "subject_name": "缝纫",
                "city": "北京",
                "rank_change": 1,
                "student_count": "55",
                "rank": 11
            },
            {
                "name": "赵嘉淇",
                "avatar": "https://test-imgs.genshuixue.com/743530_rlkswy7x.jpeg",
                "url": "http://test-m.genshuixue.com/582751248",
                "subject_name": "原生态",
                "city": "北京",
                "rank_change": 1,
                "student_count": "47",
                "rank": 12
            },
            {
                "name": "小文的昵称很长很长很长很长很长很长很长很长很长很长很长",
                "avatar": "https://test-imgs.genshuixue.com/421309_v4w91yrf.jpeg",
                "url": "http://test-m.genshuixue.com/455011468",
                "subject_name": "钢琴",
                "city": "北京",
                "rank_change": 1,
                "student_count": "44",
                "rank": 13
            },
            {
                "name": "曹炜",
                "avatar": "https://test-imgs.genshuixue.com/6753_y6twkppg.jpeg",
                "url": "http://test-m.genshuixue.com/371509928",
                "subject_name": "初二数学",
                "city": "北京",
                "rank_change": 1,
                "student_count": "40",
                "rank": 14
            },
            {
                "name": "D被邀请",
                "avatar": "https://test-imgs.genshuixue.com/418904_22ak3h20.jpeg",
                "url": "http://test-m.genshuixue.com/415504028",
                "subject_name": "设计工具软件",
                "city": "北京",
                "rank_change": 1,
                "student_count": "39",
                "rank": 15
            },
            {
                "name": "刘淑军",
                "avatar": "https://test-imgs.genshuixue.com/12134_3x0ugto1.mp3",
                "url": "http://test-m.genshuixue.com/371755688",
                "subject_name": "高考语文",
                "city": "北京",
                "rank_change": 1,
                "student_count": "37",
                "rank": 16
            },
            {
                "name": "梁金宇",
                "avatar": "https://imgs.genshuixue.com/headpic_woman.png",
                "url": "http://test-m.genshuixue.com/877449798",
                "subject_name": "古筝",
                "city": "安庆",
                "rank_change": 1,
                "student_count": "36",
                "rank": 17
            },
            {
                "name": "cc",
                "avatar": "https://test-imgs.genshuixue.com/751976_m4h38txv.jpeg",
                "url": "http://test-m.genshuixue.com/457465148",
                "subject_name": "欧洲留学",
                "city": "北京",
                "rank_change": 1,
                "student_count": "35",
                "rank": 18
            },
            {
                "name": "老师好",
                "avatar": "https://test-imgs.genshuixue.com/301867_xx1ep4iy.jpeg",
                "url": "http://test-m.genshuixue.com/835669158",
                "subject_name": "幼儿园语言",
                "city": "北京",
                "rank_change": 1,
                "student_count": "35",
                "rank": 19
            },
            {
                "name": "陈莹",
                "avatar": "https://test-imgs.genshuixue.com/784154_shf5jhah.jpeg",
                "url": "http://test-m.genshuixue.com/457548748",
                "subject_name": "缝纫",
                "city": "北京",
                "rank_change": 1,
                "student_count": "34",
                "rank": 20
            }
        ],
        "pager": {
            "has_more": false,
            "next_page": 2,
            "current_page": 1,
            "total": 24,
            "type": 1
        },
        "share": {
            "share_email": {
                "title": "跟谁学互联网名师排行榜",
                "content": "值得收藏的互联网名师排行榜！赶快跟着你的名师上课吧！",
                "url": "https://test-m.genshuixue.com/tcenter/top-teacher-rank/getRankIndex?type=0",
                "img": "https://test-imgs.genshuixue.com/0tapi/ic_find_ranking_share.png"
            },
            "share_weibo": {
                "title": "",
                "content": "值得收藏的互联网名师排行榜！赶快跟着你的名师上课吧！",
                "url": "https://test-m.genshuixue.com/tcenter/top-teacher-rank/getRankIndex?type=0",
                "img": "https://test-imgs.genshuixue.com/0tapi/ic_find_ranking_share.png"
            },
            "share_qq": {
                "title": "跟谁学互联网名师排行榜",
                "content": "值得收藏的互联网名师排行榜！赶快跟着你的名师上课吧！！",
                "url": "https://test-m.genshuixue.com/tcenter/top-teacher-rank/getRankIndex?type=0",
                "img": "https://test-imgs.genshuixue.com/0tapi/ic_find_ranking_share.png"
            },
            "share_sms": {
                "title": "",
                "content": "值得收藏的互联网名师排行榜！赶快跟着你的名师上课吧！",
                "url": "https://test-m.genshuixue.com/tcenter/top-teacher-rank/getRankIndex?type=0",
                "img": ""
            },
            "share_weixin": {
                "title": "跟谁学互联网名师排行榜",
                "content": "值得收藏的互联网名师排行榜！赶快跟着你的名师上课吧！",
                "url": "https://test-m.genshuixue.com/tcenter/top-teacher-rank/getRankIndex?type=0",
                "img": "https://test-imgs.genshuixue.com/0tapi/ic_find_ranking_share.png"
            },
            "share_pyq": {
                "title": "",
                "content": "跟谁学互联网名师排行榜",
                "url": "https://test-m.genshuixue.com/tcenter/top-teacher-rank/getRankIndex?type=0",
                "img": "https://test-imgs.genshuixue.com/0tapi/ic_find_ranking_share.png"
            },
            "share_qzone": {
                "title": "跟谁学互联网名师排行榜",
                "content": "值得收藏的互联网名师排行榜！赶快跟着你的名师上课吧！",
                "url": "https://test-m.genshuixue.com/tcenter/top-teacher-rank/getRankIndex?type=0",
                "img": "https://test-imgs.genshuixue.com/0tapi/ic_find_ranking_share.png"
            }
        }
    },
    "render": "v2/resources/page/activity/teacherCharts/index"
}
    };
};

/* eslint-enable fecs-camelcase */
