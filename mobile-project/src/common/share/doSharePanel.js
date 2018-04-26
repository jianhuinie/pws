/**
 * 设置分享面板，暂时只支持app
 */
;
define(function (require, exports) {

    'use strict';

    var appShare = require("./parts/appShare");
    var env = require("util/env");
    var shareStore = require("./parts/shareStore");
    var $ = require("zepto");

    var doAppSharePanel = (function(){
        /*
        * 如果jockData数据字段为空，则获取缓存当中的实例化数据
        *
        * @jockData fill data
        * @initShareData init share data
        * */
        var getJockData = function(jockData,initShareData){
            jockData = $.extend({},jockData);

            if(!$.isEmptyObject(initShareData)) {

                var addProperty = function(jockData,initShareData) {
                    $.each(jockData,function(key,value){
                        if(jockData.hasOwnProperty(key)) {

                            if(typeof value == "string" ) {
                                jockData[key] = value || initShareData[key];
                            } else {
                                addProperty(jockData[key],initShareData[key])
                            }

                        }
                    });
                }

                addProperty(jockData,initShareData);
            }

            return jockData;
        }

        return function(data) {

            var jockParam = {};

            var store = shareStore.get();
            //将data数据自动填充分享数据
            if(data) {
                var fillData = shareStore.set(data,{});

                jockParam["setShareInfo"] = getJockData(fillData,store);
            } else {
                jockParam["setShareInfo"] = store;

            }

            appShare.doSharePanel(jockParam);
        };
    })();

    /**
     * 设置APP调起面板分享
     * @property "share_sms,share_weixin,share_weibo,share_pyq,share_qq,share_qzone"
     *
     * @param {object} data
     * @property {string} data.title
     * @property {string} data.content
     * @property {string} data.img
     * @property {string} data.url
     */
    return function (data) {
        if (env.app) {
            doAppSharePanel(data);
        }
    }
});