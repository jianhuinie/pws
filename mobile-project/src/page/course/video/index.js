/**
 * 视频课模板
 * @author hurry
 * @date   2017/1/18
 */
define(function(require, exports) {
    'use strict';

    var ui = require('common/ui');
    var lazyLoadImage = require('common/lazyLoadImage');
    var countDown = require('common/countDown/countDown');
    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');
    var util = require('common/util');
    var appController = require('common/app');
    var openAppWindow = require('common/openAppWindow');
    var setShare = require('common/share/initialize');
    // var setShare = require('common/function/setShare');
    var navBar = require('common/navBar');
    var service = require('common/service');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var doShare = require('common/share/doShare');
    var StaySingle = require('common/staySingle/staySingle');
    var liudanClickLog = require('common/liudanClickLog/liudanClickLog');
    var chengduSem = require('common/chengduSem');
    var clickLog = require('common/log-click');
    var WeChatLoginDialog = require('common/weChatLogin');
    var openApp = require('common/app_wakeup');
    var env = require('util/env');
    var urlUtil = require('util/url_v2');
    var topAction = require('common/topAction/oneAndVideo');
    var Comment = require('common/comment');
    var coupon = require('common/component/coupon/coupon');
    var Loading = require('common/ui/Loading/index');
    var relatedCourseUtil = require('common/component/course/relatedCourse/index');
    var BottomAction = require('common/courseBottom/videoBottom/videoBottom');
    var habo = require('common/component/analysis/habo/index');
    var materialUtil = require('common/component/course/material/index');
    var inter = require('common/component/interactLayer/index');
    var backToTop = require('common/backTopButton');

    var navTab = require('./component/navTab/navTab');
    var player = require('./component/player');
    var stagingUi = require('./component/staging');
    var tabComment = require('./component/comment/comment');
    var weixinMask = require('common/component/wxMask/weixinMask');

    // hurry: 修改为动态获取
    var query = urlUtil.parseQuery(location.search);
    var from = '';
    if (query.from) {
        from = '&from=' + query.from;
    }

    var container = $('#container');
    var slideDialog = null;
    var isApp;
    var isTeacherApp;
    var isStudentApp;
    var userInfo;
    var number = "";
    var type = "";
    var appVersion;
    var host;
    var hostStr;
    var comment;
    var scriptData;
    var isUmeng;
    var hiddenDownload;

    // 分享信息
    var shareInfo;
    // 老师信息
    var teacherInfo;

    /**
     * 视频库真题库聚会学广告位回流统计
     * @param  {[type]} flag [description]
     * @return {[type]}      [description]
     */
    function clickLog_init(flag) {
        clickLog.init();
        clickLog.config('video-class-redirect', function(element, defaultParams) {
            var logData = $(element).data();
            defaultParams.type = 'video-class-redirect';
            defaultParams.stype = logData.type;
            defaultParams._postUrl = "https://pb0.genshuixue.com/gs.gif";
        });
    }

    /**
     * courseID : 视频课ID
     * sectionID : 课节ID
     * video : 视频信息，当sectionID改变时异步获取，如获取为不能播放的视频，则值为false
     * preface : 视频预览图
     * */
    var model = new MVCObject();

    var isIOS7 = util.platform.isIOS() && util.platform.getAppleOSVersion() <= 7;

    function VideoList() {

    }

    util.inherits(VideoList, MVCObject);

    /**
     * number: 视频课id
     * preface: 预览图
     * current: 当前课节
     * items: 所有课节
     * video: 当前课前的视频信息
     * */
    var videoCourseInfo = null;
    var loginStatus = null;

    var playing = false;

    function checkLogin(callback, autoLogin) {
        if (appController.isApp()) {
            appController.checkLogin(function(response) {
                var isLogin = !!Number(response.isLogin);
                if (!isLogin) {
                    if (autoLogin) {
                        appController.getUserInfo(function(response) {
                            setTimeout(function() {
                                callback(!!response);
                            }, 0);
                        });
                    } else {
                        callback(false);
                    }
                } else {
                    callback(true);
                }
            });
        } else if (loginStatus && loginStatus.success) {
            callback(true);
        } else {
            if (loginStatus && loginStatus.loginUrl && autoLogin) {
                jumpLoginPage()
            } else {
                callback(false);
            }
        }
    }

    function jumpLoginPage() {
        if (appController.isApp()) {
            appController.getUserInfo(function(response) {
                if (!response) {
                    ui.alert('登陆失败');
                } else {
                    setTimeout(function() {
                        window.location.reload();
                    });
                }
            });
        } else if (loginStatus) {
            jumpPage(loginStatus.loginUrl);
        }
    }

    function jumpPage(url) {
        if (from) {
            url = url + from;
        }
        if (appController.isApp()) {
            if (isLinkAddress(url)) {
                appController.openNewWindow(url);
            }
        } else {
            window.location = url;
        }
    }

    function isBlackList(callback) {
        $.ajax({
            url: './checkBlackList',
            data: {
                'number': videoCourseInfo.number
            },
            method: 'post',
            dataType: 'json',
            async: true
        }).done(function(res) {
            var resCode = +res.code;
            if (resCode === 0) {
                var resData = res.data;
                if (resData.black_list_limited) {
                    ui.alert('抱歉，老师已将您加入黑名单，暂时无法购买该老师的课程。');
                } 
                else if (callback && typeof callback === 'function') {
                    callback();
                }
            }
            else if (resCode === 401) {
                //没登录，跳转登录页
                if (appController.isApp()) {
                    appController.getUserInfo(function () {
                        location.reload();
                    });
                } else {
                    var loginDialog = new LoginDialog();
                    loginDialog.show();
                    var listener1 = observer.addListener(
                        loginDialog, 
                        'success',
                        function () {
                            // arguments.callee(callback);
                            isBlackList(callback);
                        }
                    );
                    var listener2 = observer.addListener(loginDialog, 'display_changed', function () {
                        var display = this.get('display');
                        if (!display) {
                            observer.removeListener(listener1);
                            observer.removeListener(listener2);
                            loginDialog && (loginDialog.destroy());
                        }
                    });
                    // var loginDialog = new LoginDialog({
                    //     autoReload: true
                    // });
                    // loginDialog.show();
                }
                // hurry: 禁止service的默认处理
                return false;
            }
        });
    }

    function collect() {
        $.ajax({
            url: './addFree',
            data: {
                'number': videoCourseInfo.number
            },
            method: 'post',
            dataType: 'json',
            async: true
        }).done(function (result) {
            var resultCode = Number(result.code);
            if (resultCode == 0) {
                if (appController.isApp()) {
                    Jockey.send('toPayResult', {
                        purchase_id: result.data.purchase_id,
                        pay_status: 0
                    });
                } else {
                    location.href = '/pay/result?purchase_id=' + result.data.purchase_id;
                }
            } else if (resultCode == 401 || resultCode == 200002) {
                //jumpLoginPage();
                //没登录的情况下弹框处理
                var isWeixin = WeChatLoginDialog.isWeixin();
                var successFun = function () {
                    $.ajax({
                        url: './addFree',
                        data: {
                            'number': videoCourseInfo.number
                        },
                        method: 'post',
                        dataType: 'json',
                        async: true
                    }).done(function (response) {
                        var responseCode = Number(response.code);
                        if (responseCode == 0) {
                            if (appController.isApp()) {
                                Jockey.send('toPayResult', {
                                    purchase_id: response.data.purchase_id,
                                    pay_status: 0
                                });
                            } else {
                                location.href = '/pay/result?purchase_id=' + response.data.purchase_id;
                            }
                            // ui.remind("成功加入课程");
                            // $('#add-my-video').hide();
                            // $('#start-play').show();
                            // setTimeout(function () {
                            //     location.reload();
                            // }, 500);
                        } else if (responseCode == 100037) {
                            $('#add-my-video').hide();
                            $('#start-play').show();
                            setTimeout(function () {
                                location.reload();
                            }, 500);
                        }
                        setTimeout(function () {
                            location.reload();
                        }, 500);
                    });
                };
                if (isWeixin && !isUmeng) {
                    // 非U盟，u盟不能使用微信登陆
                    WeChatLoginDialog.addWechatDialog(location.href, successFun);
                } else {
                    var loginDialog = new LoginDialog();
                    loginDialog.show();
                    var listener1 = observer.addListener(loginDialog, 'success', successFun);
                    var listener2 = observer.addListener(loginDialog, 'display_changed', function () {
                        var display = this.get('display');
                        if (!display) {
                            observer.removeListener(listener1);
                            observer.removeListener(listener2);
                            loginDialog && (loginDialog.destroy());
                        }
                    });
                }
            } else {
                ui.remind(result.msg);
            }
        });
    }

    function checkOrder(courseNumber, callback) {
        checkLogin(function(isLogin) {
            if (isLogin) {
                $.ajax({
                    url: '/video_course/checkVideoOrder',
                    dataType: 'jsonp',
                    data: {
                        'course_number': courseNumber
                    }
                }).done(function(result) {
                    var resultCode = Number(result.code);
                    if (resultCode == 0) {
                        if (result.data.status == 0) {
                            callback(true);
                        } else {
                            showDialog(result.data);
                        }
                    } else if (resultCode == 401 || resultCode == 200002) {
                        jumpLoginPage();
                    } else {
                        ui.alert(result.msg);
                    }
                });
            } else {
                ui.alert('登陆失败');
            }
        }, true);
    }

    function showDialog(data) {
        if (isIOS7) {
            $('#player-frame').css({
                top: -9999
            });
        }
        var uiConfirm = ui.confirm({
            content: data.content,
            button_ok: data.text,
            button_cancel: '取消',
            forceShow: true
        });
        uiConfirm.done(function() {
            var url = data.url;
            if (isIOS7) {
                $('#player-frame').css({
                    top: 0
                });
            }
            jumpPage(getAbsoluteLink(url));
        });
        uiConfirm.fail(function() {
            if (isIOS7) {
                $('#player-frame').css({
                    top: 0
                });
            }
        });
    }

    function initModel_video() {

        var classIntroduce = $('.class-introduce');

        var prefaceCover = $('#video-image-panel');
        function send(sectionID, autoLogin) {

            service.post('/video_course/getCheckCode', {
                'number': model.get("courseID"),
                'section_id': sectionID
            }).done(function (result) {
                var currentSectionID = model.get('sectionID');
                if (currentSectionID == sectionID) {
                    var resultCode = Number(result.code);
                    if (result.code == 0) { //成功
                        if (result.data.can_access) {
                            if (scriptData.is_juhuixue) {
                                classIntroduce.find('.price').removeClass('display-hidden');
                                classIntroduce.find('.price').addClass('display-show');
                            }
                            model.set("video", result.data.video);
                            // 暂时注释掉，等能监听到视频播放完毕之后，再改变播放状态
                        } else {
                            model.set("video", false);
                        }
                    } else if (resultCode == 401 || resultCode == 200002) {
                        //没登陆,跳转登陆页
                        if (autoLogin) {
                            checkLogin(function(isLogin) {
                                if (isLogin) {
                                    send(sectionID);
                                } else {
                                    ui.alert('登陆失败');
                                }
                            }, true);
                        } else {
                            ui.alert('用户未登录');
                        }
                    } else {
                        ui.alert(result.msg);
                    }
                }
            });
        }

        observer.addListener(model, "sectionid_changed", function() {
            var sectionID = model.get("sectionID");
            prefaceCover.hide();
            send(sectionID, true);
        });
    }

    function initUI_catalogue() {
        //切换tab
        var listener = observer.addListener(model, 'video_changed', function() {
            var video = model.get('video');
            if (video) {
                //这个函数卸载html页面里
                navTab.changeTab($('.class-catalogue'));
                observer.removeListener(listener);
                listener = null;
            }
        });

        // function updateListItemStyle() {
        //     var sectionID = model.get('sectionID');
        //     var video = model.get('video');

        //     if (video && sectionID) {
        //         $('#class-catalogue tr[section_id]').removeClass();
        //         $('#class-catalogue tr[section_id=' + sectionID + ']').addClass('playing');
        //     }
        // }

        // observer.addListener(model, 'sectionid_changed', updateListItemStyle);
        // observer.addListener(model, 'video_changed', updateListItemStyle);
    }

    function getShiTingSectionID() {
        var sectionId;
        // hurry: 章节模式，1：多节模式，2：章节模式
        var items = scriptData.video_items || scriptData.video_items_chapter;
        $.each(items, function(index, item) {
            if (item.item_list && item.item_list.length) {
                $.each(item.item_list, function (i, v) {
                    if (+v.pay_status === 3) {
                        sectionId = v.section_id;
                        return false;
                    }
                });
            }
            if (sectionId) {
                return false;
            }
            if (item.pay_status == 3) {
                sectionId = item.section_id;
                return false;
            }
        });
        return sectionId;
    }

    function initUI_preface() {
        var listener = observer.addListener(model, 'video_changed', function() {
            var video = model.get('video');
            if (video) {
                $('#video-preface').hide();
                observer.removeListener(listener);
                listener = null;
            }
        });
    }

    function initUI_startPlay() {
        var listener = observer.addListener(model, 'video_changed', function() {
            var video = model.get('video');
            if (video) {
                $('#start-play').animate({
                    top: 0
                }, 300);
                observer.removeListener(listener);
                listener = null;
            }
        });
    }

    function initUI_payTip() {

        function check() {
            var sectionID = model.get('sectionID');
            var videoInfo = model.get('video');
            if (sectionID && videoInfo === false) {
                //show
                $('#pay-tip').show();
            } else if (sectionID && videoInfo) {
                //hide
                $('#pay-tip').hide();
            }
        }

        observer.addListener(model, 'sectionid_changed', check);
        observer.addListener(model, 'video_changed', check);
    }

    function initVideoFrame(videoData) {
        var len = videoCourseInfo.number.length;
        var width = $('#video-container').width();
        var url;
        if (len == 11) {
            url = videoData.video_play_url;
        }
        else {
            url = videoData.video_play_url + '&width=' + width + '&inset=1';
        }

        $('#video-container iframe').remove();
        var videoWrap = $('#video-wrap');
        if (videoData.video_play_url) {
            if (len == 13) {
                var height = parseInt(width) / 4 * 3 + 30;
                //var height = parseInt(width) / 4 * 3 - 30 * deviceRatio;
                videoWrap.css('height', height + 'px');
            }
            $('#video-container').show().append($('<iframe id="player-frame" frameborder="no" src="' + url + '"></iframe>'));
            // 不知道为什么QQ里面播放器高了一点，玲玲说没办法解决，我也很绝望，所以我在这里根据QQ做了特殊处理
            if(env.thirdapp && env.thirdapp.isQQ) {
                var videoWrapHeight = videoWrap.height() + 20;
                videoWrap.css('height', videoWrapHeight + 'px');
            }
        }

        if (window.parent && util.platform.isIOS()) {
            var screenWidth = window.screen.availWidth;
            $('.org-list').css('width', screenWidth);
        }
    }

    function initVideoPlayer(courseInfo, isHide) {
        initVideoFrame({
            video_play_url: courseInfo.video_play_url
        });
        if (isHide) {
            $('#video-container').hide();
        }
        observer.addListener(model, 'video_changed', function() {
            initVideoFrame(model.get('video'));
        });
    }

    function isLinkAddress(href) {
        return !(href.indexOf('http://') == -1 && href.indexOf('https://') == -1);
    }

    function getAbsoluteLink(aElement) {
        var href = util.lang.isString(aElement) ? aElement : aElement.href;
        var newElement = $('<a href="' + href + '"></a>')[0];
        var href = newElement.href;
        if (isLinkAddress(href)) {
            return href;
        } else {
            return false;
        }
    }

    function payVideoCourse() {
        var isStudentApp = appController.isStudentApp();
        if (isStudentApp && appController.getPlatForm() == 'ios') {
            var currentVersionNumber = appController.version2Number(appController.getAppVersion());
            var supportVersionNumber = appController.version2Number('3.0.0');
            if (currentVersionNumber < supportVersionNumber) {
                alert('您当前的版本还不支持视频课购买哦！');
                return;
            }
        }
        var courseNumber = videoCourseInfo.number;
        checkOrder(courseNumber, function(result) {
            if (result) {
                var url = videoCourseInfo.pay_url;
                if (appController.isApp()) {
                    var aElement = $('<a href="' + url + '"></a>')[0]
                    url = aElement.href;
                }
                jumpPage(url);
            }
        });
    }

    function initShare() {
        var url = window.location.href;
        var title = videoCourseInfo.name;
        var content = videoCourseInfo.introduce;
        var img = videoCourseInfo.preface;

        var defaultInfo = {
            url: url,
            title: title + '，效果棒棒哒~',
            content: content,
            img: img
        };
        var options = $.extend({}, defaultInfo);

        options['share_pyq'] = $.extend({}, defaultInfo, {
            title: title + '，效果棒棒哒，快来看看吧~'
        });
        options['share_weibo'] = $.extend({}, defaultInfo, {
            content: title + '，' + content + '，' + url + ' #找好⽼师,上跟谁学#'
        });
        options['share_sms'] = $.extend({}, defaultInfo, {
            content: title + '，' + content + '，点击链接观看 ' + url
        });
        setShare(options);
    }

    // 底部分享图标展示
    var shareShow = function() {
        isApp = appController.isApp();
        var share = $('.share-course');
        share.removeClass('hide');
        if (isApp && !isTeacherApp) {
            share.find('.app-share').removeClass('display-none');
            share.find('.m-share').addClass('display-none');
        } else {
            share.find('.app-share').addClass('display-none');
            share.find('.m-share').removeClass('display-none');
        }

        //app中朋友圈分享
        container.on('click', '.li-friends', function() {
            if (isApp && appVersion >= '3.0.2') {
                doShare('share_pyq', shareInfo.share_pyq);
            }

        });
        //app中微信分享
        container.on('click', '.li-weixin', function() {
            if (isApp && appVersion >= '3.0.2') {
                doShare('share_weixin', shareInfo.share_weixin);
            }
        });
        container
        .on('click', '.juhuixue-tip', function (e) {
            var postParam = {
                "type": "redirect",
                "stype": 1,
                "course_type": "video_course",
                "course_number": videoCourseInfo.number
            };
            var postUrl = "https://pb0.genshuixue.com/gs.gif";
            WAT.send(postUrl, postParam);
        })
        .on('click', '.video-courses-link', function (e) {
            var postParam = {
                "type": "redirect",
                "stype": 2,
                "course_type": "video_course",
                "course_number": videoCourseInfo.number
            };
            var postUrl = "https://pb0.genshuixue.com/gs.gif";
            WAT.send(postUrl, postParam);
        })
    };

    /**
     *显示二维码
     */
    var showQrcode = function() {
        var element = $('.qrcode-container');
        element.fadeIn(100);

    };

    /**
     * 隐藏二维码
     */
    var hideQrcode = function() {
        var element = $('.qrcode-container');
        element.hide();
    };
    var qrCodeClick = function() {
        var qrCode = container.find('.share-course');
        var qrContainer = $('.qrcode-container');
        var init = false; //检测二维码是否已经初始化
        qrCode.on('click', '.m-qrcode,.qrcode', function() {
            if (!init) {
                init = true;
                service.getShortUrl(scriptData.qrcode_url).done(function(response) {
                    if (response.code == 0) {
                        qrcode({
                            text: response.data.short_url,
                            width: 300,
                            height: 300,
                            element: $('#qrcode')
                        });
                    } else {
                        init = false;
                    }
                });
            }
            showQrcode();
        });
        qrContainer.on('click', '.icon', function() {
            hideQrcode();
        });
    };

    /**
     * 课程图文详情处理
     */
    function initDragLoadDetail() {

        // 判断是否含有课程图文
        var detail = videoCourseInfo.detail;
        if (!detail) {
            // 没有就拉倒
            return;
        }
        loadDetail();

        function removeTouchEvent() {
            container.off('touchend.drag');
            container.off('touchmove.drag');
        }

        function animateScroll(endY) {
            var cY = window.scrollY;
            var speed = (endY - cY) / 20;
            var lastScrollY = cY + speed;
            window.scrollTo(0, lastScrollY);
            var roCount = 1;
            var intival = setInterval(function() {
                if (roCount >= 20) {
                    clearInterval(intival);
                    window.scrollTo(0, endY);
                } else {
                    lastScrollY += speed;
                    window.scrollTo(0, lastScrollY);
                }
                roCount++;
            }, 10);
        }


        /*执行加载*/
        function loadDetail() {
            var $classDetail = $('.panel-block');
            var fillContent = function(content) {
                $classDetail.append('<div class="detail-panle-block">' + content + '</div>');
                lazyLoadImage.init($classDetail);
            };
            fillContent(detail);
        }
    }

    // 视频课顶部banner广告位，只有从视频课聚合页和单个课程详情页点击进入视频课详情页才加顶部banner广告位
    var bannerShow = function() {
        var referrer = document.referrer;
        if (referrer.indexOf("/activity/model4/all_zuowen") > 0 || referrer.indexOf("/activity/model4/all_greatparents3") > 0) {
            $('.page_ads_content').show();
        }
        $('.page_ads_content')
            .on('click', '.close-banner', function() {
                $(this).closest('.page_ads_content').hide();
            });

    };

    // 在老师app中，屏蔽底部按钮——评价和收藏
    var bottomButton = function() {
        var bottom = $("#fixed-bottom");
        if (isTeacherApp) {
            bottom.find('.enter-comment').hide();
            bottom.find('.share').hide();
            bottom.find('#start-play').hide();
            bottom.find('#add-my-video').hide();
            // PM韩炀要求老师端隐掉分享按钮
            bottom.find('.add-favor').hide();
        }
    };

    // 在非微信以及非QQ中隐藏分享按钮
    var shareButton = function() {
        var bottom = $("#fixed-bottom");
        if (!isApp) {
            if (appController.isWeixin() || env.thirdapp.isQQ) {
                bottom.find('.share').removeClass('display-none');
            } else {
                bottom.find('.share').addClass('display-none');
            }

            bottom
                .on('click', '.share', function() {
                    $('.share-mask').show();
                    $('[name="control_top"]').css('z-index', '5');
                });
            $('.share-mask').click(function() {
                $(this).hide();
            })
        } else {
            bottom.find('.share').addClass('display-none');
        }

    };

    // 相关课程链接，在学生端app中视频课需要打开native页面，其余课程打开H5页面;在老师端app，需要打开H5页面
    var relativeCourse = function() {
        container
            .on('click', '.recommend-item', function() {
                var url = $(this).data('href');
                var type = $(this).data('type');
                var number = $(this).data('number');


                if (url.indexOf('genshuixue.com') < 0) {
                    url = location.origin + url;
                }

                if (isStudentApp) {
                    if (type == "3") {
                        var param = {};
                        param['number'] = number;
                        param['index'] = '';
                        appController.toVideoCourse(param);
                    } else {
                        appController.openNewWindow(url);
                    }
                }
                // 阻止云端视频课跳转native页面
                // 直播回放售卖需求 By shubaiqiao
                if (isTeacherApp || isStudentApp) {
                    appController.openNewWindow(url);
                } else {
                    location.href = url;
                }
            });
    };

    //
    var staySingleInit = function(number) {
        var _staySingle = new StaySingle({
            teacher_number: teacherInfo && teacherInfo.number
        });
        container.on("click", "#stay-single", function() {
            _staySingle.show();
        });
    };

    var jifenDialog = function() {
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

    };

    //视频课吊起APP功能
    var wakeUpApp =  function () {
        if (!isApp && !env.thirdapp.isWeixin && !env.thirdapp.isQQ) {
            var schemaUrl = 'bjhlstudent://o.c?a=video_course&number=' + videoCourseInfo.number;
            openApp({
                type: 'internal',
                url: decodeURIComponent(schemaUrl)
            }, function (isSuccess) {
                if(!isSuccess) {
                    location.href = 'https://m.genshuixue.com/app/dw?t=s&ct=';
                }
            });
        } 
    };

    //第一次播放给后端发送播放请求
    function onePlay(data) {
        var param = {
            section_id: data.current_item.section_id,
            number: data.number
        };
        service.sendPlay(param);
    }

    //判断是否显示关于跟谁学大学内容
    function showCollege() {
        //截取source参数
        var index = location.search.indexOf('source') + 7;
        var end = location.search.indexOf('source') + 18;
        var para = location.search.slice(index, end);
        if (para == 'gsx_college') {
            container.find('.college-tip').show();
            container.find('.money-rent').hide();
        }
        container.find('.college-tip').on('click', function () {
            var url = location.origin + '/tcenter/gsx_college/index';
            if (appController.isApp()) {
                appController.openNewWindow(url);
            } else {
                window.location = url;
            }
        });
    }

    function init() {
        BottomAction(scriptData);
        initEvent();
    }

    // 初始化事件处理
    function initEvent() {
        navTab.init({
            comment: comment,
            scriptData: scriptData
        });
        player.catalogue(model);
        player.tryListen(model, videoCourseInfo);
        tabComment.init(comment, scriptData);
        stagingUi.init(scriptData);
        $('.class-course-coupon').on('click', function () {
            var teacherInfo = scriptData.teacher_info;
            var orgInfo = scriptData.org_info;
            var loading = new Loading();
            loading.show();
            coupon.init({
                teacher_number: (teacherInfo && teacherInfo[0].number) || (orgInfo && orgInfo.number),
                course_number: videoCourseInfo.number,
                user_role: teacherInfo ? 0 : 6,
            }).then(function () {
                loading.destroy();
            });
        });
        relatedCourseUtil.init();
        // click的统一上报处理
        habo.initClick();
        // scroll的统一上报处理
        habo.initScroll();
        materialUtil.init(container);
    }

    //页面初始化完成后调用init函数
    exports.init = function (script_data) {
        scriptData = script_data;
        // 是否是 U 盟
        isUmeng = script_data.is_u_meng;
        hiddenDownload = script_data.hidden_download;
        // 页面级变量统一放这里
        videoCourseInfo = scriptData.course_info;
        shareInfo = scriptData.share_info;
        teacherInfo = scriptData.teacher_info;
        loginStatus = scriptData.loginStatus || '';
        isApp = appController.isApp();
        appVersion = appController.getAppVersion();
        isTeacherApp = appController.isTeacherApp();
        isStudentApp = appController.isStudentApp();
        hostStr = window.location.hostname;
        host = hostStr.split('.');
        userInfo = window.page_data.user;
        comment = new Comment({
            source: "3",
            teacher_number: (teacherInfo && teacherInfo.number) || "",
            comment_tag_num: scriptData.comment_info.additional.total_number || ""
        });
        init();
        var playCount = 0;
        window.addEventListener('message', receiveMessage);
        function receiveMessage(event) {
            if (event.origin.indexOf('genshuixue.com') < 0) return;
            if (event.data === 'start play') {
                container.find('.juhuixue-img').hide();
                container.find('.juhuixue-tip').hide();
            }
            else if (event.data === 'first play') {
                if (playCount < 1) {
                    playCount++;
                    /* add @2016-05-10 PM王攀增加点击到课率统计，后端李照升 */
                    $.get('/study_history/setHistory?video_course_number=' + videoCourseInfo.number);

                    onePlay(videoCourseInfo);
                }
                navTab.changeTab($('li[tab-div|="class-catalogue"]'));
            }
        }
        clickLog_init();

        $("#kf-tel").click(function() {
            liudanClickLog.send({
                stype: 4
            });
        });

        //预约试听
        staySingleInit();

        var container_CD = $('.countdown');

        //显示限时优惠倒计时
        var countDownList = scriptData.countDownList;
        if (countDownList) {
            var startTime = countDownList.start_time;
            var endTime = countDownList.end_time;
            if (startTime && endTime) {
                startTime = startTime.replace(new RegExp("-","gm"),"/");
                endTime = endTime.replace(new RegExp("-","gm"),"/");
                startTime = Math.floor(Date.parse(startTime) / 1000);
                endTime = Math.floor(Date.parse(endTime) / 1000);
            }

            countDown.init(container_CD, {
                start: startTime,
                end: endTime
            });
        }
        var is_sem = scriptData.is_sem;
        var SemCourseInfo = {
            name: videoCourseInfo.name,
            orgName: (scriptData.org_info && scriptData.org_info.name) || (teacherInfo && teacherInfo[0].name),
            type: 'videoCourse',
            number: videoCourseInfo.number,
            kind: '老师',
        };
        if (is_sem && !appController.isTeacherApp() && !appController.isOrgApp()) {
            chengduSem(SemCourseInfo);
            $('#kf-tel').attr('href', 'tel:4000630083');
        }

        var isKaoyan = /kaoyan/g;
        var isJinyou = /jinyou/g;
        lazyLoadImage.init();
        openAppWindow.init();

        model.set("courseID", videoCourseInfo.number);

        setShare(shareInfo);

        initVideoPlayer(videoCourseInfo, true);

        //第一次开始播放时，切换到课程目录的tab下, 并高亮某一课节
        initUI_catalogue();

        //遮罩层在点击baner图触发事件，开始播放时隐藏遮罩层
        initUI_preface();

        //开始播放时，隐藏‘开始播放’按钮
        initUI_startPlay();

        //点击播放时，如需付费，显示付费提示
        initUI_payTip();

        //初始化model的video属性，当sectionID发生改变时，异步请求video信息
        initModel_video();

        // 页面底部分享图标展示
        // hurry: 隐藏：BUG #58103
        // shareShow();

        // 二维码弹窗
        qrCodeClick();

        // 显示跟谁学大学banner
        showCollege();

        // 点击学分tab的弹窗
        jifenDialog();

        //彭学良需求 在机构App中点击我要购买和加入课程弹窗文案改变,评价文案也要相应改变
        var pay_url = videoCourseInfo.pay_url;
        if (!appController.isOrgApp()) {
            $('.pay-button').click(function() {
                location.href = pay_url;
            });
        } else {
            $('#add-my-video').click(function() {
                //点击加入免费课程中加入课程
                ui.alert('机构APP内暂不支持将视频课加入课程列表');
            });
            $('#pay').click(function() {
                ui.alert('机构APP内暂不支持购买付费视频课');
            });
            $('.enter-comment').click(function() {
                ui.alert('机构APP内暂不支持评价视频课');
            });
            $('.pay-button').click(function() {
                ui.alert('机构APP内暂不支持购买付费视频课');
            });
        }
        //头部交互
        if (!isApp && !hiddenDownload) {
            topAction({
                url: location.href,
                type: 'video',
                video_number: videoCourseInfo.number,
                scale: 1
            });
        }

        // 顶部banner广告位
        bannerShow();

        bottomButton();

        // 在非微信以及非QQ中隐藏分享按钮
        shareButton();

        // 相关课程跳转
        relativeCourse();

        window.gsx_ready(function (config) {
            // 图文详情
            initDragLoadDetail();
        });

        //video baner图点击
        $('#video-image-panel').click(function() {
            /* add @2016-05-10 PM王攀增加点击到课率统计，后端李照升 */
            $.get('/study_history/setHistory?video_course_number=' + videoCourseInfo.number);

            if (videoCourseInfo.can_access) {
                model.set('sectionID', videoCourseInfo.current_item.section_id);
            } else if (videoCourseInfo.has_free_item) {
                model.set('sectionID', getShiTingSectionID());
            } else {
                model.set('sectionID', videoCourseInfo.current_item.section_id);
            }
        });

        //点击下载吊起APP详情页
        $('.video-download').click(function () {
            wakeUpApp();
            if (env.thirdapp.isWeixin || env.thirdapp.isQQ) {
                weixinMask.openMask('open');
            }
        });

        $('#start-play').click(function() {
            player.autoPlay(model, videoCourseInfo);
        });

        $('#class-catalogue tr').click(function() {
            model.set('sectionID', $(this).attr('section_id'));
        });

        $('#free').click(function() {
            model.set('sectionID', getShiTingSectionID());
        });

        if (!appController.isOrgApp()) {
            $('#add-my-video').click(function() {
                isBlackList(collect);
            });
        }

        if (!appController.isOrgApp()) {
            $('#pay').click(function () {
                // 增加老师app调起浏览器购买课程 2016-1-23
                var me = $(this);
                var isTeacherApp = appController.isTeacherApp();
                var url = videoCourseInfo.pay_url;
                if (url.indexOf('genshuixue.com') < 0) {
                    url = location.origin + url;
                }
                if (from) {
                    url += from;
                }
                if (isTeacherApp) {
                    var currentVersionNumber = appController.version2Number(appController.getAppVersion());
                    var supportVersionNumber = appController.version2Number('2.9.1');
                    if (currentVersionNumber < supportVersionNumber) {
                        alert('您当前的版本还不支持视频课购买哦！');
                        return;
                    } else {
                        appController.toBrowser(url);
                        return;
                    }
                }

                var isStudentApp = appController.isStudentApp();
                if (isStudentApp && appController.getPlatForm() == 'ios') {
                    var supportVersionNumber = appController.version2Number('3.0.0');
                    if (currentVersionNumber < supportVersionNumber) {
                        alert('您当前的版本还不支持视频课购买哦！');
                        return;
                    } else {
                        appController.toBrowser(url);
                        return;
                    }
                }
                var payUrl = me.data('url');
                var courseNumber = me.data('course-number');

                if (from) {
                    payUrl += from;
                }

                $.ajax({
                    url: '/video_course/checkVideoOrder',
                    dataType: 'json',
                    data: {
                        'course_number': courseNumber
                    }
                }).done(function(response) {
                    var code = Number(response.code);
                    var mydata = response.data;

                    // 未登录情况下
                    if (code === 401 || code === 200002) {
                        var isWeixin = WeChatLoginDialog.isWeixin();
                        if (isWeixin && !isUmeng) {
                            // 非U盟，u盟不能使用微信登陆
                            WeChatLoginDialog.addWechatDialog(payUrl, function (){
                                $.ajax({
                                    url: '/video_course/checkVideoOrder',
                                    dataType: 'json',
                                    data: {
                                        'course_number': courseNumber
                                    }
                                }).done(function(response2) {
                                    var mydata2 = response2.data;
                                    if (mydata2.status == 1) {
                                        ui.confirm({
                                            content: mydata2.content,
                                            button_ok: mydata2.text,
                                        }).done(function() {
                                            location.href = mydata2.url;
                                        });
                                    } else if (mydata2.status == 2) {
                                        //$('#pay').hide();
                                        $('#start-play').show();
                                        setTimeout(function() {
                                            location.reload();
                                        }, 100);
                                    } else {
                                        location.href = payUrl;
                                    }
                                });
                            });
                        } else {
                            var loginDialog = new LoginDialog();
                            loginDialog.show();
                            var listener1 = observer.addListener(loginDialog, 'success', function() {
                                // location.reload();
                                $.ajax({
                                    url: '/video_course/checkVideoOrder',
                                    dataType: 'json',
                                    data: {
                                        'course_number': courseNumber
                                    }
                                }).done(function(response2) {
                                    var mydata2 = response2.data;
                                    if (mydata2.status == 1) {
                                        ui.confirm({
                                            content: mydata2.content,
                                            button_ok: mydata2.text,
                                        }).done(function() {
                                            location.href = mydata2.url;
                                        });
                                    } else if (mydata2.status == 2) {
                                        //$('#pay').hide();
                                        $('#start-play').show();
                                        setTimeout(function() {
                                            location.reload();
                                        }, 100);
                                    } else {
                                        location.href = payUrl;
                                    }
                                });
                                    //goBuyUrl(href);
                                    /*me.attr('disabled', false);
                                    $('.enrolling').click();*/
                            });
                            var listener2 = observer.addListener(loginDialog, 'display_changed', function() {
                                var display = this.get('display');
                                if (!display) {
                                    observer.removeListener(listener1);
                                    observer.removeListener(listener2);
                                    loginDialog && (loginDialog.destroy());
                                }
                            });
                        }
                    } else if (mydata.status == 1) {
                        ui.confirm({
                            content: mydata.content,
                            button_ok: mydata.text,
                        }).done(function() {
                            if (from) {
                                location.href = mydata.url + from;
                            }
                            else {
                                location.href = mydata.url;
                            }
                        });
                        //location.href = location.origin + payUrl;
                    } else if (mydata.status == 2) {
                        //$('#pay').hide();
                        $('#start-play').show();
                        setTimeout(function() {
                            location.reload();
                        }, 100);
                    } else {
                        location.href = payUrl;
                    }
                    //});
                });
                // payVideoCourse();
                if (appController.isApp()) {
                    return false;
                }
            });
        }

        if (appController.isApp()) {
            $('#pay-tip .pay-button').click(function() {
                payVideoCourse();
                return false;
            }).attr('href', 'javascript:void(0)');
            $('a[data-teacher-number]').click(function() {
                appController.redirectTeacherDetail($(this).attr('data-teacher-number'));
                return false;
            }).attr('href', 'javascript:void(0)');
        } else {
            // hurry:非app显示下载
            $('#video-download-wrap').show();
        }
        // by caoying 新增菜单栏
        if (!isKaoyan.test(host[0])) {
            navBar.init();
        }

        gsx_ready(function(config) {
            if (!util.object.isEmpty(config.user)) {
                number = config.user.number;
                type = config.user.type;
            }
        });

        // 阻止云端视频课跳转native页面
        // 直播回放售卖需求 By shubaiqiao
        if (appController.isStudentApp()) {
            appController.toVideoCourse({
                'number': videoCourseInfo.number,
                'index': 0
            });
        }

        // 设置这个属性，不唤起app
        if (!query.sourceType) {
            wakeUpApp();
        }
        // yunaye: 免单邀请卡互动浮层
        inter.init(videoCourseInfo.number, 2, 3, 1);

        // 回到顶端
        backToTop.init({
            scale: 1
        });
    };
});
