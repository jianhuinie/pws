/**
 * @file 搜索列表页帮我找老师
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var Placeholder = require('cobble/helper/Placeholder');
    var service = require('common/service');
    var recommend = $('#recommend');
    var store = require('common/store');

    exports.init = function () {

        // 非老师身份显示人工找老师
        if (store.get('user').type != 0) {
            recommend.find('.find-teacher-container').show();
        }

        /**
         * 快速找老师选择框
         */
        Placeholder.init(
            recommend.find('.form-text')
        );

        /**
         * 表单校验
         */
        var validator = new Validator({
            element: $('#recommend-form'),
            fields: {
                mobile: {
                    errors: {
                        required: '请输入联系方式',
                        pattern: '手机号码格式错误'
                    }
                }

            }
        });

        recommend
        .on('click', '.btn-service', function(e) {

            if (validator.validate()) {

                service
                .recommendAddRecord({
                    mobile : recommend.find('input[name="mobile"]').val()
                })
                .done(function (response) {
                    if (response.code === 0) {
                        alert('跟谁学小秘书已经收到你需要的老师信息<br/>稍等片刻，我们会马上与你联系哦~', '温馨提示');
                    }
                });

            }
        });

    };

});