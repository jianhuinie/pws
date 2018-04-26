/**
 * @file 下拉框
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var Select = require('custom/form/Select');
    var autoScrollUp = require('cc/function/autoScrollUp');

    return Ractive.extend({
        template: require('html!./Select.html'),
        data: function () {
            return {
                options: {
                    name: '',
                    className: '',
                    defaultText: '请选择',
                    data: null,
                    value: '',
                    disabled: false,
                    hidden: false,
                    onselect: $.noop
                }
            };
        },
        onrender: function () {
            var me = this;
            var container = $(me.getElement());
            var select =
            me.select = new Select({
                mainElement: container,
                data: me.get('options.data'),
                value: me.get('options.value'),
                defaultText: me.get('options.defaultText'),
                onselect: me.get('options.onselect'),
                watch: {
                    value: function (value) {
                        if (value == me.get('options.value')) {
                            return;
                        }
                        me.set('options.value', value);
                    },
                    opened: function (opened) {
                        if (opened) {
                            var list = container.find('.menu');
                            setTimeout(
                                function () {
                                    autoScrollUp(
                                        list,
                                        list.find('.active')
                                    );
                                },
                                500
                            );
                        }
                        else {
                            me.set('opened', false);
                        }
                    }
                }
            });
            me.observe('options.value', function (value) {
                select.set('value', value);
            });
            me.observe('options.data', function (data) {
                select.set('data', data);
            });
        },
        onteardown: function () {
            this.select.dispose();
        }
    });

});