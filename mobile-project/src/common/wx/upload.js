/**
 * Created by bjhl on 16/1/20.
 */
define(function (require, exports) {

    'use strict';

    var $ = require('zepto');
    var ui = require("common/ui");
    // var share = require("../_part/pageShare/init");
    var app = require("common/app");
    var env = require("util/env");
    var user = require("common/user");
    var openAppWindow = require("common/openAppWindow");

    function getCompressImg(imgData, onCompress) {

        var mHeight = 100;
        var mWidth = 100;

        var canvas = document.createElement('canvas');

        var img = new Image();

        img.onload = function() {

            if (img.height > mHeight) { //按最大高度等比缩放
                img.width *= mHeight / img.height;
                img.height = mHeight;
            }
            //
            //if(img.width > mWidth){
            //    img.height *= mWidth / img.width;
            //    img.width = mWidth;
            //}

            var ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);

            onCompress(canvas.toDataURL("image/png", 1));
        };

        img.src = imgData;
    }


    var addFileEvent = function (options) {
        var source = options.source;
        var upload = function (img, done) {
            require(["common/service"], function(service) {
                service.post("/uk/upload", {
                    img: img,
                    watermark: 1
                }, function(res) {
                    if (+res.code === 0) {
                        var data = res.data || {};
                        if (data.id) {
                            done && done(data.id);
                        }
                    }
                });
            });
        };

        function callback(data) {
            if ($.isFunction(options.callback)) {
                options.callback(data);
            }
        }

        if (app.isApp() && env.os.isAndroid) {
            source.click(function() {
                var _self = this;
                app.send("uploadImage");
                app.on("uploadImageComplete", function(data) {
                    callback(data.url);
                });
            });
        } else {
            source.change(function () {
                var _self = this;
                if (!$.trim($(this).val())) {
                    return false;
                }
                var file = this.files[0] || {};
                if (!/image\/(png|jpeg)/i.test(file.type || "")) {
                    ui.alert("图像类型只支持.png、.jpg格式");
                    return false;
                }

                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    // 通过reader.result来访问生成的DataURL
                    var url = "data:application/octet-stream;" + reader.result.substr(reader.result.indexOf("base64,"));
                    if (reader.result) {
                        upload(reader.result, function (address) {
                            callback(address);
                        });
                    }
                    // 不压缩
                    // getCompressImg(this.result, function (result) {
                    //     upload(result, function (address) {
                    //         callback(address);
                    //     });
                    // });
                };
            });
        }
    };

    return function (options) {
        // openAppWindow.init();
        addFileEvent(options);
    };
});