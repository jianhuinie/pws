/**
 * @file 选择课时
 * @author zhujialu, liucong
 */
define(function (require, exports) {

    'use strict';

    var multiply = require('cobble/function/multiply');
    var minus = require('cobble/function/minus');
    var Validator = require('cobble/form/Validator');
    var cookie = require('cobble/util/cookie');

    var teacher = require('./course/teacher');
    var hours = require('./course/hours');

    var form = require('common/form');
    var store = require('common/store');
    var service = require('common/service');

    var SaveButton = require('common/component/SaveButton');
    var LoginDialog = require('common/component/LoginDialog');

    var container = $('#main');

    // 总价
    var totalPrice = 0;
    // 折扣价
    var discountPrice = 0;

    var validator = new Validator({
        element: container,
        realtime: true,
        fields: {
            course_id: {
                errors: {
                    required: '请选择教学科目'
                }
            },
            lesson_way: {
                errors: {
                    required: '请选择上课方式'
                }
            },
            hours: {
                errors: {
                    required: '请输入时长',
                    min: '最少购买 1 小时',
                    max: '最多购买 999 小时',
                    pattern: '请输入整数'
                }
            }
        },
        onAfterValidate: function (e, data) {

            if ($.inArray('hours', data.fields) < 0) {
                return;
            }

            var hoursInput = container.find('[name="hours"]');
            var hours;

            if (!hoursInput.prop('disabled')) {
                hours = $.trim(hoursInput.val());

                $.each(
                    data.errors,
                    function (index, error) {
                        if (error.element.prop('name') === 'hours') {
                            hours = 0;
                            return false;
                        }
                    }
                );
            }
            else {
                hours = store.get('hours');
            }

            var oldValue = store.get('hours');

            store.set(
                'hours',
                hours
            );


            refreshOrder();

        }
    });

    function refreshOrder() {

        // 这里用原生 js 计算，精度有问题，必须用库
        totalPrice = multiply(
                        store.get('price'),
                        store.get('hours')
                    );

        var discount = store.get('discount');
        var discountItem = $('.discount-item');
        if (discount < 10) {
            discountItem.show();
        }
        else {
            discountItem.hide();
        }

        // 计算折扣价
        discountPrice = multiply(
                            totalPrice,
                            discount / 10
                        );

        // 优惠的金额
        var privilege = minus(
                            totalPrice,
                            discountPrice
                        );

        // 显示两位小数
        $('.form-summary .price-value').html(Number(totalPrice).toFixed(2));
        $('.form-summary .discount-value').html(discount);
        $('.form-summary .discount-price-value').html(Number(privilege).toFixed(2));
        $('.total-price-value').html(Number(discountPrice).toFixed(2));
    }

    function getSubmitUrl() {
        var courseId = store.get('courseId');
        var lessonWay = store.get('lessonWay');
        var comboId = store.get('comboId');
        var hours = store.get('hours');

        return '/pay/productDetail?'
            + 'course_id=' + courseId
            + '&lesson_way=' + lessonWay
            + (comboId == null ? ('&hours=' + hours) : ('&combo_id=' + comboId) )
            + '&type=1';
    }

    exports.init = function () {
        var hasLogin = store.get('hasLogin');

        teacher.init({
            validator: validator,
            onChange: function () {

                refreshOrder();

            }
        });

        hours.init({
            validator: validator,
            onChange: function () {

                refreshOrder();
            }
        });

        refreshOrder();

        var saveBtn = new SaveButton({
            element: $('#btn-submit'),
            saveText: '正在提交...',
            save: function () {

                if (!teacher.validate()) {
                    return;
                }
                var url = getSubmitUrl();
                if (!hasLogin) {
                    new LoginDialog({
                        onSuccess: function () {
                            location.href = url;
                        },
                        next: url
                    });
                }
                else {
                    location.href = url;
                }

            }
        });

    };

});