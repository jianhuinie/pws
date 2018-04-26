/**
 * 三列滑动组件
 * huangshiming
 * 2017-07-06
 */
define(function (require) {

    var artTemplate = require('artTemplate');
    var mutipleSlideRender = artTemplate.compile(require('text!./index.tpl'));
    var mutipleItemSlideRender = artTemplate.compile(require('text!./item.tpl'));
    var mutipleSlideRenderDom;
    var mutipleMask;

    function setCss(dom, status) {
        dom.css({
            width: '100%',
            position: status
        });
    }
    
    /**
     * {param} dom 需要插入的dom节点
     * {param} {Array} mutipleArray 需要三列的数据
     * {param} {Function} callback 回调函数
     */
    function MutipleSlide(options) {
        this.dom = options.dom;
        this.mutipleArray = options.mutipleArray;
        this.callback = options.callback;
        this.initStructure();
    }

    MutipleSlide.prototype.initStructure = function () {
        mutipleSlideRenderDom = $('.choose-mutiple-section-slider');
        mutipleMask = $('.choose-section-slider-mask');
        var that = this;
        if (mutipleSlideRenderDom.length > 0) {
            mutipleSlideRenderDom
                .removeClass('unactive')
                .addClass('active');
            mutipleMask.show();
        } else {
            var render = mutipleSlideRender({
                mutipleArray: that.mutipleArray
            });
            var dom = that.dom;
            dom.append(render);
            mutipleMask = $('.choose-section-slider-mask');
            mutipleSlideRenderDom = $('.choose-mutiple-section-slider');
            mutipleSlideRenderDom
                .removeClass('unactive')
                .addClass('active');
        }
        mutipleMask.unbind('click').on('click', function () {
            that.hide();
        });
        that.chooseItem();
        mutipleSlideRenderDom
            .unbind('click', '.choose-section-slider-bar-close')
            .on('click', '.choose-section-slider-bar-close', function () {
                that.hide();
        });
        // 处理遮罩因为touchmove还可以透穿的问题
        var main = $('#main');
        var pageNavBar = $('#page_nav_bar');
        var mainL = main.length;
        var pageNavBarL = pageNavBar.length;
        if (mainL > 0) {
            setCss(main, 'fixed');
        }
        if (pageNavBarL > 0) {
            setCss(pageNavBar, 'fixed');
        }
    };

    MutipleSlide.prototype.hide = function () {
        mutipleSlideRenderDom
            .removeClass('active')
            .addClass('unactive');
        mutipleMask.hide();
        var main = $('#main');
        var mainL = main.length;
        var pageNavBar = $('#page_nav_bar');
        var pageNavBarL = pageNavBar.length;
        if (mainL > 0) {
            setCss(main, 'static');
        }
        if (pageNavBarL > 0) {
            setCss(pageNavBar, 'static');
        }
    };

    MutipleSlide.prototype.chooseItem = function () {
        var deferred = $.Deferred();
        var that = this;
        var chooseItem = $('.choose-section-filter-content-child-item');
        chooseItem.unbind('click').on('click', function () {
            var there = $(this);
            there.siblings('.choose-section-filter-content-child-item')
                .removeClass('choosed')
                .addClass('unchoosed');
            there
                .removeClass('unchoosed')
                .addClass('choosed');
            if (that.callback) {
                var promise = that.callback({
                    level: there.attr('data-array-type'),
                    id: there.attr('data-id'),
                    name: there.attr('data-name')
                });
                if (promise) {
                    promise.done(function (responese) {
                        that.reRenderData(responese);
                        if (responese.callback) {
                            responese.callback();
                        }
                        if (responese.position === 'middle') {
                            that.reRenderData({
                                position: 'right',
                                arrays: []
                            });
                        }
                    });
                }
                if (there.attr('data-array-type') === 'right') {
                    that.hide();
                }
            }
        });
    };

    MutipleSlide.prototype.reRenderData = function (options) {
        var position = options.position;
        var domStr = '.choose-section-filter-content-child-' + position;
        var filterDom = $(domStr).find('.choose-section-filter-content-child-content');
        var itemHtml = mutipleItemSlideRender({
            position: options.position,
            arrays: options.arrays
        });
        filterDom.html(itemHtml);
        this.chooseItem();
    };

    return MutipleSlide;
});