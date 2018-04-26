/**
 * Created by bjhl on 15/12/10.
 */
define(function(require,exports){
    var string = require('util/string');
    var $ = require("zepto");

    var store = {},
        shareType = [
            'share_sms', 'share_weibo', 'share_weixin',
            'share_pyq', 'share_qq', 'share_qzone'
        ],
        //根据shareType填充内容对象，share对象当中没有的字段由common内容自动填充
        fill = function(options,rstore){
            var commons = {
                url: options.url || "",
                title: options.title || "",
                content: options.content || "",
                img: options.img || ""
            };

            $.each(shareType,function(index,shareto){
                options[shareto] = $.extend({},commons,options[shareto] || {});
            });

            $.extend(rstore||store,options);
        },
        updateStore = function(data){
            $.extend(store,data);
        },
        //沿用老版本
        getCustom = function(key,data){

            if(data){
                if (key == "share_sms") {
                    data = {
                        content: [
                            data.title,
                            " ",
                            data.content,
                            data.url
                        ].join("")
                    }
                }

                if(key == "share_weibo") {
                    $.extend(data,{
                        content:[
                            "@跟谁学 ",
                            data.title,
                            data.content,
                            data.url,
                            " #找好老师，上跟谁学#"
                        ].join("")
                    });
                }
            }

            return data;
        };

    return {
        /*
        * 将分享数据自动填充
        *
        * options 分享数据
        * restore 如果为空对象，则将填充的数据添加到restore当中，并返回，否则则填充到缓存store当中
        * */
        set: function(options,rstore){
            if(options){
                //补全common信息
                options["url"] = options.url || location.href;
                options["title"] = string.decodeHTML(options.title || $('title').text().trim());
                options["content"] = options.content || "";
                options["img"] = options.img || "";
                //填充当前对象
                fill(options,rstore);
            }

            if(rstore){
                return rstore;
            }
        },
        get: function(key,data){

            var _data = {};

            if(key) {

                if(data){

                    var _obj = {};

                    _obj[key] = data;

                    updateStore(_obj);
                }

                _data = store[key];

                return getCustom(key,_data);

            }else {
                var _data = {};

                $.extend(_data,store);

                if(_data["share_sms"]){
                    _data["share_sms"] = getCustom("share_sms",_data.share_sms);
                }


                if(_data["share_weibo"]){
                    _data["share_weibo"] = getCustom("share_weibo",_data.share_weibo);
                }

                return _data;
            }

        }
    }
});