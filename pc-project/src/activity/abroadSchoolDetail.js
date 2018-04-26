/**
 * @file 留学库
 * @author tangrongyan
 */



define(function(require, exports) {

    'use strict';

    var Tab = require('cobble/ui/Tab');
    var Popup = require('cobble/helper/Popup');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var VideoDialog = require('common/component/VideoDialog');

    exports.init = function (){

            $('.video-all')
                    .on('click', '.trrigle', function(e) {

                        var element = $(this);
                        var url = element.data('video');
                        var title = element.data('intro');

                        new VideoDialog({
                            url: url,
                            title: title
                        });
                    })
                    .on('click', '.icon-play-o', function(e) {

                        var element = $(this);
                        var url = element.data('video');
                        var title = element.data('intro');

                        new VideoDialog({
                            url: url,
                            title: title
                        });
                    })


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




    }

});