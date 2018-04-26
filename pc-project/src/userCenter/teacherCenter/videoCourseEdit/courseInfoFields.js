/**
 * @file 验证规则
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return {
        cover: {
            rules: {
                required: true
            },
            errors: {
                required: '请设置课程封面'
            }
        },
        title: {
            rules: {
                required: true,
                maxlength: 20
            },
            errors: {
                required: '请输入课程标题',
                maxlength: '标题请不要超过20个字'
            }
        },
        intro: {
            rules: {
                required: true,
                maxlength: 200
            },
            errors: {
                required: '请输入课程简介',
                maxlength: '简介请不要超过200个字'
            }
        }
    };

});