/**
*create by nanci 16/10/19
**/
define(function(require,exports){
    'use strict';
    var app = require("common/app");
    var env = require('util/env');
    var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
    var isQQ = env.thirdapp && env.thirdapp.isQQ;
    var Jockey = require('jockey');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var setShare = require('common/share/initialize');
    var openInApp = require('./openInApp');
    var container = $('#main');
    return function (page_data) {
        $('.signup .free').attr('href', '/static/login?usertype=0&next' + location.href);
        if (app.isApp()) {
           $('.live-hall').removeClass('hidden');
        }
        else if (!app.isApp()) {
           $('.open-in-app').removeClass('hidden');
           openInApp();
        }
        if (!app.isStudentApp()) {
           $('.signup').removeClass('hidden');
        }
        else {
           $('.course-list').css({'padding-bottom': '0'});
        }
        lazyLoadImage.init();
        service.post('/tcenter/micro-live/getShare', {
            number: page_data.number
        }, function (res) {
            if (res.code == 0) {
                var data = res.result;
                var shareConfig = {
                    share_pyq: data.weixin_timeline,
                    share_weixin: data.weixin_friend,
                    share_qq: data.qq,
                    share_qzone: data.qzone,
                    share_weibo: data.weibo
                };
                setShare(shareConfig);
            }
        });
        container
        .on('click', '.playing', function (e) {
            if (app.isApp()) {
                Jockey.send('urlSchemeRoute', {
                    url: $('#main').data('live-url-app')
                });
            }
            else {
                location.href = $('#main').data('live-url-m');
            }
        })
        .on('click', '.live-hall .wrapper', function (e) {
            e.preventDefault();
            if (app.isApp()) {
                Jockey.send('urlSchemeRoute', {
                    url: 'bjhlstudent://o.c?a=student_livehouse'
                });
            }
        })
        .on('click', '.homepage .wrapper', function (e) {
            e.preventDefault();
            if (app.isApp()) {
                Jockey.send('toNewWindow', {
                    url: $(this).attr('href'),
                    web_url: $(this).attr('href')
                });
            }
            else {
                location.href = $(this).attr('href');
            }
        });
        var timeStamp = new Date().getTime();
        var interval = setInterval(function () {
            if (new Date().getTime() - timeStamp > 9600) {
                service.post('/tcenter/micro-live/checkTeacherOnLive', {
                    number: page_data.number,
                    check_key: page_data.check_key
                }, function (res) {
                    if (res.code == 0) {
                        var data = res.data;
                        if (data.live_status) {
                            $('.playing').removeClass('hidden');
                            $('.entry-or-not .tip').text('正在直播：' + data.title).removeClass('not-playing');
                            $('#main').data('live-url-m', data.m_site).data('live-url-app', data.app);
                        }
                        else {
                            $('.playing').addClass('hidden');
                            $('.entry-or-not .tip').addClass('not-playing').text('没有进行中的直播');
                        }
                    }
                    else {
                        clearInterval(interval);
                    }
                });
                timeStamp = new Date().getTime();
            }
        }, 10000);
    };
});