/**
 * Created by chenmo on 15/12/21.
 */
define(function(require, exports) {

    'use strict';
    var lazyLoadImage = require('common/lazyLoadImage');
    var slideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var navBar = require('common/navBar');
    var navPanel = require('common/navPanel');
    var cityMgr = require('common/city_mgr');
    var util = require('common/util');
    var iScroll = require('iscroll');
    var observer = require('common/mvc/observer');
    var service = require('common/service');
    var ui = require('common/ui');
    var appController = require('common/app');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var bindCourseClick = require('common/bindCourseClick');
    var fullScreenDialog = require('common/ui/FullPageDialog/FullPageDialog');
    var setShare = require('common/share/initialize');
    var appoint = require('common/appoint/appoint');
    var enterClassRoom = require('common/enterClassRoom');
    var doShare = require('common/share/doShare');
    var getAppUrl = require('common/download/getAppUrl');
    // var tianxiaoLog = require('common/tianxiaoLog');
    var backTop = require('common/backTopButton');
    var countDown = require('common/countDown/countDown'); //倒计时
    var Comment = require("common/comment");
    var StaySingle = require("common/staySingle/staySingle");
    // var store = require('common/store');
    var urlUtil = require('util/url_v2');
    var WeChatLoginDialog = require('common/weChatLogin/weChatLogin');
    var BottomAction = require('../component/courseBottom/classDetailBottom');
    var topAction = require('page/_common/top/classDetail');
    //var courseAds = require('common/component/courseAds');
    var qrcode = require("common/qrcode");
    var liudanClickLog = require('common/liudanClickLog/liudanClickLog');
    var chengduSem = require('common/chengduSem');
    var habo = require('common/component/analysis/habo/index');

    var staging = require('../component/staging/staging');

    var valueAddedServices = require('../component/valueAddedServices/valueAddedServices');
    var chooseCourse = require('../component/chooseCourse/index');
    var submit = require('../component/courseBottom/purchase');
    var imgTextAction = require('../component/courseDetails/index');
    var qrCodeAction = require('../component/courseBottom/qrCodeAction');
    var appSkipInit = require('common/appSkipInit');

    var container = $('#main');
    var comment;
    var bottom = container.find('.bottom');
    var container_CD = $('.countdown');
    var heightArr = [];
    var scriptData;
    var value;
    var isApp;
    var isStudentApp;
    var isTeacherApp;
    var appVersion;
    var isWeixin;
    var hostStr;
    var host;
    var pageSize = 20;
    var page = 0;

    var from = '';
    var query = urlUtil.parseQuery(location.search);
    if (query.from) {
        from = '&from=' + query.from;
    }

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

    function getPayURL (params) {
        return '/pay/productDetail?' + $.param(params);
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

            distance = util.computeDistance(currentParam, courseParam, '');
            distance = Math.round(distance / 1000, 5);
            if (courseParam.lat != 0 && courseParam.lng != 0 && distance > 0) {
                container.find('.address .text').text(distance + 'km');
                container.find('.line2 .distance').text(distance + 'km');
            }
        }, function() {}, false, true);
    }

    /**
     * 初始化资料下载模块
     */
    function initMaterial() {
        var dataList = container.find('.data-list');

        var addAnchor = function () {
            var url = location.href;
            if (url.indexOf('#course-material') < 0) {
                location.href = url + '#course-material';
            }
        };

        if (dataList.length > 0) {
            if (isApp && isStudentApp) {
                var currentVersionNumber = appController.version2Number(appController.getAppVersion());
                var supportVersionNumber = appController.version2Number('3.3.4');
                if (currentVersionNumber >= supportVersionNumber) {
                    dataList.show();
                    addAnchor();
                }
            }
            else if (isApp && isTeacherApp) {
                dataList.show();
                addAnchor();
            }
            else if (!isApp) {
                dataList.show();
                addAnchor();
            }
        }

    }

    function imgTextAction() {
        var allBtn = $('.course-info .all-info');
        var imgText = $('.img-text-intro').find('.img-intro');
        var height = 0;

        // 寻找图片，并计算图片的高度
        var imgs = imgText.find('img');
        if (imgs.length > 0) {
            $.each(imgs, function() {
                $(this).load(function() {
                    height = imgText.height();
                    if (height < 460) {
                        $('.img-text-intro').css('margin-bottom', 0);
                    } else {
                        $('.img-text-intro').css('margin-bottom', '60px');
                    }
                });
            });

        } else {
            height = imgText.height();
            if (height < 460) {
                $('.img-text-intro').css('margin-bottom', 0);
            } else {
                $('.img-text-intro').css('margin-bottom', '60px');
            }
        }

        imgText.siblings(".consult-course").show();

        allBtn.on('click', function() {
            $('.img-text-intro').css('height', 'auto');
            $('.img-text-content .wrap').css('max-height', 'none');
            $('.img-text-content .clip').css('max-height', 'none').css('margin-bottom', '0');

            allBtn.hide();

        });


    }

    var bottomResize = function() {
        if (scriptData.is_trial_class) {
            // 是否存在预约试听的按钮
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
                if (btnAppoint && appController.isWeixin() && bottom.find('.consult').data('tel')) {
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
     * 课程安排弹出逻辑
     * @type {Object}
     */
    var coursePlan = {

        init: function(element) {
            var me = this;

            me.element = element;

            me.dialog = $('#plan-dialog');

            element.on(
                'click',
                function() {

                    me.showDialog();
                }
            );

            me.dialog.on(
                'click',
                '.close',
                function() {
                    me.hideDialog();
                }
            );
        },

        showDialog: function() {
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
            $('#plan-dialog')[0].addEventListener("touchmove", function(e) {
                e.preventDefault();
                return false;
            }, false);

            $(".div-mask")[0].addEventListener("touchmove", function(e) {
                e.preventDefault();
                return false;
            }, false);

        },

        hideDialog: function() {
            var me = this;
            var bodyElement = $('body');

            me.dialog.hide();

            bodyElement.find('.div-mask').removeClass('masked');
            bodyElement.removeClass('body-hidden');
        }
    };

    function download() {
        var isWeixin = appController.isWeixin();
        var url = getAppUrl('', 'student');
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

    function favorAction() {
        var favorBtn = bottom.find('.favor');
        favorBtn.on('click', function() {
            var me = $(this);
            var favor = me.find('img');
            var favorText = me.find('div');
            var favorImg = scriptData.favor_img;
            var unfavor = scriptData.unfavor;
            var model = scriptData.page_model;

            service.favorCollection({
                number: scriptData.teacher_number,
                type: 'class_course',
                value: value
            }).done(function(res) {
                if (res.code == 0) {
                    if (value == 0) {
                        value = 1;
                        ui.remind("取消收藏成功");
                        //更改页面样式
                        favor.attr('src', unfavor);
                        favorText.text('收藏');
                        //.removeClass(model);
                    } else {
                        value = 0;
                        ui.remind('收藏成功');
                        //更改页面样式
                        favor.attr('src', favorImg);
                        favorText.text('已收藏');
                        //favorText.text('已收藏').addClass(model);
                    }
                } else if (res.code == 401 || res.code == 200002) {
                    //没登录，跳转登录页
                    if (isApp) {
                        appController.getUserInfo(function() {
                            location.reload();
                        });
                    } else {
                        var loginDialog = new LoginDialog({
                            autoReload: true
                        });
                        loginDialog.show();
                    }
                } else {
                    ui.remind(res.msg);
                }
            });
        });
    }

    /*
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
    }*/

    /**
     * 咨询
     */
    /*function consultAction() {
        if (host[0].indexOf('jinyou') > -1) {
            $('.bottom-item-a').attr('href', 'tel:02164780375');
            return;
        }
        var param = getImData();
        var consultBtn = $('.consult');
        var isTrialClass = scriptData.is_trial_class;
        var chatBtn = container.find('.chat');

        var defaultConsult = consultBtn.find(".zxkf")[0];

        bindCourseClick.initChat(chatBtn, param);


        $(consultBtn).click(function(e) {
            if (defaultConsult) {
                liudanClickLog.send({
                    stype: 4
                })
            }
        });

        if (!defaultConsult) {
            $(".bottom-item-a").attr("href", "javascript:void(0)");
        } else {
            //app里个人咨询不支持
            return false;
        }

        if (!isApp && !bindCourseClick) {
            consultBtn.click(function(e) {
                threeWayCall($(this));
            });
        } else {
            bindCourseClick.initChat(consultBtn, param);
        }
        if (scriptData.is_sem) {
            $(".bottom-item-a").attr("href", "tel:4000630083");
        }

    }*/

    /**
     * 老师和机构app隐藏底栏
     */
    function bottomHide() {
        var userType = "";
        window.gsx_ready(function(config) {
            if (config.user) {
                userType = config.user.type;
            }
            var isTeacherApp = appController.isTeacherApp();
            var isOrgApp = appController.isOrgApp();
            if (isTeacherApp || isOrgApp || userType == 6) {
                bottom.hide();
            }
        });

    }

    /**
     * 三方通话ajax
     * @param container
     */
   /* function threeWayCall(container) {
        var targetData = container.data();
        var courseNum = targetData.course_num;
        var orgNum = targetData.org_num;
        var spread_id = targetData.spread_id;
        service.getCallUrl({
            number: orgNum,
            user_type: 6,
            course_num: courseNum,
            type: 'class_trial',
            spread_id: spread_id || ''
        }).done(function(response) {
            var resCode = response.code;
            if (resCode == 0 && response.data.call_url) {
                callPage(response.data.call_url);
            } else if (resCode == 401 || resCode == 200002) {
                var loginDialog = new LoginDialog();
                loginDialog.show();
                var listener1 = observer.addListener(loginDialog, 'success', function() {
                    $('.consult').click();
                });
                var listener2 = observer.addListener(loginDialog, 'display_changed', function() {
                    var display = this.get('display');
                    if (!display) {
                        observer.removeListener(listener1);
                        observer.removeListener(listener2);
                        loginDialog.destroy();
                    }
                });
            }
        });
    }*/

    /**
     * 三方通话界面
     */
    /*function callPage() {
        var dialog = new fullScreenDialog({
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
    }*/

    //预约弹层留电话，支持机构预约试听的班课
   /* $('.btn-appoint-advisory').on('click', function() {
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
    });*/

    //预约试听留单，支持个体老师
    /*$('.btn-appoint-liudan').on('click', function() {
        var url = location.origin + $(this).data('href');
        if (isApp) {
            appController.openNewWindow(url);
        } else {
            location.href = url;
        }
    });*/

    function redirect(href) {
        if (isApp) {
            if (href.indexOf('http') === -1) {
                href = location.origin + href;
            }
            appController.openNewWindow(href);
        } else {
            location.href = href;
        }
    }

    function audioPlay() {


        var active_voice_img = scriptData.active_voice_img;
        var voice_img = scriptData.voice_img;

        /* 存储音频列表 */
        var autoArr = {};
        /* 当前正在播放的音频 */
        var $curObj = null;

        /* 暂停图标 */
        var pauseHtml = '<img width="100%" height="100%" src="' + voice_img + '"/>';

        /* 设置某音频播放状态为暂停 paseObj 为autoAarr对象 */
        function pauseMe(pauseObj) {
            pauseObj.audio[0].pause();
            pauseObj.pause = false;
            //pauseObj.pDom.html(pauseHtml);
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
            var src = me.data('url');
            var url = me.data('url');
            var length = me.data('len');
            if (!autoArr[url]) {
                url = !!src ? ' src="' + src + '"' : '';

                /* 将当前音频添加到音频对象中并初始化状态 */
                autoArr[src] = {
                    audio: $('<audio data-len="' + length + '" preload="none" volume="1.0" ' + url + '></audio>'),
                    /* 暂停状态 */
                    pause: false,
                    /* 图标按钮元素 */
                    pDom: me
                };
            }
            $curObj = autoArr[src];

            /* 暂停所有其他音频 */
            for (var i in autoArr) {
                if (autoArr.hasOwnProperty(i) && i != src) {
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
                        //me.html('<img class="active" width="100%" height="100%" src="' + active_voice_img + '"/>');
                        me.addClass('active').find('.static').attr('src', active_voice_img);

                    });
                    audio.addEventListener("timeupdate", function() {
                        var audioLen = $(this).data('len');
                        var overPlus;
                        overPlus = (audioLen - this.currentTime);
                        var origin_min = Math.floor(audioLen / 60);
                        var origin_sec = Math.floor(audioLen % 60);
                        if (overPlus < 0) {


                            //me.find('.audio-longs').text('0' + ":" + '0');

                            //me.find('.audio-long').text('0' + "'" + '0' + '"');
                            me.find('.audio-long .minute').text('0');
                            me.find('.audio-long .second').text('0');


                            //倒计时到0后时间复原
                            setTimeout(function() {

                                //  me.find('.audio-longs').text(origin_min + ":" + origin_sec);

                                //me.find('.audio-long').text(origin_min + "'" + origin_sec + '"');
                                me.find('.audio-long .minute').text(origin_min);
                                me.find('.audio-long .second').text(origin_sec);

                            }, 1000);
                        } else {
                            var min = Math.floor(overPlus / 60);
                            var sec = Math.ceil(overPlus % 60);

                            //me.find('.audio-long').text(min + "'" + sec + '"');
                            //me.find('.audio-long').text(min + ":" + sec);
                            me.find('.audio-long .minute').text(min);
                            me.find('.audio-long .second').text(sec);
                        }

                    });
                    //me.html('下载中');
                } else {
                    // me.html('<img class="active" width="100%" height="100%" src="' + active_voice_img + '"/>');
                    me.addClass('active').find('.static').attr('src', active_voice_img);
                }

            } else {
                pauseMe($curObj);
                return false;
            }
        });
    }

    var keys = {};
    var createAudios = (function() {
        return function(url){
            if (!keys[url]) {
                var audiosDom = $('<audio preload="auto" volume="1.0" src="' + url + '"></audio>')[0];
                keys[url] = audiosDom;
            }
            return keys[url];
        }
    })();

    function pause_audio() {
        for(var key in keys) {
            keys[key].pause();
        }
        $.each($('.audio'), function (index, item) {
            $(item).attr('data-play', 0);
            var staticUrl = $(item).data('voice');
            var waveImg = $(item).siblings('.audio-wave');
            waveImg.attr('src',staticUrl);
        });
    }

    var newaudioPlay = function () {
        var container = $('.course-new');
        var audioStatus = 0;
        var audioLoaded = 0;
        container.on('click', '.audio', function(){
            var me = $(this);
            var url = me.data('url');
            var play_status = me.attr('data-play');
            var dynamicUrl = me.data('wave');
            var len = me.data('length');
            var staticUrl = me.data('voice');
            var audio = createAudios(url);
            if (!url) {
                return;
            }
            var waveImg = me.siblings('.audio-wave');
            if (len >= 60) {
                var length = Math.floor(len / 60) + "'" + Math.ceil(len % 60) + '"';
            }
            else {
                var length = Math.ceil(len % 60) + '"';
            }

            if (play_status == 1) {
                audio.pause();
                me.attr('data-play', 0);
                audioStatus = 0;
                waveImg.attr('src',staticUrl);
                return false;
            }
            else {
                if (!audioLoaded) {
                    me.siblings('span').html('下载中');
                    me.siblings('span').html(length);
                }
                pause_audio();
                audio.play();
                me.attr('data-play', 1);
                waveImg.attr('src',dynamicUrl + '?randmod=' + Math.random());
            }
            audio.addEventListener("timeupdate", function () {
                var overPlus;
                overPlus = (len - this.currentTime);
                if (overPlus <= 0) {
                    me.siblings('span').html(length);
                }
                else {
                    if (len >= 60) {
                        overPlus = Math.floor(overPlus / 60) + "'" + Math.ceil(overPlus % 60) + '"';
                    }
                    else {
                        overPlus = Math.ceil(overPlus % 60) + '"';
                    }

                    me.siblings('span').html(overPlus );
                }

            });

            audio.addEventListener('ended', function () {
                me.attr('data-play', 0);
                audioStatus = 0;
                waveImg.attr('src', staticUrl);
                me.siblings('span').html(length);
            });

            audio.addEventListener('loadeddata', function () {
                audioLoaded = 1;
                waveImg.attr('src', dynamicUrl);
            });

            $(window).on('beforeunload', function () {
                pause_audio();
                me.attr('data-play', 0);
            });
        });
    };

    /*var bottomButton = function() {
        if (!isApp) {
            var bottomConsult = bottom.find('.consult');
            //if (!bottomConsult.data('tel')) {
            //    bottomConsult.closest('.bottom-item').addClass('display-none');

            //} else {
            bottomConsult.closest('.bottom-item').removeClass('display-none');
            //}

            if (appController.isWeixin()) {
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

    };*/

    // app中显示分享图标，隐藏m站二维码
    var shareShow = function() {
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
            if (isWeixin) {
                $('.focus').show().css('display', 'inline-block');
                $('.m-qrcode').css('width', '50%').find('.m-qrcode-wrap').css('margin-right', '10px');
                $('.wx-tip').show();
            }
        }
    };

    // 小流量测试点击顶部咨询客服按钮，拨打400电话
    var consultCustom = function() {
        var pageMain = $("#page_main");
        pageMain
            .on('click', '.consult-custom,.consult-price,.consult-course,.consult-teacher,.consult-mid', function() {
                var telNumber = $(this).data('tel');
                makePhoneCallByPlatform(telNumber);
            });

        var makePhoneCall = function(tel) {

            if (appController.isApp()) {
                appController.makePhoneCall(tel);
            } else {
                if (util.platform.isIOS()) {
                    location.href = 'tel:' + tel;
                } else {
                    var iframe = document.createElement('iframe');
                    iframe = $(iframe);

                    iframe
                        .css({
                            width: 0,
                            height: 0
                        })
                        .appendTo($(document.body))
                        .prop('src', 'tel:' + tel);
                }

            }
        };

        var makePhoneCallByPlatform = function(tel) {
            tel = tel.replace(/\-/ig, '');
            var telStr = tel.replace(',', '转');

            var platform = appController.getPlatForm();

            if (platform === 'android') {
                confirm('' + '<div style="color: #000;padding: 0 30px;">' + '<strong style="font-weight:700;">是否拨打电话</strong>' + '<p style="margin-top:10px;">' + telStr + '</p>' + '</div>').done(function() {
                    makePhoneCall(tel);
                });

            } else {
                makePhoneCall(tel);
            }
        };
    };


    function downloadTeacher() {
        var isWeixin = appController.isWeixin();
        var url = getAppUrl('', 'teacher');
        var platform = appController.getPlatForm();
        $('.download-teacher').on('click', function() {
            ui.confirm({
                "content": "还差一步！<br>下载跟谁学-老师版便捷开设直播课",
                "button_ok": "立即下载"
            }).done(function() {
                if (isWeixin) {
                    location.href = getAppUrl(platform, 'teacher');
                } else {
                    location.href = 'bjhlteacher://o.c';
                    setTimeout(function() {
                        location.href = url;
                    }, 1000);
                }
            });

        });
    };

    function jifenDialog() {
        $('.jifen-nav-1').on('click', function() {
            ui.alert({
                content: '该课程支持上课后按实付金额送学分，学分可用来购买课程或兑换礼品哦',
                width: 250,
                button: '我知道了'
            });
        });
        $('.jifen-nav-2').on('click', function() {
            ui.alert({
                content: '该课程支持用学分兑换优惠券抵学费哦',
                width: 250,
                button: '我知道了'
            });
        });

    }
    function initVideo() {
        $('.video-player').each(function(){
            var me = $(this);
            var backImg = me.data('cover');
            var playUrl = me.data('src');
            var $posterContainer = me.find('.video-poster');
            var playIcon = me.find('.play-wrapper');
            var playFrame = me.find('.player-frame');
            var playId = me.data('id');
            var param = {
                id: playId
            };
            $posterContainer.css('background-image', 'url(' + backImg + ')');
            playIcon.click(function () {
                pause_audio();
                if (playUrl) {
                    playFrame
                        .attr('src', playUrl)
                        .show();
                    $(this).css('background','#fff').css('width','70px')
                        .html('正在加载...');
                    $posterContainer.hide();
                } else {
                    service.getVideo(param)
                        .done(function (response) {
                            if (response.code == 0) {
                                var data  = response.data;
                                if (data.status == 70) {
                                    playFrame
                                        .attr('src', data.pc_play_url)
                                        .show();
                                    $(this).css('background','#fff').css('width','70px')
                                        .html('正在加载...');
                                    $posterContainer
                                        .css('background-img', 'url("'+data.preface_url+'")')
                                        .hide();
                                }
                                else {
                                    ui.remind('视频转码中，请耐心等待...');
                                }
                            }

                        });
                }
            });
        });

    }

    /**
     * 增加APP直播课的回流
     *
     */
    function addSource() {
        if (appController.isApp()) {
            if (util.platform.isIOS()){
                $('.right-part a').attr('href', 'https://ju.genshuixue.com/?zn=zn_juhuixue_zbioshuiliu_studentapp');
                console.log('ios');
            }
            else {
                $('.right-part a').attr('href', 'https://ju.genshuixue.com/?zn=zn_juhuixue_zbhuiliu_studentapp');
                console.log('android');
            }
        }
    }

    function onColse() {
        Jockey.on('onPageVisibility', function (data) {
            if (data.isHidden) {
                pause_audio();
            }
        });
    }

    // hurry: 分享有奖
    function setShareReward(shareInfo) {
        if (shareInfo.share_reward) {
            $('.share-reward').show();
        }
    }

    //页面初始化完成后调用init函数
    //注意：store要在init后才可以get到php传出的数据
    exports.init = function(script_data) {
        scriptData = script_data;
        onColse();

        var t_n = scriptData.teacher_number;

        if (!t_n) {
            t_n = (scriptData.teacherInfo || [])[0];
        }
        var SemCourseInfo = {
            name: script_data.class_name,
            orgName: script_data.orgInfo.name,
            type: 'classCourse',
            number: script_data.classId,
            kind: '',
        };
        if (script_data.is_sem && !appController.isTeacherApp() && !appController.isOrgApp()) {
            // chengduSem(SemCourseInfo);
            $(".bottom-item-a").attr("href", "tel:4000630083");
            //$('.bottom-item-a').attr('href','tel:4000-630-083');
        }

        //预约试听
        var _staySingle = new StaySingle({
            course_number: scriptData.classId || ""
        });
        container
        .on('click', '.jhx-price', function (e) {
            var number ;
            if (scriptData.classId) {
                number = scriptData.classId;
            }
            else {
                number = scriptData.courseNum;
            }
            var postParam = {
                "type": "redirect",
                "stype": 1,
                "course_type": "class_course",
                "course_number": number
            };
            habo.send(postParam);
        })
        .on("click",".btn-stay-single",function(){
            _staySingle.show({
                title: $(this).text()
            });
        })
        .on('click', '.jhx-price', function (e) {
            var number ;
            if (scriptData.classId) {
                number = scriptData.classId;
            }
            else {
                number = scriptData.courseNum;
            }
            var postParam = {
                "type": "redirect",
                "stype": 1,
                "course_type": "class-course",
                "course_number": number
            };
            habo.send(postParam);
        });

        comment = new Comment({
            source: "3",
            teacher_number: scriptData.teacher_number || "",
            comment_tag_num: scriptData.totalNumber || ""
        });

        comment.listenerOne($(".stu-comment"));


        isApp = appController.isApp();
        isStudentApp = appController.isStudentApp();
        isTeacherApp = appController.isTeacherApp();
        appVersion = appController.getAppVersion();
        isWeixin = appController.isWeixin();
        hostStr = window.location.hostname;
        host = hostStr.split('.');
        var sHost = host[0];
        var isKaoyan = /kaoyan/g;

        initMaterial();

        //初始化value
        if (scriptData.favorStatus) {
            value = 0;
        } else {
            value = 1;
        }
        //阻止service中默认的错误处理弹框
        // service.setErrorHandler(function(errorMsg) {
        //
        // });
        newaudioPlay();
        initVideo();

        initSildeImage(scriptData.photos);

        // 是否是 U 盟
        var isUmeng = (/um_flow_type=gzh/.exec(location.href) || $('.can-app-download-wrapper').attr('data-can-app-download') === '0');
        if (!isKaoyan.test(sHost) && !isUmeng) {
            navBar.init();
        }
        // hurry: jinyou 代码独立仓库,不再 m 站 代码
        // if (sHost.indexOf('jinyou') < 0 && !/um_flow_type=gzh/.exec(location.href) && $('.can-app-download-wrapper').attr('data-can-app-download') !== '0') {
        //     navBar.init();
        // }
        // if (sHost.indexOf('jinyou') > -1) {
        //     $('.share-button a').attr('href', location.origin + "/download/jinyou");
        //     var jinBar = ''
        //         + '<a href="http://jinyou.m.genshuixue.com/download/jinyou">'
        //             + '<img width="100%" height="100%" style="position: absolute; top: 0px; left: 0px;" src="https://img.genshuixue.com/0cms/d/file/content/2016/07/578735c41586e.png">'
        //         + '</a>';
        //     $('.page_ads_content').html(jinBar);
        // }

        lazyLoadImage.init();
        countDistance();
        //imgTextAction();
        bottomResize();
        //coursePlan.init($('.all-plan'));

        favorAction();
        //consultAction();
        jifenDialog();

        // console.log(scriptData.canAppDownload);
        if(!isApp && !isUmeng) {
            topAction({
                url: location.href
            });
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

        // tianxiaoLog.send(window.script_data.org_number, 'classCourse', window.script_data.classId);
        //初始化回到顶部球
        // backTop();
        //分享
        var shareInfo = JSON.parse(scriptData.share_info);
        if (shareInfo) {
            setShare(shareInfo);
            setShareReward(shareInfo);
        }
        //app中朋友圈分享
        $('.li-friends').on('click', function() {
            if (isApp && appVersion >= '3.0.2') {
                doShare('share_pyq', shareInfo);
            }
        });
        //app中微信分享
        $('.li-weixin').on('click', function() {
            if (isApp && appVersion >= '3.0.2') {
                doShare('share_weixin', shareInfo);
            }
        });
        bottomHide();
        qrCodeAction(scriptData);
        audioPlay();
        download();

        //bottomButton();

        // 处理app中a标签的跳转
        appSkipInit();

        shareShow();

        consultCustom();
        // downloadTeacher();
        BottomAction(scriptData);

        valueAddedServices();
        chooseCourse();

        $('.security-block').on('click', function () {
            var that = $(this);
            if(isApp) {
                appController.openNewWindow(that.data('url'));
            } else {
                location.href = that.data('url');
            }
        });

        var courseInfo = scriptData.courseInfo;
        var params = {
            type: courseInfo.course_type,
            course_number: courseInfo.number,
            lesson_way: (courseInfo.lesson_way == 2) ? 'online' : 'student',
            hours: 1
        };

        imgTextAction();

        // submit.jumpToPage(getPayURL(params), isApp);

        //直播须知
        if (isApp) {
            $('.app-rule').show();
            $('.m-rule').hide();
        } else {
            $('.app-rule').hide();
            $('.m-rule').show();
        }
        addSource();
        //老师端app中隐藏老师头像右边咨询按钮
        //if (isApp && appController.isTeacherApp()) {
        //    window.gsx_ready(function(config){
        //        if(config.user && config.user.number == )
        //        $('.chat').hide();
        //    });
        //
        //}
        //课程分销
        $('.immediate-share').click(function() {
            ui.remind('black', '请点击右上角分享给好友');
        });
        var $buyBtn = $('#btn-enrolling');

        /**
         * 如果课程价格为0，且当前将要跳转到确认支付页的时候，阻止跳转，直接调用支付
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        var goBuyUrl = function(url, name) {
            if (from) {
                url += from;
            }

            if (scriptData.course_type == 2 && scriptData.price_origin_target == 0 && url.indexOf('pay/productDetail')) {
                window.gsx_ready(function(config) {
                    var data = {};
                    data.type = 2;
                    data.pay_money = 0;
                    data.is_self = 1;
                    data.use_plat_ensure = 1;
                    data.is_sms = 0;
                    data.course_number = scriptData.classId;
                    var userInfo = config.user;
                    data.name = name;
                    data.student_name = name;
                    if (userInfo) {
                        data.student_name = userInfo.name;
                        data.name = userInfo.name;
                    }
                    var lastTxt = $buyBtn.html();
                    $buyBtn.attr('disabled', true).html('正在报名...');
                    service.createSimpleOrder(data).done(function(e) {
                        if (e.code == 0) {
                            //购买成功免费直播课改为直接跳转到支付完成页
                            if (appController.isApp()) {
                                Jockey.send('toPayResult', {
                                    purchase_id: e.data.purchase_id,
                                    pay_status: 0
                                });
                            } else {
                                location.href = '/pay/result?purchase_id=' + e.data.purchase_id;
                            }
                            // ui.remind('报名成功');
                            // $buyBtn.removeClass('enrolling-orange').html('已报名');
                            // setTimeout(function() {
                            //     location.reload();
                            // }, 500);
                        } else {
                            $buyBtn.attr('disabled', false).html(lastTxt);
                            if (e.msg) {
                                ui.remind(e.msg);
                            }

                        }

                    });
                });
            } else {
                redirect(url);
            }
        };

        // 点击立即报名按钮
        $buyBtn.click(function() {
            var me = $(this);
            var price = scriptData.target_price;
            window.gsx_ready(function(config) {
                //如果是老师身份
                if (config.user && config.user.type == 0) {
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
                    var number = me.data('course-number');
                    me.attr('disabled', 'disabled');
                    service.checkOrderStatus({
                        number: number
                    }).done(function(res) {
                        me.attr('disabled', false);
                        var data = res.data;
                        var nickName = data.name;
                        if (res.code == 0) {
                            if (!data.is_login) {
                                if (isApp) {
                                    appController.getUserInfo(href, function () {
                                        location.reload();
                                    });
                                } else {
                                    var isWeixin = WeChatLoginDialog.isWeixin();
                                    var successFun = function () {
                                        service.checkOrderStatus({
                                                number: number
                                            }).done(function (m_res) {
                                                //me.attr('disabled',false);
                                                var m_data = m_res.data;
                                                var mName = m_data.name;
                                                if (m_res.code == 0) {
                                                    if (m_data.status == 1) {
                                                        ui.confirm({
                                                            content: m_data.content,
                                                            button_ok: m_data.text

                                                        }).done(function () {
                                                            goBuyUrl(m_data.url, mName);
                                                        });
                                                    } else if (m_data.status == 2) {
                                                        me.removeClass('enrolling-orange').html('已报名');
                                                        location.reload();
                                                    } else {
                                                        goBuyUrl(href, mName);
                                                    }
                                                } else {
                                                    goBuyUrl(href, mName);
                                                }
                                            });
                                    };
                                    if (isWeixin) {
                                        if (+price !== 0) {
                                            WeChatLoginDialog.addWechatDialog(href, successFun);
                                        } else {
                                            // 当课程为免费课程时，微信登录直接刷新页面
                                            WeChatLoginDialog.addWechatDialog(location.href, successFun);
                                        }
                                    } else {
                                        var loginDialog = new LoginDialog();
                                        loginDialog.show();
                                        var listener1 = observer.addListener(loginDialog, 'success', successFun);
                                        var listener2 = observer.addListener(loginDialog, 'display_changed', function () {
                                            var display = this.get('display');
                                            if (!display) {
                                                observer.removeListener(listener1);
                                                observer.removeListener(listener2);
                                                loginDialog.destroy();
                                            }
                                        });
                                    }
                                }
                            } else if (data.status) {
                                if (data.status == 1) {
                                    ui.confirm({
                                        content: data.content,
                                        button_ok: data.text
                                    }).done(function () {
                                        if (data.status == 1 && isApp) {
                                            //班课的course_type为2
                                            appController.toThirdPartyPayment(data.purchase_id, '2');
                                        } else {
                                            goBuyUrl(data.url, nickName);
                                        }
                                    });
                                } else if (data.status == 2) {
                                    goBuyUrl(data.url, nickName);
                                }
                            } else {
                                goBuyUrl(href, nickName);
                            }
                        } else {
                            goBuyUrl(href, nickName);
                        }
                    });

                }
            });
        });


         /*
         *检查订单状态
         */
         function checkStaging (periods) {

             //判断花呗状态
             function goStagingUrl (url, period) {
                 $.ajax({
                     method: 'post',
                     url: '/course/fenqiChoice',
                     data: {
                         course_number: scriptData.classId,
                         course_type: 2,
                         stage_number: period
                     },
                     success: function (response) {
                         if(response.code!=0) {
                             ui.remind(response.msg);
                         } else if (response.code == 0) {
                             redirect(url);
                         }
                     }
                 });
             }

             service.checkOrderStatus({
                 number: scriptData.classId
             }).done(function (res){
                 var data = res.data;
                 var nickName = data.name;
                 var stagingUrl = '/pay/productDetail?course_number=' + scriptData.classId + '&type=2';
                 if(res.code == 0) {
                     if(data.status){
                         if(data.status == 1) {
                             ui.confirm({
                                 content: data.content,
                                 button_ok: data.text
                             }).done(function() {
                                 if (data.status == 1 && isApp) {
                                 //班课的course_type为2
                                 appController.toThirdPartyPayment(data.purchase_id, '2');
                                 } else {
                                 goBuyUrl(data.url, nickName);
                                 }
                             });
                         } else if (data.status == 2) {
                             goBuyUrl(data.url, nickName);
                         }
                     } else {
                         goStagingUrl(stagingUrl, periods);
                     }
                 } else {
                     goStagingUrl(stagingUrl, periods);
                 }
             });
         }


         /*
          *分期
          */
         $('.staging').on('click', function() {
             staging(scriptData.staging, 'courseDetail', 'normal');

             var stagingButton = $('.staging-dialog .button');
             stagingButton.unbind('click');
             stagingButton.on('click', function () {
                 window.gsx_ready(function (config) {
                     //判断身份-老师身份
                     if(config.user && config.user.type == 0) {
                         ui.confirm({
                             title: '温馨提示',
                             content: '请您切换成学生身份报名课程',
                             button_ok: '立即登录'
                         }).done(function (){
                             location.href = '/static/login?next=' + encodeURIComponent(window.location.href);
                         });
                     } else if(config.user && config.user.type == 2) {
                         //判断身份-学生身份
                         var stagingAll = $('.staging-all');
                         var stagingPeriod = 0;
                         var hasStaging = false;
                         /*stagingAll.find('.staging-item').each(function() {
                             var there = $(this);
                             if (there.attr('data-flag') == 1) {
                                 stagingPeriod = there.data('periods');
                             }
                         });*/

                         $('.slide-dialog-mask').each(function () {
                             var that = $(this);
                             if(that.hasClass('on')) {
                                 that.find('.staging-all .staging-item').each(function () {
                                     var there = $(this);
                                     if (!there.find('.options .icon').hasClass('hide')) {
                                         hasStaging = true;
                                         stagingPeriod = there.data('periods');
                                     }
                                 });
                             }
                         });

                         if(hasStaging) {
                         //if(stagingPeriod > 0) {
                             //先请求订单状态再准备调用花呗接口
                             checkStaging(stagingPeriod);
                         } else {
                             ui.remind('请选择需要还款的期数');
                         }

                     } else {
                         //未登录状态
                         if(isApp) {
                             appController.getUserInfo(location.href, function() {
                                 location.reload();
                             });
                         } else {
                             if(isWeixin) {
                                 //微信登录的话就用微信的弹窗
                                 //staging(scriptData.staging, 'courseDetail', 'close');
                                 $('.slide-dialog-mask').each(function () {
                                    var that = $(this);
                                    if(that.hasClass('on')) {
                                        that.css('z-index', '10');
                                    }
                                 });
                                 WeChatLoginDialog.addWechatDialog(location.href, function (){
                                     location.reload();
                                 });
                             } else {
                                 var loginDialog = new LoginDialog();
                                 loginDialog.show();
                                 var listener1 = observer.addListener(loginDialog, 'success', function(){
                                     location.reload();
                                 });
                                 var listener2 = observer.addListener(loginDialog, 'display_changed', function() {
                                     var display = this.get('display');
                                     if(!display) {
                                         observer.removeListener(listener1);
                                         observer.removeListener(listener2);
                                         $('.wechat-hide').hide();
                                         loginDialog.destroy();
                                     }
                                 });

                             }
                         }
                     }
                 });
             });
         });

        // 点击进入资料列表
        $('.data-list').click(function (e) {
            e.preventDefault();
            var appUrl = $(this).data('url');
            var url = $(this).data('href');
            if (isStudentApp) {
                appController.urlSchemeRoute({
                    url: appUrl
                });
                return;
            }
            else if (isTeacherApp) {
                appController.openNewWindow(url);
            }
            else {
                location.href = url;
            }
        });
        // 点击进入教室
        $('#btn-live').click(function(e) {
            if (scriptData.courseStatus != 14) {
                var me = $(this);
                e.preventDefault();
                var url = me.data('url');
                window.gsx_ready(function (config) {
                    //如果是老师身份
                    if (config.user && config.user.type == 0) {
                        ui.confirm({
                            title: '温馨提示',
                            content: '请您切换成学生身份进入教室',
                            button_ok: '立即登录'
                        }).done(function() {
                            location.href = "/static/login?next=" + encodeURIComponent(window.location.href);
                        });
                        return false;
                    } else {
                        me.attr('disabled', 'disabled');
                        setTimeout(function() {
                            me.removeAttr('disabled');
                        }, 10000);
                        if (isApp) {
                            // hurry: 直播进入教室走公共类
                            // appController.openNewWindow(url);
                            appController.toNewOnlineWindow(url);
                        } else {
                            location.href = url;
                        }
                    }
                });
            }
        });

        // 点击已报名 进入订单详情页
        $("#btn-has_buy").click(function() {
            var url = $(this).data('url');
            if (isApp) {
                appController.openNewWindow(url);
            } else {
                location.href = url;
            }

        });

        // 点击结束啦 进入搜索结果页面
        $("#btn-finish").click(function() {
            var url = location.origin + '/sc/-.html';
            if (isApp) {
                return false;
            } else {
                location.href = url;
            }

        });
        //显示更多课程逻辑修改 不弹窗，每次展示20条
        $('.all-plan').click(function() {
            var array = scriptData.plan_list;
            var sHtml = '';
            var temp = [];
            var fromSize = page * pageSize + 4;
            var toSize = (page + 1) * pageSize + 4;
            page++;
            if (toSize > array.length) {
                toSize = array.length;
            }
            for (var i = fromSize; i < toSize; i++) {
                var coHtml = '';
                var cotHtml = '';
                var isFinish = '';
                if (array[i].is_finish) {
                    var isFinish = '<span>已结束</span>';
                }
                if (array[i].content) {
                    coHtml = '<div class="plan-title">' + array[i].content + '</div>';
                    cotHtml = '<div class="plan-time">' + array[i].title + isFinish + '</div>'
                } else {
                    cotHtml = '<div id="one-div" class="plan-time">' + array[i].title + isFinish + '</div>'
                }
                sHtml = '<li>' + '<div class="index">' + (i + 1) + '</div>' + '<div class="course-content">' + coHtml + cotHtml + '</div>' + '</li>';
                temp.push(sHtml);
            };
            $('.plan-list').append(temp.join(""));
            if (toSize == array.length) {
                $('.all-plan').hide();
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
            //var maxWidth = Math.ceil(maxHeight / 0.75);
            teacherLi.height(maxHeight);
            //teacherLi.width(maxWidth);
        }

        var fWidth = $('.li-friends').width();
        fWidth = fWidth - 87;
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


    };
});
