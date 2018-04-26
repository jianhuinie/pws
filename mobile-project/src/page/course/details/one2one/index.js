/**
 * Created by chenmo on 15/12/10.
 */
define(function(require, exports) {

    'use strict';
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var bindCourseClick = require('common/bindCourseClick');
    var lazyLoadImage = require('common/lazyLoadImage');
    var ImagePlayer = require('common/ui/ImagePlayer/ImagePlayer_v2');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var StaySingle = require("common/staySingle/staySingle");
    var backTop = require('common/backTopButton');
    var getAppUrl = require('common/download/getAppUrl');
    var appController = require('common/app');
    var appoint = require('common/appoint/appoint');
    var setShare = require('common/share/initialize');
    var cityMgr = require('common/city_mgr');
    var qrcode = require('common/qrcode');
    var observer = require('common/mvc/observer');
    var doShare = require('common/share/doShare');
    // var tianxiaoLog = require('common/tianxiaoLog');
    var service = require('common/service');
    var navBar = require('common/navBar');
    // var store = require('common/store');
    var util = require('common/util');
    var ui = require('common/ui');
    var Comment = require("common/comment");
    var chengduSem = require('common/chengduSem');
    var WeChatLoginDialog = require('common/weChatLogin/weChatLogin');
    var bottomAction = require('../component/courseBottom/one2oneBottom');
    //var courseAds = require('common/component/courseAds');
    var liudanClickLog = require('common/liudanClickLog/liudanClickLog');
    var habo = require('common/component/analysis/habo/index');
    var urlUtil = require('util/url_v2');
    var topAction = require('page/_common/top/classDetail');
    var artTemplate = require('artTemplate');
    var stagingRender = artTemplate.compile(require('text!../component/staging/stagingOne2oneCourse.tpl'));

    var valueAddedServices = require('../component/valueAddedServices/valueAddedServices');
    var chooseCourse = require('../component/chooseCourse/index');
    var submit = require('../component/courseBottom/purchase');
    var imgTextAction = require('../component/courseDetails/index');
    var qrCodeAction = require('../component/courseBottom/qrCodeAction');
    var appSkipInit = require('common/appSkipInit');

    var comment;
    var container = $('#main');
    var dialog = null;
    var audioLoaded = 0;
    var scriptData;
    var value;
    var isApp;
    var userInfo;
    var appVersion;
    var isStudentApp;
    var isWeixin;
    var stagingFlag = false;
    var checkPrice = 0;

    // hurry: 修改为动态获取
    var query = urlUtil.parseQuery(location.search);
    var from = '';
    if (query.from) {
        from = '&from=' + query.from;
    }
    // var from = '';
    // if (location.search.indexOf('from=ICBC') > -1) {
    //     from = '&from=ICBC';
    // }


    var LESSON_WAY_MAP = {
        teacher: '老师上门',
        student: '学生上门',
        online: '在线授课',
        discuss: '双方协商'
    };

    function getPayURL (params) {
        return '/pay/productDetail?' + $.param(params);
    }

    /**
     * 计算学生与老师的距离
     */
    function countDistance() {
        var lat = '';
        var lng = '';
        var disContainer = container.find('.address .title');
        var disText = disContainer.text();
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
                disContainer.text(disText + distance + 'km');
            }
        }, function() {}, false);
    }

    /**
     * 老师介绍向下展开
     */
    function spreadAll() {
        var e_count = scriptData.e_count;
        var spread = container.find('.spread');

        var flag = false;
        //是否显示向下展开按钮

        var showContent = container.find('.other-info .show-content');
        var hideContent = container.find('.other-info .content-hide');
        var height = showContent.height();
        var hideHeight = hideContent.height();
        if (!spread) {
            return;
        } else {
            if ((e_count && e_count > 2) || hideHeight > height) {
                spread.show();
            }
            //展开事件绑定
            spread.on('click', function() {

                if ($(this).attr('data-flag') == 'down') {
                    $(this).attr('data-flag', 'up');
                    $(this).html('<i class="icon icon-angle-up"></i>');
                    showContent.hide();
                    hideContent.show();
                    if (e_count && e_count > 2) {
                        $('.ex-clip').hide();
                        $('.ex-all').show();
                    }

                } else {
                    $(this).attr('data-flag', 'down');
                    $(this).html('<i class="icon icon-angle-down"></i>');
                    showContent.show();
                    hideContent.hide();
                    if (e_count && e_count > 2) {
                        $('.ex-clip').show();
                        $('.ex-all').hide();
                    }
                }
            });
        }

    }

    /**
     * 获取IM数据
     * @returns {*}
     */
    function getImData() {
        var param;
        var imFlag = true;
        var arrayIm = JSON.parse(scriptData.im_data);

        if (arrayIm != null) {
            imFlag = arrayIm instanceof Array
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
     * 咨询
     */
     /*
    function consult() {
        var param = getImData();
        var consultBtn = container.find('.consulation');
        var chatBtn = container.find('.chat');

        var defaultConsult = consultBtn.find(".zxkf")[0];

        $(consultBtn).click(function(e) {
            if (defaultConsult) {
                liudanClickLog.send({
                    stype: 4
                })
            }
        });

        if (!defaultConsult) {

            $(".list-bottom-a").attr("href", "javascript:void(0)");

            bindCourseClick.initChat(consultBtn, param);
        }
        bindCourseClick.initChat(chatBtn, param);
    }*/

    /**
     * 收藏
     */
    function favorAction() {
        var favorBtn = container.find('.favor');
        favorBtn.on('click', function() {

            var me = $(this);
            var favor = me.find('img');
            var favorText = me.find('div');
            var favorImg = scriptData.favor_img;
            var unfavor = scriptData.unfavor;
            var model = scriptData.page_model;

            service.favorCollection({
                number: scriptData.teacher_number,
                type: scriptData.favor_type,
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
                        //.addClass(model);
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

    /**
     * 更新价格
     * @param price
     */
    function refreshPrice(price) {
        var priceBox = $('.total-price .price');
        var model = scriptData.page_model;
        var chooseContent = $('.choose-content');
        function getStagingInfo (price) {
             $.ajax({
                 method: 'post',
                 url: '/course/fenqi',
                 data: {
                     money: price
                 },
                 success: function (response) {
                     /*var response = $.parseJSON(response);
                     console.log(response);*/
                     if(response.code == 0){
                         var stagingData = response.data.fenqi_detail;
                         var html = stagingRender({
                             stagingData: stagingData
                         });

                         if(stagingFlag == false) {
                             chooseContent.append(html);
                             stagingFlag = true;
                         } else {
                             chooseContent.find('.one2one-staging').remove();
                             chooseContent.append(html);
                             stagingFlag = true;
                         }

                         /*var txt = $('.buy-content').find('.total-price .sub-button .btn-text');
                         txt.text('分期购买');*/
                         chooseContent.find('.one2one-staging .item').on('click', function () {
                             var that = $(this);
                             that.siblings('.item').each(function (){
                                 var there = $(this);
                                 if(there.hasClass('active')) {
                                     there.removeClass('active');
                                     there.css('background', 'none');
                                 }
                             });

                             if (model == 'default' || model == 'orange') {
                                 that.css('background', '#fc6c21');
                             } else if (model == 'coffee') {
                                 that.css('background', '#795548');
                             } else if (model == 'red') {
                                 that.css('background', '#f95e5e');
                             } else {
                                 that.css('background', '#00bcd4');
                             }

                             var txt = $('.buy-content').find('.total-price .sub-button .btn-text');
                             if(that.hasClass('active')) {
                                 that.removeClass('active');
                                 that.css('background', 'white');
                                 txt.text('确定');
                             } else {
                                 that.addClass('active');
                                 txt.text('分期购买');
                             }
                         });
                     }
                 }
             })
         }
        if (isNaN(price)) {
            priceBox.text('---');
        } else {
            priceBox.text('￥' + price);
            checkPrice = price;
            if(scriptData.is_staging == 1){
                if(price >= 1000 && price <=10000){
                     getStagingInfo(price);
                } else {
                     chooseContent.find('.one2one-staging').remove();
                }
            }
        }
    }

    var gotoTrialLink = function(e) {
        var url = location.origin + $(this).data('href');
        if (isApp) {
            appController.openNewWindow(url);
        } else {
            location.href = url;
        }
    };

    /**
     * 预约试听
     */
     /*
    function tryListen() {
        var status = scriptData.try_status;
        var tryContainer = $('.try-container');
        var tryDiv = $('.bottom .try');
        var purchaseId = scriptData.purchase_id;
        if (status == 0 || status == 3 || status == 6) {
            tryDiv.click(gotoTrialLink);

        } else if (status == 4) {
            tryDiv.click(function() {
                tryContainer.show();
            });
            tryContainer.find(".cancel-pay").click(function() {
                tryContainer.hide();
            });
            tryContainer.find(".pay").click(function() {
                if (isApp) {
                    appController.toThirdPartyPayment(purchaseId);
                } else {
                    window.location.href = '/pay/payProductPurchase?purchase_id=' + purchaseId;
                }
                tryContainer.hide();
            });
        } else if (status == 5) {
            tryDiv.click(function() {
                ui.remind("您不能购买自己的课程");
            });
        } else if (status == 2 || status == 1) {
            tryDiv.click(function() {
                tryContainer.show();
            });
            tryContainer.find(".cancel-pay").click(function() {
                tryContainer.hide();
            });
            tryContainer.find(".pay").click(function() {
                tryContainer.hide();
            });
        } else {
            tryDiv.click(function() {
                var url = location.origin + $(this).data('href');
                if (isApp) {
                    appController.openNewWindow(url);
                } else {
                    location.href = url;
                }
            });
        }
    }*/

    function photosArray() {
        var photos = JSON.parse(scriptData.photos);
        var result = [];
        for (var i = 0, max = photos.length; i < max; i++) {
            result.push(photos[i].img);
        }
        return result;
    }

    /**
     * 音频播放
     */
    function audioPlay() {
        var pressFlag = false;
        var url = scriptData.audioUrl;
        var audioLen = scriptData.audioLen;
        var active_voice_img = scriptData.active_voice_img;
        var voice_img = scriptData.voice_img;
        url = !!url ? ' src="' + url + '"' : '';
        var $audio = $('<audio preload="none" volume="1.0" ' + url + '></audio>');
        var audio = $audio[0];

        $('.audio-icon').on('click', function() {
            var audioStatus = 0;
            var me = $(this);
            if (!pressFlag) {
                //$(this).html('<img class="active" width="100%" height="100%" src="' + active_voice_img + '"/>');
                $(this).addClass('active').find('.static').attr('src', active_voice_img);
                pressFlag = true;
            } else {
                //$(this).html('<img width="100%" height="100%" src="' + voice_img + '"/>');
                $(this).removeClass('active').find('.static').attr('src', voice_img);
                pressFlag = false;
                audio.pause();
                return false;
            }

            if (audioStatus) {
                audio.pause();
                audioStatus = 0;
            } else {
                audio.play();
                audioStatus = 1;

                $(this).addClass('active').find('.static').attr('src', active_voice_img);
            }
            audio.addEventListener('ended', function() {
                audioStatus = 0;

                $(this).removeClass('active').find('.static').attr('src', voice_img);
                pressFlag = false;
            });
            audio.addEventListener('loadeddata', function() {
                audioLoaded = 1;
                $(this).addClass('active').find('.static').attr('src', active_voice_img);
            });
            //倒计时
            audio.addEventListener("timeupdate", function() {
                var overPlus;
                overPlus = (audioLen - this.currentTime);
                var origin_min = scriptData.min;
                var origin_sec = scriptData.sec;
                if (overPlus < 0) {

                    //me.find('.audio-long').text('0' + "'" + '0' + '"');
                    me.find('.audio-long .minute').text('0');
                    me.find('.audio-long .second').text('0');
                    //倒计时到0后时间复原
                    setTimeout(function() {
                        // me.find('.audio-long').text(origin_min + "'" + origin_sec + '"');
                        me.find('.audio-long .minute').text(origin_min);
                        me.find('.audio-long .second').text(origin_sec);
                    }, 1000);
                } else {
                    var min = Math.floor(overPlus / 60);
                    var sec = Math.ceil(overPlus % 60);
                    //me.find('.audio-long').text(min + "'" + sec + '"');
                    me.find('.audio-long .minute').text(min);
                    me.find('.audio-long .second').text(sec);
                }

            });
            $(window).on('beforeunload', function() {
                audio.pause();
                audioStatus = 0;

                //me.html('<img width="100%" height="100%" src="' + voice_img + '"/>');
                $(this).removeClass('active').find('.static').attr('src', voice_img);
                pressFlag = false;
            });
        });
    }

    //下载按钮
    function download() {
        var download = container.find('.download,.app-download');
        var isWeixin = appController.isWeixin();
        var url = getAppUrl('', 'student');
        download.on('click', function() {
            if (isWeixin) {
                location.href = url;
            } else {
                location.href = 'bjhlstudent://o.c';
                setTimeout(function() {
                    location.href = url;
                }, 300);

            }
        });
    }

    /**
     * 编辑课程封面之后的回调
     * @param url 图片url
     */
    var preview = function(data) {
        if (scriptData.isPreview && scriptData.vip_level != 0) {
            $('.page-mask').show();
            $('.head').append($('<div class="edit-background"><img src="https://img.genshuixue.com/0cms/d/file/content/2016/01/56a5cd86ec513.png" /> </div>'));
            var devWidth = $(window).width();
            var devHeight = Math.ceil(devWidth * 0.75);
            $('.head img').attr('src', data.image + '@' + devWidth + 'w_' + devHeight + 'h');
            lazyLoadImage.init();
        }
    };

    /**
     * 老师端编辑课程封面
     */
    function editBackground() {

        if (isApp && appController.isTeacherApp()) {
            if (userInfo && userInfo.number != '') {
                if (userInfo.number == scriptData.teacherNum && scriptData.isPreview && scriptData.vip_level != 0) {
                    appController.setCover(preview);
                    $('.head').on('click', function() {
                        appController.toChangeCover();
                    });
                }
            }
        }
    }


    // 2015-11-24 预约试听
    /*
    var appointCourse = function() {
        container
            .on('click', '#bottom-appointment', function(e) {
                var url = window.location.href;
                var param = {};
                param['courseType'] = 'org';
                param['title'] = scriptData.class_name;
                param['objectId'] = scriptData.class_number;
                param['objectType'] = 'cdb.teacher_course';
                param['detail_url'] = url;
                param['color'] = scriptData.page_model;

                appoint.appoint(param);
            })
    };*/

    /*
    var bottomButton = function() {
        var bottom = $('.bottom');
        var bottomConsult = bottom.find('.consulation');
        if (!isApp) {
            if (!bottomConsult.data('tel')) {
                bottomConsult.addClass('display-none');

            } else if (bottomConsult.data('tel')) {
                bottomConsult.removeClass('display-none');
            }

            if (appController.isWeixin()) {
                bottom.find('.bottom-share').removeClass('display-none');
                /*if (bottomConsult.data('tel') && scriptData.is_trail_class) {
                    bottom.find('.consulation').addClass('small-width');
                    bottom.find('.bottom-share').addClass('small-width');
                }*/
           /* } else {
                bottom.find('.bottom-share').addClass('display-none');
                bottom.find('.consulation').find('.consult-text').removeClass('consult-padding');
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
            bottom.find('.bottom-share').addClass('display-none');
            bottom.find('.favor').show();
            if (scriptData.page_model != "green" && scriptData.is_trail_class) {
                bottom.find('.favor').addClass('small-width');
                bottom.find('.consulation').addClass('small-width');
            }
        }

        bottom.removeClass('display-none');

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

    /*function staySingleInit() {
        var _staySingle = new StaySingle({
            subject_name: scriptData.subject_name_source,
            course_number: scriptData.class_number_source
        });
        $(".bottom-stay-single").click(function() {
            _staySingle.show({
                title: $(this).text()
            });
        });
    };*/

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

    // hurry: 分享有奖
    function setShareReward(shareInfo) {
        if (shareInfo.share_reward) {
            $('.share-reward').show();
        }
    }

    //页面初始化完成后调用init函数
    //注意：store要在init后才可以get到php传出的数据
    exports.init = function(script_data) {
        var sem = script_data.is_sem;
        var SemCourseInfo = {
            name: script_data.courseInfo.name,
            orgName: script_data.orgInfo.name,
            type: 'one2one',
            number: script_data.courseId,
            kind: '老师',
        };
        if (sem && !appController.isTeacherApp() && !appController.isOrgApp()) {
            // chengduSem(SemCourseInfo);
            $('.consult-box').attr('data-tel', '4000630083');
            $('.consult-box').attr('href', 'tel:4000630083');
        }
        comment = new Comment({
            source: "3",
            teacher_number: script_data.teacherNum || "",
            comment_tag_num: script_data.totalNumber || ""
        });

        comment.listenerOne($(".student-comment"));

        window.gsx_ready(function (config) {
            scriptData = script_data;

            //staySingleInit();

            isApp = appController.isApp();
            isStudentApp = appController.isStudentApp();
            appVersion = appController.getAppVersion();
            userInfo = config.user;
            isWeixin = appController.isWeixin();
            var hostStr = window.location.hostname;
            var host = hostStr.split('.');
            var isKaoyan = /kaoyan/g;
            //返回顶部球
            // backTop();
            // tianxiaoLog.send(scriptData.orgNumber, 'one2oneCourse', scriptData.number);
            //初始化value
            if (scriptData.favorStatus) {
                value = 0;
            } else {
                value = 1;
            }
            //设置图片的高度
            var imgLi = container.find('.image li');
            $.each(imgLi, function() {
                $(this).css('height', $(this).width());
            });
            lazyLoadImage.init();
            var isUmeng = (/um_flow_type=gzh/.exec(location.href) || $('.can-app-download-wrapper').attr('data-can-app-download') === '0');
            //顶部菜单栏
            if (!isKaoyan.test(host[0]) && !isUmeng) {
                navBar.init();
            }
            spreadAll();
            qrCodeAction(scriptData);
            //consult();
            favorAction();
            //tryListen();
            audioPlay();
            download();
            editBackground();
            jifenDialog();

            $('.security-block').on('click', function () {
                var that = $(this);
                if(isApp) {
                    appController.openNewWindow(that.data('url'));
                } else {
                    location.href = that.data('url');
                }
            });

            if(!isApp && !isUmeng) {
                topAction({
                    url: location.href,
                    type: 'one2one',
                    video_number: 0
                });
            }
            /*courseAds({
                url: location.href
            });*/

            bottomAction(script_data);

            valueAddedServices();
            chooseCourse();

            imgTextAction();

            var courseInfo = scriptData.courseInfo;
            var params = {
                type: courseInfo.course_type,
                course_number: courseInfo.number,
                lesson_way: (courseInfo.lesson_way == 2) ? 'online' : 'student'
            };

            if (courseInfo.buy_way == 1) {
                submit.purchase(getPayURL(params), isApp, userInfo);
            } else {
                params.hours = 1;

                submit.jumpToPage(getPayURL(params), isApp, userInfo);
            }

            var hostStr = window.location.hostname;
            var host = hostStr.split('.');
            var sHost = host[0];
            var isKaoyan = /kaoyan/g;

            // 是否是 U 盟
            var isUmeng = (/um_flow_type=gzh/.exec(location.href) || $('.can-app-download-wrapper').attr('data-can-app-download') === '0');

            navBar.init();

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
                    "course_type": "one2oneCourse",
                    "course_number": number
                };
                habo.send(postParam);
            });

            // 机构预约试听
            // 机构预约试听改为统一预约试听: 06-12 PM钱丽
             //appointCourse();

            // 在H5中，若非400电话，则隐藏咨询按钮；非微信中隐藏分享
            //bottomButton();

            shareShow();

            // 处理app中a标签的跳转
            appSkipInit();

            //点击显示老师图片大图
            $('.image,.images').on('click', 'li', function() {
                var photos = photosArray();
                new ImagePlayer({
                    datasource: photos,
                    current: $(this).data('index')
                });
            });
            //阻止service中默认的错误处理弹框
            // service.setErrorHandler(function(errorMsg) {
            //
            // });
            //老师端app中隐藏老师头像旁边的咨询按钮
            if (isApp && appController.isTeacherApp()) {
                $('.chat').hide();
            }
            //设置分享
            var shareInfo = JSON.parse(scriptData.shareInfo);
            if (shareInfo) {
                setShare(shareInfo);
            }
            // hurry: 分享有奖
            setShareReward(shareInfo);
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
            //如果是预览页面，显示蒙版,并显示编辑按钮
            if (userInfo && isApp &&
                appController.isTeacherApp() &&
                userInfo.number == scriptData.teacherNum &&
                scriptData.isPreview && scriptData.vip_level != 0) {
                $('.page-mask').show();
                $('.head').append($('<div class="edit-background"><img src="https://img.genshuixue.com/0cms/d/file/content/2016/01/56a5cd86ec513.png" /></div>'));
            }
            //老师端隐藏底栏
            if (appController.isTeacherApp() || appController.isOrgApp()) {
                $('.bottom').hide();
            }
            var fWidth = $('.li-friends').width();
            fWidth = fWidth - 85;
            $('.friends').css('margin-left', fWidth + 'px');

        });

    };
});
