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
			  "code": 0,
			  "msg": "succ",
			  "data": {
			    "interactive_clickable": {
			      "type": 1,
			      "list": [
			        {
			          "sub_type": 2,
			          "icon": "https://test-imgs.genshuixue.com/726062_iift9sfh.jpeg",
			          "text": "我有免费视频课，快来试听吧！",
			          "url": "https://www.baidu.com",
			          "number": "15120441635"
			        }
			      ]
			    },
			    "interactive_unclickable": {
			      "type": 2,
			      "list": [
			        {
			          "text": "已经有121位同学在跟老师学习啦！",
			          "icon": "https://imgs.genshuixue.com/0baijiatools/ac0c10f5f88482cc8e7ede27772b6111/ic_announcement.png"
			        },
			        {
			          "text": "学计算机学计算机就是看到开导开导",
			          "icon": "https://test-imgs.genshuixue.com/346023_0t182k3v.jpeg"
			        },
			        {
			          "text": "冬眠东看西看快上课开始考试开始考试开始考试",
			          "icon": "https://test-imgs.genshuixue.com/346023_0t182k3v.jpeg"
			        }
			      ]
			    }
			  },
			  "ts": 1481871590,
			  "declare_config": {
			    "declareTpl": ""
			  }
			}
    };
};

/* eslint-enable fecs-camelcase */
