/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){

    'use strict';

    var ui = require("common/ui");
    var share = require("../_part/pageShare/init");
    var pageFilter = require("../_part/pageFilter");
    var app = require("common/app");
    var env = require("util/env");
    var user = require("common/user");
    var openAppWindow = require("common/openAppWindow");
    var pageInit = require("../_part/common");

    var updateFile = function(_self,data){
        var img =  $(_self).siblings("img");

        if(img[0]){
            $(img).attr("src",data.address);
        }else {
            $(_self).after("<img src='"+data.address+"'/\>");
        }

        $(_self).siblings(".form-element").val(data.address);
        $(_self).val("");
    };




    function getCompressImg(imgData,onCompress){

        var mHeight = 100;
        var mWidth = 100;

        var canvas = document.createElement('canvas');

        var img = new Image();

        img.onload = function(){

            if(img.height > mHeight) {//按最大高度等比缩放
                img.width *= mHeight / img.height;
                img.height = mHeight;
            }
            //
            //if(img.width > mWidth){
            //    img.height *= mWidth / img.width;
            //    img.width = mWidth;
            //}

            var ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);

            onCompress(canvas.toDataURL("image/png",1));
        };

        img.src = imgData;
    }


    var addFileEvent = function($){
        var upload = function(img,done){
            require(["common/service"],function(service){
               service.post("/uk/upload",{
                   img: img,
                   watermark: 1
               },function(res){
                   if(res.code == '0'){
                       var data = res.data || {};
                       if(data.url){
                           done && done(data.url);
                       }
                   }
               });
            });
        };


        if(app.isApp() && env.os.isAndroid){
            $(".file").click(function(){
                var _self = this;

                app.send("uploadImage");

                app.on("uploadImageComplete",function(data){
                    updateFile(_self,{
                        address: data.url
                    });
                });
            });

        }else {
            $(".file").change(function(){
                var _self = this;
                if($.trim($(this).val()) == ""){
                    return false;
                }

                var file = this.files[0] || {};

                if(!/image\/\w+/.test(file.type||"")){
                    alert("请确保文件为图像类型");
                    return false;
                }

                var _self = this;

                var reader = new FileReader();

                reader.readAsDataURL(file);
                reader.onload = function(e){

                    getCompressImg(this.result,function(result){

                        upload(result,function(address){
                            updateFile(_self,{
                                address:address
                            });
                        });

                    });


                };
            });
        }

    };

    var addSelectEvent = function($){
        var getList = function(p_id,done){
            require(["common/service"],function(service){
                service.post("/area/list",{
                    p_id: p_id
                }, function(res){
                    var data = res.data || [];
                    var ops = [];
                    if(data && data.length){
                        $.each(data,function(index,item){
                            ops.push('<option value="'+item.id+'">'+item.name+'</option>');
                        });
                        done && done(ops);
                    }
                })
            });
        };

        $("#province").change(function(){
            var cityTpl = "<option value='' selected>请选择市</option>";
            var areaTpl = "<option value='' selected>请选择区</option>"
            if(!this.value){
                $("#city").html(cityTpl);
                $("#area").html(areaTpl);
                return false;
            }
            getList(this.value,function(list){
                if(list){
                    list.unshift(cityTpl);
                    $("#city").html(list.join(""));
                }
            });
        });
        $("#city").change(function(){
            var tpl = "<option value='' selected>请选择区</option>";
            if(!this.value){
                $("#area").html(tpl);
                return false;
            }
            getList(this.value,function(list){
                if(list){
                    list.unshift(tpl);
                    $("#area").html(list.join(""));
                }
            });
        });
    };

    var confirmApply = function($){
        var rules = {
            name: function(val){
                return /^[\u4e00-\u9fa5]{2,10}$/.test(val);
            },
            email: function(val){
                return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val);
            },
            phone: function(val){
                return /^1\d{10}$/.test(val);
            },
            schoolName: function(val){
                return /^[\u4e00-\u9fa5\w\d]{1,10}$/ig.test(val);
            },
            inviteCode: function(val){
                return /^[\d]{0,10}$/ig.test(val);
            },
            talentName: function(val){
                return /^[\u4e00-\u9fa5\d\w]{1,15}$/ig.test(val);
            },
            describe: function(val){
                return val.length >= 200;
            },
            required:function(val){
                return val.length;
            }
        };

        var validate = function(){
            var boolean = true;
            var errorMessage = [];

            $(".form-element").each(function(index,item){
                var dataValidate = $(item).attr("data-validate");
                var message = $(item).attr("data-validate-message");

                if(dataValidate){
                    if(rules[dataValidate] && !rules[dataValidate]($(item).val())){
                        $(item).closest(".m-set").addClass("error");
                        if(message){
                            errorMessage.push(message);
                        }
                        boolean = false;
                    }else {
                        $(item).closest(".m-set").removeClass("error");
                    }
                }
            });

            if(errorMessage.length){
                ui.alert({
                    content: errorMessage.join("<br\/>")
                });
            }

            return boolean;
        };

        var getParams = function(){
            var params = {};
            $(".form-element").each(function(index,item){
                params[item.name] = item.value;
            });
            return params;
        };

        var doSend = function(){
            require(["common/service"],function(service){
                service.post('/uk/insert',getParams(),function(res){
                    if(res.code == "0"){
                        //报名成功
                        if(res.data.status == "0"){
                            location.href = window.nextPage;
                        }
                        //邀请码不能自己去邀请自己
                        if(res.data.status == "1"){
                            ui.alert({
                                content: "报名失败，"
                            });
                        }
                    }
                });
            });
        };

        $(".m-set").tap(function(){
            $(this).removeClass("error");
        });
        $(".m-submit").tap(function(){
            var _validate = validate();
            if(_validate){
                doSend();
            }
        });
    };

    return function(pageData){

        pageInit.init();

        openAppWindow.init();

        pageFilter.filter(function(){

            if(pageData.has_pay == 1){
                ui.alert("您已报名，返回首页!").done(function(){
                    openAppWindow.open("/uk/index");
                });
            } else {
                share.init();

                require(['zepto'],function($){
                    addFileEvent($);
                    addSelectEvent($);
                    confirmApply($);
                });
            }

        });

    }
});