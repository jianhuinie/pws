/**
 * Created by bjhl on 16/1/29.
 */
define(function (require, exports) {

    var MVCObject = require('common/mvc/MVCObject');
    var base = require('util/base');
    var observer = require('common/mvc/observer');
    var util_dom = require('util/dom');

    var $ = require('zepto');
    var dom = require("text!./images.tpl");
    var css = require("text!./images.styl");

    function Emoji(element) {
        this.emojiID = Math.Date().getTime();
        this.element = element;
        this.list = [{
            name: '微笑',
            src: '11'
        }, {
                name: '好困',
                src: '12'
            },
            {
                name: '得意',
                src: '13'
            },
            {
                name: '撇嘴',
                src: '14'
            },
            {
                name: '憨笑',
                src: '21'
            },
            {
                name: '大哭',
                src: '22'
            },
            {
                name: '调皮',
                src: '23'
            },
            {
                name: '疑问',
                src: '24'
            },
            {
                name: '惊讶',
                src: '31'
            },
            {
                name: '厉害',
                src: '32'
            },
            {
                name: '崇拜',
                src: '33'
            },
            {
                name: '奋战',
                src: '34'
            },
            {
                name: '晕',
                src: '41'
            },
            {
                name: '色',
                src: '42'
            },
            {
                name: '无语',
                src: '43'
            },
            {
                name: '衰',
                src: '44'
            }
        ];
        this.init.apply(this,arguments);
    };

    base.inherits(Emoji, MVCObject);

    var p = Emoji.prototype;

    //p.getPosition = function(){
    //
    //}

    p.init = function(){
        this.addEvent();
    };

    p.addEvent = function(){
        var _self = this;
        this.element.click(function(){
            //console.log(24234)
            if(!_self.isRender){
                _self.show();
            }
        });

        $("#"+this.emojiID).click(function(){
            var target = $(this.target);
            var dataSrc = target.attr("target-src");

            console.log(dataSrc);

            _self.hide();
        });
    };

    p.isRender = false;

    p.getList = function(){
        var list = [];
        $.each(this.list,function(index,item){
            list.push('<li data-src="'+item.src+'">'+item.name+'</li>');
        });
        return list.join("");
    };

    p.render = function(){
        var layout = $('<div class="emoji-layout"><ul><li>24242</li></ul></div>');

        $(layout).attr("id",this.emojiID);
        $(layout).attr("class","emoji-layout");
        $(layout).find("ul").append(this.getList());
        $(layout).css({

        });

        util_dom.insertCssText(css);

        $("body").append(layout);
    };

    p.show = function(){

    };

    p.hide = function(){

    };
});