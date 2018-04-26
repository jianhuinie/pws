/**
 * 下拉刷新
 *     1、指定元素兄弟节点添加loading-more元素；
 *     2、符合下拉条件，调用callback回调；
 *     3、callback回调必须返回一个promise，便于处理dom隐藏和避免多次请求数据
 *     4、isAutoLoading 是否自动加载
 *         true: 自动加载，滑到页面底部自动加载
 *         false: 滑到页面底部，上拉加载
 *     注意事项：
 *     1、element兄弟节点不能有class="loading-more"元素
 *     2、dispose的时候会把loading-more移除
 * @author hurry
 * @date 2016/12/20
 */
define(function (require) {
    require('css-loader!./index.styl');
    var env = require('../../util/env');
    
    function touchLoading() {
        var me = this;
        var beginY;
        var isPreCondition;
        var element = me.options.element;
        element.on('touchstart', touchStart);
        // element.on('touchmove', function (e) {
        //     e.preventDefault();
        // });
        element.on('touchend', touchEnd);

        function touchStart(event) {
            // var pageHeight = $(document.body).height();
            beginY = event.touches[0].pageY;
            // isPreCondition = pageHeight - beginY <= 100;
            // 滑到页面底部
            // isPreCondition = pageHeight - window.scrollY - screen.availHeight < 10;
            // 滑动开始位置在loading-more附近
            isPreCondition = ($('.loading-more').offset().top - beginY) < 80;
            // hurry 部分android低版本手机不加不会触发touchend
            if (env.os.isAndroid && env.os.version.lte('4.4.4')) {
                event.preventDefault();
            }
        }

        function touchEnd(event) {
            // event.preventDefault();
            if (isPreCondition) {
                var endY = event.changedTouches[0].pageY;
                var isLoading = beginY - endY >= 10;
                if (isLoading) {
                    me.loading();
                }
            }
        }
    }
    /**
     * 下拉刷新
     * @param  {Object} options [description]
     * @param  {jQuery} options.element 该元素之后添加loading-more元素
     * @param  {function} options.callback 符合条件回调函数
     * @param  {boolean} options.isAutoLoading 是否滑到底部自动刷新
     */
    function DropLoad(options) {
        var me = this;
        me.options = options;
        me.isLoading = false;
        // 开始滑动位置
        me.beginY = 0;
        // 当前touch开始位置位于页面底部<200px
        me.isPreCondition = false;
        // 声明成实例方法而不是类方法，是因为dispose
        me.handler = function () {
            var prev = me.loadingDiv.prev();
            var lastScrollHeight = prev.position().top + prev.height();
            if (window.scrollY + window.innerHeight >= lastScrollHeight - 20) {
                me.loading();
            }
        };

        this.init(options);
    }

    DropLoad.prototype.loading = function () {
        var me = this;
        if (!me.isLoading && $.isFunction(me.options.callback)) {
            me._isShowLoading(true);
            me.options
                .callback()
                .then(function () {
                    me._isShowLoading(false);
                });
        }
    };

    DropLoad.prototype.init = function (options) {
        var me = this;
        var element = options.element;
        this.loadingDiv = element.next('.loading-more');
        if (!this.loadingDiv.length) {
            this.loadingDiv = $(''
                + '<div class="loading-more hide">'
                +   '<span class="loading">'
                +       '<i class="t1"></i>'
                +       '<i class="t2"></i>'
                +       '<i class="t3"></i>'
                +   '</span>'
                + '</div>'
            );
            element.after(this.loadingDiv);
        }
        if (options.isAutoLoading) {
            $(window).unbind('scroll', this.handler);
            $(window).on('scroll', this.handler);
        }
        else {
            touchLoading.call(me);
        }
    };

    /**
     * 销毁
     * 1、移除元素
     * 2、解绑scroll事件
     */
    DropLoad.prototype.dispose = function () {
        var ele = this.options.element;
        ele.unbind('touchstart');
        ele.unbind('touchend');
        ele.next('.loading-more').remove();
        $(window).unbind('scroll', this.handler);
    };

    DropLoad.prototype._isShowLoading = function (flag) {
        if (flag) {
            this.loadingDiv.removeClass('hide');
            window.scrollTo(0, window.scrollY + this.loadingDiv.height());
        } else {
            this.loadingDiv.addClass('hide');
            if ($(document.body).height > this.lastScrollHeight + 20) {
                window.scrollTo(0, window.scrollY + 20);
            }
        }
        this.isLoading = flag;
    };

    return DropLoad;
});