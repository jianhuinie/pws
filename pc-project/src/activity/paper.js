/**
 * @file 拍试卷
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var Popup = require('cobble/helper/Popup');
//    var service = require('common/service');
    var ScrollBar = require('cobble/ui/ScrollBar');
    var Tab = require('cobble/ui/Tab');



     //处理“最近入驻”的滚动
    var container = $('.tab-content');
    var lastJoin = container.find('.last-join');

    var initScrollTracker = function (index) {

        var $item = $(lastJoin[index]);

        if ($item.data('scrollbar-inited'))  {
            return;
        }

        var lastJoinWrapper = $item.find('.last-join-wrapper');

        var items = $item.find('li');

        var scrollTrack = $item.next();

        var scrollBar = new ScrollBar({
            panel: $item,
            element: scrollTrack,
            orientation: 'horizontal',
            value: 0
        });

        var max = lastJoinWrapper.width() - (items.outerWidth(true) * 5 - parseInt(items.css('margin-right'), 10));
        var min = 0;
        var length = items.length;
        var isForward = true;

        var setScrollTimer = function() {
            if (length > 5) {
                return setInterval(function() {

                    var value = $item.scrollLeft();

                    if (isForward) {
                        value += 1;
                    }
                    else {
                        value -= 1;
                    }

                    if (value >= max || value <= min) {
                        isForward = !isForward;
                    }

                    $item.scrollLeft(value);
                    scrollBar.refresh();

                }, 20);
            }
            else {
                return null;
            }
        }


        var scrollTimer = setScrollTimer();

        scrollTrack
            .hover(
                function() {
                    clearInterval(scrollTimer);
                },
                function() {
                    scrollTimer = setScrollTimer();
                }
        );

        $item.data('scrollbar-inited', 1)
    }

    initScrollTracker(0)

    exports.init = function() {
        //rank 切换
        $('.star-teacher').each(
                function() {
                    var tab = new Tab({
                        trigger: 'click',
                        navActiveClass: 'active',
                        navSelector: '.tab-nav',
                        contentSelector: '.tab-panel',
                        element: $(this),
                        index: 0
                    });

                    tab.onChange = function (e) {

                        initScrollTracker(e.cobble.index);
                    }
                }
        );

        //点击弹出窗里面的分享按钮：
        function clicked() {
            var container = $(document);
            var apply = $(document);
            apply.delegate('.share', 'click', function() {

                var popup = new Popup({
                    element: container.find('.share'),
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
                $('.baidu-share').show();



            });
        }
        clicked();


    };
});