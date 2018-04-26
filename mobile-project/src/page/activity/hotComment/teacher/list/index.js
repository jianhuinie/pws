/**
 * Created by nanci
 */
define(function(require) {

    'use strict';

    var $ = require('zepto');
    var app = require('common/app');
    var artTemplate = require('artTemplate');;
    // var artTemplate = require("artTemplate");
    var listTeacherRender = artTemplate.compile(require('text!./listTeacher.tpl'));
    var DropLoad = require('common/ui/DropLoad/index');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var setShare = require('common/share/initialize');

    var container = $('#page_main');

    return function(page_data) {

        lazyLoadImage.init();

        container.on('a', 'click', function () {
            var linkUrl = $(this).attr('href');
            if (app.isApp()) {
                app.openNewWindow(linkUrl);
            }
            else {
                location.href = linkUrl;
            }
        });

        var shareInfo = {
            title: '热门评价老师榜新鲜出炉！',
            content: '天呐，没想到学生眼中的我竟然是这样！',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/01/587debfcaca59.png',
            'share_pyq': {
                title: '天呐，没想到学生眼中的我竟然是这样！',
                content: '热门评价老师榜新鲜出炉！',
                img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/01/587debfcaca59.png'
            }
        };
        setShare(shareInfo);

        var listTeacher = $('.list-teacher');
        var loadMoreParam = {};
        loadMoreParam.pageNo = 2;
        loadMoreParam.hasMore = true;

        // var screenHeight = screen.availHeight;
        // var lastItemTop = $('.list-teacher .unit').last().offset().top;
        // var flag = true;
        // $(window).scroll(function loadMoreFunc() {
        //     var scrollTop = $(window).scrollTop();
        //     if (scrollTop + screenHeight > lastItemTop && loadMoreParam.hasMore && flag) {
        //         flag = false;
        //         service.post('/activity/HotCommentsTeacherRankList', {
        //             page: loadMoreParam.pageNo
        //         }, function (res) {
        //             if (res.code == 0) {
        //                 flag = true;
        //                 var html = listTeacherRender({
        //                     data: res.data.teacher_list
        //                 });
        //                 listTeacher.append(html);
        //                 lazyLoadImage.init();
        //                 loadMoreParam.hasMore = !!res.data.pager.has_more;
        //                 loadMoreParam.pageNo += 1;
        //             }
        //         });
        //     }
        //     else if (!loadMoreParam.hasMore) {
        //         listTeacher.after('<p class="tac no-more-text">已加载全部热评老师，快努力上榜吧~</p>');
        //         $(window).unbind('scroll', loadMoreFunc);
        //     }
        // });

        var loadMoreFunc = function () {
            var promise = new Promise(function (resolve, reject) {
                service.post('/activity/HotCommentsTeacherRankList', {
                    page: loadMoreParam.pageNo
                }, function (res) {
                    if (res.code == 0 && loadMoreParam.hasMore) {
                        var html = listTeacherRender({
                            data: res.data.teacher_list
                        });
                        listTeacher.append(html);
                        lazyLoadImage.init();
                        loadMoreParam.hasMore = !!res.data.pager.has_more;
                        loadMoreParam.pageNo += 1;
                        resolve(html);
                    }
                    else if (res.code == 0 && !loadMoreParam.hasMore) {
                        reject(loadMoreParam.hasMore);
                        listTeacher.after('<p class="tac no-more-text">已加载全部热评老师，快努力上榜吧~</p>');
                    }
                });
            });
            return promise;
        };

        var dropLoad = new DropLoad({
            element: listTeacher,
            callback: loadMoreFunc,
            isAutoLoading: true
        });

    }
});