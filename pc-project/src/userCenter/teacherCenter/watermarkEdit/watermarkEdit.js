/**
 * @file 视频课水印设置
 * @author wangtianhua
 */
define(function(require, exports, module) {

    'use strict';

    var markPhotoCropDialog = require('./watermarkImage');
    var service = require('./service');

    exports.init = function(data) {

        var ractive = new Ractive({
            el: '#container',
            template: require('html!./watermarkEdit.html'),
            data: {
                positionY: '0px',
                imagePreview: data.watermark, //图片连接
                imageId: data.watermark_id,
                isshowWatermark: true
            },
            onrender: function() {
                var me = this;
                if (data.watermark && (data.enable_watermark != 0)) {
                    me.set('positionY', '0px');
                    me.set('isshowWatermark', true);
                }
                else {
                    me.set('positionY', '-22px');
                    me.set('isshowWatermark', false);
                }
            },
            isMark: function() {
                var me = this;
                var data = { };
                if (me.get('imagePreview')) {
                    if (me.get('positionY') == '0px') {
                        data.positionY = '-22px';
                        data.isshowWatermark = false;
                    }
                    else {
                        data.positionY = '0px';
                        data.isshowWatermark = true;
                    }
                    me.set(data)
                    .then(function () {
                        service
                        .waterMark({
                            imageId: me.get('imageId'),
                            switchmark: me.get('positionY') == '0px' ? 1 : 0
                        });
                    })
                }
                else {
                    me.set('positionY', '-22px');
                }

            },
            uploadmark: function () {
                var me = this;
                var dialog = markPhotoCropDialog({
                    onUploadComplete: function (response) {
                        if (!response.code) {
                            var data = response.data;
                            me.set('imagePreview', data.url);
                            me.set('imageId', data.id);
                            service
                            .waterMark({
                                imageId: me.get('imageId'),
                                switchmark: 1
                            })
                            .then(function (response) {
                                location.reload();
                            })
                            dialog.hide();
                        }
                    }
                });
                dialog.show();
            }
        });
    };

});