/**
 * @file 学生中心 我的课程回放
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var classCourse = require('./playback/classCourse');
    var one2one = require('./playback/one2one');

    exports.init = function () {

        classCourse.init();
        one2one.init();

        var container = $('#content');

        container
        .on('click', '.tab-nav .nav-item', function () { // tab切换

            var tab = $(this).closest('.tab');
            var type = $(this).data('type');

            tab
            .find('.tab-nav .nav-item')
            .each(function (index, item) {
                $(item).removeClass('active-tab');
            });
            $(this).addClass('active-tab');

            tab
            .find('.tab-content .tab-panel')
            .each(function (index, item) {
                $(item).removeClass('active-tab');
                if (item.id == type) {
                    $(item).addClass('active-tab');
                }
            });
        });
    };

});