/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    var observer = require('common/mvc/observer');
    var MVCObject = require('common/mvc/MVCObject');
    var base = require('util/base');
    var $ = require("zepto");


    var string = "<textarea class='textArea-length' style='position:absolute;font-size:14px;right:10000px;top:10000px;white-space:normal;word-break:break-all;'></textarea>";

    function Input(id,maxHeight){
        this.element = document.getElementById(id);
        this.height = $(this.element).height();
        this.width = $(this.element).width();
        this.string = this.element.cloneNode();
        this.maxHeight = maxHeight || 100;

        this._init();
    }

    base.inherits(Input, MVCObject);

    var p = Input.prototype;

    p.value_changed = function(){
        var value = this.get("value");
        this._getArea().val(value);
        this._setAreaHeight();
        observer.trigger(this,"value",this.element.value);
    };

    p._init = function(){
        $(this.element).after($(this.string));
        $(this.element).after($(this.string).css({
            "paddingTop": "0px",
            "paddingBottom": "0px",
            "position": "absolute",
            "left": "-10000px",
            "bottom": "-10000px;"
        }).addClass("textArea-length"));
        this._addEvent();
    };

    p._setAreaHeight = function(){
        var areaHeight = this._getArea()[0].scrollHeight;
        if(areaHeight == 0){
            return false;
        }
        if(areaHeight-this.height == 0){
            return false;
        }
        //相差大于15，换行
        //if(Math.abs(areaHeight-this.height) < 5){
        //    return false;
        //}
        if(areaHeight<this.maxHeight){
            this.height = areaHeight;
            $(this.element).css({
                height: areaHeight
            });

            observer.trigger(this,"heightChange");
        }
    };

    p._getArea = function(){
       return  $(this.element).siblings(".textArea-length");
    };

    p.resetValue = function(value){
        this.set("value","");
        $(this.element).val("");
    };
    p._addEvent = function(){
        var _self = this;
        this.element.oninput = function(){
            _self.set("value",this.value);
        };
    };

    return Input;
});