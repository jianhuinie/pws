define(function (require, exports) {
    'use strict';

    exports.init = function () {
        $('#content .sub-section h3')
        .on('click', function () {

            var sub = $(this).closest('.sub-section');

            sub.toggleClass('show');

            var section = $(this).closest('.section');

            section
            .find('.sub-section')
            .each(function (index, item) {
                if (item != sub[0]) {
                    $(item).removeClass('show');
                }
            })
        });
    }

});