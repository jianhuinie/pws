/**
 * Created by nanci
 */
define(function(require) {

    'use strict';

    var app = require("common/app");
    var Dialog = require('common/ui/FullPageDialog/FullPageDialog');
    var env = require('util/env');
    var lazyLoadImage = require("common/lazyLoadImage");
    var observer = require('common/mvc/observer');
    var service = require('common/service');
    // var setShare = require('common/share/initialize');
    // var store = require('common/store');
    var url = require("util/url");
    var urlParams = url().params;

    function orientationChange() {
        // in order to solve url-too-long-problem
        // var bottomSrc = $('.bottom-layer-img1').attr('data-src');
        var bottomSrc = $('.bottom-layer-img1').attr('src');
        var bottomImg1 = $('.bottom-layer-img1');
        var bottomImg2 = $('.bottom-layer-img2');
        if (window.innerHeight < window.innerWidth) {
            // bottomImg2.removeClass('hidden');
            // alert('sss')
            // $('.bottom-layer-img1').attr('src', './image/landscape@2x.png');
            $('.bottom-layer-img1').attr('src', 'https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5813209eab2ee.png');
            // bottomSrc = "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5813209eab2ee.png";
            // lazyLoadImage.init();
        }
        else {
            // alert('sss')
            // bottomImg1.removeClass('hidden');
            // $('.bottom-layer-img1').attr('src', './image/portrait@2x.png');
            $('.bottom-layer-img1').attr('src', 'https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5813209f0b57c.png');
            // bottomSrc = "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5813209f0b57c.png";
            // lazyLoadImage.init();
        }
        lazyLoadImage.init();
        $(window).on("orientationchange", function( event ) {
            // alert('ss');
            // bottomImg1.addClass('hidden');
            // bottomImg2.addClass('hidden');
            setTimeout(function () {
                if (window.innerHeight > window.innerWidth) {
                    // alert('sss')
                    // bottomSrc = "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5813209f0b57c.png";
                    $('.bottom-layer-img1').attr('src', 'https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5813209f0b57c.png');
                    // $('.bottom-layer-img1').attr('src', './image/portrait@2x.png');
                    // lazyLoadImage.init();
                    // setTimeout(function () {
                        // bottomImg2.addClass('hidden');
                        // bottomImg1.removeClass('hidden');
                    // }, 200);
                }
                else {
                    // alert('sss')q
                    // $('.bottom-layer-img1').attr('src', './image/landscape@2x.png');
                    $('.bottom-layer-img1').attr('src', 'https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5813209eab2ee.png');
                    // bottomSrc = "https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5813209eab2ee.png";
                    // lazyLoadImage.init();
                    // setTimeout(function () {
                        // bottomImg1.addClass('hidden');
                        // bottomImg2.removeClass('hidden');
                    // }, 200);
                }
            }, 1000);
        });
        // lazyLoadImage.init($('.bottom-layer-img').parent(), true);
        lazyLoadImage.init();
    }
    return function (){

        // app.send('')

        if (!app.isApp()) {
            $('.return-to-live.return-to-live-in-m').removeClass('hidden');
        }
        else {
            $('.title-in-app').removeClass('hidden');
            // app.send('doSharePanel', {});
        }

        // debugger;
        orientationChange();
        // lazyLoadImage.init();
        // alert('sss');
        $('body')
        .on('click', '.not-sign-up', function (e) {
            $('.feedback-block').removeClass('hidden');
        })
        .on('click', '.now-sign-up', function (e) {
            var couponId = $('.tip-block').attr('coupon-id');
            if (couponId) {
                e.preventDefault();
                var that = $(this);
                service.post('/coupon/getCoupon', {
                    coupon_id: couponId,
                }, function (res) {
                    if (res.code === 0) {
                        location.href = that.attr('href');     
                    }
                });
            }
        })
        .on('click', '.bottom-layer-img1', function (e) {
            $('.feedback-block').addClass('hidden');
        })
        .on('click', '.bottom-layer-img2', function (e) {
            $('.feedback-block').addClass('hidden');
        })
        .on('click', '.feedback-block .submit-btn', function (e) {
            var reasonNo = $('.feedback-block .flag-selected').parent().attr('data-index');
            // var reasonNo = $('.feedback-block .item').index($('.feedback-block .flag-selected').parent()) + 1;
            service.post('/class_course/trial_feedback_ajax', {
                reason: reasonNo,
                room_no: urlParams.room_no
            }, function (res) {
                $('.feedback-block').addClass('hidden');
                if (res.code == 0) {
                    var detailUrl = $('.tip-block').attr('data-detail-url');
                    if (app.isApp()) {
                        app.send('toNewWindow', {
                            url: detailUrl,
                            web_url: detailUrl
                        });
                    }
                    else {
                        location.href = detailUrl;
                    }
                }
            });
        });
        $('.options-list .item')
        .on('click', function (e) {
            // alert('sss');
            $(this).siblings().find('.flag').removeClass('flag-selected');
            $(this).find('.flag').addClass('flag-selected');
        });

    }

});