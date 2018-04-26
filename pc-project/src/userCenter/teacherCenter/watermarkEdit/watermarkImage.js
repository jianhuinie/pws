/**
 * @file 水印图片裁剪对话框
 * @author wangtianhua
 */
define(function (require) {

    'use strict';

    var ractiveDialog = require('../../common/function/ractiveDialog');
    var ImageCrop = require('imageCrop');

    /**
     * 视频课封面裁剪
     *
     * @param {Object} options
     * @property {?Function} options.onUploadComplete 上传完成后触发
     */
    return function (options) {

        var width = 521;
        var height = 385;

        var dialog = ractiveDialog({
            template: require('html!./watermarkImage.html'),
            data: {
                width: width,
                height: height
            },
            onrender: function () {
                var me = this;
                var element = $(this.el);

                me.imageCrop = new ImageCrop({
                    element: element.find('.image-crop'),
                    width: width,
                    height: height,
                    action: '/user/previewBinaryImage',
                    accept: 'png',
                    encoder: 'png',
                    minSize: 1,
                    maxSize: 102.4, // 1M 是 1024
                    button: {
                        select: {
                            x: 77,
                            y: 327,
                            width: 80,
                            height: 30,
                            text: '选择图片'
                        },
                        upload: {
                            x: 180,
                            y: 327,
                            width: 80,
                            height: 30,
                            text: '保存图片'
                        },
                    },

                    src: {
                        x: 40,
                        y: 40,
                        width: 260,
                        height: 260
                    },

                    dest: [
                        {
                            x: 340,
                            y: 40,
                            width: 130,
                            height: 130,
                            text: '130x130'
                        },
                        {
                            x: 370,
                            y: 210,
                            width: 74,
                            height: 74,
                            text: '74x74'
                        }
                    ],

                    onValidateError: function (data) {
                        var map = {
                            size: '大小不得超过100KB',
                            accept: '类型最好是背景透明的png图片'
                        };

                        var name = map[data.type];
                        if (name) {
                            alert({
                                title: '温馨提示',
                                content: '图片' + name + '，请重新上传'
                            });
                        }
                    },

                    onUploadComplete: function (data) {

                        var response = data.data;

                        if ($.type(response) === 'string') {
                            response = $.parseJSON(response);
                        }

                        if (response.code !== 0 && response.msg) {
                            alert(response.msg);
                        }

                        var onUploadComplete = options && options.onUploadComplete;
                        if ($.isFunction(onUploadComplete)) {
                            onUploadComplete(response);
                        }

                    },

                });
            }
        });

        return dialog;
    }
});