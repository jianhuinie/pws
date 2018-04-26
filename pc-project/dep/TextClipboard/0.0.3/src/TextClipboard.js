/**
 * @file flash 实现的文本复制
 * @author musicode
 */
define(function (require, exports, module) {

    'use strict';

    /**
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 生成 flash 的占位符元素
     * @property {string=} options.text 初始化时需复制的文本
     * @property {Function=} options.onReady swf 加载完成时的回调
     * @property {Function=} options.onClick 点击 swf 时的回调
     */
    function TextClipboard(options) {
        $.extend(this, TextClipboard.defaultOptions, options);
        this.init();
    };

    TextClipboard.prototype = {

        constructor: TextClipboard,

        /**
         * 初始化
         */
        init: function () {

            var me = this;

            var movieName =
            me.movieName = '_TextClipboard_' + movieCount++;

            window[movieName] =
            TextClipboard.instances[movieName] = me;

            var swf = $(me.getFlashHTML());
            me.element.replaceWith(swf);

            me.swf = swf[0];
        },

        /**
         * 获得生成 flash 的 html
         *
         * @return {string}
         */
        getFlashHTML: function () {

            var me = this;
            var flashUrl = me.flashUrl;

            return [
                '<object id="', me.movieName, '" width="100%" height="100%" type="application/x-shockwave-flash" data="',
                    flashUrl, '" class="text-clipboard">',
                    '<param name="wmode" value="transparent" />',
                    '<param name="movie" value="', flashUrl, '" />',
                    '<param name="quality" value="high" />',
                    '<param name="menu" value="false" />',
                    '<param name="allowScriptAccess" value="always" />',
                    '<param name="flashvars" value=\'' + me.getFlashVars() + '\' />',
                '</object>'
            ].join('');

        },

        /**
         * 获得传给 flash 的参数字符串
         *
         * @return {string}
         */
        getFlashVars: function () {

            var me = this;

            var props = [ 'movieName' ];

            if (me.text) {
                props.push('text');
            }

            var list = [ ];

            $.each(
                props,
                function (index, name) {
                    list.push(
                        name + '=' + encodeURIComponent(me[name])
                    );
                }
            );

            return list.join('&amp;');

        },

        /**
         * 复制文本
         *
         * @param {string} text
         */
        copy: function (text) {
            //alert( text );
            var swf = this.swf;
            if (swf.copy) {
                swf.copy(text);
            }
        },

        /**
         * 粘贴
         *
         * @return {string}
         */
        paste: function (url) {
            var swf = this.swf;
            if (swf.paste) {
                return swf.paste();
            }
        },

        /**
         * 清空
         */
        clear: function () {
            var swf = this.swf;
            if (swf.clear) {
                swf.clear();
            }
        },

        /**
         * 销毁对象
         */
        dispose: function () {

            var me = this;
            var swf = me.swf;

            if (swf.dispose) {
                swf.dispose();
            }

            var movieName = me.movieName;

            me.swf =
            me.element =
            window[movieName] =
            TextClipboard.instances[movieName] = null;
        }
    };


    /**
     * 默认配置
     *
     * @static
     * @type {Object}
     */
    TextClipboard.defaultOptions = {
        flashUrl: require.toUrl('./TextClipboard.swf')
    };

    // 静态成员
    TextClipboard.instances = { };
    TextClipboard.version = '0.0.3';

    /**
     * 计数器，用于生成 ID
     *
     * @inner
     * @type {number}
     */
    var movieCount = 0;

    // flash 需要全局引用
    window.TextClipboard = TextClipboard;


    return TextClipboard;

});