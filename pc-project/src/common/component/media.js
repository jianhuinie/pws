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

    exports.init = function () {
        slideImage();

        container
            .on('click', '.player', function (e) {

                var element = $(this);
                var title = element.data('name');

                new VideoDialog({
                    url: element.data('video'),
                    title:  title
                });
            })
            .on('click', 'li', function (e) {
                var element = $(this);
                var img = element.data('image');
                var player = container.find('.player');

                container.find('li').removeClass('active');
                element.addClass('active');

                if (!$('#main').hasClass('media-active')) {
                    var playerImg =  player.find('.wrapper-video .player-img')

                    var playerTitle = container.find('.player-title');

                    player.data('name',element.data('name'));

                    player.data('video',element.data('video'));
                    playerImg.attr('src', img);
                    playerTitle.html(element.data('name'));
                    player.find('.wrapper-video').show();

                    var playerButton = container.find('.teacher-player');
                    playerButton.show();
                } else {
                    var title = element.data('name');

                        new VideoDialog({
                            url: element.data('video'),
                            title:title
                        });
                }

            })
    };

});