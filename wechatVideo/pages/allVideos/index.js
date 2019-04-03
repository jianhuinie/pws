import config from '../../utils/config';
import wxService from '../../utils/wxService';
let requestUrl = config.REQUSETURL;
const jsondata = config.JSONDATA;

Page({
	data: {
        navTabs: config.NAV_TABS,
        videoList: [],
		activeId: 53
	},
	onLoad: function (options) {
		// 详情页分享过来的  跳到详情页去
		if (options.item) {
			wx.navigateTo({
				url: '/pages/videoDetail/index?item=' + options.item
			});
			return false;
		}
	},
	onShow: function () {
		if (!this.data.videoList.length) {
			this.getVideoList(53, false);
		}
	},
	onPullDownRefresh: function () {
		debugger
		const id = this.data.activeId;
		this.getVideoList(id, false);
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
            jsondata.page++;
		}

        // 切tab 换id
        if (id !== 53) {
			jsondata.cateid = id;
		}

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
                let videoList = [];
                if (isLoadMore) {
                    const beforeVideoList = JSON.parse(JSON.stringify(self.data.videoList));
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
	jumpDetail: function (e) {
		const item = e.currentTarget.dataset.item;
		const itemStr = JSON.stringify(item);

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