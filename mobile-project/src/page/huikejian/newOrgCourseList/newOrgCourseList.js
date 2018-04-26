/**
 * @file 机构详情页的脚本文件
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
    var countDown = require('common/countDown/countDown'); //倒计时
    var bindCourseClick = require('common/bindCourseClick');

    var fullScreenDialog = require('common/ui/FullPageDialog/FullPageDialog');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var observer = require('common/mvc/observer');

    var bottomAction = require('../helpers/org-detail-page-bottom');
    var ui = require('common/ui');
    var navBar = require('common/navBar');
    var appoint = require('common/appoint/appoint');
    var StaySingle = require("common/staySingle/staySingle");
    var chengduSem = require('common/chengduSem');
    var template = require('artTemplate');
    var moreRender = template.compile(require("text!./more.tpl"));

    var container = $("#main");
    var container_CD = $('.countdown'); //倒计时容器
    var isApp;
    var audioLoaded = 0;

    var orgNum;


    var bindOrgIntroFeature = function() {
        var me = $(this);
        if (!me.hasClass("active")) {
            me.find(".slide-down").css("height", "auto")
                .next().removeClass("icon-angle-down").addClass("icon-angle-up");
            me.addClass("active");
        } else {
            me.find(".slide-down").css("height", "2.5rem")
                .next().removeClass("icon-angle-up").addClass("icon-angle-down");
            me.removeClass("active");
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

    function tabClick(title, curNumber, number, page) {
        $.each(title, function(e) {
            if ($(this).data('number') == curNumber) {
                $(this).addClass('active');

                $.each(page, function(key, value) {
                    if (value.number == curNumber) {
                        if (value.number > 0 && $(value.page).data("flag") == 0) {

                            $.ajax({
                                type: "get",
                                url: value.url,
                                data: {
                                    number: number,
                                    next_cursor: 1
                                },
                                success: function(response) {
                                    if (response.code == 0) {
                                        //异步返回数据
                                        if (response.data.tpl == '') {
                                            $(value.insertClass + ' .ajax-loading').css("background", "#fff").html(value.emptyInfo);
                                        } else {
                                            $(value.insertClass).html(response.data.tpl);
                                            lazyLoadImage.init($(value.insertClass));
                                            if (response.data.pager.has_more == 1) {
                                                var next_cursor = response.data.pager.next_cursor;
                                                $(value.moreButton).show();
                                                $(value.moreButton).click(function() {
                                                    $(this).addClass("loading");
                                                    $.ajax({
                                                        type: "get",
                                                        url: value.url,
                                                        data: {
                                                            number: number,
                                                            next_cursor: next_cursor
                                                        },
                                                        success: function(response2) {
                                                            $(value.moreButton).removeClass("loading");
                                                            if (response2.code == 0) {
                                                                $(value.insertClass).append(response2.data.tpl);
                                                                lazyLoadImage.init($(value.insertClass));
                                                                if (response2.data.pager.has_more == 0) {
                                                                    $(value.moreButton).hide();
                                                                } else {
                                                                    next_cursor++;
                                                                }
                                                            }
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    }
                                }
                            });
                            $(value.page).data("flag", "1");
                        }
                        $(value.page).show();
                    } else {
                        $(value.page).hide();
                    }
                })
            } else {
                $(this).removeClass('active');
            }
        });
    }

    /**
     *主页tab切换 */
    var tabChange = function() {
        var tab = container.find('.tab');
        var page = [{
            "number": 0,
            "page": ".main-page"
        }, {
            "number": 1,
            "page": ".course-page",
            "url": "/org/course_ajax",
            "insertClass": ".course-list-ajax",
            "moreButton": ".more-course-ajax",
            "emptyInfo": "暂时没有课程信息"
        }, {
            "number": 2,
            "page": ".teacher-page",
            "url": "/org/teacher_ajax",
            "insertClass": ".teacher-list-ajax",
            "moreButton": ".more-teacher-ajax"
        }, {
            "number": 3,
            "page": ".active-page",
            "url": "/org/news_ajax",
            "insertClass": ".dynamic-list-ajax",
            "moreButton": ".more-dynamic-ajax",
            "emptyInfo": "暂时没有动态信息"
        }];
        tab.on('click', '.title', function(e) {
            var number = orgNum;
            var title = tab.find('.title');
            var curNumber = $(this).data('number');
            tabClick(title, curNumber, number, page);
        })
    };

    //start bottom tools==============================================

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
            if (util.platform.isIOS()) {
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
            "c_id": '' + orgNum,
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
            "c_id": '' + orgNum,
            "c_role": "6",
            "group_id": ""
        };

        bindCourseClick.initChat(container.find('.im-button'), param);


        /*if (isApp && (currentVersionNumber >= supportVersionNumber)) {

         container
         .on('click', '.im-button', function (e) {


         if (!store.get('user_number')) {
         appController.getUserInfo(function () {
         location.reload();
         appController.imChat(param);
         });
         } else {
         appController.imChat(param);
         }
         });
         }
         else {
         bindCourseClick.initChat(container.find('.im-button'));
         }*/


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
    }

    //var moreCourse = function () {
    //    var number = orgNum;
    //    var more_course = $(".more-course");
    //    more_course.click(function () {
    //        $(window).scrollTop(0);
    //        $('html,body').animate({scrollTop: 0}, 'slow');
    //        $('.ul-tab .active').removeClass("active").next().addClass("active");
    //        if ($(".course-page").data("flag") == 0) {
    //            $.ajax({
    //                type: "get",
    //                url: "/org/course_ajax",
    //                data: {number: number, next_cursor: 1},
    //                success: function (response) {
    //                    if (response.code == 0) {
    //                        var next_cursor = response.data.pager.next_cursor;
    //                        if (response.data.tpl == '') {
    //                            $(".course-list-ajax .ajax-loading").css("background", "none").html("暂时没有课程信息");
    //                        } else {
    //                            $(".course-list-ajax").html(response.data.tpl);
    //                            lazyLoadImage.init($(".course-list-ajax"));
    //                            if (response.data.pager.has_more == 1) {
    //                                $(".more-course-ajax").show();
    //                                $(".more-course-ajax").click(function () {
    //                                    $(".more-course-ajax").addClass("loading");
    //                                    $.ajax({
    //                                        type: "get",
    //                                        url: "/org/course_ajax",
    //                                        data: {
    //                                            number: number,
    //                                            next_cursor: next_cursor
    //                                        },
    //                                        success: function (response2) {
    //                                            $(".more-course-ajax").removeClass("loading");
    //                                            if (response2.code == 0) {
    //                                                $(".course-list-ajax").append(response2.data.tpl);
    //                                                lazyLoadImage.init($(".course-list-ajax"));
    //                                                if (response2.data.pager.has_more == 0) {
    //                                                    $(".more-course-ajax").hide();
    //                                                } else {
    //                                                    next_cursor++;
    //                                                }
    //                                            }
    //                                        }
    //                                    });
    //                                });
    //                            }
    //                        }
    //                    }
    //                }
    //            });
    //            $(".course-page").data("flag", "1");
    //        }
    //        $('.main-page').hide();
    //        $(".course-page").show();
    //    })
    //};

    var moreTeacher = function() {
        var number = orgNum;
        var more_teacher = $(".more-teacher");
        more_teacher.click(function() {
            $(window).scrollTop(0);
            $('.ul-tab .active').removeClass("active").next().next().addClass("active");
            var $teacher = $(".teacher-page");
            if ($teacher.data("flag") == 0) {
                $.ajax({
                    type: "get",
                    url: "/org/teacher_ajax",
                    data: {
                        number: number,
                        next_cursor: 1
                    },
                    success: function(response) {
                        var next_cursor = response.data.pager.next_cursor;
                        if (response.code == 0) {
                            var $meDom = $(".teacher-list-ajax");
                            $meDom.html(response.data.tpl);
                            lazyLoadImage.init($meDom);
                            if (response.data.pager.has_more == 1) {
                                $meDom.show();
                                $meDom.click(function() {
                                    $(".more-teacher-ajax").addClass("loading");
                                    $.ajax({
                                        type: "get",
                                        url: "/org/teacher_ajax",
                                        data: {
                                            number: number,
                                            next_cursor: next_cursor
                                        },
                                        success: function(response2) {
                                            $meDom.removeClass("loading");
                                            if (response2.code == 0) {
                                                $meDom.append(response2.data.tpl);
                                                lazyLoadImage.init($meDom);
                                                if (response2.data.pager.has_more == 0) {
                                                    $(".more-teacher-ajax").hide();
                                                } else {
                                                    next_cursor++;
                                                }
                                            }
                                        }
                                    });
                                });
                            }
                        }
                    }
                });
                $(".teacher-page").data("flag", "1");
            }
            $('.main-page').hide();
            $teacher.show();
        })
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
     * 地图自适应逻辑
     * @type {Object}
     */
    var addressMap = {

        // map的长宽比
        ratio: 1.5,

        addAddressMap: function() {
            var me = this;
            var width = me.getMapWidth();
            var height = Math.round(width / me.ratio);
            var position = (eval(store.get('position')));
            var positionArr = [];
            var position_lng_lat = [];
            $.each(position, function(key, value) {
                if (value.lng != null && value.lat != null) {
                    positionArr.push(value.lng + ',' + value.lat);
                    position_lng_lat.push(value);
                }
            });
            if (positionArr.length == 0) {
                $(".org-map").hide();
            } else {
                var positionStr = positionArr.join("|");
                var url = me.getMapUrl({
                    longitude: position_lng_lat[0].lng,
                    latitude: position_lng_lat[0].lat,
                    lnt_lat: positionStr,
                    width: width,
                    height: height
                });

                var address = $('.course-address');
                var addressImage = address.find('img');
                addressImage.attr('src', url);
            }


            //address.css({
            //    height: height
            //});

        },

        getMapWidth: function() {
            return $(window).width() - 20;
        },

        /**
         * 获取地图的的img
         * @param  {Object} options
         * @property {number} options.longitude   经度
         * @property {number} options.latitude    纬度
         * @property {number} options.width       宽度
         * @property {number} options.height      高度
         */
        getMapUrl: function(options) {
            return '' + 'https://api.map.baidu.com/staticimage?' + 'center=' + options.longitude + ',' + options.latitude + '&width=' + options.width + '&height=' + options.height + '&zoom=14&markers=' + options.lnt_lat + '&copyright=1';
        }

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
     * 点击顶部评价和粉丝跳转到评价页面*/
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

    // 点击课程分类的跳转链接
    var courseType = function() {
        container
            .on('click', '.type-name', function() {
                var url = $(this).data('url');
                if (url.indexOf('?') > -1) {
                    url = url + '&group_id=' + $(this).data('id');
                } else {
                    url = url + '?group_id=' + $(this).data('id');
                }

                if (isApp) {
                    appController.openNewWindow(url);
                } else {
                    location.href = url;
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

    // 点击全部视频/照片
    var morePhoto = function() {
        container
            .on('click', '.more-photo', function() {
                var url = $(this).data('url');
                if (isApp) {
                    appController.openNewWindow(url);
                } else {
                    location.href = url;
                }
            });
    };

    function doYuyue(orgNum, orgName) {
        //预约试听
        var _staySingle = new StaySingle({
            org_num: orgNum || "",
            subject_name: orgName|| ""
        });
        container.on("click", ".btn-stay-single", function() {
            _staySingle.show({
                title: $(this).text()
            });
        });
    }

    // 第一次请求更多动态信息
    var page = 1;

    var moreCourse = function() {
        var teacherPage = container.find('.active-page');
        page = 2;
        teacherPage
            .on('click', '.more-button', function() {
                ajaxCourse($(this), page);
            });

    };

    var ajaxCourse = function(element, currentPage) {
        var main = element.closest('#main');
        element.find('.more-loading').show();
        element.find('.character').hide();
        $.ajax({
            type: "post",
            url: '/i/huike_courses/' + store.get('pages')['number'],
            data: {
                page: currentPage,
                course_type : store.get('pages')['course_type'],
                render: 'json'
            },
            success: function(response) {
                if (response.code == 0) {
                    var html = moreRender({
                        courses: response.data.courses
                    });
                    main.find('.courseList').append(html);
                    lazyLoadImage.init();
                    element.find('.more-loading').hide();
                    if (response.data.pages.has_more) {
                        element.find('.character').show();
                        page += 1;
                    } else {
                        element.hide();
                    }

                }
            }
        });
    };

    return {
        init: function() {
            pageData = page_data;

            orgNum = store.get('number');
            var orgName = store.get('org_name');
            var is_sem = store.get('is_sem');
            doYuyue(orgNum, orgName);

            bottomAction.init(orgNum);
            var SemCourseInfo = {
                name: orgName,
                orgName: null,
                type: 'org',
                number: orgNum,
                kind: '',
            };
            if (is_sem && !appController.isTeacherApp() && !appController.isOrgApp()) {
                chengduSem(SemCourseInfo);
                $('.im-button').attr('data-tel', '4000630083');
            }
            isApp = appController.isApp();

            morePhoto();

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

            moreCourse();

            videoPlay();
            //teacherImagEvent();
            consult();
            var positionNum = store.get("position_num");
            if (positionNum > 0) {
                addressMap.addAddressMap();

                // 重绘地图
                $(window).on('resize', function() {
                    addressMap.addAddressMap();
                });
            }

            //显示限时优惠倒计时
            container_CD.each(function(index, element) {
                element = $(element);
                var data = element.data();
                var startTime = data.start;
                var endTime = data.end;

                countDown.init(element, {
                    start: startTime,
                    end: endTime
                });
            });

            // 主页tab切换
            //tabChange();

            qrCodeClick();

            backTop();

            // by caoying 注释 2015-11-28 改为调用新的分享接口
            //appController.setFavouriteInfo(
            //    JSON.parse(store.get('favorite_info') || '{}')
            //);
            // setShare(JSON.parse(store.get('share_info')));

            //share.init();

            countFeature();

            countIntro();

            //moreCourse();

            //moreTeacher();

            //var tab = store.get("tab");
            //if (tab != '') {
            //    $(".ul-tab .active").trigger("click");
            //}

            bottomHide();

            comment();

            courseType();

            //courseDetail();
            // by caoying 注释之前的预约试听逻辑
            // appointClick();

            // by caoying 增加菜单栏
            navBar.init();

            // by caoying 增加新的预约试听逻辑
            appointOrg();

            var url = download({
                type: 'student'
            });

        }
    };
});
