/**
 * Created by niumeng on 11/2016.
 */
define(function (require) {
    'use strict';
    var $ = require("zepto");
    var preventBgScrolling = require('common/preventBgScrolling/index');

    var url = '';

    return function (page_data) {
        var doc = document;

        preventBgScrolling.recommendedMethod(doc.querySelector('#j_choose_course_layer .ctn'));

        $('#j_more').click(function () {
            $(this).parent().find('.course').show();

            $(this).hide();
        });

        $('#j_layer').click(function () {
            $('#j_choose_course_layer').css({
                '-webkit-transform': 'translateY(0)',
                'transform': 'translateY(0)'
            });

            $('#j_mask').show();

            preventBgScrolling.disableBody();
        });

        $('#j_close, #j_mask').click(function () {
            $('#j_choose_course_layer').css({
                '-webkit-transform': 'translateY(100%)',
                'transform': 'translateY(100%)'
            });
            $('#j_mask').hide();

            preventBgScrolling.enableBody();
        });

        $('#j_ccl_ok').click(function () {
            if($(this).hasClass('disable')) {
                return;
            }

            location.href = url;
        });

        $('#j_choose_course_layer .course').click(function () {
            $(this).addClass('chose').parent().siblings().find('.course').removeClass('chose');

            url = $(this).parent().data('href');

            $('#j_ccl_ok').removeClass('disable');
        });
    };
});
