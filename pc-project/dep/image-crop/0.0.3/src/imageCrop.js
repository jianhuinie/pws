/**
 * @file 图片裁剪
 * @author musicode
 */
define(function (require) {

    'use strict';

    if (window.ImageCrop) {
        return window.ImageCrop;
    }

    var json = require('cobble/util/json');

    /**
     * 图片裁剪构造函数
     *
     * @constructor
     * @param {Object} options
     *
     * @property {jQuery} options.element 生成 flash 的占位符元素
     * @property {number} options.width flash 宽度
     * @property {number} options.height flash 高度
     * @property {boolean=} options.adaptive 选取是否自适应
     *
     * @property {string} options.action 上传地址
     * @property {Object=} options.header 请求头
     * @property {string} options.accept 图片格式，如'jpg,png,gif'
     * @property {string} options.encoder 输出格式，可选 png 和 jpg
     * @property {boolean=} options.adaptive 是否自适应为图片允许的最大的尺寸
     * @property {boolean=} options.original 是否上传原图（只是保证裁剪比例）
     * @property {number=} options.minSize 最小的大小，单位为KB
     * @property {number=} options.maxSize 最大的大小，单位为KB
     *
     * @property {Object=} options.button 配置按钮，格式为 { x: 0, y: 0, width: 0, height: 0, text: 0 }
     * @property {Object=} options.button.select 选择图片按钮
     * @property {Object=} options.button.upload 上传图片按钮
     * @property {Object=} options.button.download 下载图片按钮
     * @property {Object=} options.button.leftRotate 左转图片按钮
     * @property {Object=} options.button.rightRotate 右转图片按钮
     *
     * @property {Object} options.src 源图信息，格式为 { x: 0, y: 0, width: 100, height: 100 }
     * @property {Array.<Object>} options.dest 输出信息，数组元素格式为 { x: 0, y: 0, width: 100, height: 100, radius: 50, text: '' }
     *
     * @property {Function=} options.onLoaded flash 加载完成触发
     * @property {Function=} options.onValidateError 图片验证失败触发
     * @property {Function=} options.onUploadStart 开始上传触发
     * @property {Function=} options.onUploadProgress 上传中触发
     * @property {Function=} options.onUploadError 上传失败触发
     * @property {Function=} options.onUploadComplete 上传完成触发
     */
    function ImageCrop(options) {
        $.extend(this, ImageCrop.defaultOptions, options);
        this.init();
    };

    ImageCrop.prototype = {

        constructor: ImageCrop,

        /**
         * 初始化
         */
        init: function () {

            var me = this;

            me.movieName = '_ImageCrop_' + movieCount++;
            ImageCrop.instances[me.movieName] = me;

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
                '<object id="', me.movieName, '" type="application/x-shockwave-flash" data="',
                    flashUrl, '" width="', me.width ,
                    '" height="', me.height ,'" class="imagecrop">',
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

            return [
                'movieName=' + encodeURIComponent(me.movieName),
                'action=' + encodeURIComponent(me.action),
                'accept=' + encodeURIComponent(me.accept),
                'adaptive=' + encodeURIComponent(me.adaptive),
                'original=' + encodeURIComponent(me.original),
                'encoder=' + encodeURIComponent(me.encoder),
                'header=' + (me.header ? encodeURIComponent(json.stringify(me.header)) : ''),
                'button=' + (me.button ? encodeURIComponent(json.stringify(me.button)) : ''),
                'minSize=' + ($.type(me.minSize) === 'number' ? me.minSize : ''),
                'maxSize=' + ($.type(me.maxSize) === 'number' ? me.maxSize : ''),
                'minWidth=' + ($.type(me.minWidth) === 'number' ? me.minWidth : ''),
                'maxWidth=' + ($.type(me.maxWidth) === 'number' ? me.maxWidth : ''),
                'minHeight=' + ($.type(me.minHeight) === 'number' ? me.minHeight : ''),
                'maxHeight=' + ($.type(me.maxHeight) === 'number' ? me.maxHeight : ''),
                'src=' + encodeURIComponent(json.stringify(me.src)),
                'dest=' + encodeURIComponent(json.stringify(me.dest))
            ].join('&amp;');
        },

        /**
         * 上传图片
         */
        upload: function () {
            var swf = this.swf;
            if (swf.upload) {
                swf.upload();
            }
        },

        /**
         * 向左旋转
         */
        leftRotate: function () {
            var swf = this.swf;
            if (swf.leftRotate) {
                swf.leftRotate();
            }
        },

        /**
         * 向右旋转
         */
        rightRotate: function () {
            var swf = this.swf;
            if (swf.rightRotate) {
                swf.rightRotate();
            }
        },

        /**
         * 是否有图片可操作
         */
        isReady: function () {
            var swf = this.swf;
            if (swf.isReady) {
                return swf.isReady();
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

            me.swf =
            me.element =
            window[this.movieName] =
            ImageCrop.instances[me.movieName] = null;
        }
    };


    /**
     * 默认配置
     *
     * @static
     * @type {Object}
     */
    ImageCrop.defaultOptions = {
        flashUrl: require.toUrl('./imageCrop.swf'),
        original: true,
        encoder: 'jpg'
    };

    // 静态成员
    ImageCrop.instances = { };
    ImageCrop.version = '0.0.1';

    /**
     * 计数器，用于生成 ID
     *
     * @inner
     * @type {number}
     */
    var movieCount = 0;

    // flash 需要全局引用
    window.ImageCrop = ImageCrop;


    return ImageCrop;

});
