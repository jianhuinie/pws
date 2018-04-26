/**
 * @file  在APP中的操作
 */
define(function(require, exports) {

    'use strict';

    var app = require("common/app");

    /**
     * 设置分享，设置后，右上角出现 app的分享按钮
     */
    exports.setShareInfo = function(params) {
        params["pic"] = params.img;
        params["pic_url"] = params.img;

        app.send("setShareInfo",params);
    };
    /*
    * 分享到不同渠道
    * @param
    *   {"share_sms": {title:"",content:"",img:""}}
    * */
    exports.doShare = function(param){
        app.send("doShare",param);
    };
    /*
     * 分享到不同渠道
     * */
    exports.doSharePanel = function(params){
        app.send("doSharePanel",params);
    }
});
