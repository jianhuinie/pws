define(function(require) {
	'use strict';

	var ui = require('common/ui');
    var appController = require('common/app');
    var WeChatLoginDialog = require('common/weChatLogin');
    var env = require('util/env');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var staging = require('common/staging/staging');
    var observer = require('common/mvc/observer');
    var user = require('common/user');
    var service = require('common/service');

    // yuanye: 涉及获取分期信息
    var fenqiInfo;
    var hasGetFenqi = false;
	var isUmeng;

	return {
		init: function (scriptData) {
			isUmeng = scriptData.is_u_meng;;
			function checkStaging(stagingPeriod) {
				var courseNumber = scriptData.course_info.number;
				//判断视频课支付状态-已登录情况
				$.ajax({
					url: '/video_course/checkVideoOrder',
					dataType: 'json',
					data: {
						course_number: courseNumber
					}
				}).done(function(response) {
					var code = Number(response.code);
					var videoData = response.data;

					if (videoData.status == 1) {
						ui.confirm({
							content: videoData.content,
							button_ok: videoData.text
						}).done(function() {
							if (from) {
								location.href = videoData.url + from;
							} else {
								location.href = videoData.url;
							}
						});
					} else if (videoData.status == 2) {
						$('#start-play').show();
						setTimeout(function() {
							location.reload();
						}, 100);
					} else {
						//使用花呗接口
						$.ajax({
							url: '/course/fenqiChoice',
							dataType: 'json',
							data: {
								course_number: courseNumber,
								course_type: 3,
								stage_number: stagingPeriod
							}
						}).done(function(response) {
							if (response.code == 0) {
								location.href = '/pay/productDetail?type=3&course_number=' + courseNumber;
							} else {
								ui.alert(response.msg);
							}
						});


					}
				});

			}

			/**
	         * 分期按钮的事件绑定逻辑
			 */
			function stagingBind() {
				var stagingButton = $('.staging-dialog .button');
				stagingButton.unbind('click');
				stagingButton.on('click', function() {
					// window.gsx_ready(function(config) {
					var userInfo =user.getUserInfo();
						//判断身份-老师身份
						if (userInfo && userInfo.type == 0) {
							ui.confirm({
								title: '温馨提示',
								content: '请您切换成学生身份报名课程',
								button_ok: '立即登录'
							}).done(function() {
								location.href = '/static/login?next=' + encodeURIComponent(window.location.href);
							});
						} else if (userInfo && userInfo.type == 2) {
							//判断身份-学生身份
							var stagingAll = $('.staging-all');
							var stagingPeriod = 0;
							var hasStaging = false;
							$('.slide-dialog-mask').each(function() {
								var that = $(this);
								if (that.hasClass('on')) {
									that.find('.staging-all .staging-item').each(function() {
										var there = $(this);
										if (!there.find('.options .icon').hasClass('hide')) {
											hasStaging = true;
											stagingPeriod = there.data('periods');
										}
									});
								}
							});

							if (stagingPeriod > 0) {
								//先请求订单状态再准备调用花呗接口
								checkStaging(stagingPeriod);
							} else {
								ui.remind('请选择要还款的期数');
							}
						} else {
							//未登录的身份
							if (appController.isApp()) {
								appController.getUserInfo(location.href, function() {
									location.reload();
								});
							} else {
								if (env.thirdapp.isWeixin && !isUmeng) {
									//微信登录的话就用微信的弹窗
									staging(fenqiInfo, 'courseDetail', 'close');
									$('.slide-dialog-mask').hide();
									WeChatLoginDialog.addWechatDialog(location.href, function() {
										location.reload();
									});
								} else {
									var loginDialog = new LoginDialog();
									loginDialog.show();
									var listener1 = observer.addListener(loginDialog, 'success', function() {
										location.reload();
									});
									var listener2 = observer.addListener(loginDialog, 'display_changed', function() {
										var display = this.get('display');
										if (!display) {
											observer.removeListener(listener1);
											observer.removeListener(listener2);
											$('.wechat-hide').hide();
											loginDialog.destroy();
										}
									});
								}
							}
						}
					// });
				});
			}

			$('.class-course-staging').on('click', function() {
				if (!hasGetFenqi) {
	                service.post('/course/fenqi', {
	                    money: scriptData.target_price,
	                    course_number: scriptData.course_info.number,
	                    course_type: scriptData.course_info.course_type
	                }, function (res) {
	                	if (res.code == 0) {
		                    hasGetFenqi = true;
		                    fenqiInfo = {
		                        data: res.data,
		                        mianxi: scriptData.course_info.fenqi.tiexi_info.split(',')
		                    };
		                    staging(fenqiInfo, 'courseDetail', 'normal');
		                    stagingBind();
	                	}

	                });
	            }
	            else {
	                staging(fenqiInfo, 'courseDetail', 'normal');
	                stagingBind();
	            }
			});
		}
	};
});