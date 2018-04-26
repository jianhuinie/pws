define(function (require, exports) {
    'use strict';

    var lazyImage = require('common/lazyImage');
    var store = require('common/store');
    var service = require('common/service');
    var ShareDialog = require('common/component/ShareDialog');
    var Dialog = require('cobble/ui/Dialog');
    var VideoDialog = require('common/component/VideoDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var entrance = require('im/entrance');

    var slider = $('.right-silder');
    var treeView = $('.left-tree .treeview');
    var content = $('#main .video-list');

    //当前登录人的姓名和手机
    var name ,mobile;

    /**正在打开客户端dialog
     *options{}
     */
    function JoinDialog(options) {
        $.extend(this, options);
        this.init();
    }
    JoinDialog.prototype={
        constructor:JoinDialog,
        init : function(){
            var content =
                "<div id='join-activity'>"
                +"<form>"
                + "<h1>(^_^)我也想参加这个棒棒哒活动～</h1>"
                + "<div><input class='form-text name' type='text' value='"+name+"' placeholder='姓名'/></div>"
                + "<div><input required='required' class='form-text mobile' type='text' value='"+mobile+"' placeholder='联系方式'/></div>"
                + "<div><input class='form-text kemu' type='text' placeholder='授课科目'/></div>"
                + "<div><div class='join btn-default'>立即报名</div></div>";
                + "</form>>";
                + "</div>";
            var dialog = new Dialog({
                width: 400,
                title : "老师参与报名表 ",
                content : content
            });
            dialog.show();
            var element = dialog.element;
            element.on("click",".join",function(e){
                var mobilePhone = element.find(".mobile").val()
                if(!mobilePhone){
                    alert("请输入您的联系方式，方便客服联系您～");
                    return;
                }
                if(!/^1[3-9]\d{9}$/.test(mobilePhone)){
                    alert("请输入正确的联系方式，方便客服联系您～");
                    return;
                }
                service.joinVideoLibrary({
                    name:element.find(".name").val(),
                    mobile:element.find(".mobile").val(),
                    kemu:element.find(".kemu").val()
                }).done(function(response){
                    if(response.code == 0){
                        dialog.hide();
                        success("报名成功，会有客服联系您，请耐心等候~");
                    }
                })
            })
        }
    }


    /**
     *
     * @param element 操作的元素
     * @param show 是否展示，1为展示，0为隐藏
     */
    function openNode1(element,show){
        if(show){
            element.find(">ul").show();
            element.find(".node-open-close .icon-node").removeClass("icon-angle-down").addClass("icon-angle-up");
        }else{
            element.find(">ul").hide();
            element.find(".node-open-close .icon-node").removeClass("icon-angle-up").addClass("icon-angle-down");
        }
    }


    exports.init = function () {

        lazyImage.init();
        ShareDialog.init(slider);
        var byKefuClickTimes = 0;

        name = store.get("user").name;
        mobile = store.get("user").mobile;

        slider
            .on("click",".ask-course",function(e){
                if(store.get("user").type == -1){
                    if(byKefuClickTimes==0){
                        entrance.chatToKF();
                        byKefuClickTimes ++;
                        $('.im-toggle-bar').show();
                    }else{
                        $('.im-toggle-bar').trigger('click')
                    }
                }else{
                    entrance.chatToKF();
                }
            })
            .on("click",".join",function(e){
                new JoinDialog();
            });
        treeView
            .on("click",".fa",function(e){
                var thiz = $(e.target);
                if(thiz.hasClass("fa-plus-square")){
                    alert("展开")
                }else{
                    alert("收起");
                }
            })
            .on("click",'.node-open-close',function(e){
                var thiz = $(this);
                var show = thiz.find(".icon-node").hasClass("icon-angle-down");
                openNode1(thiz.parent(),show);
            })
            .on("click",'.tree-node .left-line',function(e){
                var thiz = $(this);
                if(thiz.hasClass("left-line-plus")){
                    thiz.removeClass("left-line-plus");
                    thiz.parent().find(">.tree-children").show();
                }else{
                    thiz.addClass("left-line-plus");
                    thiz.parent().find(">.tree-children").hide();
                }
            })
        content
            .on("click",".video-item-play",function(e){
                var thiz = $(this);
                new VideoDialog({
                    url: thiz.data('video'),
                    title: thiz.data("videoTitle").substr(0,20)+"...",
                    videoWidth: 1200,
                    videoHeight: 500
                });
            })


    };
});