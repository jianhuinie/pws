/**
 * @file 点击监听
 */
define(function () {

    var noop  = function () {};

    /**
     * 点击监听配置
     * @param {object=} options
     * @property {string=} selector 监听元素的选择器
     * @property {string=} monitorUrl 发送监听的URL
     * @property {object=} defaultParams 默认参数
     * @property {boolean=} isSend 是否真实上报服务器
     * @property {function=} interceptor 参数拦截器
     */
    function ClickMonitor (options) {

        $.extend(this, ClickMonitor.defaultOptions, options);
        this.init();
    }

    ClickMonitor.defaultOptions = {
        selector: '[data-click-monitor="1"]',
        monitorUrl: 'http://click.genshuixue.com/',
        defaultParams: {},
        useDataHref : true,
        isSend: true,
        interceptor: noop
    };

    /**
     * 设置拦截器
     * @param {function} interceptor 拦截器
     */
    ClickMonitor.prototype.setInterceptor = function (interceptor) {
        this.interceptor = interceptor;
    };

    /**
     * 初始化
     */
    ClickMonitor.prototype.init = function () {

        var me = this;

        $(document).on('click', me.selector, function (event) {

            var that = $(this);
            var href = me.useDataHref ? that.data('href') : '';
            var finalParams = {};
            if (me.interceptor) {
                finalParams = me.interceptor(that);
            }
            if (me.isSend && me.monitorUrl) {
                WAT.send(me.monitorUrl, $.extend({}, me.defaultParams, finalParams));
            } else {
                console.log($.extend({}, me.defaultParams, finalParams));
            }
            href && window.open(href, '_blank')
            if (me.useDataHref) {
                return false;
            }
        });
    };

    return ClickMonitor;
});