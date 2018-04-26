/**
 * @file 统一页面loading，遮罩整个页面
 * @author hurry
 * @date 2016/12/29
 */
define(function (require) {
    var $ = require('zepto');
    require('css-loader!./index.styl');
    /**
     * 显示
     * @param  {?Object} options 参数设置
     * @param  {Object|string} options.elem，默认body
     *     1、dom元素或者dom选择器，一个elem只能有一个实例
     *     2、class: 例如：'.loading'
     *     3、id: 例如：'#loading'
     * @param  {number} options.zIndex 设置zIndex, 默认100
     * @param  {boolean} options.isHideMask 是否隐藏背景遮挡层，默认显示
     */
    function Loading(options) {
        options = options || {};
        if (options.elem + '' === options.elem) {
            options.elem = $(options.elem);
        }
        if (options.elem) {
            options.isAppendBody = false;
        }
        this.options = $.extend({}, defaultOptions, options);
        render(this.options);
    }

    var defaultOptions = {
        elem: $('body'),
        zIndex: 100,
        isHideMask: false,
        isAppendBody: true
    };

    Loading.prototype = {
        // 显示
        show: function () {
            this.options.loading.show();
        },
        // 隐藏
        hide: function () {
            this.options.loading.hide();
        },
        // 重新渲染
        resize: function () {
            render(this.options);
        },
        // 析构函数
        destroy: function () {
            this.options.loading.remove();
            this.options.loading = null;
            delete this.options.loading;
            this.options = null;
            delete this.options;
        }
    };

    function render(options) {
        if (options.elem.children('.loading-wrapper').length) {
            // 只渲染一次
            options.loading = options.elem.children('.loading-wrapper');
            return;
        }

        var loadingDom = $(''
            + '<div class="loading-wrapper" style="display:none">'
            +   '<div class="loading-mask">'
            +   '</div>'
            +   '<span class="loading">'
            +       '<i class="t1"></i>'
            +       '<i class="t2"></i>'
            +       '<i class="t3"></i>'
            +   '</span>'
            + '</div>'
        );
        options.loading = loadingDom;
        if (options.isHideMask) {
            options.loading.find('.loading-mask').hide();
        }
        options.elem.append(loadingDom);
    }

    return Loading;
});