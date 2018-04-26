/**
 * @file 一对一课程详情页
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var RecoverDialog = require('common/component/RecoverDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var One2OnePurchaseDialog = require('common/component/One2OnePurchaseDialog');
    var Dialog = require('cobble/ui/Dialog');
    var baiduMap = require('common/map/baidu');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var tianxiaoLog = require('common/tianxiaoLog');
    var cookie = require('cobble/util/cookie');

    var leaveMessageDialog = require('common/component/LeaveMessageDialog');
    var TrialDialog = require('common/component/TrialDialog');
    var orgAdvisoryDialog = require('common/component/AdvisoryDialog');

    var profile = require('./detail/profile');
    var address = require('./detail/address');
    var comment = require('./detail/comment');

    var container = $('#main');
    var teacherComment = container.find('#teacher-comment');
    var courseProfile = container.find('#course-profile');

    // 上报
    function report() {
        var params = {
            teacher_number: store.get('teacherNum'),
            user_id: store.get('userId') || "",
            track_id: cookie.get('__track_id__'),
            comment_type: '1',
            comment_tag: store.get('commentTag_name') || "",
            comment_tag_num: store.get('commentTag_count') || "",
            dsp: '1',
            city_id: cookie.get('CITY_ID'),
            source: '3',
            type: 'comment',
            page: store.get('page'),
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);
    }

    // 页面滚动时
    function HoverTreeScroll() {
        var Obj = container.find('#teacher-comment');
        if (Obj.length != 1) {
            return false;
        }

        var offsetTop = arguments[1] ? arguments[1] : 0;
        var ObjTop = Obj.offset().top - $(window).height();
        var h_one = true;

        $(window).scroll(function () {
            if ($(window).scrollTop() > ObjTop) {
                if (h_one) {
                    report();
                    //alert(1);
                    h_one = false;
                }

            }
        });
    }

    function initNavTab() {
        // 置顶头部
        var fixedHeaderDiv = container.find('#content .fixed-header');
        var header = container.find('#content .header');
        var sidebarBox = container.find('#sidebar-box');
        var height = fixedHeaderDiv.height();
        var top = header.offset().top;
        var body = container.find('#content > .body');

        var fixedHeader = function () {
            fixedHeaderDiv.show();
            body.css('margin-top', 84);
        };
        var staticHeader = function () {
            fixedHeaderDiv.hide();
            body.css('margin-top', 0);
        };
        var apply = function () {
            if (pageScrollTop() > top-68) {
                fixedHeader();
            }
            else {
                staticHeader();
            }
        };

        // 初始化时先设置一下
        apply();

        // 滚动时再设置
        $(window).scroll(apply);

        container
        .on('click', '.nav-item', function (e) { // 切换 tab

            var target = $(e.currentTarget);
            var activeClass = 'active';
            var element = $(target.attr('href'));

            if (element.length === 1) {

                fixedHeader();

                var top = element.offset().top;
                window.scrollTo(0, top - height);

                target.parent().find('.' + activeClass)
                               .removeClass(activeClass);
                target.addClass(activeClass);

            }

            return false;
        })

        .on('click', '.reserve-listen', function (e) { // 预约试听

            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'recommend',
                stype: '2',
                client: 'PC',
                page_type: leaveMessPageType,
                track_id: cookie.get('__track_id__'),
                _timestamp: new Date().getTime(),
                user_number: store.get('user').number,
                user_role: store.get('user').type,
                location_type: leaveMessPageType+'_2',
                tid: store.get('teacherId'),
                cid: store.get('courseId'),
            };
            WAT.send(url, params);

            var element = $(this);
            var haslogin = store.get('user').number > 0;
            var trialCourseStatus = store.get('trialCourseStatus');
            var isOrgTeacher = store.get('orgNumber'); // 为0即非机构老师
            var courseNumber = store.get('courseNumber');

            var isOneOnOneTeacher = store.get('is_one_on_one_teacher'); //是否是一对一老师
            var channelValue = '';
            if (isOneOnOneTeacher) { //如果是一对一老师，则channelValue为'youxuan_teacher_pc'
                channelValue = 'youxuan_teacher_pc';
            }

            if (trialCourseStatus != -1) {// 老师有试听课 － 购买逻辑
                // 老师有预约试听功能
                if (haslogin) {
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
                        return;
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
                                    next: '0',
                                    onSuccess: function () {
                                        location.reload();
                                    },
                                    noskip: false
                                });
                            }
                        });
                    }
                    else {
                        new TrialDialog({
                            data: {
                                length: store.get('trial').data.length/60,
                                lesson_way: store.get('trial').data.lesson_way,
                                price_online: store.get('trial').data.price_online,
                                price_offline: store.get('trial').data.price_offline,
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
                    return;
                }
            }
            else { // 老师未设置试听课 － 留单逻辑
                if (haslogin && store.get('user').type == 0) { // 已登录老师身份
                    service
                    .getUserType()
                    .done(function (response) {
                        if (response.code === 0) {
                            var roles = response.data.roles;
                            var hasStudentRole = getHasStudentRole(roles);
                            var text = '';

                            if (hasStudentRole) {
                                text = '你目前是老师身份，需要切换到学生身份才能' + '预约';
                            }
                            else {
                                text = '你目前是老师身份，无法' + '预约' + '，是否开通学生身份？';
                            }
                            // 变更身份
                            new BanLessonDialog({
                                text: text,
                                hasStudentRole: hasStudentRole,
                                next: '0',
                                onSuccess: function () {
                                    if (isOrgTeacher && !isOneOnOneTeacher) { // 预约试听 － 是机构老师并且不是一对一老师 - 机构留单
                                        new orgAdvisoryDialog({
                                            title: '预约',
                                            objectNumber: courseNumber,
                                            contentType: 'cdb.teacher_course',
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
                }
                else { // 未登录用户 及 学生身份用户
                    if (isOrgTeacher && !isOneOnOneTeacher) { // 预约试听 － 是机构老师并且不是一对一老师
                        new orgAdvisoryDialog({
                            title: '预约',
                            objectNumber: courseNumber,
                            contentType: 'cdb.teacher_course'
                        });
                    }
                    else { // 预约试听 － 个体老师
                        new leaveMessageDialog({
                            teacher: 'teacher',
                            teacherNum: store.get('teacherNum'),
                            skinClass: 'leave-message-detail',
                            channel: channelValue,
                            oneOnOneTeacherMobile: store.get('one_on_one_teacher_mobile'),
                        });
                    }
                }
            }
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

    /**
     * 尝试报名
     *
     * 这里约束身份条件
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     */
    function tryToEnroll() {

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
                            location.reload();
                        },
                        next: location.href,
                        noskip: false
                    });
                }
            });
        } else {
            enroll();
        }
    }

    /**
     * 报名
     */
    function enroll() {

        var course = store.get('course');
        var price = {
            min: course.min_price || 0,
            max: course.max_price || 0
        }

        new One2OnePurchaseDialog({
            courseName: course.name,
            price: price,
            lessonWay: course.price,
            combo: course.course_combo,
            courseId: course.id,
            courseType: course.course_type
        });
    }

    exports.init = function () {
        //触发上报
        HoverTreeScroll();

        initNavTab();
        profile.init();
        address.init();
        comment.init();
        var profileMap = null;
        tianxiaoLog.send(store.get('orgNumber'), 'one2oneCourse', store.get('courseNumber'));

        container
        .on('click', '.map', function() { // 查看具体位置
            if (profileMap) {
                profileMap.show();
            } else {
                var offline = $(this).data('offline');
                var map = '<div id="map" style="height:400px;"></div>';
                profileMap = new Dialog({
                    title: '上课地点',
                    content: map,
                    disposeOnHide: false,
                    width: 600,
                    onBeforeShow: function(){
                        baiduMap.modifiedAddress('map', offline.lng, offline.lat);
                    }
                });
            }
        })
        .on('click' , '#favor' , function (e) { // 收藏
            var element = $(this);
            var courseNum = element.data('coursenum');
            var haslogin = !!store.get('user').number;
            var favored = store.get('favored');
            //登录或身份变更成功后 需要发收藏请求 并刷新当前页面
            var onSuccess = function () {
                if (courseNum) {
                    service
                    .addFavouriteAjax({
                        type: 'one2one_course',
                        number: courseNum
                    },
                    {
                        errorHandler:{
                            110101:function (response){
                                confirm({
                                    title: "温馨提示",
                                    content: "已经收藏过了，快去我的收藏看看吧",
                                    buttons: [
                                        {
                                            text: '确定',
                                            type: 'primary',
                                            handler: function () {
                                                // 跳转到机构收藏页面
                                                this.hide();
                                                location.href = '/collection/list/course';
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
                        }
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            success('收藏成功', function () {
                                location.reload();
                            });
                        }
                    });
                }
            };

            if (haslogin) {

                if (store.get('user').type === 0) {
                    service
                    .getUserType()
                    .done(function (response) {
                        if (response.code === 0) {
                            var roles = response.data.roles;
                            var hasStudentRole = getHasStudentRole(roles);
                            var text = '';

                            if (hasStudentRole) {
                                text = '你目前是老师身份，需要切换到学生身份才能收藏课程';
                            }
                            else {
                                text = '你目前是老师身份，无法收藏课程，是否开通学生身份？';
                            }
                            //收藏操作有后续异步请求 故不再要求BanLessonDialog做跳转 next='0'
                            new BanLessonDialog({
                                text: text,
                                hasStudentRole: hasStudentRole,
                                next: '0',
                                onSuccess: onSuccess,
                                noskip: false
                            });
                        }
                    });
                } else {
                    if (!favored) {
                        if (courseNum) {
                            service
                            .addFavouriteAjax({
                                type: 'one2one_course',
                                number: courseNum
                            },
                            {
                                errorHandler:{
                                    110101:function (response){
                                        confirm({
                                            title: "温馨提示",
                                            content: "已经收藏过了，快去我的收藏看看吧",
                                            buttons: [
                                                {
                                                    text: '确定',
                                                    type: 'primary',
                                                    handler: function () {
                                                        // 跳转到机构收藏页面
                                                        this.hide();
                                                        location.href = '/collection/list/course';
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
                                }
                            })
                            .done(function(response){
                                if (response.code === 0) {
                                    success('收藏成功', function () {
                                        location.reload();
                                    });
                                }
                            });
                        }
                    } else {
                        if (courseNum) {
                            confirm({
                                content: '已经收藏过了，快去我的收藏看看吧',
                                title: '温馨提示',
                                width: 330,
                                buttons: [
                                    {
                                        text: '确定',
                                        type: 'primary',
                                        handler: function () {
                                            location.href = '/collection/list/course';
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
                    }
                }
            } else {
                //收藏操作有后续异步请求 故若登录失败不再要求BanLessonDialog做跳转 failNext='0'
                new LoginDialog({
                    wrongRoleText: '你目前是老师身份，无法收藏课程，是否开通学生身份？',
                    onSuccess: onSuccess,
                    failNext: '0'
                });
            }
        })
        .on('click', '.correct', function (e) { // 纠错
            new RecoverDialog();
        })
        .on('mouseover', '.get-coupon', function () { // 领取优惠券
            courseProfile.find('.coupon').show();
        })
        .on('mouseout', '.coupon', function (e) { // 领取优惠券
            var target = $(e.currentTarget);
            target.hide();
        })
        .on('click', '.coupon-color', function (e) { // 领取优惠券
            var target = $(e.currentTarget);
            var serialNum = target.data('num');
            var haslogin = store.get('user').number > 0;
            if (haslogin) {
                if (store.get('user').type === 0) {

                    service
                        .getUserType()
                        .done(function (response) {
                            if (response.code === 0) {
                                var roles = response.data.roles;
                                var hasStudentRole = getHasStudentRole(roles);
                                var text = '';

                                if (hasStudentRole) {
                                    text = '你目前是老师身份，需要切换到学生身份才能领取优惠券';
                                }
                                else {
                                    text = '你目前是老师身份，无法领取优惠券，是否开通学生身份？';
                                }
                                // 变更身份
                                new BanLessonDialog({
                                    text: text,
                                    hasStudentRole: hasStudentRole,
                                    next: '0',
                                    onSuccess: function () {
                                        location.reload();
                                    },
                                    noskip: false
                                });
                            }
                        });
                } else {

                    service
                        .receiveCoupon({
                            serialNum: serialNum
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('领取成功');
                            }
                        });

                }
            }
            else {
                new LoginDialog({
                    wrongRoleText: '你目前是老师身份，无法领取优惠券，是否开通学生身份？',
                    onSuccess: function () {
                        location.reload();
                    },
                    failNext: '0'
                });
            }
        })
        .on('click', '.reserve-course', function (e) { // 购买课程

            // 如果用户没登陆,弹出登陆框 登陆逻辑放到弹窗里面处理
            // if (!store.get('user').number) {
            //     new LoginDialog({
            //         onSuccess: function () {
            //             tryToEnroll();
            //         }
            //     });
            //     return;
            // }
            // tryToEnroll();
            enroll();
        })
        .on('click', '.view-prices', function (e) { // 购买课程
            enroll();
        });
    };

});