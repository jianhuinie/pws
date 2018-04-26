/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){

    'use strict';

    var $ = require("zepto");
    var ui = require("common/ui");
    var app = require("common/app");
    var share = require("../_part/pageShare/init");
    var pageFilter = require("../_part/pageFilter");
    var pageInit = require("../_part/common");
    var appOpenWindow = require("common/openAppWindow");

    var lazyLoadImage = require('common/lazyLoadImage');

    return function(page_data){

        lazyLoadImage.init();

        pageInit.init();

        share.init({
            title: "他在参加中英文化交流大使招募大赛​，差你一票他就可以去英国了！",
            content: "​100个英国游学名额，跟谁学“请客”带你造访知名学府；400个国际交流名额，与国外师生共进“文化盛宴” ",
            img: page_data.avatar
        });

        if(page_data.frozen == "1"){
            ui.alert("此账号被封");
        }

        $("#video-start").click(function(){
            $("#video")[0].play();


            $(this).parent().remove();

            $("#video").show();
        });

        $(".center-video-canvassing-active").click(function(){
            var _self = this;
            var _number = $(this).attr("data-number");

            require(["common/service"],function(service){
                service.post("/uk/vote",{
                    number: _number
                },function(res){
                    var data = res.data || {};
                    var code = res.code;

                    if(code == 0){
                        //0 可以投票 1 票数达到十票 2还没开始 3投票已经截止了
                        if(data.status == 0){
                            $(_self).removeAttr("data-number");
                            $(_self).removeClass("center-video-canvassing-active");
                            $(_self).html("已投票");
                            var vote_count = Number($(".count").attr("data-count"));
                            $(".count").html(++vote_count);
                            $(_self).unbind("click");

                            if(page_data.has_pay == "0"){
                                ui.confirm({
                                    content: "投票成功，明天再来支持Ta哦！",
                                    button_ok: "继续投票",
                                    button_cancel: "我也要参加"
                                }).fail(function(){
                                    appOpenWindow.open("/uk/edit");
                                });
                            } else {
                                ui.alert({
                                    content: "投票成功，明天再来支持Ta哦！",
                                    button: ["继续投票"]
                                });
                            }
                        }
                        if(data.status == "1"){
                            ui.alert("您今天已达到最大投票数，明天再来吧");
                        }
                        if(data.status == "2"){
                            ui.alert("投票将在4月8日开始，暂时不能投票");
                        }
                        if(data.status == "3"){
                            ui.alert("投票已经截止啦");
                        }
                    }else if(code == "401"){
                            require(['common/ui'], function (ui) {
                                ui.confirm({
                                    'content': "您尚未登录，请前往登录",
                                    'button': '登陆'
                                }).done(function(){
                                    pageFilter.toLogin();
                                });
                            });
                    }else {
                        ui.alert(res.msg || "网络请求失败, 请稍后重试")
                    }

                    return false;
                });
            });
        });
    }
});