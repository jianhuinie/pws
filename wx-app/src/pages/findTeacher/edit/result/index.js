Page({
	onLoad: function () {
		var me = this;
		wx.setNavigationBarTitle({
			title: '结果页'
	    });
		// 2s之后调回
		setTimeout(() => {
			wx.navigateTo({
				url: '../index'
			});
		}, 2000);
	},
	// 保存
	bindMyPublicTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		});
	}
})