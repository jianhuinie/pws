/**
 * @file 分页
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var Pager = require('custom/ui/Pager');
    var debounce = require('cc/function/debounce');

    return Ractive.extend({
        template: require('html!./Pager.html'),
        data: function () {
            return {
                options: {
                    page: 0,
                    count: 0,
                    size: ''
                }
            };
        },
        onrender: function () {
            var me = this;
            var pager =
            me.pager = new Pager({
                mainElement: $(me.getElement()),
                watch: {
                    page: debounce(
                        function (page) {
                            if (page != me.get('options.page')) {
                                me.set('options.page', page);
                            }
                        },
                        1000,
                        true
                    ),
                    count: function (count) {
                        if (count != me.get('options.count')) {
                            me.set('options.count', count);
                        }
                    }
                }
            });
            me.observe('options.page', function (page) {
                pager.set('page', page);
            });
            me.observe('options.count', function (count) {
                pager.set('count', count);
            });
        },
        onteardown: function () {
            this.pager.dispose();
        }
    });

});