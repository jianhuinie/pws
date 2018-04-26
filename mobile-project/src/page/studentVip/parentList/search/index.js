/**
 *wuxuelan
 **/

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var ui = require('common/ui');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var openAppWindow = require('common/openAppWindow');
    var user = require('common/user');
    var setShare = require('common/share/initialize');
    var template = require('artTemplate');
    var liRender = template.compile(require('text!../li.tpl'));
    var env = require('util/env');
    var isWeixin;
    var screenWidth;



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

        var isLoading = false;

        function getCourseIntoTpl(courseInfo) {
            var html = liRender({
                list: courseInfo

            });//screenWidth: screenWidth
            $('.main-list').append(html);
            lazyLoadImage.init();
        }

        function getNextPageContent() {
            if (isLoading) {
                return;
            }
            isLoading = true;
            var nextPage = hDom.data('nextCursor');
            var nextPageUrl = '/student/vip/topic';
            var val = $('#search').val().trim();
            var _params = {
                'current_page': nextPage,
                'render': 'json',
                'keyword': val
            };
            hDom.addClass('loading');
            service.post(nextPageUrl, _params, function (res) {
                var data = res.data;
                if (res.code == 0) {
                    hDom.removeClass('loading');
                    if(data.course_list){
                        getCourseIntoTpl(data.course_list);
                    }
                    updataMoreDom(data.pager.has_more, parseInt(data.pager.current_page) + 1);
                    setTimeout(function () {
                        isLoading = false;
                        if(!data.pager.has_more) {
                            lastScroHeight = 100000000000;
                        } else {
                            lastScroHeight = hDom.position().top;
                            initDom();
                        }
                    },100);
                }
            });
        }

        function initDom() {
            if(window.scrollY + window.innerHeight >= lastScroHeight) {
                getNextPageContent();
            }
        }
        $(window).on('scroll', initDom);
        initDom();
    };

    //分享
    var doShare = function() {
        var shareInfo = {
            title: '亲子课堂，和孩子一同成长！',
            content: '跟谁学为你精心挑选，适合0-12岁孩子爸妈',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577e136a2272e.png'
        };
        setShare(shareInfo);
    };

    //搜索发送ajax
    function doGetList(val) {
        var course_none = $('.none-course');
        var currentPage = 1;
        var url = '/student/vip/topic';
        var _params = {
            'current_page': currentPage,
            'render': 'json',
            'keyword': val
        };
        if (val.length <= 0) {
            ui.remind('请输入活动名称或活动ID');
        }
        else {
            service.post(url,
                _params,
                function (res) {
                    var data = res.data;
                    if (res.code == 0) {
                        console.log(data.course_list);
                        if (data.course_list) {
                            course_none.hide();
                            var html = liRender({
                                list: data.course_list,
                                screenWidth: screenWidth
                            });
                            $('.main-list').html(html).show();
                            lazyLoadImage.init();
                        }
                        else {
                            $('.main-list').hide();
                            course_none.show();
                            lazyLoadImage.init();
                        }
                        var hasMoreClass = $('.has-more');
                        if (data.pager.has_more) {
                            getNextPage();
                            hasMoreClass.show();
                        } else {
                            hasMoreClass.hide();
                        }
                    }
                });
        }
    }

    //搜索
    function search() {
        var icon_delete = $('.delete');
        var sInput = $('#search');
        sInput.on('keyup', function () {
            var val = $(this).val().trim();
            if (val.length > 0) {
                icon_delete.show();
            }
            else {
                icon_delete.hide();
            }
        });
        var searchForm = sInput.closest('form');
        searchForm.on('submit', function () {
          var val = sInput.val().trim();
            doGetList(val);
        });
    }

    //删除
    function deleteSearch() {
        var icon_delete = $('.delete');
        icon_delete.on('click',function () {
            $('#search').val('');
            $(this).hide();
        });
    }
    return function () {
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        screenWidth = window.screen.width;
        if (!isWeixin) {
            // 在微信中上面的nav就不需要了
            $('.nav-bar').show();
        }
        var sInput = $('#search');
        var val = sInput.val().trim();
        if (val.length > 0) {
            doGetList(val);
        }
        search();
        deleteSearch();
        doShare();


    }

});