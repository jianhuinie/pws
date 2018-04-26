/**
 * @file 搜索列表页模块
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');
    var cookie = require('cobble/util/cookie');
    var store = require('common/store');

    exports.init = function () {

        var container = $("#list");

        container
        .on('click', '.video' , function (e) {

            var element = $(this);
            var title = element.data('name');

            new VideoDialog({
                url: element.data('video'),
                title: title
            });
        })

    };
});