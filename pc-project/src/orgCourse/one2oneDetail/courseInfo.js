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
     *
     * @param buyWay 售卖方式，1按课时卖 2按期卖
     * @param courseNum
     * @param lessonWay
     */
    function tryToEnroll(buyWay, courseNum, lessonWay) {

        var buyWay = buyWay || store.get('buyWay');
        var courseNum = courseNum || store.get('courseNum');
        var lessonWay = lessonWay || store.get('lessonWay');

        // 适用用户登录的情况
        /*
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
        */

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
                            enroll(buyWay, courseNum, lessonWay)
                        },
                        next: location.href,
                        noskip: false
                    });
                }
            });
        }
        else {
            enroll(buyWay, courseNum, lessonWay)
        }
    }

    /**
     * 报名
     * @param buyWay 售卖方式，1按课时卖 2按期卖
     * @param courseNum
     * @param lessonWay
     */
    function enroll(buyWay, courseNum, lessonWay) {

        var buyWay = buyWay || store.get('buyWay');
        var courseNum = courseNum || store.get('courseNum');
        var lessonWay = lessonWay || store.get('lessonWay');

        var hours;

        if (buyWay == 1) { // 按课时卖，默认必须从详情页下单
            hours = container.find('.course-hour input').val();
        }
        else if (buyWay == 2) { // 一对一按期卖，默认时长取1
            hours = 1;
        }

        // 报名url
        var enrollUrl = '/pay/productDetail';
        var params = {
            course_number: courseNum,
            type: 11,
            lesson_way: lessonWayMap[lessonWay],
            hours: hours
        };

        var search = $.param(params);
        enrollUrl += '?' + search;

        location.href = enrollUrl;
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
        .on('click', '.reserve-course', function () { // 报名课程
            var me = $(this);
            var buyWay = me.data('buyway');
            var courseNum = me.data('number');
            var lessonWay = me.data('lessonway');

            // 如果用户没登陆,弹出登陆框
            if (!store.get('user').number) {
                new LoginDialog({
                    onSuccess: function () {
                        tryToEnroll(buyWay, courseNum, lessonWay);
                    }
                });
                return;
            }

            tryToEnroll(buyWay, courseNum, lessonWay);
        })
        .on('click', '.viewPlan', function (e) {
            var target = $(e.currentTarget);
            var element = $(target.data('link'));
            var top = element.offset().top;
            window.scrollTo(0,top - 68);
        })
        .on('click', '.stage-pay', function () { // 分期付款
            var money = container.find('.now span').text();
            var hasLogin = store.get('user').number > 0;
            if (hasLogin) {
                /*
                if (store.get('teacherNum') == store.get('user').number ) {
                    alert('您不能购买自己的课哦~');
                    return false;
                }
                */

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