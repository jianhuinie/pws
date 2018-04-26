 /**
 * @file 顶部导航
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var etpl = require('cobble/util/etpl');

    var store = require('common/store');
    var service = require('common/service');
    var Popup = require('cobble/helper/Popup');
    var Tooltip = require('cobble/ui/Tooltip');
    var Dialog = require('cobble/ui/Dialog');
    var entrance = require('im/entrance');

    var InviteDialog = require('common/component/InviteDialog');
    var InviteResultDialog = require('common/component/InviteResultDialog');

    var statusInfoTpl = ''
        + '<ul class="status-info">'
        +     '<li class="login-info">'

        +         '<!-- if: ${user} -->'
        +         '<span>你好，</span>'

        +         '<a class="user-name" data-stype="Name" href="${rootHttp}'
        +             '<!-- if: ${isTeacher} -->${teacherHome}'
        +             '<!-- else -->${studentHome}'
        +             '<!-- /if -->'
        +         '">'
        +             '<!-- if: ${user.display_name} -->'
        +             '${user.display_name}'
        +             '<!-- else -->'
        +             '${user.user_name}'
        +             '<!-- /if -->'
        +         '</a>'

        +         '<a class="logout-link" href="${rootHttp}/auth/logout?next=/static/login'
        +             '<!-- if: ${isArtActivity} -->'
        +             'activity=art&next=/jiangzuo'
        +             '<!-- /if -->'
        +         '">'
        +             '退出'
        +         '</a>'

        +         '<!-- else -->'

        +         '<a class="login-link" data-stype="SignUp" rel="nofollow" href="${rootHttps}/static/login?next=${location.href|url}">'
        +             '<i class="icon icon-user"></i>'
        +             '请登录'
        +         '</a>'

        +         '<!-- /if -->'
        +     '</li>'

        +     '<li>'
        +     '<!-- if: ${user} -->'

        +         '<a href="'
        +             '<!-- if: ${isTeacher} -->'
        +             '${rootHttp}/teacher_center/message'
        +             '<!-- else -->'
        +             '${rootHttp}/student_center/message'
        +             '<!-- /if -->'
        +         '">'
        +           '<i class="icon icon-mail"></i>消息'
        +         '</a>'

        +     '<!-- else -->'

        +         '<a class="register-link" data-stype="Register" rel="nofollow" href="${rootHttps}/static/register">'
        +             '免费注册'
        +         '</a>'

        +     '<!-- /if -->'
        +     '</li>'

        +     '<li>'
        +         '<!-- if: ${isTeacher} -->'
        +             '<a href="${rootHttp}/static/app?type=teacher" data-stype="APP" rel="nofollow">'
        +         '<!-- else -->'
        +             '<a href="${rootHttp}/static/app" rel="nofollow" data-stype="APP">'
        +         '<!-- /if -->'
        +             '<i class="icon icon-mobile"></i>'
        +             '<!-- if: ${isTeacher} -->跟谁学老师版 APP'
        +             '<!-- else -->手机跟谁学'
        +             '<!-- /if -->'
        +         '</a>'
        +     '</li>'

        +     '<li>'
        +         '<a href="${rootHttp}/static/liveclient" data-stype="LiveClient" rel="nofollow">'
        +             '<i class="icon icon-live-play"></i>'
        +             '直播助手'
        +         '</a>'
        +     '</li>'
        +     '<li class="wechat">'
        +         '<i class="icon icon-wechat"></i>'
        +         '关注领好课'
        +         '<div class="wechat-qrcode menu">'
        +             '<div class="text-primary">跟谁学学生版:</div>'
        +             '<div class="text-primary">genshuixue_student</div>'
        +             '<div class="qrcode-box"></div>'
        +             '<div class="text-muted">精品好课等你领</div>'
        +         '</div>'
        +     '</li>'

        + '</ul>';

    var userInfoTpl = ''

        + '<ul class="user-info '
        +     '<!-- if: ${user} -->'
        +         '${user.user_type}'
        +     '<!-- else -->-1'
        +     '<!-- /if -->'
        + '">'

        +     '<!-- if: ${location.pathname} !== "/" -->'
        +     '<li class="user-index">'

        +         '<!-- if: ${isWWW} -->'
        +             '<a href="${rootHttp}" data-stype="HomePage">跟谁学首页</a>'
        +         '<!-- else -->'
        +             '<a href="${rootHttp}/${cityDomain}/" data-stype="HomePage">跟谁学首页</a>'
        +         '<!-- /if -->'

        +     '</li>'
        +     '<!-- /if -->'


        +     '<li class="user-center">'

        +     '<!-- if: ${user} -->'

        +         '<a class="center" data-stype="MyCenter" data-clicktype="Index" href="${rootHttp}'
        +             '<!-- if: ${isTeacher} -->${teacherHome}'
        +             '<!-- else -->${studentHome}'
        +             '<!-- /if -->'
        +         '">我的跟谁学</a>'

        +         '<i class="icon icon-caret-down"></i>'

        +         '<div class="menu center-menu">'

        +             '<a href="${rootHttp}/lesson/${role}Lessons" data-stype="MyCenter" data-clicktype="TimeTable">'
        +                 '我的课表'
        +             '</a>'

        +             '<!-- if: ${isTeacher} -->'
        +             '<a href="${rootHttp}/teacher_center/student" data-stype="MyCenter" data-clicktype="MyStudent">我的学生</a>'
        +             '<!-- else -->'
        +             '<a href="${rootHttp}/student_center/teacher" data-stype="MyCenter" data-clicktype="MyTeacher">我的老师</a>'
        +             '<!-- /if -->'

        +             '<a href="${rootHttp}/order/${role}Orders" data-stype="MyCenter" data-clicktype="Order">'
        +                 '我的订单'
        +             '</a>'

        +             '<a href="${rootHttps}/wallet/index" data-stype="MyCenter" data-clicktype="Wallet">'
        +                 '钱包管理'
        +             '</a>'

        +             '<a class="btn btn-primary btn-block" data-stype="MyCenter" data-clicktype="Button" href="${rootHttp}'
        +                 '<!-- if: ${isTeacher} -->${teacherHome}'
        +                 '<!-- else -->${studentHome}'
        +                 '<!-- /if -->'
        +             '">'
        +                 '进入我的跟谁学'
        +             '</a>'

        +         '</div>'

        +     '<!-- else -->'

        +         '<a class="center" rel="nofollow" data-stype="MyCenter" data-clicktype="Index" href="${rootHttps}/static/login?next=/dynamic/center">我的跟谁学</a>'
        +         '<i class="icon icon-caret-down"></i>'
        +         '<div class="menu center-menu">'
        +             '<a rel="nofollow" href="${rootHttps}/static/login?next=/dynamic/schedule" data-stype="MyCenter" data-clicktype="TimeTable">我的课表</a>'
        +             '<a rel="nofollow" href="${rootHttps}/static/login?next=/dynamic/order" data-stype="MyCenter" data-clicktype="Order">我的订单</a>'
        +             '<a rel="nofollow" href="${rootHttps}/static/login?next=/dynamic/cash" data-stype="MyCenter" data-clicktype="Wallet">钱包管理</a>'
        +             '<a rel="nofollow" href="${rootHttps}/static/login?next=/dynamic/center" data-stype="MyCenter" data-clicktype="Button" class="btn btn-primary btn-block">进入我的跟谁学</a>'
        +         '</div>'

        +     '<!-- /if -->'

        +     '</li>'


        +     '<li class="my-course" data-status="'
        +         '<!-- if: ${user} -->nodata'
        +         '<!-- else -->notlogin'
        +         '<!-- /if -->'
        +     '">'

        +         '<i class="icon icon-calendar"></i>'
        +         '<a class="course" rel="nofollow" data-stype="MyTimeTable" data-clicktype="Index" href="${rootHttp}'
        +             '<!-- if: ${user} -->'
        +                 '/lesson/${role}Lessons'
        +             '<!-- else -->'
        +                 '/static/login'
        +             '<!-- /if -->'
        +         '">我的课表</a>'

        +         '<i class="icon icon-caret-down"></i>'

        +         '<div class="menu course-menu">'
        +             '<!-- if: ${user} -->'

        +             '<div class="action">'
        +                 '<a href="${rootHttp}/lesson/${role}Lessons" data-stype="MyTimeTable" data-clicktype="Button" class="btn btn-primary">'
        +                     '查看全部'
        +                 '</a>'
        +             '</div>'

        +             '<!-- else -->'

        +             '<div class="not-login-action">'
        +                 '<div class="title">进入个人中心查看我的课表</div>'
        +                 '<a rel="nofollow" href="${rootHttps}/static/login?next=/dynamic/schedule" data-stype="MyTimeTable" data-clicktype="Button" class="btn btn-primary">'
        +                     '查看我的课表'
        +                 '</a>'
        +             '</div>'

        +             '<!-- /if -->'

        +         '</div>'

        +     '</li>'

        +     '<!-- if: ${user} && !${isTeacher} -->'
        +     '<li class="my-favor">'
        +         '<i class="icon icon-favor"></i>'
        +         '<a class="favor" data-stype="MyFavorite" data-clicktype="Index" href="${rootHttps}/student_center/favourite">我的收藏</a>'
        +         '<i class="icon icon-caret-down"></i>'
        +         '<div class="menu favor-menu">'
        +             '<a data-stype="MyFavorite" data-clicktype="Course" href="${rootHttps}/collection/list/course">课程收藏</a>'
        +             '<a data-stype="MyFavorite" data-clicktype="Teacher" href="${rootHttps}/student_center/favourite">老师收藏</a>'
        +             '<a data-stype="MyFavorite" data-clicktype="Organization" href="${rootHttps}/collection/list/org">机构收藏</a>'
        +         '</div>'
        +     '</li>'
        +     '<!-- /if -->'


        +     '<li class="change-type">'
        +         '<!-- if: ${user} -->'

        +         '<a class="change-user-type" data-stype="Teacher_Change">'
        +         '<!-- if: ${isTeacher} -->切换至学生登录'
        +         '<!-- else -->切换至老师登录'
        +         '<!-- /if -->'
        +         '</a>'

        +         '<!-- else -->'

        +         '<a rel="nofollow" data-stype="Teacher_Change" href="${rootHttps}/static/login?user_type=0">老师登录</a>'

        +         '<!-- /if -->'

        +     '</li>'

        +     '<li>'
        +         '<a rel="nofollow" data-stype="Organization_Center" href="http://i.genshuixue.com" target="_blank">机构平台</a>'
        +     '</li>'

        +     '<li class="custom-service">'
        +         '<span class="service">客户服务<i class="icon icon-caret-down"></i></span>'
        +         '<div class="menu custom-service-menu">'
        +             '<b class="service-im" data-stype="HelpCenter" data-clicktype="1">在线客服</b>'
        +             '<b class="service-hotline" data-stype="HelpCenter" data-clicktype="2">客服电话</b>'
        +             '<a rel="nofollow" data-stype="HelpCenter" data-clicktype="3" href="${rootHttp}/guide/process?a=process">帮助中心</a>'
        +             '<a rel="nofollow" data-stype="HelpCenter" data-clicktype="4" href="${rootHttp}/guide/feedback?a=feedback">意见反馈</a>'
        +         '</div>'
        +     '</li>'
        + '</ul>';


    var renderTpl = etpl.compile(
        userInfoTpl + statusInfoTpl
    );

    var options = {
        show: {
            trigger: 'over',
            delay: 200,
            animation: function () {
                this.layer.slideDown(150);
            }
        },
        hide: {
            trigger: 'out',
            delay: 200,
            animation: function () {
                this.layer.slideUp(150);
            }
        }
    };
    var TEACHER = 0;
    var STUDENT = 2;
    /**
     * 获取是否有某种身份
     * @param  {Array} roles 身份数组
     * @return {Bool}  返回是否具有学生身份，默认为false
     */
    function getHasRole(roles, targetRole) {
        var length = roles.length;
        var hasRole = false;

        if (length > 0) {
            for(var i = 0; i < length; i++) {
               if (roles[i] == targetRole) {
                    hasRole = true;
                    break;
                }
            }
        }

        return hasRole;
    }

    exports.render = function (callback) {

        var env = store.get('env');
        var rootHttp = 'http://' + env + '.genshuixue.com';
        var rootHttps = 'https://' + env + '.genshuixue.com';

        service
        .getUserBasicInfo()
        .done(function (response) {

            var user;

            if (response.code === 0) {
                var data = response.data;
                if (data.avatar) {
                    user = data;
                }
            }

            var isTeacher = user && user.user_type == 0;

            var html = renderTpl({
                user: user,
                role: isTeacher ? 'teacher' : 'student',
                isTeacher: isTeacher,

                teacherHome: '/teacher_center/index',
                studentHome: '/lesson/studentLessons',

                rootHttp: rootHttp,
                rootHttps: rootHttps,
                cityDomain: store.get('cityDomain'),
                isWWW: store.get('isWWW'),
                isArtActivity: store.get('isArtActivity'),
                location: window.location

            });

            exports.container.find('.wrapper').html(html);

            callback();
        });

    };

    exports.init = function () {

        var container =
        exports.container = $('#site-nav');

        var userType = store.get('user').type;
        var isTooltipVisible = false;

        var centerPopup;
        var coursePopup;
        var favorPopup;
        var customServicePopup;
        var weChatPopup;

        exports.render(function () {

            centerPopup = new Popup($.extend(
                {
                    element: container.find('.user-center'),
                    layer: container.find('.center-menu')
                },
                options
            ));

            coursePopup = new Popup($.extend(
                {
                    element: container.find('.my-course'),
                    layer: container.find('.course-menu'),
                    onBeforeShow: function (e) {

                        var target = $(e.currentTarget);
                        var status = target.data('status');

                        if (status === 'nodata') {

                            service

                            .getCourseList()

                            .done(function (response) {
                                if (response.code === 0) {
                                    var tpl = response.data.tpl.course_list;

                                    target.find('.menu').prepend(tpl);
                                    target.data('status', 'got');

                                    Tooltip.init(
                                        container.find('.course-menu [data-title]'),
                                        {
                                            onAfterShow: function () {
                                                isTooltipVisible = true;
                                            },
                                            onAfterHide: function () {
                                                isTooltipVisible = false;
                                            }
                                        }
                                    );

                                    coursePopup.open(e);
                                }
                            });

                            return false;
                        }
                    },

                    onBeforeHide: function (e) {
                        if (isTooltipVisible) {
                            return false;
                        }
                    }
                },
                options
            ));

            favorPopup = new Popup($.extend(
                {
                    element: container.find('.my-favor'),
                    layer: container.find('.favor-menu')
                },
                options
            ));

            customServicePopup = new Popup($.extend(
                {
                    element: container.find('.custom-service'),
                    layer: container.find('.custom-service-menu')
                },
                options
            ));

            weChatPopup = new Popup($.extend(
                {
                    element: container.find('.wechat'),
                    layer: container.find('.wechat-qrcode')
                },
                options
            ));
        });



        container
        .on('click', '.change-user-type', function (e) {
            var targetRole = TEACHER;
            if (userType == TEACHER) {
                targetRole = STUDENT;
            }

            service
            .getUserType()
            .done(function (response) {
                if (response.code === 0) {

                    var roles = response.data.roles;
                    var hasRole = getHasRole(roles, targetRole);
                    var switchRole = function (isInvited) {
                        service
                        .sendInviteCode({
                            role: targetRole

                        })
                        .done(function (response) {

                            var callback = function () {

                                var url;

                                if (targetRole == TEACHER) {
                                    url = response.data.url;
                                }
                                else if (location.protocol === 'https:') {
                                    url = 'http://' + store.get('env') + '.genshuixue.com';
                                }
                                else {
                                    url = document.URL;
                                }

                                location.href = url;

                            }

                            if (response.code === 0) {
                                if (isInvited) {
                                    new InviteResultDialog({
                                        userType: userType,
                                        status: 'succ',
                                        onAfterHide: callback
                                    });
                                }
                                else {
                                    callback();
                                }
                            }
                            else {
                                if (isInvited) {
                                    new InviteResultDialog({
                                        userType: userType,
                                        status: 'err'
                                    });
                                }
                                else {
                                    alert('数据正在维护！');
                                }
                            }

                        });
                    };

                    if (hasRole) {
                        switchRole();
                    }
                    else {
                        var content = ''
                            + '<div class="msg-content-title">'
                            + ('确认要开通' + (targetRole == TEACHER ? '老师' : '学生') + '身份吗？')
                            + '</div>'
                            + '<div class="dialog-action">'
                            +     '<button class="btn btn-primary btn-confirm">'
                            +           '立即开通'
                            +      '</button>'
                            + '</div>';
                        var comfirmDialog = new Dialog({
                            title: '温馨提示',
                            content: content,
                            disposeOnHide: true,
                            width: 420
                        });
                        var element = comfirmDialog.element;
                        element
                        .on('click', '.btn-confirm', function () {
                            comfirmDialog.hide();
                            switchRole(true);
                        });
                    }

                }
            });
        })
        .on('click', '.not-login-action', function () {
            if (userType === 0) {
                window.location.href = '/static/login?next=/teacher_center/timetable';
            }
            else {
                window.location.href = '/static/login?next=/lesson/studentLessons';
            }
        })
        .on('click', '.custom-service .service-hotline', function () {

            var content = ''
                + '<div class="header">'
                +     '<i class="icon icon-phone-o"></i>'
                +     '<span>4000-910-910</span>'
                + '</div>'
                + '<div>无论您是老师、学生还是家长，只要您有问题都可以致电跟谁学，我们的客服人员将尽快为您解答疑惑~感谢您对跟谁学的支持！</div>'
                + '<div class="confirm">'
                +      '<button class="btn-default">好，我知道了</button>'
                + '</div>'

            var hotlineDialog = new Dialog({
                title: '跟谁学官方客服电话',
                content: content,
                disposeOnHide: false,
                width: 420,
                skinClass: 'service-hotline-dialog'
            });

            hotlineDialog.element.find('button')
            .on('click', function () {
                hotlineDialog.hide();
            })
        })
        .on('click', '.custom-service .service-im', function () {
            entrance.chatToKF();
        })
        .on('click', '[data-stype]', function () { // 顶导点击上报
            var params = {
                type: 'TopNav_Click',
                stype: $(this).data('stype'),
                click_type: $(this).data('clicktype'),
                location: store.get('page_type') || '',
                id: store.get('user').number || ''
            };
            WAT.send('http://click.genshuixue.com/gs.gif', params);
        });
    };

});