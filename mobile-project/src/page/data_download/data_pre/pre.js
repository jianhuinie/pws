/**
 * Created by wuxuelan on 16/9/08.
 */
define(function(require) {
    'use strict';
    var $ = require("zepto");
    var ui = require("common/ui");
    var user = require('common/user');
    var util_function = require('util/function');
    var MVCObject = require('common/mvc/MVCObject');
    var string = require('util/string');
    var service = require('common/service');
    var lazyLoadImage = require('common/lazyLoadImage');
    var page_layout = require('common/page_layout');
    var app = require('common/app');
    var env = require('util/env');
    var openApp = require('common/app_wakeup');
    var setShare = require('common/share/initialize');
    var navPanel = require('common/navPanel');

    var container = $('.container');
    var appMask = $('.app-mask');
    var browserMask = $('.browser-mask');
    var isWeixin;
    var isQQ;
    var fid;
    var course_number;
    var course_type;
    var img_type = {
        jpeg: 1,
        jpg: 1,
        gif: 1,
        png: 1
    };

    function setShareInfo(shareInfo) {
        var options = {
            title: shareInfo.title,
            content: shareInfo.content,
            img: shareInfo.img,
            url: shareInfo.url
        };
        setShare(options);
    }

    //上报
    function clickLog(ops) {
        require(['common/liudanClickLog/liudanClickLog'], function (log) {
            log.send($.extend({
                type: "",
                stype: 1,
                fid: fid,
                course_number: course_number,
                course_type: course_type
            }, ops));
        });
    };

    //调起APP
    function appWake(page_data) {
        var target = ''
            +'bjhlstudent://o.c?a=class_single_material_preview&course_number='
            + course_number
            + '&course_type='
            + course_type
            + '&fid='
            +fid;

        //var target = 'bjhlstudent://o.c?a=student_order_list&type=1';
        openApp({
            type: 'student',
            url: decodeURIComponent(target)
        }, function (isSuc) {
            if (!isSuc) {
                location.href = 'https://m.genshuixue.com/app/dw?t=s&ct=';
            }
        });
    }

    //立即预览－上报
    function clickPre(){
        $('.logClick').click(function(){
            var cType = $(this).data('ctype');
            var sName = $(this).data('cname');

            clickLog({
                stype: cType,
                type: sName
            });
        });
    };

    //initframe
    function initFrame() {
        var height = window.screen.height;
        var navHeight = $('.nav-bar').height();
        var courseHeight = $('.course-info').height();
        var fileHeight = (height - navHeight - courseHeight - 20) + 'px';
        $('#frame-pre').css('height',fileHeight).show();
    }
    return function(page_data) {
        fid = page_data.file_info.fid;
        course_type = page_data.course_info.course_type;
        course_number = page_data.course_info.course_number;

        var isApp = app.isApp();
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        isQQ = env.thirdapp && env.thirdapp.isQQ;

        $('.nav-wrap-right .nav-button').tap(function () {
            // require(['common/ui/NavPanel/NavPanel'], function (NavPanel) {
                navPanel.show()
            // });
        });
        //initFrame();
        lazyLoadImage.init();
        setShareInfo(page_data.share_info);
        clickPre();

        container.find('.download').on('click', function () {
            if (isWeixin || isQQ) {
                browserMask.show();
            }
            else {
                appWake(page_data);
            }
        });

        //点击登录弹出登录框
        container.find('.to-login').on('click', function () {
            user.loginStudent(function() {
                location.reload();
            });
        });

        browserMask.on('click', function () {
            $(this).hide();
        });

        appMask.on('click', function () {
            $(this).hide();
        });

        //立即报名
        container.find('.to-enter').on('click', function () {
            var href = $(this).data('href');
            location.replace(href);
        });

        //立即预览
        container.find('.to-preview').on('click', function () {
            var me = $(this);
            var type = me.data('type');
            var href = me.data('href');
            var fid = me.data('fid');
            if (img_type[type]) {
                location.href = location.origin + '/course_material/img_pre?fid=' + fid;
            }
            else {
                location.href = href;
            }
        });


    }
});