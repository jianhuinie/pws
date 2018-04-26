/*
 * @file   新年签到活动页
 * @author yuanye
 * @date   2016-12-19
 */
define(function(require) {
    'use strict';

    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var user = require('common/user');
    var env = require('util/env');
    var app = require('common/app');
    var url = require("util/url");
    var service = require('common/service');
    // 用户信息
    var userInfo;
    var isTeacher;
    var isApp = app.isApp();
    // 是否为首页
    var isIndex;
    // 是否为分享的页面
    var isShare;
    // 首页跳转地址
    var indexUrl = location.origin + '/activity/newYearCheckInIndex';
    // 结果页跳转地址
    var resUrl = location.origin + '/activity/newYearCheckIn';
    // 老师注册地址
    var regUrl = location.origin + "/static/login?usertype=0";
    // 老师登录地址
    var logUrl = location.origin + "/static/login?usertype=0&next=";
    // 首页主容器
    var indexContent;
    // 结果页主容器
    var resultContent;
    var bottomInfo;
    // 求签按钮
    var qiuqian;
    // ajax flag防止连续发ajax
    var isSendAjax = false;

    // 进入result页的动画
    function initResAnimate() {
        resultContent.find('.text-title')
            .add('.text-left')
            .add('.text-right')
            .css({
                'opacity': '1',
                '-webkit-transform': 'translateY(0rem)',
                'transform': 'translateY(0rem)'
            });
        resultContent.find('.right-cont').css({
            'opacity': '1',
            '-webkit-transform': 'translateX(0rem)',
            'transform': 'translateX(0rem)'
        });
    }

    // 主页跳转结果页
    function goResult() {
        var teacherNumber = userInfo ? userInfo.number : '';
        // 开启新年签按钮
        var resBtn = indexContent.find('.open');
        resBtn.on('click', function() {
            // 如果老师未登录,则跳转老师登录页
            // 由于手机端对aniamtion兼容性不好,必须带上浏览器前缀
            resBtn.css({
            	'-webkit-animation': 'open 0.8s ease forwards',
            	'-moz-animation': 'open 0.8s ease forwards',
            	'-ms-animation': 'open 0.8s ease forwards',
            	'-o-animation': 'open 0.8s ease forwards',
            	'animation': 'open 0.8s ease forwards'
            });
            // 等动画执行结束跳页
            window.setTimeout(function() {
                if (isApp) {
                    if (isTeacher) {
                        app.openNewWindow(resUrl + '?number=' + teacherNumber);
                    } else {
                        app.openNewWindow(logUrl + encodeURIComponent(location.href));
                    }
                } else {
                    if (isTeacher) {
                        location.href = resUrl + '?number=' + teacherNumber;
                    } else {
                        location.href = logUrl + encodeURIComponent(location.href);
                    }
                }
            }, 800);
        });
    }

    // 结果页所有跳转
    function resAllHref() {
        var regBtn = resultContent.find('.register');
        var toTeacher = resultContent.find('.toTeacher');
        // 老师主页地址
        var teacherUrl = toTeacher.data('url');
        // 老师number
        var teacherNum = isTeacher ? userInfo.number : '';
        resultContent.on('click', function(e) {
            var self = $(e.target);
            if (isApp) {
                if (self.hasClass('toTeacher')) {
                    app.openNewWindow(teacherUrl);
                } else if (self.parent().hasClass('qiuqian-wrap')) {
                    if (isTeacher) {
                        app.openNewWindow(resUrl + '?number=' + teacherNum);
                    } else {
                        app.openNewWindow(logUrl + encodeURIComponent(indexUrl));
                    }
                } else if (self.hasClass('register')) {
                    app.openNewWindow(regUrl);
                }
            } else {
                if (self.hasClass('toTeacher')) {
                    location.href = teacherUrl;
                } else if (self.parent().hasClass('qiuqian-wrap')) {
                    if (isTeacher) {
                        location.href = resUrl + '?number=' + teacherNum;
                    } else {
                        location.href = logUrl + encodeURIComponent(indexUrl);
                    }
                } else if (self.hasClass('register')) {
                    location.href = regUrl;
                }
            }
        });
    }

    // 点赞
    function goPraise() {
        var countSpan = $('.zan-count');
        var count = Number(countSpan.text());
        var teacherNumber = url().params.number;
        // 点赞icon
        var praise = resultContent.find('.praise');

        praise.on('click', function() {
            var self = $(this);
            var url = '/activity/newYearCheckInAddZan';
            if (!isSendAjax) {
                isSendAjax = true;
                service.post(url, { number: teacherNumber }, function (res) {
                    if (res.code == 0 && res.data.is_add == true) {
                        self.addClass('hide');
                        self.next('img').removeClass('hide');
                        countSpan.text(++count);
                        isSendAjax = false;
                    } else if (res.code == 0 && res.data.is_add == false) {
                        require('common/ui').alert({
                            title: '您已经点过赞啦'
                        });
                    } else {
                        require('common/ui').alert({
                            title: '点赞失败'
                        });
                    }
                });
            }

        });
    }

    // 初始化DOM
    function initDOM() {
        // 结果页背景图
        var bgImg = [
            "http://imgs.genshuixue.com/0cms/d/file/content/2016/12/585c90a50d2cc.png",
            "http://imgs.genshuixue.com/0cms/d/file/content/2016/12/585c98c0df345.png",
            "http://imgs.genshuixue.com/0cms/d/file/content/2016/12/58635f08357eb.png",
            "http://imgs.genshuixue.com/0cms/d/file/content/2016/12/586222a0c45f6.png",
            "http://imgs.genshuixue.com/0cms/d/file/content/2016/12/586222b27d36d.png",
            "http://imgs.genshuixue.com/0cms/d/file/content/2016/12/586222c025344.png",
            "http://imgs.genshuixue.com/0cms/d/file/content/2016/12/586222cc1d0d6.png"
        ];
        // 随机获取结果页背景图索引
        var randomIndex = Math.floor(0 + (Math.random() * bgImg.length));
        // 初始化需要的DOM
        indexContent = $('.index > .content');
        resultContent = $('.result > .content');
        qiuqian = resultContent.find('.qiuqian-wrap');
        isIndex = Boolean(indexContent.length);
        if (!isIndex) {
            bottomInfo = resultContent.find('.bottom-info');
            // 随机显示背景图
            resultContent.prev('img').data('src', bgImg[randomIndex]);
        }
    }

    // 设置分享
    function setShareInfo() {
        var curUrl = location.href;
        var shareInfoTitle;
        var shareInfoCont;
        var img;
        // 分享url
        var url;
        // if (isShare) {
        //     url = curUrl;
        // } else if (isIndex && !isShare) {
        //     url = curUrl + '?source=1';
        // } else if (!isIndex && !isShare) {
        //     url = curUrl + '&source=1';
        // }
        // 修正分享参数 By shubaiqiao
        if (isShare) {
            url = curUrl;
        } else if (location.href.indexOf('?') === -1) {
            url = curUrl + '?source=1';
        } else {
            url = curUrl + '&source=1';
        }
        // 设置分享信息
        if (isIndex) {
            shareInfoTitle = '抽一枚教培人的新年签，开启2017全年好运气';
            shareInfoCont = '新的一年 从美好开始';
            img = 'http://imgs.genshuixue.com/0cms/d/file/content/2016/12/585e2df759f29.jpg';
        } else {
            shareInfoTitle = resultContent.find('.name').text() + '将在2017年' + resultContent.find('.text-title').text() + ', 快来看看你的运势!';
            shareInfoCont = resultContent.find('.text-right').text() + resultContent.find('.text-left').text();
            img = resultContent.find('.avatar').attr('src');
        }

        setShare({
            title: shareInfoTitle,
            content: shareInfoCont,
            img: img,
            url: url
        });
    }



    return function() {
        initDOM();
        // 获取用户信息
        userInfo = user.info;
        // 判断老师是否登录
        isTeacher = userInfo ? (userInfo.type == 0) : false;
        // 通过请求参数判断是否为分享的页面
        isShare = location.search.indexOf('source') !== -1;
        // 进入index页
        if (isIndex) {
            goResult();
        }
        // 进入结果页
        else {
            if (isShare) {
                qiuqian.css('transform', 'translateX(0)');
                qiuqian.css('-webkit-transform', 'translateX(0)');
                bottomInfo.removeClass('hide');
            }
            initResAnimate();
            resAllHref();
            goPraise();
        }

        setShareInfo();
        lazyLoadImage.init();
    }
});
