/***
    @file 跟谁学大学二级页面
    @author shubaiqiao
    @date 2016-10-09
**/

define(function (require){
    'use strict';
    var $ = require('zepto');
    var service = require('common/service');
    var app = require('common/app');
    var openAppWindow = require("common/openAppWindow");
    var doShare = require('common/share/doShare');
    var setShare = require('common/share/initialize');
    var searchInput = require('../ui/search/index');
    var lazyLoadImage = require('common/lazyLoadImage');
    var artTemplate = require('../../../../lib/artTemplate/template');
    var render = artTemplate.compile(require('text!./item.tpl'));

    var lastScroHeight = $('.more-flag').position().top;
    var shareConfig = {};
    var container = $('.container');
    var i;
    var addDom = '';
    var page = 1;
    var loadFlag = true;
    var sortType = 1;
    var dom = '';

    var type;
    var current;

    function initSearch() {
        searchInput.init();
    }

    // 分享
    function initShare(data) {
        var shareData = data.share;

        shareConfig['share_pyq'] = shareData.share_pyq;
        shareConfig['share_weixin'] = shareData.share_weixin;

        shareConfig['share_qq'] = shareData.share_qq;

        shareConfig['share_qzone'] = shareData.share_qzone;

        shareConfig['share_weibo'] = shareData.share_weibo;

        shareConfig['share_sms'] = shareData.share_sms;

        shareConfig['share_mail'] = shareData.share_email;

        shareConfig['copy_link'] = shareData.copy_link;

        shareConfig.content = shareConfig['share_weixin'].content;
        shareConfig.url = shareConfig['share_weixin'].url;
        shareConfig.title = shareConfig['share_weixin'].title;
        shareConfig.img = shareConfig['share_weixin'].img;


        setShare(shareConfig);

    }

    function initEvent(data) {
        initSearch();
        var infoData = data.info;
        var list = container.find('.list');
        list.each(function (k, v) {
            $(v).click(function () {
                if (app.isApp()) {
                    app.openNewWindow(infoData[k].url);
                } else {
                    location.href = infoData[k].url;
                }
            });
        });
        var tab = container.find('.border-cata');
        tab.each(function (k, v) {
            $(v).click(function () {
                $('.catalogue').find('.head-font').removeClass('head-font');
                $(this).find('a').addClass('head-font');
                changeOrder(k + 1);
            });
        });
        initRefresh();
    }

    function initRefresh() {
        if (lastScroHeight > window.innerHeight) {
            $(window).on('scroll', refreshDom);
            refreshDom();
        }
    }

    /**
     * 解析url将所有以get形式发过来的参数封装成对象
     * @return {[Object]} [封装好的参数对象]
     */
    function getPara() {
        var url = location.search.slice(1);

        var res = url.split('&');
        var obj = {},
            i = 0,
            s,
            len = res.length;
        for (; i < len; i++) {
            s = res[i].split('=');
            obj[s[0]] = s[1];
        }

        return obj;
    }

    function refreshDom() {
        type = getPara().type;
        lastScroHeight = $('.more-flag').position().top;
        if (window.scrollY + window.innerHeight >= lastScroHeight) {

            if (loadFlag) {
                loadFlag = false;
                $('.has-more').show();
                $('.typing-loader').addClass('typing');
                page++;
                service.post('/tcenter/gsx_college/list', {
                    page: page,
                    type: type,
                    sort_type: sortType
                }, function (response) {
                    // 将获得的内容加在网页后面
                    var articleData = response.data.info;
                    // 判断article是否为空
                    if (articleData.length && articleData.length !== 0) {
                        var len = articleData.length;
                        dom = '';
                        for (i = 0; i < len; i++) {
                            var addDom = render({
                                $list: articleData[i]
                            });
                            dom += addDom;
                        }
                        // (function (i) {
                        //     current.click(function () {
                        //         if (app.isApp()) {
                        //             app.openNewWindow(articleData[i].url);
                        //         } else {
                        //             location.href = articleData[i].url;
                        //         }
                        //     }
                        //     );
                        // })(i);
                        container.find('.has-more').before(dom);
                        // current = container.find('.has-more').prev();
                        $('.content').on('click', '.list', function (e) {
                            var target = $(e.currentTarget);
                            var url = target.data('url');
                            if (app.isApp()) {
                                app.openNewWindow(url);
                            } else {
                                location.href = url;
                            }
                        });
                        $('.has-more').hide();
                        $('.typing-loader').removeClass('typing');
                        loadFlag = true;
                        lazyLoadImage.init();
                    }
                    else {
                        $('.has-more').hide();
                        $('.typing-loader').removeClass('typing');
                        $('.no-more').show();
                        lastScroHeight = 10000000000;
                    }
                });
            }
        }
    }

    function changeOrder(mySortType) {
            loadFlag = true;
            type = getPara().type;
            page = 1;
            service.post('/tcenter/gsx_college/list', {
                page: page,
                type: type,
                sort_type: mySortType
            }, function (response) {
                // 此处获取新获取的条目，操作DOM替换原先的内容。
                var data = response.data.info;
                var len = data.length;
                for (i = 0 ,addDom = ''; i < len; i++) {
                    var dom = render({
                        $list: data[i]
                    });
                    addDom += dom;
                }
                // $(addDom).each(function (k, v) {
                //     $(v).click(function () {
                //         if (app.isApp()) {
                //             app.openNewWindow(data[k].url);
                //         } else {
                //             location.href = data[k].url;
                //         }
                //     });
                // });
                $('.content').on('click', '.list', function (e) {
                    var target = $(e.currentTarget);
                    var url = target.data('url');
                    if (app.isApp()) {
                        app.openNewWindow(url);
                    } else {
                        location.href = url;
                    }
                });
                var moreDom = ''
                +'<div class="has-more">'
                +    '<div class="typing-loader"></div>'
                +'</div>'
                +'<div class="no-more">'
                +    '<div>没有更多了</div>'
                +'</div>'
                +'<div class="more-flag"></div>';
                container.find('.content').empty().append(addDom);
                container.find('.content').append(moreDom);
                initRefresh();
                sortType = mySortType;
                lazyLoadImage.init();
            });
        }

    return function (page_data){
        initEvent(page_data);
        initShare(page_data);
        lazyLoadImage.init();
    };
});