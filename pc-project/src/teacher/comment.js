/**
 * @file 邀请评价页
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var Editor = require('common/component/Editor');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var Rater = require('cobble/ui/Rater');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var Select = require('cobble/form/Select');
    var SubjectSelect = require('teacher/component/SubjectSelect');
    var CommentResultDialog = require('common/component/CommentResultDialog');
    var CodeButton = require('common/component/CodeButton');
    var LoginDialog = require('common/component/LoginDialog');
    var urlUtil = require('cobble/util/url');
    var MoreImageUploader = require('common/component/MoreImageUploader');

    var container = $('#main');
    var codeBtn, currentStatus;

    // 验证码
    var Captcha = require('common/component/Captcha');

    // 语音校验码
    var voiceCode = container.find('.voice-code-link span');
    voiceCode.on('click', sendVoiceCode);

    var validator = new Validator({
        realtime: true,
        element: container,
        fields: {
            name: {
                errors: {
                    required: '请输入姓名'
                }
            },
            mobile: {
                errors: {
                    required: '请输入手机号',
                    pattern: '手机号码错误'
                }
            },
            verify_code: {
                errors: {
                    required: '请输入校验码'
                }
            },
            info: {
                rules:{
                    required: true,
                    maxlength: 500
                },
                errors: {
                    required: '请输入评价信息',
                    maxlength: '请将字数控制在 500 字以内'
                }
            }
        }
    });


    exports.init = function () {

        var container = $('#main');
        var textarea = container.find('.form-editor');
        var userType = 'student';
        var me = this;
        var hourElement = container.find('.lesson-hour');

        if (!store.get('hasLogin')) {
            initMobile();

            container
            .on('click', '.btn-login', login);
        }

        var countFile = 0; // 随时计算当前上传图片数目

        if (store.get('user') && store.get('user').type == 2) {
            // 多文件上传
            var uploader = new MoreImageUploader({
                element: container.find('.upload-pics'),
                watermark: 'photo',
                previewWidth: 90,
                previewHeight: 70,
                maxCount: 5,
                onUploadStart: function () {
                    // 置灰提交按钮
                    container.find('#commit').prop('disabled', true);
                },
                onUploadSuccess: function () {
                    // countFile++;
                },
                onUploadComplete: function () {
                    container.find('#commit').prop('disabled', false);
                }

            });
        }
        else {
            container
            .on('click', '.btn-upload', function () {
                alert('登陆学生身份之后才可以享受“晒图”功能哦！');
            });
        }

        // 文本域剩余字数
        var editor = new Editor({
            element: textarea,
            maxLength: 500
        });

        // var options = {
        //     value: 5,
        //     count: 5,
        //     onClass: 'icon icon-star star-shine',
        //     offClass: 'icon icon-star',
        //     hint: {
        //        '1': '非常差',
        //        '2': '差',
        //        '3': '一般',
        //        '4': '好',
        //        '5': '非常好'
        //    }
        // };

        // var descMatchRater = new Rater(
        //     $.extend({element: $('.star-score:eq(0)')}, options)
        // );

        // var teachResultRater = new Rater(
        //     $.extend({element: $('.star-score:eq(1)')}, options)
        // );

        // var serviceAttitudeRater = new Rater(
        //     $.extend({element: $('.star-score:eq(2)')}, options)
        // );

        // var subjectSelectForComment = new SubjectSelect({
        //     element: container
        // });

        // var hourSelect =
        // me.hourSelect = new Select({
        //     element: hourElement,
        //     defaultText: '请选择课程时长',
        //     name: 'lesson_hour'
        // });

        container
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

            var text = target.closest('.comment-box').find(".placeholder");
            text.html("");
            if(stars[0] == 0){
                text.html("对老师不满意？可以先跟老师沟通一下哦");
            }
            else if(stars[0] == 1 || stars[0] == 2) {
                text.html("说说老师哪儿可以改进，帮助老师一起进步吧");
            }
            else if(stars[0] == 3 || stars[0] == 4) {
                text.html("写点感受吧，对其他同学很有帮助哦~");
            }
            else {
                text.html("老师水平怎么样？教学效果好不好？说说你的感受吧");
            }

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
        })
        .on('click', '#commit', function (e) { // 提交评论

            var target = $(e.currentTarget);

            var teacherNum = store.get('teacherNum');

            var oMobile = container.find('#mobile');
            var mobile = '';
            if (oMobile.length > 0 && !oMobile.val()) {
                alert('请填写手机号');
                return false;
            }
            else {
                mobile = oMobile.val();
            }

            var oUserName = container.find('#user-name');
            var userName = '';
            //alert(userName);
            if (oUserName.length > 0 && !oUserName.val()) {
                alert('请填写姓名');
                return false;
            }
            else {
                userName = oUserName.val();
            }

            /*
            var oCode = container.find('#code');
            var code = '';
            if (oCode.length > 0 && !oCode.val()) {
                alert('请填写校验码');
                return false;
            }
            else {
                code = oCode.val();
            }
            */

            var input = container.find('.input-mobile');
            var hasCode;

            var register = function () {

                var data = form.parse(validator.element);

                service
                .registerSimply({
                    name: data.name,
                    mobile: data.mobile,
                    code: data.verify_code
                })
                .done(function (response) {
                    if (response.code === 0) {

                        hasCode = false;

                        codeGroup.remove();

                        codeBtn.element.remove();
                        codeBtn.dispose();

                        input.off();
                        input.replaceWith(
                            '<span class="form-static">'
                          +     data.mobile
                          +     '<input type="hidden" name="mobile" value="' + data.mobile + '" />'
                          + '</span>'
                        );

                        container.find('.bind-success').show();

                        store.set('hasLogin', true);
                    }
                });
            };

            if (hasCode
                && validator.validate([ 'name', 'mobile', 'verify_code' ])
            ) {
                register();
            }

            var total_score = container.find('.star-score').find('.star-shine').length;

            if(!(total_score)) {
                alert({
                    title: '温馨提示',
                    content: '评星不能空缺噢',
                    width: 300,
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
                return false;
            }

            var commentInfo = editor.getValue();

            // 图片标题组 - 这里不对
            var photoList = [];
            var showImages = container.find('.show-images li');

            showImages.each(function (key, item) {

                var formGroup = $(this).find('.form-group');
                var id = formGroup.find('input[name="id"]').val();
                var title = formGroup.find('.caption').text();

                photoList.push({
                    'storage_id': id,
                    'title': title
                });

            });

            var data = {
                userName: userName,
                teacherNumber: teacherNum,
                total_score: total_score,
                commentInfo: commentInfo,
                photoList: photoList
            }

            if (validator.validate('info')) {
                service
                .sendInviteCommentInfo(
                    data,
                    {
                        errorHandler: {
                            '100061': function (response) { // 敏感词过滤

                                var map = {
                                    'info': '评价信息'
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
                    }
                )
                .done(function (response) {
                    if (response.code === 0) {
                        //countFile = 0;
                        var teacherDetailUrl = response.data.url;

                        // var commentResultDialog = new CommentResultDialog({
                        //     commentType: 'succ',
                        //     teacherDetailUrl: teacherDetailUrl
                        // });
                        location.href = teacherDetailUrl;
                    }
                    else if (response.code == '110000' || response.code == '100061' ) {
                        // var msg = data.msg;
                        // alert(msg, '温馨提示');
                    }
                    else {
                        var commentResultDialog = new CommentResultDialog({
                            commentType: 'err'
                        });
                    }
                });
            }
        });
        /*
        .on('click', '.del', function (e) {
            var target = $(e.currentTarget);
            var action = target.closest('.action');
            var captionGroup = action.next('.form-group');
            var id = captionGroup.find('input[name="id"]').val();

            service
            .delCommentImg({
                storageId: id
            })
            .done(function (response) {
                if (response.code === 0) {
                    target.closest('li').remove();
                    countFile--;
                }
            });
        })*/

    };

    // 获取语音校验码
    function sendVoiceCode() {

        var mobileNum = $.trim(container.find('[name="mobile"]').val());

        if (!mobileNum) {
            alert('请输入手机号');
        }
        else {
            currentStatus = 'voice';
            alert({
                title: '获取语音校验码',
                content: '校验码将以电话形式通知到你，请注意接听',
                buttons: [
                    {
                        text: '获取',
                        type: 'primary',
                        handler: function () {
                            this.hide();

                            service
                            .sendVoiceSMS({
                                mobile: mobileNum
                            });

                        }
                    },
                    {
                        text: '取消',
                        handler: function () {
                            this.hide();
                        }
                    }

                ]
            });
        }

    }

    function login() {

        var search = urlUtil.parseQuery(location.search);
        var courseId = store.get('courseId');
        var lessonWay = store.get('lessonWay');

        if (courseId) {
            search.course_id = courseId;
        }
        if (lessonWay) {
            search.lesson_way = lessonWay;
        }

        search = $.param(search);

        var input = container.find('.input-mobile');
        var dialog = new LoginDialog({
            mobile: $.trim(input.val()),
            next: urlUtil.getOrigin() + location.pathname + (search ? ('?' + search): ''),
            wrongRoleText: '你目前是老师身份， 无评价老师，是否开通学生身份？',
            onSuccess: function () {

                location.reload();

                store.set('hasLogin', true);
                container.find('.login-guide').hide();

                /*
                var target = $(e.currentTarget);
                var teacherId = store.get('teacherId');
                var teacherNum = store.get('teacherNum');

                var userId = store.get('user').id;
                if (userId == teacherId) {
                    alert('不好意思，不能给自己评价哦 ~ ', '温馨提示');
                    return;
                }

                service

                .getInviteCommentInfo(
                    {
                        teacherId : teacherId
                    }
                )
                .done(function (response) {

                    if (response.code === 0) {
                        var isLogin = response.data.is_login;
                        var hasCommented = response.data.has_commented;
                        var aRole = response.data.user_role;

                        var loginUserId = response.data.login_user_id;
                        if (loginUserId == teacherId) {
                            alert('不好意思，不能给自己评价哦 ~ ', '温馨提示');
                            return;
                        }
                        //var userType = 0;

                        if (isLogin) {

                            if (hasCommented) {
                                //alert({ title: '温馨提示', content: '对不起，你已评价过该老师！' })
                                var teacherId = store.get('teacherId')
                                var hasCommentedDialog = new HasCommentedDialog({
                                    buyUrl: '/pay/course?teacher_number=' + teacherNum
                                });
                            }
                            else {
                                var len = aRole.length;
                                var userType = store.get('user').type;
                                if (userType == 2) {
                                    location.href = '/teacher/comment/' + teacherNum;
                                }
                                else if (userType == 0) {
                                    var needInvite = true;
                                    for (var i = 0; i < len; i++) {
                                        if (aRole[i] === '2') {
                                            needInvite = false;
                                        }
                                    }

                                    if (needInvite) {
                                        var inviteDialog = new InviteDialog({
                                            userType: userType,
                                            targetRole: 2,
                                            next: '/teacher/comment/' + teacherNum,
                                            onSuccess: function () {
                                                new InviteResultDialog({userType: userType, status: 'succ'});
                                            },
                                            onError: function () {
                                                new InviteResultDialog({userType: userType, status: 'err'});
                                            }
                                        });
                                    }
                                    else {
                                        // 提示 目前是老师身份 是否要切换到学生身份

                                        var content = ''
                                                    + '您目前是老师身份，无法评价老师，是否切换到学生身份？'
                                                     + '<div class="dialog-action">'
                                                     +     '<button class="btn btn-primary switch">立即切换</button>'
                                                     + '</div>';

                                        var dialog = new Dialog({
                                            title: '温馨提示',
                                            content: content,
                                            skinClass: 'switch-role-dialog',
                                            width: 300
                                        });

                                        var element = dialog.element;

                                        element
                                        .on('click', '.switch', function () {
                                             service
                                            .sendInviteCode({
                                                role: 2

                                            })
                                            .done(function (response) {
                                                if (response.code === 0) {
                                                    location.href = '/teacher/comment/' + teacherNum;
                                                }
                                                else {
                                                    alert('数据正在维护！');
                                                }

                                            });

                                        });

                                    }

                                }
                                else {
                                    // 错误情况，登录身份不为0或者2
                                    alert('对不起，你不能再次为该老师填写邀请评价了！', '温馨提示');
                                }
                            }

                        }
                        else {
                            location.href = '/teacher/comment/' + teacherNum;
                        }
                    }
                });
                */

            }
        });
    }

    /**
     * 手机号输入框失焦验证该手机是否注册
     *
     * 已注册：显示请登录
     * 未注册：发送校验码
     *
     * @inner
     */
    function initMobile() {

        var input = container.find('.input-mobile');
        var registerBtn = container.find('.btn-register');
        var verifyCodeInput = container.find('input[name="verify_code"]');

        if (input.length === 1) {

            var codeGroup = container.find('.form-sms');

            // 验证码
            var captcha = new Captcha({
                element: container.find('#captcha'),
                captchaName: 'common',
                skipAuth: false,
                autoValidate: true,
                onBeforeValidate: function () {
                    disableCodeBtn();
                },
                onValid: function () {
                    captcha.hide();
                    enableCodeBtn();
                    if (!currentStatus || currentStatus === 'sms') {
                        codeBtn.sendCode();
                    } else {
                        sendVoiceCode(true);
                    }
                    verifyCodeInput.focus();
                    setTimeout(function () {
                        captcha.input.val('');
                    });
                },
                onInvalid: function () {
                    disableCodeBtn();
                },
                hidden: true
            });

            var enableCodeBtn = function() {
                if (!codeBtn.isCounting) {
                    if (validator.validate('mobile') && (store.get('hasLogin') || captcha.isValid || captcha.hidden)) {
                        codeBtn.element.prop('disabled', false);
                    }
                }
            }
            var disableCodeBtn = function() {
                if (!codeBtn.isCounting) {
                    codeBtn.element.prop('disabled', true);
                }
            }

            // 发送校验码
            codeBtn = new CodeButton({
                element: container.find('.btn-send-code'),
                send: function () {

                    if (validator.validate('mobile')) {

                        // 非国际手机号可发语音校验码
                        if ($.trim(input.val()).indexOf('00') != 0) {
                            voiceCode.parent().show();
                        }
                        /*
                        return service
                        .getSMSCode({
                            mobile: $.trim(input.val())
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('校验码发送成功');
                                codeGroup.show();
                                registerBtn.show();
                            }
                        });
                        */
                        return service
                        .getSMSCode({
                            mobile: $.trim(input.val()),
                            captcha: captcha.getValue(),
                            captcha_name: (captcha ? captcha.captchaName : null),
                            type: (captcha ? captcha.captchaName : 'forget')
                        },
                        {
                            errorHandler: {
                                1000111: function () {
                                   captcha.show();
                                   captcha.change();
                                   setTimeout(function() {
                                        captcha.validate();
                                   });
                                }
                            }
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('校验码发送成功');
                                codeGroup.show();
                                registerBtn.show();
                            }
                        });

                    }
                }
            });

            // 输入框失焦显示逻辑
            input.blur(function () {
                if (validator.validate('mobile')) {

                    service
                    .checkMobileRegister({
                        mobile: $.trim(input.val())
                    })
                    .done(function (response) {
                        if (response.code === 0) {

                            var data = response.data;

                            if (data.exist) {
                                codeBtn.element.hide();
                                container.find('.login-guide').show();
                            }
                            else {
                                codeBtn.element.show();
                                container.find('.login-guide').hide();
                            }
                        }
                    });

                }
            });

            var register = function () {

                var data = form.parse(validator.element);

                service
                .registerSimply({
                    name: data.name,
                    mobile: data.mobile,
                    code: data.verify_code
                })
                .done(function (response) {
                    if (response.code === 0) {

                        codeGroup.remove();

                        codeBtn.element.remove();
                        codeBtn.dispose();

                        input.off();
                        input.replaceWith(
                            '<span class="form-static">'
                          +     data.mobile
                          +     '<input type="hidden" name="mobile" value="' + data.mobile + '" />'
                          + '</span>'
                        );

                        container.find('.bind-success').show();
                        registerBtn.hide();
                        voiceCode.parent().hide();

                        store.set('hasLogin', true);

                    }
                    /*else {
                        alert('校验码错误');
                    }*/
                });
            };

            container
            // 点击确定进行浅注册
            // 注册成功后显示手机号输入框变文本
            .on('click', '.btn-register', function () {

                if (validator.validate([ 'name', 'mobile', 'verify_code' ])) {
                    register();
                }

            });
        }
    }

});