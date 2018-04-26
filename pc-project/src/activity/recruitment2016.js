/**
 * @file 猎聘网合作页入口js逻辑
 *
 * @author kuanghongrui@baijiahulian.com
 */

define(function (require, exports) {
    'use strict';

    var store = require('common/store');
    var Popup = require('cobble/helper/Popup');

    /**
     * 上下滚动动画
     * @param {(HTMLElement|string)} targetNode 滚动目标的节点或者css selector
     * @param {number} duration 动画每帧之间的时间间隔，单位毫秒。
     */
    function animateScrollTop(targetNode, duration) {
        $('html,body').animate({
            scrollTop: $(targetNode)[0].offsetTop
        }, duration || 0);
    }

    /**
     * more的处理方法。
     *
     * @param {string} hiddenClassName 隐藏的样式类名
     * @param {number} pageNum 每页最大项数
     * @param {Event} e more的执行事件
     */
    function moreHandler(hiddenClassName, pageNum, e) {
        var more = $(e.currentTarget);
        var list = more.prev();
        var maintainItems = list.find('.' + hiddenClassName);
        maintainItems.removeClass(hiddenClassName);
        more.hide();
    }

    /**
     * 绑定招聘会更多按钮事件
     */
    exports.bindRecListMoreEvent = function () {
        var pageNum = store.get('career_page_num');
        $('.rec-container .icon-more').click(function () {
            return function (e) {
                moreHandler('rec-list-item-hidden', pageNum, e);
            };
        }());
    };

    /**
     * 绑定tab每一项的更多按钮事件
     *
     *@param {string} type tab的类型，只有"knowself","fieldinfo","greenhand"三种类型
     */
    exports.bindTabMoreEvent = function (type) {
        var pageNum = store.get('tab_list_page_num');
        $('.rec-content-container-' + type + ' .icon-more').click(function () {
            return function (e) {
                moreHandler('rec-content-list-item-hidden', pageNum, e);
            };
        }());
    };

    /**
     * 绑定“认识自己”“行业资料”“初入职场”三个菜单的切换事件。
     */
    exports.bindMenuSwitchEvent = function () {
        $('.menu-anchor-rec .menu-anchor-item').click(function (e) {
            var menuItem = $(e.currentTarget);
            var type = menuItem.data('type');
            $('.menu-anchor-rec .menu-anchor-item:not(.menu-anchor-item-' + type + ')')
                .removeClass('menu-anchor-item-selected');
            $('.menu-anchor-item-' + type).addClass('menu-anchor-item-selected');
            $('.rec-content-container:not(.rec-content-container-' + type + ')').hide();
            $('.rec-content-container-' + type).show();
        });
    };

    /**
     * @override
     * index.js初始化方法。
     */
    exports.init = function () {
        exports.bindRecListMoreEvent();
        exports.bindTabMoreEvent('knowself');
        exports.bindTabMoreEvent('fieldinfo');
        exports.bindMenuSwitchEvent();

        function scrollTop(targetNode) {
            return function () {
                animateScrollTop(targetNode, 350);
            };
        }
        $('.greentrain-cv').click(scrollTop('.caption-fonts-cv'));
        $('.greentrain-rec').click(scrollTop('.caption-fonts-rec'));

        //百度分享
        new Popup({
            element: $('.sharing-btn'),
            layer: $('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 20
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });
    };
});