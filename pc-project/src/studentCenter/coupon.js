define(function (require, exports) {
    'use strict';
    var Popup = require('cobble/helper/Popup');

    exports.init = function () {
        var container = $('#content');

        container
        .find('table .cond .icon')
        .each(function () {

            new Popup({
                element: $(this),
                layer: $(this).closest('.cond').find('.cond-menu'),
                show: {
                    trigger: 'over',
                    delay: 200,
                    animation: function () {
                        this.layer.slideDown(150);
                    }
                },
                hide: {
                    trigger: 'out',
                    delay: 200,
                    animation: function () {
                        this.layer.slideUp(150);
                    }
                }
            });
        });

    }
});