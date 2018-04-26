/**
 * Created by bjhl on 15/12/26.
 */
define(function(require,exports){
    'use strict';

    var $ = require("zepto");
    var upload = require("./part/upload/images");
    var ui = require("common/ui");
    var url = require("util/url");
    var Dialog = require("common/ui/Dialog/Dialog");

    var form_group_id = url().params["forum_group_id"];

    //添加发贴名称
    var addName = (function(){
        var _dialog = null;
        var _reset = function(){
            var dialogName = $(".addName");
            dialogName.removeClass("error");
            dialogName.val("");
        };
        var _improveInfo = function(params){
            $.post("/forum/improveInfo",params).always(function(res){
                res = res || {};
                if(res.code != "0"){
                    ui.remind(res.msg);
                }
            });
        };

        return function(){
            if(!_dialog) {
                var string = "<div class='dialog_operate'>完善下方资料，才能继续操作呦！</div><div><input maxlength='20' placeholder='昵称：请填写你喜欢的名字' class='addName' type='text'/></div>";
                require(["common/mvc/observer"],function(Dialog,observer){
                    _dialog = new Dialog({
                        'position': 'absolute',
                        'closeButton': false,
                        'content': string,
                        'maxWidth': 400,
                        'buttons': [
                            {
                                type: 'cancel'
                            },
                            {
                                type: 'ok'
                            }
                        ]
                    });

                    observer.addListener(_dialog,"button_click",function(e,buttonInfo){
                        if(buttonInfo.type == "ok"){
                            e.preventDefault();

                            var dialogName = $(".addName");
                            if(dialogName.val().length){
                                _dialog.hide();

                                _improveInfo({
                                    nickname: dialogName.val()
                                });
                            } else {
                                dialogName.addClass("error");
                            }
                        }
                    });

                    _dialog.show();
                });
            } else {
                _dialog.show();
            };

            _reset();
        }
    })();

    var validate = {
        titleInfo: function(value){
            var len = value.length;
            if(len == 0){
                ui.remind("请输入标题");
            } else {
                if(!(len>=4 && len<=24)){
                    ui.remind("标题长度在4~24个字");
                }
            }
            return len>=4 && len<=24;
        },
        textInfo: function(value){
            var len = value.length;
            return len>=1 && len<=10000;
        }
    };
    //正在发送中
    var isPublish = false;

    var publish = function(params){
        //避免重复提交
        if(isPublish){
            return false;
        }
        isPublish = true;
        $.post("/forum/addThreadAjax",params).always(function(res){
            res = res || {};
            var code = res.code;

            isPublish = false;

            if(res.code == "0"){
                new Dialog({
                    'position': 'absolute',
                    'closeButton': false,
                    'content': "发帖成功",
                    'maxWidth': 400,
                    'buttons': [
                        {
                            type: 'ok'
                        }
                    ]
                }).show();

                $(".nav-button").unbind("tap");

                location.href = "/forum/threadBrowse?forum_group_id="+form_group_id;
            } else {
                if(code == "800053" || code == "800054"){
                    addName();
                } else {
                    ui.remind(res.msg);
                }
            }
        });
    };

    return function(){
        var imagesUpload = new upload($("#upload"));
        var title = $("#titleInfo");
        var text = $("#textInfo");

        $("#textInfo").focus(function(){
            imagesUpload.hide();
        });

        $(".nav-button").tap(function(){
            if(!validate.titleInfo($.trim(title.val()))){
                return false;
            }

            if(!validate.textInfo($.trim(text.val()))){
                ui.remind("请输入帖子内容（1-10000）字");
                return false;
            }

            if(undefined === form_group_id){
                ui.remind("发帖ID不能为空");
                return false;
            }

            if(!imagesUpload.isValidate()){
                ui.remind("还有图片未上传成功");
                return false;
            }

            publish({
                forum_group_id: form_group_id,
                name: $.trim(title.val()),
                content: $.trim(text.val()),
                photo_list: imagesUpload.getImages().join(",")
            });
        });
    };
});