/**
 * @file 日期输入框选择
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var FormDate = require('custom/form/Date');

    return Ractive.extend({
        template: require('html!./DatePicker.html'),
        data: function () {
            return {
                style: require('text!./DatePicker.styl'),
                options: {
                    name: '',
                    value: '',
                    placeholder: '',
                    className: '',
                    disabled: false,
                    readonly: false,
                    autofocus: false,
                    // Date 类型
                    disableBefore: null,
                    // Date 类型
                    disableAfter: null
                }
            };
        },
        components: {
            Input: require('./Input')
        },
        oncomplete: function () {
            var me = this;
            me.formDate = new FormDate({
                mainElement: $(me.getElement()),
                disableBefore: me.get('options.disableBefore'),
                disableAfter: me.get('options.disableAfter'),
                watch: {
                    value: function (value) {
                        me.set('options.value', value);
                    }
                }
            });
            me.observe('options.value', function (value) {
                me.formDate.set('value', value);
            });
            me.observe('options.disableBefore', function (disableBefore) {
                me.formDate.option('disableBefore', disableBefore);
                me.formDate.render();
            });
            me.observe('options.disableAfter', function (disableAfter) {
                me.formDate.option('disableAfter', disableAfter);
                me.formDate.render();
            });
        },
        onteardown: function () {
            this.formDate.dispose();
        }
    });

});