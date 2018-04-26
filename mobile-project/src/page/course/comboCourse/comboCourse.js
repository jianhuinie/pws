/**
 * Created by hanzh on 16/3/01.
 */
define(function(require) {
    'use strict';
    var $ = require("zepto");
    var slideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var lazyLoadImage = require('common/lazyLoadImage');
    var util_function = require('util/function');
    var app = require('common/app');
    var env = require('util/env');
    var user = require('common/user');
    var service = require('common/service');
    var ui = require("common/ui");
    var qrcode = require("common/qrcode");
    var backTopButton = require('common/backTopButton');
    var setShare = require('common/share/initialize');
    var doShare = require('common/share/doShare');
    var enterClassRoom = require('common/enterClassRoom');
    var countDown = require('common/countDown/countDown');
    var cityMgr = require('common/city_mgr');
    var math = require('util/math');
    var fullPageDialog = require('common/ui/FullPageDialog/FullPageDialog');
    var appoint = require('common/appoint/appoint');
    var appDownload = require('common/app_download');
    var bindCourseClick = require('common/bindCourseClick');
    var observer = require('common/mvc/observer');
    var iScroll = require('iscroll');
    var page_layout = require('common/page_layout');
    var openAppWindow = require('common/openAppWindow');
    var env = require('util/env');
    var transPxFunc = require('common/function/transPxByRatio');

    var scriptData;
    var isApp;
    var isStudentApp;
    var appVersion;
    var isWeixin;
    var isJinyou;
    var userInfo;
    var value;
    var heightArr = [];

    var container = $('#main');
    var bottom = container.find('.bottom');

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
            callback: function(pos) {
                var cDom = bullets.eq(pos);
                cDom.addClass('on').siblings().removeClass('on');
            }
        });

    }

    /**
     * 计算距离
     */
    function countDistance() {

        cityMgr.geoLocation(function(lat, lng) {
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
        }, function() {}, false, true);
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
            $.each(imgs, function() {
                $(this).load(function() {
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

        function expendImgText() {
            $('.img-text').css('height', 'auto');
            $('.img-text-content .wrap').css('max-height', 'none');
            $('.img-text-content .clip').css('max-height', 'none').css('margin-bottom', '0');

            allBtn.hide();
        }

        allBtn.on('click', function() {
            expendImgText();
        });

        /* 16-0607 PM钱丽，图文详情默认展开。 */
        expendImgText();


    }

    // app中显示分享图标，隐藏m站二维码
    function shareShow() {
        if (isApp) {
            if (isStudentApp && appVersion >= '3.0.2') {
                $('.app-qrCode').show();
                $('.m-qrcode-share').hide();
            } else {
                $('.m-qrcode-share').show();
                $('.app-qrCode').hide();
            }
        } else {
            $('.m-qrcode-share').show();
            $('.app-qrCode').hide();
        }
    }

    /**
     * 二维码弹框
     */
    function qrCodeAction() {
        var qrCode = container.find('.share');
        var element = $('.qrcode-container');
        var close = element.find('.cancel');
        var init = false; //检测二维码是否已经初始化
        qrCode.on('click', '.m-qrcode,.qrcode', function() {
            if (!init) {
                init = true;
                service.post('/short_url/gen', {
                    url: scriptData.qrcodeUrl
                }, function(res) {
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
        close.on('click', function() {
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
        $(window).on('beforeunload', function() {
            if ($curObj) {
                pauseMe($curObj);
            }
        });
        var lastClickTime = 0;

        $('.audio-icon').on('click', function() {
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
                    audio.addEventListener('ended', function() {
                        pauseMe($curObj);
                    });
                    audio.addEventListener('loadeddata', function() {
                        $curObj.audioLoaded = 1;
                        me.addClass('active').find('.static').attr('src', active_voice_img);

                    });
                    audio.addEventListener("timeupdate", function() {
                        var audioLen = $(this).data('len');
                        var overPlus;
                        overPlus = (audioLen - this.currentTime);
                        var origin_min = Math.floor(audioLen / 60);
                        var origin_sec = Math.floor(audioLen % 60);
                        if (overPlus < 0) {

                            me.find('.audio-long .minute').text('0');
                            me.find('.audio-long .second').text('0');


                            //倒计时到0后时间复原
                            setTimeout(function() {
                                me.find('.audio-long .minute').text(origin_min);
                                me.find('.audio-long .second').text(origin_sec);

                            }, 1000);
                        } else {
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

    function bottomButton() {
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
                .on('click', '.bottom-share', function() {
                    $('.share-mask').show();
                    $('[name="control_top"]').css('z-index', '5');
                });
            $('.share-mask').click(function() {
                $(this).hide();
            })

        } else {
            bottom.find('.bottom-share').closest('.bottom-item').addClass('display-none');
            bottom.find('.bottom-favor').show();
        }

    }

    /*function bottomResize() {
        if (scriptData.is_trial_class) {
            //// 是否存在预约试听的按钮
            var btnAppoint = bottom.find('.btn-appoint');
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
    }*/

    /**
     * 老师和机构app隐藏底栏
     */
    function bottomHide() {
        var isTeacherApp = app.isTeacherApp();
        var isOrgApp = app.isOrgApp();
        if (isTeacherApp || isOrgApp || user.isTeacherLogin()) {
            bottom.hide();
        }
        if (!isStudentApp) {
            $('.bottom-item-download').show();
        }

    }


    /**
     * 下载
     */
    function download() {
        var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        var url = appDownload({
            type: 'student'
        });
        $('.download,.app-download').on('click', function() {

            if (isWeixin) {
                location.href = url;
            } else {
                location.href = 'bjhlstudent://o.c';
                setTimeout(function() {
                    location.href = url;
                }, 1000);
            }
        });
    }


    /**
     * 收藏
     */
    /*function favorAction() {
        var favorBtn = bottom.find('.favor');
        favorBtn.on('click', function() {
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
            }, function(res) {
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
    }*/



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
        }, function(response) {
            var resCode = response.code;
            if (resCode == 0 && response.data.call_url) {
                callPage(response.data.call_url);
            } else if (resCode == 401 || resCode == 200002) {

                user.loginStudent(function() {
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
        var listener = observer.addListener(dialog, 'display_changed', function() {
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
    /*function previewMask() {
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
            $('.teacher-ul').find('li.teacher-item').each(function(index, item) {

                if (userInfo && $(item).find('.chat').data('num') == userInfo.number) {
                    $(item).find('.chat').hide();
                }
            });
        }
    }*/

    function bindEvent() {
        var hasScrollObj = {};
        /* 展开或者关闭课程条目 */
        $('.classes-count').on('click', '.show-class-detail', function(e) {
            e.stopPropagation();
            var cp = $(this).closest('.item');
            var isOn = cp.hasClass('on');
            var cdetail = cp.find('.class-detail');
            if (isOn) {
                cdetail.height(0);
                cp.removeClass('on');
            } else {
                /*关闭之前展开的节点*/
                var curOnDom = $('.classes-count .item.on');
                if (curOnDom.length) {
                    curOnDom.removeClass('on');
                    curOnDom.find('.class-detail').height(0);
                }
                /*找到需要打开的节点并打开*/
                var theight = cdetail.find('ul').height();
                cdetail.find('ul').height(theight);
                theight = Math.min(theight, 200);
                cdetail.height(theight);
                cp.addClass('on');

                /*添加|刷新iscroll滚动条*/
                var cid = cdetail.attr('id');
                setTimeout(function() {
                    if (hasScrollObj[cid]) {
                        hasScrollObj[cid].refresh();
                        hasScrollObj[cid].scrollTo(0, 0);
                    } else {
                        hasScrollObj[cid] = new iScroll('#' + cid, {
                            scrollY: true,
                            scrollX: false,
                            click: true,
                            mouseWheel: true
                        });
                    }
                }, 200);
            }
            return false;
        });

        /*资料下载*/
        // $('.download-btn').click(function() {
        //     var me = $(this);
        //     var qq = me.attr('data-qq');
        //     if (qq) {
        //         var conDialog = ui.alert({
        //             content: '资料下载请加QQ：' + qq + '获取',
        //             button_ok: '确定'
        //         });
        //         conDialog.done(function() {
        //             return;
        //             var link = me.attr('data-link');
        //             link && (location.href = link);
        //         });

        //     } else {
        //         ui.remind('报名后才能获取资料哦');
        //     }
        // });

    }

    return function(page_data) {
        bindEvent();
        openAppWindow.init();
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
        isJinyou = page_data.isjinyou;
        isStudentApp = app.isStudentApp();
        appVersion = app.appVersion();
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        //判断金囿改变右上角下载地址和底部地址
        if (isJinyou) {
            $('.nav-wrap-right a').attr('href', location.origin + '/download/jinyou');
        }

        userInfo = user.getUserInfo();
        shareShow();
        bottomButton();
        /*bottomResize();*/
        bottomHide();
        initSildeImage(scriptData.photos);
        imgTextAction();
        qrCodeAction();
        audioPlay();
        // previewMask();
        countDistance();
        download();
        /*favorAction();*/
        //分享
        if (!app.isApp()) {
            setShare(JSON.parse(scriptData.share_info));
        }
        /* //显示限时优惠倒计时
         var countDownList = scriptData.countDownList;

         if (countDownList > 0) {
             var startTime = scriptData.start_time;
             var endTime = scriptData.end_time;

             countDown.init(container_CD, {
                 start: startTime,
                 end: endTime
             })

         }*/

        page_layout.bottom_fixed.addElement($('.bottom-class-vip'));


        //app中朋友圈分享
        $('.li-friends').on('click', function() {
            if (isApp && appVersion >= '3.0.2') {
                doShare('share_pyq', JSON.parse(scriptData.share_info));
            }
        });
        //app中微信分享
        $('.li-weixin').on('click', function() {
            if (isApp && appVersion >= '3.0.2') {
                doShare('share_weixin', JSON.parse(scriptData.share_info));
            }
        });
        $('.btn-download').on('click', function () {
            var me = $(this);
            if (app.isStudentApp() && env.os.isAndroid) {
                Jockey.send('joinQQGroup', {
                    key: me.attr('android-key')
                });
            } else {
                redirect(me.attr('url'));
            }
        })
        /*        //直播须知
                if (isApp) {
                    $('.app-rule').show();
                    $('.m-rule').hide();
                } else {
                    $('.app-rule').hide();
                    $('.m-rule').show();
                }*/
        /*        //课程分销
                $('.immediate-share').click(function () {
                    ui.remind('black', '请点击右上角分享给好友');
                });*/
        /*        //预约试听留单,支持个体老师
                $('.btn-appoint-liudan').on('click', function () {
                    var url = location.origin + $(this).data('href');
                    if (isApp) {
                        app.openNewWindow(url);
                    } else {
                        location.href = url;
                    }
                });*/
        var makePhoneCall = function(tel) {

            if (app.isApp()) {
                Jockey.send(
                    'toMakePhoneCall', {
                        phone_number: tel
                    }
                );
            } else {
                if (env.os.isIOS) {
                    location.href = 'tel:' + tel;
                } else {
                    window.open('tel:' + tel);
                }
            }
        };
        //咨询功能
        $('.btn-appoint-advisory').on('click', function() {
            var phoneNum = $(this).attr('phone');
            if (phoneNum) {
                makePhoneCall(phoneNum);
            }
        });

        // 点击立即报名按钮
        $('#btn-enrolling').click(function() {
            var me = $(this);
            if (!userInfo) {
                user.loginStudent(function() {
                    location.reload();
                });
            } else if (userInfo && userInfo.type == 0) {
                //如果是老师身份
                ui.confirm({
                    title: '温馨提示',
                    content: '请您切换成学生身份报名课程',
                    button_ok: '立即登录'
                }).done(function() {
                    location.href = '/static/login?next=' + encodeURIComponent(window.location.href);
                });
                return false;
            } else {
                var href = me.data('url');
                redirect(href);

                /*
                    var href = me.data('url');
                    var number = me.data('course-number');
                    me.attr('disabled', 'disabled');

                    service.post('/pay/checkClassOrder', {
                        course_number: number
                    }, function(res) {
                        me.attr('disabled', false);
                        var data = res.data;
                        if (res.code == 0) {
                            if (!data.is_login) {
                                user.loginStudent(function() {
                                    me.attr('disabled', fasle);
                                    $('.enrolling').click();
                                });
                            } else if (data.status) {
                                ui.confirm({
                                    content: data.content,
                                    button_ok: data.text
                                }).done(function() {
                                    if (data.status == 1 && isApp) {
                                        //班课的course_type为2
                                        app.send('toThirdPartyPayment', {
                                            purchase_id: data.purchase_id + '',
                                            course_type: '2'
                                        });
                                    } else {
                                        redirect(data.url);
                                    }
                                });
                            } else {
                                redirect(href);
                            }
                        } else {
                            redirect(href);
                        }
                    });*/

            }

        });
        // 点击已报名 进入订单详情页
        $("#btn-has_buy").click(function() {
            var url = $(this).data('url');
            if (isApp) {
                app.openNewWindow(url);
            } else {
                location.href = url;
            }

        });
        //设置老师列表高度
        if (scriptData.teacherCount > 1) {
            var teacherLi = $('.teacher-item');

            teacherLi.each(function(index, item) {
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
                vScrollbar: true

            });
        }
        //触发横向滚动时加载老师头像
        var timer; //计时器
        $('.teacher-ul').on('scroll', function() {
            clearTimeout(timer);
            timer = setTimeout(function() {
                lazyLoadImage.init();
            }, 1000);
        });

        var courseInfoDom = $('.course-info');
        if (scriptData.information) {
            var informationString = transPxFunc.init(scriptData.information);
            if (informationString) {
                courseInfoDom.find('.info').html(informationString);
            }
        }

        if (scriptData.introduction) {
            var introductionString = transPxFunc.init(scriptData.introduction);
            if (introductionString) {
                courseInfoDom.find('.img-intro').html(introductionString);
            }
        }
    };
});