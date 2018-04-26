define(function (require, exports) {
    'use strict';
    var urlUtil = require('cobble/util/url');
    var cookie = require('cobble/util/cookie');

    var uuid;

    /**
     * 构建曝光地址
     * @param  {string} monitor  原始曝光地址
     * @param  {boolean=} needuuid 是否从cookie获取uuid(针对某些被nginx缓存的页面)
     * @param  {Array=} combined  合并上报 [原地址里面的c参数]
     * @return {string}          整理后的url
     */
    return function (monitor, needuuid, combined) {

        if (!monitor) return null;

        var paramIndex = monitor.indexOf('?');
        var param = {};

        if (paramIndex != -1) {
            param = monitor.substring(paramIndex);
            param = urlUtil.parseQuery(param);
        }
        else {
            monitor += '?';
        }

        if (needuuid) {
            if (!uuid) {
                uuid = cookie.get('PHPSESSID');
            }

            param.uuid = uuid;
        }

        if (combined && combined.length > 0) {
            var newParam = {
                p: param.p || '',
                c: combined.join(',')
            };

            param = newParam;
        }

        var random = Math.ceil(Math.random() * Math.pow(10, 13));

        $.extend(param, { '_' : random });

        param = $.param(param);
        monitor = monitor.replace(/\?.*$/, '?' + param);

        return monitor;
    }
});