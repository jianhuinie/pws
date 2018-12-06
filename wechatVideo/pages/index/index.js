import config from '../../utils/config';
import wxService from '../../utils/wxService';
const serverHost = config.SERVER_HOST;
let requestUrl = 'https://lifeapp.tangdou.com/api.php?mod=home&ac=index&page=1&tab=0&startid=90958287&model=VIDO-M9i-BS&xinge=AsALoKPzqlBmk2tLy64e5mc76xvuZWsbnTxpPixJGgB6&client=2&div=0.1.1.080916&package=com.td.life&diu=952db6a1092b1348&ver=v2&version=0.1.1.080916&time=1542536015838&height=1960&nettype=WIFI&sdkversion=4.4.4&stepid=3&lat=0.0&lon=0.0&device_s=vido_m9i&width=1536&dic=xiaomi&smallvideo=1&manufacture=vido&netop=UNKNOWN&device=VIDO-M9i-BS-Android:4.4.4&diu3=db5b82539a1443218fda3a3545cc1801&diu2=00094c3c7688&uuid=a7d423dc1a2f68c5e101fa81bae13b6c&channel=xiaomi&hash=67d4dc9719513320fa625fdeb53b4a48';
// const TOKEN = config.TOKEN;

Page({
	data: {
        navTabs: config.NAV_TABS,
        videoList: [],
		activeId: 0
	},
	onLoad: function (options) {
		// 详情页分享过来的  跳到详情页去
		// if (options.item) {
		// 	wx.navigateTo({
		// 		url: '/pages/videoDetail/index?item=' + options.item
		// 	});
		// 	return false;
		// }
	},
	onShow: function () {
		if (!this.data.videoList.length) {
			this.getVideoList(0, false);
		}
    },
    switchTab: function (e) {
        const id = +e.target.dataset.id;
        const {activeId} = this.data;
        const self = this;
        if (activeId !== id) {
            self.setData({
                activeId: id
            });
            self.getVideoList(id, false);
        }
    },
	getVideoList: function (id, isLoadMore) { 
        const self = this;
        // 加载更多  page+1
        if (isLoadMore) {
            requestUrl = requestUrl.replace(/page=(\d+)/g, function($0, $1) {
                return 'page=' + (++$1);
            });
        }
        // 切tab 换id
        if (id !== 0) {
            requestUrl = requestUrl.replace(/tab=(\d+)/g, function($0, $1) {
                return 'tab=' + (id);
            });
        } 
		wxService.sendWxRequest({
			url: requestUrl,
			data: {}, 
			method: 'POST',
			isShowLoading: true,
			doneHandler: function (res) { 
                let videoList = [];
                if (isLoadMore) {
                    const beforeVideoList =  JSON.parse(JSON.stringify(self.data.videoList));
                    videoList = beforeVideoList.concat(res);
                } else {
                    videoList = res;
                }
				self.setData({
					videoList
				});
			}
		});
	},
	onReachBottom: function() {
        const id = this.data.activeId;
		this.getVideoList(id, true);
	},
	// jumpDetail: function (e) { 
	// 	const item = e.currentTarget.dataset.item;
	// 	const itemStr = JSON.stringify(item);
	// 	wx.navigateTo({
	// 		url: '/pages/videoDetail/index?item=' + encodeURIComponent(itemStr)
	// 	});
	// },
	onShareAppMessage: function (options) {
		return {
			title: 'wechatVideo',
			path: '/pages/index/index',
			imageUrl: ''
		};
	}
});