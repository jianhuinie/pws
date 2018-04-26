/**
 * @file 视频课播放
 * @author liucong
 */

define(function (require, exports) {

    'use strict';
    var pageWidth = require('cobble/function/pageWidth');
    var Tooltip = require('cobble/ui/Tooltip');
    var pageHeight = require('cobble/function/pageHeight');
    var store = require('common/store');
    var service = require('common/service');
    var URL = require('cobble/util/url');
    var LoginDialog = require('common/component/LoginDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var Editor = require('common/component/Editor');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');

    var container = $("#main");
    var writeComment = container.find('.write-comment-form');
    var videoContainer = container.find('#main-video');
    var lessonList = container.find('.lesson-list');
    var courseTitle = container.find('#video-container .course-title');

    var collapsed = false;
    var activeItem;
    var commentForm;

    var MENUFIXOFFSET = 330;
    var SIDENAVWIDTH = 390;

    function doLayoutVideo() {
        var height = pageHeight();
        var width = pageWidth();

        height -= 100;

        if (collapsed) {
            width -= 50;
        }
        else {
            width -= (50 + SIDENAVWIDTH);
        }

        videoContainer.css('width', width);
        videoContainer.css('height', height);
        videoContainer.show();
    }

    function doLayoutList() {
        var height = pageHeight();

        height -= MENUFIXOFFSET;
        lessonList.css('height', height);
    }

    function playlesson(lessonElement, forceToScoll) {

        service
        .checkVideoCourse(
            {
                courseNumber: store.get('courseNumber'),
                index: lessonElement.data('index'),
                sectionId: lessonElement.data('section-id'),
                sign: store.get('sign'),
                modify: URL.parseQuery(location.search).modify
            },
            {
                errorHandler: {
                    '100037': function (response) {
                        alert({
                            title: '温馨提示',
                            content: response.msg,
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'primary',
                                    handler: function () {
                                        location.href = ''
                                            + '/video_course/getcourseshowdetail?number=' + store.get('courseNumber')
                                            + '&user_number=' + store.get('teacherNumber');
                                    }
                                }
                            ]
                        });
                    },
                    '900006': function (response) {
                        alert({
                            title: '温馨提示',
                            content: '你还没登录，请先登录哦',
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'primary',
                                    handler: function () {
                                        var env = store.get('env');
                                        var envMap = {
                                            test: 'https://test.genshuixue.com/static/login?next=',
                                            beta: 'https://beta.genshuixue.com/static/login?next=',
                                            www: 'https://www.genshuixue.com/static/login?next='
                                        };
                                        var url = envMap[env] || envMap['www'];

                                        location.href = url + encodeURIComponent(location.href);
                                    }
                                }
                            ]
                        });
                    }
                }
            }
        )
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data;

                if (forceToScoll) {
                    lessonList.scrollTop(lessonElement.offset().top - MENUFIXOFFSET);
                }

                if (activeItem != lessonElement) {

                    if (!activeItem) {
                        activeItem = lessonElement;
                    }

                    activeItem.removeClass('active');
                    activeItem = lessonElement.addClass('active');
                }


                // 获取视频清晰度参数并拼接成url传给src
                if(location.search) {
                    var index = location.search.indexOf('definition');
                    if(index>-1){

                       //var def = location.search.substr(index+11,1);
                       var array = URL.parseQuery(location.search);
                       var def = array['definition'];
                       var index1 = data.url.indexOf('?');
                       var str = '';
                       if(index1>-1){
                           str += '&definition=';
                       }
                       else {
                           str += '?definition=';
                       }
                       str += def;
                       data.url += str;

                    }

                }

                videoContainer.prop('src', data.url);
                var title = lessonElement.data('lesson-title');
                if (title == 'unrule') {
                    title = '<span class="wrong-title"><i class="icon icon-info-circle"></i>该课程标题包含违规内容，请等待老师修改完成后，再进行查看</span>';
                }
                courseTitle.html(title);

                doLayoutVideo();
            }
        });
    }

    /**
     * 获取是否有学生身份
     * @param  {Array} roles 身份数组
     * @return {Bool}  返回是否具有学生身份，默认为false
     */
    function getHasStudentRole(roles) {
        var studentRoleCode = "2";
        var length = roles.length;
        var hasStudentRole = false;

        if (length > 0) {
            for(var i = 0; i < length; i++) {
               if (roles[i] === studentRoleCode) {
                    hasStudentRole = true;
                    break;
                }
            }
        }

        return hasStudentRole;
    }

    /**
     * 检查立即报名的情况
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     */
    function checkSignup(url,callback,createText,switchText) {

        var userType = store.get('user').type;
        if (userType >= 0) {
            if (userType === 0) {
                new SwitchRoleDialog({
                    createText: createText,
                    switchText: switchText,
                    switchTo: 'student',
                    onSuccess: function () {
                        if (callback) {
                            callback();
                        }
                    }
                });
            }
            else {
                if (callback) {
                    callback();
                }
            }
        }
        else {
            new LoginDialog({
                onSuccess: function () {
                    callback();
                    location.href = url ;
                }
            });
        }
    }

    function alertMessage(text) {
        alert({
            content: text,
            width: 300,
            buttons: [
                {
                    text: '我知道了',
                    type: 'primary',
                    handler: function () {
                        this.hide();
                    }
                }
            ]
        });
    }

    exports.init = function () {
        var hasLogin = store.get('hasLogin');
        var isJoin = store.get('isJoin');
        var isOver = store.get('isOver');
        var isOwnCourse = false;
        if (store.get('teacherNum') == store.get('user').number) {
            isOwnCourse = true;
        }

        // 保存视频课学习记录
        service
        .setStudyHistory({
            courseNum: store.get('courseNumber'),
            sectionNum: store.get('sectionNumber')
        });

        $(window).resize(function () {
            doLayoutVideo();
            doLayoutList();
        });

        doLayoutList();

        /*
         * 写评论交互123
         */
        new Editor({
            element: writeComment.find('.form-editor'),
            maxLength: 500,
            minLength: 15
        });

        var writeValidator = new Validator({
            realtime: true,
            element: writeComment,
            fields: {
                info: {
                    rules: {
                        required: true,
                        maxlength: 500,
                        minlength: 15
                    },
                    errors: {
                        required: '请输入评价信息',
                        maxlength: '不能超过 500 字',
                        minlength: '不能少于15字'
                    }
                }
            }
        });

        new SaveButton({
            element: writeComment.find('.btn-write-comment'),
            saveText: '正在发送...',
            save: function () {

                // 评分
                var score = writeComment.find('.star-score').find('.star-shine').length;
                if(score === 0) {
                    alert("评分不能为空");
                    return false;
                }

                if (writeValidator.validate()) {

                    var info = writeComment.find('textarea[name="info"]').val();
                    // 匿名评价
                    var anonymous = 0;
                    var anonymousInput = writeComment.find('input[name=anonymous]');
                    if (anonymousInput.prop('checked')) {
                        anonymous = 1;
                    }

                    service
                    .addCommentMore({
                        purchaseId: store.get('purchaseId'),
                        total_score: score,
                        info: info,
                        anonymous: anonymous
                    },
                    {
                        errorHandler: {
                            '100061': function (response) { // 敏感词过滤

                                var map = {
                                    'info': '回复信息'
                                };

                                var errorMsg = response.data;
                                var content = '你';  // 你

                                $.each(errorMsg, function (index, item) {

                                    if (item.length) {
                                        content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                                        $.each(item, function (i, j) {
                                            content += '“<em>' + j + '</em>”';
                                        });
                                        content += '；</span><br />';
                                    }

                                });

                                content += '请删除后重新输入';

                                alert({
                                    title: '温馨提示',
                                    content: content,
                                    width: 450,
                                    buttons: [
                                        {
                                            text: '确定',
                                            type: 'primary',
                                            handler: function () {
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                        }
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            success('评论成功！', function () {
                                writeComment.hide();
                            });
                        }
                    });
                }


            }
        });

        container
        .on('click', '#collapse-btn .thumb-nail', function () { // 展示目录与否
            container.toggleClass('collapsed');
            collapsed = !collapsed;

            doLayoutVideo();
        })
        .on('click', '.lesson-list-wrapper li', function () {
            playlesson($(this));
        })

        .on('click', '.join', function () { // 加入课程

            // 如果用户没登陆,弹出登陆框
            var url = '';
            var element = $(this);

            url = '/video_course/addfree?course_number=' + store.get('courseNumber');
            var createText = '你目前是老师身份，无法加入到你的视频课，是否开通学生身份？';
            var switchText = '你目前是老师身份，需要切换到学生身份才能加入到你的视频课';
            checkSignup(location.href, function() {
                    if (store.get('user') && store.get('user').number && store.get('teacherNumber') == store.get('user').number ) {
                        alert('抱歉！你不能加入自己的视频课');
                        return false;
                    }
                    service
                    .addFreeVideoCourse(
                        { courseNumber: store.get('courseNumber')} ,
                        {
                            errorHandler: {
                                '100037': function () {
                                    success("您已添加该课程", function () {
                                        location.reload();
                                    });
                                }
                            }
                        }
                    )
                    .done(function(response){
                        if (response.code == 0) {
                            success("加入视频课成功", function () {
                                location.reload();
                            });
                        }
                    });
            },createText,switchText );

            return;
        })

        .on('click', '.buy', function () { // 购买课程
            var url = '';
            var element = $(this);
            if (hasLogin) {

                if (store.get('teacherNumber') == store.get('user').number ) {
                    alert('您不能购买自己的课哦~');
                    return false;
                }
                url = '/pay/productDetail?type=3&course_number='+store.get('courseNumber');
                var createText = '你目前是老师身份，无法购买视频课，是否开通学生身份？';
                var switchText = '你目前是老师身份，需要切换到学生身份才能购买视频课';
                checkSignup(location.href, function() {
                                location.href = url;
                            },createText,switchText );
            } else {

                new LoginDialog({
                    onSuccess: function () {
                        location.href = '/pay/productDetail?type=3&course_number='+store.get('courseNumber');
                    },
                    next: location.href
                });
            }
        })

        .on('click', '.btn-comment', function (e) { //  发表评价
            $(this).hide();
            writeComment.show();
        })
        .on('click', '.download', function (e) {
            var target = $(e.currentTarget);
            var item = target.parent();
            var isOpen  = item.data('isOpen');
            var fileId = item.data('fileId');
            if (store.get('user').type === 0 && !isOwnCourse) {
                e.preventDefault();
                service
                .getUserType()
                .done(function (response) {
                    if (response.code === 0) {
                        var roles = response.data.roles;
                        var hasStudentRole = getHasStudentRole(roles);
                        var text = '';

                        if (hasStudentRole) {
                            text = '你目前是老师身份，需要切换到学生身份才能下载资料';
                        }
                        else {
                            text = '你目前是老师身份，无法下载资料，是否开通学生身份？';
                        }
                        
                        new BanLessonDialog({
                            text: text,
                            hasStudentRole: hasStudentRole,
                            onSuccess: function(){
                                location.reload();
                            },
                            next: location.href,
                            noskip: false
                        });
                    }
                });
            }
            else if (store.get('user').type === 0 && isOwnCourse) {
                //自己的课直接下载
            }
            else {
                if (isOpen) {
                    if (!hasLogin) {
                        new LoginDialog({
                            onSuccess: function () {
                                location.reload();
                            }
                        });
                        e.preventDefault();
                    }
                }
                else {
                    if (!isJoin) {
                        if (!isOver) {
                            var text = '该资料登录报名后才能下载哦';
                            alertMessage(text);
                            e.preventDefault();
                        }
                        else {
                            var text = '该课程已结束，可咨询老师获取资料';
                            alertMessage(text);
                            e.preventDefault();
                        }
                    }
                }
            }
        });

        /*
         * 写评论交互
         */
        Tooltip.init(writeComment.find('[data-title]'));
        writeComment
        .on('click', '.icon-close', function () { // 关闭评论窗
            writeComment.hide();
            writeComment.prev('.btn-comment').show();
        })

        .on('click', '.icon-star', function (e) {
            var target = $(e.currentTarget);
            var starScore = target.parent();

            var idx = target.index();
                starScore.attr("sum",idx);
            for(var i = 0 ; i <= idx ; i++) {
                starScore.find('.icon:eq(' + i + ')').addClass('star-shine').addClass('scored');
            }
            for(var j = 4 ; j > idx ; j--) {
                starScore.find('.icon:eq(' + j + ')').removeClass('star-shine').removeClass('scored');
            }

            var stars = $.map($(starScore).parent().parent().find(".star-score"),function(num){
                return parseInt($(num).attr("sum") ? $(num).attr("sum") : 5);
            });

        })

        .on('mouseenter', '.icon-star', function (e) {
            var target = $(e.currentTarget);
            var starScore = target.parent();

            var idx = target.index();
            for(var i = 0 ; i <= idx ; i++) {
                starScore.find('.icon:eq(' + i + ')').addClass('star-shine');
            }
            for(var j = 4 ; j > idx ; j--) {
                starScore.find('.icon:eq(' + j + ')').removeClass('star-shine');
            }
        })

        .on('mouseleave', '.star-score', function (e) {

            var element = $(this);

            element.find('.icon').each( function(i, item) {
                var sub_element = $(item);
                if( !sub_element.hasClass('scored') ){
                    sub_element.removeClass('star-shine');
                } else {
                    sub_element.addClass('star-shine');
                }
            });
        });

        /*
        .on('click', '.go-back', function () {
            window.history.back();
        });*/

        // var playIndex = store.get('playIndex');
        
        //章节模式下playIndex不唯用sectionId区分
        var sectionNumber = store.get('sectionNumber');

        lessonList.find('li').each(function () {

            if ($(this).data('section-id') == sectionNumber) {
                playlesson($(this), true);
                return false;
            }

        });
    }
});