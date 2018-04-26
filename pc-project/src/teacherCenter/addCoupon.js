/**
 * @file 老师用户中心 新建优惠券
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var form = require('common/form');
    var Calendar = require('cobble/form/Date');
    var Editor = require('common/component/Editor');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');

    var container = $('#content');
    var formElement = container.find('.form-add-coupon');
    // var successElement = container.find('.add-success');

    /**
     * 计算优惠券总额
     */
    function countTotalBalance () {

        var formData = form.parse(formElement);
        var balance = formData.balance;
        var totalCount = formData.total_count;
        var totalBalanceDiv = formElement.find('.total-balance');

        if (balance && totalCount) {
            var totalBalance = balance * totalCount;
            totalBalanceDiv.html(totalBalance);
        }

    }


    exports.init = function () {

        // 有效期
        var startDateCalendar = new Calendar({
            element: formElement.find('input[name="start_date"]')
        });

        var endDateCalendar = new Calendar({
            element: formElement.find('input[name="end_date"]')
        });

        // 备注
        var remarkEditor = new Editor({
            element: formElement.find('.form-editor'),
            maxLength: 30
        });

        // 验证对象
        var validator = new Validator({
            element: formElement,
            realtime: true,
            fields: {
                balance: {
                    rules: {
                        required: true,
                        min: 5,
                        max: 2000,
                        pattern: /^\d+$/
                    },
                    errors: {
                        required: '请输入优惠券面值',
                        min: '优惠券面值最低 5 元',
                        max: '优惠券面值最高 2000 元',
                        pattern: '请输入正确的面值'
                    }
                },
                total_count: {
                    rules: {
                        required: true,
                        min: 1,
                        max: 1000,
                        pattern: /^\d+$/
                    },
                    errors: {
                        required: '请输入优惠券张数',
                        min: '至少要发放 1 张哦~',
                        max: '优惠券单次最多只能发放 1000 张',
                        pattern: '请输入正确的张数'
                    }
                },
                cond_threshold: {
                    rules: {
                        max: 100000
                    },
                    errors: {
                        max: '使用上限不可超过 100000 元'
                    }
                },
                start_date: {
                    rules: {
                        required: true
                    },
                    errors: {
                        required: '请选择有效期开始日期'
                    }
                },
                end_date: {
                    rules: {
                        required: true
                    },
                    errors: {
                        required: '请选择有效期结束日期'
                    }
                },
                remark: {
                    rules: {
                        maxlength: 30
                    },
                    errors: {
                        maxlength: '请将字数控制在 30 字以内'
                    }
                }
            }
        });

        // 保存表单
        new SaveButton({
            element: formElement.find('.btn-save'),
            save: function () {

                var formData = form.parse(formElement);

                if (validator.validate()) {

                    // 使用条件
                    var threshold = formData.threshold;
                    var condThreshold;
                    if (threshold == 0) {
                        condThreshold = 0;
                    }
                    else if (threshold == 1) {
                        if (!formData.cond_threshold) {
                            alert('尚未设置使用条件');
                            return;
                        }
                        condThreshold = formData.cond_threshold;
                    }

                    // 有效期
                    var startDate = new Date(Date.parse(formData.start_date.replace(/-/g,"/")));
                    var endDate = new Date(Date.parse(formData.end_date.replace(/-/g,"/")));

                    return service
                    .addCoupon(
                        {
                            balance: formData.balance,
                            totalCount: formData.total_count,
                            condThreshold: condThreshold,
                            effectTime: startDate.getTime() / 1000,
                            expireTime: endDate.getTime() / 1000,
                            maxRecvCount: formData.max_recv_count,
                            remark: formData.remark
                        }
                    )
                    .done(function (response) {

                        if (response.code === 0) {

                            success('新建优惠券成功', function () {
                                window.location.href = '/teacher_center/addCouponSuccess?serial='
                                                     + response.data.serial_num
                                                     + '&qrurl='+ response.data.qr_url
                                                     + '&dturl='+ response.data.dt_url;
                            });

                        }

                    });

                }

            }
        });

        formElement
        .on('blur', 'input[name="balance"], input[name="total_count"]', function () {
            countTotalBalance();
        })

        .on('focus', 'input[name="cond_threshold"]', function () {
            $(this).prev().find(':radio').click();
        });

    };


});