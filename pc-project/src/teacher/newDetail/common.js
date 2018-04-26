/**
 * @file 老师详情 相同模块部分
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Popup = require('cobble/helper/Popup');
    var service = require('common/service');
    var store = require('common/store');
    var starPatch = require('common/component/starPatch');
    var RecoverDialog = require('common/component/RecoverDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var ConsultDialog = require('common/component/ConsultDialog');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var AudioPlayer = require('audioPlayer');
    var timeSpan = require('common/function/timeSpan');
    var entrance = require('im/entrance');
    var SubjectSelect = require('../component/SubjectSelect');
    var store = require('common/store');
    var AllPrice = require('common/component/AllPrice');
    var cookie = require('cobble/util/cookie');


    var teacherOrderForm = $('#teacher-order-form');
    var teacherProfile = $('#teacher-profile');
    var teacherContent = $('#teacher-content');

    /**
     * 初始化“老师有话说”
     */
    function initVoice(type) {
        var url = store.get('audio');
        if (!url) {
            return;
        }
        var totalTime = parseInt(store.get('audio_length'), 10) * 1000;
        var voice = teacherProfile.find('.voice'+type);
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
     * 初始化导航和底部约课
     *
     * @inner
     */
    function initFixed() {

        //上报函数
        function report() {
            var params = {
                teacher_number:store.get('teacherNum'),
                user_id:store.get('userId') || "",
                track_id: cookie.get('__track_id__'),
                comment_type:store.get('type')||'1',
                comment_tag:store.get('commentTag_name') || "",
                comment_tag_num:store.get('commentTag_count') || "",
                dsp:'1',
                city_id:cookie.get('CITY_ID'),
                source:'2',
                type: 'comment',
                page: store.get('page')||'1',
            };
           //console.log(params);

            WAT.send('http://click.genshuixue.com/gs.gif', params);
        }


        var contentTop = teacherContent.offset().top + 540;
        var nav = teacherProfile.find('.nav-box');
        //点击评价上报
        teacherProfile
            .on('click', '.comment-click', function () {
                report();
            })
        var navTop = nav.offset().top;

        var apply = function () {

            // 底部约课栏
            if (pageScrollTop() > contentTop) {
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
        $(window).scroll(apply);

    }

    //初始化收藏的状态
    function initStar() {
        starPatch.init({type: "teacher", number: store.get('teacherNum')}, $('#favor'));
    }

    /**
     * 根据价格改变字体大小
     * @param  {[type]} price [description]
     * @return {[type]}       [description]
     */
    function changeFontSize (price) {
        var fontSize = '36px';
        var priceStyle = {};

        if (price >= 1000 && price < 10000) {
            fontSize = '31px';
            priceStyle = {'position':'relative','top':'4px'};
        } else if (price >= 10000 && price < 100000) {
            fontSize = '26px';
            priceStyle = {'position':'relative','top':'9px'};
        } else if (price >= 100000) {
            fontSize = '22px';
            priceStyle = {'position':'relative','top':'13px'};
        } else {
            fontSize = '36px';
            priceStyle = {'position':'relative','top':'0'};
        }

        var priceInfo = $('.price-info');
        priceInfo.find('strong').css({'font-size':fontSize}) ;
        priceInfo.css(priceStyle);
    }
    exports.init = function () {

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
                    if (data.user_number == store.get('teacherNum')){
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
        initStar();

        // 老师有话说
        initVoice(1);

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

        // IM 留言
        if (store.get('teacherNum') != store.get('user').number) {

            // 3810 机构
            if (store.get('org_type') == 4) {
                /*entrance.done(
                    function (im) {
                        im.showTip({
                            userNumber: store.get('org_id'),
                            userType: 'institution'
                        });
                    },
                    'showTeacherTip'
                );*/
            } else {
                entrance.done(
                    function (im) {
                        im.showTip({
                            userNumber: store.get('teacherNum'),
                            userType: 'teacher'
                        });
                    },
                    'showTeacherTip'
                );
            }

        }

        // 初始化导航和底部约课
        initFixed();

        teacherProfile
        .on('click' , '#favor' , function (e) {// 添加,取消收藏老师
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
        .on('click', '.correct', function (e) {// 纠错
            new RecoverDialog();
        });

        teacherOrderForm
        .on('click', '#consult', function (e) {// 咨询

            var target = $(e.currentTarget);
            new ConsultDialog({
                course: target.data('course')
            });
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
        })
        .on('click', '.btn-trial', function() {
            if ($('.trial-course-box').length > 0) {
                var top = $('#teacher-content').offset().top;
                $($('.course-nav li').get(0)).trigger('click');
                $(window).scrollTop(top - 45);
            } else {
                var main = $('#teacher-profile').find('[data-nav="main-active"]');
                var mainurl = main.find('a').attr('href');
                location.href = 'http://' + location.host  + mainurl + '#trial_course';
            }
        });

        // 选择教学科目或授课方式后，隐藏 '起' 字
        var startPrice = teacherOrderForm.find('.start-price');
        var defaultPrice = teacherOrderForm.find('.price').html();

        var subjectSelect = new SubjectSelect({
            element: teacherOrderForm,
            onCourseChange: function (data) {
                startPrice.hide();
                store.set('courseId', data.id);
                var lessonWay = store.get('lessonWay');
                if (!lessonWay) {
                    var element = teacherOrderForm.find('.course li.active');
                    var json = element.data('json');
                    var minPrice = Number.MAX_VALUE ;

                    for (var p in json) {
                        if (parseInt(json[p])) {
                            if (minPrice>json[p]) {
                                minPrice = parseInt(json[p]);
                            }
                        }
                    }
                    teacherOrderForm.find('.price').html(minPrice);
                    changeFontSize(minPrice);
                    startPrice.show();
                }
            },
            onWayChange: function (data) {
                startPrice.hide();
                store.set('lessonWay', data.name);
                if (!store.get('lessonWay')&&!store.get('courseId')) {
                    teacherOrderForm.find('.price').html(defaultPrice);
                    changeFontSize(defaultPrice);
                    startPrice.show();
                } else {
                    teacherOrderForm.find('.price').html(data.price);
                    changeFontSize(data.price);
                }
            }
        });

        // 全部价格
        new AllPrice({
            subjectSelect: subjectSelect,
            element: $('.all-price')
        });


        service
        .getTeacherViewAjax(
            {number: store.get('teacherNum')}
        )
        .done(function (response) {
            if (response.code === 0) {
                var viewcount = response.data.view_count;
                teacherProfile.find('.visit-count').html('（'+viewcount+'人看过）');
            }
        });
    };
});