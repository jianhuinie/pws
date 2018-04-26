/**
 * @file 金牌机构主页
 * @author niejianhui
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    var VideoDialog = require('common/component/VideoDialog');
    var ImageDialog = require('common/component/ImageDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var tianxiaoLog = require('common/tianxiaoLog');
    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');
    var service = require('common/service');
    var Slider = require('common/component/Slider');
    var bindScroll = require('common/bindScroll');
    var instance = require('cobble/util/instance');
    var Validator = require('cobble/form/Validator');
    var cookie = require('cobble/util/cookie');

    var container = $('.goldorg-index');
    var orgNav = $(".org-nav");
    var startScreen = $('.start-screen');
    var orgCarousel = $('.org-carousel');
    var footControl = orgCarousel.find('.footer-control');
    var advisoryForm = orgCarousel.find('#advisory-form');
    var advisory = orgCarousel.find('.header-advisory');
    var video = $('.org-videos');
    var course = $('.recommend-courses');
    var coupon = $('.org-coupons');
    var couponList = coupon.find('.coupon-list');
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.availHeight;

    exports.init = function () {

        base.init();
        var orgNum = store.get('orgnumber');
        tianxiaoLog.send(orgNum, 'index');

        //轮播图
        var carouselImgItem = orgCarousel.find('.carousel-img-item');
        carouselImgItem.css('width',screenWidth);
        carouselImgItem.find('span').css('width',screenWidth);

        new Slider({
            element: orgCarousel,
            itemSelector: '.carousel-img-item',
            iconSelector: '.org-select',
            duration: 150,
            delay: 4000,
            isVertical: false,
            activeClass: 'active',
            autoPlay: true,
            pauseOnHover: true,
            trigger: 'click'
        });

        //轮播图中的视频播放
        orgCarousel
        .on('click', '.has-video' , function (e) {
            var element = $(this);
            var title = element.data('name');
            new VideoDialog({
                url: element.data('video'),
                title: title ? title : '机构视频'
            });
        });

        //轮播图的底部icon居中
        var iconsLength = footControl.find('li').length;
        var footControlLeft = parseInt((screenWidth - (iconsLength * 19)) / 2);
        footControl.css('left', (footControlLeft + 'px'));
        
        //弹出教师视频
        video
        .on('click', '.video-detail' , function (e) {
            var element = $(this);
            var title = element.data('name');
            new VideoDialog({
                url: element.data('video'),
                title: title ? title : '机构视频'
            });
        });

        //在线咨询滚动显示
        var top = orgCarousel.offset().top + 475;
        var onLineConsult = $('.online-consult-side')
        var $window = instance.window;
        bindScroll($window, function (e) {
            if ($window.scrollTop() > top) {
                onLineConsult.addClass('show');
                coupon.fadeIn();
            } else {
                onLineConsult.removeClass('show');
                coupon.fadeOut();
            }
        }, 1);

        // 留单表单验证
        // var validator = new Validator({
        //     element: advisoryForm,
        //     realtime: true,
        //     fields: {
        //         name: {
        //             rules: {
        //                 required: true
        //             },
        //             errors: {
        //                 required: '请输入您的真实姓名'
        //             }
        //         },
        //         telephone: {
        //             rules: {
        //                 required: true,
        //                 pattern: /^1[34578](\d){9}$/,
        //             },
        //             errors: {
        //                 required: '请输入您的手机号',
        //                 pattern: '手机号格式错误'
        //             }
        //         }
        //     }
        // });

        //马上领取
        orgCarousel
            .on('click', '.get-now', function () {
                // if(validator.validate()) {
                    service
                        .createAdvisory({
                            objectNumber: orgNum,
                            contentType: 'jigou',
                            mobile: advisoryForm.find('input[name=telephone]').val(),
                            realName: advisoryForm.find('input[name=name]').val(),
                            detailUrl: window.location.href,
                            advisoryType: 6
                        })
                        .then(function (response) {
                            if (response.code === 0) {
                                success('提交成功', function () {
                                    location.reload();
                                });
                            }
                        });
                // }
            });

        //启动屏
        startScreen
            .on('change', 'input[type=checkbox]', function (e) {
                var noRemind = startScreen.find('input[name=noremind]')[0].checked;
                var checkboxIcon = startScreen.find('#checkbox-icon');
                if (noRemind) {
                    checkboxIcon.addClass('checked');
                }
                else {
                    checkboxIcon.removeClass('checked');
                }
            })
            .on('click', '.close-icon', function () {
                var noRemind = startScreen.find('input[name=noremind]')[0].checked;
                if (noRemind) {
                    cookie.set('SHOWREMIND', parseInt(new Date().getTime() / 1000));
                }
                startScreen.hide();
            });

        //启动屏cookie 
        if (!cookie.get('SHOWREMIND')) {
            var setLeft = parseInt((screenWidth - 850) / 2);
            var setTop = parseInt((screenHeight - 478) / 2);
            startScreen.css('left',(setLeft + 'px'));
            startScreen.css('top',(setTop + 'px'));
            startScreen.show();
        }
        else {
            var lastTime = cookie.get('SHOWREMIND');
            var now  = parseInt(new Date().getTime() / 1000);
            if (now - lastTime > 86400) {
                cookie.remove('SHOWREMIND');
            }
        }



        // 优惠卷相关
        var couponWidth = $('.coupon-item').length * 238 + 72;
        container
            .on('mouseover', '.org-coupons' ,function () {
                couponList.css('left', ('-' + couponWidth + 'px'));
                couponList.show();
            })
            .on('mouseout', '.org-coupons' ,function () {
                couponList.hide();
            });

        couponList
        .on('click', 'a', function (e) {
            var user = store.get('user');
            var hasLogin = user.number;
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                    }
                });
            }
            else if (user.type === 0) {
                new SwitchRoleDialog({
                    createText: '需要开通学生身份才能领取优惠券哦~现在开通？',
                    switchText: '需要切换学生身份才能领取优惠券哦~现在切换？',
                    switchTo: 'student',
                    onSuccess: function (data) {
                        location.reload();
                    }
                });
            }
            else {
                location.href = $(this).data('url');
            }
        });

    };
});