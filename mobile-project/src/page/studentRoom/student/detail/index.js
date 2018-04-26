define(function(require) {
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var fullPageDialog = require('common/ui/FullPageDialog/FullPageDialog');
    var IScroll = require('iscroll');
    var boxList = $('.list-box');
    var wrapper = $('#wrapper');
    var app = require('common/app');
    var openAppWindow = require('common/openAppWindow');
    var Dialog = require("common/ui/Dialog/Dialog");
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var lastTime = require('../../teacher/_part/lastTime');
    var ui = require('common/ui');
    var env = require('util/env');
    var setShare = require('common/share/initialize');
    var user = require('common/user');
    var open400TelDialog = require('common/openAppDialog/open400TelDialog');
    var isApp;
    var pageData;
    var myScroll;
    var update = false;
    var nextPageUrl = '/recommend/closeAndChangeTeacher';
    var template = require('artTemplate');
    var liRender = template.compile(require('text!./list.tpl'));
    var contactRender = template.compile(require('text!../../_part/contact.tpl'));
    var observer = require('common/mvc/observer');
    var url = require('util/url');
    var ajaxUrl = '/hall-student/get';
    var recordNumber = url().params.number;
    var ajaxFlag = true;
    var phoneFlag = true;
    var goodFlag = true;
    var slideDialog;
    var shareMask = $('.share-mask');
    var deviceRatio = window.devicePixelRatio;


    var classConfig = {
        '1': '一对一',
        '2': '线下班课',
        '3': '视频课',
        '8': '直播课'
    };

    var fullHeight = function () {
        //计算wrpper和scroller高度，高度不够就进行填充
        var wHeight = wrapper.height();
        var sHeight = boxList.height();
        var offHeight = wHeight - sHeight;
        var fullBox = $('.full-box');
        if (page_data.is_own) {
            offHeight += 200 * deviceRatio;
        }
        if(offHeight > 0) {
            fullBox.css('height', (offHeight + 40) * deviceRatio + 'px');
        } else {
            fullBox.css('height', 20 * deviceRatio + 'px');
        }
    };

    //正则裁剪老师头像
    var cutTeacherImage = function (img) {
        var jpgReg = /\.(jpg)$/i;
        var pngReg = /\.(png)$/i;
        var jpegReg = /\.(jpeg)$/i;
        var newImg = '';

        var s = img.slice(-5); //截取最后五个字符进行匹配
        if(jpgReg.test(s) || jpegReg.test(s)) {
            newImg = img + '@90w_90h_2x_70Q_0i_1e_1c_1wh_1pr.jpg';
        } else if (pngReg.test(s)) {
            newImg = img + '@1x_70Q_1o_90w_90h_1e_1c.src';
        }
        return newImg;
    }

    var findImg = function () {
        $('.last-nav-has-teacher').find('.teacher-infos .teacher-box .avatar-image').each(function (){
            var that = $(this);
            var img = that.data('src');
            var returnImg = cutTeacherImage(img);
            that.attr('src', returnImg);
        });
    }

    var listScroll = function() {
        myScroll = new IScroll('#wrapper', { probeType: 2, interactiveScrollbars: true, startY: -40, click: true });
        var pullToRefresh = $('.pull-to-refresh .pull-text');
        var pullIndicator = $('.pull-to-refresh .pull-indicator');
        var pullSpinner = $('.pull-to-refresh .pull-spinner');
        var pullRefresh = $('.pull-to-refresh');

        /*滑动的时候*/
        myScroll.on('scroll', function() {
            pullRefresh.css('display', 'inline-block');
            boxList.css('margin-top', 4 * deviceRatio + 'px');

            if (this.y > 10 && update === false) {
                update = true;
                pullToRefresh.html('释放更新');
                pullIndicator.addClass('arrow-rotate-180');
            }

            /*当手指划出屏幕的时候会有没反应，所以滑到最下时就应该自动弹回去*/
            if (update === true) {
                if(window.innerHeight - this.pointY < 1) {
                    myScroll.scrollTo(0, -(40 * deviceRatio), 300);
                }
            }
        });

        /*手指松开的时候*/
        myScroll.on('scrollEnd', function() {
            //下拉刷新
            if (this.y > -(40 * deviceRatio)) {
                if (update === false && this.y <= 0) {
                    myScroll.scrollTo(0, -(40 * deviceRatio), 300);
                } else {
                    pullIndicator.css('display', 'none');
                    pullToRefresh.css('display', 'none');
                    pullSpinner.css('display', 'block');
                    update = false;
                    myScroll.scrollTo(0, -(40 * deviceRatio), 300);
                    pullToRefresh.html('下拉刷新');
                    pullIndicator.removeClass('arrow-rotate-180');
                    pullSpinner.css('display', 'none');
                    pullIndicator.css('display', 'inline-block');
                    pullToRefresh.css('display', 'inline-block');
                    if(ajaxFlag === true){
                        ajaxFlag = false;
                        service.post(ajaxUrl,
                        {
                            number: recordNumber,
                            render: 'json'
                        },
                        function (res) {
                            if(res.code === 0){
                                var html = liRender({
                                    item: res.data.item,
                                    teacherInfos: res.data.joined_teachers_info,
                                    recommendCourses: res.data.recommend_courses,
                                    is_own: res.data.is_own
                                });

                                boxList.html(html);
                                format();
                                fullHeight();
                                closeDialog();
                                changeOne();
                                findImg();
                                threeWayCall();
                                lastTime();
                            }
                            ajaxFlag = true;
                        });
                    }
                }
            }
            myScroll.refresh();
        });
    };


    //操作关闭弹框 绑定事件
    var closeDialog = function () {

        var dialog = $('.dialog');
        var question = $('.question');
        var mask = $('.mask');

        var imChat = boxList.find('.im-chat');
        var iClose = boxList.find('.close-icon');
        var iCourseTitle = boxList.find('.course-title');
        var notSuit = boxList.find('.not-suit');

        var closeReason = dialog.find('.close-reason');
        var closeReasonConfirm = dialog.find('.close-reason-confirm');
        var deleteTeacher = dialog.find('.delete-teacher');
        var deleteTeacherConfirm = dialog.find('.delete-teacher-confirm');
        var downloadTip = dialog.find('.download-tip');
        var downloadApp = dialog.find('.download-app');

        // 要删除的一条 jq包装
        var delItem = {};
        closeReason.on('click', '.cancel', function () {
            closeReason.hide();
            mask.hide();
        });
        closeReason.on('click', '.confirm', function () {
            closeReason.hide();
            closeReasonConfirm.show();
        });

        closeReasonConfirm.on('click', '.cancel', function () {
            closeReasonConfirm.hide();
            mask.hide();
        });

        closeReasonConfirm.on('click', '.confirm', function () {
            service
            .post(
                '/hall-student/close',
                {
                    number: url().params.number
                },
                function(res) {
                    if (res.code === 0) {
                        boxList.find('.recommend-courses').html('');
                        boxList.find('.last-nav-has-teacher').html('');

                        iClose.hide();
                        iCourseTitle.show();
                        closeReasonConfirm.hide();
                        mask.hide();
                    }
                }
            );
        });

        deleteTeacher.on('click', '.cancel', function () {
            deleteTeacher.hide();
            mask.hide();
        });
        deleteTeacher.on('click', '.confirm', function () {
            deleteTeacher.hide();
            deleteTeacherConfirm.show();
        });

        deleteTeacherConfirm.on('click', '.cancel', function () {
            deleteTeacherConfirm.hide();
            mask.hide();
        });

        deleteTeacherConfirm.on('click', '.confirm', function () {

            var pNode = delItem.parent().parent();
            var teacherInfos = boxList.find('.last-nav-has-teacher');
            var teacherNumber = delItem.attr('data-number');

            service
            .post(
                '/hall-student/close',
                {
                    number: url().params.number,
                    teacher_number: teacherNumber
                },
                function(res) {
                    if (res.code === 0) {
                        deleteTeacherConfirm.hide();
                        pNode.remove();
                        mask.hide();
                        var count = boxList.find('.teacher-infos').length;
                        if (count == 0) {
                            boxList.find('.none-teacher').show();
                        }
                        boxList.find('.first span').html('报名老师 (' + count + '/5)');
                    }
                }
            );
        });

        iClose.on('click', function() {
            mask.show();
            closeReason.show();
        });

        notSuit.on('click', function () {
            mask.show();
            deleteTeacher.show();
            delItem = $(this);
            return false;
        });

        mask.on('click', function () {
            // 提示下栽的遮罩层点击消失
            if (downloadTip.css('display') == 'block') {
                downloadTip.hide();
                mask.hide();
            }

        });

        imChat.on('click', function () {
            var downloadTip = dialog.find('.download-tip');
            if (!isApp) {
                mask.show();
                downloadTip.show();
            }

            var currentTeacher = $(this).parent().parent();

            var userInfo = user.getUserInfo();
            if ((userInfo && !userInfo.number) || !userInfo) {
                app.send('anonymousIM');
            }
            else {
                var params = {
                    c_role: '0',
                    c_id: currentTeacher.attr('data-number')
                };
                app.send('IM', params);
            }

        });

        downloadApp.on('click', function () {
            // 修改下载路径
            location.href = 'https://m.genshuixue.com/app/dw?t=s&ct=';
            // location.href = 'http://m.genshuixue.com/app?target=student';
        });

    };

    //换一个的Ajax
    var changeOne = function() {
        var teacherInfos = $('.last-nav-has-teacher');
        teacherInfos.on('click', '.notsuit', function() {
            var me = $(this);
            var pNode = me.parent().parent();
            var teacherNumber = $(this).attr('data-number');

            service
            .post(
                '/hall-student/close',
                {
                    number: url().params.number,
                    teacher_number: teacherNumber
                },
                function(res) {
                    if (res.code === 0) {
                        pNode.remove();
                        var count = boxList.find('.teacher-infos').length;
                        if (count == 0) {
                            boxList.find('.none-teacher').show();
                        }
                        boxList.find('.first span').html('报名老师 (' + count + '/5)');
                    }
                }
            );
        });
    };

    var addFillInfo = function() {
        var jockUrl = location.origin + '/recommend/fill_info?source=genshuixue&page_type=index-index&type=list';
        Jockey.send('setToFillInfo', {
            url: jockUrl
        });
    };

    // 做跳转处理
    var jumpPage = function () {
        boxList.on('click', '.teacher-box', function (e) {
            // 找到 teacher-infos
            var that = $(this).parent();
            var dom = e.target;
            var teacherPageUrl = that.data('url');
            dom = $(dom);
            if(!(dom.hasClass('notsuit')
                || dom.hasClass('contact')
                || dom.hasClass('teacher-good')
                || dom.hasClass('good-container')
                || dom.hasClass('like-number')
                || dom.hasClass('icon-like')
                || dom.hasClass('im-chat'))
            )
            {
                if(isApp) {
                    openAppWindow.open(teacherPageUrl);
                }
                else {
                    location.href = teacherPageUrl;
                }
            }
        });

        boxList.on('click', '.teacher-live-lesson', function (e) {
            var url = $(this).attr('data-url');
            if(isApp) {
                openAppWindow.open(url);
            }
            else {
                location.href = url;
            }
        });

        boxList.on('click', '.recommend-courses .image', function (e) {
            var url = $(this).attr('data-url');
            if(isApp) {
                openAppWindow.open(url);
            }
            else {
                location.href = url;
            }
        });

        // 点赞
        boxList.on('click', '.teacher-good', function (event) {
            var span = $(this).find('.like-number');
            var number = $(this).find('.like-number').html();
            var me = $(this);
            if (goodFlag) {
                goodFlag = false;
                if (me.hasClass('like')) {
                    service.post('/hall-student/cancelLike', {
                        teacher_id: $(this).data('objectid'),
                        object_type: '1',
                        record_number: page_data.item.number
                    }, function (response) {
                        if (response.code === 0) {
                            me.removeClass('like');
                            number--;
                            span.html(number);
                            if (number === 0) {
                                span.hide();
                            }
                        } else if (response.code === 990000) {
                            user.loginStudent();
                        }
                        goodFlag = true;
                    });
                } else {
                    service.post('/hall-student/addLike', {
                        teacher_id: $(this).data('objectid'),
                        object_type: '1',
                        record_number: page_data.item.number
                    }, function (response) {
                        if (response.code === 0) {
                            me.addClass('like');
                            number++;
                            span.html(number);
                            span.show();
                        } else if (response.code === 990000) {
                            user.loginStudent();
                        }
                        goodFlag = true;
                    });
                }
            }
            event.stopPropagation();
            return false;
        });
    };

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
        //隔一秒才能再次打
        var listener = observer.addListener(dialog, 'display_changed', function () {
            var display = this.get('display');
            phoneFlag = true;
            if (!display) {
                observer.removeListener(listener);
                listener = null;
                dialog.destroy();
                dialog = null;
            }
        });
    }

    //三方通话
    var threeWayCall = function() {
        var teacherInfos = $('.last-nav-has-teacher');
        teacherInfos.on('click', '.contact', function () {
            var that = $(this);
            if (phoneFlag === true) {
                phoneFlag = false;
                service.post('/bell_system/getCallUrl', {
                    number: that.data('number'),
                    user_type: 0,
                    green_wall: 3001
                }, function(res) {
                    if (res.code === 0) {
                        var data = res.data;
                        if (data.call_url) {
                            callPage(data.call_url);
                        }
                    }
                });
            }
        });
    };

    var format = function () {

        var obj = [
            {
                el: boxList.find('.tag'), // 数组
                dataName: 'data-type',
                format: function () {
                    var elArr = this.el;
                    var dataName = this.dataName;
                    elArr.each(function (index, ele) {
                        var value = $(ele).attr(dataName);
                        $(ele).html(classConfig[value]);
                    });
                }
            },
            {
                el: boxList.find('.price'),
                dataName: 'data-price',
                format: function () {
                    var elArr = this.el;
                    var dataName = this.dataName;

                    elArr.each(function (index, ele) {
                        var value = $(ele).attr(dataName);
                        if (value == 0) {
                            $(ele).html('免费');
                        }
                        else {
                            $(ele).html('￥' + value);
                        }
                    });
                }
            }
        ];

        for(var i = 0, len = obj.length; i < len; i++) {
            obj[i].format();
        }

    }

    /**
     * 拨打电话对话框
     * @return {[type]} [description]
     */
    function alertDialogInit () {
        $('.phone').on('click', function () {
            service.post('/call-service/call', {
                target: $(this).data('number')
            }, function (response) {
                if (response.code === 0) {
                    var alertDialog = new Dialog({
                        'position': 'absolute',
                        'closeButton': false,
                        'title': '联系老师',
                        'content': ''
                        + '<div class="top-info">'
                        +     '平台为了保护双方隐私，暂不提供对方真实号码，请通过拨打我们提供的虚拟号码联系老师，多谢！'
                        + '</div>'
                        + '<div class="bottom-info">'
                        +     '请使用号码为' + response.result.caller_number + '的电话进行拨号，'
                        +     '拨打“虚拟号码”<a class="call-virtual" href="tel:' + response.result.virtual_mobile + '">' + response.result.virtual_mobile + '</a>联系老师。'
                        + '</div>',
                        'width': 435 * deviceRatio + 'px',
                        'buttons': [
                            {
                                type: 'cancel',
                                content: '取消'
                            },
                            {
                                type: 'ok',
                                content: '立即拨打'
                            }
                        ]
                    });
                    alertDialog.show();
                    alertDialogStyle();
                    alertDialogEvent(response.result.virtual_mobile);
                }
            });
        });
    }

    function alertDialogEvent (number) {
        $('.GSX_Dialog_skin_ok').on('click', function () {
            // location.href = 'tel:' + number;
            open400TelDialog.makePhoneCall(number);
        });
    }

    function contactDialog () {
        var html = contactRender({
            teacherItem: page_data.joined_teachers_info,
            mobile: page_data.user_mobile
        });
        var dialog = new SlideInDialog({
            title: '联系老师',
            content: html
        });
        slideDialog = dialog;
        $('.contact').on('click', function () {
            if ($(this).hasClass('no-teacher')) {
                ui.remind('暂无老师报名');
            } else {
                dialog.show();
            }
        });
        $('.icon-close').on('click', function () {
            dialog.hide();
        });
        alertDialogInit();
    }

    /**
     * 给弹出的对话框增加样式
     * @return {[type]} [description]
     */
    function alertDialogStyle () {
        $('.GSX_Dialog_default').css({
            'padding': '0',
            'border-radius': 10 * deviceRatio + 'px'
        });
        $('.GSX_Dialog_default a').css({
            'font-size': 18 * deviceRatio + 'px',
            'color': '#0076ff',
            'text-decoration': 'underline'
        });
        $('.GSX_Dialog_title').css({
            'height': 50 * deviceRatio + 'px',
            'text-align': 'left',
            'padding': 15 * deviceRatio + 'px',
            'color': '#fff',
            'font-size': 17 * deviceRatio + 'px',
            'background': '#ff6c00'
        });
        $('.top-info').css({
            'font-size': 14 * deviceRatio + 'px',
            'color': '#9d9d9e',
            'border-bottom': '1px solid #dcddde',
            'padding': 15 * deviceRatio + 'px 0'
        });
        $('.bottom-info').css({
            'font-size': 14 * deviceRatio + 'px',
            'border-top': '1px solid #dcddde',
            'padding': 15 * deviceRatio + 'px 0'
        });
    }

    /**
     * 下滑窗口IM咨询
     * @return {[type]} [description]
     */
    function consult() {
        var consultIcon = $('.im-chat');
        consultIcon.on('click', function () {
            var mask = $('.mask');
            var downloadTip = $('.download-tip');
            if (!isApp) {
                mask.show();
                downloadTip.show();
                slideDialog.hide();
            } else {
                var userInfo = user.getUserInfo();
                if ((userInfo && !userInfo.number) || !userInfo) {
                    app.send('anonymousIM');
                }
                else {
                    var params = {
                        c_role: '0',
                        c_id: $(this).data('number') + ''
                    };
                    app.send('IM', params);
                }
            }

        });
    }

    function shareInit() {
        $('.recommend-box').on('click', function () {
            if (page_data.item.status == 1) {
                var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
                var isQQ = env.thirdapp && env.thirdapp.isQQ;
                var isWeibo = env.thirdapp && env.thirdapp.isWeibo;
                if (isApp) {
                    app.send('doSharePanel', {});
                } else if (isWeixin || isQQ || isWeibo){
                    shareMask.show();
                } else {
                    ui.remind('点击浏览器分享按钮，快快分享给小伙伴吧～');
                }
            } else {
                ui.remind('抱歉，只能分享正在进行中的生源～');
            }
        });
        $('.share-mask').on('click', function () {
            shareMask.hide();
        });
    }

    var doShare = function () {
        var shareInfo = {
            title : '一位学生正在找教授' + pageData.item.subject_name + '的老师，快去看看!',
            content : '在跟谁学上发现一个好生源，再不看就要被别人抢走啦！',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d111770ce5b.png',
            url : location.href.replace('student', 'teacher')
        };
        if (page_data.item.status == 1) {
            setShare(shareInfo);
        }
    };

    return function(page_data) {
        pageData = page_data;
        isApp = app.isApp();
        if (isApp) {
            wrapper.css('top', '0');
        } else {
            wrapper.css('top', 40 * deviceRatio + 'px');
        }
        openAppWindow.init();

        format();
        contactDialog();

        fullHeight();
        findImg();
        // addFillInfo();
        listScroll();
        jumpPage();
        closeDialog();
        changeOne();
        // 倒计时
        lastTime();
        threeWayCall();
        boxList.css('margin-top', 25 * deviceRatio + 'px');
        consult();
        shareInit();
        doShare();
        // myScroll.scrollTo(0, -40, 300);
    };
});