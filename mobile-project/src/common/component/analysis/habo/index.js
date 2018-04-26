/**
 * Created by niumeng on 12/11/2016.
 */
define(function (require, exports) {

    'use strict';

    /**
     * 统一上报
     */
    exports.send = function (params) {
        var img = new Image();

        $.extend(params, {
            timeStamp: Date.now()
        });

        img.src = 'https://click.genshuixue.com/gs.gif?' + $.param(params);

        img.onload = img.onerror = img.onabort = function () {
            img = img.onload = img.onerror = img.onabort = null;
        };
    };

    function getParams(target) {
        var me = target;
        // 必输项
        var type = me.data('habo-type');
        var stype= me.data('habo-stype');
        if (type === undefined || stype === undefined) {
            return;
        }
        var paramsObj = {
            type: type,
            stype: stype
        };
        var userDefineParams = me.data('habo-params');
        if (userDefineParams) {
            var params = userDefineParams.split('|');
            params.forEach(function (v) {
                var item = v.split(':');
                if (item[0] === 'dom') {
                    var kv = item[1].split('=');
                    paramsObj[$.trim(kv[0])] = $(kv[1]).val();
                }
                else {
                    paramsObj[item[0]] = item[1];
                }
            });
        }
        return paramsObj;
    }

    /**
     * 统一habo上报
     *     1、class中有analysis-habo-log会统一上报；
     *     2、其中data-habo-type和data-habo-stype为必输项
     *     3、data-habo-params为其他自定义参数，格式为key:value|key:value|...
     *     例如：teacherNumber:123|teacherName:hr
     *     扩展：动态获取dom值结构：dom: key=xpath，通过$(xpath).val()获取，例如：dom #page_main .person_name
     */
    exports.initClick = function () {
        var me = this;
        $('body>*').on('click', '.analysis-habo-log', function (e){
            exports.send(getParams($(this)));
        });
    };

    /**
     * 统一habo上报
     *     1、class中有analysis-habo-log-scroll会统一上报；
     *     2、其中data-habo-type和data-habo-stype为必输项
     *     3、data-habo-params为其他自定义参数，格式为key:value|key:value|...
     *     例如：teacherNumber:123|teacherName:hr
     *     4、两次上报之间间隔1000ms
     */
    exports.initScroll = function () {
        var bodyHeight = $(document.body).height();
        var lastTime = new Date().getTime();
        function log() {
            var targets = $('.analysis-habo-log-scroll');
            var scrollTop = $(window).scrollTop();
            targets.each(function (i, v) {
                var me = $(v);
                var now = new Date().getTime();
                if (
                    now - lastTime > 1000
                    && scrollTop + bodyHeight > me.offset().top
                ) {
                    lastTime = now;
                    exports.send(getParams(me));
                }
            });
        }
        log();
        $(window).on('scroll.habo', log);
    };
});
