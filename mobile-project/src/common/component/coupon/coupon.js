define(function(require, exports) {
    'use strict';
    var $ = require('zepto');
    var template = require('artTemplate');
    var couponRender = template.compile(require('text!./coupon.tpl'));
    var service = require('common/service');
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var app = require('common/app');
    var ui_new = require('common/ui');
    var user = require('common/user');
    var lazyLoadImage = require('common/lazyLoadImage');
    var deviceRatio;

    // hurry: 由于接口太慢，所以加一个promise
    var dtd = $.Deferred();
    var userInfo;
    //优惠券
    var couponFunc = function(options, container) {
        service.post('/coupon/couponListNew',
            options,
            function(res) {
                if (res.code == 0) {
                    var dialog;
                    var couponList = res.data.coupon_list;
                    var html = couponRender({
                        couponList: couponList
                    });

                    if (container) {
                        container.html(html);
                    }
                    else {
                        if (!dialog) {
                            dialog = new SlideInDialog({
                                content: html
                            });
                        }
                        var couponContainerBox = $('.coupon-container-box');
                        var couponBoxs = $('.coupon-boxs');
                        if (couponList.length == 2) {
                            couponContainerBox.css('height', 310 * deviceRatio + 'px');
                            couponBoxs.css('height', 270 * deviceRatio + 'px');
                        } else if (couponList.length == 1) {
                            couponContainerBox.css('height', 210 * deviceRatio + 'px');
                            couponBoxs.css('height', 160 * deviceRatio + 'px');
                        }
                        dialog.show();
                    }
                    getCouponFunc();
                    $('.slide-close').on('click', function() {
                        dialog.hide();
                    });
                    dtd.resolve();
                }
                else {
                    dtd.reject();
                }
            });
    }

    //点击领取优惠券、展开优惠券规则的操作
    var getCouponFunc = function() {
        var couponItemBox = $('.coupon-item-box');
        couponItemBox.on('click', function(e) {
            var that = $(this);
            var dom = e.target;
            dom = $(dom);
            var status = that.data('status');
            var index = that.data('index');
            var height = 0;
            if (status == 0) {
                that.siblings('.rule-boxs').removeClass('hide');
                that.attr('data-status', 1);
                that.find('.open-icon').attr('src', 'https://imgs.genshuixue.com/0cms/d/file/content/2016/12/58576d9957016.png');
            } else {
                that.attr('data-status', 0);
                that.siblings('.rule-boxs').addClass('hide');
                that.find('.open-icon').attr('src', 'https://imgs.genshuixue.com/0cms/d/file/content/2016/12/584e9903420eb.png');
            }

            couponItemBox.each(function() {
                var there = $(this);
                if (there.data('index') < index) {
                    height += there.height() + there.siblings('.rule-boxs').height();
                }
            });

            var couponBox = $('.coupon-boxs');

            // 30 40 50 是距离顶部的padding，然后每个优惠券之间有10的间距，所以每增加一级都要加10
            var paddingHeight = [30 * deviceRatio, 40 * deviceRatio, 50 * deviceRatio];
            if(that.data('list') > 0) {
                if (index == 2) {
                    couponBox.css('padding-bottom', 180 * deviceRatio + 'px');
                } else if (index == 1) {
                    couponBox.css('padding-bottom', 80 * deviceRatio + 'px');
                }
                couponBox.scrollTop(height + paddingHeight[index]);
            } else {
                couponBox.css('padding-bottom', '0');
            }
            if (dom.hasClass('normal')) {
                var there = that.find('.coupon-status .normal');
                service.post('/coupon/getCoupon', {
                    coupon_id: there.data('id')
                }, function(res) {
                    if (res.code == 0) {
                        ui_new.remind('领取成功');
                        there.text('已领取');
                        there.addClass('other');
                        there.removeClass('normal');
                        that.siblings('.rule-boxs').removeClass('hide');
                        that.attr('data-status', 1);
                        that.find('.open-icon').attr('src', 'https://imgs.genshuixue.com/0cms/d/file/content/2016/12/58576d9957016.png');
                    }
                });
            }
        });

        var ruleItem = $('.coupon-item').find('.rules-item').on('click', function() {
            var that = $(this);
            var number = that.data('number');
            var type = that.data('type');
            var url = that.data('url');
            if (app.isApp()) {
                if (type == 3) {
                    // 注意：视频课的number必须转化成字符串，否则app不支持
                    var param = {
                        number: number + '',
                        index: ''
                    };
                    app.send('toVideoCourseDetail', param);
                } else {
                    app.openNewWindow(url);
                }
            } else {
                location.href = url;
            }
        });

    };

    exports.init = function (options, container) {
        userInfo = user.getUserInfo();
        var ratio = $('#viewport').attr('ratio');
        deviceRatio = 1;
        if (ratio < 1) {
            deviceRatio = window.devicePixelRatio;
        }
        //deviceRatio = options.scale ? options.scale : window.devicePixelRatio;
        if (userInfo && userInfo.number != '') {
            couponFunc(options, container);
        } else {
            // TODO: 避免关闭登录框
            setTimeout(function () {
                dtd.resolve();
            });
            user.loginStudent(function() {
                couponFunc(options, container);
            });
        }
        return dtd.promise();
    };

});