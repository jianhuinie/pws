/**
 * @file 语言选择器
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var data = [
        {
            value: 1,
            text: '中文_普通话'
        },
        {
            value: 2,
            text: '中文_方言'
        },
        {
            value: 3,
            text: '英语'
        },
        {
            value: 4,
            text: '日语'
        },
        {
            value: 5,
            text: '法语'
        },
        {
            value: 6,
            text: '韩语'
        },
        {
            value: 7,
            text: '德语'
        },
        {
            value: 8,
            text: '西班牙语'
        },
        {
            value: 9,
            text: '俄语'
        },
        {
            value: 10,
            text: '意大利语'
        },
        {
            value: 11,
            text: '葡萄牙语'
        }
    ];

    var Component = Ractive.extend({
        template: require('html!./LanguageSelect.html'),
        data: function () {
            return {
                options: {
                    name: '',
                    className: '',
                    defaultText: '请选择',
                    value: '',
                    disabled: false,
                    hidden: false
                }
            };
        },
        components: {
            Select: require('./Select')
        },
        oninit: function () {
            this.set('options.data', data);
        }
    });

    Component.data = data;

    return Component;

});