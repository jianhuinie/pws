/**
 * @file 名师高校团
 * @author tangrongyan
 */



define(function(require, exports) {

    'use strict';

    var Tab = require('cobble/ui/Tab');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var Popup = require('cobble/helper/Popup');
    var VideoDialog = require('common/component/VideoDialog');


    exports.init = function (){


        var container = $('#main');

        new Popup({
            element: container.find('.applay'),
            layer: container.find('.applay .baidu-share'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });


        var video = container.find('.video');
        video.click(function(){
                var element = $(this);
                var url = element.data('video');
                new VideoDialog({
                    url: url
                });

        });


        var side = $('#main').find('.side-nav');
        var sideTop = side.offset().top;

        var top = pageScrollTop();
        var cur;

        var fixedHeader = function() {
            side.addClass('fixed');
        };
        var staticHeader = function() {
            side.removeClass('fixed');
        };
        var apply = function() {
            if (pageScrollTop()+294 > sideTop) {
                fixedHeader();
            }
            else {
                staticHeader();
            }
        };

        apply();

        $(window).scroll(apply);



// course
        var course = $('#main').find('.course');

        if (course.length) {

            var sideTop = course.offset().top;

            var top = pageScrollTop();

            var fixedCourse = function() {
                course.addClass('course-fixed');
            };
            var staticCourse = function() {
                course.removeClass('course-fixed');
            };
            var applyCourse = function() {
                if (pageScrollTop()+ 66 > sideTop) {
                    fixedCourse();
                }
                else {
                    staticCourse();
                }
            };

            applyCourse();

            $(window).scroll(applyCourse);


        };







    }

});