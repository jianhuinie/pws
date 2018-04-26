/**
 * @file 渲染页面上包含 data-src 的 img 元素
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var toNumber = require('cc/function/toNumber');
    var compressImage = require('common/function/compressImage');

    return function (container) {

        var devicePixelRatio = typeof window.devicePixelRatio !== 'undefined'
                             ? window.devicePixelRatio
                             : 1;

        $('img[data-src]', container).each(
            function () {

                var element = $(this);

                var url = element.attr('data-src');
                var width = toNumber(element.attr('data-width'), 0);
                var height = toNumber(element.attr('data-height'), 0);
                var noCrop = !toNumber(element.attr('data-crop'), 0);

                if (width > 0 && height > 0) {

                    var url1x = compressImage({
                        url: url,
                        width: width,
                        height: height,
                        noCrop: noCrop
                    });

                    var url2x = compressImage({
                        url: url,
                        width: 2 * width,
                        height: 2 * height,
                        noCrop: noCrop
                    });

                    var url3x = compressImage({
                        url: url,
                        width: 3 * width,
                        height: 3 * height,
                        noCrop: noCrop
                    });

                    var retinaSet = [
                        url2x + ' 2x',
                        url3x + ' 3x'
                    ];

                    element
                        .prop({
                            src: url1x,
                            srcset: retinaSet.join(',')
                        })
                        .removeAttr('data-src');

                }
            }
        );

    };

});