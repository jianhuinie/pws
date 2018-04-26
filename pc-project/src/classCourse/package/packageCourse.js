/**
 * @file 考研专区 - 联报课详情页
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var lazyImage = require('common/lazyImage');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var LoginDialog = require('common/component/LoginDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var store = require('common/store');
    var service = require('common/service');

    var container = $('#main');

    /**
     * 初始化导航菜单
     * 包含菜单跟随效果
     * @inner
     *
     */
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
            // body.css('margin-top', 84);
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
        .on('click', '.baseinfo .to-schedult-info', function (e) {
            var target = $(e.currentTarget);
            var activeClass = 'active';
            var element = $(target.attr('href'));

            if (element.length === 1) {

                fixedHeader();

                var top = element.offset().top;
                window.scrollTo(0, top - height);

            }

            return false;
        });
    }

    /**
     * 获取当前用户的报名情况
     *
    function initEnrolledStatus() {

        service
        .checkCourseRepeat({
            courseNumber: store.get('courseNum')
        },
        {
            errorHandler: {
                '100014': function () {
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
            if (response.code == 0) { // 没有报过名 可以报名

                var data = response.data;

                if (data.status == 1) { // 没有报名
                    store.set('hasEnrolled', false);
                    store.set('hasPaid', false);
                }
                else if (data.status == 2) { // 报名生成订单 但没支付
                    store.set('hasEnrolled', true);
                    store.set('hasPaid', false);
                    store.set('purchaseId', data.purchase_id);
                }
                else if (data.status == 3) { // 报名订单已支付
                    store.set('hasEnrolled', true);
                    store.set('hasPaid', true);
                    // container.find('#course-profile .has-paid').show();
                    // container.find('#course-profile .course-state').hide();
                }
            }
        });
    }
    */

    /**
     * 尝试报名
     *
     * 这里约束身份条件
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     */
    function tryToEnroll() {

        if (store.get('user').type === 0) { // 老师不可购买
            service
            .getUserType()
            .done(function (response) {
                if (response.code === 0) {
                    var roles = response.data.roles;
                    var hasStudentRole = getHasStudentRole(roles);
                    var text = '';

                    if (hasStudentRole) {
                        text = '你目前是老师身份，需要切换到学生身份才能购买课程';
                    }
                    else {
                        text = '你目前是老师身份，无法购买课程，是否开通学生身份？';
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
                        +       '<p>您已经报名该组合课但是还未完成支付，请前往支付。</p>'
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

        lazyImage.init();
        initNavTab();

        // 报名url
        var enrollUrl = '/pay/productDetail';
        var params = {
            course_number: store.get('courseNum'),
            type: 7
        };
        var search = $.param(params);

        enrollUrl += '?' + search;
        store.set('enrollUrl', enrollUrl);

        /*/ 如果已经登录 则获取打包课是否已经报名、支付。
        if (store.get('enrolling')) {
            var user = store.get('user');
            if (user && user.id && user.type == 2) {
                initEnrolledStatus();
            }
        }*/

        container
        .on('click', '.view-all', function (e) { // 教学大纲全展示
            var target = $(e.currentTarget);
            if (target.hasClass('open')) { // 查看课程目录
                target.prev('ul').find('li').show();
                target.removeClass('open').addClass('close').text('收起课程目录');
            }
            else if (target.hasClass('close')) { // 收起课程目录
                target.prev('ul').find('li').hide();
                target.removeClass('close').addClass('open').text('查看课程目录');
            }
        })
        .on('click', '.reserve-course', function (e) { // 立即报名
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
        .on("click", "#data-info .download-btn", function (e){ // 下载资料
            if (store.get("courseStatus") == 1 || store.get("courseStatus") == 3) {
                // 已报名用户，直接加qq群，索要下载文件
            }
            else {
                alert({
                    title: '温馨提示',
                    content: '报名后才可获取资料噢～',
                    buttons: [
                        {
                            text: "我知道了",
                            type: 'primary',
                            handler: function () {
                                this.hide();
                            }
                        }
                    ]
                });
                return false;
            }
        });

    };



});












