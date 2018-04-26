/**
 * Created by xuzheng on 16/1/20.
 */
define(function (require, exports) {
    'use strict';
    var $ = require("zepto");
    var app = require('common/app');
    var math = require('util/math');
    var observer = require('common/mvc/observer');
    var env = require('util/env');

    var currentImagePlayer;

    return function (images, index, titleArray, needScale) {
        index = math.clamp(index || 0, 0, 1000);

        if (currentImagePlayer) {
            currentImagePlayer.destroy();
            currentImagePlayer = null;
        }

        titleArray = titleArray || [];

        // 安卓暂时不支持多张图片查看的接口，等3月底安卓发版以后，将此段代码放开，安卓和ios都用toViewImages的接口
        if (app.isApp() && app.support('toViewImages')) {
            app.send('toViewImages', {
                img_list: images,
                index: index
            });
        } else {
            require(['./ImagePlayer'], function (ImagePlayer) {
                var imgPlayer = new ImagePlayer(images, 
                                                {
                                                    index: index,
                                                    needScale: needScale
                                                }, 
                                                titleArray);
                var listener = observer.addListener(imgPlayer, 'display_changed', function () {
                    var display = this.get('display');
                    if (!display) {
                        observer.removeListener(listener);
                        currentImagePlayer = null;
                        imgPlayer.destroy();
                    }
                });
                currentImagePlayer = imgPlayer;
                imgPlayer.show();
            });
        }
    };
});