/**
 * @file 可授课时间
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');
    var ImageDialog = require('common/component/ImageDialog');
    var store = require('common/store');
    var service = require('common/service');
    var container = $('#teacher-media');

    function slideImage() {
        var box = container.find('.media-box');
        var scroll = box.find('ul');
        var size = 130 + 8 ;
        var length = scroll.find('li').length;
        var width = length*size - 8;
        var flag = false;
        var counter = 6; //多加载一张

        if (length < 5) {
            return;
        }
        scroll.css({'width':width});

        container

        .on('click', '.leftbar', function() {
            if (flag){return;}
            var slide = box.scrollLeft() - size;

            if (slide <= -size) {
                return;
            }


            if (slide <= 0) {
                $(this).hide();
            }
            if (slide < width-682) {
                container.find('.rightbar').show();
            }

            flag = true;
            box.animate({scrollLeft:slide+'px'}, 'fast', function(){flag=false;});
            return;
        })

        .on('click', '.rightbar', function() {
            if (flag) { return; }
            var slide = box.scrollLeft() + size;

            if (slide >= width-130) {
                return;
            }

            if (slide > 0) {
                container.find('.leftbar').show();
            }
            if (slide >= width-682) {
                $(this).hide();
            }
            flag = true;
            box.animate({scrollLeft:slide + 'px'}, 'fast', function(){flag=false;});

            // 延迟加载
            if (counter <= length) {
                var element = container.find('li img:eq('+(counter++)+')');
                if (element[0] && !element.attr('src')) {
                    element.attr('src',element.data('img'));
                }
            }

            return;
        })
    }
    // 获取课程列表
    function getMediaList(type, selector, key) {

        //var sortBy = sortSelect ? sortSelect.getValue() : 'display_order';
        var sortBy = 'update_time';

        return service
        .getTeacherVideoPhotoList({
            teacherNum: store.get('teacherNum'),
            page: store.get('mediaPage'),
            pageSize: 20,
            showType: type
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                var tpl = data.tpl[key];
                var video_list = data.video_list;
                var photo_list = data.photo_list;


                var content = container.find(selector);

                /*if (video_list.length > 0 || photo_list.length > 0) {
                    container.show();
                } else if (type == 2) {
                    container.show();
                } else {
                    container.hide();
                }*/
                if (video_list.length + photo_list.length < 1) {

                    container.find('.no-media').html('<div class="no-media-icon"></div><span>老师太懒了，还没有添加照片、视频！</span>');
                    container.find('.no-media').css({'height': '340px'});

                } else {
                    content.html(tpl);
                }

            }
        });
    }

    exports.init = function () {
        slideImage();

        container
        .on('click', '[data-page]', function (e) {
            var element = $(this);
            store.set('mediaPage', element.data('page'));
            getMediaList(2,'#media-list-box','media_list');
            return false;
        })
        .on('click', '.player', function (e) {

            var element = $(this);
            var type = element.data('type');
            var title = element.data('name');

            if (type == 'photo') {
                var images = container.find('.photo');
                var index = images.index(container.find('.active'));

                var data = images.map(function (index, item) {
                    var element = $(item);
                    var name = element.data('name');
                    return {
                        url: element.data('image'),
                        title: store.get('teacherName') + (name ? (' - ' + name) : '')
                    };
                });

                new ImageDialog({
                    data: data,
                    index: index
                });
            }

            if (type == 'video') {
                new VideoDialog({
                    url: element.data('video'),
                    title: store.get('teacherName') + (title ? (' - ' + title) : ''),
                    videoWidth: 674,
                    videoHeight: 379
                });
            }
        })
        .on('click', 'li', function (e) {
            var element = $(this);
            var img = element.data('image');
            var fitimg = element.data('fitimage');
            var fitheight = element.data('fitheight');
            var player = container.find('.player');

            container.find('li').removeClass('active');
            element.addClass('active');

            if (!$('#main').hasClass('media-active')) {
                var playerImg = element.data('video')
                                ? player.find('.wrapper-video .player-img')
                                : player.find('.wrapper-photo .player-img');

                var playerTitle = container.find('.player-title');

                player.data('type',element.data('type'));
                player.data('name',element.data('name'));

                if (element.data('video')) {
                    player.data('video',element.data('video'));
                    playerImg.attr('src', img);
                    playerTitle.html(element.data('name'));
                    player.find('.wrapper-photo').hide();
                    player.find('.wrapper-video').show();
                } else  {
                    player.data('image',element.data('image'));
                    playerImg.attr('src', fitimg);
                    container.find('.wrapper-photo .floater').css({'margin-bottom':'-'+(fitheight/2)+'px'});
                    playerTitle.html(element.data('name'));
                    player.find('.wrapper-photo').show();
                    player.find('.wrapper-video').hide();
                }

                var playerButton = container.find('.teacher-player');
                if (element.data('type') == 'video') {
                    playerButton.show();
                } else {
                    playerButton.hide();
                }
            } else {
                var type = element.data('type');
                var title = element.data('name');

                if (type == 'photo') {
                    var images = element.parent().find('.photo');
                    var index = images.index(element.parent().find('.active'));
                    var data = images.map(function (index, item) {
                        var element = $(item);
                        var name = element.data('name');
                        return {
                            url: element.data('image'),
                            title: store.get('teacherName') + (name ? (' - ' + name) : '')
                        };
                    });

                    new ImageDialog({
                        data: data,
                        index: index
                    });
                }

                if (type == 'video') {
                    new VideoDialog({
                        url: element.data('video'),
                        title: store.get('teacherName') + (title ? (' - ' + title) : '')
                    });
                }
            }

        })
        // 查看更多视频和照片
        /*.on('click', '.more-media', function (e) {
            $('#teacher-profile .list-item:eq(2)').click();
        })*/
    };

});