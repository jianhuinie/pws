/**
 * @file 收藏
 */
define(function (require) {
	'use strict';

	var app = require('common/app');
	var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var service = require('common/service');
    var ui = require('common/ui');
    var env = require('util/env');
	
    function initEvent(videoCourseInfo, courseType) {
        $('.bottom')
            .on('click', '.favor', function() {
                // 非app，浏览器环境，唤起app
                if (!app.isApp()) {
                    app.wakeUpApp();
                    return;
                }
                var me = $(this);
                var favorText = me.find('div');
                var status = +me.data('status');
                var value = !status ? 1 : 0;
                service.post(
                    '/collection/addFav',
                    {
                        number: videoCourseInfo.number,
                        type: courseType === 3 ? 'video_course' : 'class_course',
                        value: value
                    },
                    function (res) {
                        if (res.code == 0) {
                            if (value == 0) {
                                value = 1;
                                ui.remind("取消收藏成功");
                                //更改页面样式
                                me.attr('data-status', 0);
                                me.find('.icon').addClass('icon-unfavor');
                                me.find('.icon').removeClass('icon-star-full');
                                favorText.text('收藏');
                                //.removeClass(model);
                            } else {
                                value = 0;
                                ui.remind('收藏成功');
                                //更改页面样式
                                me.attr('data-status', 1);
                                me.find('.icon').addClass('icon-star-full');
                                me.find('.icon').removeClass('icon-unfavor');
                                favorText.text('已收藏');
                                //favorText.text('已收藏').addClass(model);
                            }
                        } else if (res.code == 401 || res.code == 200002) {
                            //没登录，跳转登录页
                            if (app.isApp()) {
                                app.getUserInfo(function () {
                                    location.reload();
                                });
                            } else {
                                var loginDialog = new LoginDialog({
                                    autoReload: true
                                });
                                loginDialog.show();
                            }
                            // hurry: 禁止service的默认处理
                            return false;
                        } else {
                            ui.remind(res.msg);
                        }
                    }
                );
            });
    }

    /**
     * @params {options} 课程信息
     * @params {int} 课程类型，3：视频课，2：班课、直播课
     */
	return function (options, courseType) {
        if (!env.thirdapp.isWeixin && !env.thirdapp.isQQ) {
            $('.bottom .favor').removeClass('hide');
        }
        initEvent(options.course_info, courseType);
    };
});