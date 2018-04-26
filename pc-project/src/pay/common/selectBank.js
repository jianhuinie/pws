/**
 * @file 银行列表
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Tab = require('cobble/ui/Tab');
    var store = require('common/store');

    /**
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Function} options.onChange
     */
    exports.init = function (options) {

        var element = options.element;

        var tab = new Tab({
            element: element
        });

        element
        .on('click', '.bank-card', function (e) {

            // 避免触发两次
            if (e.target.tagName === 'INPUT') {
                return;
            }

            var target = $(this);
            var value = target.find(':radio').val();

            var exclude = {
                alipay: 1,
                wechat: 1
            };

            if (exclude[value.toLowerCase()]) {
                return;
            }

            var panel = target.closest('.pay-way');
            var checkedClass = 'active';

            panel
            .find('.bank-card')
            .filter('.' + checkedClass)
            .removeClass(checkedClass);

            target.addClass(checkedClass);

            var parts = value.split('_');

            var data = {
                bankName: parts[0],
                cardType: parts[1],
                money: store.get('money')
            };

            if ($.isFunction(options.onChange)) {
                options.onChange(data);
            }
            else {
                var Class = require('../component/BindCardDialog');
                new Class(data);
            }

        });

    };

});