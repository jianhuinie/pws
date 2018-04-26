define(function (require) {
    'use strict';
    var $ = require('zepto');
    var IScroll = require('iscroll');
    var fullPageDialog = require('common/ui/FullPageDialog/FullPageDialog');
    var boxList = $('.list-box');
    var recommend = $('.recommend');
    var wrapper = $('#wrapper');
    var wrapperFooter = $('#wrapper-footer');
    var wrapperDialog = $('#wrapper-dialog');
    var shareMask = $('.share-mask');
    var observer = require('common/mvc/observer');
    var service = require('common/service');
    var app = require('common/app');
    var otherList = require('../_part/list');
    var lastTime = require('../_part/lastTime');
    var setShare = require('common/share/initialize');
    var openAppWindow = require('common/openAppWindow');
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var Dialog = require("common/ui/Dialog/Dialog");
    var template = require('artTemplate');
    var env = require('util/env');
    var user = require('common/user');
    var open400TelDialog = require('common/openAppDialog/open400TelDialog');
    var liRender = template.compile(require('text!./list.tpl'));
    var recommendRender = template.compile(require('text!./recommend.tpl'));
    var dialogRender = template.compile(require('text!./dialog.tpl'));
    var dialogChooseCourse = template.compile(require('text!./dialogChooseCourse.tpl'));
    var downloadTipRender = template.compile(require('text!./downloadTip.tpl'));
    var errorTipRender = template.compile(require('text!./errorTip.tpl'));
    var contactRender = template.compile(require('text!../../_part/contact.tpl'));
    var url = require('util/url');
    var ui_new = require('common/ui');
    var isApp;
    var pageData;
    var myScroll;
    var slideDialog;
    var goodFlag = true;
    var update = false;
    var ajaxFlag = true;
    var phoneFlag = true;
    var number = url().params.number;

    // 初始化时 后台返回的数据 后面要用到 存在boxList的data属性中
    var userNumber = boxList.attr('data-user-number');
    var courseList = [];
    var classConfig = {
        '1': '一对一',
        '2': '线下班课',
        '3': '视频课',
        '8': '直播课'
    };


    var fullHeight = function () {
        //计算wrpper和scroller高度，高度不够就进行填充
        var fullBox = $('.full-box');

        var screenHeight = screen.height;
        // boxList 有margin-top 50px
        var boxListHeight = boxList.height();
        boxListHeight += 50;
        var offHeight = screenHeight - boxListHeight;

        if(offHeight > 0) {
            fullBox.css('height', offHeight + 'px');
        } else {
            fullBox.css('height','20px');
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
            newImg = img + '@90w_90h_2x_70Q_0i_1e_1o_1c_1wh_1pr.jpg';
        } else if (pngReg.test(s)) {
            newImg = img + '@1x_70Q_1o_90w_90h_1e_1c.src';
        }
        return newImg;
    };

    var findImg = function () {
        $('.last-nav-has-teacher').find('.teacher-infos .teacher-box .avatar').each(function (){
            var that = $(this);
            var img = that.data('src');
            var returnImg = cutTeacherImage(img);
            that.attr('src', returnImg);
        });
    };

    var createIScroll = function () {
        myScroll = new IScroll('#wrapper', { probeType: 2, interactiveScrollbars: true, startY: -40, click: true });
        var pullToRefresh = $('.pull-to-refresh .pull-text');
        var pullIndicator = $('.pull-to-refresh .pull-indicator');
        var pullSpinner = $('.pull-to-refresh .pull-spinner');
        var pullRefresh = $('.pull-to-refresh');

        /*滑动的时候*/
        myScroll.on('scroll', function() {
            pullRefresh.css('display', 'inline-block');
            boxList.css('margin-top', '0px');
            if (this.y > 10 && update === false) {
                update = true;
                pullToRefresh.html('释放更新');
                pullIndicator.addClass('arrow-rotate-180');
            }

            /*当手指划出屏幕的时候会有没反应，所以滑到最下时就应该自动弹回去*/
            if (update === true) {
                if(window.innerHeight - this.pointY < 1) {
                    myScroll.scrollTo(0, -40, 300);
                }
            }
        });

        /*手指松开的时候*/
        myScroll.on('scrollEnd', function() {
            //下拉刷新
            if (this.y > -40) {
                if (update === false && this.y <= 0) {
                    myScroll.scrollTo(0, -40, 1000);
                } else {
                    pullIndicator.css('display', 'none');
                    pullToRefresh.css('display', 'none');
                    pullSpinner.css('display', 'block');
                    update = false;
                    myScroll.scrollTo(0, -40, 1000);
                    pullToRefresh.html('下拉刷新');
                    pullIndicator.removeClass('arrow-rotate-180');
                    pullSpinner.css('display', 'none');
                    pullIndicator.css('display', 'inline-block');
                    pullToRefresh.css('display', 'inline-block');
                    //location.reload();
                    if(ajaxFlag === true){
                    var nowUrl = '/hall-teacher/get';
                        ajaxFlag = false;

                        service
                        .post(
                            nowUrl,
                            {
                                number: url().params.number,
                                render: 'json'
                            },
                            function (res) {
                                if(res.code === 0){
                                    var html = liRender({
                                        list: res.data
                                    });
                                    boxList.html(html);
                                    asyncLoad();
                                    lastTime();
                                    intoTeacherPage();
                                    findImg();
                                    ajaxFlag = true;
                                    closeDialog();
                                    //otherList();
                                }
                            }
                        );
                    }
                }
            }
            myScroll.refresh();
        });
    };

    var doShare = function () {
        var shareInfo = {
            title : '一位学生正在找教授' + pageData.item.course_name + '的老师，快去看看!',
            content : '在跟谁学上发现一个好生源，再不看就要被别人抢走啦！',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d111770ce5b.png',
            url : location.href
        };
        if (page_data.item.status == 1) {
            setShare(shareInfo);
        }
    };

    //跳转老师主页
    var intoTeacherPage = function () {

        boxList
        .on('click', '.teacher-introduction', function (e) {
            if (!$(e.target).hasClass('teacher-good') && !$(e.target).hasClass('icon-like')
                && !$(e.target).hasClass('good-container') && !$(e.target).hasClass('like-number')) {
                var url = $(this).attr('data-url');
                open(url);
            }
        });

        boxList
        .on('click', '.teacher-live-lesson', function () {
            var url = $(this).attr('data-url');
            open(url);
        });


        boxList.on('click', '.recommend .demand-introduction', function () {
            var url = $(this).attr('data-url');
            open(url);
        });

        function open (url) {
            if(isApp) {
                openAppWindow.open(url);
            }
            else {
                location.href = url;
            }
        }
    };

    var asyncLoad = function () {
        // 异步加载更多生源
        var userInfo = user.getUserInfo();
        if (userInfo) {
            service
            .post(
                '/hall-teacher/getTeacherRecommendRecord',
                {
                    number: number
                },
                function (res) {
                    var html = recommendRender({list: res.data});
                    boxList.find('.recommend').html(html);
                    fullHeight();
                    lastTime();
                    myScroll.refresh();
                }
            );
        }

    };

    // 绑定事件

    wrapperFooter.on('click', '.contactTeacher', function () {

    });

    wrapperFooter.on('click', '.enter-button-available', function () {

        var valid = $(this).attr('data-valid');
        if (valid != 1) {
            ui_new.alert('未生效用户无法报名，请先完善您的个人资料并成为生效老师');
            return ;
        }

        service
        .post
        (
            '/hall-teacher/getTeacherCourses',
            {
                number: number
            },
            function (res) {
                // 科目不匹配
                if (res.code == 4) {
                    var title = '科目不匹配';
                    var lines = [
                        '抱歉，您的主营科目与学生需求科目不匹配，无法进行报名，去看看',
                        '其他生源吧~'
                    ];
                    var html = errorTipRender(
                        {
                            title: title,
                            isMember: '1',
                            content: lines.join('')
                        }
                    );
                    wrapperDialog.html(html);
                    return false;
                }
                else if (res.code == 5) {
                // 地区不匹配
                    var title = '地区不匹配';
                    var lines = [
                        '抱歉，您的常用教学地址与学生的需求不匹配，',
                        '无法进行报名，去看看其他生源吧~'
                    ];
                    var html = errorTipRender(
                        {
                            title: title,
                            isMember: '1',
                            content: lines.join('')
                        }
                    );
                    wrapperDialog.html(html);
                    return false;
                }
                else if (res.code == 6) {
                // 性别不匹配
                    var title = '性别不匹配';
                    var lines = [
                        '抱歉，由于该学生对老师性别有特殊要求',
                        '无法进行报名，去看看其他生源吧~'
                    ];
                    var html = errorTipRender(
                        {
                            title: title,
                            isMember: '1',
                            content: lines.join('')
                        }
                    );
                    wrapperDialog.html(html);
                    return false;
                }
                else if (res.code == 3) {
                // 会员优先报名
                    var title = '';
                    var lines = [];
                    var html = '';
                    if (isApp) {
                        title = '会员优先报名';
                        lines = [
                            '抱歉，该生源目前处于30分钟会员优先报名期，',
                            '非会员倒计时结束后即可报名，成为会员可立即报名。'
                        ];
                        html = errorTipRender(
                            {
                                title: title,
                                isMember: '0',
                                content: lines.join('')
                            }
                        );
                        wrapperDialog.html(html);
                    }
                    else {
                        title = '会员优先报名';
                        lines = [
                            '抱歉，该生源目前处于30分钟会员优先报名期，',
                            '非会员倒计时结束后即可报名，成为会员可立即报名。'
                        ];
                        html = errorTipRender(
                            {
                                title: title,
                                isMember: '1',
                                content: lines.join('')
                            }
                        );
                        wrapperDialog.html(html);
                    }

                    return false;
                }
                else if (res.code == 990000) {
                    var url = res.data.url;
                    setTimeout(
                        function () {
                            location.href = url;
                        },
                        1000
                    );
                    return ;
                }

                var data = res.data;
                // 将课程全存起来
                    courseList = data;

                var hasRecommendCourse = data.length > 0 ? 1 : 0;
                var html = dialogRender(
                    {
                        hasRecommendCourse: hasRecommendCourse,
                        list: data
                    }
                );

                wrapperDialog.html(html);
            }
        );

    });

    wrapperFooter.on('click', '.recommend', function () {
        if (page_data.item.status == 1) {
            var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
            var isQQ = env.thirdapp && env.thirdapp.isQQ;
            var isWeibo = env.thirdapp && env.thirdapp.isWeibo;
            if (isApp) {
                app.send('doSharePanel', {});
            } else if (isWeixin || isQQ || isWeibo){
                var shareMask = $('.share-mask');
                shareMask.show();
            } else {
                ui_new.remind('点击浏览器分享按钮，快快分享给小伙伴吧～');
            }
        } else {
            ui_new.remind('抱歉，只能分享正在进行中的生源～');
        }
    });

    wrapperFooter.on('click', '.contactStudent', function () {

        if (!isApp) {
            var html = "<div class='download-mask'><div class='download-tip'><div class='content'><p>下载跟谁学老师版APP，</p><p>即可免费发消息给你的学生！</p></div><a href='https://www.genshuixue.com/static/app?target=teacher' class='button download-app'>立即下载</a></div></div>";
            wrapperDialog.html(html);
            return ;
        }
        var studentNumber = $(this).attr('data-number');
        // 学生的id
        var params = {
            c_role: "2",
            c_id: studentNumber
        };
        app.send('IM', params);

    });

    shareMask.on('click', function () {
        $(this).hide();
    });

    wrapperDialog.on('keyup', '.enter-reason-text', function (event) {
        var str = $(this).val();
        var nextButton = wrapperDialog.find('.next-button');

        if (str.length > 14 && str.length < 151) {
            nextButton.addClass('pass');
        }
        else {
            nextButton.removeClass('pass');
        }
    });

    wrapperDialog.on('click', '.tab', function () {

        var curValue = $(this).attr('data-value');
        var tabs = wrapperDialog.find('.tab');

        // 改变tab 则选中的课程 失效
        var chooseCourse = wrapperDialog.find('.choose-course');
        chooseCourse.attr('data-courseNumber', '');
        chooseCourse.attr('data-courseType', '');

        // 改变颜色
        tabs.each(function (index, ele) {
            if ($(ele).attr('data-value') == curValue) {
                $(ele).addClass('tab-selected');
            }
            else {
                $(ele).removeClass('tab-selected');
            }
        });
        // 过滤数据
        // 您还没有该类型课程

        if (curValue == 'all') {
            getCourseList(0);
        }
        else if (curValue == 'class') {
            getCourseList(2);
        }
        else if(curValue == 'video') {
            getCourseList(3);
        }
        else if(curValue == 'oneToOne') {
            getCourseList(1);
        }

        function getCourseList (value) {
            var courseListWrapper = wrapperDialog.find('.course-list-wrapper');
            var list = [];
            if (value == 0) {
                list = courseList;
            }
            else {
                for(var i = 0, len = courseList.length; i < len; i++) {
                    if (value == courseList[i].type) {
                        list.push(courseList[i]);
                    }
                }
            }

            var temp = '';
            if (list.length > 0) {
                temp = "<div class='course-list'>{{foreach list as $item}}<div class='course-item' data-type='{{$item.type}}' data-number='{{$item.number}}'><div class='course-name'>{{$item.name}}</div><div class='course-price'>{{$item.price}}</div></div>{{/foreach}}</div>";
            }
            else {
                temp = "<div class='course-list'><div class='course-none'>您还没有该类型的课程～</div></div>";
            }
            var render = template.compile(temp);
            var html = render({list: list});
            courseListWrapper.html(html)

        }

    });

    wrapperDialog.on('click', '.course-item', function () {
        var courses = wrapperDialog.find('.course-item');
        var chooseCourse = wrapperDialog.find('.choose-course');

        if ($(this).hasClass('course-item-choosed')) {
            $(this).removeClass('course-item-choosed');
            chooseCourse.attr('data-courseNumber', '');
            chooseCourse.attr('data-courseType', '');
            return ;
        }


        courses.each(function (index, ele) {
            $(ele).removeClass('course-item-choosed');
        });

        $(this).addClass('course-item-choosed');
        chooseCourse.attr('data-courseNumber', $(this).attr('data-number'));
        chooseCourse.attr('data-courseType', $(this).attr('data-type'));

    });

    wrapperDialog.on('click', '.next-step', function () {

        if ($(this).hasClass('pass')) {
            var content = wrapperDialog.find('textarea').val();

            wrapperDialog.find('.enter-reason').hide();
            var html = dialogChooseCourse({
                list: courseList,
                content: content
            });
            wrapperDialog.find('.choose-course-wrapper').html(html);
        }
    });

    // 报名确认
    wrapperDialog.on('click', '.confirm', function () {

        var confirmButton = $(this);
        var value = confirmButton.attr('data-value');
        var submitting = confirmButton.attr('data-submitting');
        var reason = '';
        var type = '';
        var number = '';

        // 当先选择课程 再报名的时候 value为1
        if (value == 1) {
            var chooseCourse = wrapperDialog.find('.choose-course');
            reason = $.trim(wrapperDialog.find('.choose-course .content').html());
            type = chooseCourse.attr('data-courseType');
            number = chooseCourse.attr('data-courseNumber');
        }
        else if(value == 0) {
            reason = $.trim(wrapperDialog.find('.enter-reason-text').val());
        }

        if (submitting == 0) {

            confirmButton.attr('data-submitting', 1);
            if (value == 1) {
                confirmButton.css('background-color', '#AAA');
                confirmButton.html('报名中....');
            }
            if (value == 0) {
                confirmButton.css('color', '#AAA');
                confirmButton.html('报名中....');
            }

            service
            .post(
                '/hall-teacher/do',
                {
                    number: userNumber,
                    action: 'join',
                    join_reason: reason,
                    course_number: number,
                    course_type: type
                },
                function (res) {
                    if (res.code == 0) {
                        wrapperDialog.html("<div class='success-tip'>报名成功</div>");
                        setTimeout(
                            function () {
                                location.reload();
                            },
                            1000
                        );
                    }
                    else {
                        setTimeout(
                            function () {
                                location.reload();
                            },
                            1000
                        );
                    }
                }
            );
        }

    });

    wrapperDialog.on('click', '.close', function () {
        wrapperDialog.html('');
    });

    wrapperDialog.on('click', '.mask', function () {
        // 在推荐课程里面点击mask 不会关闭弹窗
        var dialog = $(this).parent();
        if (wrapperDialog.find('.choose-course-wrapper').children().length > 0) {
            // .choose-course-wrapper 里面有dom 则在推荐课程页里
            return ;
        }
        dialog.remove();
    });

    wrapperDialog.on('click', '.mask-touch-disapper', function () {
        wrapperDialog.html('');
    });

    wrapperDialog.on('click', '.download-mask', function () {
        wrapperDialog.html('');
    });

    wrapperDialog.on('click', '.open-member', function () {
        openAppWindow.open('https://m.genshuixue.com/vip/index');
    });

    /**
     * 点赞
     * @return {[type]} [description]
     */
    function teacherGood() {
        boxList.on('click', '.teacher-good', function (event) {
            var span = $(this).find('.like-number');
            var number = $(this).find('.like-number').html();
            var me = $(this);
            if (goodFlag) {
                goodFlag = false;
                if (me.hasClass('like')) {
                    service.post('/hall-teacher/cancelLike', {
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
                            user.loginTeacher();
                        }
                        goodFlag = true;
                    });
                } else {
                    service.post('/hall-teacher/addLike', {
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
                            user.loginTeacher();
                        }
                        goodFlag = true;
                    });
                }
            }
            event.stopPropagation();
            return false;
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
        $('.contactTeacher').on('click', function () {
            if ($(this).hasClass('no-teacher')) {
                ui_new.remind('暂无老师报名');
            } else {
                dialog.show();
            }
        });

        $('.icon-close').on('click', function () {
            dialog.hide();
        });
        alertDialogInit();

        // 因为老师对老师IM无效，所以隐藏掉im按钮 PM 李凡
        if (page_data.is_own) {
            $('.im-chat').hide();
        }

        $('.im-chat').on('click', function () {
            var mask = $('.mask');
            var downloadTip = $('.download-tip');
            if (!isApp) {
                dialog.hide();
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
                    c_role: userInfo.role,
                    c_id: $(this).attr('data-number') + ''
                };
                app.send('IM', params);
            }

        });

        $('.download-app').on('click', function () {
            location.href = 'http://m.genshuixue.com/app?target=teacher';
        });

        $('.mask').on('click', function () {
            if ($('.download-tip').css('display') == 'block') {
                $('.download-tip').hide();
                $(this).hide();
            }
        });
    }

    /**
     * 拨打电话对话框
     * @return {[type]} [description]
     */
    function alertDialogInit () {
        $('.student-phone').on('click', function () {
            service.post('/call-service/call', {
                target: $(this).data('number')
            }, function (response) {
                if (response.code === 0) {
                    var alertDialog = new Dialog({
                        'position': 'absolute',
                        'closeButton': false,
                        'title': '回呼学生',
                        'content': ''
                        + '<div class="top-info">'
                        +     '平台为了保护学生隐私，暂不提供学生真实号码，请通过拨打我们提供的虚拟号码联系学生，多谢！'
                        + '</div>'
                        + '<div class="bottom-info">'
                        +     '请使用号码为' + response.result.caller_number + '的电话进行拨号，'
                        +     '拨打“虚拟号码”<a class="call-virtual" href="tel:' + response.result.virtual_mobile + '">' + response.result.virtual_mobile + '</a>联系老师。'
                        + '</div>',
                        'width': '435px',
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
                        'width': '435px',
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

    /**
     * 给弹出的对话框增加样式
     * @return {[type]} [description]
     */
    function alertDialogStyle () {
        $('.GSX_Dialog_default').css({
            'padding': '0',
            'border-radius': '10px'
        });
        $('.GSX_Dialog_default a').css({
            'font-size': '18px',
            'color': '#0076ff',
            'text-decoration': 'underline'
        });
        $('.GSX_Dialog_title').css({
            'height': '50px',
            'text-align': 'left',
            'padding': '15px',
            'color': '#fff',
            'font-size': '17px',
            'background': '#ff6c00'
        });
        $('.top-info').css({
            'font-size': '14px',
            'color': '#9d9d9e',
            'border-bottom': "1px solid #dcddde",
            'padding': "15px 0"
        });
        $('.bottom-info').css({
            'font-size': '14px',
            'border-top': "1px solid #dcddde",
            'padding': "15px 0"
        });
    }

    //操作关闭弹框 绑定事件
    var closeDialog = function () {

        var dialog = $('.dialog');
        var mask = $('.mask');

        var iClose = $('.close-icon');
        var iCourseTitle = boxList.find('.course-title');

        var closeReason = dialog.find('.close-reason');
        var closeReasonConfirm = dialog.find('.close-reason-confirm');

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
                '/hall-teacher/close',
                {
                    number: url().params.number
                },
                function(res) {
                    if (res.code === 0) {
                        $('.entered-teacher').html('');
                        $('.recommend').html('');
                        $('#wrapper-footer').remove();

                        iClose.hide();
                        iCourseTitle.show();
                        closeReasonConfirm.hide();
                        mask.hide();
                    }
                }
            );
        });

        iClose.on('click', function() {
            closeReason.show();
            mask.show();
        });
    };

    return function(page_data) {

        pageData = page_data;
        isApp = app.isApp();
        if (isApp) {
            wrapper.css('top', '0');
        }
        else {
            wrapper.css('top', '40px');
            // boxList.css('margin-top', '50px');
        }

        // 新增
        asyncLoad();

        openAppWindow.init();
        intoTeacherPage();
        fullHeight();
        teacherGood();
        contactDialog();
        closeDialog();
        // 倒计时
        lastTime();
        findImg();
        otherList();
        createIScroll();
        doShare();
        boxList.css('margin-top', '50px');
        // myScroll.scrollTo(0, -40, 300);
        // document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
    };

});