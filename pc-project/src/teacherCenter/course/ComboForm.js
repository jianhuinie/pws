/**
 * @file 课时套餐表单
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var form = require('common/form');
    var Text = require('cobble/form/Text');
    var Number = require('custom/form/Number');
    var Validator = require('cobble/form/Validator');

    /**
     * 课时套餐表单
     *
     * @constructor
     * @param {Object} options
     * @property {Object} options.element
     * @property {Object} options.data 后端传来的数据
     * @property {string} options.data.id 套餐 ID
     * @property {number} options.data.hours 套餐时长
     * @property {number} options.data.discount 套餐折扣
     */
    function ComboForm(options) {
        $.extend(this, options);
        this.init();
    }

    ComboForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            var data = me.data || { };

            var numberCtrl = new Number({
                mainElement: element.find('.form-number'),
                value: 9.9,
                minValue: 1,
                maxValue: 9.9,
                step: 0.1
            });

            me.numberCtrl = numberCtrl;

            me.nameInput = new Text({
                element: element.find('[name="name"]')
            });

            me.hoursInput = new Text({
                element: element.find('[name="hours"]')
            });

            var validator = new Validator({
                element: element,
                fields: {
                    name: {
                        errors: {
                            required: '请输入名称',
                            minlength: '最少输入 2 个字'
                        }
                    },
                    hours: {
                        errors: {
                            required: '请输入时长',
                            min: '最少为 1 个小时',
                            max: '最多为 999 个小时',
                            pattern: '请输入整数'
                        }
                    },
                    discount: {
                        errors: {
                            min: '请输入 1-9.9',
                            max: '请输入 1-9.9',
                            pattern: '请输入 1-9.9'
                        }
                    }
                }
            });

            element
            .on('click', '.btn-primary', function () {

                var discount = numberCtrl.get('value');
                if (discount < numberCtrl.get('minValue')
                    && discount > numberCtrl.get('maxValue')
                ) {
                    numberCtrl.set('value', '');
                }

                if (!validator.validate()) {
                    return;
                }

                var formData = form.parse(element);
                if (data.id) {
                    formData.id = data.id;
                }

                service
                .editCombo(formData)
                .done(function (response) {
                    if (response.code === 0) {
                        location.reload();
                    }
                });

            });

        },

        refresh: function () {

            var me = this;
            var element = me.element;
            var data = me.data || { };

            me.nameInput.setValue(data.name);
            me.hoursInput.setValue(data.hours);

            var discount = $.isNumeric(data.discount)
                         ? data.discount
                         : '';

            if (discount == 10) {
                discount = '';
            }

            me.numberCtrl.set('value', discount);

        }

    };

    return ComboForm;

});