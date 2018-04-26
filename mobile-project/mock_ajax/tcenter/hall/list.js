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
    "items": [
      {
        "id": 9437,
        "number": 4054261402003,
        "subject_name": "器乐-葫芦丝",
        "support_online": "1",
        "exp_price": "¥100以内",
        "vip_exclusive_time": -1482914761,
        "info": "测试科目映射",
        "create_time": null,
        "url": "http://local-m.genshuixue.com/tcenter/hall/get?number=4054261402003",
        "display_status": {
          "name": "我要报名",
          "color": "#37a4f5"
        },
        "allow_action": {
          "action": "join",
          "name": "立即报名"
        },
        "address": "",
        "sex": "2",
        "student": {
          "avatar_url": "http://test-img.gsxservice.com/179758_lxubd501.jpeg",
          "display_name2": "周佳的昵称"
        },
        "user_role": "2",
        "teachers": [
          {
            "avatar_url": "http://test-img.gsxservice.com/418923_05vwgmkl.jpeg"
          }
        ]
      },
      {
        "id": 9456,
        "number": 4430070988803,
        "subject_name": "常用软件-3Dmax",
        "support_online": "1",
        "exp_price": "¥100以内",
        "vip_exclusive_time": -1482914761,
        "info": "测试映射",
        "create_time": null,
        "url": "http://local-m.genshuixue.com/tcenter/hall/get?number=4430070988803",
        "display_status": {
          "name": "我要报名",
          "color": "#37a4f5"
        },
        "allow_action": {
          "action": "join",
          "name": "立即报名"
        },
        "address": "",
        "sex": "2",
        "student": {
          "avatar_url": "http://test-img.gsxservice.com/351788_1k749z1c.jpeg",
          "display_name2": "烟火"
        },
        "user_role": "2",
        "teachers": []
      }
    ],
    "teacher": {
      "is_valid": 2
    },
    "pager": {
      "has_more": true,
      "next_page": 2,
      "current_page": 1,
      "total": 65
    }
  },
  "render": "/v2/resources/page/studentRoom/teacher/room/index"
}
    };
};

/* eslint-enable fecs-camelcase */