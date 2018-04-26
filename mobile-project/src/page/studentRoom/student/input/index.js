/**
 * 生源大厅信息录入页
 * @author shubaiqiao
 * @date   2017-01-04
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var template = require('artTemplate');
    var CodeButton = require('common/ui/CodeButton');
    var imageCode = require('common/getImgCode');
    var ui = require('common/ui');
    var service = require('common/service');
    var app = require('common/app');
    var openAppWindow = require('common/openAppWindow');
    var user = require('common/user');
    var setShare = require('common/share/initialize');

    var slideInRender = template.compile(require('text!./slideInSelect.tpl'));
    var suggesionRender = template.compile(require('text!./suggestion.tpl'));
    var container = $('.container');
    var postUrl = '';
    var courseValue;
    var serializeJson = {};

    /**
     * 初始化下滑入多选框
     * @param  {[type]} title 点击dom的类名
     * @param  {[type]} html  多选框的html
     */
    function initSlideWindow(title, html) {
        var dialog = new SlideInDialog({
            content: html
        });
        container.find('.information.' + title).on('click', function () {
            dialog.show();
        });
        $('.slide-container.' + title).find('.cancel').on('click', function () {
            dialog.hide();
        });
        $('.slide-container.' + title).find('.select-item').on('click', function (e) {
            var content = $(this).find('.content');
            $('.information.' + title).html(content.text()).removeClass('placeholder');
            $('.' + title).val(content.text());
            $('.slide-container.' + title).find('.select-item').removeClass('selected');
            $(this).addClass('selected');
            dialog.hide();
        });
    }

    /**
     * 表单校验
     * @type {Object}
     */
    var validate = {
        mobile: function(value){
            value = $.trim(value);
            if(!value){
                ui.remind("请输入手机号");
                return false;
            }
            var reg = /^(1[0-9])\d{9}$/ig;
            if(reg.test(value)){
                return true;
            }
            ui.remind("手机号码格式不正确");
            return false;
        },
        verify: function(value){
            value = $.trim(value);
            if(!value){
                ui.remind("请输入验证码");
                return false;
            }
            if(value){
                return true;
            }
            ui.remind("验证码错误");
            return false;
        },
        subject: function(value){
            value = $.trim(value);
            if(!value){
                ui.remind("请输入学习科目");
                return false;
            }
            return true;
        },
        info: function(value){
            value = $.trim(value);
            if(!value){
                ui.remind("请输入详细描述");
                return false;
            }
            return true;
        },
        userName: function(value){
            value = $.trim(value);
            if(!value){
                ui.remind("请输入真实姓名");
                return false;
            }
            return true;
        },
    };

    /**
     * 发送手机号获取验证码
     * @return {[type]} [description]
     */
    function sendMobileInit() {
        var button = container.find("#verify");
        var mobile = container.find("#mobile");
        // 调用获取验证码接口
        var codeButton = new CodeButton({
            element: button,
            text: '重新发送($time$)',
            send: function () {
                if (!validate.mobile(mobile.val()) || button.hasClass('disable')){
                    $('input[name="sms_code"]').prev().show();
                    return false;
                }
                // ajax获取短信验证码
                var deferred = imageCode.getCode({
                    'mobile': mobile.val(),
                    'type': 'signin'
                    // 'captcha_name': 'signin'
                });
                deferred.always(function (response) {
                    var response = response || {};
                    if(response.code === 0) {
                        button.addClass("disabled");
                        ui.remind("短信验证码发送中，请注意接收");
                    } else {
                        response.msg && (ui.remind(response.msg));
                        button.removeClass("disabled");
                    }
                });
                return deferred;
            },
            onFinish: function () {
                button.html('重新发送');
                button.removeClass("disabled");
            }
        });
    }

    /**
     * 关闭按钮的初始化以及绑定事件
     * @return {[type]} [description]
     */
    function emptyInput() {
        container.find('input').on('input', function () {
            var emptyIcon = $(this).parent().find('.empty-icon');
            if ($(this).val() === "") {
                emptyIcon.hide();
            } else {
                emptyIcon.show();
            }
            $('.a-icon').hide();
        });
        container.find('textarea').on('input', function () {
            $('.a-icon').hide();
        });
        container.find('.empty-icon').on('click', function () {
            $(this).prev().val("").focus();
            $(this).hide();
        });
    }

    function validateAll() {
        if (!validateTip($('input[name=course_name]'), 'subject') ||
            !validateTip($('textarea'), 'info') ||
            !validateTip($('input[name=user_name]'), 'userName') ||
            !validateTip($('input[name=mobile]'), 'mobile')) {
            return false;
        }
        return true;
    }

    function validateTip(input, type) {
        if (!validate[type](input.val())) {
            input.prev().show();
            return false;
        } else {
            return true;
        }
    }

    /**
     * 提交表单
     * @return {[type]} [description]
     */
    function submitForm(userInfo) {
        $('.button').on('click', function () {
            if ($('#verify-code').length !== 0) {
                if (!validate.verify($('#verify-code').val())) {
                    $('input[name="sms_code"]').prev().show();
                    return false;
                }
            }
            if (!validateAll()) {
                return false;
            }
            var data = $('form');
            data = data.serializeArray();
            // 线上线下
            switch (data[3].value)
            {
                case '线上':
                    data[3].value = 2;
                    break;
                case '线下':
                    data[3].value = 0;
                    break;
                default:
                    data[3].value = 1;
            }
            // 性别
            switch (data[4].value)
            {
                case '女':
                    data[4].value = 0;
                    break;
                case '男':
                    data[4].value = 1;
                    break;
                default:
                    data[4].value = 2;
            }
            data[6].value = parseInt(data[6].value);
            for(var i = 0; i < data.length; i++) {
                serializeJson[data[i].name] = data[i].value;
            }
            if (location.href.indexOf('hall-teacher') === -1) {
                postUrl = '/hall-student/addNewRecord';
            } else {
                postUrl = '/hall-teacher/addNewRecord';
            }
            if (!userInfo && !app.isApp()) {
                // 潜注册
                $.ajax({
                    url: 'https://www.genshuixue.com/auth/signupin_mobile_ajax',
                    data: {
                        mobile: $('input[name="mobile"]').val(),
                        smscode: $('input[name="sms_code"]').val()
                    },
                    dataType: 'jsonp'
                }).done(function (response) {
                    if (response.code === 0) {
                        submitAjax(postUrl, serializeJson);
                    }
                });
            } else {
                submitAjax(postUrl, serializeJson);
            }
        });
    }

    function submitAjax (postUrl, serializeJson) {
        service.post(postUrl, serializeJson, function (response) {
            if (response.code === 0) {
                // 跳转生源大厅列表页
                ui.remind('发布成功');
                var url = '';
                if (location.href.indexOf('history') !== -1) {
                    if (app.isApp()) {
                        Jockey.send('finish');
                        // app.js中不支持finish
                        // app.send('finish');
                    } else {
                        window.history.back();
                    }
                    return;
                }
                if (location.href.indexOf('hall-teacher') === -1) {
                    url = '/hall-student/list?type=my_published';
                } else {
                    url = '/hall-teacher/list?type=my_published';
                }
                if (app.isApp()) {
                    openAppWindow.open(location.origin + url);
                } else {
                    location.href = url;
                }
            }
        });
    }

    /**
     * 初始化表单，如果用户已登录，则自动填入信息
     * @return {[type]} [description]
     */
    function initForm() {
        var userInfo = user.getUserInfo();
        if (userInfo && userInfo.name) {
            container.find('input[name=user_name]').val(userInfo.name).attr('readonly', 'readonly');
            if (userInfo.mobile) {
                container.find('input[name=mobile]').val(userInfo.mobile).attr('readonly', 'readonly');
                container.find('input[name=sms_code]').parent().remove();
            }
        }
    }

    /**
     * 初始化搜索建议框
     * @return {[type]} [description]
     */
    function initSuggestion() {
        container.find('input[name=course_name]').on('keyup', function () {
            $('.input-suggestion').remove();
            courseValue = $(this).val();
            service.post('/seek_teacher/subjectRecommend', {keyword: courseValue}, function (response) {
                if (response.code === 0) {
                    var html = suggesionRender({
                        list: response.data
                    });
                    container.find('input[name=course_name]').parents('.item').after(html);
                }
            });
        });
        container.on('click', '.key-word', function () {
            container.find('input[name=course_name]').val($(this).text());
            $('.input-suggestion').remove();
        });
    }

    var doShare = function () {
        var shareInfo = {
            title: '跟谁学－15分钟帮您推荐好老师',
            content: '全球最大的找老师平台，15分钟帮您推荐好老师',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569391321fe16.png',
            url: location.href
        };
        setShare(shareInfo);
    };

    return function (page_data) {
        var userInfo = user.getUserInfo();
        var sexHtml = slideInRender({
            title: '老师性别',
            content: ['不限制', '女', '男'],
            name: 'sex'
        });
        var sexDialog = new SlideInDialog({
            content: sexHtml
        });
        var priceHtml = slideInRender({
            title: '学费',
            content: ['双方协商', '¥100-¥200', '¥200-¥300', '¥300-¥500', '¥500以上'],
            name: 'price'
        });
        var priceDialog = new SlideInDialog({
            content: priceHtml
        });
        var lessonWayHtml = slideInRender({
            title: '授课方式',
            content: ['不限制', '线上', '线下'],
            name: 'lesson-way'
        });
        var lessonWayDialog = new SlideInDialog({
            content: lessonWayHtml
        });
        initSlideWindow('sex', sexHtml);
        initSlideWindow('price', priceHtml);
        initSlideWindow('lesson-way', lessonWayHtml);
        initForm();
        initSuggestion();
        sendMobileInit();
        emptyInput();
        submitForm(userInfo);
        doShare();
    };

});