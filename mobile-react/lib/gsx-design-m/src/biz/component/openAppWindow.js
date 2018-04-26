/**
 * @file  APP下，链接通过jocky接口跳转
 */
define(function (require, exports) {

    'use strict';

    var $ = require("zepto");
    var app = require("./app");

    function getAbsoluteLink(href) {
        var newElement = $('<a href="' + href + '"></a>')[0];
        var result = newElement.href;
        if (!(result.indexOf('http://') == -1 && result.indexOf('https://') == -1)) {
            return result;
        } else {
            return false;
        }
    };

    function getEncodeURI(link){
        if(/[\u4E00-\u9FA5]+/ig.test(link)){
            return encodeURI(link)
        }
        return link;
    }


    exports.init = function () {

        if(app.isApp()){
            $('body>*').on('click','a',function(e){
                var me = $(this);
                /*在不需要进行opennewwindow的A标签上加上data-appnojump="true"就不会发生app跳转*/
                if (me.attr('data-appnojump') == "true") {
                    return;
                }
                var link = getAbsoluteLink(this.href);
                var jockey = $(this).data("jockey");

                e.preventDefault();

                if(jockey){
                    var splits = jockey.split("|");
                    var action = splits[0];
                    var params = splits[1] || "";

                    if(params){
                        //object
                        if(/^{/ig.test(params) && /}$/ig.test(params)){
                            params = JSON.parse(params);

                            //中文转码
                            $.each(params,function(key,value){
                                params[key] = getEncodeURI(value);
                            });

                        }else {
                        //string
                        //todo
                            params = getEncodeURI(splits.splice(1));
                        }
                    }

                    app.send(action,params);

                    return false;
                }

                if (link) {
                    app.openNewWindow(getEncodeURI(link));
                }
            });
        }

    };

    exports.open = function(link){
        if(app.isApp()){
            var link = getAbsoluteLink(link);

            if(link){
                app.openNewWindow(link);
            }
        }else {
            location.href = link;
        }
    };
});