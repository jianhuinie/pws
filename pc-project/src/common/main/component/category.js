/**
 * @file 初始化左侧导航
 * @author huahua
 */
define(function (require) {

    var Popup = require('cobble/helper/Popup');

    /**
     * 展开/收起 Level3 “更多”元素
     * @param  {jQuery element} element "more"按钮
     */
    function toggleLevel3Expand(element) {
        element
        .find('.icon')
        .toggleClass('icon-angle-down')
        .toggleClass('icon-angle-up');

        element
        .parent()
        .find('.hidden')
        .toggleClass('hide')
        .toggleClass('show');

        //同步一下当前panel所有“更多”button的位置
        element
        .parents('.main-category-level2')
        .find('.more')
        .each(function () {
            var top = $(this).parent().prop('offsetTop');

            $(this).css('margin-top', (top - 10) + 'px');
        });
    }

    var initEvent = function () {

        var container = $('.main-category');
        var currentMore;
        //实现抖动效果
        var navItems = $('.sale-icon');
        setInterval(function () {
            navItems.animate({top: '-15px'}, 'fast', function () {
                navItems.css('top', '-10px');
            });
            navItems.animate({top: '-12px'}, 'fast', function () {
                navItems.css('top', '-10px');
            });
        }, 2000);

        container
        .find('.main-category-level1')
        .each(function () {
            new Popup({
                element: $(this),
                layer: $(this).find('.main-category-level2'),
                show: {
                    trigger: 'over',
                    delay: 100
                },
                hide: {
                    trigger: 'out',
                    delay: 100
                }
            });
        });



        var toggleIcon = container.find('.main-category-header .icon-angle-down');

        if (toggleIcon.length === 0) {
            return;
        }

        new Popup({
            element: container,
            layer: container.find('.main-category-list'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 100
            },
            onAfterShow: function () {
                toggleIcon
                .removeClass('icon-angle-down')
                .addClass('icon-angle-up');
            },
            onAfterHide: function () {
                toggleIcon
                .removeClass('icon-angle-up')
                .addClass('icon-angle-down');
            }
        });

    };
    return {
        init: initEvent
    };
})