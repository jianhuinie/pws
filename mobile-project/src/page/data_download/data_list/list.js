/**
 * Created by wuxuelan on 16/9/08.
 */
define(function(require) {
    'use strict';
    var $ = require("zepto");
    var ui = require("common/ui");
    var util_function = require('util/function');
    var user = require('common/user');
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
    var browserMask = $('.browser-mask');
    var appMask = $('.app-mask');
    var isWeixin;
    var isQQ;
    var pageData;
    var to_login;
    var to_new;
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

    //clickPre
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

    //点击下载
    function download(ele, isWeixin, isQQ) {
        ele.on('click', function () {
            gsx_ready(function (config) {
                if (config.user && config.user.type == '0') {
                    ui.remind('老师身份暂不支持下载');
                    return;
                }
                else {
                    if (isWeixin || isQQ) {
                        browserMask.show();
                    }
                    else {
                        appWake();
                    }
                }
            });

        });
    }

    //调起APP
    function appWake() {
        var courseType = pageData.course_info.course_type;
        var courseNumber = pageData.course_info.course_number;
        var target = ''
            +'bjhlstudent://o.c?a=class_material_list&course_number='
            + courseNumber
            + '&course_type='
            + courseType;

        //var target = 'bjhlstudent://o.c?a=student_order_list&type=1';
        openApp({
            type: 'student',
            url: decodeURIComponent(target)
        }, function (isSuc) {
            if (!isSuc) {
                location.href = 'http://m.genshuixue.com/app/dw?t=s&ct=';
            }
        });
    }
    return function(page_data) {
        pageData = page_data;
        course_number = page_data.course_info.course_number;
        course_type = page_data.course_info.course_type;

        $('.nav-wrap-right .nav-button').tap(function () {
            // require(['common/ui/NavPanel/NavPanel'], function (NavPanel) {
                navPanel.show();
            // });
        });
        lazyLoadImage.init();
        setShareInfo(page_data.share_info);

        clickPre();

        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        isQQ = env.thirdapp && env.thirdapp.isQQ;
        var downOne = container.find('.download');
        var downAll = container.find('.down-all');

        download(downOne, isWeixin, isQQ);
        download(downAll, isWeixin, isQQ);

        browserMask.on('click', function () {
            $(this).hide();
        });
        appMask.on('click', function () {
            $(this).hide();
        });

        container.find('.to-preview').on('click', function () {
            var me = $(this);
            var type = me.data('type');
            var preViewTypes = ['pdf', 'word', 'excel', 'ppt', 'txt', 'png', 'jpg', 'jpeg'];
            if (preViewTypes.indexOf(type) === -1) {
                ui.remind('该文件格式暂不支持预览');
                return;
            }
            gsx_ready(function (config) {
                if (config.user && config.user.type == '0') {
                    ui.remind('老师身份暂不支持预览');
                    return;
                }
                else {
                    fid = me.data('fid');
                    var url = me.data('href');
                    to_new = me.data('tonew');
                    to_login = me.data('login');
                    if (to_login == 'toLogin') {
                        user.loginStudent(function() {
                            location.reload();
                        });
                    }
                    else if (to_new == 'toNew') {
                        $.ajax({
                            url: '/course_material/previewAjax',
                            type: 'get',
                            data: {
                                fid: fid
                            },
                            success: function (response) {
                                if (response.code != 0) {
                                    ui.alert(response.msg);
                                }
                                else {
                                    if (img_type[type]) {
                                        location.href = location.origin + '/course_material/img_pre?fid=' + fid;
                                    }
                                    else {
                                        location.href = response.data.preview_url;
                                    }
                                }
                            }
                        })
                    }
                    else {
                        location.href = url;
                    }
                }
            });
        });



    }
});