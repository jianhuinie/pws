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

    exports.init = function () {
        var query = urlUtil.parseQuery(location.search);
        if (query.action === 'shenhe') {
            container.find('.mask').hide();
        }
        var courseNum = store.get('courseNum');
        var courseType = store.get('courseType');
        var now = 0;

         tianxiaoLog.send(
            store.get('orgNumber'),
            ((+courseType === 4) ? 'microCourse': 'classCourse'),
             courseNum
         );

        // 隐藏
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
        .on('click', '.audio-box', function (e) { // 什么鬼？
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
        .on('click', '.video-box', function (e) { // 什么鬼？
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
        .on('click', '.viewPlan', function (e) {
            var target = $(e.currentTarget);
            var element = $(target.data('link'));
            var top = element.offset().top;
            window.scrollTo(0,top - 68);
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