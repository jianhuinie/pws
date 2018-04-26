/**
 * @file 用于顶端banner
 * @author zengcheng
 */

define(function (require, exports) {
    var Round = require('./round');
    var service = require('common/service');
    var store = require('common/store');
    var cookie = require('cobble/util/cookie');

    var RAVE_SHOW_TIMES = 'raveshowtimes';
    var IS_SHOW_BANNER = 'activity_birthday_banner_status';
    var MAIN_616_URL = 'activity_birthday_url_main';
    var SUB_616_URL = 'activity_birthday_url_sub';
    var NO_NEED_ANIMATE = 'no_need_animate';

    //显示或隐藏不必要的tool
    var toggleTools = function (status) {
        $('#flotage-bottom')[status]();
        $('#flotage-middle')[status]();
        $('#flotage-top')[status]();
        $('.im-toggle-bar')[status]();
    };

    //初始化banner
    var initBanner = function () {
        var banner = $('#ravebanner');
        var host = cookie.get(MAIN_616_URL) || banner.data('href');
        var showTimes = cookie.get(RAVE_SHOW_TIMES) || 0;
        var noNeedAnimate = store.get(NO_NEED_ANIMATE) || false;

        //超过三次不需要动画
        if (+showTimes >= 3 || !!noNeedAnimate) {
            return false;
        }
        else{
            cookie.set(RAVE_SHOW_TIMES, (+showTimes) + 1, {
                domain: '.genshuixue.com',
                path: '/'
            });
        }

        //隐藏小工具栏
        toggleTools('hide');

        setTimeout(function(){
            banner.css('height', '45px');
            banner.removeClass('hiderave');
            banner.animate({height:"1200px"}, 2000, function () {
                $('.main-wrapper', this).show();
            });
        }, 0);

        //初始化旋转特效
        var round = new Round({
            element: $('#raveRound')
        });

        //绑定host
        round.bindHost(cookie.get(SUB_616_URL) || (host + '/sub?'));

        //3s后自动隐藏
        setTimeout(function () {
            banner.animate({height:"54px"}, 1000, function () {
                $('.main-wrapper', this).hide();
                $(this).addClass('hiderave');
            });
            toggleTools('show');
        }, 3000);

    };

    //绑定事件
    var bindEvents = function () {
        var banner = $('#ravebanner');
        var host = cookie.get(MAIN_616_URL) || banner.data('href');
        //跳转活动详情页
        banner.click(function (e) {
            var url = host;
            var target = $(e.target);
            if (target.hasClass('anchor')) {
                url = url + target.attr('href');
            };
            window.open('http://www.genshuixue.com/track/source?id=gsx_616dafuceng_pc&url=' + encodeURIComponent(url), '_blank');
        });

        //banner点击
        $('#ravebanner .banner-img').click(function (e) {
            if (window.location.pathname == '/') {
                window.open('http://www.genshuixue.com/track/source?id=gsx_616shouyebanner_pc&url=' + encodeURIComponent(host), '_blank');
            } else {
                window.open('http://www.genshuixue.com/track/source?id=gsx_616xiding_pc&url=' + encodeURIComponent(host), '_blank');
            }
            return false;
        });

        //关闭活动
        $('#ravebanner > .icon-close').click(function () {
            banner.remove();
            return false;
        });
    };

    exports.init = function () {

        var banner = $('#ravebanner');
        var isShowBanner = cookie.get(IS_SHOW_BANNER);

        if (banner.length <= 0) {
            return false;
        }

        //是否显示banner
        if (isShowBanner == 1){
            banner.show();
            bindEvents();
            //初始化banner
            initBanner();
        }
        else if(typeof isShowBanner !== 'undefined') {
            return false;
        }
        else {
            service.setActicityCookies()
                .done(function () {
                    isShowBanner = cookie.get(IS_SHOW_BANNER);
                    if (isShowBanner == 1) {
                        banner.show();
                        bindEvents();
                        //初始化banner
                        initBanner();
                    }
                });
        }

    };
});