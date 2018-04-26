/**
 * Created by gsx on 16/1/20.
 * @params {Array<string>} images 图片地址
 * @params {number} index 默认选中的图片
 * @params {Array<string>} titleArray 图片标题
 * @params {boolean} isNeedScale 是否考虑缩放
 * @return function
 */
define(function (require) {
    'use strict';

    var env = require('../../util/env');
    var math = require('../../../util/math');
    var observer = require('../../../util/mvc/observer');

    var currentImagePlayer;

    return function (images, index, titleArray, isNeedScale) {
        index = math.clamp(index || 0, 0, 1000);

        if (currentImagePlayer) {
            currentImagePlayer.destroy();
            currentImagePlayer = null;
        }

        titleArray = titleArray || [];

        if (env.app.isApp) {
            app.send('toViewImages', {
                img_list: images,
                index: index
            });
        } else {
            require(['../../../component/ImagePlayer/index'], function (ImagePlayer) {
                var imgPlayer = new ImagePlayer(
                    images, 
                    {
                        index: index,
                        isNeedScale: isNeedScale
                    }, 
                    titleArray
                );
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