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
module.exports = function(path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
  "code": 0,
  "data": {
    "item": {
      "id": 9437,
      "number": 4054261402003,
      "subject_name": "器乐-葫芦丝",
      "support_online": "1",
      "exp_price": "¥100以内",
      "info": "测试科目映射",
      "create_time": null,
      "url": "http://local-m.genshuixue.com/tcenter/hall/get?number=4054261402003",
      "page_view": 8,
      "sex": "2",
      "user_role": "2",
      "vip_exclusive_time": 618,
      "status": 1,
      "display_status": {
        "name": "我要报名",
        "color": "#37a4f5"
      },
      "allow_action": {
        "action": "join",
        "name": "立即报名"
      },
      "address": "北京-海淀",
      "student": {
        "avatar_url": "http://test-img.gsxservice.com/179758_lxubd501.jpeg",
        "display_name2": "周佳的昵称"
      }
    },
    "is_own": false,
    "joined_teachers_info": [
      {
        "display_name": "E被邀请",
        "short_introduce": "患得患失今生今世",
        "vip_level": 0,
        "display_school_age": "3年",
        "home_url": "http://local-m.genshuixue.com/415524508",
        "avatar_url": "http://test-img.gsxservice.com/418923_05vwgmkl.jpeg",
        "location_addr": "北京市海淀区软件园西二路",
        "comment_summary": {
          "avg": 0,
          "count": 0
        },
        "user_id": 347139,
        "mobile": "19988888004",
        "area_id": "17040384",
        "join_reason": "我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试我要测试",
        "course_number": "161213739456",
        "course_type": "2",
        "area": "北京-海淀区",
        "virtual_mobile": "01089192621",
        "recommend_course": {
          "course_name": "6666",
          "url": "http://local-m.genshuixue.com/teacher/classCourseDetail/161213739456",
          "cover_url": "http://test-img.gsxservice.com/752659_hrf88cny.jpeg",
          "course_type_cn": "直播课"
        }
      }
    ],
    "recommend_courses": [
      {
        "course_name": "3333",
        "course_number": "161213738436",
        "course_type": "8",
        "price": 0,
        "student_count": 1,
        "cover_url": "https://test-img.genshuixue.com/752661_od310z7t.jpeg",
        "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/161213738436"
      },
      {
        "course_name": "4444",
        "course_number": "161213738560",
        "course_type": "8",
        "price": 0,
        "student_count": 1,
        "cover_url": "https://test-imgs.genshuixue.com/752658_969aswxa.jpeg",
        "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/161213738560"
      },
      {
        "course_name": "5555",
        "course_number": "161213738564",
        "course_type": "8",
        "price": 0,
        "student_count": 1,
        "cover_url": "https://test-img.genshuixue.com/752661_od310z7t.jpeg",
        "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/161213738564"
      },
      {
        "course_name": "6666",
        "course_number": "161213739456",
        "course_type": "8",
        "price": 0,
        "student_count": 1,
        "cover_url": "https://test-img.genshuixue.com/752659_hrf88cny.jpeg",
        "course_url": "http://test-m.genshuixue.com/teacher/classCourseDetail/161213739456"
      }
    ]
  },
  "render": null
}
    };
};

/* eslint-enable fecs-camelcase */