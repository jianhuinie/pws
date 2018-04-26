/**
 * @file 一对一课程订单 选课弹窗
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var store = require('common/store');
    var service = require('common/service');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.title 弹窗标题
     * @property {string} options.courseName 一对一课程标题
     * @property {Array} options.price
                         options.price.min 课程最低价
                         options.price.max 课程最高价
     * @property {Array} options.lessonWay
                         options.lessonWay.teacher 老师上门
                         options.lessonWay.student 学生上门
                         options.lessonWay.online 线上授课
                         options.lessonWay.discuss 协商地点
     * @property {Array} options.combo 课时套餐
     * @property {number} options.courseId 课程ID
     * @property {number} options.courseType 课程类型
     */
    function One2OnePurchaseDialog(options) {
        $.extend(this, One2OnePurchaseDialog.defaultOptions, options);
        this.init();
    }


    /*
     * 四舍五入
     *
     * x, 操作数
     * num, 保留小数位
     */
    function xround(x, num){
        return Math.round(x * Math.pow(10, num)) / Math.pow(10, num);
    }


    /*
     * 计算价位
     * @param {number} price 课程单价
     * @param {number} hours 时长
     * @param {number} discount 折扣 0-10
     * @return promise
     */
    function countTotalPrice (price, hours, discount) {
        var price = parseFloat(price) || 0;
        var hours = parseFloat(hours) || 0;
        var discount = parseFloat(discount) || 10; // 无折扣
        var totalPrice = price * hours * discount / 10;
        return xround(totalPrice, 2);
    }


    /**
     * 获取是否有学生身份
     * @param  {Array} roles 身份数组
     * @return {Bool}  返回是否具有学生身份，默认为false
     */
    function getHasStudentRole(roles) {
        var studentRoleCode = "2";
        var length = roles.length;
        var hasStudentRole = false;

        if (length > 0) {
            for(var i = 0; i < length; i++) {
               if (roles[i] === studentRoleCode) {
                    hasStudentRole = true;
                    break;
                }
            }
        }

        return hasStudentRole;
    }

    /**
     * 尝试报名
     *
     * 这里约束身份条件
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     */
    function tryToEnroll(url) {

        // 适用用户登录的情况
        if (store.get('teacherNum') == store.get('user').number) {
            alert({
                title: '温馨提示',
                content: '您不能购买自己的课哦',
                buttons: [{
                    text: '我知道了',
                    type: 'primary',
                    handler: function(){
                        this.hide();
                    }
                }]
            });
            return ;
        }

        if (store.get('user').type === 0) {
            service
            .getUserType()
            .done(function (response) {
                if (response.code === 0) {
                    var roles = response.data.roles;
                    var hasStudentRole = getHasStudentRole(roles);
                    var text = '';

                    if (hasStudentRole) {
                        text = '你目前是老师身份，需要切换到学生身份才能向TA约课';
                    }
                    else {
                        text = '你目前是老师身份，无法向TA约课，是否开通学生身份？';
                    }
                    //约课 变更身份后需要刷新当前页面
                    new BanLessonDialog({
                        text: text,
                        hasStudentRole: hasStudentRole,
                        onSuccess: function(){
                            location.href = url;
                        },
                        next: url,
                        noskip: false
                    });
                }
            });
        } else {
            location.href = url;
        }
    }

    One2OnePurchaseDialog.prototype = {

        init: function () {

            var me = this;
            var tempLessonWay = '', tempComboId = 0; // 上课方式,默认课时包为自定义
            var tempPrice = 0, tempHours = 1, tempDiscount = 10; // 临时存储用户选择

            // 价格
            var priceCont = '';
            if (me.price.min == me.price.max) {
                priceCont = '<em>¥' + me.price.min + '</em>/小时';
            } else {
                priceCont = '<em>¥' + me.price.min + ' - ' + me.price.max + '</em>/小时';
            }

            // 上课方式 - 内容
            var lessonWayMap = {
                teacher: '老师上门',
                student: '学生上门',
                discuss: '协商地点',
                online: '线上授课'
            };

            var lessonWayCont = '';
            var count = 0;
            $.each(me.lessonWay, function (index, item) {
                if (item) {
                    count++;
                    if (count == 1) {
                        lessonWayCont += '<span class="lesson-way active" data-way="' + index + '" data-price="' + item + '">'
                                       + lessonWayMap[index]
                                       + '</span>';
                        tempPrice = item; // 最初识的价位
                        tempLessonWay = index; // 最初的上课方式
                    } else {
                        lessonWayCont += '<span class="lesson-way" data-way="' + index + '" data-price="' + item + '">'
                                       + lessonWayMap[index]
                                       + '</span>';
                    }

                }
            });

            // 课时优惠包 － 内容
            var comboCont = '<ul class="combo-list">'
                          + '<li data-cid="0" class="active">'
                          +     '<i class="combo-icon"></i>'
                          +     '<div class="detail">'
                          +         '<div class="combo-title">'
                          +             '<b>自定义</b>'
                          +         '</div>'
                          +         '<div class="combo-info">'
                          +             '支持选多个课时'
                          +         '</div>'
                          +     '</div>'
                          + '</li>';

            $.each(me.combo, function (index, item) {
                var discount = '无折扣';
                if (item.discount != '10') {
                    discount = item.discount + '折';
                }
                comboCont += '<li data-cid="' + item.id + '" data-hours="' + item.hours + '" data-discount="' + item.discount + '">'
                           +     '<i class="combo-icon"></i>'
                           +     '<div class="detail">'
                           +         '<div class="combo-title">'
                           +             '<b>' + item.hours + '</b>小时'
                           +             '<span>（' + discount + '）</span>'
                           +         '</div>'
                           +         '<div class="combo-info">'
                           +             item.desc_cut
                           +         '</div>'
                           +     '</div>'
                           + '</li>'
            });

            // 默认价位
            var defaultPrice = countTotalPrice(tempPrice, tempHours, tempDiscount);

            comboCont += '</ul>';

            var content = '<h3 class="course-name">' + me.courseName + '</h3>'

                        + '<div class="form">'

                        +     '<div class="form-group">'
                        +         '<label class="form-label high-label">价格：</label>'
                        +         '<div class="form-controls">'
                        +             '<div class="form-static text-error">'
                        +                 priceCont
                        +             '</div>'
                        +         '</div>'
                        +     '</div>'

                        +     '<div class="form-group lesson-way-group">'
                        +         '<label class="form-label">上课方式：</label>'
                        +         '<div class="form-controls">'
                        +             '<div class="form-static">'
                        +                 lessonWayCont
                        +                 '<span class="error">'
                        +                     '<i class="icon icon-times-circle"></i>请选择上课方式'
                        +                 '</span>'
                        +             '</div>'
                        +         '</div>'
                        +     '</div>'

                        +     '<div class="form-group combo-group">'
                        +         '<label class="form-label">课时包：</label>'
                        +         '<div class="form-controls">'
                        +             '<div class="form-static">'
                        +                 comboCont
                        +                 '<span class="error">'
                        +                     '<i class="icon icon-times-circle"></i>请选择课时优惠包'
                        +                 '</span>'
                        +             '</div>'
                        +         '</div>'
                        +     '</div>'

                        +     '<div class="form-group custom-combo">'
                        +         '<label class="form-label">数量：</label>'
                        +         '<div class="form-controls">'
                        +             '<span class="input-group">'
                        +                 '<span class="input-group-addon sub">-</span>'
                        +                 '<input class="form-text" type="int" min="1" max="999" name="hours" value="1">'
                        +                 '<span class="input-group-addon add">+</span>'
                        +             '</span>'
                        +             '<span class="error"></span>'
                        +             '<span class="error custom-combo-error">'
                        +                 '<i class="icon icon-times-circle"></i>购买课时不能为空'
                        +             '</span>'
                        +         '</div>'
                        +     '</div>'

                        +     '<div class="dialog-action">'
                        +         '<div class="count-price">总计：<span class="total-price">¥ ' + defaultPrice + '</span></div>'
                        +         '<button class="btn-primary btn-purchase">购买课时</button>'
                        +     '</div>'

                        + '</div>';

            var dialog = new Dialog({
                title: me.title,
                content: content,
                skinClass: 'purchase-course-dialog',
                width: 750
            });

            var element = dialog.element;
            var lessonWayError = element.find('.lesson-way-group .error');
            var comboError = element.find('.combo-group .error');
            var timeError = element.find('.custom-combo .custom-combo-error');

            // 验证对象
            me.validator = new Validator({
                element: element,
                realtime: true,
                fields: {
                    hours: {
                        errors: {
                            min: '最少购买 1 小时',
                            max: '最多购买 999 小时',
                            pattern: '请输入正整数'
                        }
                    }
                }
            });

            element
            .on('click', '.lesson-way', function (e) { // 上课方式

                lessonWayError.hide();// 隐藏error

                var target = $(e.currentTarget);
                var targetFather = target.closest('.form-static');

                targetFather.find('.lesson-way')
                .each(function (index, item) {
                    $(item).removeClass('active');
                });
                target.addClass('active');

                // 上课方式
                tempLessonWay = target.data('way');

                // 计算总价
                tempPrice = target.data('price');
                var totalPrice = countTotalPrice(tempPrice, tempHours, tempDiscount);
                element.find('.total-price').text('¥ ' + totalPrice);
            })

            .on('click', '.combo-list li', function (e) { // 课时包

                comboError.hide(); // 隐藏error

                var target = $(e.currentTarget);
                var targetFather = target.closest('.combo-list');

                tempComboId = target.data('cid');

                targetFather.find('li')
                .each(function (index, item) {
                    $(item).removeClass('active');
                });

                target.addClass('active');

                if (target.data('cid') == 0) { // 自定义
                    element.find('.custom-combo').show();
                    // 计算总价
                    element.find('input[name="hours"]').blur();
                } else {
                    element.find('.custom-combo').hide();
                    // 计算总价
                    tempHours = target.data('hours');
                    tempDiscount = target.data('discount');
                }
                // 计算总价
                var totalPrice = countTotalPrice(tempPrice, tempHours, tempDiscount);
                element.find('.total-price').text('¥ ' + totalPrice);
            })

            .on('blur', 'input[name="hours"]', function (e) { // 课时数量
                var target = $(e.currentTarget);
                tempHours = target.val();
                timeError.hide(); // 隐藏error
                // 计算总价
                if (me.validator.validate() && tempHours) {
                    tempDiscount = 10; // 此时不享受折扣
                    var totalPrice = countTotalPrice(tempPrice, tempHours, tempDiscount);
                    element.find('.total-price').text('¥ ' + totalPrice);
                }
            })

            .on('click', '.sub', function (e) { // 减课时
                var target = $(e.currentTarget);
                var hoursInput = target.closest('.input-group').find('input[name="hours"]');
                var currentHours = $.trim(hoursInput.val());

                var pattern = /^\d{1,}$/;
                if (pattern.test(currentHours) && currentHours > 1) {
                    currentHours = currentHours - 1;
                    hoursInput.val(currentHours);

                    hoursInput.blur();

                }
            })

            .on('click', '.add', function (e) { // 加课时
                var target = $(e.currentTarget);
                var hoursInput = target.closest('.input-group').find('input[name="hours"]');
                var currentHours = $.trim(hoursInput.val());

                var pattern = /^\d{1,}$/;
                if (pattern.test(currentHours) && currentHours < 999) {
                    currentHours = parseInt(currentHours) + 1;
                    hoursInput.val(currentHours);

                    hoursInput.blur();

                }
            })

            .on('click', '.btn-purchase', function (e) { // 购买课时
                var url = '/pay/productDetail?';
                var flag = true;
                if (tempLessonWay == '') { // 上课方式
                    lessonWayError.show();
                    flag = false;
                }

                if (tempHours == 0 && tempComboId !== 0) { // 课时包 － 未选择
                    comboError.show();
                    flag = false;
                }

                if (tempComboId === 0 && tempHours == 0) { // 课时包 － 自定义
                    timeError.show(); // 0 报错
                    flag = false;
                }

                if (me.validator.validate() && flag) {
                    if (tempComboId === 0) { // 未选择套餐
                        url += 'course_id=' + me.courseId
                             + '&type=' + me.courseType
                             + '&lesson_way=' + tempLessonWay
                             + '&hours=' + tempHours;
                    } else {
                        url += 'course_id=' + me.courseId
                             + '&type=' + me.courseType
                             + '&lesson_way=' + tempLessonWay
                             + '&combo_id=' + tempComboId;
                    }

                    if (!store.get('user').number) {
                        // dialog.hide();
                        new LoginDialog({
                            onSuccess: function () {
                                location.href = url;
                            }
                        });
                        return;
                    }
                    else {
                        tryToEnroll(url);
                    }
                }
            });

        }

    }

    One2OnePurchaseDialog.defaultOptions = {
        title: '购买课时',
        width: 750,
        onSuccess: $.noop,
        skinClass: 'purchase-course-dialog',
        disposeOnHide: true
    };

    return One2OnePurchaseDialog;

});