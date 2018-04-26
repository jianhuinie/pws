/**
 * @file 老师详情页评论列表
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    //require('common/ui');
    var Select = require('cobble/form/Select');
    var Validator = require('cobble/form/Validator');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var leaveMessageDialog = require('common/component/LeaveMessageDialog');
    var orgAdvisoryDialog = require('common/component/AdvisoryDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var courseMap = require('common/map/baidu');
    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');
    var cookie = require('cobble/util/cookie');

    var container = $('#teacher-course');
    var oneCourseBox = container.find('.one-course-box');
    var videoCourseBox = container.find('.video-box');
    var onlineCourseBox = container.find('.online-box');
    var offlineCourseBox = container.find('.offline-box');
    var teacherProfile = $('#teacher-profile');
    var mapHash = {};
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

                       /*
        console.log('day'+day);
        console.log('hour'+hour);
        console.log('minute'+minute);
        console.log('sceond'+second);*/
        return time_txt;
    }
    //控制分期按钮的显示隐藏
    function displayStageButton (container, price) {
        if ((price >= 500) && (price <= 10000)) {
            container.find('.stage-pay').css('display', 'inline-block');
        }
        else {
            container.find('.stage-pay').hide();
        }
    }

    // 获取课程列表
    function getCourseList(type, selector, key, sortBy, isDefault) {

        //var sortBy = sortSelect ? sortSelect.getValue() : 'display_order';
        var pageType = 'offlinePage';

        if (type == 2) {
            pageType = 'onlinePage';
        }
        if (type == 4) {
            pageType = 'videoPage';
        }

        return service
        .getTeacherCourseList({
            teacherNum: store.get('teacherNum'),
            page: store.get(pageType),
            pageSize: 10,
            courseType: type,
            sortBy: sortBy ? sortBy : '',
            isDefault: isDefault ? isDefault : '',
            isPreview: store.get('ispreview')
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                var tpl = data.tpl[key];

                var content = container.find(selector);

                content.html(tpl);

                Tooltip.init(container.find('[data-title]'));

            }
        });
    }

    /*/ 初始化一对一课下拉框
    function initSelectors() {

        var list = oneCourseBox.find('.detail-info');

        list
        .each(function(i, item){
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
                    } else if (parent.find('.combo').hasClass('active')) {

                        var item = parent.find('.course-list').find('.active');
                        if (parent.data('lessonvalue') &&
                             item[0] ) {
                            var price = parseFloat(item.data('hours')*item.data('discount')*parent.data('lessonvalue')/10).toFixed(2);
                            parent.find('.price').html('总价：<span class="total-price">￥' +
                                price + '</span>');
                        }
                        displayStageButton(parent, price);
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
    */
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

        var courseNav = container.find('.course-nav');

        // initSelectors();

        // 初始化班课排序
        courseNav
        .find('li')
        .each(function(i, item){
            if ($(item).data('nav') == 'offline-course-box') {
                store.set('sortCourseType', 2);
            }
            if ($(item).data('nav') == 'online-course-box' && store.get('sortCourseType')) {
                store.set('sortCourseType', 3);
            }
        });

        new Select({
            element: container.find('.class-course-sort'),
            name: 'category',
            onChange: function (e, data) {
                var sortBy = '';
                var isDefault = '';
                // 默认排序
                if (data.value == 1) {
                    isDefault = 1;
                    sortBy = 'update_time';
                    store.set('isdefault', 1);
                    store.set('sortby','update_time');
                    if (store.get('sortCourseType') == 2) {
                        getCourseList(2,'.online-course-box','online_course_list', sortBy, isDefault);
                    } else if (store.get('sortCourseType') == 3) {
                        getCourseList(3,'.offline-course-box','offline_course_list', sortBy, isDefault);
                    }

                // 最近开课
                } else if (data.value == 2) {
                    sortBy = 'begin_time';
                    isDefault = '0';
                    store.set('isdefault', 0);
                    store.set('sortby','begin_time');
                    if (store.get('sortCourseType') == 2) {
                        getCourseList(2,'.online-course-box','online_course_list', sortBy, isDefault);
                    } else if (store.get('sortCourseType') == 3) {
                        getCourseList(3,'.offline-course-box','offline_course_list', sortBy, isDefault);
                    }
                // 最近发布
                } else if (data.value == 3) {
                    sortBy = 'update_time';
                    isDefault = '0';
                    store.set('isdefault', 0);
                    store.set('sortby','update_time');
                    if (store.get('sortCourseType') == 2) {
                        getCourseList(2,'.online-course-box','online_course_list', sortBy, isDefault);
                    } else if (store.get('sortCourseType') == 3) {
                        getCourseList(3,'.offline-course-box','offline_course_list', sortBy, isDefault);
                    }
                }
            }
        });

        courseNav
        .on('click', 'li', function (e) { // tab切换

            var element = $(this);
            var nav = element.data('nav');
            var flag = $('#main').hasClass('course-active');
            var classCourseSort = container.find('.class-course-sort');

            if (element.hasClass('active')) {
                return false;
            }

            courseNav.find('li').removeClass('active');
            container.find('.list').hide();

            element.addClass('active');

            if (nav != 'one-course-box') {
                if (flag) {
                    container.find('.'+nav).show();
                    container.find('.static-'+nav).hide();
                } else {
                    container.find('.'+nav).hide();
                    container.find('.static-'+nav).show();
                }
            } else {
                container.find('.'+nav).show();
            }


            // 视频课异步接口
            if (nav == 'video-course-box' && flag) {
                getCourseList(4,'.video-course-box','video_course_list','update_time');
                classCourseSort.hide();
            }
            // 在线直播异步接口
            if (nav == 'online-course-box') {
                store.set('sortCourseType', 2);
                if (flag) {
                    getCourseList(2,'.online-course-box','online_course_list','update_time',1);
                    classCourseSort.show();
                }
            }
            // 线下授课异步接口
            if (nav == 'offline-course-box') {
                store.set('sortCourseType', 3);
                if (flag) {
                    getCourseList(3,'.offline-course-box','offline_course_list','update_time',1);
                    classCourseSort.show();
                }
            }
            // 一对一课程
            if (nav == 'one-course-box' && flag) {
                classCourseSort.hide();
            }
        })
        .on('click', '.trial-kf', function (e) { // 试听留单－客服（非老师主动设置）
            var target = $(e.currentTarget);
            var haslogin = store.get('user').number > 0;
            var isOrgTeacher = store.get('org_id'); // 为0即非机构老师
            var teacherNum = store.get('teacherNum');
            var dialogName = target.data('dialog');

            var isOneOnOneTeacher = store.get('is_one_on_one_teacher'); //是否是一对一老师
            var isSendToteacher = true;  //留单至老师
            var channelValue = '';
            if (isOneOnOneTeacher) { //如果是一对一老师，则留单至客服, 则channelValue为'youxuan_teacher_pc'
                isSendToteacher = false;
                channelValue = 'youxuan_teacher_pc';
            }

            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 't-detail-reserva',
                stype: '1',
                client: 'PC',
                page_type: leaveMessPageType,
                track_id: cookie.get('__track_id__'),
                _timestamp: new Date().getTime(),
                user_number: store.get('user').number,
                user_role: store.get('user').type,
                location_type: leaveMessPageType+'_2',
                tid: store.get('teacherId'),
                cid: '',
                query: '',
            };
            WAT.send(url, params);

            if (haslogin && store.get('user').type === 0) { // 已登录老师身份用户 haslogin
                service
                .getUserType()
                .done(function (response) {
                    if (response.code === 0) {
                        var roles = response.data.roles;
                        var hasStudentRole = getHasStudentRole(roles);
                        var text = '';

                        if (hasStudentRole) {
                            text = '你目前是老师身份，需要切换到学生身份才能' + dialogName;
                        }
                        else {
                            text = '你目前是老师身份，无法' + dialogName + '，是否开通学生身份？';
                        }
                        // 变更身份
                        new BanLessonDialog({
                            text: text,
                            hasStudentRole: hasStudentRole,
                            next: '0',
                            onSuccess: function () {
                                if (isOrgTeacher && !isOneOnOneTeacher) { // 预约试听 － 是机构老师并且不是一对一老师
                                    new orgAdvisoryDialog({
                                        title: dialogName,
                                        objectNumber: teacherNum,
                                        contentType: 'cdb.teacher',
                                        onSuccess: function () {
                                            // 身份切换，刷新页面
                                            location.reload();
                                        }
                                    });
                                }
                                else { // 预约试听 － 个体老师 
                                    new leaveMessageDialog({ 
                                        teacher: 'teacher',
                                        teacherNum: store.get('teacherNum'),
                                        sendToteacher: isSendToteacher,
                                        skinClass: 'leave-message-detail',
                                        channel: channelValue,
                                        oneOnOneTeacherMobile: store.get('one_on_one_teacher_mobile'),
                                        onSuccess: function () {
                                            // 身份切换，刷新页面
                                            location.reload();
                                        }
                                    });
                                }
                            },
                            noskip: false
                        });
                    }
                });
            } else { // 未登录用户 及 学生身份用户
                if (isOrgTeacher && !isOneOnOneTeacher) { // 预约试听 － 是机构老师并且不是一对一老师
                    new orgAdvisoryDialog({
                        title: dialogName,
                        objectNumber: teacherNum,
                        contentType: 'cdb.teacher',
                        onSuccess: function () {
                            // 身份切换，刷新页面
                            location.reload();
                        }
                    });
                }
                else { // 预约试听 － 个体老师
                    new leaveMessageDialog({ 
                        teacher: 'teacher',
                        teacherNum: store.get('teacherNum'),
                        sendToteacher: isSendToteacher,
                        skinClass: 'leave-message-detail',
                        oneOnOneTeacherMobile: store.get('one_on_one_teacher_mobile'),
                        channel: channelValue,
                        onSuccess: function () {
                            // 身份切换，刷新页面
                            location.reload();
                        }
                    });
                }
            }
        });

