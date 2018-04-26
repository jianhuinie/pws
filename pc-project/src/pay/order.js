/**
 * @file 提交新订单
 * @author zhujialu,liucong
 */
define(function (require, exports) {

    'use strict';

    var multiply = require('cobble/function/multiply');
    var minus = require('cobble/function/minus');
    var Validator = require('cobble/form/Validator');

    var student = require('./order/student');
    var internalPay = require('./order/internalPay');

    var form = require('common/form');
    var store = require('common/store');
    var service = require('common/service');
    var Select = require('cobble/form/Select');

    var SaveButton = require('common/component/SaveButton');
    var container = $('#main');
    var AddressForm = require('teacherCenter/component/AddressForm'); // 地址薄
    var mailInfo = require('./order/mailInfo'); //邮寄资料

    var validator = new Validator({
        element: $('.form-student'),
        fields: {
            name: {
                errors: {
                    minlength: '请输入最少2个字符',
                    maxlength: '请将字数控制在2-30个字以内',
                    pattern: '请输入汉字、字母、空格、点号等格式的姓名'
                }
            },
            mobile: {
                errors: {
                    required: '请输入手机号',
                    pattern: '手机号码错误'
                }
            },
            code: {
                errors: {
                    required: '请输入验证码'
                }
            },
            student_name: {
                errors: {
                    required: '请输入上课人姓名',
                    minlength: '请输入最少2个字符',
                    maxlength: '请将字数控制在2-30个字以内',
                    pattern: '请输入汉字、字母、空格、点号等格式的姓名'
                }
            },
            area: {
                rules: {
                    required: true
                },
                errors: {
                    required: '请选择所在地区'
                }
            },
            location_addr: {
                errors: {
                    required: '请填写详细地址'
                }
            },
            /*student_address: {
                errors: {
                    required: '请输入老师上门地址'
                }
            },*/
            password: {
                errors: {
                    required: '请输入支付密码'
                }
            }
        }
    });

    function getUsePlatEnsureData () {
        var isPreferredBusiness = store.get('is_preferred_business');
        var value;
        if (isPreferredBusiness) {
            value = 1;
        }
        else {
            var usePlatEnsure = container.find('.footer-ensure :checkbox');
            value = usePlatEnsure.is(':checked') ? 1 : 0;
        }
        return {
            usePlatEnsure: value
        };
    }

    /*
     * 保存地址
     *
     * mapBtns 地图操作
     */
    function saveAddress (mapBtns) {
        var bdAreaName = container.find('input[name="bd_area_name"]').val();
        var cityId = container.find('input[name="city"]').val();
        var areaId = container.find('input[name="area"]').val();
        var userAreaName = container.find('.area span').text();

        // 保存位置
        return service
        .checkAddress({
            cityId: cityId,
            areaName: bdAreaName
        })
        .done(function (response) {
            if (response.code === 0) {

                mapBtns.hide();
                // 获取地图区级信息 - 只刷新区信息
                if (response.data.match_area && response.data.match_area.id) {
                    if (areaId != response.data.match_area.id) {
                        confirm({
                            content: '小秘书发现你输入的地址似乎在“' + bdAreaName + '”<br />是否需要小秘书帮你把“' + userAreaName + '”修改为“' + bdAreaName + '”呢？',
                            title: '温馨提示',
                            width: 400,
                            buttons: [
                                {
                                    text: '帮我修改',
                                    type: 'primary',
                                    handler: function () {
                                        // 获取地图区级信息 - 只刷新区信息
                                        addressForm.setAreaChangeSrc('saveAddr'); // 牵涉区变动地图刷新与否
                                        addressForm.regionSelect.areaSelect.setValue(response.data.match_area.id);
                                        this.hide();
                                        // 触发保存按钮
                                        container.find('#btn-submit').click();
                                    }
                                },
                                {
                                    text: '不修改',
                                    handler: function () {
                                        this.hide();
                                        // 触发保存按钮
                                        container.find('#btn-submit').click();
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        // 触发保存按钮
                        container.find('#btn-submit').click();
                    }

                }

            }
        });
    }

    /*
     * 创建订单
     */
    function createPurchase (data) {

        var formData = student.getData();

        var isSelf = formData.self == 1;
        var isClassCourse = store.get('isClassCourse');

        var teacherId = store.get('teacherId');
        var payAmount = data.payAmount;
        var periods = data.periods;

        return service
        .createPurchase(
            data,
            {
                errorHandler: {
                    '100014': function (response) {

                        var text = store.get('user').id == teacherId
                                 ? '你不能约自己的课'
                                 : '权限错误';

                        alert(text, '温馨提示');

                    },
                    '6': function (response) {
                        alert({
                            title: '温馨提示',
                            content: '不好意思，同一节课不能重复报名哦~<br />'
                                   + '如果你之前提交过订单未支付，请去 <span class="text-primary">我的订单'
                                   + ' &gt; 待支付</span> 完成支付',
                            buttons: [
                                {
                                    text: '查看我的订单',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                        location.href = '/order/studentOrders';
                                    }
                                },
                                {
                                    text: '取消',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    },
                    '100039': function (response) {
                        alert(
                            '班课已经开课，不能再提交订单',
                            '温馨提示'
                        );
                    },
                    '100051': function (response) {
                        alert({
                            title: '温馨提示',
                            content: '当前班课无法购买',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    },
                    '100040': function (response) {
                        var url, text;
                        if (store.get('type') == 11 || store.get('type') == 12) {
                            url = '/i/' + store.get('orgNumber');;
                            text = '返回机构主页';
                        }
                        else {
                            url = '/t/' + store.get('teacherNumber');;
                            text = '返回老师主页';
                        }

                        alert({
                            title: '温馨提示',
                            content: '来晚了一步！<br />目前班课已经报满，你可以联系老师增加名额。',
                            buttons: [
                                {
                                    text: text,
                                    type: 'primary',
                                    handler: function () {
                                        location.href = url;
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                }
            }
        )
        .done(function (response) {

            if (response.code === 0) {
                var data = response.data;

                if (data.err_code && data.err_code == '66') {
                    alert({
                        title: '温馨提示',
                        content: '该课程订单已经存在，是否查看？',
                        buttons: [
                            {
                                text: '取消',
                                handler: function () {
                                    this.hide();
                                }
                            },
                            {
                                text: '查看订单',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                    location.href = data.order_url;
                                }
                            }

                        ]
                    });
                    return;
                }

                if (payAmount == 0) {
                    success('提交成功', function () {
                        location.href = '/pay/result?purchase_id=' + data.purchase_id;
                    });
                }
                else {
                    if (periods > 0) {
                        location.href = '/pay/payFqProductPurchase?purchase_id=' + data.purchase_id;
                    }
                    else {
                        location.href = '/pay/payProductPurchase?purchase_id=' + data.purchase_id;
                    }
                }
            }
        });
    }

    exports.init = function () {
        var isVideoCourse = store.get('isVideoCourse');
        var isClassCourse = store.get('isClassCourse');
        var couponPrice = store.get('couponPrice');
        var activityPrice = store.get('activityPrice');
        var singlePrice = store.get('singlePrice');
        var supportMaterialsPost = store.get('support_materials_post'); //是否支持邮寄资料
        
        if (!isVideoCourse) {
            student.init({
                validator: validator
            });
        }

        // 地址薄
        if (!isVideoCourse) {
            var addressForm = new AddressForm({
                element: container.find('.new-address')
            });

            if (store.get('lessonWay') == 'teacher' || store.get('lessonWay') == 'discuss' || store.get('lessonWay') == 'offline') {
                student.showAddress();
            }
        }

        internalPay.init({
            validator: validator
        });

       if (supportMaterialsPost) { //如果支持邮寄资料
            mailInfo.init();
        }

        // 折扣下拉
        var marketActivity = store.get('marketActivity');
        if (marketActivity) {
            var limittimeHint = $('.footer .limitime-hint');
            var payMoney = $('.course .pay-money');
            var originalMoney = store.get('originalMoney');
            var coursePrice = $('.course_price');

            var discountSelect = new Select({
                element: container.find('.course .discount-dropdown'),
                renderTemplate: function (data) {
                    var html = $.map(data, function (item) {

                        var discount = minus(Number(item.pre_price), Number(item.discount_price)).toFixed(2);

                        if (!item.pre_price) {
                            discount = 0;
                        }
                        return ''
                            +   '<li data-discount="'
                            +       Math.abs(discount)
                            +       '" data-value="'
                            +       item.type + (item.type == '-1' ? '' : (',' + Number(item.discount_price)))
                            +   '">'
                            +       '<span class="name">' + item.tag_name + '</span>'
                            +       '<span class="discount">' + (item.id == '-1' ? item.original_discount : discount) + '</span>'
                            +   '</li>';
                    });

                    return html.join('');
                },
                data: $.merge([{
                    discount_price: store.get('price'),
                    pre_price: 0,
                    tag_name: '课程折扣',
                    type: '-1',
                    original_discount: originalMoney
                        ? (minus(Number(store.get('price')), Number(originalMoney)).toFixed(2))
                        : '无折扣'
                }], marketActivity),
                onChange: function (e, data) {

                    if (Number(data.discount) ){
                        store.set('price', payMoney.data('preprice'));
                    }
                    else {
                        store.set('price', payMoney.data('price'));
                    }
                    internalPay.setDiscount(Number(data.discount));

                    if (data.value && data.value != '-1') {
                        coursePrice.html(activityPrice);
                        var pay = Number(data.value.split(',')[1]).toFixed(2);
                        payMoney.html(pay);
                    }
                    else {
                        payMoney.html(couponPrice);
                        if (isClassCourse) {
                            coursePrice.html(couponPrice);
                        }
                        else {
                            coursePrice.html(singlePrice);
                        }
                    }

                    if (data.value != '-1') {
                        limittimeHint.show();
                    }
                    else {
                        limittimeHint.hide();
                    }
                }
            });

            // 初始赋予无折扣的值
            discountSelect.setValue('-1');

            // 如果有折扣活动，默认选择第一组折扣活动
            if (marketActivity) {
                var couponPayMoney = couponPrice - internalPay.maxCouponDiscount();
                if (Number(marketActivity[0].discount_price) < Number(couponPayMoney)) {
                    discountSelect.setValue(marketActivity[0].type + ',' + Number(marketActivity[0].discount_price));
                }
            }

            var couponPayMoney = couponPrice - internalPay.maxCouponDiscount();
            var maxDiscount = {}; // 各折扣及优惠券中的最大折扣组合
            var minPrice = couponPayMoney; // 记录最低价位
            $.each(marketActivity, function (key, item) {
                if (Number(item.discount_price) < Number(minPrice)) {
                    minPrice = item.discount_price;
                    maxDiscount = item;
                }
            });

            if (!$.isEmptyObject(maxDiscount)) {
                discountSelect.setValue(maxDiscount.type + ',' + Number(maxDiscount.discount_price));
                payMoney.data('preprice', maxDiscount.pre_price);
            }
        }

        // 平台支付保障
        var ensure = container.find('.footer-ensure');
        var orderMoney = container.find('.order-money');
        var stage = container.find('.stage');

        ensure
        .on('click', '.cbk-mask', function () {
            alert("保底开班的课程暂不支持关闭平台保障");
        })
        .on('change', ':checkbox', function () {

            var offClass = 'ensure-off';

            if ($(this).is(':checked')) {
                ensure.removeClass(offClass);
            }
            else {
                alert({
                    content: '您关闭了平台支付保障，支付的学费将<br />直接打给老师，无法通过跟谁学平台申<br />请退款，如需退款请与老师协商。',
                    buttons: [
                        {
                            text: '确认关闭',
                            type: 'primary',
                            handler: function () {
                                ensure.addClass(offClass);
                                this.hide();
                            }
                        }
                    ]
                });
            }
        });

        var saveBtn = new SaveButton({
            element: $('#btn-submit'),
            saveText: '正在提交...',
            save: function () {

                if (!isVideoCourse && !student.validate(['name'])) {
                    return;
                }

                if (!isVideoCourse && store.get('lessonWay') == 'teacher') {
                    if (!student.validate(['name', 'area', 'location_addr' ]) || !internalPay.validate()) {
                        return;
                    }
                }
                else if (!isVideoCourse && store.get('lessonWay') == 'discuss') {
                    if (!student.validate(['name']) || !internalPay.validate()) {
                        return;
                    }
                }

                var data = {};

                if (supportMaterialsPost) { //如果支持邮寄资料，验证表单并把表单数据合并到data里
                    if (!mailInfo.validate()) {
                        return;
                    }
                    else {
                        $.extend(data, mailInfo.getData());
                    }
                }   

                data.type = store.get('type');
                if (data.type == 2 || data.type == 3 || data.type == 4) {
                    data.courseNumber = store.get('courseNumber');
                }
                else if (data.type == 11 || data.type == 12) { // 机构X课
                    data.courseNumber = store.get('courseNumber');
                    data.lessonWay = store.get('lessonWay');
                    data.hours = store.get('hours');
                }
                else {
                    data.courseId = store.get('courseId');
                    data.courseNumber = store.get('courseNumber');
                    data.comboId = store.get('comboId');
                    data.hours = store.get('hours');
                    data.lessonWay = store.get('lessonWay');
                }

                // 提交订单时加分期相关参数
                var isFenqiWhitelist = store.get('is_fenqi_whitelist');
                if (isFenqiWhitelist) {
                    data.fenqiFlag = store.get('fenqi_flag');
                    var lastPay = orderMoney.find('.pay-amount-value').text().replace(/,/g, '');
                    if (Number(lastPay) >= 500) {
                        data.fenqiFlag = 1;
                    }
                    if (stage.html()) {
                        var stageCheckbox = container.find('.stage :checkbox');
                        if (stageCheckbox[0].checked) {
                            data.periods = stage.find('.periods').text();
                            data.fenqiFlag = 1;
                        }
                        else {
                            data.periods = 0;
                        }
                    }
                    else {
                        data.periods = 0;
                    }
                }
                else {
                    data.periods = 0;
                    data.fenqiFlag = 0;
                }

                // 3810 二次确认弹窗
                if (data.type == 4) {
                    confirm({
                        title: '温馨提示',
                        content: '支付成功后课酬将直接支付给机构，无法通过跟谁学平台申请退款。',
                        width: 200,
                        buttons: [
                            {
                                text: '确认提交订单',
                                type: 'primary',
                                handler: function () {
                                    $.extend(data, isVideoCourse ? null : student.getData(), internalPay.getData());

                                    // 处理discount
                                    if (marketActivity) {
                                        var discount = discountSelect.getValue() + '';
                                        discount = discount.split(',');

                                        if (discount[0] != '-1') {
                                            data.discountType = discount[0];
                                            data.pay_money = discount[1];
                                        }
                                    }

                                    if (!store.get('isVideoCourse')) {
                                        // 处理平台支付保障
                                        $.extend(
                                            data,
                                            getUsePlatEnsureData()
                                        );
                                        /*/ 短信提醒
                                        $.extend(
                                            data,
                                            getIsSmsData()
                                        );*/
                                    }

                                    // 优先保存位置
                                    var mapBtns = container.find('.map-oper');
                                    if (mapBtns.is(':visible')) {
                                        saveAddress(mapBtns);
                                    }
                                    else {
                                        return createPurchase(data);
                                    }
                                }
                            },
                            {
                                text: '取消',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
                else {

                    $.extend(data, isVideoCourse ? null : student.getData(), internalPay.getData());

                    //处理discount
                    if (marketActivity) {
                        var discount = discountSelect.getValue() + '';
                        discount = discount.split(',');

                        if (discount[0] != '-1') {
                            // data.market_activity_id = discount[0];
                            data.discountType = discount[0];
                            data.pay_money = discount[1];
                        }
                    }

                    if (!store.get('isVideoCourse')) {
                        // 处理平台支付保障
                        $.extend(
                            data,
                            getUsePlatEnsureData()
                        );
                        /*/ 短信提醒
                        $.extend(
                            data,
                            getIsSmsData()
                        );*/
                    }

                    // 优先保存位置
                    var mapBtns = container.find('.map-oper');
                    if (mapBtns.is(':visible')) {
                        saveAddress(mapBtns);
                    }
                    else if (isClassCourse && store.get('retireFlag') == 100) { // 班课不可退的二次弹窗
                        confirm({
                            title: '温馨提示',
                            content: '该课程报名后不提供线上退课服务，如需退课请与老师协商。',
                            width: 200,
                            buttons: [
                                {
                                    text: '确认购买',
                                    type: 'primary',
                                    handler: function () {
                                        return createPurchase(data);
                                    }
                                },
                                {
                                    text: '再想想',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        return createPurchase(data);
                    }
                }
            }
        });

    };

});