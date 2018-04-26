/**
 * Created by xuzheng on 15/7/29.
 */
define(function (require, exports) {

    'use strict';

    var $ = require("zepto");
    var util_dom = require('util/dom');
    var ui = require("common/ui");
    var lazyLoadImage = require('common/lazyLoadImage');

    var dom = require("text!./images.tpl");
    var css = require("text!./images.styl");

    var delImage = require.toUrl("../images/delete.png");

    var getItem = function(base64,guid){
        return "<li guid=\""+guid+"\"><span class='uploadding'>正在上传...</span><span class='del'><img src=\""+delImage+"\"/></span><img src=\""+base64+"\"/></li>";
    };

    var getGuid = function(){
        var guid = "";
        for (var i = 1; i <= 32; i++){
            var n = Math.floor(Math.random()*16.0).toString(16);
            guid +=   n;
            if((i==8)||(i==12)||(i==16)||(i==20))
                guid += "-";
        }
        return guid;
    };

    //
    function Images(element,minLoad,maxLoad){
        this.element = element;

        this.uploadSource = 0;
        //images list object
        this.uploads = {};
        //最小上传图片数量
        this.minLoad = minLoad || 0;
        //最在图片上传数量
        this.maxLoad = maxLoad || 9;

        util_dom.insertCssText(css);
        this.element.html(dom);

        this.btnImages = this.element.find(".btnImages");
        this.container = this.element.find(".container");
        this.list = this.element.find("ul");
        this.addImages = this.element.find(".addImages");
        this.textInfo = this.element.find(".text-info");

        this.init.apply(this,arguments);
    };

    Images.prototype = {
        init: function(){
            var _self = this;

            lazyLoadImage.init();

            this.setInfo();
            //显示图片list
            this.btnImages.click(function(evt){
                if(_self.container.css("display") == "none") {
                    _self.show();
                } else {
                    _self.hide();
                }
            });
            //添加图片
            this.addImages.change(function(){
                if($.trim($(this).val()) == ""){
                    return false;
                }
                if(_self.uploadSource < _self.maxLoad) {
                    _self.add(this);
                    $(this).val("");
                } else {
                    //TODO
                }
            });

            this.container.delegate(".del","click",function(evt){
                evt.stopPropagation();
                var index = _self.container.find(".del").index(this);
                _self.del(this,index);
            });
        },
        isSupport: function(){
            if(window.FileReader){
                return true;
            }
            return false;
        },
        setInfo: function(){
            var residue = this.maxLoad - this.uploadSource;
            this.textInfo.find(".selected").html(this.uploadSource);
            this.textInfo.find(".residue").html(residue);
        },
        uploadImage: function(base64,guid){
            var _self = this;
            //添加guid对象，请求后被删除，不添加数据
            this.resetImage(guid);
            $.post("/forum/uploadImage",{
                attachment: base64,
                guid: guid
            }).always(function(response){
                response = response || {};

                var data = response.data || {};
                var id = data.id;
                var gd = data.guid;

                if(guid){
                    _self.resetImage(gd,id);
                }
                if(response.code != "0"){
                    ui.remind(response.msg || "请求异常");
                }
            });
        },
        getGuidItem: function(guid){
            return this.container.find("[guid='"+guid+"']");
        },
        resetImage: function(guid,id){
            if(this.uploads[guid]){
                var item = this.getGuidItem(guid);
                if(undefined !== id) {
                    this.uploads[guid]["status"] = "success";
                    this.uploads[guid]["id"] = id;
                    item.find(".uploadding").remove();
                } else {
                    this.uploads[guid]["status"] = "error";
                    item.find(".uploadding").addClass("uploadError");
                    item.find(".uploadding").html("上传失败");
                }
                //item.find(".uploadding").addClass(this.uploads[guid]["status"]);
            } else {
                this.uploads[guid] = {
                    status: "uploadding"
                }
            }
        },
        add: function(file){
            var file = file || {};

            file = file.files[0] || {};

            if(!/image\/\w+/.test(file.type||"")){
                alert("请确保文件为图像类型");
                return false;
            }

            var _self = this;
            var reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = function(e){
                _self.uploadSource++;
                var imageBase64 = this.result;
                var guid = getGuid();

                _self.addImages.parent().before(getItem(imageBase64,guid));
                _self.list.scrollLeft(10000);

                _self.uploadImage(imageBase64,guid);
                _self.setInfo();
            };
        },
        show: function(){
            this.container.show();
        },
        hide: function(){
            this.container.hide();
        },
        del: function(target,index){
            this.uploadSource--;
            var parent = $(target).parent();
            var guid = parent.attr("guid");

            parent.remove();
            delete this.uploads[guid];

            this.setInfo();
        },
        isValidate: function(){
            var status = true;
            $.each(this.uploads,function(index,item){
                if(item.status != "success") {
                    status = false;
                }
            });
            return status;
        },
        getImages: function(){
            var ids = [];
            $.each(this.uploads,function(index,item){
                if(undefined !== item.id){
                    ids.push(item.id);
                }
            });
            return ids;
        }
    };

    return Images;
});