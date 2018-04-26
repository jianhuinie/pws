/**
 * @file 2014.09新版的登录，分学生登录和老师登录两种方式
 * @author peilonghui
 */

define(function (require, exports) {

    'use strict';

    var LoginForm = require('common/component/LoginForm');
    var service = require('common/service');
    var store = require('common/store');
    var getAdMonitorUrl = require('common/function/getAdMonitorUrl');

    var container = $('#main');
    var studentBanner = container.find('.login-banner-student');
    var teacherBanner = container.find('.login-banner-teacher');
    var defaultData;
    var imageListForMonitor = [];

    var adIdMap = {
        dev: {
            student: '2',
            teacher: '3'
        },
        test: {
            student: '2',
            teacher: '3'
        },
        beta: {
            student: '2',
            teacher: '3'
        },
        www: {
            student: '2',
            teacher: '3'
        }
    };

    var hasAd = {
        student: false,
        teacher: false
    };

    function getBannerComponent(data) {

        var el = $(''
            +   '<a target="_blank" data-click-monitor="'
            +   (data.clickMonitor ? data.clickMonitor : '')
            +   '" href="' + (data.click ? data.click : 'javascript:;')
            +   '" title="' + (data.hover ? data.hover : '') + '">'
            +       '<img src="' + (data.material ? data.material : '') + '">'
            +   '</a>'
        );

        //banner.append(el);
        return el;

    }

    function addBanner(data) {
        if (hasAd.student) {
            studentBanner.append(getBannerComponent(data.student));
        }
        else {
            studentBanner.append(getBannerComponent(defaultData.student));
        }

        if (hasAd.teacher) {
            teacherBanner.append(getBannerComponent(data.teacher));
        }
        else {
            teacherBanner.append(getBannerComponent(defaultData.teacher));
        }
    }

    function sendToMonitor(data) {
        send(data.monitor);
    }

    function send(monitor) {
        //var monitor = monitor.replace(/^http:\/\//, '//'); //替换为当前协议

        //上送统计
        if (monitor) {
            monitor = getAdMonitorUrl(monitor);
            var img = new Image();

            // 保持引用
            var index = imageListForMonitor.push(img) - 1;

            img.onload =
            img.onerror = function () {
                // 清除引用
                img =
                img.onload =
                img.onerror = null;
                delete imageListForMonitor[index];
            };

            img.src = monitor;
        }
    }

    exports.init = function () {
        var container = $('#main');

        var env = store.get('env');
        var staticUrl = store.get('staticOrigin');
        var bannerData = {};

        var loginForm = new LoginForm({
            element: $('form')
        });

        defaultData = {
            student: {
                material: staticUrl + '/asset/img/static/login/banner_student.jpg',
                click: 'http://ju.genshuixue.com/?source=gsx_jhx_PC',
                hover: '聚惠学，一学就“惠”'
            },
            // teacher: {
            //     material: staticUrl + '/asset/img/static/login/banner_teacher.png',
            //     click: 'http://www.genshuixue.com/activity/teacherRank5',
            //     hover: '名师榜：登名师榜，领超值奖'
            // },
            teacher: {
                material: staticUrl + '/asset/img/static/login/banner_student.jpg',
                click: 'http://ju.genshuixue.com/?source=gsx_jhx_PC',
                hover: '聚惠学，一学就“惠”'
            }
        };

        service
        .fetchadvertisement({
            adId: adIdMap[env].student + ',' + adIdMap[env].teacher,
            cityId: store.get('cityId')
        })
        .done(function (response) {
            var data = response.data;

            if (data[adIdMap[env].student] && data[adIdMap[env].student].length > 0 && data[adIdMap[env].student][0].material) {
                hasAd.student = true;
                bannerData.student = data[adIdMap[env].student][0];
            }

            if (data[adIdMap[env].teacher] && data[adIdMap[env].teacher].length > 0 && data[adIdMap[env].teacher][0].material) {
                hasAd.teacher = true;
                bannerData.teacher = data[adIdMap[env].teacher][0];
            }

            addBanner(bannerData);
        })
        .fail(function () {
            addBanner(null);
        });

        var loginStatus = $('.form-radios').find('.active input').attr('value');
        if (loginStatus == 2) {
            $('.login-banner-teacher').hide();
            $('.login-banner-student').show();
        }
        else {
            $('.login-banner-student').hide();
            $('.login-banner-teacher').show();
        }

        loginForm
        .element
        .on('click', '.form-radios input', function (e) {

            var value = $(this).val();

            if (value === '2' && hasAd.student) {
                sendToMonitor(bannerData.student); //上送学生banner到统计
            }
            else if (value === '0' && hasAd.teacher) {
                sendToMonitor(bannerData.teacher); //上送老师banner到统计
            }
        });

        container
        .on('click', '.login-banner-teacher a, .login-banner-student a', function (e) {

            var monitor = $(this).data('click-monitor');
            send(monitor);
        });

    };

});