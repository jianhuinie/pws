define(function () {
	return {
		URL: 'res.wx.qq.com/open/js/jweixin-1.0.0.js',
		TYPES: {
			VOICE: 'VOICE',
			IMAGE: 'IMAGE',
			SHARE: 'SHARE'
		},
		EVEVTS: {
			VOICE: [
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'pauseVoice',
				'stopVoice',
				'onVoicePlayEnd',
				'uploadVoice',
				'downloadVoice'
			],
			IMAGE: [
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage'
			],
			SHARE: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
			]
		}
	};
});