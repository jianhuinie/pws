/* *
*Created By huangshiming on 16/5/11
* */

define(function (require, exports) {
    'use strict';

    var Dialog = require('common/ui/FullPageDialog/FullPageDialog');
    var habo = require('common/component/analysis/habo/index');
    var cookie = require("util/cookie");
    var env = require('util/env');
    var util_object = require('util/object');

    /*
    *options
    *name:姓名
    *orgName:机构名称
    *type:类型，机构还是课程还是老师
    *number:编号
    *无return
    */
    return function (options) {
        var phoneEnv = env.os;
        var isIphone = phoneEnv.isIPhone;
        var isAndriod = phoneEnv.isAndroid;
        var isWeixin = isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        var nameString = null;
        var isUc = env.browser.isUC;
        var isQQ = env.thirdapp && env.thirdapp.isQQ;

        // 获取当前用户的cookie
        var userCookie = cookie.get('SEMChengduTheacher' + options.type + options.number);
        if(options.orgName){
            nameString = options.orgName + '的' + options.name;
        }else{
            nameString = options.name;
        }

        var smsFlag = null;
        var smsHtml = null;

        if(isAndriod && !isWeixin && !isQQ){
            smsFlag = '?';
            smsHtml = '<a href="sms:18011398839' + smsFlag +'body=我对' + nameString + '老师感兴趣，我想领取相关学习资料并了解最新优惠及活动，请尽快联系我，来自【跟谁学】"' +'>';
        }else if(isIphone && !isUc && !isWeixin && !isQQ){
            smsFlag = '&';
            smsHtml = '<a href="sms:18011398839' + smsFlag +'body=我对' + nameString + '老师感兴趣，我想领取相关学习资料并了解最新优惠及活动，请尽快联系我，来自【跟谁学】"' +'>';

        }else{
            smsHtml = '<a href="tel:4000630083">'
        }



        if(!userCookie){
            var body = $("body");
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

            body.append(smsHtml + "<img src='https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f165129a.png'  class='freeZiliao' style='display:block;position:fixed;height:50px;width:50px;right:4px;top:50%;' /></a>");
            var freeZiliao = $('.freeZiliao');
            freeZiliao.css('display', 'none');

            var tanHtml =  '<div class="fuceng" style="position:fixed;width:280px;height:200px;top:-25%;right:0;left:0;bottom:0;margin:auto;">'
                        //+'<div class="close_button" style="font-size:30px;line-height:100%;position:absolute;z-index:5;width:16%;text-align:center;height:14%;color:white;opacity:0.3;">x</div>'
                        +'<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f15a71f5.png" style="position:absolute;height:180px;width:100%;z-index:4;top:-10px;left:0" class="close_button_img"/>'
                        +'<div style="height:200px;width:100%;background:white;bottom:10px;margin-top:130px;text-align:center;border-radius:6px">'
                            +'<p style="font-size:16px;text-align:center;padding:50px 2em;">海量免费优质学习资料+最新课程优惠信息送送送</p>'
                            +smsHtml
                                +'<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f1630180.png" style="height:50px;width:240px;margin-top:-10%;" class="button_close_img" />'
                            +'</a>'
                        +'</div>'
                        +'</div>';
            var dialog = new Dialog({
                'content': tanHtml,
                'animateType': 1,
                'position': 'fixed',
                'closeButton': true,
                'backgroundColor': 'transparent',
                'zIndex': 800
                });
            setTimeout(function(){
                dialog.show();
            },800);
            //dialog.show();
            var cancelButton = $('.button_close_img');
            var fucengMask = $('.fuceng-mask');
            var fuceng = $('.fuceng');
            cancelButton.on('click', function(e){
                fucengMask.css('display', 'none');
                dialog.hide();
                setTimeout(function(){
                    freeZiliao.css('display','block');
                },500);
                //上报
                habo.send({
                    type: 'chengduTeacherSem',
                    stype: 'click',
                    key: 'course_lay'
                });
            });

            var container;
            if(isIphone){
                container = $('body>*');
            }else{
                container = body;
            }

            container.on('click',function(e){
                fucengMask.css('display', 'none');
                dialog.hide();
                setTimeout(function(){
                    freeZiliao.css('display','block');
                },500);
            });

            cookie.set('SEMChengduTheacher' + options.type + options.number, true, {
                expires: 24
            });
        }else{
            var body = $("body");
            body.append(smsHtml + "<img src='https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57306d367c65a.png'  class='freeZiliao' style='display:block;position:fixed;height:50px;width:50px;right:4px;top:50%;' /></a>");
        }
        //领取资料上报
        $('.freeZiliao').on('click', function(){
            habo.send({
                type: 'chengduTeacherSem',
                stype: 'click',
                key: 'course_button'
            });
        });
    };
});