/**
 * Created by bjhl on 16/4/19.
 */
define(function(require,exports){

    'use strict';

    var $ = require("zepto");
    var cookie = require("util/cookie");
    var app = require("common/app");
    var env = require("util/env");


    var getUserNumber = function(){
        var number = "";

        window.gsx_ready(function(config){
            var user = config.user || {};

            number = user.number || "";
        });

        return number;
    };

    var geCityID = function(){
        var ID = "";

        window.gsx_ready(function(config){
            var city = config.city || {};

            ID = city.id || "";
        });

        return ID;
    };

    var getDep = function(){
        var dep = 4;
        if(app.isApp()){
            if(env.os.isAndroid){
                dep = 2;
            }else {
                dep = 3;
            }
        }
        return dep;
    };

    function CommentStatistics(params){
        this.params = params || {};

        this.img = new Image();
    };

    CommentStatistics.prototype = {
        //默认条件，会被重写
        _localStoryParams: {
            city_id: geCityID(),//城市ID
            track_id: cookie.get("__track_id__"),//未登陆ID
            user_id: getUserNumber(),//登陆用户ID
            comment_type: 1,//评论类型
            comment_tag: "",//标签类型
            comment_tag_num: "",//当前评论总条数
            dsp: getDep(),//终端
            page: 1,//页码
            source: 1,//老师主页
            type: "comment" //统计类型
        },

        listenerOne: function(element){
            var _self = this;
            this.listener(element,function(){
                _self.removeListener(element);
            });
        },
        //判断模块是否在可视区域
        isBlock: function(element){
            var eTop = $(element).offset().top;
            var sTop = $(window).scrollTop();
            var wHeight = $(window).height();

            return (sTop+wHeight) > eTop;
        },

        listener: function(element,callback){

            var _self = this;

            if(!element[0]){
                return false;
            }

            $(window).on("scroll.comment",function(){
                if(_self.isBlock(element)){
                    _self.send();

                    callback && callback();
                }
            });
        },

        removeListener: function(element){
            $(window).unbind("scroll.comment");
        },

        send: function(ps){
            ps = $.extend(this._localStoryParams,this.params,ps||{});

            var url = "https://click.genshuixue.com/gs.gif?"+ $.param(ps);

            this.img.src = url;
        }
    };

    return CommentStatistics;

});