/*
        // 一对一课程
        container
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
        });
*/
        videoCourseBox
        .on('click', '[data-page]', function (e) {
            var element = $(this);
            store.set('videoPage', element.data('page'));
            getCourseList(4,'.video-course-box','video_course_list','update_time');
            return false;
        })
        .on('click', '.btn-default', function (e) {// 视频课全部跳转到视频详情页
            var element = $(this);
            var link = element.parent().data('link');
            location.href = link;
        });

        onlineCourseBox
        .on('click', '[data-page]', function (e) {
            var element = $(this);
            store.set('onlinePage', element.data('page'));
            var sortby = store.get('sortby');
            var isdefault = store.get('isdefault');
            if (!sortby) {
                sortby = 'update_time';
            }
            if (!isdefault) {
                isdefault = 0;
            }
            getCourseList(2,'.online-course-box','online_course_list',sortby,isdefault);
            return false;
        });

        offlineCourseBox
        .on('click', '[data-page]', function (e) {
            var element = $(this);
            store.set('offlinePage', element.data('page'));
            var sortby = store.get('sortby');
            var isdefault = store.get('isdefault');
            if (!sortby) {
                sortby = 'update_time';
            }
            if (!isdefault) {
                isdefault = 0;
            }
            getCourseList(3,'.offline-course-box','offline_course_list',sortby,isdefault);
            return false;
        });

        /*
        oneCourseBox
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
        */

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