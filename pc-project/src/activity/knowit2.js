/**
 * @file 懂行2.0
 * @author tangrongyan
 */



define(function(require, exports) {

    'use strict';

    var Popup = require('cobble/helper/Popup');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var Slider = require('common/component/Slider');
    var lazyImage = require('common/lazyImage');
    var ClickMonitor = require('common/component/ClickMonitor');

    exports.init = function (){

        var clickMonitor = new ClickMonitor({
            monitorUrl: '',
            isSend : false,
            useDataHref: true
        });


        function ff(){
         lazyImage.scanning(true, $('.teacher-list', 'body'));
         lazyImage.scanning(true, $('.org-list-wrapper', 'body'));
         lazyImage.scanning(true, $('.imagelist-datas', 'body'));

        }

        $(window).scroll(ff);



        /**
         * 初始化文字内容
         */
        function initAdContent(ele, data) {
            new Slider({
                element: ele,
                itemSelector: '.special-ad-item',
                duration: 150,
                isVertical: true,
                delay: 2000,
                scrollOneDirection: true,
                onChange: function (event, data) {


                }
            });

        }

        $('.special-header-ads').each(function(index, item){

              initAdContent($('.special-header-ads ul:eq('+index+')'));

        });






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


        // +88px + 90px + 32px + $('#layout').height()
        var side = $('#main').find('.side-nav');
        var fixed_position = $('#layout').height()+88+90+32-14-50-14;
        side.offset({top:fixed_position});

        var sideTop = side.offset().top;

        var top = pageScrollTop();
        var cur;

        var fixedHeader = function() {

           side.addClass('fixed');
        };
        var staticHeader = function() {

            side.removeClass('fixed');
        };
        //begin = 294
        var  begin = 0;
        var apply = function() {
            if (pageScrollTop()+ begin > fixed_position) {
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