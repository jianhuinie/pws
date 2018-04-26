/**
 * @file 老师详情
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');
    var ImageDialog = require('common/component/ImageDialog');
    var RecoverDialog = require('common/component/RecoverDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var leaveMessageDialog = require('common/component/LeaveMessageDialog');
    var InviteDialog = require('common/component/InviteDialog');
    var ShareDialog = require('common/component/ShareDialog');
    var starPatch = require('common/component/starPatch');
    var AudioPlayer = require('audioPlayer');
    var timeSpan = require('common/function/timeSpan');
    var cookie = require('cobble/util/cookie');
    var bindScroll = require('common/bindScroll');
    var instance = require('cobble/util/instance');
    var Popup = require('cobble/helper/Popup');
    var supportFlash = require('cc/function/supportFlash');

    var trialCourse = require('./newDetail/trialCourse');
    var course = require('./newDetail/course');
    var comment = require('./newDetail/comment');
    var calendar = require('./newDetail/calendar');
    var residence = require('./newDetail/residence');
    var orderForm = require('./newDetail/orderForm');
    var media = require('./newDetail/media');
    var service = require('common/service');
    var store = require('common/store');
    var tianxiaoLog = require('common/tianxiaoLog');

    var entrance = require('im/entrance');
    var stringUtil = require('cobble/util/string');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var Dialog = require('cobble/ui/Dialog');
    var HasCommentedDialog = require('common/component/HasCommentedDialog');

    var container = $('#main');
    var sidebar = container.find('#teacher-sidebar');
    var teacherProfile = container.find('#teacher-profile');
    var teacherMedia = container.find('#teacher-media');
    var teacherComment = container.find('#teacher-comment');
    var teacherOrderForm = container.find('#teacher-order-form');
    var teacherCard = container.find('#teacher-card');

    var topNav = container.find('.top-nav');
    var teacherExperience = container.find('#teacher-experience');
    var teacherSuccess = container.find('#teacher-success');
    var teacherCourse = container.find('#teacher-course');
    var teacherArticle = container.find('#teacher-article');
    var showTabNavInfo = container.find('#show-tab-nav-info');
    var $window = instance.window;

    // 老师主页统计
    function log() {

        var startTime = new Date().getTime();

        $window.unload(function () {
            WAT.send('http://click.genshuixue.com/w.gif', {
                type: 'teacher_detail',
                tid: store.get('teacherId'),
                uid: cookie.get('PHPSESSID'),
                uuid: store.get('user').id ? store.get('user').id : -1,
                qid: store.get('qid'),
                stay_time: new Date().getTime() - startTime
            });
        });
    }

    /** 计算是否需要显示查看更多 */
    function isShowMoreCard() {
        $('.tag').each(function () {
            if (this.scrollHeight > this.offsetHeight + 2) {
                $(this).next('.view-more').show();
            }
        });
    }

    /**
     * 处理文本内容的展开收起
     *
     * @inner
     */
    function toggleContent() {
        sidebar
        .on('click', '.content-toggle', function (e) {

            var target = $(e.currentTarget);

            var content = target.closest('.detail');
            var element = content.find('> div');

            // element 里面的富文本有时候会破坏结构，必须用 append 保证一次
            //content.append(target);

            var cut = container.hasClass('profile-active') ? content.data('newcut') : content.data('cut');
            var all = content.data('all');

            if (target.html() === '展开全部') {
                element.html(stringUtil.decodeHTML(all)+'<a class="content-toggle">收起全部</a>');
                //target.html('收起全部');
            }
            else {
                element.html(stringUtil.decodeHTML(cut)+'<a class="content-toggle">展开全部</a>');
                //target.html('展开全部');
            }
        });
    }

    // 获取视频课列表
    function getMediaList(type, selector, key, pagesize, page) {

        //var sortBy = sortSelect ? sortSelect.getValue() : 'display_order';
        var sortBy = 'update_time';

        return service
        .getTeacherVideoPhotoList({
            teacherNum: store.get('teacherNum'),
            page: page ? page : store.get('mediaPage'),
            pageSize: pagesize ? pagesize : 10,
            showType: type
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                var tpl = data.tpl[key];
                var video_list = data.video_list;
                var photo_list = data.photo_list;

                var content = teacherMedia.find(selector);

                /*if (video_list.length > 0 || photo_list.length > 0) {
                    teacherMedia.show();
                } else if (type == 2) {
                    teacherMedia.show();
                } else {
                    teacherMedia.hide();
                }*/
                if (video_list.length > 0 || photo_list.length > 0) {
                    teacherMedia.addClass('show-teacher-media');
                    content.html(tpl);
                } else {
                    teacherMedia.find('.no-media').html('<div class="no-media-icon"></div><span>老师太懒了，还没有添加照片、视频！</span>').css({'height':'340px'});
                }

            }
        });
    }

    /**
     * 初始化“老师有话说”
     */
    function initVoice(type) {
        var url = store.get('audio');
        if (!url) {
            return;
        }
        var totalTime = parseInt(store.get('audio_length'), 10) * 1000;
        var voice = container.find('.voice'+type);
        var timeText = voice.find('.time');
        var curSecond;

        var updateTime = function (time) {
            timeText.text('' + time.minutes + '\'' + time.seconds + '"');
        }

        var getTimeSpan = function (time) {
            return timeSpan($.isNumeric(time) ? time / 1000 : 0);
        }

        var handleStop = function () {
            playing = false;
            updateTime(getTimeSpan(totalTime));
            img.prop('src', imgSrc);
            curSecond = undefined;
        }

        var playing = false;
        var img = voice.find('.trigger img');
        var imgSrc = img.prop('src');

        var audioPlayer = new AudioPlayer({
            element: voice.find('.player'),
            onSwfReady: function () {

                voice
                .on('click', '.trigger', function () {
                    if (playing) {
                        audioPlayer.stop();
                        handleStop();
                    }
                    else {
                        audioPlayer.play(url);
                        img.prop('src', img.prop('gifSrc'));
                        playing = true;
                    }
                });

            },
            onPlayProgress: function (data) {
                if (!playing) { //异步检测 故需要判定下
                    return;
                }

                var curTime = data.total - data.played;

                if (curTime > totalTime) { //会出现检测出的时常大于库里的情况，所以这么处理
                    return ;
                }
                var time = getTimeSpan(curTime);

                if (curSecond === undefined || time.seconds != curSecond) {

                    curSecond = time.seconds;
                    updateTime(time);
                }
            },
            onPlayComplete: function (data) {
                handleStop();
            }
        });

        updateTime(getTimeSpan(totalTime));
    }

    /**
     * 视频自动播放
     */
    function initAutoplayVideo() {
        var url = location.href ;
        var array = url.split('video_id=');
        if (array[1] && array[1] == 'first') {
            var item = $('#teacher-media .video:eq(0)')[0];
            if (item) {
                $(item).click();
            }
        }
    }

    //上报函数
    function report() {
        var params = {
            teacher_number:store.get('teacherNum'),
            user_id:store.get('userId') || "",
            track_id: cookie.get('__track_id__'),
            comment_type:store.get('type'),
            //comment_tag:'',
            comment_tag:store.get('commentTag_name')|| "",
            comment_tag_num:store.get('commentTag_count')|| "",
            dsp:'1',
            city_id:cookie.get('CITY_ID'),
            source:'1',
            type: 'comment',
            page: store.get('page'),
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);

    }
    //页面滚动时

    function HoverTreeScroll() {
        var Obj =container.find('#show-tab-nav-info');
        if (Obj.length != 1) { return false; }

        var offsetTop = arguments[1] ? arguments[1] : 0;
        var ObjTop = Obj.offset().top - $(window).height();
        var h_one = true;

        $(window).scroll(function () {
            if ($(window).scrollTop() > ObjTop) {
                if (h_one) {
                    report();
                    h_one = false;
                }

            }
        });

    }



    //

    /**
     * 老师卡片固定
     *
     * @inner
     */

    function initTeacherCard() {

        // 置顶头部
        var card = container.find('#teacher-card');
        var prev = card.prev();
        // 45是头部导航的高度
        var top = prev.offset().top + prev.height()+ 45;
        var courseTop = teacherCourse.offset().top + teacherCourse.height();
        var nav = teacherProfile.find('.nav-box');
        //点击评价上报
        teacherProfile
        .on('click', '.comment-click', function () {
            report();
        })
        var navTop = nav.offset().top;

        var fixedCard = function () {
            card.addClass('fixed').show();
            isShowMoreCard();
        };
        var staticCard = function () {
            card.removeClass('fixed').hide();
        };
        var apply = function () {
            if (pageScrollTop() > top) {
                fixedCard();
            }
            else {
                staticCard();
            }
            // 底部约课栏
            if (pageScrollTop() > courseTop) {
                if (store.get('teacherNum') !=  329108828) {
                    teacherOrderForm.show();
                }
            } else {
                teacherOrderForm.hide();
            }
            // 头部导航
            if (pageScrollTop() > navTop) {
                nav.addClass('fixed');
            } else {
                nav.removeClass('fixed');
            }
        };

        // 初始化时先设置一下
        apply();

        // 滚动时再设置
        bindScroll($window, apply, 1);

          isShowMoreCard();
        sidebar.on('click', '.view-more', function (e) {
            var $this = $(this);
            var $prev = $this.prev();
            if ($prev.hasClass('unfold')) {
                $this.text('展开全部标签');
                $prev.removeClass('unfold');
            } else {
                $this.text('收起全部标签');
                $prev.addClass('unfold');
            }
        });
    }

    //
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

    // 检查是否重复报名班课
    function checkRepeatCourse(courseNum,url,type) {

        service
        .checkCourseRepeat(
            { courseNumber: courseNum} ,
            {
                errorHandler: {
                    '100014': function () {
                        //success("您已购买了该课程！");
                        var _html = '<div style="text-align:left;">同一节班课不能重复报名哦~<br/>如果你之前报名未完成支付，请去<a href="/order/studentOrders" style="color:#f29100;">我的订单</a>完成支付</div>';
                        alert({
                            title: '温馨提示',
                            content: _html,
                            width: 420,
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'primary',
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
            }
        )
        .done(function(response){
            if (response.code == 0) {
                location.href = url;
            }
        });
    }

    exports.init = function () {

        // 分享
        var popup = new Popup({
            element: teacherProfile.find('.social-share'),
            layer: teacherProfile.find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });

        // 获取用户登录信息
        service
        .getUserBasicInfo(null)
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data ;

                if (data.user_number) {
                    store.set('haslogin',true);
                    var favor = teacherProfile.find('#favor');
                    favor.data('haslogin', true);

                    // 如果是老师自己登录
                    if (data.user_number == store.get('teacherNum') && data.user_type == 0){
                        // 显示编辑按钮
                        teacherProfile.find('.edit').show();
                        // 隐藏对话框
                        teacherProfile.find('.chat-label').hide();
                        // 显示收藏
                        if (store.get('isFavored') && data.user_type == 2) {
                            favor.find('.icon-favor').addClass('hasfavored');
                            favor.find('span').html('已收藏');
                        }
                    }

                } else {
                    store.set('haslogin',false);
                }
            } else {
                store.set('haslogin',false);
            }
        });

        // 修复老师主页缓存 patch
        starPatch.init({type: "teacher", number: store.get('teacherNum')}, $('#favor'));

        if (store.get('trialStatus') != -1) { // 试听课，可有可无
            trialCourse.init();
        }

        course.init();
        // 异步加载教师视频和照片，目前不设限制全取出来.
        //getMediaList(1,'#media-player-box','media_player',1000,1);
        // 异步加载评价数据
        comment.init();
        // 常用教学地点
        residence.init();
        // 可授课时间
        calendar.init();

        // 照片视频模块
        media.init();
        /*var mediaInterval = setInterval(function(){
            if (teacherMedia.find('.media-box')[0]) {
                media.init();
                clearInterval(mediaInterval);
            }
        }, 500);*/
        // 老师有话说
        initVoice(1);
        initVoice(2);
        // 处理文本内容的展开收起
        toggleContent();
        // 初始化orderForm
        orderForm.init();
        // 搜索统计
        log();
        // 初始化老师卡片
        initTeacherCard();
        //触发
        HoverTreeScroll();

        // IM 留言
        // if (store.get('teacherNum') != store.get('user').number) {
        //     // 3810 机构
        //     if (store.get('org_type') == 4) {
        //         entrance.done(
        //             function (im) {
        //                 im.showTip({
        //                     userNumber: store.get('org_id'),
        //                     userType: 'institution'
        //                 });
        //             },
        //             'showTeacherTip'
        //         );
        //     } else {
        //         entrance.done(
        //             function (im) {
        //                 im.showTip({
        //                     userNumber: store.get('teacherNum'),
        //                     userType: 'teacher'
        //                 });
        //             },
        //             'showTeacherTip'
        //         );
        //     }
        // }

        // 更多经历，更多成果
        /*sidebar
        .on('click', '.more-experience, .more-success', function (e) {
            var element = $(this);
            teacherProfile.find('.list-item:eq(3)').click();
            if (element.hasClass('more-experience')) {
                $('body').scrollTop(teacherExperience.offset().top-20);
            } else {
                $('body').scrollTop(teacherSuccess.offset().top-20);
            }
        });*/

        teacherProfile
        .on('click', '.list-item', function (e) {
            return true;
            var element = $(this);
            var nav = element.data('nav');
            container.removeClass('profile-active')
                     .removeClass('comment-active')
                     .removeClass('media-active')
                     .removeClass('course-active')
                     .removeClass('main-active')
                     .removeClass('article-active')
                     .addClass(nav);
            teacherProfile.find('.list-item').removeClass('active');
            element.addClass('active');
            // 获取视频-相册异步数据
            if (nav == 'media-active') {
                store.set('mediaPage', 1);
                getMediaList(2,'#media-list-box','media_list',20,1);
            }
            if (nav == 'main-active') {
                if (!teacherMedia.find('#media-player-box').html()) {
                    getMediaList(1,'#media-player-box','media_player',1000,1);
                }
                // 把过往经历和教学成果进行替换
                if (teacherExperience[0]) {
                    teacherExperience.find('.detail').each(function(i,item){
                        var item = $(item);
                        var cut = item.data('cut');
                        var all = item.data('all');
                        if (cut != all) {
                            item.find('div').html(stringUtil.decodeHTML(cut)+'<a class="content-toggle">展开全部</a>');
                        }
                    });
                }
                if (teacherSuccess[0]) {
                    teacherSuccess.find('.detail').each(function(i,item){
                        var item = $(item);
                        var cut = item.data('cut');
                        var all = item.data('all');
                        if (cut != all) {
                            item.find('div').html(stringUtil.decodeHTML(cut)+'<a class="content-toggle">展开全部</a>');
                        }
                    });
                }
            }
            if (nav == 'profile-active') {
                // 把过往经历和教学成果进行替换
                // 把过往经历和教学成果进行替换
                if (teacherExperience[0]) {
                    teacherExperience.find('.detail').each(function(i,item){
                        var item = $(item);
                        var cut = item.data('newcut');
                        var all = item.data('all');

                        item.find('div').html(stringUtil.decodeHTML(all));

                    });
                }
                if (teacherSuccess[0]) {
                    teacherSuccess.find('.detail').each(function(i,item){
                        var item = $(item);
                        var cut = item.data('newcut');
                        var all = item.data('all');
                        item.find('div').html(stringUtil.decodeHTML(all));
                    });
                }
            }
        })



        // 添加,取消收藏老师
        .on('click' , '#favor' , function (e) {
            var element = $(this);
            var teacherid = element.data('teacherid');
            var haslogin = store.get('haslogin');
            var text = element.text();
            //登录或身份变更成功后 需要发收藏请求 并刷新当前页面

            if(text == "收藏") {

                if (haslogin) {

                    if (store.get('user').type === 0) {
                        new SwitchRoleDialog({
                            createText: '需要开通学生身份才能收藏该老师哦~现在开通？',
                            switchText: '需要切换学生身份才能收藏该老师哦~现在切换？',
                            switchTo: 'student',
                            onSuccess: function (data) {
                                if (teacherid) {
                                    service
                                    .addFavouriteTeacher(
                                        teacherid,
                                    {
                                        errorHandler:{
                                            1:function (response){
                                                confirm({
                                                    title: "温馨提示",
                                                    content: "已经收藏过了，快去我的收藏看看吧",
                                                    buttons: [
                                                        {
                                                            text: '确定',
                                                            type: 'primary',
                                                            handler: function () {
                                                                // 跳转到老师收藏页面
                                                                this.hide();
                                                                location.href = "/student_center/favourite";
                                                            }
                                                        },
                                                        {
                                                            text: '取消',
                                                            handler: function () {
                                                                this.hide();
                                                                result.reject();
                                                            }
                                                        }
                                                    ]
                                                });
                                            }
                                        }
                                    })
                                    .done(function (response) {
                                        if (response.code === 0) {
                                            success("收藏成功");
                                            setTimeout(function(){
                                                location.reload();
                                            }, 1000);
                                        }
                                    });
                                }
                            }
                        });
                    }
                    else {
                        if (teacherid) {
                            service
                            .addFavouriteTeacher(
                                teacherid,
                            {
                                errorHandler:{
                                    1:function (response){
                                        confirm({
                                            title: "温馨提示",
                                            content: "已经收藏过了，快去我的收藏看看吧",
                                            buttons: [
                                                {
                                                    text: '确定',
                                                    type: 'primary',
                                                    handler: function () {
                                                        // 跳转到老师收藏页面
                                                        this.hide();
                                                        location.href = "/student_center/favourite";
                                                    }
                                                },
                                                {
                                                    text: '取消',
                                                    handler: function () {
                                                        this.hide();
                                                        result.reject();
                                                    }
                                                }
                                            ]
                                        });
                                    }
                                }
                            })
                            .done(function (response) {
                                if (response.code === 0) {
                                    success("收藏成功");
                                    setTimeout(function(){
                                        location.reload();
                                    }, 1000);
                                }
                            });
                        }
                    }
                }
                // 未登录
                else {
                    new LoginDialog({
                        onSuccess: function () {
                            // 调用Aiax请求，完成收藏
                            service
                            .addFavouriteTeacher(
                                teacherid,
                            {
                                errorHandler:{
                                    1:function (response){
                                        confirm({
                                            title: "温馨提示",
                                            content: "已经收藏过了，快去我的收藏看看吧",
                                            buttons: [
                                                {
                                                    text: '确定',
                                                    type: 'primary',
                                                    handler: function () {
                                                        // 跳转到老师收藏页面
                                                        this.hide();
                                                        location.href = "/student_center/favourite";
                                                    }
                                                },
                                                {
                                                    text: '取消',
                                                    handler: function () {
                                                        this.hide();
                                                        result.reject();
                                                    }
                                                }
                                            ]
                                        });
                                    }
                                }
                            })
                            .done(function (response) {
                                if (response.code === 0) {
                                    success("收藏成功");
                                    setTimeout(function(){
                                        location.reload();
                                    }, 1000);
                                }
                            });
                        }
                    });
                }
            }
            else {
                if (teacherid) {

                    confirm({
                        title: "温馨提示",
                        content: "已经收藏过了，快去我的收藏看看吧",
                        buttons: [
                            {
                                text: '确定',
                                type: 'primary',
                                handler: function () {
                                    // 跳转到老师收藏页面
                                    this.hide();
                                    location.href = "/student_center/favourite";
                                }
                            },
                            {
                                text: '取消',
                                handler: function () {
                                    this.hide();
                                    result.reject();
                                }
                            }
                        ]
                    });
                }
            }
        })
        // 纠错
        .on('click', '.correct', function (e) {
            new RecoverDialog();
        })
        // 领取优惠券
        .on('mouseover', '.get-coupon', function () {
            teacherProfile.find('.coupon').show();
        })
        .on('mouseout', '.get-coupon', function (e) {
            var target = $(e.currentTarget);
            target.find('.coupon').hide();
        })
        .on('click', '.coupon-color', function (e) {
            var target = $(e.currentTarget);
            var serialNum = target.data('num');
            var haslogin = store.get('haslogin');

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
        });

        // 咨询
        teacherOrderForm
        .on('click', '#consult', function (e) {

            var target = $(e.currentTarget);

            var isOneOnOneTeacher = store.get('is_one_on_one_teacher'); //是否是一对一老师
            var isSendToteacher = true;  //留单至老师
            var channelValue = '';
            if (isOneOnOneTeacher) { //如果是一对一老师，则留单至客服, 则channelValue为'youxuan_teacher_pc'
                isSendToteacher = false;
                channelValue = 'youxuan_teacher_pc';
            }

            new leaveMessageDialog({
                title: '预约试听',
                teacher: 'teacher',
                teacherNum: store.get('teacherNum'),
                skinClass: 'leave-message-detail',
                sendToteacher: isSendToteacher,
                channel: channelValue,
                oneOnOneTeacherMobile: store.get('one_on_one_teacher_mobile')
            });
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'recommend',
                stype: '1',
                client: 'PC',
                page_type: leaveMessPageType,
                track_id: cookie.get('__track_id__'),
                _timestamp: new Date().getTime(),
                user_number: store.get('user').number,
                user_role: store.get('user').type,
                location_type: leaveMessPageType+'_1',
                tid: store.get('teacherId'),
                cid: '',
                query: '',
            };
            WAT.send(url, params);

        })
        .on('click', '.close', function (e) {
            teacherOrderForm.hide();
            return false;
        })
        .on('click', '.reserve-course', function (e) {
            // 如果是自己看自己页面点击约课弹出如下内容
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
                return ;
            }
            var url = '/pay/course';

            var params = {
                teacher_number: store.get('teacherNum')
            };

            var courseId = store.get('courseId');
            var lessonWay = store.get('lessonWay');

            if (courseId || lessonWay) {

                if (courseId) {
                    params.course_id = courseId;
                }
                if (lessonWay) {
                    params.lesson_way = lessonWay;
                }

            }

            var search = $.param(params);
            url += '?' + search;

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
                            next: url,
                            noskip: false
                        });
                    }
                });

            }
            else {
                location.href = url;
            }
        });

        var allArticle = container.find('.article-main-wrapper');
        /*
         * 点击老师主页的文章列表
         */
        allArticle
        .on('click', '.list' ,function(e) {
            $window[0].open($(this).data('url'),'_blank');
        })

        /*
         * 点击老师主页的全部文章页签
         */
        .on('click', 'a', function(e) {
            //teacherProfile.find('.list-item[data-nav="article-active"]').find('a').trigger('click');
            var damain = $(this).data('domain');
            location.href = "/" + damain + "/article";
            $window.scrollTop(200);
        })

        /*
         * 点击老师主页的X篇文章页签
         */
        .on('click', '.count', function(e) {
            //teacherProfile.find('.list-item[data-nav="article-active"]').find('a').trigger('click');
            var damain = $(this).data('domain');
            location.href = "/" + damain + "/article";
            $window.scrollTop(200);
        });
        teacherComment
        .on('click', '.more-comment', function (e) {
            var target = $(e.currentTarget);
            target.hide();
            var others = target.closest('.other-comment').find('.others_comment');
            others.show();
        });

        container
        /*
         * 获取 邀请评价的业务信息 - 进行业务判断后，进行操作
         */
        .on('click', '#invite-comment', function (e) {

            var target = $(e.currentTarget);
            var teacherId = store.get('teacherId');
            var teacherNum = store.get('teacherNum');

            var userId = store.get('user').id;
            //var userType = store.get('user').type;
            //
            if (userId == teacherId) {
                alert('不好意思，不能给自己评价哦 ~ ', '温馨提示');
                return;
            }

            service
            .getInviteCommentInfo(
                {
                    teacherId : teacherId
                }
            )
            .done(function (response) {

                if (response.code === 0) {
                    var isLogin = response.data.is_login;
                    var hasCommented = response.data.has_commented;
                    var aRole = response.data.user_role;

                    var loginUserId = response.data.login_user_id;

                    if (loginUserId == teacherId) {
                        alert('不好意思，不能给自己评价哦 ~ ', '温馨提示');
                        return;
                    }
                    //var userType = 0;

                    if (isLogin) {
                        var userType = store.get('user').type;
                        //console.log('d,userType:'+userType);
                        if (hasCommented) {
                            //alert({ title: '温馨提示', content: '对不起，你已评价过该老师！' })
                            var teacherId = store.get('teacherId')
                            var hasCommentedDialog = new HasCommentedDialog({
                                buyUrl: '/pay/course?teacher_number=' + teacherNum,
                                userType: userType
                            });
                        }
                        else {
                            var len = aRole.length;
                            if (userType == 2) {
                                location.href = '/teacher/comment/' + teacherNum;
                            }
                            else if (userType == 0) {
                                var needInvite = true;
                                for (var i = 0; i < len; i++) {
                                    if (aRole[i] === '2') {
                                        needInvite = false;
                                    }
                                }

                                if (needInvite) {
                                    var inviteDialog = new InviteDialog({
                                        userType: userType,
                                        targetRole: 2,
                                        next: '/teacher/comment/' + teacherNum,
                                        onSuccess: function () {
                                            new InviteResultDialog({userType: userType, status: 'succ'});
                                        },
                                        onError: function () {
                                            new InviteResultDialog({userType: userType, status: 'err'});
                                        }
                                    });
                                }
                                else {
                                    // 提示 目前是老师身份 是否要切换到学生身份

                                    var content = ''
                                                + '您目前是老师身份，无法评价老师，是否切换到学生身份？'
                                                 + '<div class="dialog-action">'
                                                 +     '<button class="btn btn-primary switch">立即切换</button>'
                                                 + '</div>';

                                    var dialog = new Dialog({
                                        title: '温馨提示',
                                        content: content,
                                        skinClass: 'switch-role-dialog',
                                        width: 300
                                    });

                                    var element = dialog.element;

                                    element
                                    .on('click', '.switch', function () {
                                         service
                                        .sendInviteCode({
                                            role: 2

                                        })
                                        .done(function (response) {
                                            if (response.code === 0) {
                                                location.href = '/teacher/comment/' + teacherNum;
                                            }
                                            else {
                                                alert('数据正在维护！');
                                            }

                                        });

                                    });

                                }

                            }
                            else {
                                // 错误情况，登录身份不为0或者2
                                alert('对不起，你不能再次为该老师填写邀请评价了！', '温馨提示');
                            }
                        }

                    }
                    else {
                        location.href = '/teacher/comment/' + teacherNum;
                    }
                }


            });

        });

        ShareDialog.init(container);

        tianxiaoLog.send(store.get('orgnumber'), 'teacherDetail', store.get('teacherNum'));


        service
        .getTeacherViewAjax({
            number: store.get('teacherNum')
        })
        .done(function (response) {
            if (response.code === 0) {
                var viewcount = response.data.view_count;
                teacherProfile.find('.visit-count').html('（'+viewcount+'人看过）');
            }
        });
        // 自动播放视频
        //initAutoplayVideo();
        // 访问统计
        service
        .viewTeacher(
            {
                teacherId : store.get('teacherNum')
            }
        );
    };
});