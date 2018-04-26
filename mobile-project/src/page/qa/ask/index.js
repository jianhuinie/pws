/**
 * @file 问答 － 提问
 * @author wangyujie
 * @date 2016-06-21
 */

define(function(require) {

    'use strict';

    var $ = require("zepto");

    var askContent = $('#ask-content');
    var askCourse = askContent.find('.ask-course');
    var askNote = askContent.find('.ask-note');
    var picContainer = askContent.find('.pic-list');
    var setShare = require('common/share/initialize');

    var bindPhone = $('#bind-phone');
    var $mobile = bindPhone.find('#mobile');
    var $smsCode = bindPhone.find('#sms');
    var $smsBtn = bindPhone.find('.btn-sms');

    var ui = require("common/ui");
    var service = require('common/service');
    var ImageCode = require("common/getImgCode");
    var CodeButton = require("common/ui/CodeButton");
    var env = require('util/env');
    var url = require("util/url");
    var isWeixin = env.thirdapp && env.thirdapp.isWeixin;

    var userInfo;
    var vcode_countdown = false;

    /**
     * 上传图片
     */
    function upLoadPic() {

        picContainer
        .find('.add-pic input[type="file"]')
        .change(function () {

            var file = this.files[0];
            var size = file.size;
            var reader = new FileReader();

            reader.onload = function () {
                // 通过reader.result来访问生成的DataURL
                var url = "data:application/octet-stream;" + reader.result.substr(reader.result.indexOf("base64,"));
                var num = picContainer.find('li').length;

                if (num == 9) {
                    picContainer.find('.add-pic').hide();
                }
                if (num == 1) {
                    picContainer.find('.add-pic').show();
                }

                if (reader.result) {
                    service.post("/uk/upload", {
                        img: reader.result,
                        watermark: 1
                    }, function(response) {
                        if (+response.code === 0) {
                            var data = response.data || {};
                            if (data.id) {

                                picContainer
                                .find('.add-pic')
                                .before('<li data-id="' + data.id + '"><i class="icon-close delete"></i><img width="100%" height="100%" src="' + url + '" alt=""></li>');

                            }
                        }
                    });
                }


            };

            reader.readAsDataURL(file); // 什么鬼？

        });
    }

    /**
     * 图片数据的处理
     * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
     * @param {Image} source_img_obj The source Image Object
     * @param {Integer} quality The output quality of Image Object
     * @return {Image} result_image_obj The compressed Image Object
     *
    var jic = {
        compress: function (source_img_obj, quality, output_format) {

            var mime_type = "image/jpeg";
            if (output_format != undefined && output_format == "png") {
                mime_type = "image/png";
            }

            var cvs = document.createElement('canvas');
            //naturalWidth真实图片的宽度
            cvs.width = source_img_obj.naturalWidth;
            cvs.height = source_img_obj.naturalHeight;
            var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
            var newImageData = cvs.toDataURL(mime_type, quality / 100);
            var result_image_obj = new Image();
            result_image_obj.src = newImageData;
            return newImageData;
        }
    };
    */

    /**
     * 提交问题
     *
     * @param {Boolean} bindPhoneSuccess 是否成功绑定手机号
     */
    function submitQuestion(bindPhoneSuccess) {

        askContent.find('.submit-question').prop('disabled', true);

        var param = {};
        //需要给指定老师做推送，所以透传url的teacher_number的参数
        if(url().params.teacher_number){
            param['teacher_number'] = url().params.teacher_number;
        } else {
            param['teacher_number'] = '';
        }
        param.integral = 0; // 积分固定为0
        param.city_id = userInfo.city.id || "0"; // 城市id
        param.subject_id = askCourse.find('.selected-course-name').data('id');
        param.content = askNote.find('textarea').val();

        // 照片
        var imageArray = [];
        picContainer.find('li').each(function (index, item) {
           if (!$(this).hasClass('add-pic')) {
               imageArray.push($(this).data('id'));
           }
        });

        /*
        var srcArray = [];
        for (var i = 0, max = imageArray.length; i < max; i++) {
           srcArray[i] = jic.compress(imageArray[i], 50);
        }
        */

        param.pic = imageArray;

        if (!param.subject_id) {
            ui.remind('请选择提问科目');
            askContent.find('.submit-question').prop('disabled', false);
        }
        else if (!param.content && param.pic.length == 0) {
            ui.remind('提问内容不能为空哦');
            askContent.find('.submit-question').prop('disabled', false);
        }
        else {
            // 判断用户是否登录
            if (userInfo.user || bindPhoneSuccess) {
                service
                .post('/wenda/askQuestionAjax', param, function (response) {
                    askContent.find('.submit-question').prop('disabled', false);
                    if (response.code == 0) {
                        var data = response.data;
                        if (isWeixin) {
                            location.href = '/Wenda/askQuestionResult?result=accomplish&type=' + data.ask_question_data.question_info.app_type;
                        }
                        else {
                            location.href = '/Wenda/askQuestionResult';
                        }
                    }
                });
            }
            else { // 未登录用户需先绑定手机号
                askContent.hide();
                bindPhone.show();
            }
        }
    }

    /**
     * 表单验证 - 绑定手机号
     */
    var validate = {
        smsCode: function(showErrMsg) {
            var sv = $.trim($smsCode.val());
            if (!sv) {
                if (showErrMsg) {
                    $smsCode.addClass('err');
                    ui.remind('请输入手机验证码');
                }
                return false;
            } else {
                $smsCode.removeClass('err');
                return true;
            }
        },
        mobile: function(showErrMsg) {
            var mobile = $mobile;
            var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|19[0-9])\d{8}$/ig;

            if (reg.test($(mobile).val())) {
                if (!vcode_countdown) {
                    $mobile.removeClass('err');
                }
                return true;
            }
            else {
                if (showErrMsg) {
                    $mobile.addClass('err');
                    ui.remind('请输入手机号');
                }
                return false;
            }
        }
    };

    /**
     * 获取验证码
     */
    function getCodeMss(param) {
        var btnText = {
            wating: "请稍候",
        }

        //调用获取验证码接口
        var codeButton = new CodeButton({
            element: $smsBtn,
            text: '重新发送($time$)',
            send: function() {
                if (!validate.mobile(true)) {
                    return false;
                }
                // ajax获取短信验证码
                var deferred = ImageCode.getCode({
                    'mobile': $("#mobile").val(),
                    'type': 'common'
                });

                deferred.always(function(response) {
                    var response = response || {};

                    if (response.code == 0) {
                        vcode_countdown = true;
                        $smsBtn.addClass("disabled");

                        ui.remind("获取成功，请稍等");
                    } else {
                        response.msg && ui.remind(response.msg);
                        vcode_countdown = false;
                        $smsBtn.removeClass("disabled");
                    }
                });

                return deferred;
            },
            onFinish: function() {
                $smsBtn.html('重新发送');
                $smsBtn.removeClass("disabled");
                vcode_countdown = false;
            }
        });
    }

    var showShare = function () {
        var shareInfo = {
            title : '跟谁学问答-全品类名师为你即时解答问题',
            content : '专业认证老师，为你答疑解惑，尽在跟谁学问答',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577e1f9ab3486.png'
        };
        setShare(shareInfo);
    }

    return function(page_data) {

        // 取用户信息
        gsx_ready(function(config){
            userInfo = config;
        });

        // 提问科目
        askCourse
        .on('click', '.selected-course', function () { // 选择科目
            $(this).toggleClass('active');
            askCourse.find('.subject-list').toggle();
        })

        .on('click', '.outer-ul li', function () { // 选择科目
            // 兄弟节点去掉选中态
            $(this)
            .siblings('li')
            .each(function (index, item) {
                $(item).removeClass('selected');
            });

            // 内部li去掉选中态（如果有的话）
            $(this)
            .find('li')
            .each(function (index, item) {
                $(item).removeClass('selected');
            });

            // 当前项添加选中态
            $(this).addClass('selected');
        })

        .on('click', '.inner-ul li', function () { // 选择科目二
            askCourse.find('.subject-list').hide();

            var selectedCourse = askCourse.find('.selected-course');
            selectedCourse
            .find('.selected-course-name')
            .html($(this).data('dname'))
            .data('id', $(this).data('id'));
        });

        // 提问内容
        askNote
        .on('input', 'textarea', function () { // 输入框剩余字数

            var maxLength = $(this).attr('maxLength');
            var note = $(this).val();
            var leftLength;

            if (note.length <= maxLength) {

                leftLength = maxLength - note.length;

                $(this).next('.left-length')
                .html('还可以输入' + leftLength + '字');
            }
        });

        // 提问图片
        upLoadPic();

        picContainer
        .on('click', '.delete', function () { // 删除图片
            $(this).closest('li').remove();
            picContainer.find('.add-pic').show();
        });

        askContent
        .on('click', '.submit-question', function () { // 提交问题
            submitQuestion();
        });

        bindPhone
        .on('keyup', '#mobile', function () { // 手机号键盘事件
            if (validate.mobile(true)) {
                $smsBtn.addClass('on');
            } else {
                $smsBtn.removeClass('on');
            }
        })

        .on('click', '.btn-sms', function (argument) { // 获取验证码
            if (validate.mobile(true)) {
                getCodeMss({
                    mobile: $.trim($mobile.val()),
                    type: 'common'
                })
            }
        })

        .on('click', '.btn-bind', function () { // 绑定手机号
            var param = {};
            param.mobile = $mobile.val();
            param.smscode = $smsCode.val();

            if (validate.mobile(true) && validate.smsCode(true)) {
                service
                .post('/auth/loginSms', param, function (response) {
                    if (response.code == 0) {
                        // 绑定成功，发送提交问题请求
                        // var data = response.data;
                        submitQuestion(true);
                    } else {
                        ui.remind('绑定手机号失败');
                    }
                });
            }
        });
        // 分享
        showShare();


    }

});