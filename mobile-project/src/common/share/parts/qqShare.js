/**
 * @file qq操作
 * @author yangji
 */

define(function (require, exports) {

    var url = require('util/url');
    var loadScript = require("util/loadScript");

    var loadQQ = function(done){
        var protocol = url().protocol;
        var loadUrl = "";

        if ('http:' == protocol) {
            loadUrl = "http://pub.idqqimg.com/qqmobile/qqapi.js";
        }
        if ('https:' == protocol) {
            loadUrl = "https://pub.idqqimg.com/qqmobile/qqapi.js";

        }
        if(loadUrl){
            loadScript.async(loadUrl,function(){
                done && done(window.mqq);
            });
        }
    };


    /**
     * 分享到QQ
     *
     * @param {Object} options
     * @property {string} options.title  标题
     * @property {string} options.share_url  链接
     * @property {string} options.image_url 图片地址
     * @property {string} options.desc 内容
     */
    exports.setShareInfo = function (options) {
        loadQQ(function (mqq) {
            if (mqq.data) {
                mqq.data.setShareInfo && mqq.data.setShareInfo(options);
            }
        });
    };
});