
/**
 * @file 活动页面 - 聚惠学分享按钮
 * @author zhengjunxin
 */
define(function (require, exports) {
    'use strict';

    var Popup = require('cobble/helper/Popup');
    var Slider = require('common/component/Slider');
    var bindScroll = require('common/bindScroll');
    var lazyImage = require('common/lazyImage');
    var ClickMonitor = require('common/component/ClickMonitor');
    var store = require('common/store');
    var cookie = require('cobble/util/cookie');

    /**
     * 初始化轮播图
     *
     * @return
     */
    function initCarousel() {

        new Slider({
            element: $('.promotion-slider-container'),
            itemSelector: '.promotion-slideritem',
            iconSelector: '.promotion-slider-navitem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 150,
            onChange: function (event, data) {
                var item = $('.promotion-slideritem[data-index="' + data.to + '"]', this.element);
                item.addClass('active');
                if (data.from >= 0) {
                    $('.promotion-slideritem[data-index="' + data.from + '"]', this.element).removeClass('active');
                }
            }
        });

    }

    //展示上报
    function showUpcount(query,stype){
        var stypes = $(query).find(".course-link-wrapper");
        var data = "";
        for(var i=0;i<stypes.length;i++){
            var item = $(stypes[i]);
            data += item.attr("data-number")+",";
        }
        data = data.substr(0,data.length-1);
        var url = 'http://click.genshuixue.com/sl.gif';
        var params={
            type : "search",
            stype : stype,
            qid : store.get("log_id"),
            data : data
        }
        WAT.send(url,params);
    }
    //统计上报
    function initUpCount(){

        showUpcount("#live-course","juhuixue_1");
        showUpcount("#video-course","juhuixue_2");
        showUpcount("#offline-course","juhuixue_3");
        showUpcount("#one2one-course","juhuixue_4");

        var container = $(document.body);
        container.on('click', '[data-stype]', function (e) {
            var element = $(this);
            var stype = element.attr("data-stype");
            var number = element.data('number');
            var uid = cookie.get('PHPSESSID');
            var url = 'http://click.genshuixue.com/w.gif';
            var time = (new Date()).getTime();
            var userId = store.get('user').id ? store.get('user').id : -1;
            var rank = element.parent().attr('data-index');

            var params = {
                type : 'search',
                stype : stype,
                qid : store.get("log_id"),
                uid : uid ? uid : '',
                t : time,
                user_id : userId,
                item_id : number.split(",")[0],
                item_type: number.split(",")[1],
                rank : rank
            }
            WAT.send(url,params);
        });
    }










    /**
     * 初始化百度分享
     *
     * @return
     */
    function initBaiduShare() {
        var container = $('.live-course');
        new Popup({
            element: container.find('.badge'),
            layer: container.find('.baidu-share'),
            show: {
                trigger: 'click'
            },
            hide: {
                trigger: 'click'
            }
        });
    }

    /**
     * 顶导吸顶
     */
    function initBannerNav() {

        var nav = $('#header');
        var banner = $('#banner');
        var userInfoHeight = $('#site-nav').height();
        var navHeight = nav.height();
        var containerOffsets = [];
        var autoSite = true;

        // 高亮当前导航
        var hilightNav = function (currentOffset, containerOffsets) {
            var len = containerOffsets.length;
            var container;
            while (len--) {
                container = containerOffsets[len];
                if (currentOffset >= container.offsetTop) {
                    break;
                }
            }
            container.nav.addClass('active').siblings().removeClass('active');
        };

        // 吸顶效果
        var bannerTop = function(){

            //吸顶样式
            var scrollTop = $(window).scrollTop();
            if (scrollTop >= userInfoHeight) {
                nav.addClass('nav-fixed');
                banner.addClass('fixed-nav');
            } else {
                nav.removeClass('nav-fixed');
                banner.removeClass('fixed-nav');
            }

            //滚动高亮
            autoSite && hilightNav(scrollTop, containerOffsets);
        }


        // 初始化每个容器的offset
        $('.privilege-nav .privilege-nav-item', nav).each(function (){
            containerOffsets.push(
                {
                    offsetTop: $($('a', this).attr('href')).offset().top - navHeight,
                    nav: $(this)
                }
            );
        });

        // 滚动吸顶
        bindScroll(window, bannerTop);

        // 初始化
        bannerTop();

        // 点击选中
        nav.on('click', '.privilege-nav-item', function (event) {
            event.preventDefault();
            autoSite = false;
            $(this).addClass('active').siblings().removeClass('active');
            var offsetTop = $($(this).find('a').attr('href')).offset().top;
            offsetTop = offsetTop - navHeight;
            setTimeout(function() {
                $("html, body").stop().animate({scrollTop: (offsetTop + 'px')}, 1000, function() {
                    autoSite = true;
                });
            }, 0);
        });

    }

    exports.init = function () {

        // 初始化轮播图
        initCarousel();

        // 初始化顶导
        initBannerNav();

        initUpCount();

        // 图片懒加载
        lazyImage.init();

        // 监控需求
        var clickMonitor = new ClickMonitor({
            monitorUrl: '',
            isSend : false,
            useDataHref: true
        });

        // 修复IE8 点击button不冒泡的bug
        $('.class-list li button').click(function (event) {
            $(this).parents('.pay-button').click();
            return false;
        });
    }
});