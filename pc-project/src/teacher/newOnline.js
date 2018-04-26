/**
 * @file 老师详情 线上课
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var Select = require('cobble/form/Select');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');
    var common = require('./newDetail/common');
    var comment = require('./newDetail/newComment');
    var container = $('#teacher-course');
    var cookie = require('cobble/util/cookie');
    var onlineCourseBox = container.find('.online-box');

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

                       /*
        console.log('day'+day);
        console.log('hour'+hour);
        console.log('minute'+minute);
        console.log('sceond'+second);*/
        return time_txt;
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

    exports.init = function () {
        common.init();
        // 评价
        comment.init();

        store.set('sortCourseType', 3);

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

    };
});