define(function (require, exports) {

    'use strict';

    var Tab = require('cobble/ui/Tab');
    var service = require('common/service');
    var Tooltip = require('cobble/ui/Tooltip');
    var container = $('#content');

    function toggleOrders(courseContainer) {
        courseContainer.find('.orders').toggle();
        courseContainer.find('.btn-toggle').toggleClass('open');
    }

    exports.init = function () {

        container
        .find('.course')
        .each(function () {
            new Tab({
                element: $(this),
                navActiveClass: 'active',
                navSelector: '.tabs li',
                contentSelector: '.list table'
            });
        });


        container
        .on('click', '.btn-toggle div', function () {

            var el = $(this);
            var courseContainer = el.closest('.course');

            if (courseContainer.data('hasLoaded')) {
                toggleOrders(courseContainer);
            }
            else {
                service
                .getVideoCourseOrderList({
                    courseNumber: courseContainer.data('course-number'),
                })
                .done(function (response) {

                    if (response.code === 0) {
                        var tpl = response.data.tpl;

                        if (tpl.order_list) {
                            courseContainer
                            .find('.orders .list')
                            .html(tpl.order_list);

                            courseContainer
                            .find('[data-title]')
                            .each(function (index, item) {
                                Tooltip.init($(this));
                            });

                            courseContainer.data('hasLoaded', true);
                            toggleOrders(courseContainer);
                        }
                    }
                });
            }

        });
    }
});