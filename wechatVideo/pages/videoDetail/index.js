import config from '../../utils/config';
import wxService from '../../utils/wxService';

let requestUrl = config.REQUSETURL;
const jsondata = config.JSONDATA;

Page({
	data: {
		allVideos: [],
		item: {}
	},
	onLoad: function (options) {
		var itemStr = decodeURIComponent(options.item);
		var item = JSON.parse(itemStr);
		var self = this;

		self.setData({ item });
		self.getVideoList();
	},
	getVideoList: function () {
		var self = this;
		jsondata.page++;

		// 请求拿数据
		wxService.sendWxRequest({
			url: requestUrl,
			data: { jsondata: JSON.stringify(jsondata) },
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			isShowLoading: true,
			doneHandler: function (res) {
				var beforeList =  JSON.parse(JSON.stringify(self.data.allVideos));
				self.setData({
					allVideos: beforeList.concat(res)
				});
			}
		});
	},
	onShow: function () {

	},
	onReady: function () {
		var videoContext = wx.createVideoContext('myVideo');
		videoContext.play();
	},
	onReachBottom: function() {
		this.getVideoList();
	},
	jumpDetail: function (e) {
		var item = e.currentTarget.dataset.item;
		item.name = item.title;
		var itemStr = JSON.stringify(item);

		wx.redirectTo({
			url: '/pages/videoDetail/index?item=' + encodeURIComponent(itemStr)
		});
	},
	onShareAppMessage: function (options) {
		var self = this;
		var item = self.data.item;
		var sharePath = '/pages/index/index';
		var itemStr = JSON.stringify(item);

		sharePath += '?item=' + encodeURIComponent(itemStr);
		var imageUrl = JSON.parse(item.oss_art_title_pic)[0];

		return {
			title: item.art_title,
			path: sharePath,
			imageUrl: imageUrl
		};
	}
});