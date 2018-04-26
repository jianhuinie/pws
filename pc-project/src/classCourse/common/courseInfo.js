define(function (require,exports) {
    'use strict';

    var store = require('common/store');
    var Popup = require('cobble/helper/Popup');
    var service = require('common/service');
    var Dialog = require('cobble/ui/Dialog');
    var EnterClassroomDialog = require('common/center/component/EnterClassroomDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var leaveMessageDialog = require('common/component/LeaveMessageDialog');
    var tianxiaoLog = require('common/tianxiaoLog');
    var AdvisoryDialog = require('common/component/AdvisoryDialog');
    var kfAdvisoryDialog = require('common/component/kfAdvisoryDialog');
    var EnrollSuccessDialog = require('common/component/EnrollSuccessDialog');

    var VideoDialog = require('common/component/VideoDialog');
    var AudioPlayer = require('audioPlayer');
    var urlUtil = require('cobble/util/url');

    var container = $('#container');
    var cookie = require('cobble/util/cookie');

    
        
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
     * 判断用户是否收藏该课程【班课】
     */
    function isFavor() {
        var hasLogin = !!store.get('user').number;
        var favor = container.find('#favor');
        favor.find('.text').html('收藏');
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
                    favor.find('.text').html('已收藏');
                    favor.find('.icon').addClass('hasfavored');
                }
                else {
                    favor.find('.text').html('收藏');
                    favor.find('.icon').removeClass('hasfavored');
                }
                // 人气
                favor.find('.popularity').html(data.popularity);
                
           }
        });

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
                    //showActions();
                }
                else if (data.status == 2) { //报名生成订单 但没支付
                    store.set('hasEnrolled', true);
                    store.set('hasPaid', false);
                    store.set('purchaseId', data.purchase_id);
                    //showActions();
                }
                else if (data.status == 3) { //报名订单已支付
                    store.set('hasEnrolled', true);
                    store.set('hasPaid', true);
                    //container.find('#course-profile .has-paid').show();
                    //container.find('#course-profile .course-state').hide();
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
                            if (store.get('lessonWay') == 2 && (store.get('price') == 0 || store.get('realprice') == 0 )) {
                                freeroll();
                            }
                            else {
                                enroll();
                            }
                        },
                        next: location.href,
                        noskip: false
                    });
                }
            });
        } else {
            if (store.get('lessonWay') == 2 && (store.get('price') == 0 || store.get('realprice') == 0 )) {
                freeroll();
            }
            else {
                enroll();
            }
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

    function freeroll() {

        var teacherId = store.get('teacherId');

        var data = {};
        data.type = 2;
        data.courseNumber = store.get('courseNum');
        data.lessonWay = store.get('lessonWay');
        data.courseId = store.get('courseId');
        data.lng = store.get('position').lng;
        data.lat = store.get('position').lat;
        data.area_id = store.get('area_id');
        data.address = store.get('address');
        data.studentName = store.get('name');
        data.name = store.get('name');
        data.pay_money = 0;
        // 是否自己上课
        data.isSelf = 1;
        // 是否平台保障
        data.usePlatEnsure = 1;
        // 是否接收短信
        data.isSms = 0;

        return service
        .createfreePurchase(
            data,
            {
                errorHandler: {
                    '100014': function (response) {

                        var text = store.get('user').id == teacherId
                                 ? '你不能约自己的课'
                                 : '权限错误';

                        alert(text, '温馨提示');
                    },
                    '6': function (response) {
                        alert({
                            title: '温馨提示',
                            content: '不好意思，同一节课不能重复报名哦~<br />'
                                   + '如果你之前提交过订单未支付，请去 <span class="text-primary">我的订单'
                                   + ' &gt; 待支付</span> 完成支付',
                            buttons: [
                                {
                                    text: '查看我的订单',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                        location.href = '/order/studentOrders';
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
                    },
                    '100039': function (response) {
                        alert(
                            '班课已经开课，不能再提交订单',
                            '温馨提示'
                        );
                    },
                    '100051': function (response) {
                        alert({
                            title: '温馨提示',
                            content: '当前班课无法购买',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    },
                    '100040': function (response) {
                        alert({
                            title: '温馨提示',
                            content: '来晚了一步！<br />目前班课已经报满，你可以联系老师增加名额。',
                            buttons: [
                                {
                                    text: '返回老师主页',
                                    type: 'primary',
                                    handler: function () {
                                        location.href = '/t/' + store.get('teacherNumber');
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                }
            }
        )
        .done(function (response) {

            if (response.code === 0) {
                var data = response.data;

                if (data.err_code && data.err_code == '66') {

                    confirm({
                        title: '温馨提示',
                        content: '该课程订单已经存在，是否查看？',
                        buttons: [
                            {
                                text: '查看订单',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                    location.href = data.order_url;
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
                    return;
                }

                // success('提交成功', function () {
                //     location.reload();
                // });
                 new EnrollSuccessDialog({
                     courseType: +store.get('lessonWay')
                 });
            }
        });
    }

    /*
     * 倒计时
     */
    function dateFormat(time) {
        //console.log(time);
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

    /*
     * 限时活动倒计时
     */
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
         * 班课按钮显示
      */
    function initButtons() {
        
        service
            .classCourseButton({
                courseNumber: store.get('courseNum'),
                courseType: store.get('courseType')
            })
            .done(function (response) {
                if(response.code === 0){
                    var resArray = response.data.button;
                    var city_filter = store.get('city_filter');
                    var extension = store.get('extension');
                    var contentHtml = ''; 
                    $.each (resArray, function (idx, obj) {
                            if( obj !== null ) {
                                    contentHtml += '<div class="' + obj.class;
                                    if( obj.name === '预约试听') {
                                        contentHtml += '" data-dialog="预约">'
                                    }
                                    else {
                                        contentHtml += '">'
                                            
                                    }
                                    contentHtml += obj.name + '</div>'; 
                            }     
                    });
                    if( city_filter && extension ) {
                        contentHtml += '<div class="phone">'
                                    +      '<p>免费咨询</p>'
                                    +      '<p class="number">' + extension + '</p>'
                                    +  '</div>';
                    }
                    $('.buttons').html(contentHtml);
                }
            });
      }

    exports.init = function () {
        //var container = $('#courseInfo');

        var query = urlUtil.parseQuery(location.search);
        if (query.action === 'shenhe') {
            container.find('.mask').hide();
        }

        zheKouTime();
        var photos = store.get('photos');
        var courseNum = store.get('courseNum');
        var courseType = store.get('courseType');
        var length = photos.length;
        var images = $('.lists').find('img');
        var now = 0;
        var dialogName = '预约试听';
        var hasReplay = store.get('hasReplay');    
        //报名url
        var enrollUrl = '/pay/productDetail';
        var params = {
            course_number: courseNum,
            type: courseType
        };
        var search = $.param(params);
       
        // 调用班课按钮显示函数
        initButtons();

        enrollUrl += '?' + search;
        store.set('enrollUrl', enrollUrl);
        if (store.get('enrolling')) {
            var user = store.get('user');
            if (user && user.id && user.type == 2) {
                initEnrolledStatus();
            }
        }

         tianxiaoLog.send(
            store.get('orgNumber'),
            ((+courseType === 4) ? 'microCourse': 'classCourse'),
             courseNum
         );

        if (courseType != 4) {
            isFavor();
        }

        //观看回放按钮曝光上报
        if (hasReplay) {
            var params = {
                type: 'CourseDetailReplay_expo',
                course_number: store.get('courseNum'),
                course_type: store.get('courseType')
            };
            WAT.send('http://pb0.genshuixue.com/gs.gif', params);
        }

        var audioPlayer = new AudioPlayer({
            element: container.find('.view-audio-wrapper'),
            onPlayComplete: function (data) {
                audioPlayer.stop();
                playing = false;
                $('.play-gif').each(function (index, value) {
                    $(value).hide();
                });
                $('.play-icon').each(function (index, value) {
                    $(value).show();
                });
            }
        });

        var playing = false;
        container
        .on('click', '.audio-box', function (e) {
            var target = $(e.currentTarget);
            var url = target.data('audio');
            if (playing) {
                audioPlayer.stop();
                playing = false;
                var flag = 0;
                $('.play-gif').each(function (index, value) {
                    // 暂停自己的情况
                    if ($(value).css('display') != 'none'
                        && $(value).parent().data('audio') != target.data('audio')) {
                        flag = 1;
                    }
                    $(value).hide();
                });
                $('.play-icon').each(function (index, value) {
                    $(value).show();
                });
                target.find('.play-gif').hide();
                target.find('.play-icon').show();

                if (flag) {
                    audioPlayer.play(url);
                    playing = true;
                    $('.play-gif').each(function (index, value) {
                        $(value).hide();
                    });
                    $('.play-icon').each(function (index, value) {
                        $(value).show();
                    });
                    target.find('.play-icon').hide();
                    target.find('.play-gif').show();
                }
            }
            else {
                audioPlayer.play(url);
                playing = true;
                $('.play-gif').each(function (index, value) {
                    $(value).hide();
                });
                $('.play-icon').each(function (index, value) {
                    $(value).show();
                });
                target.find('.play-icon').hide();
                target.find('.play-gif').show();
            }
        })
        .on('click', '.video-box', function (e) {
            var target = $(e.currentTarget);
            var videoUrl = target.data('video');
            var videoId = videoUrl.split('/')[3];
            if (query.action === 'shenhe') {
                var url = '/tcenter/foundation/storage/get-video-info?id=' + videoId;
                $.ajax({
                    url: url,
                    method: 'get',
                    success: function(response) {
                        if (response.data.status == 70) {
                            new VideoDialog({
                                url: response.data.pc_play_url
                            });
                        }
                        else {
                            alert({
                                title: '温馨提示',
                                content: '视频正在转码中...'
                            });
                        }
                    }
                });
            }
            else {
                new VideoDialog({
                    url: videoUrl
                });
            }
        })
        .on('click', '.juhuixue-photo', function () {
            var params = {
                "type": "redirect",
                "stype": 1,
                "course_type": "class_course",
                "course_number": store.get('courseNum')
            };
            WAT.send('http://pb0.genshuixue.com/gs.gif', params);
        })
        .on('click', '.leftBar', function() {
            $(images[now]).css('display','none');
            now = now ? now : now + length;
            var temp = (now - 1)%length;
            $(images[temp]).fadeIn();
            now = temp;
        })
        .on('click', '.rightBar', function() {
            $(images[now]).css('display','none');
            var temp = (now + 1)%length;
            $(images[temp]).fadeIn();
            now = temp;
        })
        .on('mouseover', '.get-coupon', function () { // 领取优惠券
            container.find('.coupon').show();
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
        .on('click' , '#favor' , function (e) { // 收藏课程
            var element = $(this);
            var courseNum = element.data('coursenum');
            var haslogin = !!store.get('user').number;
            var text = element.find('.text').text();
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
        .on('click', '.online-trial', function (e) {
            var target = $(e.currentTarget);
            var loc = target.data('location');
            var mode = target.data('mode');
            var token = target.data('token');
            var feedbackUrl = store.get('feedbackUrl');
            var timestamp = target.data('timestamp');
            var onlineData = {
                location: loc,
                mode: mode,
                token: token,
                timestamp: timestamp
            };
            var roomNo = store.get('roomNo');
            if (!store.get('user').number) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                    }
                });
            }
            else {
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
                }
                else {
                    service
                    .getIsSupportTrial({
                        roomNo: roomNo
                    })
                    .done(function (response) {
                        if (response.code === 0 && response.data.left_minutes > 0) {
                            //进入直播教室试听
                            new EnterClassroomDialog({
                                data: onlineData
                            });
                        }
                        else if (response.data.left_minutes == 0) {
                            // alert("试听时间已达上限");
                            location.href = feedbackUrl;
                        }
                        else {
                            alert(response.message);
                        }
                    })
                }
            }
        })
        .on('click', '.btn-trial', function (e) { // （留单）

            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'recommend',
                stype: '2',
                client: 'PC',
                page_type: "class_course",
                track_id: cookie.get('__track_id__'),
                _timestamp: new Date().getTime(),
                user_number: store.get('user').number,
                user_role: store.get('user').type,
                location_type: leaveMessPageType+'_2',
                tid: store.get('teacherId'),
                cid: store.get('courseId')
            };
            WAT.send(url, params);

            var target = $(e.currentTarget);
            var haslogin = store.get('user').number > 0;
            var isOrg = store.get('isOrg'); // boolean
            dialogName = target.data('dialog');

            var isOneOnOneTeacher = store.get('isOneOnOneTeacher');
            var channelValue = '';
            if (isOneOnOneTeacher) { //如果是一对一老师，则channelValue为'youxuan_teacher_pc'
                channelValue = 'youxuan_teacher_pc';
            }

            if (isOrg && !isOneOnOneTeacher) { // 预约试听 － 是机构老师并且不是一对一老师 - 机构留单
                var contentType = '';
                if (courseType == 4) {
                    contentType = 'cdb.org_course';
                } else {
                    contentType = 'cdb.teacher_class_course';
                }

                if (haslogin && store.get('user').type === 0) { // 已登陆的老师用户
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
                                    // 预约试听
                                    new AdvisoryDialog({
                                        title: dialogName,
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
                }
                else { // 留单
                    new AdvisoryDialog({
                        title: dialogName,
                        objectNumber: courseNum,
                        contentType: contentType
                    });
                }
            }
            else { // 个人老师 － 留单
                if (haslogin && store.get('user').type === 0) {// 已登陆的老师用户
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
                                    // 预约试听
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
                                },
                                noskip: false
                            });
                        }
                    });
                }
                else {
                    new leaveMessageDialog({
                        teacher: 'teacher',
                        teacherNum: store.get('teacherNum'),
                        skinClass: 'leave-message-detail',
                        channel: channelValue,
                        oneOnOneTeacherMobile: store.get('one_on_one_teacher_mobile'),
                    });
                }
            }
        })
        .on('click', '.reserve-course', function (e) { // 报名课程
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
        .on('click', '.viewPlan', function (e) {
            var target = $(e.currentTarget);
            var element = $(target.data('link'));
            var top = element.offset().top;
            window.scrollTo(0,top - 68);
        })
        .on('click', '.primary-enter-room', function (e) { // 进入教室
            // 如果用户没登陆,弹出登陆框
            if (!store.get('user').number && store.get('price') != 0) {

                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                    }
                });
                return;
            }
            else {
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
                        }
                        else {
                            // 如果其他用户是老师身份
                            if (store.get('user').type === 0) {
                                tryToEnroll();
                            }
                            else {
                                // 生成了订单
                                if (store.get('purchaseId')) {
                                    // 直接进入支付页
                                    if (store.get('price') == 0 || store.get('realprice') == 0) {
                                        freeroll();
                                    }
                                    else {
                                        location.href = ('/pay/payProductPurchase?purchase_id=' + store.get('purchaseId'));
                                    }
                                } else {
                                    tryToEnroll();
                                }
                            }
                        }
                    }
                });

            }
        })

        //观看回放
        .on('click', '.see-replay', function () {
            var replayValid = store.get('replayValid');
            var replayUrl = store.get('replayUrl');
            var params = {
                type: 'CourseDetailReplay_expo',
                user_number: store.get('user').number,
                course_number: store.get('courseNum'),
                course_type: store.get('courseType')
            };
            if (replayValid) {
                params.stype = 'LearnReplay';
            }
            else {
                params.stype = 'VideoCourse';
            }
            WAT.send('http://click.genshuixue.com/gs.gif', params);
            location.href = replayUrl;
        })
        //分期付款
        .on('click', '.stage-pay', function () {
            var money = container.find('.now span').text();
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
                                        enroll();
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

        var popup = new Popup({
            element: container.find('.social-share'),
            layer: container.find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });

    }
});