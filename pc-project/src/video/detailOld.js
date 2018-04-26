/**
 * @file 视频课详情
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var RecoverDialog = require('common/component/RecoverDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var ShareDialog = require('common/component/ShareDialog');
    var Dialog = require('cobble/ui/Dialog');
    var service = require('common/service');
    var store = require('common/store');
    var tianxiaoLog = require('common/tianxiaoLog');
    var leaveMessageDialog = require('common/component/LeaveMessageDialog');
    var cookie = require('cobble/util/cookie');
    var comment = require('./detail/comment');

    var container = $('#main');

    /**
     * 判断用户是否收藏该课程【视频课】
     */
    function isFavor() {

        var hasLogin = !!store.get('user').id;

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
                var favor = container.find('#favor');
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


    /*
     * 倒计时
     */
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
        var Obj = container.find('#video-comment');
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
                   // alert(1);
                    h_one = false;
                }

            }
        });
    }

    exports.init = function () {
        HoverTreeScroll()
        zheKouTime();

        // 获取用户是否已收藏该课程ajax
        isFavor();

        comment.init();
        ShareDialog.init(container);
        tianxiaoLog.send(store.get('orgNumber'), 'videoCourse', store.get('courseNum'));

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

        container
        .on('click', '.activity-photo', function (e) { // 上报
            var params = {
                "type": "redirect",
                "stype": $(this).data('value'),
                "course_type": 'video_course',
                "course_number": store.get('courseNum')
            };
            WAT.send('http://click.genshuixue.com/gs.gif', params);
        })
        .on('click', '.reserve-listen', function() {
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'recommend',
                stype: '2',
                client: 'PC',
                page_type: 'video_course',
                track_id: cookie.get('__track_id__'),
                _timestamp: new Date().getTime(),
                user_number: store.get('user').number,
                user_role: store.get('user').type,
                location_type: leaveMessPageType+'_1',
                tid: store.get('teacherId'),
                cid: store.get('courseId'),
            };
            WAT.send(url, params);

            var haslogin = store.get('user').number > 0;
            var courseNumber = store.get('courseNumber');

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
                                // 预约试听 － 个体老师
                                new leaveMessageDialog({
                                    title: '预约咨询',
                                    teacher: 'teacher',
                                    teacherNum: store.get('teacherNum'),
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
                // 预约试听 － 个体老师
                new leaveMessageDialog({
                    title: '预约咨询',
                    teacher: 'teacher',
                    teacherNum: store.get('teacherNum'),
                    skinClass: 'leave-message-detail'
                });

            }
        })
        .on('click', '[data-page]', function (e) {//分页上报
            var target = $(e.currentTarget);
            store.set('page', target.data('page'));
            report();
            //getCommentList();
            return false;
        })
        .on('click' , '#favor' , function (e) { // 收藏课程

            var element = $(this);
            var courseNum = element.data('coursenum');
            var haslogin = element.data('haslogin');
            var text = element.text();
            //登录或身份变更成功后 需要发收藏请求 并刷新当前页面
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
        .on('click', '.join, .start, .buy, .audition', function(e) {
            // 如果用户没登陆,弹出登陆框
            var hasLogin = store.get('hasLogin');
            var url = '';
            var element = $(this);
            if (element.hasClass('join')) {
                url = '/video_course/addfree?course_number='+store.get('courseNum');
                var createText = '你目前是老师身份，无法加入到你的视频课，是否开通学生身份？';
                var switchText = '你目前是老师身份，需要切换到学生身份才能加入到你的视频课';
                checkSignup(location.href, function() {
                        if (store.get('user') && store.get('user').number && store.get('teacherNum') == store.get('user').number ) {
                            alert('抱歉！你不能加入自己的视频课');
                            return false;
                        }
                        service
                        .addFreeVideoCourse(
                            { courseNumber: store.get('courseNum')} ,
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
                                success("加入视频课成功");
                            }
                        });
                },createText,switchText );


                return;
            }
            else if (element.hasClass('start')) {
                //url = '/video_course/play?course_number='+store.get('courseNum');
                // 如果是免费课直接跳转
                if (!store.get('price')) {
                    if (store.get('is_verify')) {
                        location.href = '/video_course/play?course_number='+store.get('courseNum')+'&sign='+store.get('sign');
                    }
                    else {
                        location.href = '/video_course/play?course_number='+store.get('courseNum');
                    }
                }
                else {
                    if (!hasLogin) {
                        new LoginDialog({
                            onSuccess: function () {
                                if (store.get('is_verify')) {
                                    location.href = '/video_course/play?course_number='+store.get('courseNum')+'&sign='+store.get('sign');
                                } else {
                                    location.href = '/video_course/play?course_number='+store.get('courseNum');
                                }
                            }
                        });
                    } else {
                        if (store.get('is_verify')) {
                            location.href = '/video_course/play?course_number='+store.get('courseNum')+'&sign='+store.get('sign');
                        } else {
                            location.href = '/video_course/play?course_number='+store.get('courseNum');
                        }
                    }
                }
            }
            else if (element.hasClass('audition')) {
                //url = '/video_course/play?course_number='+store.get('courseNum');
                // 如果是免费课直接跳转
                //if (!store.get('price')) {
                    if (store.get('is_verify')) {
                        location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+store.get('try_listen')+'&sign='+store.get('sign');
                    } else {
                        location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+store.get('try_listen');
                    }
                /*} else {
                    if (!hasLogin) {
                        new LoginDialog({
                            onSuccess: function () {
                                if (store.get('is_verify')) {
                                    location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+store.get('try_listen')+'&sign='+store.get('sign');
                                } else {
                                    location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+store.get('try_listen');
                                }
                            }
                        });
                    } else {
                        if (store.get('is_verify')) {
                            location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+store.get('try_listen')+'&sign='+store.get('sign');
                        } else {
                            location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+store.get('try_listen');
                        }
                    }
                }*/
            }
            else {
                if (hasLogin) {
                    //location.href = '/pay/productDetail?type=3&course_number='+store.get('courseNum');
                    if (store.get('teacherNum') == store.get('user').number ) {
                        alert('您不能购买自己的课哦~');
                        return false;
                    }
                    url = '/pay/productDetail?type=3&course_number='+store.get('courseNum');
                    var createText = '你目前是老师身份，无法购买视频课，是否开通学生身份？';
                    var switchText = '你目前是老师身份，需要切换到学生身份才能购买视频课';
                    checkSignup(location.href, function() {
                                    location.href = url;
                                },createText,switchText );
                } else {

                    new LoginDialog({
                        onSuccess: function () {
                            location.href = '/pay/productDetail?type=3&course_number='+store.get('courseNum');
                        },
                        next: location.href
                    });
                }
            }
        })
        .on('click', '.title, .box', function (e) {
            var element = $(this);
            var status = element.data('status');
            var sectionid = element.data('sectionid');

            // 如果是免费课直接跳转
            if (!store.get('price') || status == 3) {
                if (store.get('is_verify')) {
                    location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid+'&sign='+store.get('sign');
                } else {
                    location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid;
                }
            } else {
                if (store.get('hasLogin')) {
                    //免费 1，收费 2， 试听 3
                    if (!store.get('price')) {
                        if (store.get('is_verify')) {
                            location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid+'&sign='+store.get('sign');
                        } else {
                            location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid;
                        }
                    } else {
                        if (status == 2) {
                            if (store.get('is_access')) {
                                if (store.get('is_verify')) {
                                    location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid+'&sign='+store.get('sign');
                                } else {
                                    location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid;
                                }
                            } else {
                                if (store.get('teacherNum') == store.get('user').number ) {
                                    if (store.get('is_verify')) {
                                        location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid+'&sign='+store.get('sign');
                                    } else {
                                        location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid;
                                    }
                                    return false;
                                }
                                // is_verify为true直接跳转
                                if (!store.get('is_verify')) {
                                    confirm({
                                        content: '目前你没有权限观看该视频课，请购买后进行观看！',
                                        title: '温馨提示',
                                        width: 330
                                    })
                                    .done(function () {
                                        location.href = '/pay/productDetail?type=3&course_number='+store.get('courseNum');
                                    });
                                } else {
                                    location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid+'&sign='+store.get('sign');
                                }
                            }
                        } else {
                            if (store.get('is_verify')) {
                                location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid+'&sign='+store.get('sign');
                            } else {
                                location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid;
                            }
                        }
                    }
                } else {
                    new LoginDialog({
                        onSuccess: function () {
                            if (!store.get('price') || status != 2) {
                                if (store.get('is_verify')) {
                                    location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid+'&sign='+store.get('sign');
                                } else {
                                    location.href = '/video_course/play?course_number='+store.get('courseNum')+'&section_id='+sectionid;
                                }
                            } else {
                                location.reload();
                            }
                        },
                        next: location.href
                    });
                }
            }

            return false;
        })
        .on('click', '.stage-pay', function () {//分期付款
            var money = container.find('.price-now').text();
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
        });
    };
});