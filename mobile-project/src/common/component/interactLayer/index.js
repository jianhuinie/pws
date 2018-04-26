/**
 * 老师主页||课程详情页互动浮层控件
 * Created by yuanye on 16/11/28.
 */

define(function(require, exports) {
    'use strict'

    var $ = require('zepto');
    var service = require('common/service');
    var cookie = require("util/cookie");
    var env = require('util/env');
    var habo = require('common/component/analysis/habo/index');
    var app = require('common/app');
    var user = require('common/user');
    var template = require("artTemplate");
    var render = template.compile(require("text!./index.tpl"));
    var lazyLoadImage = require('common/lazyLoadImage');
    var isTeacherApp = app.isTeacherApp();
    var deviceRatio;
    
    // 判断用户环境
    var isApp = app.isApp();
    var phoneEnv = env.os;
    var isIphone = phoneEnv.isIPhone;
    // 浮层主要dom
    var noClickUl; // 不可点击浮层下ul列表
    var noClick; // 不可点击浮层的整个dom
    var canClick; // 可点击浮层dom
    // 音频播放相关
    var audio;
    var isPlay;
    var hasAudio;
    var audioIcons;
    var playIcon; // 播放按钮
    var pauseIcon; // 暂停按钮
    // 可点击浮层是否显示,取老师number来判断以及用于埋点
    var teacherNumber;
    var courseNumber;
    // 学生id,用于埋点
    var studentNumber;
    // 可点击浮层可见flag
    var isHideClick;
    // 可点击浮层类型
    var subType;
    // 可点击浮层点击跳转相关DOM
    var interA;
    // 用于绑定点击事件的DOM
    var audioDOM;
    var interDiv;

    // 存放audioUrl的对象
    var keys = {};
    // 语音的状态值
    var audioStatus = 0;
    var audioLoaded = 0;

    // 音频播放／暂停函数
    function audioInter() {
        var videoUrl = audioDOM.data('url');
        if (!videoUrl) {
            return;
        }

        if (!keys[videoUrl]) {
            var audioDom = $('<audio preload="none" volume="1.0" src="' + videoUrl + '"></audio>')[0];
            keys[videoUrl] = audioDom;
        }

        var audio = keys[videoUrl];

        setTimeout(function () {
            // 播放状态
            if (audioStatus) {
                audio.pause();
                audioStatus = 0;
                playIcon.removeClass('hide');
                pauseIcon.addClass('hide');
            } else {
                // 下载中
                if (!audioLoaded) {
                    // 没有dom可以处理下载中，暂时先忽略
                }

                audio.play();

                // 埋点
                sendPoint({type: 'm_teacher_voice'});
                audioStatus = 1;
                playIcon.addClass('hide');
                pauseIcon.removeClass('hide');
            }

            audio
                .addEventListener('ended', function () {
                    audioStatus = 0;
                    playIcon.removeClass('hide');
                    pauseIcon.addClass('hide');
                });

             audio
                .addEventListener('loadeddata', function () {
                    audioLoaded = 1;
                    playIcon.addClass('hide');
                    pauseIcon.removeClass('hide');
                });

            $(window).on('beforeunloaded', function () {
                audio.pause();
                audioStatus = 0;
            });
        }, 300);
        
    }

    // 发送埋点信息
    function sendPoint(arg) {
        habo.send(arg);
    }

    // 跳转
    function goURL(url) {
        if (isApp) {
            app.openNewWindow(url);
        }
        else {
            location.href = url;
        }
    }

    // 点击浮层发送对应类型的埋点信息/判断登录
    function interClick() {
        var videoNumber = canClick.data('vnumber');
        // 课程number,用于埋点
        var courseNumber = canClick.data('coursenumber') || -1;
        var url = interA.data('href');
        var pointType = interA.data('point');
        var pointParam;
        subType == 6 ? pointParam = {type: pointType}
                     : pointParam = {
                                        type: pointType,
                                        studentId: studentNumber,
                                        teacherId: teacherNumber,
                                        courseNumber: courseNumber
                                    };

        sendPoint(pointParam);
        if (subType == 5 && !user.isStudentLogin()) {
            user.loginStudent(function () {
                goURL(url);
            });
        }
        else if (subType == 2 && videoNumber) {
            if(isApp) {
                var param = {};
                param['number'] = videoNumber + '';
                param['index'] = '';
                app.send('toVideoCourseDetail', param);
            } else {
                location.href = url;
            }
        } else {
            goURL(url);
        }
    }

    // 不可点击浮层逻辑
    function unclickable() {
        // 如果是在APP里,修改top值
        if (isApp) {
            noClickUl.parent().css('top', 5 * deviceRatio + 'px');
        }
        noClick.show();
        noClickUl.removeClass('hide');
        // 根据屏幕宽度修改弹层最大宽度
        if (screen.availWidth < 375) {
            noClickUl.children().css('max-width', 300 * deviceRatio + 'px');
        }
        if (isIphone) {
            // 在iPhone上li之间间距会稍小，因此增加后两个li的间距
            noClickUl.children(':not(:first-child)').css('margin-top', 39 * deviceRatio + 'px');
        }
        noClickUl.addClass('animation');
        setTimeout(function () {
            noClick.hide();
        }, 14000);
    }

    // 可点击浮层逻辑
    function clickable() {
        var pointArr = [
            'm_teacher_alllive',
            'm_teacher_allvideocourse',
            'm_teacher_allforetell',
            'm_teacher_allvoice',
            'm_teacher_alllive',
            'CoursePage_WeixinActivity_show'
        ];
        // 音频播放相关
        isPlay = false;
        hasAudio = false;
        audioIcons = $('.can-click .inter-div .icon');
        playIcon = $(audioIcons[0]); // 播放按钮
        pauseIcon = $(audioIcons[1]); // 暂停按钮
        // 将播放图标显示出来
        if (playIcon.length) {
            playIcon.toggleClass('hide');
        }
        canClick.removeClass('hide');
        // 显示可点击浮层,发送埋点信息
        if (subType == 6) {
            sendPoint({type: pointArr[subType - 1]});
        }
        else {
            sendPoint({type: 'm_teacher_allclose'});
            sendPoint({
                type: pointArr[subType - 1],
                studentId: studentNumber,
                teacherId: teacherNumber
            });
        }

        if (subType == 4) {
            // 点击播放音频
            audioDOM.on('click', audioInter);
            interDiv.on('click', audioInter);
        }
        else {
            interA.on('click', interClick);
            interDiv.on('click', interClick);
        }
        clickAnimate();
        clickClose();
    }

    // 可点击浮层弹层动画
    function clickAnimate() {
        // 可点击浮层弹出层
        var interInfo = $('.can-click .inter-info');
        // 弹层动画,动态获取弹层宽度
        var padd = parseInt(interInfo.css('padding-left'), 10)
                 + parseInt(interInfo.css('padding-right'), 10);
        var font = parseInt(interInfo.css('font-size'), 10);
        var strLength = interInfo.find('.inter-text').text().length;
        var width = (font * strLength + padd + 5 * deviceRatio) + 'px';

        if (screen.availWidth < 375) {
            interInfo.css('max-width', 270 * deviceRatio + 'px');
        }

        var windowWidth = $(window).width();
        var widthRate = windowWidth / 750;
        interInfo.css({
            'width': width,
            'opacity': '0.85',
            'margin-left': 100 * widthRate + 'px'
        });
    }

    // 可点击浮层关闭按钮逻辑
    function clickClose() {
        // 绑定关闭按钮事件DOM
        var close = canClick.find('.close');
        // 绑定关闭按钮事件
        close.on('click', function () {
            canClick.addClass('hide');
            // 如果音频正在播放
            if (subType == 4 && isPlay && hasAudio) {
                audio.pause();
                audio = null;
                hasAudio = false;
            }
            else if (subType == 6) {
                sendPoint({type: 'CoursePage_WeixinActivity_close'});
            }
            else {
                // 保存cookie让该用户24小时内不再显示该可点击浮层
                cookie.set('hideClickInter' + teacherNumber, true, {expires: 24});
                // 发送埋点信息
                sendPoint({type: 'm_teacher_close'});
            }
        });
    }

    /**
     * 初始化互动浮层
     * @param  {Number} number [如果是老师主页中调用,是老师Number; 如果是课程详情页则是课程Number]
     * @param  {type}   type   [1为老师主页(缺省值为1); 2为课程详情页]
     * @param  {number}   courseType   [1: '一对一',2: '线下、直播班课',3: '视频课']
     */
    exports.init = function (number, type, courseType) {
        var ratio = $('#viewport').attr('ratio');
        deviceRatio = 1;
        if (ratio < 1) {
            deviceRatio = window.devicePixelRatio;
        }
        var parentDOM = $('body');
        type = +type || 1;
        if (type === 1) {
            // 如果是老师在后台预览自己主页时不能看到互动浮层
            if (isTeacherApp) {
                return;
            }
            teacherNumber = number ? number : page_data.teacher_number;
            studentNumber = user.isStudentLogin() && user.info.number || -1;
            service.post('/new-teacher/interactiveAjax', {teacher_number: teacherNumber},
                function (res) {
                    if (res.code == 0 && res.data) {
                        // 将模板添加进DOM
                        var html = render({
                            data: res.data,
                            teacherNumber: teacherNumber
                        });
                        parentDOM.append(html);
                        noClick = $('.no-click');
                        noClickUl = noClick.find('ul'); // 不可点击浮层DOM容器下的ul列表
                        canClick = $('.can-click'); // 可点击浮层dom
                        noClick.hide();
                        // subType: 1.免费试听课正在直播, 2.免费视频课, 
                        // 3.今天要开的免费直播课, 4.语音, 5.付费试听课正在直播
                        // 6.课程详情页邀请卡浮层
                        subType = canClick.data('subtype');
                        // 取cookie,若取到则不可见
                        isHideClick = cookie.get('hideClickInter' + teacherNumber);
                        // 可点击浮层
                        if (canClick.length && !isHideClick) {
                            // 用于绑定点击事件的DOM
                            audioDOM = canClick.find('.inter-audio');
                            interDiv = canClick.find('.inter-div');
                            interA = canClick.find('.inter-info-a');

                            clickable();
                        }
                        // 不可点击浮层
                        else if (noClickUl.length) {
                            // hurry: 无广告栏，不需要加top
                            if (isApp) {
                                noClick.css('top', 0);
                            }
                            unclickable();
                        }
                        lazyLoadImage.init();
                    }
                }
            );

        }
        else if (type === 2 && env.thirdapp.isWeixin) {
            courseNumber = number ? number : page_data.course_info.number;
            service.post(
                '/new-course/interactiveAjax',
                {
                    course_number: courseNumber,
                    course_type: courseType
                },
                function (res) {
                    if (res.code == 0 && res.data) {
                        // 将模板添加进DOM
                        var html = render({
                            data: res.data
                        });
                        parentDOM.append(html);
                        canClick = $('.can-click'); // 可点击浮层dom
                        // subType: 1.免费试听课正在直播, 2.免费视频课, 
                        // 3.今天要开的免费直播课, 4.语音, 5.付费试听课正在直播
                        // 6.课程详情页邀请卡浮层
                        subType = canClick.data('subtype');
                        // 可点击浮层
                        if (canClick.length) {
                            // 用于绑定点击事件的DOM
                            audioDOM = canClick.find('.inter-audio');
                            interDiv = canClick.find('.inter-div');
                            interA = canClick.find('.inter-info-a');

                            clickable();
                        }
                        lazyLoadImage.init();
                    }
                }
            );
        }
    };
});
