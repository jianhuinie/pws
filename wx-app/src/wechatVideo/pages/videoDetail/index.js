import config from '../../utils/config';
import wxService from '../../utils/wxService';
const PATHS = config.PATHS;
const serverHost = config.SERVER_HOST;
// const TOKEN = config.TOKEN;

Page({
	data: {
		funVideos: [],
		positiveVideos: [],
		item: {}
	},
	onLoad: function (options) {
		var itemStr = options.item;
		var item = JSON.parse(itemStr);
		var self = this;
		self.setData({ item });
		
		wxService.sendWxRequest({
			url: serverHost + PATHS.RECOMMEND,
			data: {}, 
			method: 'POST',
			doneHandler: function (res) { 
				self.setData({
					funVideos: res.recommend_video,
					positiveVideos: res.positive_video
				});
			}
		})
	},
	onShow: function () {
		
	},
	onShareAppMessage: function (options) {
		
	}
});