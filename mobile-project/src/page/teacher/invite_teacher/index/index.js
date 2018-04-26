/**
 * Created by nanci on 16/10/24.
 */
define(function(require,exports){

    'use strict';

    var app = require("common/app");
    var appShare = require("common/share/parts/appShare");
    var Comment = require("page/_common/comment");
    var doShare = require("common/share/doShare");
    var env = require('util/env');
    var Jockey = require('jockey');
    var lazyLoadImage = require('common/lazyLoadImage');
    var qrcode = require("common/qrcode");
    var service = require('common/service');
    var setShare = require('common/share/initialize');
    var ui_new = require('common/ui');
    // var WAT = require('wat');

    var scriptData;

    // bugfix: 撤销返回按下后, page-title-does-not-change
    function setbackReturnedTitle() {
        if (app.isApp()) {
            $('body').on('click', '.teacher-student .nums', function (e) {
                e.preventDefault();
                var url = $(this).attr('href');
                app.send('toNewWindow', {
                    url: location.protocol + '//' + location.host + url,
                    web_url: location.protocol + '//' + location.host + url
                });
            });
        }
    }

    function doNewShareFunc(channel, data) {
        var options =
        $.extend({
            channel: channel
        },
        {
            title: data.title,
            content: data.content,
            img: data.img,
            url: data.url
        });
        Jockey.send('newSetShare', options);
    }

    function doShareFunc(channel, data) {
        // if (env.os.isIOS) {
            // alert('you are in ios now');
            var options =
            $.extend({
                channel: channel
            },
            {
                title: data.title,
                content: data.content,
                img: data.img,
                url: data.url
            });
            Jockey.send('newSetShare', options);
        // }
        // else {
            // alert('you are in android now');
            // var options =
            // {
            //     title: data.title,
            //     content: data.content,
            //     img: data.img,
            //     url: data.url
            // };
            // setShare(options);
            // doShare(channel, options);
            // doShare(channel, JSON.parse(data));
        // }
    }

    function toastFunc() {
        $.post('/tcenter/invite-register/shareAjax', {
            invite_code: scriptData.inviteCode,
            user_role: scriptData.userRole
        }, function (res) {
            if (res.code === 0) {
                ui_new.remind("恭喜您获得了20学分");
            }
            else if (res.code !== 0) {
                return;
            }
        });
    }

    return function (page_data) {

        scriptData = page_data;
        lazyLoadImage.init();

        setbackReturnedTitle();
        // var shareData = scriptData.share;
        // var shareConfig = {};

        // shareConfig['share_pyq'] = shareData.share_pyq;
        // shareConfig['share_weixin'] = shareData.share_weixin;

        // shareConfig['share_qq'] = shareData.share_qq;

        // shareConfig['share_qzone'] = shareData.share_qzone;

        // shareConfig['share_weibo'] = shareData.share_weibo;

        // shareConfig['share_sms'] = shareData.share_sms;

        // shareConfig['share_mail'] = shareData.share_email;

        // shareConfig['copy_link'] = shareData.copy_link;

        // setShareInfo(scriptData.share.share_email);
        // setShareInfo(scriptData.share.share_weibo);
        // setShare(shareConfig);
        // setShareInfo(scriptData.share.share_sms);
        // setShareInfo(scriptData.share.share_weixin);
        // setShareInfo(scriptData.share.share_pyq);
        // setShareInfo(scriptData.share.share_qzone);

        var isQrCodeInited = false; //检测二维码是否已经初始化
        if (!isQrCodeInited) {
            service.post('/short_url/gen', {
                url: scriptData.qrCodeUrl
            }, function (res) {
                if (res.code == 0) {
                    qrcode({
                        text: res.data.short_url,
                        width: 207,
                        height: 207,
                        element: $('.block-qr-code .img')
                    })
                }
                else {
                    isQrCodeInited = false;
                }
            });
        }

        var watUrl = 'http://touchstart.genshuixue.com/gs.gif';
        var comment = new Comment();
        $('body')
        .on('touchstart', '.top-bar teacher', function (e) {
            e.preventDefault();
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv_showt'
            });
            location.href = $(this).attr('href');
        })
        .on('touchstart', '.top-bar student', function (e) {
            e.preventDefault();
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv_shows'
            });
            location.href = $(this).attr('href');
        })
        .on('touchstart', '.weixin0', function () {
            // alert('sss');
            toastFunc();
            // setShareInfo(scriptData.share.share_weixin);
            doShareFunc('share_weixin', scriptData.share.share_weixin);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv_wechat'
            });
        })
        .on('touchstart', '.pyq0', function () {
            // setShareInfo(scriptData.share.share_pyq);
            toastFunc();
            doShareFunc('share_pyq', scriptData.share.share_pyq);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv_moments'
            });
        })
        .on('touchstart', '.QQ0', function () {
            toastFunc();
            doShareFunc('share_qq', scriptData.share.share_qq);
            // setShareInfo(scriptData.share.share_qq);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv_qq'
            });
        })
        .on('touchstart', '.weibo0', function () {
            // setShareInfo(scriptData.share.share_weibo);
            toastFunc();
            doShareFunc('share_weibo', scriptData.share.share_weibo);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv_weibo'
            });
        })
        .on('touchstart', '.qzone0', function () {
            toastFunc();
            doShareFunc('share_qzone', scriptData.share.share_qzone);
            // setShareInfo(scriptData.share.share_qzone);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv_qzone'
            });
        })
        .on('touchstart', '.sms0', function () {
            toastFunc();
            doShareFunc('share_sms', scriptData.share.share_sms);
            // setShareInfo(scriptData.share.share_sms);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv_mess'
            });
        })
        .on('touchstart', '.weixin2', function () {
            toastFunc();
            doShareFunc('share_weixin', scriptData.share.share_weixin);
            // setShareInfo(scriptData.share.share_weixin);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv2_wechat'
            });
        })
        .on('touchstart', '.pyq2', function () {
            toastFunc();
            doShareFunc('share_pyq', scriptData.share.share_pyq);
            // setShareInfo(scriptData.share.share_pyq);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv2_moments'
            });
        })
        .on('touchstart', '.QQ2', function () {
            toastFunc();
            doShareFunc('share_qq', scriptData.share.share_qq);
            // setShareInfo(scriptData.share.share_qq);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv2_qq'
            });
        })
        .on('touchstart', '.weibo2', function () {
            toastFunc();
            doShareFunc('share_weibo', scriptData.share.share_weibo);
            // setShareInfo(scriptData.share.share_weibo);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv2_weibo'
            });
        })
        .on('touchstart', '.qzone2', function () {
            toastFunc();
            doShareFunc('share_qzone', scriptData.share.share_qzone);
            // setShareInfo(scriptData.share.share_qzone);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv2_qzone'
            });
        })
        .on('touchstart', '.sms2', function () {
            toastFunc();
            doShareFunc('share_sms', scriptData.share.share_sms);
            // setShareInfo(scriptData.share.share_sms);
            comment.send({
                type: 'tm_inv',
                stype: 'tm_inv2_mess'
            });
        });

        $('.invite-btn').on('click', function() {
            // $(this).parent().siblings().removeClass('highlight-tab');
            // $(this).parent().addClass('highlight-tab');
        //     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname ==
        //         this.hostname) {
                // var $target = $(this.hash);
                // $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                // if ($target.length) {
                    // var targetOffset = $target.offset().top;
                    // $('body').on('click', function () {
                        $('body').scrollTop($('.block-share').offset().top);
                    // });
                    // return false;
                // }
        //     }
        });


    }

});