/**
 * select滑动选择组件
 * @author leon
 */
define(function (require, exports) {
    'use strict';

    var Template = require('artTemplate');
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var TplHtml = require('text!./index.tpl');
    var SlideInRender = Template.compile(TplHtml);
    require('css-loader!./index.styl');

    function initSlideWindow(options, html) {
        var container = $('.' + options.containerName) || $('body');
        var dialog = new SlideInDialog({
            content: html
        });
        
        if (options.iconName) {
            container.find('.' + options.iconName).on('click', function () {
                dialog.show();
            });
        }
        container.find('.' + options.name).on('click', function () {
            dialog.show();
        });
        $('.slide-container.slider-' + options.name).find('.cancel').on('click', function () {
            dialog.hide();
        });
        $('.slide-container.slider-' + options.name).find('.select-item').on('click', function () {
            var content = $(this).find('.content');
            $('.' + options.name).html(content.text());
            $('.slide-container.slider-' + options.name).find('.select-item').removeClass('selected');
            $(this).addClass('selected');
            dialog.hide();
            if (options.callback && typeof options.callback === 'function') {
                var selectedItem = {
                    name: content.text(),
                    id: content.data('id')
                };
                options.callback(selectedItem);
            }
        });
    }
    
    function initSelect(options) {
        if (options && $.isArray(options.content) && options.content.length) {
            var slideHtml = SlideInRender({
                title: options.title,
                content: options.content,
                name: options.name
            });
            initSlideWindow(options, slideHtml);
        } else {
            alert('请传入合理的下拉选项数据');
        }
    }

    return {
    	/**
    	 * 初始化方法
         * @param  {content} 下拉列表数据，是个数组，每一个元素有name和id字段
         * @param  {title} 下拉列表中文名称
         * @param  {name} 下拉列表点击触发元素的classname，是个div或者span，不能用input
         * @param  {containerName} 下拉列表所在容易的classname，可不传，默认是body元素
    	 * @param  {callback} 选中元素后的回调函数，可不传
    	 * @param  {iconName} 下拉列表点击触发元素的其它classname，一般是指icon之类的，可不传
    	 */
        init: function (options) {
            initSelect(options);
        }
    };
});
