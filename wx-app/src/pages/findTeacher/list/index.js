import config from '../../../utils/config.js';
const PATHS = config.PATHS;
const app = getApp();

Page({
	data: {
		// 默认选中“我发布的”
		curTabType: 1,
		curPage: 1
	},
	changeTab: function (e) {
		var me = this;
		me.setData({
			curTabType: e.data.index,
			curPage: 1
		});
		me.getQuestion();
	},
	getQuestion: function () {
		var me = this;
		wx.request({
			url: config.SERVER_HOST
				+ PATHS.GET_PUBLISH_LIST
				+ (me.data.curTabType === 1 ? 'my_published' : 'all'),
			data: {
				page: me.data.curPage,
				render: 'json'
			},
			header: {
			  'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
				if (res.code === 0) {
					var data = res.data;
					var setData = {
						dataList: data.items
					};
					var pager = data.pager;
					if (pager.has_more) {
						setData.curPage = pager.next_page;
						setData.hasMore = pager.has_more;
					}
					me.setData();
				}
			}
		});
	},
	onLoad: function () {
		var me = this;
		wx.setNavigationBarTitle({
			title: '找好老师，上跟谁学'
	    });
		app.getUserInfo(function (userInfo){
			//更新数据
			me.setData({
				userInfo:userInfo
			});
			console.log(userInfo);
		});
		me.getQuestion();
	},
});