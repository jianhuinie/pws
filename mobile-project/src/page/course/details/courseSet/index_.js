/**
 * Created by chenmo on 16/2/17.
 */
define(function (require) {
    'use strict';
    var $ = require("zepto");
    var slideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var lazyLoadImage = require('common/lazyLoadImage');
    var util_function = require('util/function');
    var app = require('common/app');
    var env = require('util/env');
    var user = require('common/user');
    var iScroll = require('iscroll');
    var service = require('common/service');
    var ui = require("common/ui");
    var qrcode = require("common/qrcode");
    var backTopButton = require('common/backTopButton');
    var setShare = require('common/share/initialize');
    var doShare = require('common/share/doShare');
    var enterClassRoom = require('common/enterClassRoom');
    var countDown = require('common/countDown/countDown');
    var cityMgr = require('common/city_mgr');
    var navBar = require('common/navBar');
    var math = require('util/math');
    var fullPageDialog = require('common/ui/FullPageDialog/FullPageDialog');
    var appoint = require('common/appoint/appoint');
    var appDownload = require('common/app_download');
    var bindCourseClick = require('common/bindCourseClick');
    var observer = require('common/mvc/observer');

    var valueAddedServices = require('../component/valueAddedServices/valueAddedServices');
    var chooseCourse = require('../component/chooseCourse/index');
    var submit = require('../component/courseBottom/purchase');
    var classDetail = require('page/_common/top/classDetail');
    var navPanel = require('common/navPanel');

    var scriptData;
    var isApp;
    var isStudentApp;
    var appVersion;
    var isWeixin;
    var userInfo;
    var value;
    var heightArr = [];

    var container = $('#main');
    var bottom = container.find('.bottom');
    var container_CD = $('.countdown');

    /**
     * 初始化轮播数据
     * @param {Array} data 轮播数据
     */
    function initSildeImage(data) {
        var bullets = $('.slide-position');
        bullets.eq(0).addClass('on');
        var banner = $('.top-sliders');
        new slideImageControl(banner[0], {
            auto: 3000,
            continuous: true,
            callback: function (pos) {
                var cDom = bullets.eq(pos);
                cDom.addClass('on').siblings().removeClass('on');
            }
        });

    }

    /**
     * 计算距离
     */
    function countDistance() {

        cityMgr.geoLocation(function (lat, lng) {
            var distance;
            var currentParam = {
                lat: lat,
                lng: lng
            };
            var courseParam = {
                lat: scriptData.lat,
                lng: scriptData.lng
            };

            distance = math.computeDistance(currentParam, courseParam, '');
            distance = Math.round(distance / 1000, 5);
            if (courseParam.lat != 0 && courseParam.lng != 0 && distance > 0) {
                container.find('.address .text').text(distance + 'km');
                container.find('.line2 .distance').text(distance + 'km');
            }
        }, function () {
        }, false, true);
    }

    /**
     * 图文详情
     */
    function imgTextAction() {
        var allBtn = $('.course-info .all-info');
        // alert(allBtn);
        var imgText = $('.img-text').find('.img-intro');
        var height = 0;

        // 寻找图片，并计算图片的高度
        var imgs = imgText.find('img');
        //alert(imgs.length);
        if (imgs.length > 0) {
            $.each(imgs, function () {
                $(this).load(function () {
                    height = imgText.height();
                   // alert(height);
                    if (height < 460) {
                        $('.img-text').css('margin-bottom', 0);
                    } else {
                        $('.img-text').css('margin-bottom', 60);

                    }
                });
            });

        } else {
            height = imgText.height();
            if (height < 460) {
                $('.img-text').css('margin-bottom', 0);
            }
        }

        allBtn.on('click', function () {
            $('.img-text').css('height', 'auto');
            $('.img-text-content .wrap').css('max-height', 'none');
            $('.img-text-content .clip').css('max-height', 'none').css('margin-bottom', '0');

            allBtn.hide();

        });


    }

    // app中显示分享图标，隐藏m站二维码
    var shareShow = function () {
        if (isApp) {
            if (isStudentApp && appVersion >= '3.0.2') {
                $('.app-qrCode').show();
                $('.m-qrcode-share').hide();
            }
            else {
                $('.m-qrcode-share').show();
                $('.app-qrCode').hide();
            }
        }
        else {
            $('.m-qrcode-share').show();
            $('.app-qrCode').hide();
        }
    };

    /**
     * 二维码弹框
     */
    function qrCodeAction() {
        var qrCode = container.find('.share');
        var element = $('.qrcode-container');
        var close = element.find('.cancel');
        var init = false; //检测二维码是否已经初始化
        qrCode.on('click', '.m-qrcode,.qrcode', function () {
            if (!init) {
                init = true;
                service.post('/short_url/gen', {
                    url: scriptData.qrcodeUrl
                }, function (res) {
                    if (res.code == 0) {
                        qrcode({
                            text: res.data.short_url,
                            width: 300,
                            height: 300,
                            element: $('#qrcode')
                        });
                    } else {
                        init = false;
                    }
                });
            }
            element.show();
        });
        //关闭二维码
        close.on('click', function () {
            element.hide();
        });
    }

    /**
     * 播放语音
     */
    function audioPlay() {


        var active_voice_img = scriptData.active_voice_img;
        var voice_img = scriptData.voice_img;

        /* 存储音频列表 */
        var autoArr = {};
        /* 当前正在播放的音频 */
        var $curObj = null;


        /* 设置某音频播放状态为暂停 paseObj 为autoAarr对象 */
        function pauseMe(pauseObj) {
            pauseObj.audio[0].pause();
            pauseObj.pause = false;
            pauseObj.pDom.removeClass('active').find('.static').attr('src', voice_img);
        }

        /* 页面刷新前，设置所有音频暂停 */
        $(window).on('beforeunload', function () {
            if ($curObj) {
                pauseMe($curObj);
            }
        });
        var lastClickTime = 0;

        $('.audio-icon').on('click', function () {
            if (Date.now() - lastClickTime < 500) {
                /* 防止重复点击 */
                return;
            }
            lastClickTime = Date.now();
            var me = $(this);
            var url = me.data('url');
            var length = me.data('len');
            if (!autoArr[url]) {
                /* 将当前音频添加到音频对象中并初始化状态 */
                autoArr[url] = {
                    audio: $('<audio data-len="' + length + '" preload="none" volume="1.0" src="' + url + '"></audio>'),
                    /* 暂停状态 */
                    pause: false,
                    /* 图标按钮元素 */
                    pDom: me
                };
            }
            $curObj = autoArr[url];

            /* 暂停所有其他音频 */
            for (var i in autoArr) {
                if (autoArr.hasOwnProperty(i) && i != url) {
                    pauseMe(autoArr[i]);
                }
            }
            /* 根据当前播放状态（暂停中|播放中），转换暂停和播放状态 */
            if (!$curObj.pause) {
                $curObj.pause = true;


                var audio = $curObj.audio[0];
                audio.play();

                /* 如果该视频第一次播放，则绑定相应函数 */
                if (!$curObj.audioLoaded) {
                    audio.addEventListener('ended', function () {
                        pauseMe($curObj);
                    });
                    audio.addEventListener('loadeddata', function () {
                        $curObj.audioLoaded = 1;
                        me.addClass('active').find('.static').attr('src', active_voice_img);

                    });
                    audio.addEventListener("timeupdate", function () {
                        var audioLen = $(this).data('len');
                        var overPlus;
                        overPlus = (audioLen - this.currentTime);
                        var origin_min = Math.floor(audioLen / 60);
                        var origin_sec = Math.floor(audioLen % 60);
                        if (overPlus < 0) {

                            me.find('.audio-long .minute').text('0');
                            me.find('.audio-long .second').text('0');


                            //倒计时到0后时间复原
                            setTimeout(function () {
                                me.find('.audio-long .minute').text(origin_min);
                                me.find('.audio-long .second').text(origin_sec);

                            }, 1000);
                        }
                        else {
                            var min = Math.floor(overPlus / 60);
                            var sec = Math.ceil(overPlus % 60);

                            me.find('.audio-long .minute').text(min);
                            me.find('.audio-long .second').text(sec);
                        }

                    });
                } else {
                    me.addClass('active').find('.static').attr('src', active_voice_img);
                }

            } else {
                pauseMe($curObj);
                return false;
            }
        });
    }

    var bottomButton = function () {
        if (!isApp) {
            var bottomConsult = bottom.find('.consult');
            if (!bottomConsult.data('tel')) {
                bottomConsult.closest('.bottom-item').addClass('display-none');

            } else {
                bottomConsult.closest('.bottom-item').removeClass('display-none');
            }

            if (isWeixin) {
                bottom.find('.bottom-share').closest('.bottom-item').removeClass('display-none');
                bottom.find('.consult').addClass('padding-width');
            } else {
                bottom.find('.bottom-share').closest('.bottom-item').addClass('display-none');
                bottom.find('.consult').removeClass('padding-width');
            }

            bottom
                .on('click', '.bottom-share', function () {
                    $('.share-mask').show();
                    $('[name="control_top"]').css('z-index', '5');
                });
            $('.share-mask').click(function () {
                $(this).hide();
            })

        } else {
            bottom.find('.bottom-share').closest('.bottom-item').addClass('display-none');
            bottom.find('.bottom-favor').show();
        }

    };
    var bottomResize = function () {
        if (scriptData.is_trial_class) {
            //// 是否存在预约试听的按钮
            var btnAppoint = bottom.find('.tryListen');
            if (isApp) {
                if (btnAppoint && scriptData.page_model != "green") {
                    bottom.find('.bottom-share').closest('.bottom-item').addClass('small-width');
                    bottom.find('.bottom-favor').addClass('small-width');
                    bottom.find('.consult').closest('.bottom-item').addClass('small-width');
                    bottom.find('.btn-appoint').closest('.bottom-item').addClass('large-width');
                    bottom.find('.btn-appoint-liudan').closest('.bottom-item').addClass('large-width');
                    bottom.find('.sign-up').closest('.bottom-item').addClass('large-width');
                }

            } else {
                if (btnAppoint && isWeixin && bottom.find('.consult').data('tel')) {
                    bottom.find('.bottom-share').closest('.bottom-item').addClass('small-width');
                    // bottom.find('.favor').closest('.bottom-item').attr('style', 'border-right: 1px solid #f2f4f5');
                    bottom.find('.consult').closest('.bottom-item').addClass('small-width');
                    bottom.find('.btn-appoint').closest('.bottom-item').addClass('large-width');
                    bottom.find('.btn-appoint-liudan').closest('.bottom-item').addClass('large-width');
                    bottom.find('.sign-up').closest('.bottom-item').addClass('large-width');
                }
            }

        }

        bottom.removeClass('display-none');
    };

    /**
     * 老师和机构app隐藏底栏
     */
    function bottomHide() {
        var isTeacherApp = app.isTeacherApp();
        var isOrgApp = app.isOrgApp();
        if (isTeacherApp || isOrgApp || user.isTeacherLogin()) {
            bottom.hide();
        }

    }

    /**
     * 课程安排弹出逻辑
     * @type {Object}
     */
    var coursePlan = {

        init: function (element) {
            var me = this;

            me.element = element;

            me.dialog = $('#plan-dialog');

            element.on(
                'click',
                function () {

                    me.showDialog();
                }
            );

            me.dialog.on(
                'click',
                '.close',
                function () {
                    me.hideDialog();
                }
            );
        },

        showDialog: function () {
            var me = this;
            var bodyElement = $('body');

            me.dialog.show();
            bodyElement.find('.div-mask').addClass('masked');
            bodyElement.addClass('body-hidden');
            new iScroll('.title-content', {
                mouseWheel: true,
                tap: true,
                click: true
            });
            $('#plan-dialog')[0].addEventListener("touchmove", function (e) {
                e.preventDefault();
                return false;
            }, false);

            $(".div-mask")[0].addEventListener("touchmove", function (e) {
                e.preventDefault();
                return false;
            }, false);

        },

        hideDialog: function () {
            var me = this;
            var bodyElement = $('body');

            me.dialog.hide();

            bodyElement.find('.div-mask').removeClass('masked');
            bodyElement.removeClass('body-hidden');
        }
    };

    /**
     * 下载
     */
    function download() {
        var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        var url = appDownload({
            type: 'student'
        });
        $('.download,.app-download').on('click', function () {

            if (isWeixin) {
                location.href = url;
            } else {
                location.href = 'bjhlstudent://o.c';
                setTimeout(function () {
                    location.href = url;
                }, 1000);
            }
        });
    }


    /**
     * 收藏
     */
    function favorAction() {
        var favorBtn = bottom.find('.favor');
        favorBtn.on('click', function () {
            var me = $(this);
            var favor = me.find('img');
            var favorText = me.find('span');
            var favorImg = scriptData.favor_img;
            var unfavor = scriptData.unfavor;
            var model = scriptData.page_model;

            service.post('/collection/addFav', {
                number: scriptData.teacher_number,
                type: 'class_course',
                value: value
            }, function (res) {
                if (res.code == 0) {
                    if (value == 0) {
                        value = 1;
                        ui.remind("取消收藏成功");
                        //更改页面样式
                        favor.attr('src', unfavor);
                        favorText.text('收藏').removeClass(model);
                    } else {
                        value = 0;
                        ui.remind('收藏成功');
                        //更改页面样式
                        favor.attr('src', favorImg);
                        favorText.text('已收藏').addClass(model);
                    }
                } else if (res.code == 401 || res.code == 200002) {
                    user.loginStudent();
                } else {
                    ui.remind(res.msg);
                }
            });
        });
    }

    /**
     * 咨询
     */
    function consultAction() {
        var param = getImData();
        var consultBtn = $('.consult');
        var chatBtn = container.find('.chat');

        bindCourseClick.initChat(chatBtn, param);
        bindCourseClick.initChat(consultBtn, param);
        if (consultBtn.data('tel')) {

            bindCourseClick.initChat(consultBtn, param);
        } else {
            if (!isApp) {
                consultBtn.click(function () {
                    threeWayCall($(this));
                });
            }
        }
    }

    /**
     * 三方通话ajax
     * @param container
     */
    function threeWayCall(container) {
        var targetData = container.data();
        var courseNum = targetData.course_num;
        var orgNum = targetData.org_num;
        var spread_id = targetData.spread_id;
        service.post('/bell_system/getCallUrl', {
            number: orgNum,
            user_type: 6,
            course_num: courseNum,
            type: 'class_trial',
            spread_id: spread_id || ''
        }, function (response) {
            var resCode = response.code;
            if (resCode == 0 && response.data.call_url) {
                callPage(response.data.call_url);
            } else if (resCode == 401 || resCode == 200002) {

                user.loginStudent(function () {
                    $('.consult').click();
                });
            }
        });
    }

    /**
     * 三方通话界面
     * @param url 打电话url
     */
    function callPage(url) {
        var dialog = new fullPageDialog({
            'content': '<iframe width="100%" height="100%" src="' + url + '"></iframe>',
            'animateType': 2,
            'position': 'fixed'
        });
        dialog.show();
        $('.download-show #download').hide(); //隐藏顶部下载banner
        var listener = observer.addListener(dialog, 'display_changed', function () {
            var display = this.get('display');
            if (!display) {
                observer.removeListener(listener);
                listener = null;
                dialog.destroy();
                dialog = null;
                $('.download-show #download').show();
            }
        });
    }

    function getImData() {
        var param;
        var imFlag = true;
        var arrayIm = JSON.parse(scriptData.im_data); // 如果im_data 不为空，则 arrayIm为对象，否则为数组

        if (arrayIm != null) {
            imFlag = arrayIm instanceof Array;
        }

        if (!imFlag) {
            param = {
                "c_id": arrayIm.c_id,
                "c_role": arrayIm.c_role,
                "group_id": arrayIm.group_id
            };
        }
        return param;
    }

    function redirect(href) {
        if (isApp) {
            if (href.indexOf('http') === -1) {
                href = location.origin + href;
            }
            app.openNewWindow(href);
        } else {
            location.href = href;
        }
    }

    /**
     * 预览版显示蒙版
     */
    function previewMask() {
        var isSelf = false;
        var teacherInfo = scriptData.teacherInfo;

        for (var i = 0, max = teacherInfo.length; i < max; i++) {
            if (userInfo && teacherInfo[i].number == userInfo.number) {
                isSelf = true;
                break;
            }
        }
        if (isApp &&
            app.isTeacherApp() &&
            isSelf &&
            scriptData.isPreview) {
            $('.page-mask').show();
        }
        if (isApp && app.isTeacherApp()) {
            $('.teacher-ul').find('li.teacher-item').each(function (index, item) {

                if (userInfo && $(item).find('.chat').data('num') == userInfo.number) {
                    $(item).find('.chat').hide();
                }
            });
        }
    }

    return function (page_data) {
        $('.nav-button').tap(function () {
            // require(['common/ui/NavPanel/NavPanel'], function (NavPanel) {
                navPanel.show();
            // });
        });
        scriptData = page_data;
        //初始化value
        if (scriptData.favorStatus) {
            value = 0;
        } else {
            value = 1;
        }
        lazyLoadImage.init();
        //backTopButton.init();
        isApp = app.isApp();
        isStudentApp = app.isStudentApp();
        appVersion = app.appVersion();
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;

        valueAddedServices();
        chooseCourse();

        userInfo = user.getUserInfo();
        // console.log(userInfo);
        shareShow();
        bottomButton();
        bottomResize();
        bottomHide();
        initSildeImage(scriptData.photos);
        imgTextAction();
        coursePlan.init($('.all-plan'));
        qrCodeAction();
        audioPlay();
        // previewMask();
        countDistance();
        download();
        favorAction();
        consultAction();

        submit.jumpToChoicePosition();

        var hostStr = window.location.hostname;
        var host = hostStr.split('.');
        var sHost = host[0];
        var isKaoyan = /kaoyan/g;

        // 是否是 U 盟
        var isUmeng = (/um_flow_type=gzh/.exec(location.href) || $('.can-app-download-wrapper').attr('data-can-app-download') === '0');

        navBar.init();

        if(!isApp && !isUmeng) {
            classDetail({
                url: location.href
            });
        }

        //分享
        if (scriptData.is_valid) {
            setShare(JSON.parse(scriptData.share_info));
        }
        //显示限时优惠倒计时
        var countDownList = scriptData.countDownList;

        if (countDownList > 0) {
            var startTime = scriptData.start_time;
            var endTime = scriptData.end_time;

            countDown.init(container_CD, {
                start: startTime,
                end: endTime
            })

        }
        //app中朋友圈分享
        $('.li-friends').on('click', function () {
            if (isApp && appVersion >= '3.0.2') {
                doShare('share_pyq', JSON.parse(scriptData.share_info));
            }
        });
        //app中微信分享
        $('.li-weixin').on('click', function () {
            if (isApp && appVersion >= '3.0.2') {
                doShare('share_weixin', JSON.parse(scriptData.share_info));
            }
        });
        //直播须知
        if (isApp) {
            $('.app-rule').show();
            $('.m-rule').hide();
        } else {
            $('.app-rule').hide();
            $('.m-rule').show();
        }
        //课程分销
        $('.immediate-share').click(function () {
            ui.remind('black', '请点击右上角分享给好友');
        });
        //预约试听留单,支持个体老师
        $('.btn-appoint-liudan').on('click', function () {
            var url = location.origin + $(this).data('href');
            if (isApp) {
                app.openNewWindow(url);
            } else {
                location.href = url;
            }
        });
        //预约试听弹层留电话,支持机构预约试听的班课
        $('.btn-appoint-advisory').on('click', function () {
            var url = window.location.href;
            var courseType;
            if (scriptData.course_type == 2) {
                courseType = "online"
            } else {
                courseType = "offline"
            }
            var param = {};
            param['courseType'] = courseType;
            param['title'] = scriptData.class_name;
            param['objectId'] = scriptData.classId;
            param['objectType'] = 'cdb.teacher_class_course';
            param['detail_url'] = url;
            param['color'] = scriptData.m;

            appoint.appoint(param);
        });

        // 点击进入教室
        $('#btn-live').click(function (e) {
            var me = $(this);
            e.preventDefault();
            //如果是老师身份
            if (userInfo && userInfo.type == 0) {
                ui.confirm({
                    title: '温馨提示',
                    content: '请您切换成学生身份进入教室',
                    button_ok: '立即登录'
                }).done(function () {
                    location.href = "/static/login?next=" + encodeURIComponent(window.location.href);
                });
                return false;
            } else {
                me.attr('disabled', 'disabled');
                setTimeout(function () {
                    me.removeAttr('disabled');
                }, 10000);
                enterClassRoom({
                    spread_id: me.data('spread_id'),
                    class_course_number: me.data('course-number'),
                    mobile: me.data('ismobile')
                });
            }

        });
        // 点击已报名 进入订单详情页
        $("#btn-has_buy").click(function () {
            var url = $(this).data('url');
            if (isApp) {
                app.openNewWindow(url);
            } else {
                location.href = url;
            }

        });
        // 点击结束啦 进入搜索结果页面
        $("#btn-finish").click(function () {
            var url = location.origin + '/sc/-.html';
            if (isApp) {
                return false;
            } else {
                location.href = url;
            }

        });
        //设置老师列表高度
        if (scriptData.teacherCount > 1) {
            var teacherLi = $('.teacher-item');

            teacherLi.each(function (index, item) {
                var height = $(item).height();
                heightArr.push(height);
            });
            var maxHeight = Math.max.apply(null, heightArr);
            teacherLi.height(maxHeight);

        }
        if ($('.scroll-container').length != 0) {
            new iScroll('.scroll-container', {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,
                eventPassthrough: true,
                snapSpeed: 400,
                keyBindings: true,
                click: true
            });
        }
        //触发横向滚动时加载老师头像
        var timer;//计时器
        $('.teacher-ul').on('scroll', function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                lazyLoadImage.init();
            }, 1000);
        });


    }
});
