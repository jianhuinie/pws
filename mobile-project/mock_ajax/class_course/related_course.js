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
				"related_course": [{
					"id": "19519",
					"number": "16032996344",
					"name": "\u514d\u8d39\u54c8\u94a2\u7434\u4ece\u96f6\u57fa\u7840\u5b66\u4e60\uff0c\u5feb\u6765\u62a5\u73ed\u554a",
					"type": 3,
					"current_price": "1",
					"origin_price": null,
					"realtime_price": null,
					"url": "http:\/\/beta-m.genshuixue.com\/video_course\/getcourseshowdetail?number=16032996344",
					"logo": "https:\/\/imgs.genshuixue.com\/3671703_8vcai11r.jpeg",
					"limited_discount": null
				}, {
					"id": "24910",
					"number": "1605109393001",
					"name": "\u94a2\u7434\u4ece\u96f6\u57fa\u7840\u5b66\u4e60\uff0c\u5feb\u6765\u62a5\u73ed (\u4e91\u7aef\u5f55\u64ad)",
					"type": 3,
					"current_price": "0",
					"origin_price": null,
					"realtime_price": null,
					"url": "http:\/\/beta-m.genshuixue.com\/video_course\/getcourseshowdetail?number=1605109393001",
					"logo": "https:\/\/imgs.genshuixue.com\/3671703_8vcai11r.jpeg",
					"limited_discount": null
				}, {
					"id": "32279",
					"number": "1605216639301",
					"name": "\u94a2\u7434\u4ece\u96f6\u57fa\u7840\u5b66\u4e60 (\u4e91\u7aef\u5f55\u64ad)",
					"type": 3,
					"current_price": "0",
					"origin_price": null,
					"realtime_price": null,
					"url": "http:\/\/beta-m.genshuixue.com\/video_course\/getcourseshowdetail?number=1605216639301",
					"logo": "https:\/\/imgs.genshuixue.com\/3671703_8vcai11r.jpeg",
					"limited_discount": null
				}, {
					"id": "39808",
					"number": "1607214010301",
					"name": "\u94a2\u7434\u4ece\u96f6\u57fa\u7840\u5b66\u4e60\uff0c\u5feb\u6765\u62a5\u73ed\u554a(\u4e91\u7aef\u5f55\u64ad)",
					"type": 3,
					"current_price": "1",
					"origin_price": null,
					"realtime_price": null,
					"url": "http:\/\/beta-m.genshuixue.com\/video_course\/getcourseshowdetail?number=1607214010301",
					"logo": "https:\/\/imgs.genshuixue.com\/3671703_8vcai11r.jpeg",
					"limited_discount": null
				}, {
					"id": "39810",
					"number": "1607214011101",
					"name": "\u94a2\u7434\u4ece\u96f6\u57fa\u7840\u5b66\u4e60\uff0c\u5feb\u6765\u62a5\u73ed\u554a\u5440\uff08\u76f4\u64ad\u56de\uff09 (\u4e91\u7aef\u5f55\u64ad)",
					"type": 3,
					"current_price": "0",
					"origin_price": null,
					"realtime_price": null,
					"url": "http:\/\/beta-m.genshuixue.com\/video_course\/getcourseshowdetail?number=1607214011101",
					"logo": "https:\/\/imgs.genshuixue.com\/3671703_8vcai11r.jpeg",
					"limited_discount": null
				}, {
					"id": "40001",
					"number": "1607223918501",
					"name": "\uff08\u76f4\u64ad\u56de\u653e\uff09 (\u4e91\u7aef\u5f55\u64ad)",
					"type": 3,
					"current_price": "0",
					"origin_price": null,
					"realtime_price": null,
					"url": "http:\/\/beta-m.genshuixue.com\/video_course\/getcourseshowdetail?number=1607223918501",
					"logo": "https:\/\/imgs.genshuixue.com\/3671703_8vcai11r.jpeg",
					"limited_discount": null
				}, {
					"id": "46015",
					"number": "16091279423",
					"name": "\u94a2\u7434\u57fa\u7840\u73ed\u89c6\u9891\u8bfe\u552e\u5356001",
					"type": 3,
					"current_price": "3",
					"origin_price": null,
					"realtime_price": null,
					"url": "http:\/\/beta-m.genshuixue.com\/video_course\/getcourseshowdetail?number=16091279423",
					"logo": "https:\/\/imgs.genshuixue.com\/19328842_q6qxz2kt.jpeg",
					"limited_discount": null
				}, {
					"id": "46016",
					"number": "16091238119",
					"name": "\u94a2\u7434\u57fa\u7840\u73ed\u89c6\u9891\u8bfe\u552e\u5356002",
					"type": 3,
					"current_price": "0",
					"origin_price": null,
					"realtime_price": null,
					"url": "http:\/\/beta-m.genshuixue.com\/video_course\/getcourseshowdetail?number=16091238119",
					"logo": "https:\/\/imgs.genshuixue.com\/19328958_j7jdz8iq.jpeg",
					"limited_discount": null
				}, {
					"id": "355311",
					"number": "447223754767",
					"name": "\u9ad8\u4e8c\u82f1\u8bed",
					"type": 1,
					"current_price": "1",
					"origin_price": null,
					"realtime_price": null,
					"url": "http:\/\/beta-m.genshuixue.com\/teacher\/one2oneCourseDetail\/447223754767",
					"logo": "https:\/\/imgs.genshuixue.com\/1367681_rnpf6ww2.jpeg",
					"limited_discount": null
				}]
			},
			"ts": 1484127851,
			"declare_config": {
				"declareTpl": null
			}
		}
    };
};

/* eslint-enable fecs-camelcase */
