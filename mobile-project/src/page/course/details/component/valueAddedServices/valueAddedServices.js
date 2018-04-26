/**
 * Created by chenmo on 16/2/17.
 */
define(function (require) {
    'use strict';
    var $ = require("zepto");
    var preventBgScrolling = require('common/preventBgScrolling/index');

    return function (page_data) {
        var doc = document;

        preventBgScrolling.recommendedMethod(doc.querySelector('#j_all'));

        $('#j_vas').click(function () {
            $('#j_vasl').css({
                '-webkit-transform': 'translateY(0)',
                'transform': 'translateY(0)'
            });
            $('#j_mask').show();

            preventBgScrolling.disableBody();
        });

        $('#j_vasl_ok').click(function () {
            $('#j_vasl').css({
                '-webkit-transform': 'translateY(100%)',
                'transform': 'translateY(100%)'
            });
            $('#j_mask').hide();

            preventBgScrolling.enableBody();
        });

        $('#j_mask').click(function () {
            $('#j_vasl').css({
                '-webkit-transform': 'translateY(100%)',
                'transform': 'translateY(100%)'
            });
            $('#j_mask').hide();

            preventBgScrolling.enableBody();
        });
    };
});
