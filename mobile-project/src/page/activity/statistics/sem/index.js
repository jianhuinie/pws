/**
*create by huangshiming 16/5/12
**/

define(function(require,exports){
    'use strict';
    var $ = require("zepto");
    var Dialog = require('common/ui/FullPageDialog/FullPageDialog');
    var cookie = require("util/cookie");
    var env = require('util/env');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');

    function paramsSender(options){
        var id = options.id;
        var keyP = id;
        //加QQ点击
        $('.freeZiliao').on('click', function(){
            habo.send({
                type: 'activity' + keyP,
                stype: 'click',
                key: keyP + '_qq'
            });
        });
        //领取优惠卷点击
        $('.item-sendSMS').on('click', function(){
            habo.send({
                type: 'activity' + keyP,
                stype: 'click',
                key: keyP + '_youhuiquan'
            });
        });
        //领取底部资料
        $('.free-ziliao-sms').on('click', function(){
            habo.send({
                type: 'activity' + keyP,
                stype: 'click',
                key: keyP + '_ziliao'
            });
        });
        //底部电话
        $('.free-contact').on('click', function(){
            habo.send({
                type: 'activity' + keyP,
                stype: 'click',
                key: keyP + '_BottomAsk'
            });
        });
        //弹层按钮
        $('.button_close_img').on('click', function(){
            habo.send({
                type: 'activity' + keyP,
                stype: 'click',
                key: keyP + '_layer'
            });
        });
    }

    var WhiteListChengdu =  function (options) {

        var body = $("body");
        var id = options.type;
        var phoneEnv = env.os;
        var isIphone = phoneEnv.isIPhone;
        var isAndriod = phoneEnv.isAndroid;
        // 获取当前用户的cookie
        var userCookie = cookie.get('activity' + id);
        var smsFlag = null; //区分发短信时 安卓与ios的区分
        var smsHtml = null; //发短信文案
        var qqUrl = options.qq_url;

        var qqHtml = null;
        var freeZiliao = null;

        qqHtml = '<a target="_blank" href='+ qqUrl + '>';
        body.append(qqHtml + "<img src='https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5733ec4fbb3b7.png'  class='freeZiliao' style='display:block;position:fixed;height:50px;width:50px;right:4px;top:50%;' /></a>");
        freeZiliao = $('.freeZiliao');
        freeZiliao.css('display', 'none');

        if(!userCookie){
            body.append("<div class='fuceng-mask'></div>");
            var mask = $(".fuceng-mask");
            mask.css('display','block');
            mask.css('background','black');
            mask.css('left',0);
            mask.css('top',0);
            mask.css('bottom',0);
            mask.css('right','0px');
            mask.css('opacity',0.7);
            mask.css('position','fixed');
            mask.css('z-index','10');

            var tanHtml = '<div class="fuceng" style="position:fixed;width:280px;top:10%;right:0;left:0;margin:auto;">'
                        +'<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f15a71f5.png" style="height:180px;width:90%;margin-left:5%" />'
                        +'<div style="width:90%;margin-left:5%;background:white;margin-top:-10%;text-align:center;border-radius:6px">'
                            +'<p style="font-size:16px;text-align:center;padding:1.5em 2em;">' + options.tanchuang_text + '</p>'
                            +qqHtml
                                +'<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f1630180.png" style="height:40px;width:200px;padding-bottom:14px" class="button_close_img">'
                            +'</a>'
                        +'</div>'
                        +'</div>';
            var dialog = new Dialog({
                'content': tanHtml,
                'animateType': 1,
                'position': 'fixed',
                'closeButton': true,
                'backgroundColor': 'transparent',
                'zIndex': 10
                });
            setTimeout(function(){
                dialog.show();
            },500);
            var fucengMask = $('.fuceng-mask');
            var fuceng = $('.fuceng');
            var cancelButton = $('.button_close_img');
            cancelButton.on('click', function(e){
                fucengMask.hide();
                dialog.hide();
                setTimeout(function(){
                    freeZiliao.css('display','block');
                },500);
            });
           var container;
            if(isIphone){
                container = $('body>*');
            }else{
                container = body;
            }

            container.on('click',function(e){
                //fucengMask.css('display', 'none');
                fucengMask.hide();
                dialog.hide();
                setTimeout(function(){
                    freeZiliao.css('display','block');
                },500);
            });

            cookie.set('activity' + id, true, {
                expires: 12
            });
        }else{
                freeZiliao.css('display', 'block');
        }
    };

    return function(page_data) {
        lazyLoadImage.init();
        WhiteListChengdu(page_data);
        paramsSender({id:page_data.type});
        var shareInfo = {
            title : page_data.share_info.title,
            content : page_data.share_info.content,
            img: page_data.share_info.img,
        }
        setShare(shareInfo);
    }
});