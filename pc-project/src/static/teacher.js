/**
 * @file 老师介绍页面
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';

    var Carousel = require('cobble/ui/Carousel');
    var VideoDialog = require('common/component/VideoDialog');

    exports.init = function() {

//        $('.tab li').mouseenter(
//                function() {
//
//                    var target = $(this);
//
//                    target
//                            .siblings()
//                            .removeClass('active');
//
//                    target.addClass('active');
//                    var index = target.index();
//
//                    var content = $('.tab-content > div');
//                    content.removeClass('active');
//                    content.eq(index).addClass('active');
//
//                }
//        );

        /**
         * 弹出教师视频
         */
        $('#main')
                .on('click', '.video-thumbnail, #intro-video', function(e) {

                    var element = $(this);
                    var url = element.data('video');
                    var title = element.data('name');

                    new VideoDialog({
                        url: url,
                        title: title
                    });

                })
                .on('click', '.action-video-link', function(e) {

                    e.preventDefault();

                    var element = $(this);
                    var url = element.prop('href');
                    var title = element.text();

                    new VideoDialog({
                        url: url,
                        title: title
                    });
                });

//        var container = $('.action-area');
//        // 初始化轮播
//        new Carousel({
//            element: container,
//            trigger: 'click',
//            iconSelector: '.number-item',
//            prevSelector: '.icon-chevron-left',
//            nextSelector: '.icon-chevron-right',
//            itemSelector: '.action-img',
//            animation: function(data) {
//                container.find(this.itemSelector).eq(data.from).hide();
//                container.find(this.itemSelector).eq(data.to).show();
//                container.find('.action-number')
//                        .removeClass('action-number-' + (data.from + 1))
//                        .addClass('action-number-' + (data.to + 1));
//            }
//        });

//        // 为什么选择跟谁学
//        $('.big-video').hover(function() {
//            $(this).addClass('big-video-hover');
//        }, function() {
//            $(this).removeClass('big-video-hover');
//        }).click(function() {
//            new VideoDialog({
//                url: 'http://www.genshuixue.com/video/view/1701',
//                title: '跟谁学等你来'
//            });
//        });

//新版视频播放：
        function initVideoDialog() {
            var hostname = location.hostname;
            var path = 'http://www.genshuixue.com/video/view/5583';
            var newVideoDialog = function(e) {
                e.preventDefault();
                new VideoDialog({
                    title: '老师入驻指南',
                    url: path
                });
            };
            $('.video').on('click', newVideoDialog);
        }
        ;
        initVideoDialog();


        function initVideoDialog2() {
            var hostname = location.hostname;
            var path = 'http://www.genshuixue.com/video/view/1915';
            var newVideoDialog2 = function(e) {
                e.preventDefault();
                new VideoDialog({
                    title: '在线上课工具介绍',
                    url: path
                });
            };
            $('.video-2').on('click', newVideoDialog2);
        }
        ;
        initVideoDialog2();

    };
});