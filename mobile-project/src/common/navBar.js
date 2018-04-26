/**
 * Created by caoying on 15/11/09.
 */
define(function (require, exports) {

    'use strict';
    var navPanel = require('common/navPanel');
    var Notice = require("common/IM/notice");
    var observer = require('common/mvc/observer');

    exports.init = function(){
    	$('.menu-button').show().click(function(){
            navPanel.show();
        });
        $('.menu-nav-button').click(function(){
            navPanel.show();
        });
        var noticeDom = $(".notice-source");

        //添加消息通知
        var notice = new Notice();
        observer.addListener(notice,"notice",function(source){
            if(source>99){
                source = "99+";
            }
            noticeDom
                .html(source)
                .removeClass("notice-source-none");
        });
    }
});