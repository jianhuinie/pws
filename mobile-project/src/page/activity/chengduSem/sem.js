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
    var util_object = require('util/object');
    var app = require('common/app');
    var habo = require('common/component/analysis/habo/index');

    var makePhoneCall = function(tel) {
        app.send('toMakePhoneCall', {
            phone_number: tel
        });
    };

    function paramsSender(options){
        var type = options.type;
        var keyP = null;
        if(options.type == 1){
            keyP = 'art';
        }else if(options.type == 2){
            keyP = 'liuxue';
        }else{
            keyP = 'k12';
        }
        var activityType = 'chengduSem';
        //顶部电话
        $('.phone-cli').on('click', function(){
            habo.send({
                type: activityType +'_' + keyP,
                stype: 'click',
                key: keyP + '_TopPhone'
            });
        });
        //加QQ点击
        $('.freeZiliao').on('click', function(){
            habo.send({
                type: activityType +'_' + keyP,
                stype: 'click',
                key: keyP + '_qq'
            });
        });
        $('.k12-free-ziliao').on('click', function(){
            habo.send({
                type: activityType +'_' + keyP,
                stype: 'click',
                key:keyP + '_qq'
            });
        });
        //领取优惠卷点击
        $('.item-sendSMS').on('click', function(){
            habo.send({
                type: activityType +'_' + keyP,
                stype: 'click',
                key: keyP + '_youhuiquan'
            });
        });
        //领取底部资料
        $('.free-ziliao-sms').on('click', function(){
            habo.send({
                type: activityType +'_' + keyP,
                stype: 'click',
                key: keyP + '_ziliao'
            });
        });
        //底部电话
        $('.free-contact').on('click', function(){
            habo.send({
                type: activityType +'_' + keyP,
                stype: 'click',
                key: keyP + '_BottomPhone'
            });
        });
        //弹层按钮
        $('.button_close_img').on('click', function(){
            habo.send({
                type: activityType +'_' + keyP,
                stype: 'click',
                key: keyP + '_layer'
            });
        });
    }

    var WhiteListChengdu =  function (options) {

        var body = $("body");
        var phoneEnv = env.os;
        var isIphone = phoneEnv.isIPhone;
        var isAndriod = phoneEnv.isAndroid;
        var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        var type = options.type; // 1艺体 2 留学 3K12
        var isUc = env.browser.isUC;
        var isQQ = env.thirdapp && env.thirdapp.isQQ;

        var wenan = null;
        if(type == 1){
            wenan = '限时抢位，即可获得名师免费课程！一键快速预约！';
        }else if(type == 2){
            wenan = '高分留学名师，万元留学课程，海量留学资料，全都免费，只等你来！';
        }else{
            wenan = '2016 “抢分计划”-- 各学科考点资料包免费送!';
        }
        var textWenan = null;
        if(type == 1){
            textWenan = '你好，我想预约艺术体育名师试听课，获取最新优惠信息，请尽快联系我。【发自跟谁学】';
        }else if(type == 2){
            textWenan = '你好，我想预约高分留学名师，领取万元留学课程及海量留学资料，获取最新优惠信息，请尽快联系我。【发自跟谁学】';
        }else{
            textWenan = '你好，我想参加2016抢分计划，领取各学科考点资料包，获取最新优惠信息，请尽快联系我。【发自跟谁学】';
        }

        // 获取当前用户的cookie
        var userCookie = cookie.get('SEMChengdu' + type);
        var smsFlag = null; //区分发短信时 安卓与ios的区分
        var smsHtml = null; //发短信文案

        if(isAndriod && !isWeixin && !isQQ){
            smsFlag = '?';
            smsHtml = '<a href="sms:18030600736' + smsFlag +'body='+ textWenan +'">';

        }else if(isIphone && !isUc && !isWeixin && !isQQ){
            smsFlag = '&';
            smsHtml = '<a href="sms:18030600736' + smsFlag +'body='+ textWenan +'">';
        }else{
            smsHtml = '<a href="tel:4000630083">'
        }

        var qqHtml = null;
        var freeZiliao = null;
        if(type == 1){
            qqHtml = '<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=2G3GR7g">';
            body.append(qqHtml + "<img src='https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5733ec4fbb3b7.png'  class='freeZiliao' style='display:block;position:fixed;height:50px;width:50px;right:4px;top:50%;' /></a>");
            freeZiliao = $('.freeZiliao');
            freeZiliao.css('display', 'none');

        }else if(type == 2){
            qqHtml = '<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=2HLSST3">';
            body.append(qqHtml + "<img src='https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5733ec4fbb3b7.png'  class='freeZiliao' style='display:block;position:fixed;height:50px;width:50px;right:4px;top:50%;' /></a>");
            freeZiliao = $('.freeZiliao');
            freeZiliao.css('display', 'none');
        }else{
            //k12
            qqHtml = '<div style="position:fixed; top:70%; right:0;" class="k12-boom">'
                        + '<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5733ec4fbb3b7.png" class="k12-free-ziliao" style="position: absolute;bottom: 0;right: 0;height: 50px;width: 50px;"/>'
                        + '<div class="k12-qq-items">'
                            +'<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=27T7bxO" class="qq-show-1"><p>北斗星高中号</p></a>'
                            +'<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=295jnSU" class="qq-show-2"><p>北斗星初中号</p></a>'
                        + '</div>'
                    + '</div>';
            body.append(qqHtml);
            var k12Boom = $('.k12-boom');
            k12Boom.css('display','none');
        }

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

            var tanHtml =  '<div class="fuceng" style="position:fixed;width:80%;height:200px;top:120px;left:10%;margin:auto;">'
                        //+'<div class="close_button" style="font-size:30px;line-height:100%;position:absolute;z-index:5;width:16%;text-align:center;height:14%;color:white;opacity:0.3;">x</div>'
                        +'<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f15a71f5.png" style="position:absolute;height:180px;width:100%;z-index:4;top:-10px;left:0" />'
                        +'<div style="height:200px;width:100%;background:white;bottom:10px;margin-top:130px;text-align:center;border-radius:6px">'
                            +'<p style="font-size:16px;text-align:center;padding:50px 2em;">' + wenan + '</p>'
                            +smsHtml
                                +'<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f1630180.png" style="height:50px;width:240px;margin-top:-10%;" class="button_close_img">'
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
            //dialog.show();
            var fucengMask = $('.fuceng-mask');
            var fuceng = $('.fuceng');
            var cancelButton = $('.button_close_img');
            cancelButton.on('click', function(e){
                //fucengMask.css('display', 'none');
                fucengMask.hide();
                dialog.hide();
                setTimeout(function(){
                    if(type == 1 || type == 2){
                        freeZiliao.css('display','block');
                    }
                    if(type == 3){
                        k12Boom.css('display','block');
                    }
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
                    if(type == 1 || type == 2){
                        freeZiliao.css('display','block');
                    }
                    if(type == 3){
                        k12Boom.css('display','block');
                    }
                },500);
            });

            if(type == 3){
                var k12Show = $('.k12-free-ziliao');
                var k12QQItem = $('.k12-qq-items');
                k12Show.on('click', function(e){

                    if(!k12QQItem.hasClass('on')){
                        k12QQItem.addClass('on');
                    } else {
                        k12QQItem.removeClass('on');
                    }
                });
            }
            cookie.set('SEMChengdu' + type, true, {
                expires: 12
            });
        }else{
            //body.append(smsHtml + "<img src='https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57306d367c65a.png'  class='freeZiliao' style='display:block;position:fixed;height:50px;width:50px;right:4px;top:50%;' /></a>");

            if(type == 3){
                var k12Boom = $('.k12-boom');
                k12Boom.css('display','block');
                var k12Show = $('.k12-free-ziliao');
                var k12QQItem = $('.k12-qq-items');
                k12Show.on('click', function(e){
                    if(!k12QQItem.hasClass('on')){
                        k12QQItem.addClass('on');
                    } else {
                        k12QQItem.removeClass('on');
                    }
                });
            }else{
                freeZiliao.css('display', 'block');
            }
            //body.append(smsHtml + "<img src='https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57306d367c65a.png'  class='freeZiliao' style='display:block;position:fixed;height:50px;width:50px;right:4px;top:50%;' /></a>");

        }
    };
    var SendSms = function (options) {
        var sendSmsUrl = "sms:18030600736"
        var phoneEnv = env.os;
        var isIphone = phoneEnv.isIPhone;
        var isAndriod = phoneEnv.isAndroid;
        var isWeixin = isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        var isQQ = env.thirdapp && env.thirdapp.isQQ;
        var isUc = env.browser.isUC;
        var position = options.position;
        if(position == 'list'){
            $('.item-sendSMS').each(function(){
                var type = $(this).attr('type');
                var name = $(this).attr('name');
                var text = $(this).attr('text');
                var smsHtml = null;
                var smsFlag = null;
                var isOrg = '老师';
                if(type==1){
                    isOrg = '';
                }
                var namString = name + isOrg + '感兴趣，我想' + text + '，请尽快联系我，来自【跟谁学】';

                if(isAndriod && !isWeixin && !isQQ){
                    smsFlag = '?';
                    smsHtml = sendSmsUrl + smsFlag +'body=我对' + namString;
                }else if(isIphone && !isUc && !isWeixin && !isQQ){
                    smsFlag = '&';
                    smsHtml = sendSmsUrl + smsFlag +'body=我对' + namString;
                }else{
                    smsHtml = 'tel:4000630083';
                }

                $(this).attr('href', smsHtml);

            });
        }else if(position == 'bottom'){
            var self = $('.free-ziliao')
            var type = self.attr('type');
            var wenan = null;
            var smsFlag = null;
            var smsHtml = null;
            var sendSmsUrl = 'sms:18030600736';
            if(type == 1){
                wenan = '限时抢位，即可获得名师免费课程！一键快速预约！';
            }else if(type == 2){
                wenan = '高分留学名师，万元留学课程，海量留学资料，全都免费，只等你来！';
            }else{
                wenan = '2016 “抢分计划”-- 各学科考点资料包免费送!';
            }
            var textWenan = null;
            if(type == 1){
                textWenan = '你好，我想预约艺术体育名师试听课，获取最新优惠信息，请尽快联系我。【发自跟谁学】';
            }else if(type == 2){
                textWenan = '你好，我想预约高分留学名师，领取万元留学课程及海量留学资料，获取最新优惠信息，请尽快联系我。【发自跟谁学】';
            }else{
                textWenan = '你好，我想参加2016抢分计划，领取各学科考点资料包，获取最新优惠信息，请尽快联系我。【发自跟谁学】';
            }

            if(isAndriod && !isWeixin && !isQQ){
                smsFlag = '?';
                smsHtml = sendSmsUrl + smsFlag + 'body=' + textWenan;
            }else if(isIphone && !isUc && !isWeixin && !isQQ){
                smsFlag = '&';
                smsHtml = sendSmsUrl + smsFlag + 'body=' + textWenan;
            }else{
                    smsHtml = 'tel:4000630083';
            }
            self.attr('href',smsHtml);
        }
    }

    return function(page_data) {
        lazyLoadImage.init();
        //pageInit.init();
        var semOptions = {
            type: page_data.type,
         }
        var sendSmsPosition1 = {
            position: 'list',
        }
        var sendSmsPosition2 = {
            position: 'bottom',
        }
        SendSms(sendSmsPosition1);
        SendSms(sendSmsPosition2);
        WhiteListChengdu(semOptions);
        paramsSender({type:page_data.type});
        if(app.isApp()){
            $('.phone-cli').on('click', function(){
                makePhoneCall('4000630083');
            });
            $('.bottom-call').on('click', function(){
                makePhoneCall('4000630083');
            });
        }else{
            $('.phone-cli').attr('href','tel:4000-630-083');
            $('.bottom-call').attr('href','tel:4000-630-083');
        }
        var contentString = '2016 “抢分计划”-- 各学科考点资料包免费送!';
        var titleString = '补课 提分才是硬道理';
        var imgString = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/05/573687903116b.jpg';

        if(page_data.type == 1){
            titleString = '让夏天变“Cool”的N种才艺';
            contentString = '限时抢位，即可获得名师免费课程！一键快速预约！';
            imgString = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/05/573687907b72f.jpg';
        }else if(page_data.type == 2){
            titleString = '留学考试直通车，各路老司机陪你开';
            contentString = '高分留学名师，万元留学课程，海量留学资料，全都免费，只等你来！';
            imgString = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5736878ff1e8b.jpg'
        }
        var shareInfo = {
            title : titleString,
            content : contentString,
            img: imgString,
        }
        setShare(shareInfo);
    }
});