/**
 * @file 一组 checkbox 或 radio
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var BoxGroup = require('custom/form/BoxGroup');

    return Ractive.extend({
        template: require('html!./BoxGroup.html'),
        data: function () {
            return {
                options: {
                    // 是否可多选，多选是 checkbox，否则是 radio
                    multiple: false,
                    name: '',
                    value: 1,
                    data: [
                        {
                            value: 1,
                            text: '北京',
                            disabled: false,
                            readonly: false
                        },
                        {
                            value: 2,
                            text: '上海',
                            disabled: false,
                            readonly: false
                        }
                    ]
                }
            };
        },
        onrender: function () {

            var me = this;
            var container = $(me.getElement());

            var multiple = me.get('options.multiple');

            var boxGroup =
            me.boxGroup = new BoxGroup({
                mainElement: container,
                multiple: multiple,
                toggle: multiple,
                boxSelector: multiple ? '.checkbox' : '.radio',
                watch: {
                    value: function (value) {
                        me.set('options.value', value);
                    }
                }
            });

            me.observe('options.value', function (value) {
                boxGroup.set('value', value);
            });

        },
        onteardown: function () {
            this.boxGroup.dispose();
        }
    });

});