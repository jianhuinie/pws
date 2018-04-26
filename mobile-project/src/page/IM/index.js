/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    var MVCArray = require("common/mvc/MVCArray");
    var imConfig = require("./part/imConfig");
    var Timer = require("./part/Timer");
    var Polling = require("./part/PollingMessage");
    var Controller = require("./part/Controller");
    var MessageRender = require("./part/MessageRender");
    var user = require("./part/user");
    var Input = require("./part/input");
    var observer = require('common/mvc/observer');
    var cookie = require("util/cookie");

    var timer = new Timer();
    var polling = new Polling(timer);
    var mvcArray = new MVCArray();
    var controller = new Controller();
    var input = null;
    var messageRender = null;


    var initController = function(config){
        controller.bindTo("pollingList",polling,"pollingList");
        timer.bindTo("delays",controller,"delays");
        polling.bindTo("lastMsgId",controller,"lastMsgId");

        polling.set("object",config.sys_user.kefu);
        controller.set("delays",config.polling_delta);
        controller.set("lastMsgId",config.user_last_msg_id == "-1"? "" : config.user_last_msg_id);
        controller.set("mvcArray",mvcArray);
    };
    //resize container
    var resetContainer = function(){
        var header = $("#header");
        var bottom = $("#bottom");
        var container = $("#container");

        var top = header.height();
        var bottom = bottom.height();
        container.css({
            top: top,
            bottom: bottom
        });
        messageRender.scrollRefresh();
    };
    //init message render
    var initRender = function(userInfo){
        //init render
        messageRender = new MessageRender(document.getElementById("container"));

        messageRender.set('showSenderName', false);
        messageRender.set('user', userInfo);
        messageRender.set('messages', mvcArray);
        //user login
        if(!user.isLogin()){
            $("#header .loginNotice").show();
            resetContainer();
        }
    };
    //reset input
    var resetInput = function(){
        input.resetValue();
        $("#sendMesBtn").hide();
        $("#upload").show();
    };

    var resetPolling = function(){
        polling.resetPolling();
    };

    //event init
    var initEvent = function(){
        //send text
        $("#sendMesBtn").click(function(){
            var value = $("#sendMes").val();
            if(value == ""){
                return false;
            }
            controller.sendText({
                type:"0",
                content: value
            },resetPolling);
            resetInput();
        });

        $("#sendMes").focus(function(){
           messageRender.scrollMoveBottom();
        });
        //send
        $("#sendMes").keydown(function(evt){
            var code = evt.keyCode;
            //send
            if(code == 13){
                evt.preventDefault();
                var value = $("#sendMes").val();
                if(value == ""){
                    return false;
                }
                controller.sendText({
                    type:"0",
                    content: value
                },resetPolling);
                setTimeout(function(){resetInput();},0);
            }
        });
        //send image
        $("#sendImage").change(function(){
            var _self = this;
            var file = this.files[0] || {};
            if($.trim($(this).val()) == ""){
                return false;
            }
            if(!/image\/\w+/.test(file.type||"")){
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                $(_self).val("");
                controller.sendImgage(this.result,resetPolling);
            };
        });

        observer.addListener(input,"heightChange",function(){
            resetContainer();
        });

        observer.addListener(input,"value",function(value){
            if(value.length){
                $("#sendMesBtn").show();
                $("#upload").hide();
            }else {
                $("#sendMesBtn").hide();
                $("#upload").show();
            }
        });
    };
    //初使历史数据
    var initHistory = function(){
        //获取历史信息数据
        controller.getHistory({
            include_eid: "1"
        },function(){
            //滚动条滚动底部
            setTimeout(function(){
                messageRender.scrollMoveBottom();
            },100);
            //监控历史数据
            observer.addListener(mvcArray,"load_history",function(type){
                controller.getHistory();
            });
        });
    };

    return function(){
        //激活IM polling
        cookie.set("pnas",true,{
            domain: "genshuixue.com"
        });
        input = new Input("sendMes");
        user.getUserInfo(function(userInfo){
            imConfig.getConfig(function(config) {
                controller.getKefuGreen(function(){
                    initController(config);
                    initRender(userInfo);
                    initEvent(userInfo);
                    resetContainer(userInfo);
                    initHistory();
                });
            });
        });
    }
});