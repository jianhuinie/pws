/**
 * @file 日期范围选择器
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var split = require('cc/function/split');
    var DateRange = require('custom/form/DateRange');

    return Ractive.extend({

        template: require('html!./DateRange.html'),

        data: function () {
            return {
                style: require('text!./DateRange.styl'),
                options: {
                    start: '',
                    end: '',
                    name: '',
                    placeholder: '',
                    readonly: ''
                }
            };
        },

        components: {
            Input: require('./Input')
        },

        computed: {
            separator: function () {
                return DateRange.defaultOptions.separator;
            },
            value: {
                get: function () {
                    var me = this;
                    var start = me.get('options.start');
                    var end = me.get('options.end');
                    if (start && end) {
                        return start
                            + me.get('separator')
                            + end;
                    }
                    return '';
                },
                set: function (value) {
                    var me = this;
                    var terms = split(value, me.get('separator'));
                    me.set({
                        'options.start': terms[0] || '',
                        'options.end': terms[1] || ''
                    });
                }
            }
        },

        oncomplete: function () {

            var me = this;

            me.dateRange = new DateRange({
                mainElement: $(me.getElement()),
                value: me.get('value'),
                watch: {
                    value: function (value) {
                        me.set('value', value);
                    }
                }
            });

            me.observe('options.start', function (start) {
                me.dateRange.set({
                    value: me.get('value')
                });
            });
            me.observe('options.end', function (end) {
                me.dateRange.set({
                    value: me.get('value')
                });
            });

        },

        onteardown: function () {
            this.dateRange.dispose();
        }

    });

});