/**
 * @file 搜狗导航页-聚惠学
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var container = $('#juhuixue');

    exports.init = function () {

        container
        .on('mouseenter', '.course-nav li', function(e){
            var element = $(this);
            var cat = element.data('cat');

            container.find('.course-nav li').removeClass('active');
            element.addClass('active');
            container.find('.list').hide();
            container.find('.course-content .'+cat).show();
        })
    };

});