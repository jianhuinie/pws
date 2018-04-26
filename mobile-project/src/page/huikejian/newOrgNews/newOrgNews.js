/**
 * @file 新版机构动态页的脚本文件
 * @author caoying
 */
define(function(require) {

    "use strict";

    var lazyLoadImage = require('common/lazyLoadImage');
    var openAppDialog = require('common/openAppDialog/openAppDialog');
    var appController = require('common/app');
    var qrcode = require('common/qrcode');
    var download = require('common/app_download');
    // var store = require('common/store');
    var pageData = null;
    var store = {
        get: function(key) {
            if (pageData[key]) {
                return pageData[key];
            } else {
                return '';
            }
        }
    }
    var share = require('./share');
    // var setShare = require('common/function/setShare');
    var service = require('common/service');
    // var util = require('common/util');
    var bindCourseClick = require('common/bindCourseClick');
    var countDown = require('common/countDown/countDown');//倒计时
    var bottomAction = require('../helpers/org-detail-page-bottom');
    var ui = require('common/ui');
    var navBar = require('common/navBar');
    // var tianxiaoLog = require('common/tianxiaoLog');

    var fullScreenDialog = require('common/ui/FullPageDialog/FullPageDialog');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var observer = require('common/mvc/observer');
    var appoint = require('common/appoint/appoint');

    var container = $("#main");
    var isApp;
    var audioLoaded = 0;
    var page;
    var orgNum;

    var bindOrgIntroFeature = function() {
        if (!$(this).hasClass("active")) {
            $(this).find(".slide-down").css("height", "auto")
                .next().removeClass("icon-angle-down").addClass("icon-angle-up");
            $(this).addClass("active");
        } else {
            $(this).find(".slide-down").css("height", "2.5rem")
                .next().removeClass("icon-angle-up").addClass("icon-angle-down");
            $(this).removeClass("active");
        }

    };

    var bindOrgIntroDetail = function() {
        var intro = $(".org-intro-detail");
        var slideDown = intro.find(".slide-down");
        var slideHeight = slideDown.height();
        var content = intro.find(".content");
        var contentHeight = content.height();
        if (!$(this).hasClass("active")) {
            $(this).find(".slide-down").css({
                    "display": 'block'
                })
                .next().removeClass("icon-angle-down").addClass("icon-angle-up");
            $(this).addClass("active");
        } else {
            $(this).find(".slide-down").css({
                    "display": "-webkit-box"
                })
                .next().addClass("icon-angle-down").removeClass("icon-angle-up");
            $(this).removeClass("active");
        }

    };

    //隐藏特点
    function countFeature() {
        var feature = $(".org-intro-feature");
        var slideDown = feature.find(".slide-down");
        var slideHeight = slideDown.height();
        var content = feature.find(".content");
        var contentHeight = content.height();
        if (contentHeight > slideHeight) {
            feature.find("i").show();
            $(".org-intro .org-intro-feature").on("click", bindOrgIntroFeature);
        } else {
            feature.find("i").hide();
        }
    }

    //隐藏简介
    function countIntro() {
        var intro = $(".org-intro-detail");
        var slideDown = intro.find(".slide-down");
        var slideHeight = slideDown.height();
        var content = intro.find(".content");
        var contentHeight = content.height();
        if (contentHeight > slideHeight) {
            $(".org-intro-detail").css("padding-bottom", "1.875rem");
            intro.find("i").show();
            $(".org-intro .org-intro-detail").on("click", bindOrgIntroDetail);
        } else {
            intro.find("i").hide();
        }
    }

    //start bottom tools==============================================
    /*(function () {
     var $bottom = $('.bottom');

     //机构信息
     var $orgInfoItem = $bottom.find('.org-information');
     var isHidden = false;
     $orgInfoItem.find('.handle').click(function () {
     var $menu = $orgInfoItem.find('.menu-container');
     if (isHidden) {
     $menu.show();
     } else {
     $menu.hide();
     }
     isHidden = !isHidden;
     });
     })();*/
    //end bottom tools================================================

    /**
     * 音频播放
     * */

    var videoPlay = function() {
        var pressFlag = false;

        var url = store.get('audioUrl');
        if (!url) {
            return;
        }
        var audio = null;

        container
            .on('click', '.voice', function(e) {
                if (!audio) {
                    audio = $('<audio preload="none" volume="1.0" src="' + url + '"></audio>')[0];
                }
                var audioStatus = 0;
                var that = $(this);
                if (!pressFlag) {
                    $(this).find('img').attr('src', '../../asset/img/org/voice_pressed.png');
                    pressFlag = true;
                } else {
                    $(this).find('img').attr('src', '../../asset/img/org/voice.png');
                    pressFlag = false;
                    audio.pause();
                    return false;
                }

                if (audioStatus) {
                    audio.pause();
                    audioStatus = 0;
                } else {

                    if (!audioLoaded) {
                        $(this).html('下载中...');
                        $(this).addClass('down');
                    }
                    audio.play();
                    audioStatus = 1;
                    $(this).find('img').attr('src', '../../asset/img/org/voice_pressed.png');
                }

                audio
                    .addEventListener('ended', function() {
                        audioStatus = 0;
                        that.find('img').attr('src', '../../asset/img/org/voice.png');
                        pressFlag = false;
                    });

                audio.addEventListener('loadeddata', function() {
                    audioLoaded = 1;
                    that.html('');
                    that.removeClass('down');
                    var img = document.createElement("img");
                    img.setAttribute('width', 'auto');
                    img.setAttribute('height', 'auto');
                    img.setAttribute('src', '../../asset/img/org/voice_pressed.png');
                    that.append(img);
                });

                $(window).on('beforeunload', function() {
                    audio.pause();
                    audioStatus = 0;
                    that.find('img').attr('src', '../../asset/img/org/voice.png');
                    pressFlag = false;
                });

            });


    };
    /*拨打400电话*/
    function useIframeMakePhoneCall(tel) {
        if (appController.isApp()) {
            appController.makePhoneCall(tel);
        } else {
            if (ua.platform === 'ios') {
                location.href = 'tel:' + tel;
            } else {
                var iframe = document.createElement('iframe');
                iframe = $(iframe);

                iframe.css('display', 'none')
                    .appendTo($(document.body))
                    .prop('src', 'tel:' + tel);
            }
        }
    }
    //三方通话通话界面
    function callPage(url) {
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
    }
    //三方通话ajax
    function threeWayCall(container) {
        var targetData = container.data();
        var orgNum = targetData.org_num;
        service.getCallUrl({
            number: orgNum,
            user_type: 6,
            type: 'class_trial'
        }).done(function(reponse) {
            var resCode = reponse.code;
            if (resCode == 0 && reponse.data.call_url) {
                callPage(reponse.data.call_url);
            } else if (resCode == 401 || resCode == 200002) {
                var loginDialog = new LoginDialog();
                loginDialog.show();
                var listener1 = observer.addListener(loginDialog, 'success', function() {
                    $('.im-button').click();
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
    }
    //根据是否预约显示不同弹框
    function showAppointDia(isAppoint, tel) {
        var html = '';

        if (isAppoint == 'has_trial') { //预约过
            html = '您已预约过，如机构未主动联系您，您可拨打电话';
            confirm({
                title: '预约试听',
                content: html,
                btnText: ['确定', '拨打电话']
            }).done(function() {
                call(tel);
            });


        } else if (isAppoint == 'succ') { //没有预约
            html = '恭喜预约成功！<br/>请留意手机,我们已通知机构尽快与您联系';
            ui.alert({
                title: '预约试听',
                content: html,
                button: '确定'
            });

        }


        function call(tell) {
            if (tell) {
                if (appController.getPlatForm() === 'android') {
                    var html = '' + '<div style="color: #000;padding: 0 30px;">' + '<strong style="font-weight:700;">是否拨打电话</strong>' + '<p style="margin-top:10px;">' + tel_400.replace(',', '转') + '</p>' + '</div>';
                    confirm({
                        content: html,
                        btnText: ['取消', '拨打']
                    }).done(function() {
                        useIframeMakePhoneCall(tell);
                    });
                } else {
                    useIframeMakePhoneCall(tell);
                }
            } else {
                $('.im-button').click();
            }
        }
    }
    //预约试听的异步请求
    function appointAjax() {
        var targetData = $('.im-button').data();
        var org_num = targetData.org_num;
        var tel_400 = targetData.tel;

        //showAppointDia('succ',tel_400);
        $.ajax({
            method: 'post',
            url: '/student_advisory/create',
            data: {
                object_number: org_num,
                content_type: 'yunying.org_account'
            },
            dataType: 'json',
            success: function(response) {
                var resultCode = response.code;
                if (resultCode == 0) { //已登录
                    showAppointDia(response.data.result, tel_400);
                } else if (resultCode == 401 || resultCode == 200002) {
                    //未登录
                    var loginDialog = new LoginDialog();
                    loginDialog.show();
                    var listener1 = observer.addListener(loginDialog, 'success', function() {
                        $('.btn-appoint').click();
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
            }
        });
    }
    //有关预约试听的点击事件绑定
    function appointClick() {
        $('.btn-appoint').click(function() {
            appointAjax();
        });
        var consultBtn = $('.im-button');
        var param = {
            "c_id": '' + store.get('base_info')['number'],
            "c_role": "6",
            "group_id": ""
        };

        var isTrialClass = store.get('is_trail_class');
        if (isTrialClass) {
            if (consultBtn.data('tel')) {
                bindCourseClick.initChat(consultBtn, param);
            } else {
                consultBtn.click(function() {
                    threeWayCall($(this));
                });
            }
        } else {
            bindCourseClick.initChat(consultBtn, param);
        }

    }

    function getImData() {
        var param;
        var imFlag = true;
        var arrayIm = JSON.parse(store.get('im_data')); // 如果im_data 不为空，则 arrayIm为对象，否则为数组

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


    /**
     * 咨询*/
    var consult = function() {
        var param = {
            "c_id": '' + store.get('base_info')['number'],
            "c_role": "6",
            "group_id": ""
        };

        bindCourseClick.initChat(container.find('.im-button'), param);
    };

    /**
     * 显示二维码
     *
     */
    function showQrcode() {
        var body = $('body');
        var element = $('.qrcode-container');
        body.addClass('noscroll');
        element.fadeIn(100);
    };


    var teacherImagEvent = function() {
        $(".org-teacher-style >a").click(function(e) {
            if (isApp) {
                if ($(this).data('app') == undefined) {
                    e.preventDefault();
                    appController.openNewWindow($(this).prop('href'));
                }
            }
        })

    };

    /**
     * 隐藏二维码
     *
     */
    function hideQrcode() {
        var body = $('body');
        var element = $('.qrcode-container');
        body.removeClass('noscroll');
        element.hide();
    }

    /**
     * 点击生成二维码
     * */
    var qrCodeClick = function() {
        var idCode = container.find('.id-code');
        var init = false;

        idCode
            .on('click', '.code', function(e) {
                if (!init) {
                    init = true;
                    service.getShortUrl(store.get('qrcodeUrl')).done(function(response) {
                        if (response.code == 0) {
                            qrcode({
                                text: response.data.short_url,
                                width: 220,
                                height: 220,
                                element: $('#qrcode')
                            });
                        } else {
                            init = false;
                        }
                    });
                }
                showQrcode();
            });
        container
            .on('click', '.qrcode-container .cancel', function(e) {
                hideQrcode();
            })
    };

    /**
     * 返回顶部
     *
     * */
    var backTop = function() {

        function update() {
            var windowHeight = window.screen.height || window.innerHeight;
            if (document.body.scrollTop > windowHeight / 2) {
                $('.back-top').show();
            } else {
                $('.back-top').hide();
            }
        }

        // 返回顶部
        container
            .on('click', '.back-top', function() {
                $(window).scrollTop(0);
            });

        $(window).scroll(update);
        setTimeout(update, 500);
    };

    /**
     * 机构App隐藏底部*/
    var bottomHide = function() {

        if (isApp) {
            if (appController.isOrgApp()) {
                $('.bottom').hide();
            }
        }

    };

    /**
     * 点击顶部评价跳转到评价页面*/
    var comment = function() {
        var countTotal = container.find('.count-total');
        countTotal
            .on('click', '.comment', function() {
                var url = $(this).data('url');
                if (isApp) {
                    appController.openNewWindow(url);
                } else {
                    location.href = url;
                }

            });
        if (appController.isApp()) {
            countTotal.on('click', '.fans', function() {
                ui.remind('机构的粉丝暂时保密哦~');
            });
        }
    };


    // 第一次请求更多动态信息
    var moreCourse = function() {
        var teacherPage = container.find('.active-page');
        page = 2;
        teacherPage
            .on('click', '.more-button', function() {
                ajaxCourse($(this), page);
            });

    };

    var ajaxCourse = function(element, currentPage) {

        var parent = $(element).closest('.org-dynamic');
        var ulTeacher = parent.find('.dynamic-list-ajax');
        element.find('.more-loading').show();
        element.find('.character').hide();
        $.ajax({
            type: "get",
            url: '/org/huike_news_ajax',
            data: {
                number: store.get('base_info')['number'],
                next_cursor: currentPage
            },
            success: function(response) {
                if (response.code == 0) {
                    ulTeacher.append(response.data.tpl);
                    lazyLoadImage.init();
                    element.find('.more-loading').hide();
                    if (response.data.pager.has_more) {
                        element.find('.character').show();
                        page = response.data.pager.next_cursor;
                    } else {
                        element.hide();
                    }

                }
            }
        });
    };

    // 机构预约试听
    var appointOrg = function() {
        container
            .on('click', '.btn-appoint', function() {
                var param = {};
                param['courseType'] = 'org';
                param['title'] = store.get('org_name');
                param['objectId'] = orgNum;
                param['objectType'] = 'yunying.org_account';
                param['tel400'] = store.get('tel_400');
                param['orgNumber'] = orgNum;

                appoint.appoint(param);
            });
    };

    return {
        init: function() {
            pageData = page_data;
            orgNum = store.get('base_info')['number'];
            bottomAction.init(store.get('base_info')['number']);
            isApp = appController.isApp();

            // 设置相册和图片的高度
            var photoVideo = container.find('.img-bars-content').find('span');
            $.each(photoVideo, function(e) {
                $(this).find('.photo-video').css('height', $(this).find('.photo-video').width());
            });

            // 重绘相册和视频高度
            $(window).on('resize', function() {
                $.each(photoVideo, function() {
                    $(this).find('.photo-video').css('height', $(this).find('.photo-video').width());
                });
            });

            lazyLoadImage.init();
            // linkPanel.init();

            videoPlay();
            //teacherImagEvent();
            //consult();
            appointClick();

            qrCodeClick();

            backTop();

            // by caoying 注释于2015-11-28，改为调用新的分享接口
            //appController.setFavouriteInfo(
            //    JSON.parse(store.get('favorite_info') || '{}')
            //);
            //
            //share.init();

            // setShare(JSON.parse(store.get('share_info')));

            countFeature();

            countIntro();

            bottomHide();

            comment();

            navBar.init();

            moreCourse();

            appointOrg();
            // tianxiaoLog.send(store.get('base_info')['number'], 'blackboard');

            var url = download({
                type: 'student'
            });

        }
    };
});
