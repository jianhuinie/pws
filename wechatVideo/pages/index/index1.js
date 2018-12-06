import config from '../../utils/config';
import wxService from '../../utils/wxService';
const PATHS = config.PATHS;
const serverHost = config.SERVER_HOST;
// var requestUrl = 'https://aa.tangdou.com:12308/api.php?mod=microsuggest&ac=laugh&page=0&endid=1500660948797&startid=86027676&model=VIDO-M9i-BS&xinge=AsALoKPzqlBmk2tLy64e5meYcGyXrQylmMPcnge2VFKb&client=2&div=6.4.3&package=com.bokecc.dance&diu=952db6a1092b1348&ver=v2&version=6.4.3&city=%E6%B7%B1%E5%9C%B3%E5%B8%82&time=1537606633251&height=1960&nettype=WIFI&sdkversion=4.4.4&stepid=12&province=%E5%B9%BF%E4%B8%9C%E7%9C%81&lat=22.538598&lon=113.917127&device_s=vido_m9i&width=1536&dic=wandoujia&smallvideo=1&manufacture=vido&netop=UNKNOWN&abtag=87&device=VIDO-M9i-BS-Android:4.4.4&diu3=e203660da2de4e3493098aa993233a8b&diu2=00094c3c7688&uuid=a7d423dc1a2f68c5e101fa81bae13b6c&channel=wandoujia&hash=6e676ad7fab115c2f7db97bfbdd32b96';
// const TOKEN = config.TOKEN;

Page({
	data: {
		funVideos: [],
		positiveVideos: [],
		activedTab: 1
	},
	onLoad: function (options) {
		var self = this;
		// 详情页分享过来的  跳到详情页去
		if (options.item) {
			wx.navigateTo({
				url: '/pages/videoDetail/index?item=' + options.item
			});
			return false;
		}
		self.getVideoList();
	},
	onShow: function () {
		if (!this.data.funVideos.length) {
			this.getVideoList();
		}
	},
	getVideoList: function () { 
		var self = this;
		wxService.sendWxRequest({
			url: serverHost + PATHS.RECOMMEND,
			data: {}, 
			method: 'POST',
			isShowLoading: true,
			doneHandler: function (res) { 
				self.setData({
					funVideos: res.recommend_video,
					positiveVideos: res.positive_video
				});
			}
		});
	},
	// getVideoList: function () { 
	// 	var self = this;
	// 	requestUrl = requestUrl.replace(/page=(\d+)/g, function($0, $1) {
	// 		return 'page=' + (++$1);
	// 	});
	// 	wxService.sendWxRequest({
	// 		// url: serverHost + PATHS.RECOMMEND,
	// 		url: requestUrl,
	// 		data: {}, 
	// 		method: 'POST',
	// 		isShowLoading: true,
	// 		doneHandler: function (res) { 
	// 			var beforeFunList =  JSON.parse(JSON.stringify(self.data.funVideos));
	// 			var beforePositiveList =  JSON.parse(JSON.stringify(self.data.positiveVideos));
	// 			self.setData({
	// 				funVideos: beforeFunList.concat(res.videos),
	// 				positiveVideos: beforePositiveList.concat(res.videos),
	// 			});
	// 		}
	// 	});
	// },
	// onReachBottom: function() {
	// 	this.getVideoList();
	// },
	// jumpDetail: function (e) { 
	// 	var item = e.currentTarget.dataset.item;
	// 	item.name = item.title;
	// 	item.videoUrl = 'https://aqiniu.tangdou.com/' + item.videourl + '-20.mp4?sign=cc4ace8afbbbc097a23e2e7169429a20&t=5bac9c49';	
	// 	var itemStr = JSON.stringify(item);
	// 	wx.navigateTo({
	// 		url: '/pages/videoDetail/index?item=' + encodeURIComponent(itemStr)
	// 	});
	// },
	jumpDetail: function (e) { 
		var item = e.currentTarget.dataset.item;
		var itemStr = JSON.stringify(item);
		wx.navigateTo({
			url: '/pages/videoDetail/index?item=' + encodeURIComponent(itemStr)
		});
	},
	onShareAppMessage: function (options) {
		return {
			title: 'wechatVideo',
			path: '/pages/index/index',
			imageUrl: ''
		};
	}
});