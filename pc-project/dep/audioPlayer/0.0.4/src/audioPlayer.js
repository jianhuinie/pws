/**
 * @file 音频播放器
 * @author zhujl niejianhui
 * 目前主流浏览器已经支持了audio标签（IE8除外）对于不支持的还是用flash播吧
 */
define(function (require) {

    'use strict';

    if (window.AudioPlayer) {
        return window.AudioPlayer;
    }

    /**
     * 音频播放器
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 生成 flash 的占位符元素
     * @property {Function=} options.onLoadStart 音频开始加载时触发
     * @property {Function=} options.onLoadProgress 音频加载过程中触发
     * @argument {Object} options.onLoadProgress.data
     * @property {Object} options.onLoadProgress.data.loaded 已加载字节
     * @property {Object} options.onLoadProgress.data.total 总字节
     * @property {Function=} options.onLoadComplete 音频加载完成触发
     * @argument {Object} options.onLoadComplete.data
     * @property {Object} options.onLoadComplete.data.url 音频 url
     * @property {Object} options.onLoadComplete.data.time 音频时长，单位为毫秒
     * @property {Function=} options.onPlayStart 音频开始播放时中触发
     * @property {Function=} options.onPlayProgress 音频播放过程中触发
     * @argument {Object} options.onPlayProgress.data
     * @property {Object} options.onPlayProgress.data.played 当前播放位置，单位为毫秒
     * @property {Object} options.onPlayProgress.data.total 音频总时长
     * @property {Function=} options.onPlayComplete 音频播放结束触发
     */
    function AudioPlayer(options) {
        $.extend(this, AudioPlayer.defaultOptions, options);
        this.init();
    };

    if (!!(document.createElement('audio').canPlayType)) {
        AudioPlayer.prototype = {

            constructor: AudioPlayer,

            /**
             * 初始化
             */
            init: function () {

                var me = this;

                var movieName =
                me.movieName = '_AudioPlayer_' + movieCount++;

                window[movieName] =
                AudioPlayer.instances[movieName] = me;
                var audio = $(me.getAudioHTML());
                me.element.replaceWith(audio);
                me.audio = audio[0];
                me.$audio = audio;

                //触发onSwfReady
                if ($.isFunction(me.onSwfReady)) {
                    me.onSwfReady();
                }

                var audio = me.audio;
                //触发onPlayProgress
                audio.addEventListener('timeupdate', function (e) {
                    if ($.isFunction(me.onPlayProgress)) {
                        me.onPlayProgress({
                            total: audio.duration * 1000,
                            played: audio.currentTime * 1000
                        });
                    }
                });

                //触发onPlayComplete
                audio.addEventListener('ended', function (e) {
                    if ($.isFunction(me.onPlayComplete)) {
                        me.onPlayComplete({
                            total: audio.duration * 1000,
                            played: audio.currentTime * 1000
                        });
                    }
                });
            },

            /**
             * 获得生成 audio 的 html
             *
             * @return {string}
             */
            getAudioHTML: function () {

                var me = this;

                return [
                    '<audio id="', me.movieName, '" class="audio-player">',
                    '</audio>'
                ].join('');
            },
            /**
             * 加载音频 url（不播放）
             *
             * @param {string} url
             */
            load: function (url) {
                var $audio = this.$audio;
                if (!$audio.prop('src') || (url !== $audio.prop('src'))) {
                    $audio.prop('src', url);
                }
            },

            /**
             * 播放音频 url
             *
             * @param {string} url
             */
            play: function (url) {
                var audio = this.audio;
                this.load(url);
                if (audio.paused) {
                    audio.play();
                }
            },

            /**
             * 停止播放当前音频
             */
            stop: function () {
                var audio = this.audio;
                if (!audio.paused) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            },

            /**
             * 销毁对象
             */
            dispose: function () {

                var me = this;
                var audio = me.audio;
                var $audio = me.$audio;
                var movieName = me.movieName;

                me.audio =
                me.$audio =
                me.element =
                window[movieName] =
                AudioPlayer.instances[movieName] = null;
                me = null;
                delete window[movieName];
            }
        };
    }
    else {
        AudioPlayer.prototype = {

           constructor: AudioPlayer,

           /**
            * 初始化
            */
           init: function () {

               var me = this;

               var movieName =
               me.movieName = '_AudioPlayer_' + movieCount++;

               window[movieName] =
               AudioPlayer.instances[movieName] = me;

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
                       flashUrl, '" width="1px" height="1px" class="audio-player">',
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
                   'movieName=' + encodeURIComponent(me.movieName)
               ].join('&amp;');
           },

           /**
            * 加载音频 url（不播放）
            *
            * @param {string} url
            */
           load: function (url) {
               var swf = this.swf;
               if (swf.doAction) {
                   swf.doAction('load', url);
               }
           },

           /**
            * 播放音频 url
            *
            * @param {string} url
            */
           play: function (url) {
               var swf = this.swf;
               if (swf.doAction) {
                   swf.doAction('play', url);
               }
           },

           /**
            * 停止播放当前音频
            */
           stop: function () {
               var swf = this.swf;
               if (swf.doAction) {
                   swf.doAction('stop');
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
               AudioPlayer.instances[movieName] = null;
           }
        }; 
    }
    


    /**
     * 默认配置
     *
     * @static
     * @type {Object}
     */
    AudioPlayer.defaultOptions = {
        flashUrl: require.toUrl('./audioPlayer.swf')
    };

    // 静态成员
    AudioPlayer.instances = { };
    AudioPlayer.version = '0.0.1';

    /**
     * 计数器，用于生成 ID
     *
     * @inner
     * @type {number}
     */
    var movieCount = 0;

    // flash 需要全局引用
    window.AudioPlayer = AudioPlayer;


    return AudioPlayer;

});
