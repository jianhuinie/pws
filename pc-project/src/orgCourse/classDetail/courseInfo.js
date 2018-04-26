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

    var VideoDialog = require('common/component/VideoDialog');
    var AudioPlayer = require('audioPlayer');
    var urlUtil = require('cobble/util/url');
    var cookie = require('cobble/util/cookie');

    var container = $('#container');
    var courseType, courseNum;
    var lessonWayMap = {
        2: 'online',
        4: 'student'
    };

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


    /**
     * 尝试报名
     *
     * 这里约束身份条件
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     */
    function tryToEnroll(courseNum, lessonWay, price) {

        var courseNum = courseNum || store.get('courseNum');
        var lessonWay = lessonWay || store.get('lessonWay');
        var price = price || store.get('price');

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
                        onSuccess: function(){
                            if (lessonWay == 2 && price == 0) {
                                freeroll(courseNum);
                            }
                            else {
                                enroll(courseNum)
                            }
                        },
                        next: location.href,
                        noskip: false
                    });
                }
            });
        }
        else {
            if (lessonWay == 2 && price == 0) {
                freeroll(courseNum);
            }
            else {
                enroll(courseNum)
            }
        }
    }

    /**
     * 报名
     */
    function enroll(courseNum) {

        var courseNum = courseNum || store.get('courseNum');

        // 报名url
        var enrollUrl = '/pay/productDetail';
        var params = {
            course_number: courseNum,
            type: 12
        };
        var search = $.param(params);
        enrollUrl += '?' + search;

        location.href = enrollUrl;
    }

    /**
     * 免费课报名
     */
    function freeroll(courseNum) {

        var courseNum = courseNum || store.get('courseNum');
        // 这个逻辑，其实暂时不支持
        var teacherNumber = store.get('teacherNumber');

        var data = {};
        data.type = 12;
        data.courseNumber = courseNum;
        data.studentName = store.get('name');
        data.name = store.get('name');
        data.pay_money = 0;
        data.isSelf = 1; // 是否自己上课
        data.usePlatEnsure = 1; // 是否平台保障
        data.isSms = 0; // 是否接收短信

        return service
        .createfreePurchase(
            data,
            {
                errorHandler: {
                    '100014': function (response) {

                        var text = store.get('user').user_number == teacherNumber
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
                            content: '来晚了一步！<br />目前课程已报满，你可以联系机构增加名额',
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

                success('提交成功', function () {
                    location.reload();
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

    exports.init = function () {

        var query = urlUtil.parseQuery(location.search);
        if (query.action === 'shenhe') {
            container.find('.mask').hide();
        }

        courseType = store.get('courseType');
        courseNum = store.get('courseNum');

        tianxiaoLog.send(
            store.get('orgNumber'),
            ((+courseType === 4) ? 'microCourse': 'classCourse'),
             courseNum
        );

        // 收藏
        // isFavor();

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
        .on('mouseover', '.show-more-service', function () { // 更多服务
            $(this).find('.more-service').show();
        })
        .on('mouseout', '.show-more-service', function () { // 更多服务
            $(this).find('.more-service').hide();
        })
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
        .on('click', '#favor' , function (e) { // 收藏课程
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
        .on('click', '.reduce', function () { // 课时 - 减少
            var target = $(this);
            if (target.hasClass('disabled')) {
                return;
            }
            else {
                var classHoursInput = target.next('input');
                var classHours = classHoursInput.val() - 1;
                if (classHours < 1) {
                    target.addClass('disabled');
                }
                else {
                    classHoursInput.val(classHours);
                }
            }
        })
        .on('click', '.increase', function () { // 课时 - 增加
            var target = $(this);
            var classHoursInput = target.prev('input');
            var reduceBtn = classHoursInput.prev('.reduce');
            var classHours = +(classHoursInput.val()) + 1;

            classHoursInput.val(classHours);

            if (reduceBtn.hasClass('disabled')) {
                reduceBtn.removeClass('disabled');
            }
        })
        .on('click', '.reserve-course', function (e) { // 报名课程
            var me = $(this);
            var courseNum = me.data('number');
            var lessonWay = me.data('lessonway');
            var price = me.data('price');

            // 如果用户没登陆,弹出登陆框
            if (!store.get('user').number) {
                new LoginDialog({
                    onSuccess: function () {
                        tryToEnroll(courseNum, lessonWay, price);
                    }
                });
                return;
            }

            tryToEnroll(courseNum, lessonWay, price);
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
                    courseNumber: courseNum,
                    courseType: 12
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
                                    courseNumber: courseNum,
                                    courseType: courseType
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
                                    if (store.get('price') == 0) {
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
        .on('click', '.stage-pay', function () { // 分期付款
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
                        money: money
                    })
                    .done(function (response) {
                        if(response.code === 0) {
                            var fenqiDetail = response.data.fenqi_detail;
                            var length = fenqiDetail.length;
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
                                content += '<div class="stage-item' + specialClass + '" data-periods="' + item.periods + '">'
                                        +      '<span class="stage-detail">¥ ' + item.every_periods_repayment + ' x ' + item.periods + '期'
                                        +      '<span>含手续费</span>'
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