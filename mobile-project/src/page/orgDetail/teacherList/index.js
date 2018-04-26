define(function (require) {

    'use strict';

    var $ = require("zepto");
    var lazyLoadImage = require('common/lazyLoadImage');
    var app = require('common/app');
    var service = require("common/service");
    var setShare = require('common/share/initialize');
    var template = require('artTemplate');
    var liRender = template.compile(require("text!../render/teacherListRender.tpl"));
    var pageData;
    var page = 2;
    var ajaxUrl = '';
    var ajaxFlag = true;

    var intoNextContent = function () {
        $('.item').on('click', function () {
            var that = $(this);
            var url = that.data('url');
            if(app.isApp()) {
                app.openNewWindow(url);
            } else {
                location.href = url;
            }
        })
    }
    var toShare = function () {
        var shareInfo = {
            title: pageData.share_info.title,
            content: pageData.share_info.content,
            img: pageData.share_info.img
        };
        setShare(shareInfo);
    }


        //自动加载还有更多
    var getNextPage = function () {
        var hDom = $('.has-more');
        if (!hDom.length) {
            return;
        }

        var lastScroHeight = hDom.position().top;

        function updataMoreDom(hasMore, nextCursor) {
            if (hasMore && nextCursor) {
                hDom.attr('data-next-cursor', nextCursor);
                hDom.show();
            } else {
                hDom.hide();
            }
        }

        if (hDom.length) {
            updataMoreDom(1, 2);
        }

        var lastIndex = 0;
        var isLoading = false;

        function getCourseIntoTpl(courseInfo) {
            var html = liRender({
                data: courseInfo,
                //screenWidth: screenWidth
            });
            $('.container').append(html);
            lazyLoadImage.init();
            intoNextContent();
        }

        function getNextPageContent() {
            if (isLoading) {
                return;
            }
            isLoading = true;
            var nextPage = hDom.data('nextCursor');
            var _params = {
                //'number': pageData.base_info.number,
                'next_cursor': page
            };
            hDom.addClass('loading');
            service.post(ajaxUrl, _params, function(res) {
                var data = res.data;
                if (res.code == 0) {
                    hDom.removeClass('loading');
                    if (data) {
                        getCourseIntoTpl(data);
                    }
                    page = parseInt(data.pager.next_cursor);
                    updataMoreDom(data.pager.has_more, parseInt(data.pager.next_cursor));
                    setTimeout(function() {
                        isLoading = false;
                        if (!data.pager.has_more) {
                            lastScroHeight = 100000000000;
                        } else {
                            lastScroHeight = hDom.position().top;
                            initDom();
                        }
                    }, 100);
                }
            });
        }

        function initDom() {
            if (window.scrollY + window.innerHeight >= lastScroHeight) {
                getNextPageContent();
            }
        }
        $(window).on('scroll', initDom);
        //initDom();
    }


    return function (page_data) {
        pageData = page_data;
        lazyLoadImage.init();
        intoNextContent();
        toShare();
        ajaxUrl = pageData.hot_teacher.more_url;

        if(pageData.hot_teacher.more_url) {
            getNextPage();
            ajaxUrl = pageData.hot_teacher.more_url;
            $('.has-more').show();
        }
    }

});