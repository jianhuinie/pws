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
        _timeout: 100,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
        	"code": 0,
		    "msg": "succ",
		    "data": {
		        "course_plan": {
		            "arrangement": "12月1日开课－12月16日结课 共16节",
		            "course_long": 48,
		            "content": [
		                {
		                    "title_name": "第1节",
		                    "title": "2016年12月1日 11:00-14:00",
		                    "content": "内容sdfasdfasdfad",
		                    "is_finish": true,
		                    "has_playback": true,
		                    "playback_url": "http://www.baidu.com"
		                },
		                {
		                    "title_name": "第2节",
		                    "title": "2016年12月2日 13:00-16:00",
		                    "content": "内容阿萨德法师打发阿斯达飞阿斯达飞阿斯达飞",
		                    "is_finish": true,
		                    "has_playback": false,
		                    "playback_url": ""
		                },
		                {
		                    "title_name": "第3节",
		                    "title": "2016年12月2日 13:00-16:00",
		                    "content": "内容阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿萨德法师打发斯蒂芬阿斯顿发斯蒂芬阿萨德法师打发斯蒂芬",
		                    "is_finish": false,
		                    "has_playback": false,
		                    "playback_url": ""
		                },
		                {
		                    "title_name": "第4节",
		                    "title": "2016年12月2日 13:00-16:00",
		                    "content": "",
		                    "is_finish": false,
		                    "has_playback": false,
		                    "playback_url": ""
		                },
		                {
		                    "title_name": "第5节",
		                    "title": "2016年12月2日 13:00-16:00",
		                    "content": "阿萨德法师打发阿萨德法师打发阿萨德发阿斯达飞阿萨德法师打发",
		                    "is_finish": false,
		                    "has_playback": false,
		                    "playback_url": ""
		                },
		                {
		                    "title_name": "第6节",
		                    "title": "2016年12月2日 13:00-16:00",
		                    "content": "",
		                    "is_finish": false,
		                    "has_playback": false,
		                    "playback_url": ""
		                }
		            ],
		            "begin_time": "2016-12-01"
		        },
		        "page_info": {
		            "page_size": 10,
		            "has_more": 1,
		            "next_cursor": 2
		        }
		    },
		    "ts": 1481097084
        }
    };
};

/* eslint-enable fecs-camelcase */
