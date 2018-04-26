/**
 * @file 打电话
 * @author hurry
 * @date 2017/01/09
 */
define(function (require) {
    'use strict';
    var open400TelDialog = require('common/openAppDialog/open400TelDialog');

    var bottom = $('.bottom');

    return function (options) {
        if (!bottom.length && options.jqEle) {
            bottom = options.jqEle;
        }
        bottom.on('click', '.phone', function (e) {
            var me = $(this);
            var tel = me.data('tel');
            open400TelDialog.makePhoneCall(tel);
        });

    }
});