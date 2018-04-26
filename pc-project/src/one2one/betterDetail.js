/**
 * @file 优选一对一课程详情页
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var RecoverDialog = require('common/component/RecoverDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var One2OnePurchaseDialog = require('common/component/One2OneBetterPurchaseDialog');
    var Dialog = require('cobble/ui/Dialog');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var cookie = require('cobble/util/cookie');

    var leaveMessageDialog = require('common/component/LeaveMessageDialog');
    var TrialDialog = require('common/component/TrialDialog');

    var profile = require('./betterDetail/profile');
    var teacherIntro = require('./betterDetail/teacherIntro');
    var comment = require('./betterDetail/comment');
    var courseIntro = require('./betterDetail/courseIntro');

    var container = $('.main_contain');

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
                    // report(); 确认下优选一对一怎样上报之后，再打开
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

        .on('click', '.reserve-listen', function (e) { // 预约1对1

            var element = $(this);
            var haslogin = store.get('user').number > 0;
            var courseNumber = store.get('courseNum');

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
                                new leaveMessageDialog({
                                    teacher: 'teacher',
                                    oneOnOneTeacherMobile: store.get('teacherMobile'),
                                    teacherNum: store.get('teacherNum'),
                                    channel: 'youxuan_teacher_pc',
                                    skinClass: 'leave-message-detail',
                                    onSuccess: function () {
                                        // 身份切换，刷新页面
                                        location.reload();
                                    }
                                });
                            },
                            noskip: false
                        });
                    }
                });
            }
            else { // 未登录用户 及 学生身份用户
                new leaveMessageDialog({
                    teacher: 'teacher',
                    oneOnOneTeacherMobile: store.get('teacherMobile'),
                    teacherNum: store.get('teacherNum'),
                    channel: 'youxuan_teacher_pc',
                    skinClass: 'leave-message-detail'
                });
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

    exports.init = function () {
        //触发上报
        HoverTreeScroll();

        initNavTab();
        profile.init();
        teacherIntro.init();
        comment.init();
        courseIntro.init();

        // 收藏 - 学生身份判断是否已收藏当前课程
        // 本期收藏暂且隐藏
        /*
        if (store.get('user').user_type == 2) {
            service
            .favoriteCheck({
                num: store.get('courseNum'),
                type: 'ONE_ONE_ONE_COURSE'
            })
            .done(function (response) {
                if (response.code === 0) {
                    if (response.data.query_favorite_check.flag == 'NO') {
                        // 没有收藏过 - 不动
                    }
                    else if (response.data.query_favorite_check.flag == 'YES') {
                        // 收藏过
                        container.find('#favor span').html('已收藏');
                    }
                }
            });
        }
        */

        container
        .on('click' , '#favor' , function (e) { // 收藏
            var element = $(this);
            var courseNum = store.get('courseNum');
            var haslogin = !!store.get('user').number;
            // var favored = store.get('favored');
            // 登录或身份变更成功后 需要发请求判断是否曾经收藏过
            // 然后再发收藏请求 并刷新当前页面
            var ifStudentToDo = function () {
                if (courseNum) {
                    // 查询是否收藏过
                    service
                    .favoriteCheck({
                        num: courseNum,
                        type: 'ONE_ONE_ONE_COURSE'
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            if (response.data.query_favorite_check.flag == 'NO') {
                                // 没有收藏过 - 请求收藏
                                service
                                .favoriteOperate({
                                    num: courseNum,
                                    type: 'ONE_ONE_ONE_COURSE',
                                    operate: 'ADD'
                                })
                                .done(function (response) {
                                    if (response.code === 0 && response.data.mutation_favorite_operate.flag == 'YES') {
                                        success('收藏成功', function () {
                                            container.find('#favor span').html('已收藏');
                                        });
                                    }
                                });
                            }
                            else if (response.data.query_favorite_check.flag == 'YES') {
                                // 收藏过
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
                            // 收藏操作有后续异步请求 故不再要求BanLessonDialog做跳转 next='0'
                            new BanLessonDialog({
                                text: text,
                                hasStudentRole: hasStudentRole,
                                next: '0',
                                onSuccess: ifStudentToDo,
                                noskip: false
                            });
                        }
                    });
                }
                else {
                    ifStudentToDo();
                }
            }
            else { // 这里应该是弹出登陆框吧？？？？
                // 收藏操作有后续异步请求 故若登录失败不再要求BanLessonDialog做跳转 failNext='0'
                new LoginDialog({
                    wrongRoleText: '你目前是老师身份，无法收藏课程，是否开通学生身份？',
                    onSuccess: ifStudentToDo,
                    failNext: '0'
                });
            }
        })
        .on('click', '.correct', function (e) { // 纠错
            new RecoverDialog();
        })
        .on('click', '.reserve-course', function (e) { // 购买课程

            service
            .getDetailInfo({
                number: store.get('courseNum')
            })
            .done(function (response) {
                if (response.code === 0) {

                    var course = response.data.query_one_on_one_course;

                    new One2OnePurchaseDialog({
                        courseName: store.get('course').name,
                        price: store.get('course').price_range,
                        categories: course.categories,
                        lessonWay: course.lesson_ways,
                        combo: course.combos,
                        courseId: course.number,
                        courseType: ''
                    });
                }
            });
        });

    };

});