/**
 * @file 支付 - 平台内支付
 * @author liucong
 */
define(function (require, exports) {

    'use strict';

    var minus = require('cobble/function/minus');
    var plus = require('cobble/function/plus');

    var Input = require('cobble/helper/Input');
    var Tab = require('cobble/ui/Tab');
    var Dialog = require('cobble/ui/Dialog');
    var service = require('common/service');

    // 设置支付密码对话框
    var SetPasswordDialog = require('../common/component/SetPasswordDialog');

    var form = require('common/form');
    var store = require('common/store');
    var service = require('common/service');
    var redirect = require('cobble/util/redirect');
    var container = $('.order-money');
    var couponCodeInput = $('#coupon-code');
    var stage = container.find('.stage');
    var payAmountText = container.find('.pay-amount-value');
    var couponDeductsText = container.find('#coupon-deducts');
    var balanceDeductsText = container.find('#balance-deducts');

    var validator;
    var passwordInput = $('.pay-password');
    var accountOther = $('.account-other > div');
    var checkedCouponRadio;

    function refresh() {

        var payAmount = store.get('payAmount');
        var coursesection = store.get('coursesection');

        if (coursesection) {
            if ($('.isSms')[0]) {
                if (Number(payAmount/coursesection) >= 1 ) {
                    $('.isSms').prop('display', 'block');
                } else {
                    $('.isSms').hide();
                }
            }
        }


        payAmountText.html(
            Number(payAmount).toFixed(2)
        );

        couponDeductsText.html(
          Number(store.get('couponAmount')).toFixed(2)
        );
        balanceDeductsText.html(
          Number(store.get('balanceAmount')).toFixed(2)
        );

        if (payAmount > 0) {
            $('.pay-approach').show();
        }
        else {
            $('.pay-approach').hide();
        }

        if (store.get('useCoupon')) {
            $('.account-coupon .box').show();
        }
    }

    // 这个方法在每种方法选中时优先执行
    function sync() {
        var price = Number(store.get('price'));

        // 余额，优惠券 奖学金 拥有的金额
        var balance = Number(store.get('balance'));
        // 优惠券需要请求才有，所以可能是 undefined
        var coupon = Number(store.get('coupon') || 0);

        // 实际付出的金额
        var balanceAmount = 0;
        var couponAmount = 0;
        var discountAmount = 0;
        var payAmount = price;

        var useCoupon = store.get('useCoupon');

        // 一切从新计算，避免逻辑混乱
        if (store.get('couponFreezed')) {
            couponAmount = store.get('couponAmount');
        }
        else if (useCoupon) {
            if (coupon >= price) {
                couponAmount = price;
                payAmount = 0;
            }
            else {
                couponAmount = coupon;
                payAmount = minus(price, couponAmount);
            }
        }

        if (store.get('useDiscount')) {
            discountAmount = Number(store.get('discount')) || 0;
            payAmount = minus(price, discountAmount);
        }

        store.set({
            balanceAmount: balanceAmount,
            couponAmount: couponAmount,
            payAmount: payAmount,
            discountAmount: discountAmount
        });
    }

    //选择优惠券或者限时折扣后重新计算分期信息
    function resetStage() {
        // var money = store.get('payAmount');
        var money = container.find('.pay-amount-value').text().replace(/,/g, '');
        var oriPeriods = store.get('periods');
        var choiceFenqi = store.get('choice_fenqi');
        var stageCheckbox = container.find('.stage :checkbox');
        var isSelectedStage = false;
        if (stageCheckbox[0] && stageCheckbox[0].checked) {
            isSelectedStage = true;
        }
        if (choiceFenqi) {
           if (Number(money) < 500) {
                //不可分期
                var content = '<label class="form-checkbox disabled"><input type="checkbox" disabled="disabled">花呗分期</label>'
                            + '<span class="warning">订单金额低于500不能进行分期</span>';
                stage.html(content);
            }
            else {
                if (isSelectedStage) {
                    var content = '<label class="form-checkbox checked"><input type="checkbox" checked="checked">花呗分期</label>'
                                + '<span class="stage-detail">¥<span class="repayment-period">70</span> x'
                                + '<span class="periods">12</span>期</span><span class="change-stage">修改分期</span>';
                }
                else {
                    var content = '<label class="form-checkbox checked"><input type="checkbox">花呗分期</label>'
                                + '<span class="stage-detail">¥<span class="repayment-period">70</span> x'
                                + '<span class="periods">12</span>期</span><span class="change-stage">修改分期</span>';
                }
                stage.html(content);

                service
                .getStageData({
                    money: money,
                    courseNum: store.get("courseNumber"),
                    courseType: store.get("courseType")
                })
                .done(function (response) {
                    if (response.code === 0) {
                        var fenqiDetail = response.data.fenqi_detail;
                        var hasOriPeriods = false;
                        $.each(fenqiDetail, function (index, item) {
                            if (item.periods == oriPeriods) {
                                hasOriPeriods = true;
                                stage.find('.repayment-period').html(item.every_periods_repayment);
                                stage.find('.periods').html(item.periods);
                            }
                        })
                        //没有之前选中的分期则默认选最大的
                        if (!hasOriPeriods) {
                            var item0 = fenqiDetail[0];
                            stage.find('.repayment-period').html(item0.every_periods_repayment);
                            stage.find('.periods').html(item0.periods);
                        }

                    }
                })
            }
        }
    }

    function enableCoupon() {

        store.set('useCoupon', true);

        sync();

        refresh();
    }

    function disableCoupon() {

        store.set('useCoupon', false);

        sync();

        refresh();

    }

    function enableDiscount() {

        store.set('useDiscount', true);

        sync();

        refresh();

    }

    function disableDiscount() {

        store.set('useDiscount', false);

        sync();

        refresh();

    }

    function disableAvailableCouponRadio() {
        if (checkedCouponRadio) {
            checkedCouponRadio.find('input[type="radio"]').prop('checked', false);
            checkedCouponRadio.removeClass('text-primary');
            checkedCouponRadio = null;
        }
    }

    // 如果有优惠券的话，就默认选中与课程等价的 没有等价的就选最大的
    function initUseCoupon() {
        if (store.get('useCoupon')) {

            var coupons = container
            .find('.account-coupon .available :radio');

            var couponPrice = store.get('couponPrice');
            var selectedCoupon = 0;
            var maxCoupon = 0;
            for (var i = 0; i < coupons.length; i++) {
                var couponValue = coupons[i].attributes['data-value'].value;
                if (Number(couponValue) == couponPrice) {
                    selectedCoupon = i;
                    break;
                }
                else if (Number(couponValue) > maxCoupon) {
                    maxCoupon = couponValue;
                    selectedCoupon = i;
                }
            }
            coupons[selectedCoupon].checked = true;
            store.set('useCoupon', true);
            store.set('coupon', coupons[selectedCoupon].value);
            store.set('couponId', coupons[selectedCoupon].attributes['data-id'].value);

            container
            .find('.account-other :checkbox')
            .prop(
                'checked',
                true
            );
            accountOther.show();
            enableCoupon();
        }
    }

    exports.init = function (options) {

        validator = options.validator;
        var mobile = store.get('user').mobile;
        var mobileMask = store.get('mobile');

        store.set({
            payAmount: store.get('price')
        });

        new Input({
            element: couponCodeInput,
            onChange: function () {

                var value = this.element.val();

                container
                .find('.account-coupon :checkbox')
                .prop(
                    'checked',
                    value !== ''
                );
                container.find('#coupon-code').prop('disabled','');
            }
        });


        container
        .on('change', '.account-other :checkbox', function () {
            if (this.checked) {
                accountOther.show();
                enableCoupon();
                // coursePrice.html(couponPrice);
            }
            else {
                accountOther.hide();
                disableCoupon();
            }
            resetStage();
        });

        var useCouponBtn = container.find('#use-coupon');
        var disuseCouponBtn = container.find('#disuse-coupon');


        useCouponBtn
        .on('click', function () {

            var element = $(this);
            var couponCode = couponCodeInput.val();
            if (!couponCode) {
                alert('请输入优惠券密码！');
                return false;
            }

            container
            .find('.account-coupon .form-radio :radio')
            .prop(
                'checked',
                true
            );

            service
            .checkFavCode({
                code: couponCode,
                pay_money: store.get('price'),
                teacher_id: store.get('teacherId'),
                lesson_way: store.get('lessonWay'),
                course_type: store.get('type'),
                subject_id: store.get('subjectId'),
                course_number: store.get('courseNumber')
            })
            .done(function (response) {

                var couponTips = container.find('.coupon-tips');
                if (response.code === 0) {

                    //element.hide();
                    useCouponBtn.prop('disabled', true);
                    disuseCouponBtn.prop('disabled', false);

                    couponTips.show();

                    disableAvailableCouponRadio();

                    container.find('#coupon-code').prop('disabled', true);

                    store.set('useCoupon', true);
                    store.set('coupon', response.data.money);
                    store.set('couponCode', couponCode);
                    store.set('couponId', response.data.fav_id);

                    // 触发优惠券计算
                    enableCoupon();
                    couponTips.html(
                        '<i class="icon icon-check"></i>已成功使用优惠券折抵' + store.get('couponAmount') + '元'
                    );

                } else {
                    container.find('.coupon-tips').html('');
                }
            })
        });

        disuseCouponBtn
        .on('click', function () {
            useCouponBtn.prop('disabled', false);
            couponCodeInput.prop('disabled', false);
            disuseCouponBtn.prop('disabled', true);

            store.set('coupon', null);
            store.set('couponCode', null);
            store.set('couponId', null);

            container.find('.coupon-tips').html('');

            enableCoupon();
        });

        container
        .on('click', '.btn-pay', function () {

            var password = $.trim($('[name="password"]').val());

            if (container.find('.pay-password').is(':visible')
                && !password
            ) {
                alert('请输入支付密码');
                return;
            }

            pay({
                purchaseId: store.get('purchaseId'),
                useCoupon: store.get('useCoupon'),
                approach: data.approach,
                bankNum: data.bankNum,
                balanceAmount: store.get('balanceAmount'),
                couponAmount: store.get('couponAmount'),
                payAmount: store.get('payAmount'),
                password: password,
                couponCode: store.get('couponCode')
            });
        })
        .on('click', '.account-coupon .available :radio', function () {
            var line = $(this).parents('tr').addClass('text-primary');
            var money = $(this).val();
            var id = $(this).data('id');

            if (checkedCouponRadio) {
                checkedCouponRadio.removeClass('text-primary');
            }
            checkedCouponRadio = line;

            if (money) {
                store.set('coupon', money);
                store.set('couponId', id);
                store.set('useCoupon', true);

                enableCoupon();

            }
            resetStage();
        });

       //修改分期
        stage
        .on('click', '.change-stage', function () {
            var money = container.find('.pay-amount-value').text().replace(/,/g, '');
            var oriPeriods = stage.find('.periods').text();
            service
            .getStageData({
                money: money,
                courseNum: store.get("courseNumber"),
                courseType: store.get("courseType")
            })
            .done(function (response) {
                if(response.code === 0) {
                    var fenqiDetail = response.data.fenqi_detail;
                    var length = fenqiDetail.length;
                    var tiexiInfo = response.data.fenqi.tiexi_info;
                    if (length != 3) {
                        var content = '<div class="inner-box">';
                    }
                    else {
                        var content = '<div class="inner-box three-items">';
                    }

                    $.each(fenqiDetail, function (index, item) {
                        var specialClass = '';
                        if ((item.periods == oriPeriods) && (index == 1 || index == 3)) {
                            specialClass = ' selected special';
                        }
                        else if ((item.periods == oriPeriods)) {
                            specialClass = ' selected';
                        }
                        else if (index == 1 || index == 3) {
                            specialClass = ' special';
                        }
                        var interestDetail = '含利息￥' + item.every_period_fee + '/期';
                        if (tiexiInfo.indexOf(item.periods) > -1) {
                            interestDetail = '含利息￥0.00/期';
                        }
                        content += '<div class="stage-item' + specialClass + '" data-periods="' + item.periods
                                +      '" data-period-pay="' + item.every_periods_repayment + '">'
                                +      '<span class="stage-detail">¥ ' + item.every_periods_repayment + ' x ' + item.periods + '期'
                                +      '<span>' + interestDetail + '</span>'
                                +  '</div>';
                    });
                    content += '<div class="confirm-choice">确定</div>';
                    content += '</div>';
                    var stageDialog = new Dialog({
                        title: '花呗分期',
                        content: content,
                        width: 703,
                        skinClass: 'stage-dialog'
                    });

                    var dialogElement = stageDialog.element;
                    dialogElement
                    .on('click', '.confirm-choice', function () {
                        var periods = dialogElement.find('.selected').data('periods');
                        service
                        .sendStageChoice({
                            courseNum: store.get('courseNumber'),
                            courseType: store.get('type'),
                            periods: periods
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                var periodPay = dialogElement.find('.selected').data('period-pay');
                                var periods = dialogElement.find('.selected').data('periods');
                                stage.find('.repayment-period').html(periodPay);
                                stage.find('.periods').html(periods);
                                stageDialog.hide();
                                stage.find('input[type=checkbox]').prop('checked', true);
                            }
                        })
                    })
                    .on('click', '.stage-item', function () {
                        dialogElement.find('.stage-item').removeClass('selected');
                        $(this).addClass('selected');
                    });
                }
            });
        });

        //是否勾选选择分期单选框
        container
        .on('change', '.stage :checkbox', function () {
            if (this.checked) {
                var periods = stage.find('.periods').text();
                service
                .sendStageChoice({
                    courseNum: store.get('courseNumber'),
                    courseType: store.get('type'),
                    periods: periods
                });
            }
            else {
                service
                .sendStageChoice({
                    courseNum: store.get('courseNumber'),
                    courseType: store.get('type'),
                    periods: 0
                });
            }
        });

        new Tab({
            element: container.find('.account-coupon .box'),
            navSelector: '.box-tabs li',
            contentSelector: '.box-body > div',
            navActiveClass: 'active'
        });

        initUseCoupon();

    };

    /**
     * 获取数据
     * @return {Object} 用于内部平台支付的数据
     */
    exports.getData = function () {
        var payType = [];
        var payPassword;
        var activityId;

        if (store.get('useCoupon')) {
            payType.push('9:' + store.get('couponAmount'));
            activityId = store.get('couponId');
        }

        payType = payType.join('_');

        return {
            payType: payType,
            payPassword: payPassword,
            activityId: activityId,
            payAmount: store.get('payAmount')
        }

    }

    exports.validate = function () {

        if (passwordInput.is(':visible')) {
            return validator.validate('passowrd', true);
        }
        else {
            return true;
        }
    }

    exports.setDiscount = function (discount) {

        var couponCheckbox = container.find('.account-other :checkbox');
        var couponContainer = couponCheckbox.closest('.account-other');

        if (discount) {
            accountOther.hide();
            disableCoupon();

            couponCheckbox
            .prop('checked', false)
            .prop('disabled', true);

            store.set('discount', discount);
            enableDiscount();

            couponContainer.prepend('<span class="tip">课程已经享受活动价，不可再使用优惠券！</span>');
        }
        else {
            couponCheckbox
            .prop('disabled', false);

            store.set('discount', 0);
            disableDiscount();

            couponContainer.find('.tip').remove();
        }
        resetStage();
    }
    //计算优惠券最大能优惠多少
    exports.maxCouponDiscount = function () {
        if (store.get('useCoupon')) {
            var coupons = container
            .find('.account-coupon .available :radio');

            var couponPrice = store.get('couponPrice');
            var maxCouponDiscount = 0;
            for (var i = 0; i < coupons.length; i++) {
                var couponValue = coupons[i].attributes['data-value'].value;
                if (Number(couponValue) == couponPrice) {
                    maxCouponDiscount = couponValue;
                    break;
                }
                else if (Number(couponValue) > maxCouponDiscount) {
                    maxCouponDiscount = couponValue;
                }
            }
            return maxCouponDiscount;
        }
        else {
            return 0;
        }
    }

});
