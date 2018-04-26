/**
 * @file 班课基本资料
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';

    var Popup = require('cobble/helper/Popup');
    var Zoom = require('cobble/ui/Zoom');
    var Dialog = require('cobble/ui/Dialog');

    var container = $('#course-profile');

    function slideImage() {
        var box = container.find('.box');
        var scroll = box.find('ul');
        var size = 70 + 10 ;
        var length = scroll.find('li').length;
        var width = length*size;
        var flag = false;
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
            $('.rightbar').removeClass('disablebar');
            if (slide <= 0) {
                $(this).addClass('disablebar');
            }
            flag = true;
            box.animate({scrollLeft:slide+'px'}, 'slow', function(){flag=false;});
            return;
        })

        .on('click', '.rightbar', function() {
            if (flag) { return; }
            var slide = box.scrollLeft() + size;
            if (slide >= width-330+60) {
                return;
            }
            $('.leftbar').removeClass('disablebar');
            if (slide >= width-330-size+60) {
                $(this).addClass('disablebar');
            }
            flag = true;
            box.animate({scrollLeft:slide + 'px'}, 'slow', function(){flag=false;});
            return;
        })

        .on('mouseenter', '.bar', function() {
            $(this).addClass('hoverbar');
        })

        .on('mouseleave', '.bar', function() {
            $(this).removeClass('hoverbar');
        })
    }

    function dateFormat(time) {
        //console.log(time);
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;

        // 天 24*3600
        if (time > 86400) {
            day = Math.floor(time / 86400);
        }
        time %= 86400;

        if (time > 3600) {
            hour = Math.floor(time / 3600);
        }
        time %= 3600;

        if (time > 60) {
            minute = Math.floor(time / 60);
        }
        second = time % 60;

        var time_txt = (day > 9 ? day : '0' + day ) + '天' +
                       (hour > 9 ? hour : '0' + hour) + '时'+
                       (minute > 9 ? minute : '0' + minute) +'分' +
                       (second > 9 ? second : '0' + second) + '秒' ;

                       /*
        console.log('day'+day);
        console.log('hour'+hour);
        console.log('minute'+minute);
        console.log('sceond'+second);*/
        return time_txt;
    }

    exports.init = function() {

        // 滑动图片
        slideImage();

        var popup = new Popup({
            element: container.find('.social-share'),
            layer: container.find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });

        //弹出地图
        container
        .on('mouseenter', '.box li', function() { // 图片切换

            var element = $(this);
            var dataImage = element.data('image');
            var height = element.data('height');
            var target = container.find('.image');
            var img = target.find('img');
            var floater = target.find('.floater');

            container.find('li').removeClass('active');
            element.addClass('active');

            target.data('image',dataImage);
            img.attr('src',dataImage);
            // 设置大图垂直居中
            floater.css({'margin-bottom': '-'+(height/2)+'px'});
        })

        .on('click', '#detail-time', function() {
            $('#nav-course-plan').click();
        })

        var priceTip = container.find('.price-tip');
        if (priceTip[0]) {

            var cur = null,
                begin = null,
                end = null,
                left = null,
                time = priceTip.find('.time');
            if (priceTip.hasClass('price-tip-begin')) {
                cur = priceTip.data('cur');
                begin = priceTip.data('start');
                left = begin - cur;
                var interval = setInterval(function(){
                    time.html( dateFormat(--left) );
                    if (left == 0) {
                        clearInterval(interval);
                    }
                },1000);
            }

            if (priceTip.hasClass('price-tip-end')) {
                cur = priceTip.data('cur');
                end = priceTip.data('end');
                left = end - cur;
                var interval = setInterval(function(){
                    time.html( dateFormat(--left) );
                    if (left == 0) {
                        clearInterval(interval);
                    }
                },1000);
            }
        }

    };

});