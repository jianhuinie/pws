/**
 * @file 获取 list 中的 text
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    // list 结构通常是
    // [
    //     {
    //         text: '',
    //         value: ''
    //     },
    //     {
    //         text: '',
    //         value: ''
    //     },
    //     ...
    // ]

    return function (list, value) {
        var text = '';

        $.each(
            list || [ ],
            function (index, item) {
                if (item.value == value) {
                    text = item.text;
                }
            }
        );

        return text;
    };

});