/**
 * @file 老师详情 课程总页
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var Select = require('cobble/form/Select');
    var Validator = require('cobble/form/Validator');
    var common = require('./newDetail/common');
    var comment = require('./newDetail/newComment');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');
    var calendar = require('./newDetail/calendar');
    var cookie = require('cobble/util/cookie');
    var container = $('#teacher-course');
    var oneCourseBox;
    var videoCourseBox;
    var onlineCourseBox = container.find('.online-box');
    var offlineCourseBox = container.find('.offline-box');
    var validatorHash = {};
    var selectHash = {};

    function dateFormat(time) {
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;

        // 天 24*3600
        if (time > 86400) {
            day = Math.floor(time / 86400);
        }
        time %= 86400;

        if (time > 3600) {
            hour = Math.floor(time / 3600);
        }
        time %= 3600;

        if (time > 60) {
            minute = Math.floor(time / 60);
        }
        second = time % 60;

        var time_txt = (day > 9 ? day : '0' + day ) + '天' +
                       (hour > 9 ? hour : '0' + hour) + '时'+
                       (minute > 9 ? minute : '0' + minute) +'分' +
                       (second > 9 ? second : '0' + second) + '秒';

        return time_txt;
    }

    // 控制分期按钮的显示隐藏
    function displayStageButton (container, price) {
        if ((price >= 500) && (price <= 10000)) {
            container.find('.stage-pay').css('display', 'inline-block');
        }
        else {
            container.find('.stage-pay').hide();
        }
    }

    /*触发*/

    // 初始化一对一课下拉框
    function initSelectors() {

        var list = oneCourseBox.find('.detail-info');

        list.each(function(i, item){
            var item = $(item);
            var selector = item.find('.dropdown');
            var hours = item.find('.hours');

            selectHash[i+1] = new Select({
                element: selector,
                onChange: function (e, data) {
                    var parent = this.element.parent().parent();
                    var key = data.value.split('-');
                    parent.data('lessonway', key[0]);
                    parent.data('lessonvalue', key[1]);

                    // 自定义时长
                    if (parent.find('.custom').hasClass('active')) {

                        var hours = parseInt(parent.find('.hours').val());

                        if (parent.data('lessonvalue') &&
                             hours > 0 ) {
                            var price = parseFloat(hours*parent.data('lessonvalue')).toFixed(2);
                            parent.find('.price').html('总价：<span class="total-price">￥' +
                                price + '</span>');
                            displayStageButton(parent, price);
                        }
                    // 课程优惠包
                    }
                    else if (parent.find('.combo').hasClass('active')) {

                        var item = parent.find('.course-list').find('.active');
                        if (parent.data('lessonvalue') &&
                             item[0] ) {
                            var price = parseFloat(item.data('hours')*item.data('discount')*parent.data('lessonvalue')/10).toFixed(2);
                            parent.find('.price').html('总价：<span class="total-price">￥' +
                                price + '</span>');
                            displayStageButton(parent, price);
                        }
                    }

                    // 关掉校验
                    parent.find('.lesson-way').find('.error').hide();

                }
            });

            validatorHash[i+1] = new Validator({
                element: item,
                realtime: true,
                fields: {
                    hours: {
                        errors: {
                            required: '请输入时长',
                            min: '最少购买 1 小时',
                            max: '最多购买 999 小时',
                            pattern: '请输入整数'
                        }
                    }
                }
            });
        });
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

    // 检查是否重复报名班课
    function checkRepeatCourse(courseNum,url,type) {

        service
        .checkCourseRepeat(
            { courseNumber: courseNum} ,
            {
                errorHandler: {
                    '100014': function () {
                        //success("您已购买了该课程！");
                        var _html = '<div style="text-align:left;">同一节班课不能重复报名哦~<br/>如果你之前报名未完成支付，请去<a href="/order/studentOrders" style="color:#f29100;">我的订单</a>完成支付</div>';
                        alert({
                            title: '温馨提示',
                            content: _html,
                            width: 420,
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                        // 修复登陆后没有刷新页面的bug
                        if (type && type == 'login') {
                            location.reload();
                        }
                        return false;
                    }
                }
            }
        )
        .done(function(response){
            if (response.code == 0) {
                location.href = url;
            }
        });
    }

    /**
     * 检查班课立即报名的情况
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     */
    function checkClassSignup(courseNum) {
        // 适用用户登录的情况
        if (store.get('teacherNum') == store.get('user').number) {
            alert({ title: '温馨提示',
                    content: '您不能购买自己的课哦~',
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
        var url = '/pay/productDetail';
        var params = {
            course_number: courseNum,
            type: 2
        };
        var search = $.param(params);

        url += '?' + search;

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
                            checkRepeatCourse(courseNum,url);
                        },
                        next: location.href,
                        noskip: false
                    });
                }
            });
        } else {
            checkRepeatCourse(courseNum,url);
        }
    }

    // 班课约课
    function reserveClassCourseCheck(courseNum) {

            // 如果用户没登陆,弹出登陆框
            var hasLogin = store.get('haslogin');
            if (!hasLogin) {

                var url = '/pay/productDetail';
                var params = {
                    course_number: courseNum,
                    type: 2
                };
                var search = $.param(params);
                url += '?' + search;

                new LoginDialog({
                    onSuccess: function () {
                        checkRepeatCourse(courseNum,url,'login');
                    },
                    next: url
                });
                return;
            }
            checkClassSignup(courseNum);
    }

    // 约课检查
    function reserveCourseCheck(url) {
        // 如果是自己看自己页面点击约课弹出如下内容
        if (store.get('teacherNum') == store.get('user').number) {
            alert({ title: '温馨提示',
                    content: '您不能购买自己的课哦~',
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

    // 倒计时
    function dateFormat(time) {
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;

        // 天 24*3600
        if (time > 86400) {
            day = Math.floor(time / 86400);
        }
        time %= 86400;

        if (time > 3600) {
            hour = Math.floor(time / 3600);
        }
        time %= 3600;

        if (time > 60) {
            minute = Math.floor(time / 60);
        }
        second = time % 60;

        var time_txt = (day > 9 ? day : '0' + day ) + '天' +
            (hour > 9 ? hour : '0' + hour) + '时'+
            (minute > 9 ? minute : '0' + minute) +'分' +
            (second > 9 ? second : '0' + second) + '秒';

        return time_txt;
    }

    // 限时活动倒计时
    function zheKouTime(){
        var priceTip = container.find('.price-tip');
        if(priceTip.length == 0){
            return;
        }
        var element = $(priceTip[0]);
        var cur = null,
            begin = null,
            end = null,
            left = null,
            time = element.find('.time');

        if (element.hasClass('price-tip-begin')) {
            cur = element.data('cur');
            begin = element.data('start');
            left = begin - cur;
            var interval = setInterval(function(){
                time.html( dateFormat(--left) );
                if (left == 0) {
                    clearInterval(interval);
                }
            },1000);
        }

        if (element.hasClass('price-tip-end')) {
            cur = element.data('cur');
            end = element.data('end');
            left = end - cur;
            var interval = setInterval(function(){
                time.html( dateFormat(--left) );
                if (left == 0) {
                    clearInterval(interval);
                }
            },1000);
        }
    }

    exports.init = function () {

        zheKouTime();

        common.init();
        // 评价
        comment.init();

        // 初始化1对1
        function initOneCourse () {

            oneCourseBox = container.find('.one-course-box');

            initSelectors();

            // 可授课时间
            calendar.init();

            oneCourseBox
            .on('click', '.base-info', function (e) { // 点击
                var element = $(this);
                var list = container.find('.detail-info');
                list.each(function(i, item){
                    $(item).hide();
                    $(item).prev().show();
                });
                element.hide();
                element.next().show();
            })
            .on('click', '.combo', function (e) {// 课时优惠包
                var element = $(this);
                var parent = element.parent().parent();
                if (parent.find('.course-list').html()) {
                    return false;
                }

                service
                .getCourseCombo({
                    teacherNum: store.get('teacherNum')
                })
                .done(function (response) {
                    if (response.code === 0) {

                        var data = response.data.course_combo;

                        var _html = [];
                        _html.push('');
                        for (var i = 0; i < data.length; i++) {
                            _html.push('<li class="combo-item" data-cid="'+data[i].id+'" data-hours="'+data[i].hours+'" data-discount="'+data[i].discount+'">',
                                           '<i class="teacher-book"></i>',
                                           '<div class="detail">',
                                                '<div class="sub-new-title"><b>'+data[i].hours+'</b>小时<span>'+(data[i].discount == 10 ? '（无折扣）' :'（'+data[i].discount+'折）')+'</span></div>',
                                                '<div>'+data[i].desc_cut+'</div>',
                                           '</div>',
                                       '</li>');
                        }

                        var courseList = element.parent().parent().find('.course-list');
                        courseList.html(_html.join(''));
                    }
                });
            })
            .on('click', '.packup', function (e){// 收起按钮
                var parent = $(this).parent().parent();
                parent.prev().show();
                parent.hide();
            })
            .on('click', '.combo-item', function (e) {
                var element = $(this);
                oneCourseBox.find('li').removeClass('active');
                element.addClass('active');
                var parent = element.parent().parent().parent();
                parent.data('combo',element.data('cid'));

                var item = element;
                if (parent.data('lessonvalue')) {
                    var price = parseFloat(item.data('hours')*item.data('discount')*parent.data('lessonvalue')/10).toFixed(2);
                    parent.find('.price').html('总价：<span class="total-price">￥' + price + '</span>');
                    if (price >= 1000000) {
                        parent.find('.total-price').css({'font-size': '16px'});
                    }
                    displayStageButton(parent, price);
                }
                parent.find('.button-box').show();
                parent.find('.course-list-box .error').hide();
            })
            .on('focus', '.hours', function (e) {
                var element = $(this);
                var parent = element.parent().parent();
                parent.find('.button-box').show();
                parent.find('.stage-pay').hide();
            })
            .on('blur', '.hours', function (e) {
                var element = $(this);
                var parent = element.parent().parent();
                var hours = parseInt(element.val());

                if (parent.data('lessonvalue') &&
                     hours > 0 ) {
                    var price = parseFloat(hours*parent.data('lessonvalue')).toFixed(2);
                    parent.find('.price').html('总价：<span class="total-price">￥' +
                        price + '</span>');
                    if (price >= 1000000) {
                        parent.find('.total-price').css({'font-size': '16px'});
                    }
                    displayStageButton(parent, price);
                }
                parent.find('.button-box').show();
            })
            .on('click', '.set-time', function (e) {
                var element = $(this);
                var parent = element.parent().parent();
                parent.find('.set-time').removeClass('active');
                element.addClass('active');
                var price = 0;
                parent.find('.stage-pay').hide();

                parent.find('.course-list-box .error').hide();
                // 自定义时长
                if (element.hasClass('custom')) {
                    parent.find('.custom-box').show();
                    parent.find('.course-list').hide();

                    var hours = parseInt(parent.find('.hours').val());

                    if (parent.data('lessonvalue') &&
                         hours > 0 ) {
                        var price = parseFloat(hours*parent.data('lessonvalue')).toFixed(2);
                        parent.find('.price').html('总价：<span class="total-price">￥' + price + '</span>');
                        if (price >= 1000000) {
                            parent.find('.total-price').css({'font-size': '16px'});
                        }
                        displayStageButton(parent, price);
                    }
                // 课程优惠包
                } else {
                    parent.find('.course-list').show();
                    parent.find('.custom-box').hide();

                    var item = parent.find('.course-list').find('.active');
                    if (parent.data('lessonvalue') &&
                         item[0] ) {
                        price = parseFloat(item.data('hours')*item.data('discount')*parent.data('lessonvalue')/10).toFixed(2);
                        parent.find('.price').html('总价：<span class="total-price">￥' + price + '</span>');
                        if (price >= 1000000) {
                            parent.find('.total-price').css({'font-size': '16px'});
                        }
                        displayStageButton(parent, price);
                    }
                }
                parent.find('.button-box').show();
            })
            .on('click', '.btn-primary', function (e) {// 购买课时
                var element = $(this);
                var parent = element.parent().parent();
                var index = parent.data('index');

                // 校验课时
                if (parent.find('.custom').hasClass('active')
                    && !validatorHash[index].validate()) {
                    return false;
                }
                // 校验上课方式
                if (!parent.data('lessonway')) {
                    parent.find('.lesson-way').find('.error').show();
                    return false;
                } else {
                    parent.find('.lesson-way').find('.error').hide();
                }

                // 校验课时优惠包
                if (parent.find('.combo').hasClass('active')){
                    var comboActive = parent.find('.course-list-box .active');
                    if (!comboActive[0]) {
                        parent.find('.course-list-box .error').show();
                        return false;
                    } else {
                        parent.find('.course-list-box .error').hide();
                    }
                }

                var comboId = parent.data('combo');
                var courseId = parent.data('course');
                var lessonWay = parent.data('lessonway');
                var hours = parent.find('.hours').val();
                var url = '';

                if (parent.find('.combo').hasClass('active')) {
                    url = '/pay/productDetail?'
                                + 'course_id=' + courseId
                                + '&lesson_way=' + lessonWay
                                + '&combo_id=' + comboId
                                + '&type=1';
                }

                if (parent.find('.custom').hasClass('active')) {
                    url = '/pay/productDetail?'
                                + 'course_id=' + courseId
                                + '&lesson_way=' + lessonWay
                                + '&hours=' + hours
                                + '&type=1';
                }

                if (url) {
                    reserveCourseCheck(url);
                }
            })
            .on('click', '.stage-pay', function (e) {// 分期付款
                var curParent = $(this).parent();
                var grandParent = curParent.parent();
                var money = curParent.find('.total-price').text().substring(1);
                var hasLogin = store.get('user').number > 0;
                if (hasLogin) {
                    if (store.get('teacherNum') == store.get('user').number ) {
                        alert('您不能购买自己的课哦~');
                        return false;
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
                                         location.reload();
                                    },
                                    next: location.href,
                                    noskip: false
                                });
                            }
                        });
                    }
                    else {
                        service
                        .getStageData({
                            courseNum: grandParent.data('number'),
                            courseType: 1,
                            money: money
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
                                    if (index == 0) {
                                        specialClass = ' selected';
                                    }
                                    else if (index == 1 || index == 3) {
                                        specialClass = ' special';
                                    }
                                    var interestDetail = '含利息￥' + item.every_period_fee + '/期';
                                    if (tiexiInfo.indexOf(item.periods) > -1) {
                                        interestDetail = '含利息￥0.00/期';
                                    }
                                    content += '<div class="stage-item' + specialClass + '" data-periods="' + item.periods + '">'
                                            +      '<span class="stage-detail">¥ ' + item.every_periods_repayment + ' x ' + item.periods + '期'
                                            +      '<span>' + interestDetail + '</span>'
                                            +  '</div>';
                                });
                                content += '<div class="stage-buy">分期购买</div>';
                                content += '</div>';
                                var stageDialog = new Dialog({
                                    title: '花呗分期',
                                    content: content,
                                    width: 703,
                                    skinClass: 'stage-dialog'
                                });

                                var dialogElement = stageDialog.element;
                                dialogElement
                                .on('click', '.stage-buy', function () {
                                    var periods = dialogElement.find('.selected').data('periods');
                                    service
                                    .sendStageChoice({
                                        courseNum: grandParent.data('number'),
                                        courseType: 1,
                                        periods: periods
                                    })
                                    .done(function (response) {
                                        if (response.code === 0) {
                                            stageDialog.hide();

                                            var comboId = grandParent.data('combo');
                                            var courseId = grandParent.data('course');
                                            var lessonWay = grandParent.data('lessonway');
                                            var hours = grandParent.find('.hours').val();
                                            var url = '/pay/productDetail?'
                                                    + 'course_id=' + courseId
                                                    + '&lesson_way=' + lessonWay
                                                    ;

                                            if (grandParent.find('.combo').hasClass('active')) {
                                                url = url
                                                    + '&combo_id=' + comboId
                                                    +  '&type=1';
                                            }

                                            if (grandParent.find('.custom').hasClass('active')) {
                                                url = url
                                                    + '&hours=' + hours
                                                    +  '&type=1';
                                            }

                                            if (url) {
                                                location.href = url;
                                            }
                                        }
                                    })
                                })
                                .on('click', '.stage-item', function () {
                                    dialogElement.find('.stage-item').removeClass('selected');
                                    $(this).addClass('selected');
                                });
                            }
                        });
                    }
                }
                else {
                    new LoginDialog({
                        onSuccess: function () {
                            location.reload();
                        }
                    });
                }
            });
        }

        // 初始化线下课
        function initOfflineCourse () {
            new Select({
                element: container.find('.class-course-sort'),
                name: 'category',
                value: store.get('sortby'),
                onChange: function (e, data) {
                    location.href = store.get('url') + '?sort_by=' + data.value;
                }
            });

            var priceTip = container.find('.price-tip');
            if (priceTip.length > 0) {

                priceTip.each(function(i, item){
                    var element = $(item);
                    var cur = null,
                        begin = null,
                        end = null,
                        left = null,
                        time = element.find('.time');

                    if (element.hasClass('price-tip-begin')) {
                        cur = element.data('cur');
                        begin = element.data('start');
                        left = begin - cur;
                        var interval = setInterval(function(){
                            time.html( dateFormat(--left) );
                            if (left == 0) {
                                clearInterval(interval);
                            }
                        },1000);
                    }

                    if (element.hasClass('price-tip-end')) {
                        cur = element.data('cur');
                        end = element.data('end');
                        left = end - cur;
                        var interval = setInterval(function(){
                            time.html( dateFormat(--left) );
                            if (left == 0) {
                                clearInterval(interval);
                            }
                        },1000);
                    }
                })
            }
        }

        // 初始化在线课
        function initOnlineCourse () {

            new Select({
                element: container.find('.class-course-sort'),
                name: 'category',
                value: store.get('sortby'),
                onChange: function (e, data) {
                    location.href = store.get('url') + '?sort_by=' + data.value;
                }
            });


            var priceTip = container.find('.price-tip');
            if (priceTip.length > 0) {

                priceTip.each(function(i, item){
                    var element = $(item);
                    var cur = null,
                        begin = null,
                        end = null,
                        left = null,
                        time = element.find('.time');

                    if (element.hasClass('price-tip-begin')) {
                        cur = element.data('cur');
                        begin = element.data('start');
                        left = begin - cur;
                        var interval = setInterval(function(){
                            time.html( dateFormat(--left) );
                            if (left == 0) {
                                clearInterval(interval);
                            }
                        },1000);
                    }

                    if (element.hasClass('price-tip-end')) {
                        cur = element.data('cur');
                        end = element.data('end');
                        left = end - cur;
                        var interval = setInterval(function(){
                            time.html( dateFormat(--left) );
                            if (left == 0) {
                                clearInterval(interval);
                            }
                        },1000);
                    }
                })

            }
        }

        // 初始化视频课
        function initVideoCourse () {
            videoCourseBox = container.find('.video-box')

            videoCourseBox
            .on('click', '.btn-default', function (e) { // 视频课全部跳转到视频详情页
                var element = $(this);
                var link = element.parent().data('link');
                location.href = link;
            });
        }

        initOneCourse();
        initOfflineCourse();
        initOnlineCourse();
        initVideoCourse();

        container
        .on('click', '.course-nav li', function () { // 课程tab切换ajax
            var target = $(this);

            if (target.hasClass('active')) {
                return false;
            }
            else {
                target.addClass('active').siblings().removeClass('active');

                // 存储当前课程类型
                store.set('courseType', target.data('type'));

                service
                .getCourseAjax({
                    number: store.get('teacherNum'),
                    type: store.get('courseType'),
                    page: 1
                })
                .done(function (response) {
                    if (response.code === 0) {

                        container
                        .find('.course-content')
                        .html(response.data.tpl.course_list);

                        Tooltip.init(container.find('[data-title]'));

                        // 初始化课程信息
                        if (store.get('courseType') == 2) {
                            initOfflineCourse();
                        }
                        else if (store.get('courseType') == 3) {
                            initVideoCourse();
                        }
                        else if (store.get('courseType') == 8) {
                            initOnlineCourse();
                        }
                        else { // 一对一扩展为普通和优选两种了
                            initOneCourse();
                        }

                    }
                });
            }
        })
        .on('click', '.course-tag span', function () { // 课程标签ajax
            var target = $(this);

            if (target.hasClass('active')) {
                return false;
            }
            else {

                // 存储当前课程tag
                store.set('courseTag', target.data('id'));

                service
                .getCourseAjax({
                    number: store.get('teacherNum'),
                    type: store.get('courseType'),
                    tagId: store.get('courseTag'),
                    page: 1
                })
                .done(function (response) {
                    if (response.code === 0) {

                        container
                        .find('.course-content')
                        .html(response.data.tpl.course_list);

                        Tooltip.init(container.find('[data-title]'));

                        // 初始化课程信息
                        if (store.get('courseType') == 2) {
                            initOfflineCourse();
                        }
                        else if (store.get('courseType') == 3) {
                            initVideoCourse();
                        }
                        else if (store.get('courseType') == 8) {
                            initOnlineCourse();
                        }
                        else {
                            initOneCourse();
                        }

                    }
                });
            }
        })
        .on('click', '.pager [data-page]', function (e) { // 翻页ajax
            var target = $(this);

            service
            .getCourseAjax({
                number: store.get('teacherNum'),
                type: store.get('courseType'),
                tagId: store.get('courseTag'),
                page: target.data('page')
            })
            .done(function (response) {
                if (response.code === 0) {

                    container
                    .find('.course-content')
                    .html(response.data.tpl.course_list);

                    Tooltip.init(container.find('[data-title]'));

                    // 初始化课程信息
                    if (store.get('courseType') == 2) {
                        initOfflineCourse();
                    }
                    else if (store.get('courseType') == 3) {
                        initVideoCourse();
                    }
                    else if (store.get('courseType') == 8) {
                        initOnlineCourse();
                    }
                    else {
                        initOneCourse();
                    }
                }
            });

            e.preventDefault();
        });


    };
});