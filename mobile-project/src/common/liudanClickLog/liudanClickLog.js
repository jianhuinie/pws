/*
 * 留单入口的点击上报*
 * created by hanzh @2016-04-06
 */

define(function(argument, exports) {
	var util_object = require('util/object');
    var cookie = require("util/cookie");
    var habo = require('common/component/analysis/habo/index');

	exports.send = function(param) {
		/*
		 * 传递字段：
		 * type: recommend 留单业务
		 * -|:stype:	1,2	(1-点击留单按钮，2-点击留单提交按钮)
		 * user_number: (用户的id)，
		 * user_role：	0,2	（0-老师，2-学生）
		 * track_id: 网站统一生成的track_id（由后端传递,前端不用管这个字段）
		 * -|:page_type: 页面类型
		 * client: pc，m，sapp（分端的字段）
		 * -|:location_type: 如果当前页面只有一个入口，默认_1，如果有多个，单独定义1,2,3区分	定义：page_type_1,如index_1，如果只有一个，默认_1
		 * -|:tid: 如果用户在老师页面留单，填写
		 * -|:query: 如果用户在搜索页面，透传query值
		 * -|:cid: 如果用户在课程页留单，透传当前页面的课程number
		 * _timestamp: 时间戳，防止缓存
		 */
		window.gsx_ready(function(config) {
            var page_type;
            if(page_data) {
                page_type = page_data.page_type;
            } else {
                page_type = '';
            }
			var postParam = {
				type: "recommend",
				client: "m",
				stype: 1,
                track_id: cookie.get("__track_id__"),
                page_type: page_type,
				_timestamp: Date.now()
			};

			if (config.user) {
				var userInfo = config.user;
				postParam.user_number = userInfo.user_number||userInfo.number||'';
				postParam.user_role = userInfo.type||'';
			}
			for (var i in param){
				if (param.hasOwnProperty(i)) {
					postParam[i] = param[i];
				}
			}
			habo.send(postParam);
		});
	}
});