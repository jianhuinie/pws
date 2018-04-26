/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';
    var template = require('artTemplate');
    var service = require("common/service");
    var ui = require("common/ui");
    var app = require("common/app");
    var share = require("../_part/pageShare/init");
    var openAppWindow = require("common/openAppWindow");
    var pageFilter = require("../_part/pageFilter");
    var pageInit = require("../_part/common");
    var appOpenWindow = require("common/openAppWindow");

    var liRender = template.compile(require("text!./li.tpl"));

    var dropDown = function($){
        var downList = $(".drop-down-list");
        var item = $(".drop-down-item");
        var title = $(".drop-down-title");
        var tt = $(".drop-down-text");
        var icon = $(".drop-down-icon");

        dropDown.value = "0";

        var getDropDownValue = function(element){
            return $(element).attr("value");
        };

        var setDropDownValue = function(text,value){
            if(getDropDownValue(title) != value){
                $(title).attr("value",value);
                tt.text(text);

                dropDown.value = value;
            }
        };

        var listToggle = function(){
            downList.toggle();
            iconToggle();
        };

        var iconToggle = function(){
            var listIsDisplay = downList.css("display") || "none";
            if(listIsDisplay == "none"){
                icon.removeClass("icon-back-transition");
            } else {
                icon.addClass("icon-back-transition");
            }
        };

        $(".drop-down-title").click(function(){
            listToggle();
        });

        $(".drop-down-item").click(function(){
            var text = $(this).text();
            var value = $(this).attr("value");
            setDropDownValue(text,value);
            listToggle();

            list.refresh({page:1});
        });

        $(window).tap(function(e){
            if($(e.target).closest('.drop-down').length){
                return false;
            }
            downList.hide();
            iconToggle();
        });
    };

    var searchEvent = function($){
        var search = $(".btn-search");
        var v = $(".search-value");

        searchEvent.getValue = function(){
            return v.val();
        };

        search.tap(function(){
            list.refresh({page:1});
        });
    };

    var list = function($,page_data){
        var currentPage = 1;
        var pageSize = 20;
        var hasMore = true;//是否有更多

        list.refresh = function(params){
            var _params = $.extend({
                page: currentPage,
                grade:dropDown.value,
                query: searchEvent.getValue()
            },params);

            service.post("/uk/rank_ajax",_params,function(res){
                var data = res.data;
                if(data) {
                    var user_infos = data.user_infos || [];
                    var page_info = data.page_info || {};

                    if(user_infos){
                        var html = liRender({
                           list:user_infos
                        });

                        if(_params.page == 1){
                            $(".list").html(html);
                        } else {
                            $(".list").append(html);
                        }

                    }
                    //隐藏更多按钮
                    if(page_info.has_more){
                        $(".list-more").removeClass("hide");
                    }else{
                        $(".list-more").addClass("hide");
                    }

                    currentPage = page_info.curr_page;
                }
            });
        };

        $(".list-more").tap(function(){
            var page = currentPage;
            list.refresh({
                page: ++page
            });
        });

        $(".list").on("click",".list-btn",function(){
            var _self = this;
            var _number = $(this).attr("data-number");

            if(_number){
                service.post("/uk/vote",{
                    number: _number
                },function(res){
                    var data = res.data || {};
                    var code = res.code;

                    if(code == 0){
                        //0 可以投票 1 票数达到十票 2还没开始 3投票已经截止了
                        if(data.status == 0){
                            $(_self).removeAttr("data-number");
                            $(_self).removeClass("list-btn-active");
                            $(_self).html("已投票");

                            var vote_count = $(_self).siblings(".list-info").find(".count");
                            var vote_count_nubmer = Number(vote_count.attr("data-count"));
                            vote_count.html(++vote_count_nubmer);

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
                            ui.alert("投票已截止啦");
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
                        ui.alert(res.msg || "网络请求失败, 请稍后重试");
                    }

                    return false;
                });
            }
        });
    };

    return function(page_data){

        share.init();

        openAppWindow.init();

        pageInit.init();

        require(["zepto"],function($){
            dropDown($);
            searchEvent($);
            list($,page_data);
        });
    }
});