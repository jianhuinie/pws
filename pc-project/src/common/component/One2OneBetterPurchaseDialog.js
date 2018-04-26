/**
 * @file 一对一优选课程订单 选课弹窗
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
     * @property {Array} options.categories 课程分类
     * @property {Array} options.lessonWay
                         options.lessonWay.TEACHER 老师上门
                         options.lessonWay.STUDENT 学生上门
                         options.lessonWay.ONLINE 线上授课
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
    function countTotalPrice (price, hours) {
        var price = parseFloat(price) || 0;
        var hours = parseFloat(hours) || 0;
        var totalPrice = price * hours;
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
        }
        else {
            location.href = url;
        }
    }

    One2OnePurchaseDialog.prototype = {

        init: function () {

            var me = this;
            var tempLessonWay = '', tempCourseId = ''; // 上课方式,默认课时包为自定义
            var tempPrice = 0, tempCombo = 'custom', tempHours = 10; // 临时存储用户选择
            // tempDiscount = 10;

            // 价格 - 默认展示第一种分类的第一种上课方式：1老师上门2学生上门3线上授课
            var priceCont = '';
            if (me.categories[0].price_teacher !== undefined) {
                priceCont = '<em>¥' + me.categories[0].price_teacher + '</em>/小时';
            }
            else if (me.categories[0].price_student !== undefined) {
                priceCont = '<em>¥' + me.categories[0].price_student + '</em>/小时';
            }
            else if (me.categories[0].price_online !== undefined) {
                priceCont = '<em>¥' + me.categories[0].price_online + '</em>/小时';
            }

            // 分类 - 内容
            var categoriesCont = '';
            var count = 0;
            $.each(me.categories, function (index, item) {
                if (item) {
                   count++;
                   if (count == 1) {
                        categoriesCont += '<span class="categories" data-id="' + item.normal_course_id + '" data-online="' + item.price_online + '" data-teacher="' + item.price_teacher + '" data-student="' + item.price_student + '">'
                                        + item.name
                                        + '</span>';
                   }
                   else {
                        categoriesCont += '<span class="categories" data-id="' + item.normal_course_id + '" data-online="' + item.price_online + '" data-teacher="' + item.price_teacher + '" data-student="' + item.price_student + '">'
                                        + item.name
                                        + '</span>';
                   }
                }
            });

            // 课时优惠包 - 内容
            var comboCont = '<span class="combo active" data-hours="custom">自定义</span>';
            $.each(me.combo, function (index, item) {
                if (item) {
                   comboCont += '<span class="combo" data-hours="' + item.hours + '">'
                              + item.hours + '个小时'
                              + '</span>';
                }
            });

            // 默认价位
            var defaultPrice = countTotalPrice(tempPrice, tempHours);

            var content = '<h3 class="course-name">' + me.courseName + '</h3>'

                        + '<div class="form">'

                        +     '<div class="form-group price-group">'
                        +         '<label class="form-label high-label">价格：</label>'
                        +         '<div class="form-controls">'
                        +             '<div class="form-static text-error">'
                        +                 priceCont
                        +             '</div>'
                        +         '</div>'
                        +     '</div>'

                        +     '<div class="form-group categories-group">'
                        +         '<label class="form-label">选择分类：</label>'
                        +         '<div class="form-controls">'
                        +             '<div class="form-static">'
                        +                 categoriesCont
                        +                 '<span class="error">'
                        +                     '<i class="icon icon-times-circle"></i>请选择分类'
                        +                 '</span>'
                        +             '</div>'
                        +         '</div>'
                        +     '</div>'

                        +     '<div class="form-group lesson-way-group">'
                        +         '<label class="form-label">上课方式：</label>'
                        +         '<div class="form-controls">'
                        +             '<div class="form-static">'
                        +                 '<div></div>'
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
                        +                 '<input class="form-text" type="int" min="10" max="1000" name="hours" value="10">'
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
            var priceContainer = element.find('.price-group em');
            var categoriesError = element.find('.categories-group .error');
            var lessonWayContainer = element.find('.lesson-way-group .form-static div');
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
                            min: '最少购买 10 小时',
                            max: '最多购买 1000 小时',
                            pattern: '请输入正整数'
                        }
                    }
                }
            });

            element
            .on('click', '.categories', function (e) { // 选择分类
                categoriesError.hide(); // 隐藏error

                var target = $(e.currentTarget);
                var targetFather = target.closest('.form-static');

                if (target.hasClass('active')) {
                    return;
                }

                targetFather
                .find('.categories')
                .each(function (index, item) {
                    $(item).removeClass('active');
                });
                target.addClass('active');

                // course_id
                tempCourseId = target.data('id');

                // 展示相应上课方式
                var lessonWayCont = '';
                var count = 0;

                if (target.data('teacher') != null) {
                    lessonWayCont += '<span class="lesson-way active" data-way="teacher" data-price="' + target.data('teacher') + '">'
                                   + '老师上门'
                                   + '</span>';

                    tempPrice = target.data('teacher'); // 最初识的价位
                    tempLessonWay = 'teacher'; // 最初的上课方式
                    count++;

                    // 更新价格展示
                    priceContainer.html(tempPrice);
                    // 计算总价
                    var totalPrice = countTotalPrice(tempPrice, tempHours);
                    element.find('.total-price').text('¥ ' + totalPrice);
                }

                if (target.data('student') != null) {
                    if (count === 0) {
                        lessonWayCont += '<span class="lesson-way active" data-way="student" data-price="' + target.data('student') + '">'
                                       + '学生上门'
                                       + '</span>';

                        tempPrice = target.data('student'); // 最初识的价位
                        tempLessonWay = 'student'; // 最初的上课方式
                        count++;

                        // 更新价格展示
                        priceContainer.html(tempPrice);
                        // 计算总价
                        var totalPrice = countTotalPrice(tempPrice, tempHours);
                        element.find('.total-price').text('¥ ' + totalPrice);
                    }
                    else {
                        lessonWayCont += '<span class="lesson-way" data-way="student" data-price="' + target.data('student') + '">'
                                       + '学生上门'
                                       + '</span>';
                    }
                }

                if (target.data('online') != null) {
                    if (count === 0) {
                        lessonWayCont += '<span class="lesson-way active" data-way="online" data-price="' + target.data('online') + '">'
                                       + '线上授课'
                                       + '</span>';

                        tempPrice = target.data('online'); // 最初识的价位
                        tempLessonWay = 'online'; // 最初的上课方式
                        count++;

                        // 更新价格展示
                        priceContainer.html(tempPrice);
                        // 计算总价
                        var totalPrice = countTotalPrice(tempPrice, tempHours);
                        element.find('.total-price').text('¥ ' + totalPrice);
                    }
                    else {
                        lessonWayCont += '<span class="lesson-way" data-way="online" data-price="' + target.data('online') + '">'
                                       + '线上授课'
                                       + '</span>';
                    }
                }

                lessonWayContainer.html(lessonWayCont);
            })

            .on('click', '.lesson-way', function (e) { // 上课方式

                lessonWayError.hide(); // 隐藏error

                var target = $(e.currentTarget);
                var targetFather = target.closest('.form-static');

                if (target.hasClass('active')) {
                    return;
                }

                targetFather
                .find('.lesson-way')
                .each(function (index, item) {
                    $(item).removeClass('active');
                });
                target.addClass('active');

                // 上课方式
                tempLessonWay = target.data('way');
                tempPrice = target.data('price');
                // 更新价格展示
                priceContainer.html(tempPrice);

                // 计算总价
                var totalPrice = countTotalPrice(tempPrice, tempHours);
                element.find('.total-price').text('¥ ' + totalPrice);
            })

            .on('click', '.combo', function (e) { // 课时包

                comboError.hide(); // 隐藏error

                var target = $(e.currentTarget);
                var targetFather = target.closest('.combo-group');

                if (target.hasClass('active')) {
                    return;
                }

                targetFather
                .find('.combo')
                .each(function (index, item) {
                    $(item).removeClass('active');
                });

                target.addClass('active');

                if (target.data('hours') == 'custom') { // 自定义
                    element.find('.custom-combo').show();
                    // 计算总价
                    element.find('input[name="hours"]').blur();
                }
                else {
                    element.find('.custom-combo').hide();
                    // 计算总价
                    tempHours = target.data('hours');
                }
                // 计算总价
                var totalPrice = countTotalPrice(tempPrice, tempHours);
                element.find('.total-price').text('¥ ' + totalPrice);
            })

            .on('blur', 'input[name="hours"]', function (e) { // 课时数量
                var target = $(e.currentTarget);

                tempHours = target.val();
                timeError.hide(); // 隐藏error
                // 计算总价
                if (me.validator.validate() && tempHours) {
                    var totalPrice = countTotalPrice(tempPrice, tempHours);
                    element.find('.total-price').text('¥ ' + totalPrice);
                }
            })

            .on('click', '.sub', function (e) { // 减课时
                var target = $(e.currentTarget);
                var hoursInput = target.closest('.input-group').find('input[name="hours"]');
                var currentHours = $.trim(hoursInput.val());

                var pattern = /^\d{1,}$/;
                if (pattern.test(currentHours) && currentHours > 10) {
                    currentHours = currentHours - 5;
                    hoursInput.val(currentHours);

                    hoursInput.blur();
                }
            })

            .on('click', '.add', function (e) { // 加课时
                var target = $(e.currentTarget);
                var hoursInput = target.closest('.input-group').find('input[name="hours"]');
                var currentHours = $.trim(hoursInput.val());

                var pattern = /^\d{1,}$/;
                if (pattern.test(currentHours) && currentHours < 1000) {
                    currentHours = parseInt(currentHours) + 5;
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

                if (tempHours == 0 && tempCombo != 'custom') { // 课时包 － 未选择
                    comboError.show();
                    flag = false;
                }

                if (tempCombo == 'custom' && tempHours == 0) { // 课时包 － 自定义
                    timeError.show(); // 0 报错
                    flag = false;
                }

                if (me.validator.validate() && flag) {

                    url += 'course_id=' + tempCourseId
                         + '&type=1'
                         + '&lesson_way=' + tempLessonWay
                         + '&hours=' + tempHours;

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

            // 默认选择第一分类下第一种上课方式
            element
            .find('.categories-group .categories:first')
            .click();

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