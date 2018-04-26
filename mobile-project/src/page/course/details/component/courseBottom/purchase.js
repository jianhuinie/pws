/**
 * Created by niumeng on 11/2016.
 */
define(function (require) {
    'use strict';

    var $ = require("zepto");
    var appController = require('common/app');
    var observer = require('common/mvc/observer');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var WeChatLoginDialog = require('common/weChatLogin/weChatLogin');

    function purchase(url, isApp, userInfo) {
        var submit = $('#btn-enrolling');
        var choseCourse = $('.course').filter('.chose');

        var purchaseLayerEle = $('#j_purchase');
        var numEle = purchaseLayerEle.find('#j_num');
        var plusEle = purchaseLayerEle.find('#j_plus');
        var minusEle = purchaseLayerEle.find('#j_minus');
        var sumEle = purchaseLayerEle.find('#j_sum');
        var submitEle = purchaseLayerEle.find('#j_submit');

        var price = parseFloat(sumEle.data('price'));

        var maskLayerEle = $('#j_mask');

        function setSum() {
            sumEle.html('¥' + (price * parseInt(numEle.html())));
        }

        setSum();

        submit.click(function () {
            if($(this).hasClass('j_disable')) {
                return;
            }

            if (!userInfo) {
                if (isApp) {
                    appController.getUserInfo(function() {
                        location.reload();
                    });
                } else {
                    var isWeixin = WeChatLoginDialog.isWeixin();
                    if (isWeixin) {
                        WeChatLoginDialog.addWechatDialog(location.href, function() {
                            location.reload();
                        });
                    } else {
                        var loginDialog = new LoginDialog();
                        loginDialog.show();
                        var listener1 = observer.addListener(loginDialog, 'success', function() {
                            location.reload();
                                //goBuyUrl(href);
                                /*me.attr('disabled', false);
                                $('.enrolling').click();*/
                        });
                        var listener2 = observer.addListener(loginDialog, 'display_changed', function() {
                            var display = this.get('display');
                            if (!display) {
                                observer.removeListener(listener1);
                                observer.removeListener(listener2);
                                $('.wechat-hide').hide();
                                loginDialog.destroy();
                            }
                        });
                    }
                }
            } else {
                maskLayerEle.show();
                purchaseLayerEle.css({
                    '-webkit-transform': 'translateY(0)',
                    'transform': 'translateY(0)'
                });
            }
        });

        maskLayerEle.click(function () {
            maskLayerEle.hide();
            purchaseLayerEle.css({
                '-webkit-transform': 'translateY(100%)',
                'transform': 'translateY(100%)'
            });
        });

        purchaseLayerEle.find('.close').click(function () {
            maskLayerEle.hide();
            purchaseLayerEle.css({
                '-webkit-transform': 'translateY(100%)',
                'transform': 'translateY(100%)'
            });
        });

        plusEle.click(function () {
            var curNum = parseInt(numEle.html());
            numEle.html(curNum + 1);

            setSum();
        });

        minusEle.click(function () {
            var curNum = parseInt(numEle.html());

            if (curNum <= 1) {
                return;
            }

            numEle.html(curNum - 1);

            setSum();
        });

        submitEle.click(function () {
            location.href = url + '&' + $.param({'hours': parseInt(numEle.html())});
        });
    }

    function jumpToChoicePosition() {
        $('#btn-enrolling').click(function () {
            if($(this).hasClass('j_disable')) {
                return;
            }

            var pos = $('#j_choose_course').offset().top - 50 - 10;

            $(window).scrollTop(pos);
        });
    }

    function jumpToPage(url, isApp, userInfo) {
        $('#btn-enrolling').click(function () {
            if($(this).hasClass('j_disable')) {
                return;
            }

            if (!userInfo) {
                if (isApp) {
                    appController.getUserInfo(function() {
                        location.reload();
                    });
                } else {
                    var isWeixin = WeChatLoginDialog.isWeixin();
                    if (isWeixin) {
                        WeChatLoginDialog.addWechatDialog(location.href, function() {
                            location.reload();
                        });
                    } else {
                        var loginDialog = new LoginDialog();
                        loginDialog.show();
                        var listener1 = observer.addListener(loginDialog, 'success', function() {
                            location.reload();
                                //goBuyUrl(href);
                                /*me.attr('disabled', false);
                                $('.enrolling').click();*/
                        });
                        var listener2 = observer.addListener(loginDialog, 'display_changed', function() {
                            var display = this.get('display');
                            if (!display) {
                                observer.removeListener(listener1);
                                observer.removeListener(listener2);
                                $('.wechat-hide').hide();
                                loginDialog.destroy();
                            }
                        });
                    }
                }
            } else {
                location.href = url;
            }
        });
    }

    return {
        purchase: purchase,
        jumpToChoicePosition: jumpToChoicePosition,
        jumpToPage: jumpToPage
    };
});
