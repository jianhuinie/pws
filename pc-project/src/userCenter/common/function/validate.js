/**
 * @file 验证器
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var validator = require('cc/util/validator');

    return function (data, rules, sequence) {

        var validateFields = { };

        $.each(data, function (key, value) {
            validateFields[key] = {
                value: value
            };
        });

        var result = validator.validate(validateFields, rules, sequence);
        for (var i = 0, len = result.length; i < len; i++) {
            if (result[i].error) {
                tip({
                    type: 'error',
                    content: result[i].error
                });
                return false;
            }
        }

        return true;

    };

});