/**
 * @file 爱视恒恩专题页面
 * @author wuhongjie
 */
define(function(require, exports) {

    'use strict';

    var media = require('common/component/media');
    var VideoDialog = require('common/component/VideoDialog');
    var Dialog = require('cobble/ui/Dialog');
    var Slider = require('common/component/Slider');
    var service = require('common/service');
    var store = require('common/store');
    var LoginDialog = require('common/component/LoginDialog');

    exports.init = function() {
        var container=$("#main");
        var form =  $(".formcontent");

        var user = store.get('user');
        var hasLogin = user.id;
        if(!hasLogin){
            $(".passform").hide();
        }
        var toneday = container.find(".teacher-oneday")
        var length = toneday.length;
        var index =0;
        var targetindex =1;
        var interval = 0;

        //nowObj 当前显示的对象
        //targetObj 将要显示的对象
        // fx 方向，true为右，false为左
        function move(nowObj,targetObj,fx){
            var tflag =fx?"":"-";
            var nflag =fx?"-":"";

            $(targetObj).css({left:tflag+"900px"});
            $(targetObj).show();
            $(nowObj).animate({left:nflag+"900px"},"normal");
            $(nowObj).hide();
            $(targetObj).animate({left:"0px"},"normal");
        }

        function autolun(){
            interval = setInterval(function(){
                if(index == length -1 ){
                    targetindex = 0;
                }else{
                    targetindex = index + 1;
                }
                move(toneday[index],toneday[targetindex],false);
                index++;
                if(index == length){
                    index =0;
                }
            },5000);

        }
        if(length > 1){
            autolun();
            $(".teacher-left").click(function(){
                if(index == 0){
                    targetindex = length - 1;
                }else{
                    targetindex = index - 1;
                }
                move(toneday[index],toneday[targetindex],true);
                index--;
                if(index < 0){
                    index = length-1;
                }
            });
            $(".teacher-right").click(function(){
                if(index == length -1 ){
                    targetindex = 0;
                }else{
                    targetindex = index + 1;
                }
                move(toneday[index],toneday[targetindex],false);
                index++;
                if(index == length){
                    index =0;
                }
            });
            toneday.on("mouseover",".teacher",function(){
                clearInterval(interval);
            }).on("mouseout",".teacher",function(){
                autolun();
            })
        }

        function sendEmail(email,name){
            service.aishihengenJoin({
                email : email,
                name:name
            }).done(function(response){
                if(response.code == 0){
                    var status = response.data.join_status;
                    var message = "报名失败";
                    switch (status){
                        case 0:message ="报名失败";break;
                        case 1:message="活动尚未开始~28号10点准时开抢哦";break;
                        case 2:message="本期活动已经结束，敬请期待下期活动";break;
                        case 3:message="抱歉，不是老师身份，请切换老师身份后再来报名~";break;
                        case 4:message="今日名额已满，明天早点儿来哦~";break;
                        case 5:message="您已报名，不要重复提交哦~";break;
                        case 6:message="您已报名成功，请等待电话或邮件通知具体录课事宜";break;
                        case 7:message="活动尚未开始~10:00开抢哦";break;
                        case 8:message="抱歉，您的老师身份未生效。";break;
                        case 9:message="邮箱已存在，请更换邮箱。";break;
                    }

                    if(status == 6){
                        alert({
                            title: '温馨提示',
                            content: message,
                            width: 450,
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                        location.reload();
                                    }
                                }
                            ]
                        });
                    }else{
                        alert(message)
                    }
                }
            });
        }

        container
            .on('click','.join_love_btn',function(e){
                // 点击我要报名，如果未登录，去登录
                if(!hasLogin){
                    new LoginDialog({
                        onSuccess: function () {
                            location.reload();
                        }
                    });
                }
                //定位到报名表
                location.href="#join-us";
                $("#email").focus();
            })
            .on('click','#submit',function(e){
                var email = form.find('#email').val().trim();
                var name = form.find("#name").val().trim();
                if (!hasLogin) {
                    new LoginDialog({
                        onSuccess: function () {
                            location.reload();
                        }
                    });
                    return false;
                }
                if(!name){
                    alert("请填写真实姓名，方便我们联系你哦~");
                    return false;
                }

                if(!email || !/^(?:[a-z0-9]+[_\-+.]+)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i.test(email)){
                    alert("请填写正确的邮箱信息~");
                    return false;
                }
                if(new Date().getHours() < 9){
                    alert("活动尚未开始~10:00开抢哦");
                    return false;
                }
                if(!store.get("isBeijing")){
                    alert("抱歉~本次活动体验仅限于北京地区注册教师");
                    return false;
                }
                confirm("您确定提交报名信息吗?(提交后信息不能更改)").done(function(){
                    sendEmail(email,name);
                });
            });


        media.init();

    };


});