/**
 * @file 视频课详情 2017.01.03
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var EnrollSuccessDialog = require('common/component/EnrollSuccessDialog');
    var ShareDialog = require('common/component/ShareDialog');
    var Dialog = require('cobble/ui/Dialog');

    var material = require('./detail/material');
    var comment = require('./detail/comment');

    var container = $('#main');

    // 判断用户是否收藏该课程【视频课】
    function isFavor() {

        var hasLogin = store.get('hasLogin');

        var favor = container.find('#favor');
        favor.find('span').html('收藏');
        favor.find('.icon').removeClass('hasfavored');

        if (!hasLogin || store.get('user').type == 0) {
            return;
        }

        return service
        .checkCollectedAjax({
            type: 'video_course',
            number: store.get('courseNum')
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                // 收藏
                if (hasLogin && data.is_favored) { // 已登录且收藏用户
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
    
    /**
     * 跳转到视频课播放页面
     * @param  {Array} element 当前点击的元素
     * @return {Bool}  
     */
    function redirectToVideoPlay(element, isTeacher) {
        var url = '/video_course/play?course_number=' + store.get('courseNum');
        if (element.data('sectionid')) {
            url += '&section_id=' + element.data('sectionid');
        }
        if (store.get('isVerify')) { // 如果从审核系统过来
            url += '&sign=' + store.get('sign');
        } 
        else if (isTeacher) {
            url += '&modify=1'; 
        }
        location.href = url;
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
        var priceTip = container.find('.limit-discount');
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

    /**
     * 检查立即报名的情况
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     */
    function checkSignup(url,callback,createText,switchText) {

        var userType = store.get('user').type;
        if (userType >= 0) {
            if (userType === 0) {
                new SwitchRoleDialog({
                    createText: createText,
                    switchText: switchText,
                    switchTo: 'student',
                    onSuccess: function () {
                        if (callback) {
                            callback();
                        }
                    }
                });
            }
            else {
                if (callback) {
                    callback();
                }
            }
        }
        else {
            new LoginDialog({
                onSuccess: function () {
                    callback();
                    location.href = url ;
                }
            });
        }
    }

    // 点击上报
    function clickReport(stype, userNum, courseNum) {
        var params = {
            type: 'PC_video',
            style: stype,
            user_number: userNum,
            number: courseNum
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);
    }
    //检测是否在黑名单中
    function checkBlackList() {
        return service.checkBlackList({
                course_type: 3,
                course_number: store.get('courseNum')
            });
    }

    //出提示弹窗
    function showRemindDialog() {
        alert({
            title: '温馨提示',
            content: '抱歉，老师已将您加入黑名单，暂时无法购买该老师的课程'
        });
    }

    exports.init = function () {

        var hasLogin = store.get('hasLogin');

        // 获取用户是否已收藏该课程ajax
        isFavor();
        // 分享
        ShareDialog.init(container);
        // 限时折扣
        zheKouTime();

        // 资料
        material.init();
        // 评论
        comment.init();

        container
        .on('click' , '#favor' , function (e) { // 收藏课程
            // 点击上报
            clickReport('collect');

            var element = $(this);
            var courseNum = store.get('courseNum');
            var text = element.find('span').text();
            // 登录或身份变更成功后 需要发收藏请求 并刷新当前页面
            var onSuccess = function () {
                if (courseNum) {
                    service
                    .addFavouriteAjax({
                        type: 'video_course',
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

            if (hasLogin) {
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
                                onSuccess: onSuccess,
                                noskip: false
                            });
                        }
                    });
                }
                else {
                    if (text == '收藏') {
                        if (courseNum) {
                            service
                            .addFavouriteAjax({
                                type: 'video_course',
                                number: courseNum
                            },
                            {
                                errorHandler: {
                                    110101: function (response) {
                                        confirm({
                                            title: "温馨提示",
                                            content: "已经收藏过了，快去我的收藏看看吧",
                                            buttons: [
                                                {
                                                    text: '确定',
                                                    type: 'primary',
                                                    handler: function () {
                                                        // 跳转到收藏页面
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
                    }
                    else {
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
            }
            else {
                // 收藏操作有后续异步请求 故若登录失败不再要求BanLessonDialog做跳转 failNext='0'
                new LoginDialog({
                    wrongRoleText: '你目前是老师身份，无法收藏课程，是否开通学生身份？',
                    onSuccess: onSuccess,
                    failNext: '0'
                });
            }
        })
        .on('mouseover', '.get-coupon', function () { // 领取优惠券
            container.find('.coupon').show();
        })
        .on('mouseout', '.get-coupon', function (e) {
            var target = $(e.currentTarget);
            target.find('.coupon').hide();
        })
        .on('click', '.coupon-color', function (e) {
            // 上报
            clickReport('coupon');

            var target = $(e.currentTarget);
            var serialNum = target.data('num');
            if (hasLogin) {
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
        .on('click', '.stage-pay', function () { // 分期付款
            // 上报
            clickReport('instalments');

            var money = container.find('.price-now em').text();
            if (hasLogin) {
                if (store.get('teacherNum') == store.get('user').number) {
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
                        money: money,
                        courseNum: store.get("courseNum"),
                        courseType: store.get("courseType")
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
                            content += '<div class="stage-buy">花呗分期付款</div>';
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
                                    courseNum: store.get('courseNum'),
                                    courseType: store.get('courseType'),
                                    periods: periods
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        stageDialog.hide();
                                        location.href = '/pay/productDetail?type=3&course_number='+store.get('courseNum');

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
        })
        .on('click', '.join, .start, .buy, .audition', function (e) { // 按钮们～
            // 如果用户没登陆,弹出登陆框
            var url = '';
            var element = $(this);
            if (element.hasClass('join')) { // 加入我的视频课
                // 点击上报
                clickReport('addition');

                url = '/video_course/addfree?course_number='+store.get('courseNum');
                var createText = '你目前是老师身份，无法加入到你的视频课，是否开通学生身份？';
                var switchText = '你目前是老师身份，需要切换到学生身份才能加入到你的视频课';
                checkBlackList().then(function (response) {
                    if (response.data.black_list_limited) {
                        showRemindDialog();
                        return ;
                    }  
                    else {
                        checkSignup(location.href, function() {
                            if (store.get('user') && store.get('user').number && store.get('teacherNum') == store.get('user').number ) {
                                alert('抱歉！你不能加入自己的视频课');
                                return false;
                            }
                            service
                            .addFreeVideoCourse(
                                {
                                    courseNumber: store.get('courseNum')
                                },
                                {
                                    errorHandler: {
                                        '100037': function () {
                                            success("您已添加该课程");
                                        }
                                    }
                                }
                            )
                            .done(function(response){
                                if (response.code == 0) {
                                    // success("加入视频课成功");
                                    new EnrollSuccessDialog({
                                        courseType: 3
                                    });
                                }
                            });
                        },createText,switchText);

                        return;
                    } 
                });
                
            }
            else if (element.hasClass('start')) { // 开始学习
                // 点击上报
                clickReport('learning');
                checkBlackList().then(function (response) {
                    if (response.data.black_list_limited) {
                        showRemindDialog();
                        return ;
                    }
                    else {
                         // 如果是免费课直接跳转
                        if (!store.get('price')) {
                            redirectToVideoPlay(element);
                        }
                        else {
                            if (!hasLogin) {
                                new LoginDialog({
                                    onSuccess: function () {
                                        redirectToVideoPlay(element);
                                    }
                                });
                            }
                            else {
                                redirectToVideoPlay(element);
                            }
                        }
                    }
                });  
            }
            else if (element.hasClass('audition')) { // 免费试听
                // 点击上报
                clickReport('Paudition', store.get('user').number, store.get('courseNum'));
            }
            else { // 立即购买
                // 点击上报
                clickReport('buy');

                if (hasLogin) {
                    if (store.get('teacherNum') == store.get('user').number) {
                        alert('您不能购买自己的课哦~');
                        return false;
                    }
                    url = '/pay/productDetail?type=3&course_number=' + store.get('courseNum');
                    var createText = '你目前是老师身份，无法购买视频课，是否开通学生身份？';
                    var switchText = '你目前是老师身份，需要切换到学生身份才能购买视频课';
                    checkSignup(location.href, function() {
                                    location.href = url;
                                },createText,switchText );
                }
                else {
                    new LoginDialog({
                        onSuccess: function () {
                            location.href = '/pay/productDetail?type=3&course_number='
                                          + store.get('courseNum');
                        },
                        next: location.href
                    });
                }
            }
        })
        .on('click', '.dstart, .daudition, .dbuy', function () { // 目录的操作
            var element = $(this);
            if (element.hasClass('dstart')) { // 免费课，直接播放
                // 点击上报
                clickReport('dlearning');

                // 如果是免费课直接跳转
                if (!store.get('price')) {
                    redirectToVideoPlay(element);
                }
                else {
                    if (!hasLogin) {
                        new LoginDialog({
                            onSuccess: function () {
                                redirectToVideoPlay(element);
                            }
                        });
                    }
                    else {
                        redirectToVideoPlay(element);
                    }
                }
            }
            else if (element.hasClass('daudition')) {
                // 点击上报
                clickReport('daudition', store.get('user').number, store.get('courseNum'));
                redirectToVideoPlay(element);
            }
            else if (element.hasClass('dbuy')) {
                // 点击上报
                clickReport('dbuy');

                if (hasLogin) {
                    // hurry: 超级账户
                    if (store.get('isAccess')) {
                        redirectToVideoPlay(element);
                        return;
                    }
                    var verifyStatus = store.get('verify_status');
                    if ((store.get('teacherNum') == store.get('user').number) && (verifyStatus == 1 || verifyStatus == 2)) { // 主讲老师
                        redirectToVideoPlay(element, 1);
                        return;
                    }
                    var url = '/pay/productDetail?type=3&course_number=' + store.get('courseNum');
                    var createText = '你目前是老师身份，无法购买视频课，是否开通学生身份？';
                    var switchText = '你目前是老师身份，需要切换到学生身份才能购买视频课';
                    checkSignup(location.href, function() {
                                    location.href = url;
                                },createText,switchText );
                }
                else {
                    new LoginDialog({
                        onSuccess: function () {
                            // hurry: 超级账户
                            if (store.get('isAccess')) {
                                redirectToVideoPlay(element);
                                return;
                            }
                            location.href = '/pay/productDetail?type=3&course_number='
                                          + store.get('courseNum');
                        },
                        next: location.href
                    });
                }
            }
        })
        .on('click', '.tabs a', function () { // tab点击上报
            clickReport($(this).data('log'));
        })
        .on('click', '.teacher .info a', function () { // 主讲老师，点击上报
            clickReport('teacherclick');
        })
        .on('click', '.organization .info a', function () { // 所属机构，点击上报
            clickReport('orgclick');
        });

    };

});