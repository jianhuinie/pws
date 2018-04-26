/***
    @file 名师排行页面
    @author shubaiqiao
    @date 2016-11-28
**/

define(function (require){
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var app = require('common/app');
    var openAppWindow = require('common/openAppWindow');
    var template = require('artTemplate');
    var setShare = require('common/share/initialize');
    var Loading = require('common/ui/Loading/index');

    var itemRender = template.compile(require('text!./item.tpl'));
    var refreshRender = template.compile(require('text!./refresh.tpl'));
    var emptyRender = template.compile(require('text!./empty.tpl'));

    var container = $('.container');
    var type = 0;
    var lastScroHeight = $('.more-flag').position().top;
    var loadFlag = true;
    var nextPage = 1;
    var hasMore = true;

    function initEvent(data) {
        var tab = container.find('.tab');
        tab.on('click', '.change', function () {
            if (!$(this).hasClass('active')) {
                tab.find('.change').removeClass('active');
                $(this).addClass('active');
                tabChange(data, $(this).data('type'));
            }
        });
        nextPage = data.pager.next_page;
        hasMore = data.pager.has_more;
        initRefresh(data);
        initSkip();
    }

    function initSkip() {
        var container = $(".content");
        container.on('click', '.item, .champion-banner', function (e) {
            if ($(e.target).hasClass('vipBtn')) {
                return ;
            }
            var target = $(e.currentTarget);
            var url = target.data('url');
            if (app.isApp()) {
                app.openNewWindow(url);
            } else {
                location.href = url;
            }
        });
    }

    // 刷新初始化
    function initRefresh(data) {
        lastScroHeight = $('.more-flag').position().top;
        if (lastScroHeight > window.innerHeight) {
            $(window).on('scroll', refresh);
            refresh(data);
        }
    }

    // 分享
    function initShare(data) {
        var shareData = data.share;
        var shareConfig = shareData;
        var key;

        // 初始化默认分享信息
        for (key in shareConfig['share_weixin']) {
            shareConfig[key] = shareConfig['share_weixin'][key];
        }

        setShare(shareConfig);
    }

    /**
     * [点击tab发送异步请求切换榜单类型]
     * @param  {[type]} data [新的页面填充的数据]
     * @param  {[type]} type [榜单类型]
     * @return {[type]}      [description]
     */
    function tabChange(data, Mytype) {
        var url = '/tcenter/top-teacher-rank/getRankIndex';
        var loading = new Loading();
        loading.show();
        service.post(url, {
            type: Mytype,
            page: 1
        }, function (response) {
            if (response.code == 0) {
                container.find('.content').empty();
                if (response.data.items.length === 0) {
                    container.find('.content').append(emptyRender({}));
                    lazyLoadImage.init();
                    return;
                }
                container.find('.content').append(itemRender({
                    itemData: response.data
                }));
            }
            type = Mytype;
            initRefresh(data);
            loadFlag = true;
            nextPage = data.pager.next_page;
            hasMore = data.pager.has_more;
            lazyLoadImage.refresh(true);
            lazyLoadImage.init();
            loading.hide();
        });
    }

    /**
     * [刷新有关的操作]
     * @param  {[type]} data [刷新的数据]
     * @return {[type]}      [description]
     */
    function refresh(data) {
        lastScroHeight = $('.more-flag').position().top;
        if (window.scrollY + window.innerHeight >= lastScroHeight) {
            // 判断article
            if (loadFlag == false) {
                return false;
            }
            if (hasMore) {
                loadFlag = false;
                $('.has-more').show();
                $('.typing-loader').addClass('typing');
                var url = '/tcenter/top-teacher-rank/getRankIndex';
                // 判断article是否为空
                service.post(url, {
                    type: type,
                    page: nextPage
                }, function (response) {
                    // 将获得的内容加在网页后面
                    if (response.code == 0) {
                        var refreshData = response.data;
                        var dom = refreshRender({
                            renderData: refreshData
                        });
                        container.find('.has-more').before(dom);
                        $('.has-more').hide();
                        $('.typing-loader').removeClass('typing');
                        nextPage = response.data.pager.next_page;
                        hasMore = response.data.pager.has_more;
                        lazyLoadImage.init();
                    }
                    loadFlag = true;
                });
            } else {
                $('.has-more').hide();
                $('.typing-loader').removeClass('typing');
                $('.no-more').show();
                lastScroHeight = 10000000000;
            }
        }
    }

    return function (page_data){
        initEvent(page_data);
        initShare(page_data);
        lazyLoadImage.init();
        openAppWindow.init();
    };
});