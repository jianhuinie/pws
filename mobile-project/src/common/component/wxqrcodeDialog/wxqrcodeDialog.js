/* *
* @ author huangshiming
* 传入一张二维码图片，点击弹窗
*/

define (function (require, exports) {
    'use strict';
    var artTemplate = require('artTemplate');
    var render = artTemplate.compile(require('text!./qrcode.tpl'));

    var hideQRCode = function ()  {
        var qrcodeContainer = $('.qrcode-container');
        var qrcodeMask = $('.qrcode-mask');
        qrcodeContainer.remove();
        qrcodeMask.remove();
    }

    return function (options) {
        var html = render({
            img: options.img,
            warn: options.warn,
            text: options.text
        });
        var body = $('body');
        body.append(html);
        $('.qrcode-mask, .qrcode-close')
            .unbind('click')
            .on('click', function () {
                hideQRCode();
            });
    }
})