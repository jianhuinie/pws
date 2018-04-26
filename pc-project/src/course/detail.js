/**
 * @file 班课详情
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var RecoverDialog = require('common/component/RecoverDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var EnterClassroomDialog = require('common/center/component/EnterClassroomDialog');
    var service = require('common/service');
    var store = require('common/store');
    var entrance = require('im/entrance');
    var baiduMap = require('common/map/baidu');
    var tianxiaoLog = require('common/tianxiaoLog');
    var cookie = require('cobble/util/cookie');
    var stringUtil = require('cobble/util/string');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var Dialog = require('cobble/ui/Dialog');
    var LoginDialog = require('common/component/LoginDialog');
    var AdvisoryDialog = require('common/component/AdvisoryDialog');
    var leaveMessageDialog = require('common/component/LeaveMessageDialog');
    var urlUtil = require('cc/util/url');

    var profile = require('./detail/profile');
    var combo = require('./detail/combo');
    var comment = require('./detail/comment');
    var address = require('./detail/address');

    var relatedcourse = require('teacher/search/relatedcourse');

    var container = $('#main');
    var courseProfile = container.find('#course-profile');
    var justLogin = false; // 用户身份切换 － 刷新页面
    var dialogName = '预约试听'; // 预约试听或者留言咨询

    /**
     * 初始化导航菜单
     *
     * 包含菜单跟随效果
     *
     * @inner
     */


    //上报
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

    //页面滚动时

    function HoverTreeScroll() {
        var Obj = container.find('#course-comment');
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
        var header = container.find('#content .header');
        var sidebarBox = container.find('#sidebar-box');
        var height = header.height();
        var top = header.offset().top;
        var isOrgCourse = store.get('isOrgCourse');
        var body = container.find('#content > .body');

        var fixedHeader = function () {

            header.addClass('fixed');
            body.css('margin-top', 84);
        };
        var staticHeader = function () {
            header.removeClass('fixed');
            body.css('margin-top', 0);
        };
        var apply = function () {
            if (pageScrollTop() > top-30) {
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

        // 切换 tab
        container.on('click', '.nav-item', function (e) {
            var target = $(e.currentTarget);
            var activeClass = 'active';

            //if (!target.hasClass(activeClass)) {

                var element = $(target.attr('href'));

                if (element.length === 1) {

                    fixedHeader();

                    var top = element.offset().top;
                    window.scrollTo(0, top - height);

                    target.parent().find('.' + activeClass)
                                   .removeClass(activeClass);
                    target.addClass(activeClass);

                }
            //}

            return false;
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

    // 获取当前用户的报名情况
    // 只有可以报名的情况 才显示enroll-action
    function initEnrolledStatus() {

        service
        .checkCourseRepeat({
            courseNumber: store.get('courseNum'),
            courseType: store.get('courseType')
        },
        {
            errorHandler: {
                '100014': function () {
                    //success("您已购买了该课程！");
                    confirm({
                        content: "您已经下过单了，快去支付吧",
                        buttons: [
                            {
                                text: '去支付',
                                type: 'primary',
                                handler: function () {
                                    // 跳转到支付页面
                                    this.hide();
                                    location.href = '/pay/payProductPurchase';
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
                    // 修复登陆后没有刷新页面的bug
                    if (type && type == 'login') {
                        location.reload();
                    }
                    return false;
                }
            }
        })
        .done(function(response){
            if (response.code == 0) { //没有报过名 可以报名

                var data = response.data;

                if (data.status == 1) { //没有报名
                    store.set('hasEnrolled', false);
                    store.set('hasPaid', false);
                    showActions();
                }
                else if (data.status == 2) { //报名生成订单 但没支付
                    store.set('hasEnrolled', true);
                    store.set('hasPaid', false);
                    store.set('purchaseId', data.purchase_id);
                    showActions();
                }
                else if (data.status == 3) { //报名订单已支付
                    store.set('hasEnrolled', true);
                    store.set('hasPaid', true);
                    container.find('#course-profile .has-paid').show();
                    container.find('#course-profile .course-state').hide();
                }
            }
        });
    }

    /**
     * 尝试报名
     *
     * 这里约束身份条件
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     */
    function tryToEnroll() {

        var enrollUrl = store.get('enrollUrl');

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
                            enroll();
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
        var enrollUrl = store.get('enrollUrl');
        if (store.get('hasEnrolled')) {
            if (!store.get('hasPaid')) {
                confirm({
                    title: '温馨提示',
                    content: ''
                        +   '<div>'
                        +       '<p>您已经报名该班课但是还未完成支付，请前往支付。</p>'
                        +       '<p>如需取消报名，请前往<a href="/order/studentOrders" class="text-primary">我的订单</a>完成</p>'
                        +   '</div>',
                    buttons: [
                        {
                            text: '前往支付',
                            type: 'primary',
                            handler: function () {
                                location.href = ('/pay/payProductPurchase?purchase_id=' + store.get('purchaseId'));
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
        else {
            location.href = enrollUrl;
        }
    }

    /**
     * 判断用户是否收藏该课程【班课】
     */
    function isFavor() {

        var hasLogin = !!store.get('user').number;

        var favor = container.find('#favor');
        favor.find('span').html('收藏');
        favor.find('.icon').removeClass('hasfavored');

        if (!hasLogin || store.get('user').type == 0) {
            return;
        }

        return service
        .checkCollectedAjax({
            type: 'class_course',
            number: store.get('courseNum')
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                // 收藏
                if (favor.data('haslogin') && data.is_favored) { // 已登录且收藏用户
                    favor.find('span').html('已收藏');
                    favor.find('.icon').addClass('hasfavored');
                }
                else {
                    favor.find('span').html('收藏');
                    favor.find('.icon').removeClass('hasfavored');
                }
                // 人气
                var popularity = container.find('.popularity');
                popularity.find('span').html(data.popularity);

            }
        });

    }

    function showActions() {
        container.find('#course-profile .enroll-action').addClass('show');
        container.find('#content .nav-action-container').show();
    }

    exports.init = function () {
        var query = urlUtil.parseQuery(location.search);
        if (query.action === 'shenhe') {
            console.log(3)
        }

        //触发上报
        HoverTreeScroll()

        var userType = store.get('user').type;
        var courseNum = store.get('courseNum');
        var courseType = store.get('courseType');
        var profileMap = null;

        // 报名url
        var enrollUrl = '/pay/productDetail';
        var params = {
            course_number: courseNum,
            type: courseType
        };
        var search = $.param(params);

        enrollUrl += '?' + search;
        store.set('enrollUrl', enrollUrl);

        initNavTab();
        profile.init();
        combo.init();
        address.init();
        comment.init();



        tianxiaoLog.send(
            store.get('orgNumber'),
            ((+courseType === 4) ? 'microCourse': 'classCourse'),
             courseNum
         );

        // 获取用户是否已收藏该课程ajax
        // 3810的课程去掉收藏
        if (courseType != 4) {
            isFavor();
        }

        //如果已经登录 则获取班课是否已经报名、支付。
        if (store.get('enrolling')) {
            var user = store.get('user');
            if (user && user.id && user.type == 2) {
                initEnrolledStatus();
            }
            else {
                showActions();
            }
        }

        if (store.get('displayStatus') == 15 ||
            store.get('displayStatus') == 16 ||
            store.get('displayStatus') == 17) {
            container.find('#course-profile .enroll-action').addClass('show');
            service
            .getUserPaid({
                courseNumber: courseNum
            })
            .done(function(res){
                if (res.code === 0) {
                    // 已支付
                    // 如果已支付则显示已报名图标
                    if (res.data.has_pay) {
                        container.find('#course-profile .has-paid').show();
                    }
                }
            });
        }

        container


        //分页上报
         .on('click', '[data-page]', function (e) {
          var target = $(e.currentTarget);
          store.set('page', target.data('page'));
          report();
                //getCommentList();
          return false;
          })
            //点击类型上报
          .on('click', '.nav-item', function (e) {
          var target = $(e.currentTarget);

          store.set('commentTag', target.data('value'));
          store.set('commentTag_name', target.data('name'));
          store.set('commentTag_count', target.data('num'));
          store.set('page', 1);
          report();
                //getCommentList();
                return false;
            })



            .on('click' , '#favor' , function (e) { // 收藏课程
            var element = $(this);
            var courseNum = element.data('coursenum');
            var haslogin = !!store.get('user').number;
            var text = element.text();
            //登录或身份变更成功后 需要发收藏请求 并刷新当前页面
            var onSuccess = function () {
                if (courseNum) {
                    service
                    .addFavouriteAjax({
                        type: 'class_course',
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
                    if (text == '收藏') {
                        if (courseNum) {
                            service
                            .addFavouriteAjax({
                                type: 'class_course',
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

        .on('click', '.map', function() {
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

        .on('click', '.reserve-course', function (e) {
            // 如果用户没登陆,弹出登陆框
            if (!store.get('user').number) {

                new LoginDialog({
                    onSuccess: function () {
                        tryToEnroll();
                    }
                });
                return;
            }
            tryToEnroll();
        })
        // 进入教室按钮，默认进入此段逻辑的都是在线课程,
        // 因为如果不是在线课不会有进入教室
        .on('click', '.primary-enter-room', function (e) {
            // 如果用户没登陆,弹出登陆框
            if (!store.get('user').number && store.get('price') != 0) {

                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                    }
                });
                return;
            } else {
                // 进入此段逻辑表示用户已经登录了，否则会执行上面的登录逻辑
                // 根据前面的逻辑如果用户登录,会执行initEnrolledStatus逻辑来
                // 判断用户是否已经报名了课程,如果报名了store.get('hasPaid')为true
                // 如果是 0元课 or 非0元课已购买 or 老师自己点击自己的课 直接进入教室
                // 否则则进入提交订单页面

                service
                .getUserPaid({
                    courseNumber: courseNum
                })
                .done(function(res){
                    if (res.code === 0) {
                        // 已支付
                        if (res.data.has_pay
                            || (store.get('price') == 0)
                            || (store.get('teacherNum') == store.get('user').number) ) {
                            // 如果已支付则显示已报名图标
                            if (res.data.has_pay) {
                                container.find('#course-profile .has-paid').show();
                            }
                            // 弹出进入教室弹窗逻辑
                            // 如果是其他老师身份需要切换身份
                            if (store.get('user').type === 0 && (store.get('teacherNum') != store.get('user').number)) {
                                service
                                .getUserType()
                                .done(function (response) {
                                    if (response.code === 0) {
                                        var roles = response.data.roles;
                                        var hasStudentRole = getHasStudentRole(roles);
                                        var text = '';

                                        if (hasStudentRole) {
                                            text = '你目前是老师身份，需要切换到学生身份才能进入教室';
                                        }
                                        else {
                                            text = '你目前是老师身份，无法进入教室，是否开通学生身份？';
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
                                service
                                .autoPayForLiveCourse({
                                    courseNumber: courseNum
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        var lessons = response.data.lessons ;
                                        if (lessons.length > 1) {
                                            var _content = '';
                                            for (var i = 0; i < lessons.length; i++) {
                                                _content += '<label><input type="radio" data-lid="'+i+'" name="lesson" '+ (i == 0 ? 'checked': '') +' > '+lessons[i].time+' </label>';
                                            }
                                            var content = ''
                                                +   '<div class="select-title">'
                                                +      '请选择您要进入的课节：'
                                                +   '</div>'
                                                +   _content
                                                +   '<div class="btn-box">'
                                                +   '<button class="btn-primary">确定</button>'
                                                +   '<button class="btn-default">取消</button>';
                                                +   '</div>'

                                            var dialog = new Dialog({
                                                title: '温馨提示',
                                                content: content,
                                                skinClass: 'enter-select-dialog',
                                                width: 400,
                                                onBeforeHide: function () {
                                                   this.element.off();
                                                }
                                            });

                                            dialog.element
                                            .on('click', '.btn-primary', function () {
                                                var list = $('.enter-select-dialog input');
                                                list.each(function(i, item){
                                                    if ($(item).is(':checked')) {
                                                        var lid = $(item).data('lid');
                                                        // 后台自动生成订单成功
                                                            new EnterClassroomDialog({
                                                                data: lessons[lid].online_data
                                                            });
                                                            return;
                                                    }
                                                });
                                                dialog.hide();
                                            })
                                            .on('click', '.btn-default', function () {
                                                dialog.hide();
                                            });
                                        } else {
                                            // 后台自动生成订单成功
                                            new EnterClassroomDialog({
                                                data: lessons[0].online_data
                                            });
                                        }
                                    }
                                });
                            }
                        } else {
                            // 如果其他用户是老师身份
                            if (store.get('user').type === 0) {
                                tryToEnroll();
                            } else {
                                // 生成了订单
                                if (store.get('purchaseId')) {
                                    // 直接进入支付页
                                    location.href = ('/pay/payProductPurchase?purchase_id=' + store.get('purchaseId'));
                                } else {
                                    tryToEnroll();
                                }
                            }
                        }
                    }
                });

            }
        })

        .on('click', '.chat-label', function (e) {
            var element = $(this);
            var number = element.data('userNumber');
            if (number == store.get('user').number) {
                alert('自己不能和自己聊天哦 ~ ', '温馨提示');
                return false;
            }
        })

        .on('click', '.morecourse', function (e) {
            $(this).hide();
            container.find('.trhide').show();
        })

        .on('mouseover', '.get-coupon', function () {//领取优惠券
            courseProfile.find('.coupon').show();
        })
        .on('mouseout', '.get-coupon', function (e) {
            var target = $(e.currentTarget);
            target.find('.coupon').hide();
        })
        .on('click', '.coupon-color', function (e) {
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
        .on('click', '.btn-trial', function (e) { // 预约试听

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
                location_type: leaveMessPageType,
                tid: store.get('teacherId'),
                cid: store.get('courseId')
            };
            WAT.send(url, params);

            var target = $(e.currentTarget);
            var courseNum = store.get('courseNum');
            var haslogin = store.get('user').number > 0;
            dialogName = target.data('dialog');

            var contentType = '';
            if (courseType == 4) {
                contentType = 'cdb.org_course';
            } else {
                contentType = 'cdb.teacher_class_course';
            }

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
                                new AdvisoryDialog({
                                    title: '预约试听',
                                    objectNumber: courseNum,
                                    contentType: contentType,
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
            } else { // 未登录用户 及 学生身份用户
                new AdvisoryDialog({
                    title: '预约试听',
                    objectNumber: courseNum,
                    contentType: contentType,
                });
            }
        });

    };
});